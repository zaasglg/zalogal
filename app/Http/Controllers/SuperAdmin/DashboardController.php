<?php

namespace App\Http\Controllers\SuperAdmin;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Listing;
use App\Models\Order;
use Inertia\Inertia;

class DashboardController extends Controller
{
    /**
     * Показать главную панель супер-админа
     */
    public function index()
    {
        $stats = [
            'total_users' => User::count(),
            'total_listings' => Listing::count(),
            'active_listings' => Listing::where('status', 'active')->count(),
            'total_orders' => Order::count(),
            'pending_orders' => Order::where('status', 'pending')->count(),
            'completed_orders' => Order::whereIn('status', ['completed', 'delivered'])->count(),
            'revenue' => Order::whereIn('status', ['completed', 'delivered'])->sum('total_amount'),
        ];
        
        // We can pass recent_users/orders as additional props if Dashboard supports them later,
        // or just stick to the shared 'dashboard' logic for now. 
        // Since dashboard.tsx handles generic stats well, this is enough to start.
        
        return Inertia::render('dashboard', [
            'stats' => $stats,
        ]);
    }
}
