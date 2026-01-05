import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Spinner } from '@/components/ui/spinner';
import { login } from '@/routes';
import { store } from '@/routes/register';
import { ArrowRight, Apple, Eye, EyeOff, User, Building } from 'lucide-react';
import { Form, Head, Link } from '@inertiajs/react';
import { useState } from 'react';

export default function Register() {
    const [selectedRole, setSelectedRole] = useState<'buyer' | 'seller' | null>(null);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    return (
        <>
            <Head title="Регистрация" />
            <Header />

            <div className="border-b border-gray-200 bg-gray-50 py-4">
                <div className="mx-auto max-w-7xl px-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Link href="/" className="hover:text-gray-900">Главная</Link>
                        <span>/</span>
                        <Link href="/account" className="hover:text-gray-900">Аккаунт</Link>
                        <span>/</span>
                        <span className="text-[#2B6B8F]">Регистрация</span>
                    </div>
                </div>
            </div>

            <div className="min-h-[60vh] bg-gray-50 py-8">
                <div className="mx-auto max-w-md px-4">
                    <div className="rounded bg-white p-6 shadow-sm">
                        <div className="mb-4 flex border-b border-gray-200">
                            <Link href={login()} className="px-4 py-2 font-bold uppercase text-gray-600 transition-colors hover:text-gray-900">
                                ВХОД
                            </Link>
                            <div className="border-b-2 border-[#FF6B35] px-4 py-2 font-bold uppercase text-[#FF6B35]">
                                Регистрация
                            </div>
                        </div>

                        {!selectedRole ? (
                            <div className="space-y-6">
                                <h3 className="text-center text-lg font-semibold text-gray-700">Какова ваша роль?</h3>
                                <div className="space-y-3">
                                    <button type="button" onClick={() => setSelectedRole('buyer')} className="flex w-full items-center justify-center gap-4 rounded border border-gray-300 h-12 transition-all hover:border-[#FF6B35] hover:bg-orange-50">
                                        <User className='text-black' />
                                        <span className="text-lg font-medium text-black">Покупатель</span>
                                    </button>
                                    <button type="button" onClick={() => setSelectedRole('seller')} className="flex w-full items-center justify-center gap-4 rounded border border-gray-300 h-12 transition-all hover:border-[#FF6B35] hover:bg-orange-50">
                                        <Building className='text-black' />
                                        <span className="text-lg font-medium text-black">Продавец (юр. лицо)</span>
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <Form {...store.form()} resetOnSuccess={['password', 'password_confirmation']} disableWhileProcessing className="space-y-3">
                                {({ processing, errors }) => (
                                    <>
                                        <p className="mb-4 text-sm text-gray-600">
                                            Вы регистрируетесь в качестве <span className="font-semibold">{selectedRole === 'buyer' ? 'Покупателя' : 'Продавца'}</span>
                                        </p>

                                        <div>
                                            <label className="mb-1 block text-sm text-gray-700">Имя</label>
                                            <Input type="text" name="name" required className="w-full rounded-sm h-9" />
                                            <InputError message={errors.name} />
                                        </div>

                                        <div>
                                            <label className="mb-1 block text-sm text-gray-700">Номер телефона</label>
                                            <Input type="tel" name="phone" required className="w-full rounded-sm h-9" />
                                            <InputError message={errors.phone} />
                                        </div>

                                        <div>
                                            <label className="mb-1 block text-sm text-gray-700">Адрес электронной почты</label>
                                            <Input type="email" name="email" required className="w-full rounded-sm h-9" />
                                            <InputError message={errors.email} />
                                        </div>

                                        {selectedRole === 'seller' && (
                                            <>
                                                <div>
                                                    <label className="mb-1 block text-sm text-gray-700">Тип организации</label>
                                                    <Input type="text" name="organization_type" required className="w-full rounded-sm h-9" />
                                                    <InputError message={errors.organization_type} />
                                                </div>
                                                <div>
                                                    <label className="mb-1 block text-sm text-gray-700">БИН/ИИН</label>
                                                    <Input type="text" name="bin" required className="w-full rounded-sm h-9" />
                                                    <InputError message={errors.bin} />
                                                </div>
                                            </>
                                        )}

                                        <div>
                                            <label className="mb-1 block text-sm text-gray-700">Пароль</label>
                                            <div className="relative">
                                                <Input type={showPassword ? 'text' : 'password'} name="password" required placeholder="8+ characters" className="w-full rounded-sm h-9 pr-10" />
                                                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                                                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                                </button>
                                            </div>
                                            <InputError message={errors.password} />
                                        </div>

                                        <div>
                                            <label className="mb-1 block text-sm text-gray-700">Подтвердите пароль</label>
                                            <div className="relative">
                                                <Input type={showConfirmPassword ? 'text' : 'password'} name="password_confirmation" required className="w-full rounded-sm h-9 pr-10" />
                                                <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                                                    {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                                </button>
                                            </div>
                                            <InputError message={errors.password_confirmation} />
                                        </div>

                                        <div className="flex items-start gap-2">
                                            <input type="checkbox" name="terms" required className="mt-1 h-4 w-4 rounded border-gray-300 text-[#FF6B35] focus:ring-[#FF6B35]" />
                                            <label className="text-sm text-gray-600">
                                                Общие условия и <Link href="/privacy" className="text-[#2B6B8F] hover:underline">Политика конфиденциальности</Link>.
                                            </label>
                                        </div>

                                        <input type="hidden" name="role" value={selectedRole} />

                                        <Button type="submit" className="w-full rounded-sm bg-[#FF6B35] h-10 text-white hover:bg-[#E55A2B]" disabled={processing}>
                                            {processing && <Spinner />}
                                            РЕГИСТРАЦИЯ
                                            <ArrowRight className="ml-2 h-5 w-5" />
                                        </Button>

                                        {selectedRole === 'buyer' && (
                                            <>
                                                <div className="relative my-4">
                                                    <div className="absolute inset-0 flex items-center">
                                                        <div className="w-full border-t border-gray-200" />
                                                    </div>
                                                    <div className="relative flex justify-center text-sm">
                                                        <span className="bg-white px-4 text-gray-500">или</span>
                                                    </div>
                                                </div>
                                                <div className="space-y-3">
                                                    <button type="button" className="flex w-full items-center justify-center gap-3 rounded-sm border border-gray-300 h-10 text-gray-700 transition-colors hover:bg-gray-50">
                                                        <svg className="h-5 w-5" viewBox="0 0 24 24">
                                                            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                                            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                                            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                                            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                                                        </svg>
                                                        Войдите через Google
                                                    </button>
                                                    <button type="button" className="flex w-full items-center justify-center gap-3 rounded-sm border border-gray-300 h-10 text-gray-700 transition-colors hover:bg-gray-50">
                                                        <Apple className="h-5 w-5" />
                                                        Войдите через Apple
                                                    </button>
                                                </div>
                                            </>
                                        )}
                                    </>
                                )}
                            </Form>
                        )}
                    </div>
                </div>
            </div>

            <Footer />
        </>
    );
}
