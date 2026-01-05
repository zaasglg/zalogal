<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class SuperAdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::firstOrCreate(
            ['email' => 'admin@admin.com'],
            [
                'name' => 'Супер Администратор',
                'password' => Hash::make('admin123'),
                'role' => 'super_admin',
                'phone' => '+7 (777) 123-45-67',
                'email_verified_at' => now(),
            ]
        );

        $this->command->info('✅ Супер-администратор создан!');
        $this->command->info('📧 Email: admin@admin.com');
        $this->command->info('🔑 Пароль: admin123');
        $this->command->info('🔗 URL входа: /super-admin/login');
    }
}
