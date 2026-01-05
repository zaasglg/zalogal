<?php

namespace App\Http\Controllers\SuperAdmin;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Http;
use Inertia\Inertia;

class CategoryController extends Controller
{
    /**
     * Показать список всех категорий
     */
    public function index(Request $request)
    {
        $query = Category::withCount('listings');

        // Поиск
        if ($request->has('search') && $request->search) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('slug', 'like', "%{$search}%");
            });
        }

        $categories = $query->latest()->paginate(20);

        return Inertia::render('super-admin/categories/index', [
            'categories' => $categories,
            'filters' => $request->only(['search']),
        ]);
    }

    /**
     * Показать форму создания категории
     */
    public function create()
    {
        return Inertia::render('super-admin/categories/create');
    }

    /**
     * Сохранить новую категорию
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255', 'unique:categories,name'],
            'image' => ['nullable', 'string', 'url', 'max:500'],
            'image_file' => ['nullable', 'image', 'max:2048'],
            'image_url' => ['nullable', 'string', 'url', 'max:500'],
        ]);

        $imagePath = null;

        // Загрузка файла
        if ($request->hasFile('image_file')) {
            $path = $request->file('image_file')->store('categories', 'public');
            $imagePath = '/storage/' . $path;
        }
        // Загрузка по URL
        elseif ($request->filled('image_url')) {
            try {
                $response = Http::timeout(10)->get($request->image_url);
                if ($response->successful()) {
                    $imageContent = $response->body();
                    $extension = pathinfo(parse_url($request->image_url, PHP_URL_PATH), PATHINFO_EXTENSION) ?: 'jpg';
                    $filename = 'categories/' . Str::random(40) . '.' . $extension;
                    Storage::disk('public')->put($filename, $imageContent);
                    $imagePath = '/storage/' . $filename;
                }
            } catch (\Exception $e) {
                // Если не удалось загрузить по URL, используем URL напрямую
                $imagePath = $request->image_url;
            }
        }
        // Прямой URL
        elseif ($request->filled('image')) {
            $imagePath = $request->image;
        }

        Category::create([
            'name' => $validated['name'],
            'slug' => Str::slug($validated['name']),
            'image' => $imagePath,
        ]);

        return redirect()->route('super-admin.categories.index')
            ->with('success', 'Категория успешно создана');
    }

    /**
     * Показать форму редактирования категории
     */
    public function edit(Category $category)
    {
        return Inertia::render('super-admin/categories/edit', [
            'category' => $category,
        ]);
    }

    /**
     * Обновить категорию
     */
    public function update(Request $request, Category $category)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255', 'unique:categories,name,' . $category->id],
            'image' => ['nullable', 'string', 'url', 'max:500'],
            'image_file' => ['nullable', 'image', 'max:2048'],
            'image_url' => ['nullable', 'string', 'url', 'max:500'],
        ]);

        $imagePath = $category->image;

        // Загрузка файла
        if ($request->hasFile('image_file')) {
            // Удаляем старое изображение если оно было загружено локально
            if ($category->image && str_starts_with($category->image, '/storage/')) {
                $oldPath = str_replace('/storage/', '', $category->image);
                Storage::disk('public')->delete($oldPath);
            }
            $path = $request->file('image_file')->store('categories', 'public');
            $imagePath = '/storage/' . $path;
        }
        // Загрузка по URL
        elseif ($request->filled('image_url')) {
            try {
                $response = Http::timeout(10)->get($request->image_url);
                if ($response->successful()) {
                    // Удаляем старое изображение если оно было загружено локально
                    if ($category->image && str_starts_with($category->image, '/storage/')) {
                        $oldPath = str_replace('/storage/', '', $category->image);
                        Storage::disk('public')->delete($oldPath);
                    }
                    $imageContent = $response->body();
                    $extension = pathinfo(parse_url($request->image_url, PHP_URL_PATH), PATHINFO_EXTENSION) ?: 'jpg';
                    $filename = 'categories/' . Str::random(40) . '.' . $extension;
                    Storage::disk('public')->put($filename, $imageContent);
                    $imagePath = '/storage/' . $filename;
                }
            } catch (\Exception $e) {
                // Если не удалось загрузить по URL, используем URL напрямую
                $imagePath = $request->image_url;
            }
        }
        // Прямой URL
        elseif ($request->filled('image')) {
            $imagePath = $request->image;
        }

        $category->update([
            'name' => $validated['name'],
            'slug' => Str::slug($validated['name']),
            'image' => $imagePath,
        ]);

        return redirect()->route('super-admin.categories.index')
            ->with('success', 'Категория успешно обновлена');
    }

    /**
     * Удалить категорию
     */
    public function destroy(Category $category)
    {
        // Проверяем, есть ли товары в этой категории
        if ($category->listings()->count() > 0) {
            return redirect()->back()
                ->with('error', 'Невозможно удалить категорию, так как в ней есть товары');
        }

        $category->delete();

        return redirect()->route('super-admin.categories.index')
            ->with('success', 'Категория успешно удалена');
    }
}
