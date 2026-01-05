<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        $driver = DB::connection()->getDriverName();
        
        if ($driver === 'sqlite') {
            // Для SQLite нужно пересоздать таблицу
            // Удаляем временную таблицу если существует
            DB::statement("DROP TABLE IF EXISTS users_new");
            
            // Сначала создаем временную таблицу с новым enum
            DB::statement("
                CREATE TABLE users_new (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    name VARCHAR(255) NOT NULL,
                    email VARCHAR(255) NOT NULL UNIQUE,
                    email_verified_at DATETIME,
                    password VARCHAR(255) NOT NULL,
                    role VARCHAR(20) NOT NULL DEFAULT 'buyer' CHECK(role IN ('buyer', 'seller', 'super_admin')),
                    phone VARCHAR(255),
                    organization_type VARCHAR(255),
                    bin VARCHAR(255),
                    remember_token VARCHAR(100),
                    two_factor_secret TEXT,
                    two_factor_recovery_codes TEXT,
                    two_factor_confirmed_at DATETIME,
                    created_at DATETIME,
                    updated_at DATETIME
                )
            ");
            
            // Копируем данные, устанавливая role по умолчанию если NULL
            DB::statement("
                INSERT INTO users_new 
                SELECT 
                    id,
                    name,
                    email,
                    email_verified_at,
                    password,
                    COALESCE(role, 'buyer') as role,
                    phone,
                    organization_type,
                    bin,
                    remember_token,
                    two_factor_secret,
                    two_factor_recovery_codes,
                    two_factor_confirmed_at,
                    created_at,
                    updated_at
                FROM users
            ");
            
            // Удаляем старую таблицу
            Schema::dropIfExists('users');
            
            // Переименовываем новую таблицу
            DB::statement("ALTER TABLE users_new RENAME TO users");
            
            // Восстанавливаем индексы
            Schema::table('users', function (Blueprint $table) {
                $table->index('email');
            });
        } else {
            // Для MySQL/MariaDB используем MODIFY
            DB::statement("ALTER TABLE users MODIFY COLUMN role ENUM('buyer', 'seller', 'super_admin') DEFAULT 'buyer'");
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        $driver = DB::connection()->getDriverName();
        
        if ($driver === 'sqlite') {
            // Для SQLite пересоздаем таблицу с старым enum
            DB::statement("
                CREATE TABLE users_old (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    name VARCHAR(255) NOT NULL,
                    email VARCHAR(255) NOT NULL UNIQUE,
                    email_verified_at DATETIME,
                    password VARCHAR(255) NOT NULL,
                    role VARCHAR(20) NOT NULL DEFAULT 'buyer' CHECK(role IN ('buyer', 'seller')),
                    phone VARCHAR(255),
                    organization_type VARCHAR(255),
                    bin VARCHAR(255),
                    remember_token VARCHAR(100),
                    two_factor_secret TEXT,
                    two_factor_recovery_codes TEXT,
                    two_factor_confirmed_at DATETIME,
                    created_at DATETIME,
                    updated_at DATETIME
                )
            ");
            
            // Копируем данные (только buyer и seller)
            DB::statement("
                INSERT INTO users_old 
                SELECT * FROM users WHERE role IN ('buyer', 'seller')
            ");
            
            Schema::dropIfExists('users');
            DB::statement("ALTER TABLE users_old RENAME TO users");
            
            Schema::table('users', function (Blueprint $table) {
                $table->index('email');
            });
        } else {
            DB::statement("ALTER TABLE users MODIFY COLUMN role ENUM('buyer', 'seller') DEFAULT 'buyer'");
        }
    }
};
