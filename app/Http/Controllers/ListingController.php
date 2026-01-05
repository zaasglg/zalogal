<?php

namespace App\Http\Controllers;

use App\Models\Listing;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Http;
use Inertia\Inertia;

class ListingController extends Controller
{
    public function index()
    {
        $listings = auth()->user()->listings()->where('status', 'active')->latest()->paginate(10);
        $categories = Category::orderBy('name')->get(['id', 'name']);
        
        return Inertia::render('Profile/Listings', [
            'listings' => $listings,
            'categories' => $categories,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'price' => 'required|numeric|min:0',
            'category' => 'required|string',
            'condition' => 'required|string',
            'location' => 'required|string',
            'images.*' => 'nullable|image|max:2048',
            'image_urls.*' => 'nullable|string|url|max:500',
            'specifications' => 'nullable|array',
            'specifications.*.key' => 'required_with:specifications|string|max:255',
            'specifications.*.value' => 'required_with:specifications|string|max:255',
        ]);

        $imagePaths = [];
        
        // Загрузка файлов
        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $image) {
                $path = $image->store('listings', 'public');
                $imagePaths[] = '/storage/' . $path;
            }
        }
        
        // Загрузка по URL
        if ($request->filled('image_urls')) {
            foreach ($request->image_urls as $url) {
                if (empty($url)) continue;
                
                try {
                    $response = Http::timeout(10)->get($url);
                    if ($response->successful()) {
                        $imageContent = $response->body();
                        $extension = pathinfo(parse_url($url, PHP_URL_PATH), PATHINFO_EXTENSION) ?: 'jpg';
                        $filename = 'listings/' . Str::random(40) . '.' . $extension;
                        Storage::disk('public')->put($filename, $imageContent);
                        $imagePaths[] = '/storage/' . $filename;
                    } else {
                        // Если не удалось загрузить, используем URL напрямую
                        $imagePaths[] = $url;
                    }
                } catch (\Exception $e) {
                    // Если не удалось загрузить, используем URL напрямую
                    $imagePaths[] = $url;
                }
            }
        }

        // Фильтруем пустые характеристики
        $specifications = collect($request->input('specifications', []))
            ->filter(fn($spec) => !empty($spec['key']) && !empty($spec['value']))
            ->values()
            ->toArray();

        auth()->user()->listings()->create([
            ...$validated,
            'images' => $imagePaths,
            'specifications' => !empty($specifications) ? $specifications : null,
        ]);

        return back()->with('success', 'Объявление успешно создано');
    }

    public function update(Request $request, Listing $listing)
    {
        if ($listing->user_id !== auth()->id()) {
            abort(403);
        }

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'price' => 'required|numeric|min:0',
            'category' => 'required|string',
            'condition' => 'required|string',
            'location' => 'required|string',
            'images.*' => 'nullable|image|max:2048',
            'image_urls.*' => 'nullable|string|url|max:500',
            'existing_images.*' => 'nullable|string',
            'specifications' => 'nullable|array',
            'specifications.*.key' => 'required_with:specifications|string|max:255',
            'specifications.*.value' => 'required_with:specifications|string|max:255',
        ]);

        // Начинаем с существующих изображений, которые пользователь хочет сохранить
        $imagePaths = $request->input('existing_images', []);
        
        // Загрузка файлов
        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $image) {
                $path = $image->store('listings', 'public');
                $imagePaths[] = '/storage/' . $path;
            }
        }
        
        // Загрузка по URL
        if ($request->filled('image_urls')) {
            foreach ($request->image_urls as $url) {
                if (empty($url)) continue;
                
                try {
                    $response = Http::timeout(10)->get($url);
                    if ($response->successful()) {
                        $imageContent = $response->body();
                        $extension = pathinfo(parse_url($url, PHP_URL_PATH), PATHINFO_EXTENSION) ?: 'jpg';
                        $filename = 'listings/' . Str::random(40) . '.' . $extension;
                        Storage::disk('public')->put($filename, $imageContent);
                        $imagePaths[] = '/storage/' . $filename;
                    } else {
                        // Если не удалось загрузить, используем URL напрямую
                        $imagePaths[] = $url;
                    }
                } catch (\Exception $e) {
                    // Если не удалось загрузить, используем URL напрямую
                    $imagePaths[] = $url;
                }
            }
        }

        // Фильтруем пустые характеристики
        $specifications = collect($request->input('specifications', []))
            ->filter(fn($spec) => !empty($spec['key']) && !empty($spec['value']))
            ->values()
            ->toArray();

        $listing->update([
            ...$validated,
            'images' => $imagePaths,
            'specifications' => !empty($specifications) ? $specifications : null,
        ]);

        return back()->with('success', 'Объявление успешно обновлено');
    }

    public function destroy(Listing $listing)
    {
        if ($listing->user_id !== auth()->id()) {
            abort(403);
        }

        $listing->delete();

        return back()->with('success', 'Объявление удалено');
    }

    public function archive(Listing $listing)
    {
        if ($listing->user_id !== auth()->id()) {
            abort(403);
        }

        $listing->update(['status' => 'archived']);

        return back()->with('success', 'Объявление перемещено в архив');
    }

    public function archived()
    {
        $listings = auth()->user()->listings()->where('status', 'archived')->latest()->paginate(10);
        
        return Inertia::render('Profile/Archive', [
            'listings' => $listings,
        ]);
    }

    public function restore(Listing $listing)
    {
        if ($listing->user_id !== auth()->id()) {
            abort(403);
        }

        $listing->update(['status' => 'active']);

        return back()->with('success', 'Объявление восстановлено');
    }

    public function show($id)
    {
        $listing = Listing::where('status', 'active')->findOrFail($id);
        
        // Получаем связанные товары из той же категории
        $relatedListings = Listing::where('status', 'active')
            ->where('category', $listing->category)
            ->where('id', '!=', $listing->id)
            ->latest()
            ->take(4)
            ->get();
            
        $listing->load(['reviews.user']);

        $isFavorited = auth()->check() 
            ? auth()->user()->favorites()->where('listing_id', $listing->id)->exists()
            : false;

        $hasPurchased = auth()->check() 
            ? \App\Models\Order::where('buyer_id', auth()->id())
                ->where('listing_id', $listing->id)
                ->whereIn('status', ['completed', 'delivered'])
                ->exists()
            : false;
            
        $hasReviewed = auth()->check()
            ? $listing->reviews()->where('user_id', auth()->id())->exists()
            : false;

        return Inertia::render('product-detail', [
            'listing' => $listing,
            'relatedListings' => $relatedListings,
            'isFavorited' => $isFavorited,
            'canReview' => $hasPurchased && !$hasReviewed,
        ]);
    }

    public function products(Request $request)
    {
        $query = Listing::where('status', 'active');

        // Фильтрация по категории
        if ($request->has('category') && $request->category) {
            $query->where('category', $request->category);
        }

        // Фильтрация по цене
        if ($request->has('min_price') && $request->min_price) {
            $query->where('price', '>=', $request->min_price);
        }
        if ($request->has('max_price') && $request->max_price) {
            $query->where('price', '<=', $request->max_price);
        }

        // Поиск
        if ($request->has('search') && $request->search) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                  ->orWhere('description', 'like', "%{$search}%");
            });
        }

        // Сортировка
        $sortBy = $request->get('sort', 'latest');
        switch ($sortBy) {
            case 'price-low':
                $query->orderBy('price', 'asc');
                break;
            case 'price-high':
                $query->orderBy('price', 'desc');
                break;
            case 'newest':
                $query->latest();
                break;
            case 'popular':
            default:
                $query->latest();
                break;
        }

        if (auth()->check()) {
            $query->withExists(['favoritedBy as is_favorited' => function ($q) {
                $q->where('user_id', auth()->id());
            }]);
        }

        $listings = $query->paginate(20);
        
        // Получаем все категории с количеством товаров
        $categories = Category::withCount(['listings' => function ($query) {
            $query->where('status', 'active');
        }])->orderBy('name')->get();

        $filters = $request->only(['category', 'min_price', 'max_price', 'search', 'sort']);
        
        // Убеждаемся, что filters всегда является объектом
        $filters = is_array($filters) ? array_filter($filters, fn($value) => $value !== null && $value !== '') : [];
        
        return Inertia::render('products', [
            'listings' => $listings,
            'categories' => $categories,
            'filters' => $filters,
        ]);
    }
    public function bulkDetails(Request $request)
    {
        $ids = $request->input('ids', []);
        
        $listings = Listing::whereIn('id', $ids)
            ->where('status', 'active')
            ->withCount('reviews')
            ->withAvg('reviews', 'rating')
            ->get();
            
        return response()->json($listings);
    }
    public function searchJson(Request $request)
    {
        $query = $request->input('query');
        
        $listings = Listing::where('status', 'active')
            ->where(function ($q) use ($query) {
                $q->where('title', 'like', "%{$query}%")
                  ->orWhere('description', 'like', "%{$query}%");
            })
            ->latest()
            ->take(10)
            ->get(['id', 'title', 'images', 'price', 'category']);
            
        return response()->json($listings);
    }
}