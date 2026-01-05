<?php

namespace App\Http\Controllers\SuperAdmin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;

class AuthController extends Controller
{
    /**
     * Показать форму входа для супер-админа
     */
    public function showLoginForm()
    {
        return Inertia::render('super-admin/auth/login');
    }

    /**
     * Обработка входа супер-админа
     */
    public function login(Request $request)
    {
        $request->validate([
            'email' => ['required', 'string', 'email'],
            'password' => ['required', 'string'],
        ]);

        $credentials = $request->only('email', 'password');
        $remember = $request->boolean('remember');

        // Проверяем, что пользователь существует и является супер-админом
        $user = \App\Models\User::where('email', $credentials['email'])->first();

        if (!$user || $user->role !== 'super_admin') {
            throw ValidationException::withMessages([
                'email' => ['Эти учетные данные не соответствуют записям супер-администратора.'],
            ]);
        }

        if (Auth::attempt($credentials, $remember)) {
            $request->session()->regenerate();
            return redirect()->intended(route('super-admin.dashboard'));
        }

        throw ValidationException::withMessages([
            'email' => ['Предоставленные учетные данные неверны.'],
        ]);
    }

    /**
     * Выход супер-админа
     */
    public function logout(Request $request)
    {
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect()->route('super-admin.login');
    }
}
