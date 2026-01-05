import { Breadcrumbs } from '@/components/breadcrumbs';
import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Head, Link, router, usePage } from '@inertiajs/react';
import {
    Check,
    Facebook,
    Heart,
    Minus,
    Plus,
    Share2,
    Star,
    Twitter,
} from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

interface Specification {
    key: string;
    value: string;
}

interface Review {
    id: number;
    rating: number;
    comment: string | null;
    created_at: string;
    user: {
        name: string;
    };
}

interface Listing {
    id: number;
    title: string;
    description: string;
    specifications?: Specification[] | null;
    price: number;
    category: string;
    condition: string;
    location: string;
    images: string[] | null;
    status: string;
    created_at: string;
    reviews?: Review[];
}

interface RelatedProduct {
    id: number;
    name: string;
    price: number;
    oldPrice?: number;
    image: string;
}

interface Props {
    listing: Listing;
    relatedListings?: Listing[];
    isFavorited?: boolean;
    canReview?: boolean;
}

const relatedProducts: RelatedProduct[] = [
    {
        id: 1,
        name: 'Bose Sport Earbuds - Беспроводные наушники',
        price: 2300,
        image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400&h=400&fit=crop',
    },
    {
        id: 2,
        name: 'Simple Mobile 4G LTE Prepaid Smartphone',
        price: 1500,
        oldPrice: 2000,
        image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop',
    },
    {
        id: 3,
        name: '4K UHD LED Smart TV со встроенным Chromecast',
        price: 865,
        image: 'https://images.unsplash.com/photo-1593784991095-a205069470b6?w=400&h=400&fit=crop',
    },
    {
        id: 4,
        name: 'Sony DSCHX8 Цифровая Камера',
        price: 1200,
        image: 'https://images.unsplash.com/photo-1606982759207-b0fb0074f4f3?w=400&h=400&fit=crop',
    },
];

const productAccessories: RelatedProduct[] = [
    {
        id: 1,
        name: 'Samsung Galaxy S21 5G Смартфон',
        price: 2300,
        image: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400&h=400&fit=crop',
    },
    {
        id: 2,
        name: 'Simple Mobile 5G LTE Чехол для Galaxy S21',
        price: 250,
        oldPrice: 300,
        image: 'https://images.unsplash.com/photo-1601593346740-925612772716?w=400&h=400&fit=crop',
    },
    {
        id: 3,
        name: 'TOZO T6 Беспроводные Наушники',
        price: 70,
        image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400&h=400&fit=crop',
    },
    {
        id: 4,
        name: 'Беспроводное Зарядное Устройство',
        price: 150,
        image: 'https://images.unsplash.com/photo-1591290619762-c588f4fb4c9a?w=400&h=400&fit=crop',
    },
];

const appleProducts: RelatedProduct[] = [
    {
        id: 1,
        name: 'TOZO T6 Беспроводные Наушники',
        price: 70,
        image: 'https://images.unsplash.com/photo-1572536147248-ac59a8abfa4b?w=400&h=400&fit=crop',
    },
    {
        id: 2,
        name: 'MI 4 LTE & Waterproof Portable Speaker',
        price: 299,
        image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=400&fit=crop',
    },
    {
        id: 3,
        name: 'Wiser Cool Pen с 10000 Pin Windows 10',
        price: 799,
        image: 'https://images.unsplash.com/photo-1625948515291-69613efd103f?w=400&h=400&fit=crop',
    },
    {
        id: 4,
        name: 'Dell Optiplex 7000x7480 AIO Monitor',
        price: 250,
        image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400&h=400&fit=crop',
    },
];

const featuredProducts: RelatedProduct[] = [
    {
        id: 1,
        name: 'Portable Washing Machine, 11lbs',
        price: 80,
        image: 'https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?w=400&h=400&fit=crop',
    },
    {
        id: 2,
        name: 'Sony 75-Inch Zoom Smart TV',
        price: 2300,
        oldPrice: 3000,
        image: 'https://images.unsplash.com/photo-1593784991095-a205069470b6?w=400&h=400&fit=crop',
    },
    {
        id: 3,
        name: 'Dell Optiplex AIO Computer',
        price: 865,
        image: 'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=400&h=400&fit=crop',
    },
    {
        id: 4,
        name: 'Квадрокоптер с 4K Камерой',
        price: 1200,
        image: 'https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=400&h=400&fit=crop',
    },
];



