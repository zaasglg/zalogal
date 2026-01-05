<?php

namespace App\Http\Controllers;

use App\Models\Listing;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class FavoriteController extends Controller
{
    public function index()
    {
        $favorites = Auth::user()->favorites()->with('categoryModel')->paginate(20);
        
        return Inertia::render('wishlist', [
            'favorites' => $favorites
        ]);
    }
    
    public function toggle(Listing $listing)
    {
        $user = Auth::user();
        
        $user->favorites()->toggle($listing->id);
        
        if (request()->wantsJson()) {
            return response()->json([
                'favorited' => $user->favorites()->where('listing_id', $listing->id)->exists()
            ]);
        }
        
        return back();
    }
}
