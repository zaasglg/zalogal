<?php

namespace App\Http\Controllers\SuperAdmin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UserController extends Controller
{
    /**
     * Показать список всех пользователей
     */
    public function index(Request $request)
    {
        $query = User::query();

        // Фильтрация по роли
        if ($request->has('role') && $request->role) {
            $query->where('role', $request->role);
        }

        // Поиск
        if ($request->has('search') && $request->search) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('email', 'like', "%{$search}%")
                  ->orWhere('phone', 'like', "%{$search}%");
            });
        }

        $users = $query->latest()->paginate(20);

        return Inertia::render('super-admin/users/index', [
            'users' => $users,
            'filters' => $request->only(['role', 'search']),
        ]);
    }

    /**
     * Показать детали пользователя
     */
    public function show(User $user)
    {
        $user->load(['addresses', 'paymentCards', 'listings', 'cartItems']);
        
        return Inertia::render('super-admin/users/show', [
            'user' => $user,
        ]);
    }

    /**
     * Обновить пользователя
     */
    public function update(Request $request, User $user)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users,email,' . $user->id],
            'role' => ['required', 'in:buyer,seller,super_admin'],
            'phone' => ['nullable', 'string', 'max:20'],
            'organization_type' => ['nullable', 'string', 'max:255'],
            'bin' => ['nullable', 'string', 'max:12'],
        ]);

        $user->update($validated);

        return redirect()->back()->with('success', 'Пользователь успешно обновлен');
    }

    /**
     * Удалить пользователя
     */
    public function destroy(User $user)
    {
        // Не позволяем удалить самого себя
        if ($user->id === auth()->id()) {
            return redirect()->back()->with('error', 'Вы не можете удалить свой собственный аккаунт');
        }

        $user->delete();

        return redirect()->route('super-admin.users.index')->with('success', 'Пользователь успешно удален');
    }
}
