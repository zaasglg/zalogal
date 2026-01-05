<?php

namespace Database\Seeders;

use App\Models\Post;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class PostSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $superAdmin = User::where('email', 'admin@admin.com')->first();

        if (!$superAdmin) {
            $this->command->error('Super admin not found. Please run SuperAdminSeeder first.');
            return;
        }

        $posts = [
            [
                'title' => 'Запуск платформы Zalogal!',
                'excerpt' => 'Мы рады объявить о запуске нашей новой платформы для управления залогами.',
                'content' => '<h1>Добро пожаловать в Zalogal!</h1><p>Мы рады представить вам нашу <strong>новую платформу</strong>, которая революционизирует рынок залогового имущества.</p><p>С помощью Zalogal вы сможете:</p><ul><li>Быстро находить выгодные предложения</li><li>Управлять своими активами</li><li>Получать актуальную аналитику</li></ul><p>Присоединяйтесь к нам уже сегодня!</p>',
                'image' => 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop',
                'is_published' => true,
            ],
            [
                'title' => 'Обновление условий безопасности',
                'excerpt' => 'Важная информация об изменениях в политике безопасности и защиты данных.',
                'content' => '<p>Уважаемые пользователи,</p><p>Мы обновили наши протоколы безопасности для обеспечения <em>максимальной защиты</em> ваших данных.</p><blockquote>Безопасность клиентов — наш главный приоритет.</blockquote><p>Что нового:</p><ol><li>Двухфакторная аутентификация для всех администраторов</li><li>Шифрование данных по стандарту AES-256</li><li>Регулярные аудиты безопасности</li></ol>',
                'image' => 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?q=80&w=2670&auto=format&fit=crop',
                'is_published' => true,
            ],
            [
                'title' => 'Новые категории товаров',
                'excerpt' => 'Теперь на нашей площадке доступны новые категории электроники и недвижимости.',
                'content' => '<h2>Расширение ассортимента</h2><p>Мы добавили новые категории для более удобного поиска товаров:</p><ul><li><strong>Недвижимость:</strong> Квартиры, дома, коммерческие помещения</li><li><strong>Транспорт:</strong> Легковые авто, спецтехника</li><li><strong>Электроника:</strong> Смартфоны, ноутбуки, бытовая техника</li></ul><p>Следите за обновлениями!</p>',
                'image' => 'https://images.unsplash.com/photo-1556740738-b6a63e27c4df?q=80&w=2670&auto=format&fit=crop',
                'is_published' => true,
            ],
             [
                'title' => 'Технические работы 10 января',
                'excerpt' => 'Плановое обслуживание серверов.',
                'content' => '<p>Внимание! 10 января с 02:00 до 04:00 по времени Астаны будут проводиться <strong>плановые технические работы</strong>.</p><p>Сайт может быть временно недоступен. Приносим извинения за неудобства.</p>',
                'image' => null,
                'is_published' => false, // Черновик
            ],
        ];

        foreach ($posts as $post) {
            Post::create([
                'title' => $post['title'],
                'slug' => Str::slug($post['title']) . '-' . Str::random(6),
                'excerpt' => $post['excerpt'],
                'content' => $post['content'],
                'image' => $post['image'],
                'is_published' => $post['is_published'],
                'published_at' => $post['is_published'] ? now() : null,
                'user_id' => $superAdmin->id,
            ]);
        }

        $this->command->info('✅ Демо-новости успешно добавлены!');
    }
}
