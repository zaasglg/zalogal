<?php

namespace App\Http\Controllers;

use App\Models\UserAddress;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AddressController extends Controller
{
    public function edit()
    {
        $address = auth()->user()->addresses()->where('type', 'billing')->first();
        
        return response()->json([
            'address' => $address,
        ]);
    }

    public function update(Request $request)
    {
        $validated = $request->validate([
            'full_name' => 'required|string|max:255',
            'address_line_1' => 'required|string|max:255',
            'address_line_2' => 'nullable|string|max:255',
            'city' => 'required|string|max:255',
            'state' => 'nullable|string|max:255',
            'postal_code' => 'required|string|max:20',
            'country' => 'required|string|max:255',
            'phone' => 'nullable|string|max:20',
        ]);

        auth()->user()->addresses()->updateOrCreate(
            ['type' => 'billing'],
            array_merge($validated, ['user_id' => auth()->id()])
        );

        return back()->with('success', 'Адрес успешно обновлен');
    }
}