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
                <div className="mx-auto max-w-7xl">
                    <Breadcrumbs
                        breadcrumbs={[
                            { title: 'Главная', href: '/' },
                            { title: 'Корзина', href: '' },
                        ]}
                    />
                </div>
            </div>

            <div className="mx-auto max-w-7xl py-8">
                <h1 className="text-2xl font-semibold mb-6">Корзина для покупок</h1>

                {cartItems.length === 0 ? (
                    <div className="rounded-sm border border-gray-200 bg-white p-12 text-center">
                        <p className="text-lg text-gray-500">Ваша корзина пуста</p>
                        <Link href="/">
                            <Button className="mt-4 bg-[#FA8232] hover:bg-[#E97527]">
                                Перейти к покупкам
                            </Button>
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-12 gap-6">
                        <div className="col-span-8">
                            <div className="rounded-sm border border-gray-200 bg-white">
                                <div className="grid grid-cols-12 gap-4 border-b border-gray-200 bg-gray-50 px-6 py-4 text-sm font-medium uppercase text-gray-700">
                                    <div className="col-span-6">Продукты</div>
                                    <div className="col-span-2 text-center">Цена</div>
                                    <div className="col-span-2 text-center">Количество</div>
                                    <div className="col-span-2 text-center">Итого</div>
                                </div>

                                <div className="divide-y divide-gray-200">
                                    {cartItems.map((item) => (
                                        <div key={item.id} className="grid grid-cols-12 gap-4 px-6 py-6">
                                            <div className="col-span-6 flex items-center space-x-4">
                                                <button
                                                    onClick={() => removeItem(item.id)}
                                                    className="flex h-8 w-8 items-center justify-center rounded-md border border-gray-300 text-gray-400 hover:border-red-500 hover:text-red-500"
                                                >
                                                    <X className="h-4 w-4" />
                                                </button>
                                                <div className="flex items-center space-x-4">
                                                    <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-sm border border-gray-200 bg-gray-50">
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
                                                    <h3 className="line-clamp-2 text-sm font-medium text-gray-900">
                                                        {item.listing.title}
                                                    </h3>
                                                </div>
                                            </div>

                                            <div className="col-span-2 flex items-center justify-center">
                                                <div className="text-base font-medium text-gray-900">
                                                    {item.listing.price} ₸
                                                </div>
                                            </div>

                                            <div className="col-span-2 flex items-center justify-center">
                                                <div className="flex items-center space-x-2">
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                        className="flex h-8 w-8 items-center justify-center rounded border border-gray-300 hover:bg-gray-100"
                                                    >
                                                        <Minus className="h-3 w-3" />
                                                    </button>
                                                    <input
                                                        type="text"
                                                        value={item.quantity.toString().padStart(2, '0')}
                                                        readOnly
                                                        className="w-12 rounded border border-gray-300 py-1 text-center text-sm"
                                                    />
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                        className="flex h-8 w-8 items-center justify-center rounded border border-gray-300 hover:bg-gray-100"
                                                    >
                                                        <Plus className="h-3 w-3" />
                                                    </button>
                                                </div>
                                            </div>

                                            <div className="col-span-2 flex items-center justify-center">
                                                <div className="text-base font-semibold text-gray-900">
                                                    {item.listing.price * item.quantity} ₸
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="mt-6 flex items-center justify-between">
                                <Link href="/">
                                    <Button variant="outline" className="border-[#2DA5F3] text-[#2DA5F3] hover:bg-[#2DA5F3] hover:text-white">
                                        <ArrowRight className="mr-2 h-4 w-4 rotate-180" />
                                        ВЕРНУТЬСЯ В КАТАЛОГ
                                    </Button>
                                </Link>
                            </div>
                        </div>

                        <div className="col-span-4">
                            <div className="rounded-sm border border-gray-200 bg-white p-6">
                                <h2 className="mb-4 text-lg font-semibold">Итого</h2>
                                <div className="space-y-3">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-600">Промежуточный итог:</span>
                                        <span className="font-medium">{subtotal} ₸</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-600">Доставка:</span>
                                        <span className="font-medium text-green-600">Бесплатно</span>
                                    </div>
                                    <div className="border-t pt-3 flex justify-between text-base font-semibold">
                                        <span>Total</span>
                                        <span className="text-lg text-[#FA8232]">{subtotal} ₸</span>
                                    </div>
                                </div>
                                <Link href="/checkout" className="block">
                                    <Button className="mt-6 w-full bg-[#FA8232] uppercase text-white hover:bg-[#E97527]">
                                        Перейти к оформлению
                                        <ArrowRight className="ml-2 h-4 w-4" />
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
