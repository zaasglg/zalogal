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
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <Breadcrumbs
                        breadcrumbs={[
                            { title: 'Главная', href: '/' },
                            { title: 'Wishlist', href: '' },
                        ]}
                    />
                </div>
            </div>

            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 md:py-12 mb-12">
                <div className="mb-6 md:mb-8">
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Избранное</h1>
                </div>

                {items.length === 0 ? (
                    <div className="rounded-lg border border-gray-200 bg-white p-12 text-center shadow-sm">
                        <div className="flex justify-center mb-4">
                            <div className="h-24 w-24 rounded-full bg-yellow-50 flex items-center justify-center">
                                <ShoppingCart className="h-10 w-10 text-[#F4C430] opacity-50" />
                            </div>
                        </div>
                        <h2 className="text-xl font-bold text-gray-900 mb-2">Ваш список избранного пуст</h2>
                        <p className="text-lg text-gray-500 mb-6">
                            В нем пока нет товаров
                        </p>
                        <Link href="/products">
                            <Button className="bg-[#F4C430] hover:bg-[#E5B520] text-black h-12 px-8 font-medium">
                                Перейти к покупкам
                            </Button>
                        </Link>
                    </div>
                ) : (
                    <div className="rounded-lg border border-gray-200 bg-white shadow-sm overflow-hidden">
                        {/* Desktop Table Header */}
                        <div className="hidden md:grid grid-cols-12 gap-4 border-b border-gray-200 bg-gray-50 px-6 py-4 text-sm font-semibold uppercase text-gray-700">
                            <div className="col-span-5 lg:col-span-6">ПРОДУКТ</div>
                            <div className="col-span-2 text-center">ЦЕНА</div>
                            <div className="col-span-2 text-center">НАЛИЧИЕ</div>
                            <div className="col-span-3 lg:col-span-2 text-center">ДЕЙСТВИЯ</div>
                        </div>

                        {/* Table Body */}
                        <div className="divide-y divide-gray-200">
                            {items.map((item) => (
                                <div
                                    key={item.id}
                                    className="relative flex flex-col md:grid md:grid-cols-12 gap-4 p-4 md:px-6 md:py-6"
                                >
                                    {/* Mobile: Remove Button Absolute */}
                                    <button
                                        onClick={() => removeItem(item.id)}
                                        className="absolute top-4 right-4 md:hidden p-2 text-gray-400 hover:bg-gray-100 rounded-full hover:text-red-500"
                                    >
                                        <X className="h-5 w-5" />
                                    </button>

                                    {/* Product Info */}
                                    <div className="md:col-span-5 lg:col-span-6 flex gap-4 pr-8 md:pr-0">
                                        <Link href={`/products/${item.id}`} className="flex-shrink-0">
                                            <div className="h-20 w-20 md:h-24 md:w-24 overflow-hidden rounded-md border border-gray-200 bg-gray-50 flex items-center justify-center">
                                                {item.images?.[0] ? (
                                                    <img
                                                        src={item.images[0]}
                                                        alt={item.title}
                                                        className="h-full w-full object-contain p-1"
                                                    />
                                                ) : (
                                                    <span className="text-xs text-gray-400">Нет фото</span>
                                                )}
                                            </div>
                                        </Link>
                                        <div className="flex flex-col justify-center">
                                            <Link href={`/products/${item.id}`}>
                                                <h3 className="line-clamp-2 text-sm md:text-base font-medium text-gray-900 hover:text-[#FA8232] transition-colors mb-1">
                                                    {item.title}
                                                </h3>
                                            </Link>
                                            {/* Mobile Price & Status display inside info block */}
                                            <div className="md:hidden space-y-1 mt-1">
                                                <div className="text-base font-bold text-blue-600">
                                                    {Number(item.price).toLocaleString('ru-RU')} ₸
                                                </div>
                                                {item.status === 'active' ? (
                                                    <span className="inline-block text-xs font-medium text-green-600">
                                                        В НАЛИЧИИ
                                                    </span>
                                                ) : (
                                                    <span className="inline-block text-xs font-medium text-red-600">
                                                        НЕТ В НАЛИЧИИ
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Desktop Price */}
                                    <div className="hidden md:flex md:col-span-2 items-center justify-center">
                                        <div className="text-lg font-semibold text-blue-600">
                                            {Number(item.price).toLocaleString('ru-RU')} ₸
                                        </div>
                                    </div>

                                    {/* Desktop Availability */}
                                    <div className="hidden md:flex md:col-span-2 items-center justify-center">
                                        {item.status === 'active' ? (
                                            <span className="inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-xs font-bold text-green-800">
                                                В НАЛИЧИИ
                                            </span>
                                        ) : (
                                            <span className="inline-flex items-center rounded-full bg-red-100 px-3 py-1 text-xs font-bold text-red-800">
                                                НЕТ В НАЛИЧИИ
                                            </span>
                                        )}
                                    </div>

                                    {/* Actions */}
                                    <div className="md:col-span-3 lg:col-span-2 flex items-center justify-center gap-2 mt-2 md:mt-0">
                                        <div className="w-full md:w-auto">
                                            {item.status === 'active' ? (
                                                <Button
                                                    onClick={() => addToCart(item.id)}
                                                    className="bg-[#FA8232] text-white hover:bg-[#E97527] w-full md:w-auto h-10 md:h-12 px-4 md:px-6 font-bold shadow-sm"
                                                >
                                                    <ShoppingCart className="mr-2 h-4 w-4" />
                                                    <span className="md:hidden lg:inline">В КОРЗИНУ</span>
                                                </Button>
                                            ) : (
                                                <Button
                                                    disabled
                                                    className="bg-gray-100 text-gray-400 w-full md:w-auto h-10 md:h-12 px-4 md:px-6"
                                                >
                                                    <ShoppingCart className="mr-2 h-4 w-4" />
                                                    <span className="md:hidden lg:inline">В КОРЗИНУ</span>
                                                </Button>
                                            )}
                                        </div>

                                        {/* Desktop Remove Button */}
                                        <button
                                            onClick={() => removeItem(item.id)}
                                            className="hidden md:flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-md border border-gray-200 text-gray-400 hover:bg-red-50 hover:border-red-200 hover:text-red-500 transition-all"
                                            title="Удалить из избранного"
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
