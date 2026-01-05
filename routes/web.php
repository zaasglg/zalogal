<?php

use App\Http\Controllers\AddressController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\ListingController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\PaymentCardController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

Route::get('/', function () {
    $query = \App\Models\Listing::where('status', 'active')->latest();

    if (auth()->check()) {
        $query->withExists(['favoritedBy as is_favorited' => function ($q) {
            $q->where('user_id', auth()->id());
        }]);
    }

    $listings = $query->take(8)->get();
    $categories = \App\Models\Category::all();
    $sellers = \App\Models\User::where('role', 'seller')->latest()->take(3)->get();

    // Data for OrganizationsSection
    $organizationListings = \App\Models\Listing::where('status', 'active')
        ->with('user') // Eager load user for logo/name
        ->latest()
        ->take(12)
        ->get();
        
    // Data for NewsSection
    $posts = \App\Models\Post::where('is_published', true)
        ->with('user')
        ->latest('published_at')
        ->take(3)
        ->get();

    $totalSellers = \App\Models\User::where('role', 'seller')->count();
    // Assuming 'active' logic typically involves checking email verification or a status column, 
    // for now we'll just use total count or a simple condition.
    $activeSellers = \App\Models\User::where('role', 'seller')->whereNotNull('email_verified_at')->count();


    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
        'listings' => $listings,
        'categories' => $categories,
        'sellers' => $sellers,
        'organizationListings' => $organizationListings,
        'posts' => $posts,
        'organizationStats' => [
            'total' => $totalSellers,
            'active' => $activeSellers,
        ],
    ]);
})->name('home');

Route::get('/products', [ListingController::class, 'products'])->name('products');

Route::get('/products/{id}', [ListingController::class, 'show'])->name('products.show');
Route::get('/listings/search', [ListingController::class, 'searchJson'])->name('listings.search');
Route::post('/listings/bulk-details', [ListingController::class, 'bulkDetails'])->name('listings.bulk');

Route::middleware(['auth'])->group(function () {
    Route::get('/wishlist', [App\Http\Controllers\FavoriteController::class, 'index'])->name('wishlist');
    Route::post('/listings/{listing}/favorite', [App\Http\Controllers\FavoriteController::class, 'toggle'])->name('listings.favorite');
    Route::post('/products/{id}/reviews', [\App\Http\Controllers\ReviewController::class, 'store'])->name('reviews.store');
});

Route::get('/cart', [CartController::class, 'index'])->middleware('auth')->name('cart');

Route::get('/checkout', [CartController::class, 'checkout'])->middleware('auth')->name('checkout');

Route::get('/order-success', function () {
    return Inertia::render('order-success');
})->name('order-success');

Route::get('/compare', function () {
    return Inertia::render('compare');
})->name('compare');

Route::get('/track-order', function () {
    return Inertia::render('track-order');
})->name('track-order');
Route::post('/track-order', [OrderController::class, 'track'])->name('track-order.search');
Route::get('/track-order/details/{id}', [OrderController::class, 'show'])->name('track-order.details');

Route::get('/blog', function (\Illuminate\Http\Request $request) {
    $query = \App\Models\Post::where('is_published', true)->with('user');

    if ($request->has('search')) {
        $search = $request->input('search');
        $query->where(function ($q) use ($search) {
            $q->where('title', 'like', "%{$search}%")
              ->orWhere('excerpt', 'like', "%{$search}%")
              ->orWhere('content', 'like', "%{$search}%");
        });
    }

    $posts = $query->latest('published_at')->paginate(8)->withQueryString();

    $latestPosts = \App\Models\Post::where('is_published', true)
        ->latest('published_at')
        ->take(3)
        ->get();

    return Inertia::render('blog', [
        'posts' => $posts,
        'latestPosts' => $latestPosts,
        'filters' => $request->only(['search']),
    ]);
})->name('blog');

Route::get('/blog/{id}', function ($id) {
    // Find post or fail
    $post = \App\Models\Post::where('id', $id)
        ->where('is_published', true)
        ->with(['user', 'comments']) // Eager load comments
        ->firstOrFail();
    
    // Fetch latest posts for sidebar
    $latestPosts = \App\Models\Post::where('is_published', true)
        ->where('id', '!=', $id) // Exclude current post
        ->latest('published_at')
        ->take(3)
        ->get();

    return Inertia::render('blog-detail', [
        'post' => $post,
        'latestPosts' => $latestPosts,
    ]);
})->name('blog.show');

Route::post('/blog/{id}/comments', [\App\Http\Controllers\CommentController::class, 'store'])->name('comments.store');

Route::get('/support', function () {
    return Inertia::render('Support');
})->name('support');

