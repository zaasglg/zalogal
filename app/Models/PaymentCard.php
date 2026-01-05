<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class PaymentCard extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'card_holder_name',
        'card_number_last4',
        'card_type',
        'expiry_month',
        'expiry_year',
        'is_default',
    ];

    protected $casts = [
        'is_default' => 'boolean',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function getMaskedCardNumberAttribute(): string
    {
        return '**** **** **** ' . $this->card_number_last4;
    }
}