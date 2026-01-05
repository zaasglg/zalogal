import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { register } from '@/routes';
import { store } from '@/routes/login';
import { request } from '@/routes/password';
import { Form, Head, Link } from '@inertiajs/react';
import { Apple, Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';

interface LoginProps {
    status?: string;
    canResetPassword: boolean;
    canRegister: boolean;
}

export default function Login({
    status,
    canResetPassword,
    canRegister,
}: LoginProps) {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <>
            <Head title="Вход" />
            <Header />

            {/* Breadcrumbs */}
            <div className="border-b border-gray-200 bg-gray-50 py-4">
                <div className="mx-auto max-w-7xl">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Link href="/" className="hover:text-gray-900">
                            Главная
                        </Link>
                        <span>/</span>
                        <Link href="/account" className="hover:text-gray-900">
                            Аккаунт
                        </Link>
                        <span>/</span>
                        <span className="text-[#2B6B8F]">Вход</span>
                    </div>
                </div>
            </div>

            {/* Login Form */}
            <div className="min-h-[60vh] bg-gray-50 py-8">
                <div className="mx-auto max-w-md px-4">
                    <div className="rounded bg-white p-6 shadow-sm">
                        {/* Tabs */}
                        <div className="mb-4 flex border-b border-gray-200">
                            <div className="uppercase font-bold border-b-2 border-[#2B6B8F] px-4 py-2 text-[#2B6B8F]">
                                ВХОД
                            </div>
                            {canRegister && (
                                <Link
                                    href={register()}
                                    className="uppercase font-bold px-4 py-2 text-gray-600 transition-colors hover:text-gray-900"
                                >
                                    Регистрация
                                </Link>
                            )}
                        </div>

                        {status && (
                            <div className="mb-4 rounded bg-green-50 p-3 text-sm text-green-600">
                                {status}
                            </div>
                        )}

                        <Form
                            {...store.form()}
                            resetOnSuccess={['password']}
                            className="space-y-3"
                        >
                            {({ processing, errors }) => (
                                <>
                                    {/* Email */}
                                    <div>
                                        <Label
                                            htmlFor="email"
                                            className="mb-1 block text-sm text-black"
                                        >
                                            Адрес электронной почты
                                        </Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            name="email"
                                            required
                                            autoFocus
                                            autoComplete="email"
                                            className="w-full rounded-sm h-9"
                                        />
                                        <InputError message={errors.email} />
                                    </div>

                                    {/* Password */}
                                    <div>
                                        <div className="mb-1 flex items-center justify-between">
                                            <Label
                                                htmlFor="password"
                                                className="text-sm text-black"
                                            >
                                                Пароль
                                            </Label>
                                            {canResetPassword && (
                                                <TextLink
                                                    href={request()}
                                                    className="text-sm text-[#2B6B8F] hover:underline"
                                                >
                                                    Забыли пароль?
                                                </TextLink>
                                            )}
                                        </div>
                                        <div className="relative">
                                            <Input
                                                id="password"
                                                type={
                                                    showPassword
                                                        ? 'text'
                                                        : 'password'
                                                }
                                                name="password"
                                                required
                                                autoComplete="current-password"
                                                className="w-full rounded-sm h-9 pr-10"
                                            />
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    setShowPassword(
                                                        !showPassword,
                                                    )
                                                }
                                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                                            >
                                                {showPassword ? (
                                                    <EyeOff className="h-5 w-5" />
                                                ) : (
                                                    <Eye className="h-5 w-5" />
                                                )}
                                            </button>
                                        </div>
                                        <InputError message={errors.password} />
                                    </div>

                                    {/* Submit Button */}
                                    <Button
                                        type="submit"
                                        className="w-full rounded-sm bg-[#FF6B35] h-10 text-white hover:bg-[#E55A2B]"
                                        disabled={processing}
                                    >
                                        {processing && <Spinner />}
                                        ВХОД
                                    </Button>

                                    {/* Divider */}
                                    <div className="relative my-4">
                                        <div className="absolute inset-0 flex items-center">
                                            <div className="w-full border-t border-gray-200" />
                                        </div>
                                        <div className="relative flex justify-center text-sm">
                                            <span className="bg-white px-4 text-gray-500">
                                                или
                                            </span>
                                        </div>
                                    </div>

                                    {/* Social Login */}
                                    <div className="space-y-3">
                                        <button
                                            type="button"
                                            className="flex w-full items-center justify-center gap-3 rounded-sm border border-gray-300 h-10 text-gray-700 transition-colors hover:bg-gray-50"
                                        >
                                            <svg
                                                className="h-5 w-5"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    fill="#4285F4"
                                                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                                />
                                                <path
                                                    fill="#34A853"
                                                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                                />
                                                <path
                                                    fill="#FBBC05"
                                                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                                />
                                                <path
                                                    fill="#EA4335"
                                                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                                />
                                            </svg>
                                            Войдите через Google
                                        </button>
                                        <button
                                            type="button"
                                            className="flex w-full items-center justify-center gap-3 rounded-sm border border-gray-300 h-10 text-gray-700 transition-colors hover:bg-gray-50"
                                        >
                                            <Apple className="h-5 w-5" />
                                            Войдите через Apple
                                        </button>
                                    </div>
                                </>
                            )}
                        </Form>
                    </div>
                </div>
            </div>

            <Footer />
        </>
    );
}
