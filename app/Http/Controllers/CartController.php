<?php

namespace App\Http\Controllers;

use App\Models\CartItem;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CartController extends Controller
{
    public function index()
    {
        $cartItems = auth()->user()->cartItems()->with('listing')->get();
        
        return Inertia::render('cart', [
            'cartItems' => $cartItems,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'listing_id' => 'required|exists:listings,id',
            'quantity' => 'nullable|integer|min:1',
        ]);

        $quantity = $validated['quantity'] ?? 1;

        $cartItem = CartItem::where('user_id', auth()->id())
            ->where('listing_id', $validated['listing_id'])
            ->first();

        if ($cartItem) {
            $cartItem->increment('quantity', $quantity);
        } else {
            CartItem::create([
                'user_id' => auth()->id(),
                'listing_id' => $validated['listing_id'],
                'quantity' => $quantity,
            ]);
        }

        return back()->with('success', 'Товар добавлен в корзину');
    }

    public function update(Request $request, CartItem $cartItem)
    {
        if ($cartItem->user_id !== auth()->id()) {
            abort(403);
        }

        $validated = $request->validate([
            'quantity' => 'required|integer|min:1',
        ]);

        $cartItem->update($validated);

        return back()->with('success', 'Количество обновлено');
    }

    public function destroy(CartItem $cartItem)
    {
        if ($cartItem->user_id !== auth()->id()) {
            abort(403);
        }

        $cartItem->delete();

        return back()->with('success', 'Товар удален из корзины');
    }

    public function checkout()
    {
        $cartItems = auth()->user()->cartItems()->with('listing')->get();
        
        if ($cartItems->isEmpty()) {
            return redirect()->route('cart')->with('error', 'Корзина пуста');
        }

        $addresses = auth()->user()->addresses()->orderBy('is_default', 'desc')->get();

        return Inertia::render('checkout', [
            'cartItems' => $cartItems,
            'addresses' => $addresses,
        ]);
    }
}
