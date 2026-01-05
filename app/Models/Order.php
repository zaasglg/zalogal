<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Order extends Model
{
    protected $fillable = [
        'listing_id',
        'buyer_id',
        'seller_id',
        'total_price',
        'quantity',
        'status',
        'buyer_note',
        'seller_note',
        'payment_method',
        'first_name',
        'last_name',
        'company',
        'address',
        'country',
        'region',
        'city',
        'postal_code',
        'email',
        'phone',
        'comment',
        'tracking_number',
    ];

    public function listing(): BelongsTo
    {
        return $this->belongsTo(Listing::class);
    }

    public function buyer(): BelongsTo
    {
        return $this->belongsTo(User::class, 'buyer_id');
    }

    public function seller(): BelongsTo
    {
        return $this->belongsTo(User::class, 'seller_id');
    }
}
