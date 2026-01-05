import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { Head, useForm } from '@inertiajs/react';

export default function SuperAdminLogin() {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    return (
        <>
            <Head title="Вход супер-администратора" />

            <div className="min-h-screen bg-white flex items-center justify-center p-4">
                <div className="w-full max-w-sm">
                    {/* Header */}
                    <div className="mb-10 text-center">
                        <h1 className="text-2xl font-semibold text-gray-900">
                            Zalogal Admin
                        </h1>
                        <p className="mt-2 text-sm text-gray-600">
                            Войдите в панель управления
                        </p>
                    </div>

                    {/* Form */}
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            post('/super-admin/login');
                        }}
                        className="space-y-5"
                    >
                        {/* Email */}
                        <div>
                            <Label
                                htmlFor="email"
                                className="block text-sm font-medium text-gray-700 mb-1"
                            >
                                Email
                            </Label>
                            <Input
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                onChange={(e) =>
                                    setData('email', e.target.value)
                                }
                                required
                                autoFocus
                                autoComplete="email"
                                className="w-full border-gray-200 focus:border-black focus:ring-black rounded-md"
                                placeholder="name@example.com"
                            />
                            <InputError message={errors.email} />
                        </div>

                        {/* Password */}
                        <div>
                            <div className="flex items-center justify-between mb-1">
                                <Label
                                    htmlFor="password"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Пароль
                                </Label>
                            </div>
                            <Input
                                id="password"
                                type="password"
                                name="password"
                                value={data.password}
                                onChange={(e) =>
                                    setData('password', e.target.value)
                                }
                                required
                                autoComplete="current-password"
                                className="w-full border-gray-200 focus:border-black focus:ring-black rounded-md"
                                placeholder="••••••••"
                            />
                            <InputError message={errors.password} />
                        </div>

                        {/* Remember Me */}
                        <div className="flex items-center">
                            <input
                                id="remember"
                                type="checkbox"
                                checked={data.remember}
                                onChange={(e) =>
                                    setData('remember', e.target.checked)
                                }
                                className="h-4 w-4 rounded border-gray-300 text-black focus:ring-black"
                            />
                            <Label
                                htmlFor="remember"
                                className="ml-2 text-sm text-gray-600"
                            >
                                Запомнить меня
                            </Label>
                        </div>

                        {/* Submit Button */}
                        <Button
                            type="submit"
                            className="w-full bg-black hover:bg-gray-800 text-white h-10 font-medium rounded-md transition-colors"
                            disabled={processing}
                        >
                            {processing && <Spinner className="mr-2 text-white" />}
                            Войти
                        </Button>
                    </form>

                    <div className="mt-8 text-center">
                        <p className="text-xs text-gray-400">
                            © 2024 Zalogal. Все права защищены.
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}
