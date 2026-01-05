import { Breadcrumbs } from '@/components/breadcrumbs';
import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import { Toast } from '@/components/Toast';
import { Button } from '@/components/ui/button';
import { Head, Link, router } from '@inertiajs/react';
import { ArrowRight, Minus, Plus, X } from 'lucide-react';

interface CartItem {
    id: number;
    quantity: number;
    listing: {
        id: number;
        title: string;
        price: number;
        images: string[] | null;
    };
}

interface Props {
    cartItems: CartItem[];
}

export default function Cart({ cartItems }: Props) {
    const updateQuantity = (id: number, quantity: number) => {
        if (quantity < 1) return;
        router.put(`/cart/${id}`, { quantity }, { preserveScroll: true });
    };

    const removeItem = (id: number) => {
        router.delete(`/cart/${id}`, { preserveScroll: true });
    };

    const subtotal = cartItems.reduce(
        (sum, item) => sum + item.listing.price * item.quantity,
        0,
    );

    return (
        <>
            <Head title="Корзина - Zalogal" />
            <Header />

            <div className="bg-[#F2F4F5] py-4">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <Breadcrumbs
                        breadcrumbs={[
                            { title: 'Главная', href: '/' },
                            { title: 'Корзина', href: '' },
                        ]}
                    />
                </div>
            </div>

            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 mb-12">
                <h1 className="text-2xl font-semibold mb-6">Корзина для покупок</h1>

                {cartItems.length === 0 ? (
                    <div className="rounded-lg border border-gray-200 bg-white p-12 text-center shadow-sm">
                        <div className="flex justify-center mb-4">
                            <div className="h-24 w-24 rounded-full bg-orange-50 flex items-center justify-center">
                                <ArrowRight className="h-10 w-10 text-[#FA8232] opacity-50 rotate-180" />
                            </div>
                        </div>
                        <h2 className="text-xl font-bold text-gray-900 mb-2">Ваша корзина пуста</h2>
                        <p className="text-gray-500 mb-6">Похоже, вы еще ничего не добавили в корзину.</p>
                        <Link href="/">
                            <Button className="bg-[#FA8232] hover:bg-[#E97527] h-12 px-8">
                                ВЕРНУТЬСЯ К ПОКУПКАМ
                            </Button>
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                        <div className="lg:col-span-8">
                            <div className="rounded-lg border border-gray-200 bg-white shadow-sm overflow-hidden">
                                {/* Desktop Header */}
                                <div className="hidden md:grid grid-cols-12 gap-4 border-b border-gray-200 bg-gray-50 px-6 py-4 text-sm font-semibold uppercase text-gray-700">
                                    <div className="col-span-6">Продукты</div>
                                    <div className="col-span-2 text-center">Цена</div>
                                    <div className="col-span-2 text-center">Количество</div>
                                    <div className="col-span-2 text-center">Итого</div>
                                </div>

                                <div className="divide-y divide-gray-200">
                                    {cartItems.map((item) => (
                                        <div key={item.id} className="p-4 md:px-6 md:py-6 relative">
                                            {/* Mobile Delete Button (Absolute) */}
                                            <button
                                                onClick={() => removeItem(item.id)}
                                                className="absolute top-4 right-4 md:hidden p-2 text-gray-400 hover:text-red-500"
                                            >
                                                <X className="h-5 w-5" />
                                            </button>

                                            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:items-center">
                                                {/* Product Info */}
                                                <div className="md:col-span-6 flex gap-4">
                                                    <div className="h-20 w-20 md:h-24 md:w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200 bg-gray-50">
                                                        {item.listing.images?.[0] ? (
                                                            <img
                                                                src={item.listing.images[0]}
                                                                alt={item.listing.title}
                                                                className="h-full w-full object-cover"
                                                            />
                                                        ) : (
                                                            <div className="flex h-full w-full items-center justify-center text-xs text-gray-400">
                                                                Нет фото
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className="flex flex-col justify-center pr-8 md:pr-0">
                                                        <h3 className="text-sm md:text-base font-medium text-gray-900 line-clamp-2 mb-1">
                                                            {item.listing.title}
                                                        </h3>
                                                        {/* Mobile Price Display */}
                                                        <div className="md:hidden text-sm text-gray-500 mb-2">
                                                            Цена: <span className="font-medium text-gray-900">{item.listing.price.toLocaleString('ru-RU')} ₸</span>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Desktop Price */}
                                                <div className="hidden md:flex md:col-span-2 items-center justify-center">
                                                    <div className="text-base font-medium text-gray-900">
                                                        {item.listing.price.toLocaleString('ru-RU')} ₸
                                                    </div>
                                                </div>

                                                {/* Quantity Controls */}
                                                <div className="md:col-span-2 flex items-center md:justify-center">
                                                    <div className="flex items-center space-x-2 border rounded p-1">
                                                        <button
                                                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                            className="flex h-8 w-8 items-center justify-center rounded bg-gray-50 hover:bg-gray-100 text-gray-600 transition-colors"
                                                            disabled={item.quantity <= 1}
                                                        >
                                                            <Minus className="h-3 w-3" />
                                                        </button>
                                                        <input
                                                            type="text"
                                                            value={item.quantity}
                                                            readOnly
                                                            className="w-8 text-center text-sm font-medium bg-transparent border-none focus:ring-0 p-0"
                                                        />
                                                        <button
                                                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                            className="flex h-8 w-8 items-center justify-center rounded bg-gray-50 hover:bg-gray-100 text-gray-600 transition-colors"
                                                        >
                                                            <Plus className="h-3 w-3" />
                                                        </button>
                                                    </div>
                                                </div>

                                                {/* Subtotal & Desktop Delete */}
                                                <div className="md:col-span-2 flex items-center justify-between md:justify-center mt-2 md:mt-0">
                                                    <div className="text-sm font-medium text-gray-500 md:hidden">Итого:</div>
                                                    <div className="text-base md:text-lg font-bold text-[#FA8232]">
                                                        {(item.listing.price * item.quantity).toLocaleString('ru-RU')} ₸
                                                    </div>

                                                    {/* Desktop Delete Button */}
                                                    <button
                                                        onClick={() => removeItem(item.id)}
                                                        className="hidden md:flex ml-4 h-8 w-8 items-center justify-center rounded-full text-gray-400 hover:bg-red-50 hover:text-red-500 transition-colors"
                                                    >
                                                        <X className="h-4 w-4" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                                <Link href="/" className="w-full sm:w-auto">
                                    <Button variant="outline" className="w-full sm:w-auto border-[#2DA5F3] text-[#2DA5F3] hover:bg-[#2DA5F3] hover:text-white h-12">
                                        <ArrowRight className="mr-2 h-4 w-4 rotate-180" />
                                        ВЕРНУТЬСЯ В КАТАЛОГ
                                    </Button>
                                </Link>
                                {/* Update Cart Button could go here if needed */}
                            </div>
                        </div>

                        <div className="lg:col-span-4">
                            <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm sticky top-4">
                                <h2 className="mb-6 text-lg font-bold text-gray-900 border-b pb-4">Итого</h2>
                                <div className="space-y-4">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-600">Промежуточный итог:</span>
                                        <span className="font-medium text-gray-900">{subtotal.toLocaleString('ru-RU')} ₸</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-600">Доставка:</span>
                                        <span className="font-medium text-green-600">Бесплатно</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-600">Налог:</span>
                                        <span className="font-medium text-gray-900">0 ₸</span>
                                    </div>
                                    <div className="border-t pt-4 flex justify-between items-center">
                                        <span className="text-base font-bold text-gray-900">Итого к оплате</span>
                                        <span className="text-xl font-bold text-[#FA8232]">{subtotal.toLocaleString('ru-RU')} ₸</span>
                                    </div>
                                </div>
                                <Link href="/checkout" className="block mt-8">
                                    <Button className="w-full bg-[#FA8232] uppercase text-white hover:bg-[#E97527] h-12 font-bold shadow-lg shadow-orange-500/20">
                                        Перейти к оформлению
                                        <ArrowRight className="ml-2 h-5 w-5" />
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <Footer />
            <Toast />
        </>
    );
}
