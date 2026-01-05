<?php

namespace App\Console\Commands;

use App\Models\User;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class CreateSuperAdmin extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'admin:create 
                            {--email=admin@admin.com : Email адрес супер-админа}
                            {--name=Супер Администратор : Имя супер-админа}
                            {--password= : Пароль (если не указан, будет сгенерирован)}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Создать супер-администратора';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $email = $this->option('email');
        $name = $this->option('name');
        $password = $this->option('password') ?: Str::random(12);

        // Проверяем, существует ли уже пользователь с таким email
        if (User::where('email', $email)->exists()) {
            if (!$this->confirm("Пользователь с email {$email} уже существует. Обновить его роль на super_admin?")) {
                $this->info('Операция отменена.');
                return Command::FAILURE;
            }

            $user = User::where('email', $email)->first();
            $user->update([
                'role' => 'super_admin',
                'password' => Hash::make($password),
            ]);

            $this->info("✅ Пользователь обновлен до супер-администратора!");
        } else {
            User::create([
                'name' => $name,
                'email' => $email,
                'password' => Hash::make($password),
                'role' => 'super_admin',
                'phone' => '+7 (777) 123-45-67',
                'email_verified_at' => now(),
            ]);

            $this->info("✅ Супер-администратор создан!");
        }

        $this->newLine();
        $this->line('📧 Email: ' . $email);
        $this->line('👤 Имя: ' . $name);
        $this->line('🔑 Пароль: ' . $password);
        $this->line('🔗 URL входа: /super-admin/login');
        $this->newLine();

        return Command::SUCCESS;
    }
}
