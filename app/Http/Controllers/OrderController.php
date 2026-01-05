<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\CartItem;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class OrderController extends Controller
{
    public function index()
    {
        $orders = Order::where('seller_id', auth()->id())
            ->with(['listing', 'buyer'])
            ->latest()
            ->paginate(10);
        
        return Inertia::render('Profile/Orders', [
            'orders' => $orders,
        ]);
    }

    public function buyerOrders()
    {
        $orders = Order::where('buyer_id', auth()->id())
            ->with(['listing', 'seller'])
            ->latest()
            ->paginate(10);
        
        return Inertia::render('profile-orders', [
            'orders' => $orders,
        ]);
    }

    public function show($id)
    {
        $order = Order::with(['listing', 'seller'])->findOrFail($id);
        
        // Если пользователь авторизован, проверяем, что он является покупателем
        // Если не авторизован, разрешаем просмотр (для публичного отслеживания)
        if (auth()->check() && $order->buyer_id !== auth()->id()) {
            abort(403);
        }
        
        return Inertia::render('order-details', [
            'order' => $order,
        ]);
    }

    public function track(Request $request)
    {
        $validated = $request->validate([
            'tracking_number' => 'required|string',
        ]);

        $order = Order::where('tracking_number', $validated['tracking_number'])
            ->with(['listing', 'seller'])
            ->first();

        if (!$order) {
            return back()->withErrors([
                'tracking_number' => 'Заказ с указанным трек-номером не найден.'
            ]);
        }

        return redirect()->route('track-order.details', ['id' => $order->id]);
    }

    public function updateStatus(Request $request, Order $order)
    {
        if ($order->seller_id !== auth()->id()) {
            abort(403);
        }

        $validated = $request->validate([
            'status' => 'required|in:accepted,rejected,packed,shipped,delivered,completed',
            'seller_note' => 'nullable|string',
        ]);

        $order->update($validated);

        return back()->with('success', 'Статус заказа обновлен');
    }

    public function checkout(Request $request)
    {
        $validated = $request->validate([
            'payment_method' => 'required|string',
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'company' => 'nullable|string|max:255',
            'address' => 'required|string|max:255',
            'country' => 'required|string|max:255',
            'region' => 'required|string|max:255',
            'city' => 'required|string|max:255',
            'postal_code' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'required|string|max:255',
            'comment' => 'nullable|string',
        ]);

        $cartItems = auth()->user()->cartItems()->with('listing')->get();

        if ($cartItems->isEmpty()) {
            return back()->withErrors(['cart' => 'Корзина пуста']);
        }

        DB::beginTransaction();
        try {
            $orders = [];
            foreach ($cartItems as $cartItem) {
                $listing = $cartItem->listing;
                $totalPrice = $listing->price * $cartItem->quantity;

                // Генерируем уникальный трек-номер
                $trackingNumber = $this->generateTrackingNumber();

                $order = Order::create([
                    'listing_id' => $listing->id,
                    'buyer_id' => auth()->id(),
                    'seller_id' => $listing->user_id,
                    'total_price' => $totalPrice,
                    'quantity' => $cartItem->quantity,
                    'status' => 'pending',
                    'payment_method' => $validated['payment_method'],
                    'first_name' => $validated['first_name'],
                    'last_name' => $validated['last_name'],
                    'company' => $validated['company'] ?? null,
                    'address' => $validated['address'],
                    'country' => $validated['country'],
                    'region' => $validated['region'],
                    'city' => $validated['city'],
                    'postal_code' => $validated['postal_code'],
                    'email' => $validated['email'],
                    'phone' => $validated['phone'],
                    'comment' => $validated['comment'] ?? null,
                    'tracking_number' => $trackingNumber,
                ]);

                $orders[] = $order;
            }

            // Очищаем корзину после создания заказов
            auth()->user()->cartItems()->delete();

            DB::commit();

            return redirect()->route('order-success')->with('success', 'Заказ успешно оформлен');
        } catch (\Exception $e) {
            DB::rollBack();
            return back()->withErrors(['error' => 'Произошла ошибка при оформлении заказа']);
        }
    }

    /**
     * Генерирует уникальный трек-номер для заказа
     * Формат: ZLG-XXXXXX (где X - случайные буквы и цифры)
     */
    private function generateTrackingNumber(): string
    {
        do {
            // Генерируем трек-номер: ZLG + 6 символов (буквы и цифры)
            $trackingNumber = 'ZLG-' . strtoupper(Str::random(6));
        } while (Order::where('tracking_number', $trackingNumber)->exists());

        return $trackingNumber;
    }
}
