<?php

namespace Database\Seeders;

use App\Models\Order;
use App\Models\User;
use App\Models\Listing;
use Illuminate\Database\Seeder;

class OrderSeeder extends Seeder
{
    public function run(): void
    {
        $seller = User::where('email', 'seller@mail.ru')->first();
        
        if (!$seller) {
            return;
        }

        // Create buyer users if they don't exist
        $buyers = [];
        for ($i = 1; $i <= 5; $i++) {
            $buyers[] = User::firstOrCreate(
                ['email' => "buyer{$i}@mail.ru"],
                [
                    'name' => "Покупатель {$i}",
                    'password' => bcrypt('password'),
                    'role' => 'buyer',
                ]
            );
        }

        $listings = Listing::where('user_id', $seller->id)->where('status', 'active')->get();

        if ($listings->isEmpty()) {
            return;
        }

        $statuses = ['pending', 'accepted', 'rejected', 'completed'];
        $notes = [
            'Хочу купить этот товар',
            'Можно забрать сегодня?',
            'Интересует этот товар, когда можно встретиться?',
            'Готов купить прямо сейчас',
            'Подходит ли товар для подарка?',
        ];

        // Create 20 demo orders
        for ($i = 0; $i < 20; $i++) {
            $listing = $listings->random();
            $buyer = $buyers[array_rand($buyers)];
            
            Order::create([
                'listing_id' => $listing->id,
                'buyer_id' => $buyer->id,
                'seller_id' => $seller->id,
                'total_price' => $listing->price,
                'status' => $statuses[array_rand($statuses)],
                'buyer_note' => $notes[array_rand($notes)],
            ]);
        }
    }
}