export default function ProductDetail({ listing, relatedListings = [], isFavorited = false, canReview = false }: Props) {
    const { props } = usePage();
    const auth = props.auth as { user: any };

    const [quantity, setQuantity] = useState(1);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [activeTab, setActiveTab] = useState(() => {
        if (typeof window !== 'undefined') {
            const params = new URLSearchParams(window.location.search);
            const tab = params.get('tab');
            return tab || 'description';
        }
        return 'description';
    });

    // Review form state
    const [reviewForm, setReviewForm] = useState({
        rating: 5,
        comment: ''
    });
    const [isSubmittingReview, setIsSubmittingReview] = useState(false);

    const handleReviewSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!auth.user) {
            toast.error('Войдите в систему', { description: 'Необходимо авторизоваться, чтобы оставить отзыв.' });
            return;
        }

        setIsSubmittingReview(true);
        router.post(`/products/${listing.id}/reviews`, reviewForm, {
            preserveScroll: true,
            onSuccess: () => {
                setReviewForm({ rating: 5, comment: '' });
                setIsSubmittingReview(false);
                toast.success('Отзыв опубликован');
            },
            onError: () => {
                setIsSubmittingReview(false);
                toast.error('Ошибка при публикации отзыва');
            }
        });
    };

    const productImages = listing.images && listing.images.length > 0
        ? listing.images
        : ['/assets/images/placeholder.jpg'];

    const addToCart = () => {
        router.post('/cart', {
            listing_id: listing.id,
            quantity: quantity
        }, {
            preserveScroll: true,
            onSuccess: () => {
                toast.success('Товар добавлен в корзину', {
                    description: `${listing.title} (${quantity} шт.)`,
                });
            },
            onError: () => {
                router.visit('/login');
            },
        });
    };

    const toggleFavorite = () => {
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
                toast.success(isFavorited ? 'Удалено из избранного' : 'Добавлено в избранное');
            },
            onError: (errors) => {
                router.visit('/login');
            }
        });
    };

    return (
        <>
            <Head title={`${listing.title} - Zalogal`} />

            <Header />

            <div className="bg-[#F2F4F5] py-4">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <Breadcrumbs
                        breadcrumbs={[
                            { title: 'Главная', href: '/' },
                            { title: 'Магазины', href: '/products' },
                            { title: listing.category, href: '/products' },
                            { title: listing.title, href: '' },
                        ]}
                    />
                </div>
            </div>

            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 md:py-12">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Product Images */}
                    <div className="lg:col-span-5">
                        <div className="space-y-4">
                            <div className="relative overflow-hidden rounded-lg border border-gray-200 bg-white">
                                {productImages[currentImageIndex] ? (
                                    <img
                                        src={productImages[currentImageIndex]}
                                        alt={listing.title}
                                        className="h-[600px] w-full object-cover"
                                    />
                                ) : (
                                    <div className="flex h-[600px] w-full items-center justify-center bg-gray-100">
                                        <span className="text-gray-400">Нет фото</span>
                                    </div>
                                )}
                            </div>
                            {productImages.length > 1 && (
                                <div className="grid grid-cols-5 gap-2">
                                    {productImages.map((image, index) => (
                                        <button
                                            key={index}
                                            onClick={() =>
                                                setCurrentImageIndex(index)
                                            }
                                            className={`overflow-hidden rounded border-2 bg-white p-1 ${currentImageIndex === index
                                                ? 'border-[#F4C430]'
                                                : 'border-gray-200'
                                                }`}
                                        >
                                            <img
                                                src={image}
                                                alt={`${listing.title} ${index + 1}`}
                                                className="h-12 w-full object-cover"
                                            />
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Product Info */}
                    <div className="lg:col-span-7 space-y-6">
                        {/* Product Title */}
                        <h1 className="text-2xl font-semibold text-gray-900">
                            {listing.title}
                        </h1>

                        {/* Meta Info */}
                        <div className="flex items-center space-x-6 text-sm">
                            <div>
                                <span className="text-gray-500">Категория: </span>
                                <span className="font-medium">
                                    {listing.category}
                                </span>
                            </div>
                            <div>
                                <span className="text-gray-500">Состояние: </span>
                                <span className="font-medium text-[#F4C430]">
                                    {listing.condition === 'new' ? 'Новое' :
                                        listing.condition === 'excellent' ? 'Отличное' :
                                            listing.condition === 'good' ? 'Хорошее' : 'Б/У'}
                                </span>
                            </div>
                        </div>

                        <div className="flex items-center space-x-6 text-sm">
                            <div>
                                <span className="text-gray-500">
                                    Локация:{' '}
                                </span>
                                <Badge className="bg-green-100 text-green-800">
                                    {listing.location}
                                </Badge>
                            </div>
                            <div>
                                <span className="text-gray-500">
                                    Статус:{' '}
                                </span>
                                <span className="font-medium">
                                    {listing.status === 'active' ? 'Активное' : listing.status}
                                </span>
                            </div>
                        </div>

                        <Separator />

                        {/* Price */}
                        <div className="flex items-center space-x-4">
                            <span className="text-3xl font-bold text-blue-600">
                                {listing.price.toLocaleString('ru-RU')} ₸
                            </span>
                        </div>

                        {/* Specifications */}
                        {listing.specifications && listing.specifications.length > 0 && (
                            <div className="space-y-2">
                                <label className="block text-sm font-medium">
                                    Характеристики
                                </label>
                                <div className="grid grid-cols-2 gap-3">
                                    {listing.specifications.map((spec, index) => (
                                        <div key={index} className="flex items-center space-x-2 rounded-md border border-gray-200 bg-gray-50 px-3 py-2">
                                            <span className="text-sm font-medium text-gray-700">{spec.key}:</span>
                                            <span className="text-sm text-gray-600">{spec.value}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        <Separator />

                        {/* Quantity and Add to Cart */}
                        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                            <div className="flex items-center space-x-2 h-12 px-2 border rounded-xs justify-center">
                                <button
                                    onClick={() =>
                                        setQuantity((prev) =>
                                            prev > 1 ? prev - 1 : 1,
                                        )
                                    }
                                    className="rounded p-2 hover:bg-gray-100"
                                >
                                    <Minus className="h-4 w-4" />
                                </button>
                                <input
                                    type="text"
                                    value={quantity}
                                    readOnly
                                    className="w-16 rounded px-3 py-2 text-center"
                                />
                                <button
                                    onClick={() =>
                                        setQuantity((prev) => prev + 1)
                                    }
                                    className="rounded p-2 hover:bg-gray-100"
                                >
                                    <Plus className="h-4 w-4" />
                                </button>
                            </div>
                            <Button
                                onClick={addToCart}
                                className="flex-1 bg-[#FA8232] text-white hover:bg-[#FA8232] h-12 rounded-xs"
                            >
                                В КОРЗИНУ
                            </Button>
                            <Button className="flex-1 sm:flex-none bg-[#E97527] text-white hover:bg-[#E97527] h-12 rounded-xs">
                                КУПИТЬ СЕЙЧАС
                            </Button>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex items-center space-x-6 text-sm">
                            <button
                                onClick={toggleFavorite}
                                className={`flex items-center space-x-2 ${isFavorited ? 'text-red-500' : 'text-gray-600 hover:text-gray-900'}`}
                            >
                                <Heart className={`h-5 w-5 ${isFavorited ? 'fill-current' : ''}`} />
                                <span>{isFavorited ? 'В избранном' : 'Добавить в избранное'}</span>
                            </button>
                            <button
                                onClick={() => {
                                    const currentIds = JSON.parse(localStorage.getItem('compare_ids') || '[]');
                                    let newIds;
                                    if (currentIds.includes(listing.id)) {
                                        newIds = currentIds.filter((id: number) => id !== listing.id);
                                        toast.success('Удалено из сравнения');
                                    } else {
                                        if (currentIds.length >= 4) {
                                            toast.error('Можно сравнивать не более 4 товаров');
                                            return;
                                        }
                                        newIds = [...currentIds, listing.id];
                                        toast.success('Добавлено к сравнению', {
                                            action: {
                                                label: 'Перейти',
                                                onClick: () => router.visit('/compare')
                                            }
                                        });
                                    }
                                    localStorage.setItem('compare_ids', JSON.stringify(newIds));
                                }}
                                className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
                            >
                                <Share2 className="h-5 w-5" />
                                <span>Сравнить</span>
                            </button>
                            <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-900">
                                <Share2 className="h-5 w-5" />
                                <span>Поделиться</span>
                            </button>
                        </div>

                        {/* Payment Methods */}
                        <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
                            <p className="mb-2 text-sm font-medium">
                                100% Гарантия безопасного оформления заказа
                            </p>
                            <div className="flex items-center space-x-2">
                                <img
                                    src="https://upload.wikimedia.org/wikipedia/commons/0/04/Visa.svg"
                                    alt="Visa"
                                    className="h-6"
                                />
                                <img
                                    src="https://upload.wikimedia.org/wikipedia/commons/a/a4/Mastercard_2019_logo.svg"
                                    alt="Mastercard"
                                    className="h-6"
                                />
                                <img
                                    src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg"
                                    alt="PayPal"
                                    className="h-6"
                                />
                            </div>
                        </div>

                    </div>
                </div>

                {/* Product Details Tabs */}
                <div className="mt-12">
                    <div className="border-b border-gray-200 overflow-x-auto">
                        <div className="flex space-x-8 min-w-max pb-1">
                            <button
                                onClick={() => setActiveTab('description')}
                                className={`border-b-2 px-4 py-3 text-sm font-medium uppercase whitespace-nowrap ${activeTab === 'description'
                                    ? 'border-[#FA8232] text-[#FA8232]'
                                    : 'border-transparent text-gray-500 hover:text-gray-700'
                                    }`}
                            >
                                Описание
                            </button>
                            <button
                                onClick={() => setActiveTab('additional')}
                                className={`border-b-2 px-4 py-3 text-sm font-medium uppercase whitespace-nowrap ${activeTab === 'additional'
                                    ? 'border-[#FA8232] text-[#FA8232]'
                                    : 'border-transparent text-gray-500 hover:text-gray-700'
                                    }`}
                            >
                                Дополнительная информация
                            </button>
                            <button
                                onClick={() => setActiveTab('specifications')}
                                className={`border-b-2 px-4 py-3 text-sm font-medium uppercase whitespace-nowrap ${activeTab === 'specifications'
                                    ? 'border-[#FA8232] text-[#FA8232]'
                                    : 'border-transparent text-gray-500 hover:text-gray-700'
                                    }`}
                            >
                                Характеристики
                            </button>
                            <button
                                onClick={() => setActiveTab('reviews')}
                                className={`border-b-2 px-4 py-3 text-sm font-medium uppercase whitespace-nowrap ${activeTab === 'reviews'
                                    ? 'border-[#FA8232] text-[#FA8232]'
                                    : 'border-transparent text-gray-500 hover:text-gray-700'
                                    }`}
                            >
                                Отзывы
                            </button>
                        </div>
                    </div>

                    <div className="mt-8">
                        {activeTab === 'description' && (
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                                <div className="lg:col-span-2 space-y-4 text-sm text-gray-600">
                                    <h3 className="text-lg font-semibold text-gray-900">
                                        Описание
                                    </h3>
                                    <div
                                        className="prose prose-sm max-w-none"
                                        dangerouslySetInnerHTML={{ __html: listing.description }}
                                    />
                                </div>
                                <div className="space-y-4">
                                    <h3 className="text-lg font-semibold text-gray-900">
                                        Особенности
                                    </h3>
                                    <ul className="space-y-2 text-sm text-gray-600">
                                        <li className="flex items-start space-x-2">
                                            <Check className="mt-0.5 h-4 w-4 text-[#F4C430]" />
                                            <span>Бесплатная доставка на 1 год</span>
                                        </li>
                                        <li className="flex items-start space-x-2">
                                            <Check className="mt-0.5 h-4 w-4 text-[#F4C430]" />
                                            <span>Бесплатная и удобная доставка</span>
                                        </li>
                                        <li className="flex items-start space-x-2">
                                            <Check className="mt-0.5 h-4 w-4 text-[#F4C430]" />
                                            <span>100% Гарантия возврата денег</span>
                                        </li>
                                        <li className="flex items-start space-x-2">
                                            <Check className="mt-0.5 h-4 w-4 text-[#F4C430]" />
                                            <span>Поддержка клиентов 24/7</span>
                                        </li>
                                        <li className="flex items-start space-x-2">
                                            <Check className="mt-0.5 h-4 w-4 text-[#F4C430]" />
                                            <span>Безопасный способ оплаты</span>
                                        </li>
                                        <li className="flex items-start space-x-2">
                                            <Check className="mt-0.5 h-4 w-4 text-[#F4C430]" />
                                            <span>Безопасный способ оплаты</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        )}

                        {activeTab === 'additional' && (
                            <div className="space-y-4 text-sm text-gray-600">
                                <h3 className="text-lg font-semibold text-gray-900">
                                    Дополнительная информация
                                </h3>
                                <div className="space-y-2">
                                    <div className="flex">
                                        <span className="w-48 font-medium">
                                            Вес:
                                        </span>
                                        <span>1.4 кг</span>
                                    </div>
                                    <div className="flex">
                                        <span className="w-48 font-medium">
                                            Размеры:
                                        </span>
                                        <span>31.26 x 22.12 x 1.55 см</span>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'specifications' && (
                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold text-gray-900">
                                    Характеристики
                                </h3>
                                {listing.specifications && listing.specifications.length > 0 ? (
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2 text-sm">
                                        {listing.specifications.map((spec, index) => (
                                            <div key={index} className="flex border-b border-gray-100 py-2">
                                                <span className="w-48 font-medium text-gray-500">
                                                    {spec.key}:
                                                </span>
                                                <span>{spec.value}</span>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-gray-500">Характеристики не указаны</p>
                                )}
                            </div>
                        )}






                        {activeTab === 'reviews' && (
                            <div className="space-y-8">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-lg font-semibold text-gray-900">
                                        Отзывы покупателей ({listing.reviews?.length || 0})
                                    </h3>
                                </div>

                                <div className="space-y-6">
                                    {listing.reviews && listing.reviews.length > 0 ? (
                                        listing.reviews.map((review) => (
                                            <div key={review.id} className="border-b border-gray-100 pb-6 last:border-0 last:pb-0">
                                                <div className="flex items-center justify-between mb-2">
                                                    <div className="flex items-center gap-2">
                                                        <div className="font-semibold text-gray-900">{review.user.name}</div>
                                                        <span className="text-gray-400 text-xs">•</span>
                                                        <div className="text-gray-500 text-xs">
                                                            {new Date(review.created_at).toLocaleDateString()}
                                                        </div>
                                                    </div>
                                                    <div className="flex text-[#F4C430]">
                                                        {[...Array(5)].map((_, i) => (
                                                            <Star
                                                                key={i}
                                                                className={`h-4 w-4 ${i < review.rating ? 'fill-current' : 'text-gray-300'}`}
                                                            />
                                                        ))}
                                                    </div>
                                                </div>
                                                <p className="text-gray-600 text-sm mt-2">{review.comment}</p>
                                            </div>
                                        ))
                                    ) : (
                                        <p className="text-gray-500 italic">Отзывов пока нет. Будьте первыми!</p>
                                    )}
                                </div>


                                {canReview ? (
                                    <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 mt-8">
                                        <h4 className="text-md font-semibold mb-4">Оставить отзыв</h4>
                                        <form onSubmit={handleReviewSubmit} className="space-y-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Ваша оценка</label>
                                                <div className="flex gap-1">
                                                    {[1, 2, 3, 4, 5].map((star) => (
                                                        <button
                                                            key={star}
                                                            type="button"
                                                            onClick={() => setReviewForm({ ...reviewForm, rating: star })}
                                                            className="focus:outline-none"
                                                        >
                                                            <Star
                                                                className={`h-6 w-6 ${star <= reviewForm.rating ? 'text-[#F4C430] fill-[#F4C430]' : 'text-gray-300'}`}
                                                            />
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Комментарий</label>
                                                <textarea
                                                    className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FA8232] focus:border-transparent"
                                                    rows={4}
                                                    placeholder="Расскажите о своих впечатлениях..."
                                                    value={reviewForm.comment}
                                                    onChange={(e) => setReviewForm({ ...reviewForm, comment: e.target.value })}
                                                    required
                                                />
                                            </div>
                                            <Button
                                                type="submit"
                                                disabled={isSubmittingReview}
                                                className="bg-[#FA8232] text-white hover:bg-[#E97527]"
                                            >
                                                {isSubmittingReview ? 'Публикация...' : 'Опубликовать отзыв'}
                                            </Button>
                                        </form>
                                    </div>
                                ) : (
                                    <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 mt-8 text-center">
                                        <p className="text-gray-500">
                                            {auth.user
                                                ? 'Вы сможете оставить отзыв после покупки и получения этого товара.'
                                                : 'Отзывы могут оставлять только авторизованные пользователи, купившие товар.'}
                                        </p>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                <section className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12'>
                    {/* Related Products Section (Real Data) */}
                    {relatedListings.length > 0 && (
                        <div className="mt-16">
                            <h2 className="mb-6 text-xl font-semibold">
                                СВЯЗАННЫЕ ТОВАРЫ
                            </h2>
                            <div className="space-y-4">
                                {relatedListings.map((relatedListing) => (
                                    <Link
                                        key={relatedListing.id}
                                        href={`/products/${relatedListing.id}`}
                                    >
                                        <Card className="border shadow-none p-3 rounded-sm hover:shadow-md transition-shadow cursor-pointer">
                                            <CardContent className="p-0">
                                                <div className="grid grid-cols-3 gap-3">
                                                    <div className="col-span-1">
                                                        {relatedListing.images?.[0] ? (
                                                            <img
                                                                src={relatedListing.images[0]}
                                                                alt={relatedListing.title}
                                                                className="h-20 w-full rounded object-cover"
                                                            />
                                                        ) : (
                                                            <div className="h-20 w-full rounded bg-gray-100 flex items-center justify-center">
                                                                <span className="text-xs text-gray-400">Нет фото</span>
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className='col-span-2'>
                                                        <h3 className="mb-2 line-clamp-2 text-sm font-medium">
                                                            {relatedListing.title}
                                                        </h3>
                                                        <div className="flex items-center space-x-2">
                                                            <span className="text-lg font-bold text-blue-600">
                                                                {relatedListing.price.toLocaleString('ru-RU')} ₸
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}

                    {/*     Product Accessories */}
                    <SidebarProductList title="АКСЕССУАРЫ ДЛЯ ТОВАРА" products={productAccessories} />

                    {/* Apple Products */}
                    <SidebarProductList title="ТОВАРЫ APPLE" products={appleProducts} />

                    {/* Featured Products */}
                    <SidebarProductList title="РЕКОМЕНДУЕМЫЕ ТОВАРЫ" products={featuredProducts} />
                </section>
            </div>

            <Footer />
        </>
    );
}

const SidebarProductList = ({ title, products }: { title: string; products: RelatedProduct[] }) => (
    <div className="mt-16">
        <h2 className="mb-6 text-xl font-semibold">
            {title}
        </h2>
        <div className="space-y-4">
            {products.map((product) => (
                <Card key={product.id} className="border shadow-none p-3 rounded-sm hover:shadow-sm transition-shadow">
                    <CardContent className="grid grid-cols-3 gap-3 p-0">
                        <div className="overflow-hidden rounded-lg bg-gray-100">
                            <img
                                src={product.image}
                                alt={product.name}
                                className="h-20 w-full object-cover"
                            />
                        </div>
                        <div className='col-span-2'>
                            <h3 className="mb-2 line-clamp-2 text-sm font-medium">
                                {product.name}
                            </h3>
                            <div className="flex items-center space-x-2">
                                <span className="text-lg font-bold text-blue-600">
                                    {product.price} Тг
                                </span>
                                {product.oldPrice && (
                                    <span className="text-sm text-gray-400 line-through">
                                        ${product.oldPrice}
                                    </span>
                                )}
                            </div>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    </div>
);
