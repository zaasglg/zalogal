import { Breadcrumbs } from '@/components/breadcrumbs';
import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import { Button } from '@/components/ui/button';
import { Head, Link, router } from '@inertiajs/react';
import { ShoppingCart, Trash2, X } from 'lucide-react';
import { toast } from 'sonner';

interface Listing {
    id: number;
    title: string;
    price: number;
    images: string[];
    status: string;
    category_id: number;
}

interface WishlistProps {
    favorites: {
        data: Listing[];
        links: any[];
    };
}

export default function Wishlist({ favorites }: WishlistProps) {
    const items = favorites.data;

    const addToCart = (itemId: number) => {
        const item = items.find(i => i.id === itemId);
        router.post('/cart', { listing_id: itemId }, {
            preserveScroll: true,
            onSuccess: () => {
                toast.success('Товар добавлен в корзину', {
                    description: item?.title || 'Товар успешно добавлен',
                });
            },
            onError: (errors) => {
                if (errors.login) { // Assuming backend might return specific error or redirect
                    router.visit('/login');
                } else {
                    toast.error('Ошибка добавления', { description: 'Попробуйте позже' });
                }
            },
        });
    };

    const removeItem = (id: number) => {
        router.post(`/listings/${id}/favorite`, {}, {
            preserveScroll: true,
            onSuccess: () => {
                toast.success('Товар удален из избранного');
            }
        });
    };

    return (
        <>
            <Head title="Избранное - Zalogal" />

            <Header />

            <div className="bg-[#F2F4F5] py-4">
                <div className="mx-auto max-w-7xl">
                    <Breadcrumbs
                        breadcrumbs={[
                            { title: 'Главная', href: '/' },
                            { title: 'Wishlist', href: '' },
                        ]}
                    />
                </div>
            </div>

            <div className="mx-auto max-w-7xl py-8">
                <div className="mb-6">
                    <h1 className="text-2xl font-semibold">Избранное</h1>
                </div>

                {items.length === 0 ? (
                    <div className="rounded-lg border border-gray-200 bg-white p-12 text-center">
                        <p className="text-lg text-gray-500">
                            Ваш список избранного пуст
                        </p>
                        <Link href="/products">
                            <Button className="mt-4 bg-[#F4C430] hover:bg-[#E5B520]">
                                Перейти к покупкам
                            </Button>
                        </Link>
                    </div>
                ) : (
                    <div className="rounded-lg border border-gray-200 bg-white">
                        {/* Table Header */}
                        <div className="grid grid-cols-12 gap-4 border-b border-gray-200 bg-gray-50 px-6 py-4 text-sm font-medium text-gray-700">
                            <div className="col-span-6">ПРОДУКТ</div>
                            <div className="col-span-2 text-center">ЦЕНА</div>
                            <div className="col-span-2 text-center">НАЛИЧИЕ</div>
                            <div className="col-span-2 text-center">ДЕЙСТВИЯ</div>
                        </div>

                        {/* Table Body */}
                        <div className="divide-y divide-gray-200">
                            {items.map((item) => (
                                <div
                                    key={item.id}
                                    className="grid grid-cols-12 gap-4 px-6 py-6"
                                >
                                    {/* Product Info */}
                                    <div className="col-span-6 flex items-center space-x-4">
                                        <button
                                            onClick={() => removeItem(item.id)}
                                            className="text-gray-400 hover:text-red-500"
                                        >
                                            <X className="h-5 w-5" />
                                        </button>
                                        <Link
                                            href={`/products/${item.id}`}
                                            className="flex items-center space-x-4"
                                        >
                                            <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg border border-gray-200 bg-gray-50">
                                                <img
                                                    src={item.images?.[0] || 'https://via.placeholder.com/150'}
                                                    alt={item.title}
                                                    className="h-full w-full object-contain p-2"
                                                />
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="line-clamp-2 text-sm font-medium text-gray-900 hover:text-[#F4C430]">
                                                    {item.title}
                                                </h3>
                                            </div>
                                        </Link>
                                    </div>

                                    {/* Price */}
                                    <div className="col-span-2 flex items-center justify-center">
                                        <div className="text-center">
                                            <div className="text-lg font-semibold text-blue-600">
                                                {Number(item.price).toLocaleString('ru-RU')} ₸
                                            </div>
                                        </div>
                                    </div>

                                    {/* Availability */}
                                    <div className="col-span-2 flex items-center justify-center">
                                        {item.status === 'active' ? (
                                            <span className="inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-800">
                                                В НАЛИЧИИ
                                            </span>
                                        ) : (
                                            <span className="inline-flex items-center rounded-full bg-red-100 px-3 py-1 text-xs font-medium text-red-800">
                                                НЕТ В НАЛИЧИИ
                                            </span>
                                        )}
                                    </div>

                                    {/* Actions */}
                                    <div className="col-span-2 flex items-center justify-center space-x-2">
                                        {item.status === 'active' ? (
                                            <Button
                                                onClick={() => addToCart(item.id)}
                                                className="bg-[#FA8232] text-white hover:bg-[#FA8232] w-full h-12 rounded-xs"
                                            >
                                                <ShoppingCart className="mr-2 h-4 w-4" />
                                                В КОРЗИНУ
                                            </Button>
                                        ) : (
                                            <Button
                                                disabled
                                                className="bg-gray-300 h-12 rounded-xs w-full text-gray-500"
                                            >
                                                <ShoppingCart className="mr-2 h-4 w-4" />
                                                В КОРЗИНУ
                                            </Button>
                                        )}
                                        <button
                                            onClick={() => removeItem(item.id)}
                                            className="rounded p-2 text-gray-400 hover:bg-gray-100 hover:text-red-500"
                                            title="Удалить"
                                        >
                                            <Trash2 className="h-5 w-5" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            <Footer />
        </>
    );
}
