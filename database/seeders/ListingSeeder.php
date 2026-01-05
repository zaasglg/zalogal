<?php

namespace Database\Seeders;

use App\Models\Listing;
use App\Models\User;
use Illuminate\Database\Seeder;

class ListingSeeder extends Seeder
{
    public function run(): void
    {
        $seller = User::where('email', 'seller@mail.ru')->first();

        if (!$seller) {
            $seller = User::create([
                'name' => 'Seller User',
                'email' => 'ц',
                'password' => bcrypt('password'),
                'role' => 'seller',
            ]);
        }

        $listings = [
            ['title' => 'iPhone 14 Pro Max 256GB', 'description' => 'Продаю iPhone 14 Pro Max в отличном состоянии. Полный комплект, все документы.', 'price' => 450000, 'category' => 'Электроника', 'condition' => 'excellent', 'location' => 'Алматы'],
            ['title' => 'MacBook Pro 16" M2', 'description' => 'MacBook Pro 16 дюймов с чипом M2, 32GB RAM, 1TB SSD.', 'price' => 850000, 'category' => 'Компьютеры', 'condition' => 'excellent', 'location' => 'Астана'],
            ['title' => 'Toyota Camry 2020', 'description' => 'Продается Toyota Camry 2020 года. Пробег 45000 км.', 'price' => 12500000, 'category' => 'Автомобили', 'condition' => 'excellent', 'location' => 'Алматы'],
            ['title' => 'Квартира 2-комнатная', 'description' => '2-комнатная квартира в центре, 65 кв.м, евроремонт.', 'price' => 35000000, 'category' => 'Недвижимость', 'condition' => 'excellent', 'location' => 'Астана'],
            ['title' => 'PlayStation 5', 'description' => 'PlayStation 5 с двумя джойстиками и 5 играми.', 'price' => 250000, 'category' => 'Игры', 'condition' => 'good', 'location' => 'Шымкент'],
            ['title' => 'Samsung Galaxy S23 Ultra', 'description' => 'Флагманский смартфон Samsung в идеальном состоянии.', 'price' => 380000, 'category' => 'Электроника', 'condition' => 'excellent', 'location' => 'Алматы'],
            ['title' => 'iPad Pro 12.9 2022', 'description' => 'iPad Pro с Magic Keyboard и Apple Pencil.', 'price' => 420000, 'category' => 'Планшеты', 'condition' => 'excellent', 'location' => 'Астана'],
            ['title' => 'Диван угловой', 'description' => 'Угловой диван в отличном состоянии, раскладной.', 'price' => 180000, 'category' => 'Мебель', 'condition' => 'good', 'location' => 'Алматы'],
            ['title' => 'Холодильник LG', 'description' => 'Двухкамерный холодильник LG, No Frost.', 'price' => 150000, 'category' => 'Бытовая техника', 'condition' => 'good', 'location' => 'Караганда'],
            ['title' => 'Велосипед горный', 'description' => 'Горный велосипед Trek, 21 скорость.', 'price' => 95000, 'category' => 'Спорт', 'condition' => 'good', 'location' => 'Алматы'],
            ['title' => 'Ноутбук ASUS ROG', 'description' => 'Игровой ноутбук ASUS ROG с RTX 3070.', 'price' => 650000, 'category' => 'Компьютеры', 'condition' => 'excellent', 'location' => 'Астана'],
            ['title' => 'Стиральная машина Bosch', 'description' => 'Стиральная машина Bosch, загрузка 7 кг.', 'price' => 120000, 'category' => 'Бытовая техника', 'condition' => 'good', 'location' => 'Шымкент'],
            ['title' => 'Телевизор Samsung 55"', 'description' => 'Smart TV Samsung 55 дюймов, 4K.', 'price' => 280000, 'category' => 'Электроника', 'condition' => 'excellent', 'location' => 'Алматы'],
            ['title' => 'Кондиционер Daikin', 'description' => 'Кондиционер Daikin инверторный, 12000 BTU.', 'price' => 180000, 'category' => 'Климат', 'condition' => 'new', 'location' => 'Астана'],
            ['title' => 'Кровать двуспальная', 'description' => 'Двуспальная кровать с матрасом.', 'price' => 85000, 'category' => 'Мебель', 'condition' => 'good', 'location' => 'Алматы'],
            ['title' => 'Микроволновка Samsung', 'description' => 'Микроволновая печь Samsung 23л.', 'price' => 35000, 'category' => 'Бытовая техника', 'condition' => 'good', 'location' => 'Караганда'],
            ['title' => 'Пылесос Dyson', 'description' => 'Беспроводной пылесос Dyson V11.', 'price' => 180000, 'category' => 'Бытовая техника', 'condition' => 'excellent', 'location' => 'Алматы'],
            ['title' => 'Шкаф-купе', 'description' => 'Шкаф-купе 2.5м с зеркалами.', 'price' => 120000, 'category' => 'Мебель', 'condition' => 'good', 'location' => 'Астана'],
            ['title' => 'Кухонный гарнитур', 'description' => 'Кухонный гарнитур 3м с техникой.', 'price' => 350000, 'category' => 'Мебель', 'condition' => 'excellent', 'location' => 'Алматы'],
            ['title' => 'Электросамокат Xiaomi', 'description' => 'Электросамокат Xiaomi Pro 2.', 'price' => 120000, 'category' => 'Транспорт', 'condition' => 'good', 'location' => 'Астана'],
            ['title' => 'Фотоаппарат Canon', 'description' => 'Canon EOS R6 с объективом 24-105mm.', 'price' => 950000, 'category' => 'Фототехника', 'condition' => 'excellent', 'location' => 'Алматы'],
            ['title' => 'Наушники AirPods Pro', 'description' => 'Apple AirPods Pro 2 поколения.', 'price' => 95000, 'category' => 'Аксессуары', 'condition' => 'new', 'location' => 'Астана'],
            ['title' => 'Умные часы Apple Watch', 'description' => 'Apple Watch Series 8, 45mm.', 'price' => 180000, 'category' => 'Электроника', 'condition' => 'excellent', 'location' => 'Алматы'],
            ['title' => 'Принтер HP LaserJet', 'description' => 'Лазерный принтер HP LaserJet Pro.', 'price' => 85000, 'category' => 'Оргтехника', 'condition' => 'good', 'location' => 'Караганда'],
            ['title' => 'Монитор Dell 27"', 'description' => 'Монитор Dell 27 дюймов, 4K, IPS.', 'price' => 150000, 'category' => 'Компьютеры', 'condition' => 'excellent', 'location' => 'Астана'],
            ['title' => 'Клавиатура механическая', 'description' => 'Механическая клавиатура с RGB подсветкой.', 'price' => 35000, 'category' => 'Аксессуары', 'condition' => 'good', 'location' => 'Алматы'],
            ['title' => 'Мышь Logitech MX Master', 'description' => 'Беспроводная мышь Logitech MX Master 3.', 'price' => 28000, 'category' => 'Аксессуары', 'condition' => 'excellent', 'location' => 'Астана'],
            ['title' => 'Роутер TP-Link', 'description' => 'Wi-Fi роутер TP-Link AX3000.', 'price' => 25000, 'category' => 'Сетевое оборудование', 'condition' => 'new', 'location' => 'Алматы'],
            ['title' => 'Колонка JBL', 'description' => 'Портативная колонка JBL Charge 5.', 'price' => 45000, 'category' => 'Аудио', 'condition' => 'good', 'location' => 'Шымкент'],
            ['title' => 'Электрогриль', 'description' => 'Электрический гриль Tefal.', 'price' => 38000, 'category' => 'Бытовая техника', 'condition' => 'good', 'location' => 'Алматы'],
            ['title' => 'Мультиварка Redmond', 'description' => 'Мультиварка Redmond 5л.', 'price' => 22000, 'category' => 'Бытовая техника', 'condition' => 'good', 'location' => 'Астана'],
            ['title' => 'Утюг Philips', 'description' => 'Паровой утюг Philips с керамической подошвой.', 'price' => 15000, 'category' => 'Бытовая техника', 'condition' => 'good', 'location' => 'Караганда'],
            ['title' => 'Фен Dyson', 'description' => 'Фен Dyson Supersonic.', 'price' => 120000, 'category' => 'Красота', 'condition' => 'excellent', 'location' => 'Алматы'],
            ['title' => 'Электробритва Braun', 'description' => 'Электробритва Braun Series 9.', 'price' => 65000, 'category' => 'Красота', 'condition' => 'good', 'location' => 'Астана'],
            ['title' => 'Массажное кресло', 'description' => 'Массажное кресло с подогревом.', 'price' => 280000, 'category' => 'Здоровье', 'condition' => 'excellent', 'location' => 'Алматы'],
            ['title' => 'Беговая дорожка', 'description' => 'Электрическая беговая дорожка.', 'price' => 180000, 'category' => 'Спорт', 'condition' => 'good', 'location' => 'Астана'],
            ['title' => 'Гантели набор', 'description' => 'Набор гантелей от 5 до 30 кг.', 'price' => 45000, 'category' => 'Спорт', 'condition' => 'good', 'location' => 'Алматы'],
            ['title' => 'Электрогитара Fender', 'description' => 'Электрогитара Fender Stratocaster.', 'price' => 250000, 'category' => 'Музыка', 'condition' => 'excellent', 'location' => 'Астана'],
            ['title' => 'Синтезатор Yamaha', 'description' => 'Синтезатор Yamaha PSR-E373.', 'price' => 95000, 'category' => 'Музыка', 'condition' => 'good', 'location' => 'Алматы'],
            ['title' => 'Проектор Epson', 'description' => 'Проектор Epson Full HD.', 'price' => 180000, 'category' => 'Электроника', 'condition' => 'excellent', 'location' => 'Астана'],
        ];

        foreach ($listings as $listing) {
            Listing::create(array_merge($listing, [
                'user_id' => $seller->id,
                'status' => 'active',
            ]));
        }
    }
}