Route::get('/faq', function () {
    return Inertia::render('FAQ');
})->name('faq');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        $user = auth()->user();
        
        $stats = [
            'total_listings' => $user->listings()->count(),
            'active_listings' => $user->listings()->where('status', 'active')->count(),
            'total_orders' => 0,
            'pending_orders' => 0,
            'completed_orders' => 0,
            'revenue' => 0,
        ];

        if ($user->role === 'seller') {
            $stats['total_orders'] = \App\Models\Order::where('seller_id', $user->id)->count();
            $stats['pending_orders'] = \App\Models\Order::where('seller_id', $user->id)->where('status', 'pending')->count();
            $stats['completed_orders'] = \App\Models\Order::where('seller_id', $user->id)->whereIn('status', ['completed', 'delivered'])->count();
            // Calculate revenue from completed orders
            $stats['revenue'] = \App\Models\Order::where('seller_id', $user->id)
                ->whereIn('status', ['completed', 'delivered'])
                ->sum('total_amount');
        } elseif ($user->role === 'buyer') {
             $stats['total_orders'] = $user->cartItems()->count(); // Just an example or use Order model if buyers have orders
             // usually buyers have orders where user_id = auth->id
             $stats['total_orders'] = \App\Models\Order::where('user_id', $user->id)->count();
        }

        return Inertia::render('dashboard', [
            'stats' => $stats
        ]);
    })->name('dashboard');

    Route::get('profile', function () {
        $billingAddress = auth()->user()->addresses()->where('type', 'billing')->first();
        $paymentCards = auth()->user()->paymentCards;
        
        // Статистика заказов для продавца
        $orderStats = [
            'total_orders' => \App\Models\Order::where('seller_id', auth()->id())->count(),
            'pending_orders' => \App\Models\Order::where('seller_id', auth()->id())->where('status', 'pending')->count(),
            'completed_orders' => \App\Models\Order::where('seller_id', auth()->id())->whereIn('status', ['completed', 'delivered'])->count(),
        ];
        
        return Inertia::render('profile', [
            'billingAddress' => $billingAddress,
            'paymentCards' => $paymentCards,
            'orderStats' => $orderStats,
        ]);
    })->name('profile');

    Route::get('/profile/orders', [OrderController::class, 'buyerOrders'])->name('profile.orders');

    Route::get('/profile/address', function () {
        return Inertia::render('profile-address');
    })->name('profile.address');

    Route::get('/profile/chat', function () {
        return Inertia::render('profile-chat');
    })->name('profile.chat');

    Route::get('/address/edit', [AddressController::class, 'edit'])->name('address.edit');
    Route::post('/address/update', [AddressController::class, 'update'])->name('address.update');

    Route::post('/cards', [PaymentCardController::class, 'store'])->name('cards.store');
    Route::delete('/cards/{card}', [PaymentCardController::class, 'destroy'])->name('cards.destroy');

    Route::get('/profile/listings', [ListingController::class, 'index'])->name('listings.index');
    Route::post('/listings', [ListingController::class, 'store'])->name('listings.store');
    Route::put('/listings/{listing}', [ListingController::class, 'update'])->name('listings.update');
    Route::delete('/listings/{listing}', [ListingController::class, 'destroy'])->name('listings.destroy');
    Route::post('/listings/{listing}/archive', [ListingController::class, 'archive'])->name('listings.archive');
    
    Route::get('/profile/archive', [ListingController::class, 'archived'])->name('listings.archived');
    Route::post('/listings/{listing}/restore', [ListingController::class, 'restore'])->name('listings.restore');
    
    Route::get('/profile/seller-orders', [OrderController::class, 'index'])->name('orders.index');
    Route::post('/orders/{order}/status', [OrderController::class, 'updateStatus'])->name('orders.updateStatus');
    
    Route::post('/cart', [CartController::class, 'store'])->name('cart.store');
    Route::put('/cart/{cartItem}', [CartController::class, 'update'])->name('cart.update');
    Route::delete('/cart/{cartItem}', [CartController::class, 'destroy'])->name('cart.destroy');
    Route::post('/checkout', [OrderController::class, 'checkout'])->name('checkout.store');
});

// Супер-админ маршруты
Route::prefix('super-admin')->name('super-admin.')->group(function () {
    Route::get('/', function () {
        if (auth()->check() && auth()->user()->role === 'super_admin') {
            return redirect()->route('super-admin.dashboard');
        }
        return redirect()->route('super-admin.login');
    });

    // Публичные маршруты (вход)
    Route::get('/login', [\App\Http\Controllers\SuperAdmin\AuthController::class, 'showLoginForm'])->name('login');
    Route::post('/login', [\App\Http\Controllers\SuperAdmin\AuthController::class, 'login'])->name('login.store');
    
    // Защищенные маршруты
    Route::middleware(['auth', 'super-admin'])->group(function () {
        Route::post('/logout', [\App\Http\Controllers\SuperAdmin\AuthController::class, 'logout'])->name('logout');
        Route::get('/dashboard', [\App\Http\Controllers\SuperAdmin\DashboardController::class, 'index'])->name('dashboard');
        
        // Управление пользователями
        Route::resource('users', \App\Http\Controllers\SuperAdmin\UserController::class);
        
        // Управление категориями
        Route::resource('categories', \App\Http\Controllers\SuperAdmin\CategoryController::class);
    Route::resource('posts', \App\Http\Controllers\SuperAdmin\PostController::class);
    });
});

require __DIR__.'/settings.php';
