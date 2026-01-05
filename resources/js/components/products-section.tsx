import { Button } from '@/components/ui/button';
import { ArrowRight, Heart, ShoppingCart, Share2 } from 'lucide-react';
import { useState, useMemo } from 'react';
import { router, Link, usePage } from '@inertiajs/react';
import { toast } from 'sonner';

interface Listing {
    id: number;
    title: string;
    price: number;
    category: string;
    images: string[] | null;
    is_favorited?: boolean;
}

interface ProductsSectionProps {
    listings?: Listing[];
}

export function ProductsSection({ listings = [] }: ProductsSectionProps) {
    const { props } = usePage();
    const auth = props.auth as { user: any };
    const [activeTab, setActiveTab] = useState('Все');

    const addToCart = (listingId: number) => {
        const listing = listings.find(l => l.id === listingId);
        router.post('/cart', { listing_id: listingId }, {
            preserveScroll: true,
            onSuccess: () => {
                toast.success('Товар добавлен в корзину', {
                    description: listing?.title || 'Товар успешно добавлен',
                });
            },
            onError: () => {
                router.visit('/login');
            },
        });
    };

    const toggleFavorite = (e: React.MouseEvent, listing: Listing) => {
        e.preventDefault();
        e.stopPropagation();

        if (!auth.user) {
            toast.error('Войдите в систему', {
                description: 'Чтобы добавить товар в избранное, необходимо авторизоваться',
                action: {
                    label: 'Войти',
                    onClick: () => router.visit('/login'),
                },
            });
            return;
        }

        router.post(`/listings/${listing.id}/favorite`, {}, {
            preserveScroll: true,
            onSuccess: () => {
                toast.success(listing.is_favorited ? 'Удалено из избранного' : 'Добавлено в избранное');
            },
            onError: () => {
                router.visit('/login');
            }
        });
    };

    const categories = useMemo(() => {
        const cats = ['Все', ...new Set(listings.map(l => l.category))];
        return cats.slice(0, 6);
    }, [listings]);

    const filteredListings = useMemo(() => {
        if (activeTab === 'Все') return listings.slice(0, 8);
        return listings.filter(l => l.category === activeTab).slice(0, 8);
    }, [activeTab, listings]);

    return (
        <div className="w-full bg-gray-50 py-6 md:py-8">
            <div className="mx-auto max-w-7xl px-4">
                <div className="grid grid-cols-1 items-start gap-4 md:gap-6 lg:grid-cols-4">
                    {/* Left Banner - Hidden on mobile */}
                    <div className="hidden lg:block rounded bg-[#F3DE6D] lg:col-span-1">
                        <div className='p-6'>
                            <div className="mb-4">
                                <p className="text-sm uppercase text-gray-700">
                                    ЗАЛОГОВЫЕ ТОВАРЫ
                                </p>
                                <p className="text-xs text-gray-600">
                                    ПО НИЗКОЙ ЦЕНЕ
                                </p>
                            </div>
                            <h2 className="mb-4 text-3xl font-bold text-gray-900">
                                ГАРАНТИЯ
                            </h2>
                            <p className="mb-6 text-sm text-gray-700">
                                На каждый продукт дается ГАРАНТИЯ от продавца
                            </p>
                            <Button className="mb-8 w-full rounded-sm bg-[#FF6B35] px-6 py-3 text-white hover:bg-[#E55A2B]">
                                КУПИТЬ СЕЙЧАС
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                        </div>
                        <div>
                            <img
                                src="/assets/images/product-left-banner.jpg"
                                alt="Продукция"
                                className="h-auto w-full rounded object-cover"
                            />
                        </div>
                    </div>

                    {/* Products Grid */}
                    <div className="lg:col-span-3">
                        {/* Header with Tabs */}
                        <div className="mb-4 md:mb-6 flex flex-col items-start justify-between gap-3 md:gap-4 sm:flex-row sm:items-center">
                            <h2 className="text-xl md:text-2xl font-semibold text-gray-900">
                                Продукции
                            </h2>
                            <div className="flex flex-nowrap gap-3 md:gap-4 overflow-x-auto pb-2 md:pb-0 -mx-4 px-4 sm:mx-0 sm:px-0 w-full sm:w-auto scrollbar-hide">
                                {categories.map((tab) => (
                                    <button
                                        key={tab}
                                        onClick={() => setActiveTab(tab)}
                                        className={`text-sm whitespace-nowrap transition-colors flex-shrink-0 ${activeTab === tab
                                            ? 'font-semibold text-gray-900'
                                            : 'text-gray-500 hover:text-gray-700'
                                            }`}
                                    >
                                        {tab}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Products Grid */}
                        <div className="grid grid-cols-2 gap-3 md:gap-4 lg:grid-cols-4">
                            {filteredListings.map((product) => (
                                <Link
                                    key={product.id}
                                    href={`/products/${product.id}`}
                                    className="group relative block overflow-hidden rounded border border-gray-200 bg-white p-2 md:p-4 transition-shadow hover:shadow-md"
                                >
                                    {/* Product Image */}
                                    <div className="relative mb-2 md:mb-3 aspect-square overflow-hidden rounded bg-gray-100">
                                        {product.images?.[0] ? (
                                            <img
                                                src={product.images[0]}
                                                alt={product.title}
                                                className="h-full w-full object-cover transition-transform group-hover:scale-105"
                                            />
                                        ) : (
                                            <div className="flex h-full w-full items-center justify-center">
                                                <span className="text-xs md:text-sm text-gray-400">Нет фото</span>
                                            </div>
                                        )}
                                        {/* Quick Actions */}
                                        <div
                                            className="absolute bottom-1 md:bottom-2 right-1 md:right-2 flex gap-1 md:gap-2 opacity-0 transition-opacity group-hover:opacity-100"
                                            onClick={(e) => e.preventDefault()}
                                        >
                                            <button
                                                className="flex h-6 w-6 md:h-8 md:w-8 items-center justify-center rounded-full bg-white shadow-md hover:bg-gray-100"
                                                onClick={(e) => toggleFavorite(e, product)}
                                            >
                                                <Heart className={`h-3 w-3 md:h-4 md:w-4 ${product.is_favorited ? 'text-red-500 fill-current' : 'text-gray-700'}`} />
                                            </button>
                                            <button
                                                className="flex h-6 w-6 md:h-8 md:w-8 items-center justify-center rounded-full bg-white shadow-md hover:bg-gray-100"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    e.stopPropagation();
                                                    const currentIds = JSON.parse(localStorage.getItem('compare_ids') || '[]');
                                                    let newIds;
                                                    if (currentIds.includes(product.id)) {
                                                        newIds = currentIds.filter((id: number) => id !== product.id);
                                                        toast.success('Удалено из сравнения');
                                                    } else {
                                                        if (currentIds.length >= 4) {
                                                            toast.error('Можно сравнивать не более 4 товаров');
                                                            return;
                                                        }
                                                        newIds = [...currentIds, product.id];
                                                        toast.success('Добавлено к сравнению', {
                                                            action: {
                                                                label: 'Перейти',
                                                                onClick: () => router.visit('/compare')
                                                            }
                                                        });
                                                    }
                                                    localStorage.setItem('compare_ids', JSON.stringify(newIds));
                                                }}
                                            >
                                                <Share2 className="h-3 w-3 md:h-4 md:w-4 text-gray-700" />
                                            </button>
                                            <button
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    e.stopPropagation();
                                                    addToCart(product.id);
                                                }}
                                                className="flex h-6 w-6 md:h-8 md:w-8 items-center justify-center rounded-full bg-[#FF6B35] shadow-md hover:bg-[#E55A2B]"
                                            >
                                                <ShoppingCart className="h-3 w-3 md:h-4 md:w-4 text-white" />
                                            </button>
                                        </div>
                                    </div>

                                    {/* Category Badge */}
                                    <div className="mb-1 md:mb-2">
                                        <span className="inline-block rounded bg-gray-100 px-1.5 md:px-2 py-0.5 md:py-1 text-[10px] md:text-xs text-gray-600">
                                            {product.category}
                                        </span>
                                    </div>

                                    {/* Product Name */}
                                    <h3 className="mb-1 md:mb-2 line-clamp-2 text-xs md:text-sm text-gray-900 group-hover:text-[#2B6B8F] transition-colors">
                                        {product.title}
                                    </h3>

                                    {/* Price */}
                                    <div className="flex items-center gap-2">
                                        <span className="text-sm md:text-lg font-semibold text-[#2B6B8F]">
                                            {product.price.toLocaleString('ru-RU')} ₸
                                        </span>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
