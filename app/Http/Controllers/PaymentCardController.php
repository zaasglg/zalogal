<?php

namespace App\Http\Controllers;

use App\Models\PaymentCard;
use Illuminate\Http\Request;

class PaymentCardController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'card_holder_name' => 'required|string|max:255',
            'card_number' => 'required|string|size:16',
            'card_type' => 'required|in:visa,mastercard',
            'expiry_month' => 'required|string|size:2',
            'expiry_year' => 'required|string|size:4',
        ]);

        auth()->user()->paymentCards()->create([
            'card_holder_name' => $validated['card_holder_name'],
            'card_number_last4' => substr($validated['card_number'], -4),
            'card_type' => $validated['card_type'],
            'expiry_month' => $validated['expiry_month'],
            'expiry_year' => $validated['expiry_year'],
        ]);

        return redirect()->back()->with('success', 'Карта успешно добавлена');
    }

    public function destroy(PaymentCard $card)
    {
        if ($card->user_id !== auth()->id()) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        $card->delete();

        return redirect()->back()->with('success', 'Карта удалена');
    }
}