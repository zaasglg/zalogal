<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->enum('role', ['buyer', 'seller'])->default('buyer')->after('email');
            $table->string('phone')->nullable()->after('role');
            $table->string('organization_type')->nullable()->after('phone');
            $table->string('bin')->nullable()->after('organization_type');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn(['role', 'phone', 'organization_type', 'bin']);
        });
    }
};
