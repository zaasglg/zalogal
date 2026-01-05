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
        Schema::table('orders', function (Blueprint $table) {
            $table->integer('quantity')->default(1)->after('total_price');
            $table->string('payment_method')->nullable()->after('quantity');
            $table->string('first_name')->nullable()->after('payment_method');
            $table->string('last_name')->nullable()->after('first_name');
            $table->string('company')->nullable()->after('last_name');
            $table->string('address')->nullable()->after('company');
            $table->string('country')->nullable()->after('address');
            $table->string('region')->nullable()->after('country');
            $table->string('city')->nullable()->after('region');
            $table->string('postal_code')->nullable()->after('city');
            $table->string('email')->nullable()->after('postal_code');
            $table->string('phone')->nullable()->after('email');
            $table->text('comment')->nullable()->after('phone');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('orders', function (Blueprint $table) {
            $table->dropColumn([
                'quantity',
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
            ]);
        });
    }
};
