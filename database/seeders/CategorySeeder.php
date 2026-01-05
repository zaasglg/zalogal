<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class CategorySeeder extends Seeder
{
    public function run(): void
    {
        $categories = [
            ['name' => 'Электроника', 'image' => 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=200&h=200&fit=crop'],
            ['name' => 'Компьютеры', 'image' => 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=200&h=200&fit=crop'],
            ['name' => 'Автомобили', 'image' => 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=200&h=200&fit=crop'],
            ['name' => 'Недвижимость', 'image' => 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=200&h=200&fit=crop'],
            ['name' => 'Мебель', 'image' => 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=200&h=200&fit=crop'],
            ['name' => 'Бытовая техника', 'image' => 'https://images.unsplash.com/photo-1556911220-bff31c812dba?w=200&h=200&fit=crop'],
            ['name' => 'Спорт', 'image' => 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=200&h=200&fit=crop'],
            ['name' => 'Музыка', 'image' => 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=200&h=200&fit=crop'],
            ['name' => 'Фототехника', 'image' => 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=200&h=200&fit=crop'],
            ['name' => 'Аксессуары', 'image' => 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&h=200&fit=crop'],
        ];

        foreach ($categories as $category) {
            Category::create([
                'name' => $category['name'],
                'slug' => Str::slug($category['name']),
                'image' => $category['image'],
            ]);
        }
    }
}
