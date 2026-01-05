<?php

namespace App\Http\Controllers\SuperAdmin;

use App\Http\Controllers\Controller;
use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class PostController extends Controller
{
    public function index(Request $request)
    {
        $query = Post::with('user');

        if ($request->has('search') && $request->search) {
            $search = $request->search;
            $query->where('title', 'like', "%{$search}%");
        }

        $posts = $query->latest()->paginate(10);

        return Inertia::render('super-admin/posts/index', [
            'posts' => $posts,
            'filters' => $request->only(['search']),
        ]);
    }

    public function create()
    {
        return Inertia::render('super-admin/posts/create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'excerpt' => 'nullable|string',
            'content' => 'required|string',
            'image_file' => 'nullable|image|max:2048',
            'image_url' => 'nullable|url',
            'image' => 'nullable|url',
            'is_published' => 'boolean',
        ]);

        $imagePath = null;
        if ($request->hasFile('image_file')) {
            $path = $request->file('image_file')->store('posts', 'public');
            $imagePath = '/storage/' . $path;
        } elseif ($request->filled('image_url')) {
             try {
                $response = \Illuminate\Support\Facades\Http::timeout(10)->get($request->image_url);
                if ($response->successful()) {
                    $imageContent = $response->body();
                    $extension = pathinfo(parse_url($request->image_url, PHP_URL_PATH), PATHINFO_EXTENSION) ?: 'jpg';
                    $filename = 'posts/' . Str::random(40) . '.' . $extension;
                    Storage::disk('public')->put($filename, $imageContent);
                    $imagePath = '/storage/' . $filename;
                }
            } catch (\Exception $e) {
                // Если не удалось загрузить по URL, пробуем оставить как есть, если это прямой URL
                 $imagePath = $request->image_url;
            }
        } elseif ($request->filled('image')) {
            $imagePath = $request->image;
        }

        Post::create([
            'title' => $validated['title'],
            'slug' => Str::slug($validated['title']) . '-' . Str::random(6),
            'excerpt' => $validated['excerpt'],
            'content' => $validated['content'],
            'image' => $imagePath,
            'is_published' => $validated['is_published'] ?? false,
            'published_at' => ($validated['is_published'] ?? false) ? now() : null,
            'user_id' => auth()->id(),
        ]);

        return redirect()->route('super-admin.posts.index')->with('success', 'Новость успешно создана');
    }

    public function edit(Post $post)
    {
        return Inertia::render('super-admin/posts/edit', [
            'post' => $post
        ]);
    }

    public function update(Request $request, Post $post)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'excerpt' => 'nullable|string',
            'content' => 'required|string',
            'image_file' => 'nullable|image|max:2048',
             'image_url' => 'nullable|url',
            'image' => 'nullable|url',
            'is_published' => 'boolean',
        ]);

        $imagePath = $post->image;
        if ($request->hasFile('image_file')) {
            if ($post->image && str_starts_with($post->image, '/storage/')) {
                 $oldPath = str_replace('/storage/', '', $post->image);
                 Storage::disk('public')->delete($oldPath);
            }
            $path = $request->file('image_file')->store('posts', 'public');
            $imagePath = '/storage/' . $path;
        } elseif ($request->filled('image_url')) {
            try {
                $response = \Illuminate\Support\Facades\Http::timeout(10)->get($request->image_url);
                if ($response->successful()) {
                    if ($post->image && str_starts_with($post->image, '/storage/')) {
                        $oldPath = str_replace('/storage/', '', $post->image);
                        Storage::disk('public')->delete($oldPath);
                    }
                    $imageContent = $response->body();
                    $extension = pathinfo(parse_url($request->image_url, PHP_URL_PATH), PATHINFO_EXTENSION) ?: 'jpg';
                    $filename = 'posts/' . Str::random(40) . '.' . $extension;
                    Storage::disk('public')->put($filename, $imageContent);
                    $imagePath = '/storage/' . $filename;
                }
            } catch (\Exception $e) {
                 $imagePath = $request->image_url;
            }
        } elseif ($request->filled('image')) {
            $imagePath = $request->image;
        }

        $post->update([
            'title' => $validated['title'],
            'excerpt' => $validated['excerpt'],
            'content' => $validated['content'],
            'image' => $imagePath,
            'is_published' => $validated['is_published'] ?? false,
            'published_at' => ($validated['is_published'] ?? false) ? ($post->published_at ?? now()) : null,
        ]);

        return redirect()->route('super-admin.posts.index')->with('success', 'Новость успешно обновлена');
    }

    public function destroy(Post $post)
    {
        if ($post->image && str_starts_with($post->image, '/storage/')) {
             $oldPath = str_replace('/storage/', '', $post->image);
             Storage::disk('public')->delete($oldPath);
        }
        $post->delete();
        return redirect()->route('super-admin.posts.index')->with('success', 'Новость удалена');
    }
}
