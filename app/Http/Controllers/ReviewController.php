<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ReviewController extends Controller
{
    public function store(Request $request, $listingId)
    {
        $listing = \App\Models\Listing::findOrFail($listingId);
        $user = auth()->user();

        // Optional: Ensure user bought the item
        $hasPurchased = \App\Models\Order::where('buyer_id', $user->id)
            ->where('listing_id', $listing->id)
            ->whereIn('status', ['completed', 'delivered']) // Adjust statuses as needed based on your system
            ->exists();

        // If you want to strictly enforce "received", uncomment the below:
        /*
        if (!$hasPurchased) {
             return back()->withErrors(['message' => 'Вы можете оставить отзыв только после покупки и получения товара.']);
        }
        */
        // For now, I'll leave it as a check but maybe strictness depends on user preference. 
        // given the user request "after he received", the code should probably enforce it.
        
        if (!$hasPurchased) {
             return back()->withErrors(['message' => 'Вы можете оставить отзыв только после покупки и получения товара.']);
        }

        // Prevent duplicate reviews
        if (\App\Models\Review::where('listing_id', $listing->id)->where('user_id', $user->id)->exists()) {
             return back()->withErrors(['message' => 'You have already reviewed this product.']);
        }

        $validated = $request->validate([
            'rating' => 'required|integer|min:1|max:5',
            'comment' => 'nullable|string|max:1000',
        ]);

        $review = new \App\Models\Review();
        $review->listing_id = $listing->id;
        $review->user_id = $user->id;
        $review->rating = $validated['rating'];
        $review->comment = $validated['comment'];
        $review->save();

        return back();
    }
}
