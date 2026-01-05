import { Breadcrumbs } from '@/components/breadcrumbs';
import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet';
import { Head, Link, router, usePage } from '@inertiajs/react';
import {
    ChevronLeft,
    ChevronRight,
    Filter,
    Grid3x3,
    Heart,
    List,
    Search,
    ShoppingCart,
    Star,
} from 'lucide-react';
import { useState, useEffect, useMemo } from 'react';
import { toast } from 'sonner';

interface Specification {
    key: string;
    value: string;
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
    is_favorited?: boolean;
}

interface Category {
    id: number;
    name: string;
    listings_count?: number;
}

interface Props {
    listings?: {
        data: Listing[];
        links: Array<{
            url: string | null;
            label: string;
            active: boolean;
        }>;
    };
    categories?: Category[];
    filters?: {
        category?: string;
        min_price?: string;
        max_price?: string;
        search?: string;
        sort?: string;
    };
}

const brands = [
    { name: 'Apple', count: null },
    { name: 'Microsoft', count: null },
    { name: 'Dell', count: null },
    { name: 'LG', count: null },
    { name: 'Sony', count: null },
    { name: 'LG', count: null },
    { name: 'HP', count: null },
    { name: 'Xiaomi', count: null },
    { name: 'Panasonic', count: null },
    { name: 'Samsung', count: null },
    { name: 'OnePlus', count: null },
];

const tags = [
    'Игры',
    'iPhone',
    'ТВ',
    'Ноутбуки Asus',
    'Macbook',
    'SSD',
    'Видеокарта',
    'Power Bank',
    'Умный ТВ',
    'Колонки',
    'Планшеты',
    'Микроволновка',
    'Samsung',
];

export default function Products({ listings, categories, filters }: Props) {
    const { props } = usePage();
    const auth = props.auth as { user: any };

    // Безопасная инициализация с проверкой на null/undefined
    const safeListings = listings ?? { data: [], links: [] };
    const safeCategories = Array.isArray(categories) ? categories : [];

    // Безопасная обработка filters - убеждаемся, что это объект
    const safeFilters = useMemo(() => {
        if (!filters) return {};
        if (typeof filters !== 'object') return {};
        if (Array.isArray(filters)) return {};
        return filters;
    }, [filters]);

    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [minPrice, setMinPrice] = useState(() => {
        const value = safeFilters.min_price;
        return value !== undefined && value !== null ? String(value) : '';
    });
    const [maxPrice, setMaxPrice] = useState(() => {
        const value = safeFilters.max_price;
        return value !== undefined && value !== null ? String(value) : '';
    });
    const [search, setSearch] = useState(() => {
        const value = safeFilters.search;
        return value !== undefined && value !== null ? String(value) : '';
    });
    const [selectedCategory, setSelectedCategory] = useState(() => {
        const value = safeFilters.category;
        return value !== undefined && value !== null ? String(value) : '';
    });
    const [sortBy, setSortBy] = useState(() => {
        const value = safeFilters.sort;
        return value !== undefined && value !== null ? String(value) : 'popular';
    });

    // Синхронизация состояния с пропсами при изменении фильтров
    useEffect(() => {
        const newMinPrice = safeFilters.min_price !== undefined && safeFilters.min_price !== null ? String(safeFilters.min_price) : '';
        const newMaxPrice = safeFilters.max_price !== undefined && safeFilters.max_price !== null ? String(safeFilters.max_price) : '';
        const newSearch = safeFilters.search !== undefined && safeFilters.search !== null ? String(safeFilters.search) : '';
        const newCategory = safeFilters.category !== undefined && safeFilters.category !== null ? String(safeFilters.category) : '';
        const newSort = safeFilters.sort !== undefined && safeFilters.sort !== null ? String(safeFilters.sort) : 'popular';

        setMinPrice(newMinPrice);
        setMaxPrice(newMaxPrice);
        setSearch(newSearch);
        setSelectedCategory(newCategory);
        setSortBy(newSort);
    }, [safeFilters]);

    const handleFilter = () => {
        router.get('/products', {
            category: selectedCategory || undefined,
            min_price: minPrice || undefined,
            max_price: maxPrice || undefined,
            search: search || undefined,
            sort: sortBy,
        }, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const handleCategoryChange = (categoryName: string) => {
        setSelectedCategory(categoryName === selectedCategory ? '' : categoryName);
        router.get('/products', {
            ...safeFilters,
            category: categoryName === selectedCategory ? undefined : categoryName,
        }, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const handleSortChange = (sort: string) => {
        setSortBy(sort);
        router.get('/products', {
            ...safeFilters,
            sort,
        }, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const removeFilter = (filterType: 'category' | 'min_price' | 'max_price' | 'search' | 'price') => {
        const newFilters: any = { ...safeFilters };

        if (filterType === 'category') {
            setSelectedCategory('');
            delete newFilters.category;
        } else if (filterType === 'min_price') {
            setMinPrice('');
            delete newFilters.min_price;
        } else if (filterType === 'max_price') {
            setMaxPrice('');
            delete newFilters.max_price;
        } else if (filterType === 'price') {
            setMinPrice('');
            setMaxPrice('');
            delete newFilters.min_price;
            delete newFilters.max_price;
        } else if (filterType === 'search') {
            setSearch('');
            delete newFilters.search;
        }

        // Удаляем undefined значения
        Object.keys(newFilters).forEach(key => {
            if (newFilters[key] === undefined || newFilters[key] === '') {
                delete newFilters[key];
            }
        });

        router.get('/products', {
            ...newFilters,
            sort: sortBy || 'popular',
        }, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const hasActiveFilters = () => {
        return !!(selectedCategory || minPrice || maxPrice || search);
    };

    const addToCart = (listingId: number) => {
        const listing = safeListings.data.find(l => l.id === listingId);
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

    const SidebarContent = () => (
        <div className="space-y-6">
            {/* Category Filter */}
            <Card className='shadow-none'>
                <CardContent className="">
                    <h3 className="mb-4 text-sm font-semibold uppercase text-gray-900">
                        КАТЕГОРИИ
                    </h3>
                    <div className="space-y-3">
                        {safeCategories && safeCategories.length > 0 ? (
                            safeCategories.map((category) => (
                                <div
                                    key={category.id}
                                    className="flex items-center justify-between"
                                >
                                    <div className="flex items-center space-x-2">
                                        <div
                                            className={`h-4 w-4 rounded-full border-2 cursor-pointer ${selectedCategory === category.name
                                                ? 'border-[#F4C430] bg-[#F4C430]'
                                                : 'border-gray-300'
                                                }`}
                                            onClick={() => handleCategoryChange(category.name)}
                                        />
                                        <label
                                            className={`text-sm ${selectedCategory === category.name
                                                ? 'font-medium text-[#F4C430]'
                                                : 'text-gray-600'
                                                } cursor-pointer`}
                                            onClick={() => handleCategoryChange(category.name)}
                                        >
                                            {category.name}
                                        </label>
                                    </div>
                                    {category.listings_count !== undefined && category.listings_count > 0 && (
                                        <span className="text-xs text-gray-400">
                                            {category.listings_count}
                                        </span>
                                    )}
                                </div>
                            ))
                        ) : (
                            <p className="text-sm text-gray-500">Категории не найдены</p>
                        )}
                    </div>
                </CardContent>
            </Card>

            {/* Price Range */}
            <Card className='shadow-none'>
                <CardContent className="p-6">
                    <h3 className="mb-4 text-sm font-semibold uppercase text-gray-900">
                        ЦЕНА
                    </h3>
                    <div className="space-y-4">
                        <div className="flex items-center space-x-2">
                            <Input
                                type="number"
                                placeholder="Мин. цена"
                                value={minPrice}
                                onChange={(e) =>
                                    setMinPrice(e.target.value)
                                }
                                className="text-sm"
                            />
                            <Input
                                type="number"
                                placeholder="Макс. цена"
                                value={maxPrice}
                                onChange={(e) =>
                                    setMaxPrice(e.target.value)
                                }
                                className="text-sm"
                            />
                        </div>
                        <div className="space-y-2">
                            {[
                                { label: 'Все цены', min: '', max: '' },
                                { label: 'До 10,000 ₸', min: '', max: '10000' },
                                { label: '10,000 - 50,000 ₸', min: '10000', max: '50000' },
                                { label: '50,000 - 100,000 ₸', min: '50000', max: '100000' },
                                { label: '100,000 - 500,000 ₸', min: '100000', max: '500000' },
                                { label: '500,000 - 1,000,000 ₸', min: '500000', max: '1000000' },
                                { label: 'От 1,000,000 ₸', min: '1000000', max: '' },
                            ].map((range) => (
                                <div
                                    key={range.label}
                                    className="flex items-center space-x-2"
                                >
                                    <Checkbox
                                        id={range.label}
                                        checked={
                                            (range.min === '' && range.max === '' && !minPrice && !maxPrice) ||
                                            (minPrice === range.min && maxPrice === range.max)
                                        }
                                        onCheckedChange={(checked) => {
                                            if (checked) {
                                                setMinPrice(range.min);
                                                setMaxPrice(range.max);
                                                router.get('/products', {
                                                    ...filters,
                                                    min_price: range.min || undefined,
                                                    max_price: range.max || undefined,
                                                }, {
                                                    preserveState: true,
                                                    preserveScroll: true,
                                                });
                                            }
                                        }}
                                    />
                                    <Label
                                        htmlFor={range.label}
                                        className="text-sm text-gray-600 cursor-pointer"
                                    >
                                        {range.label}
                                    </Label>
                                </div>
                            ))}
                        </div>
                        <Button
                            onClick={handleFilter}
                            className="w-full bg-[#FA8232] hover:bg-[#FA8235] text-white"
                        >
                            Применить фильтр
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {/* Popular Brands */}
            <Card className='shadow-none'>
                <CardContent className="p-6">
                    <h3 className="mb-4 text-sm font-semibold uppercase text-gray-900">
                        ПОПУЛЯРНЫЕ БРЕНДЫ
                    </h3>
                    <div className="space-y-3">
                        {brands.map((brand, index) => (
                            <div
                                key={`${brand.name}-${index}`}
                                className="flex items-center justify-between"
                            >
                                <div className="flex items-center space-x-2">
                                    <Checkbox id={brand.name} />
                                    <Label
                                        htmlFor={brand.name}
                                        className="text-sm text-gray-600"
                                    >
                                        {brand.name}
                                    </Label>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            {/* Popular Tags */}
            <Card className='shadow-none'>
                <CardContent className="p-6">
                    <h3 className="mb-4 text-sm font-semibold uppercase text-gray-900">
                        ПОПУЛЯРНЫЕ ТЕГИ
                    </h3>
                    <div className="flex flex-wrap gap-2">
                        {tags.map((tag) => (
                            <Badge
                                key={tag}
                                variant="outline"
                                className="cursor-pointer hover:bg-gray-100"
                            >
                                {tag}
                            </Badge>
                        ))}
                    </div>
                </CardContent>
            </Card>

            {/* Apple Watch Ad */}
            <Card className="overflow-hidden shadow-none bg-gradient-to-br from-gray-100 to-white">
                <CardContent className="p-6 text-center">
                    <div className="mb-4">
                        <img
                            src="/assets/images/apple-watch.png"
                            alt="Apple Watch"
                            className="mx-auto h-48 w-auto object-contain"
                        />
                    </div>
                    <div className="mb-2 text-4xl font-bold flex items-center justify-center space-x-2">
                        <span className="text-5xl">
                            <svg
                                className="mx-auto mb-2 h-12 w-12"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                            >
                                <path d="M18.71,19.5C17.88,20.74 17,21.95 15.66,21.97C14.32,22 13.89,21.18 12.37,21.18C10.84,21.18 10.37,21.95 9.1,22C7.79,22.05 6.8,20.68 5.96,19.47C4.25,17 2.94,12.45 4.7,9.39C5.57,7.87 7.13,6.91 8.82,6.88C10.1,6.86 11.32,7.75 12.11,7.75C12.89,7.75 14.37,6.68 15.92,6.84C16.57,6.87 18.39,7.1 19.56,8.82C19.47,8.88 17.39,10.1 17.41,12.63C17.44,15.65 20.06,16.66 20.09,16.67C20.06,16.74 19.67,18.11 18.71,19.5M13,3.5C13.73,2.67 14.94,2.04 15.94,2C16.07,3.17 15.6,4.35 14.9,5.19C14.21,6.04 13.07,6.7 11.95,6.61C11.8,5.46 12.36,4.26 13,3.5Z" />
                            </svg>
                        </span>
                        <div className="text-2xl font-bold">
                            WATCH
                        </div>
                    </div>
                    <h4 className="mb-2 text-lg font-semibold">
                        Множество функций.
                        <br />
                        Лучшая цена.
                    </h4>
                    <div className="mb-4">
                        <span className="text-sm text-gray-500 line-through">
                            99,000 ₸
                        </span>
                        <span className="ml-2 text-2xl font-bold text-blue-600">
                            79,000 ₸
                        </span>
                    </div>
                    <Button
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                        }}
                        className="w-full h-[50px] !rounded-sm bg-[#FA8232] hover:bg-[#FA8235] cursor-pointer"
                    >
                        В КОРЗИНУ
                    </Button>
                    <Button
                        variant="link"
                        className="mt-2 w-full text-[#FA8232]"
                    >
                        ПОДРОБНЕЕ →
                    </Button>
                </CardContent>
            </Card>
        </div>
    );

    return (
        <>
            <Head title="Электроника - Zalogal" />

            <Header />

            <div className="bg-[#F2F4F5] py-4">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <Breadcrumbs
                        breadcrumbs={[
                            { title: 'Главная', href: '/' },
                            { title: 'Магазины', href: '/products' },
                            { title: 'Список товаров', href: '/products' },
                            { title: 'Электроника', href: '' },
                        ]}
                    />
                </div>
            </div>

            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex items-center justify-between lg:hidden mb-6">
                    <h1 className="text-2xl font-bold text-gray-900">Товары</h1>
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="outline" size="sm" className="bg-white">
                                <Filter className="mr-2 h-4 w-4" />
                                Фильтры
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left" className="w-[300px] overflow-y-auto">
                            <SheetHeader className="mb-4">
                                <SheetTitle>Фильтры</SheetTitle>
                            </SheetHeader>
                            <SidebarContent />
                        </SheetContent>
                    </Sheet>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Sidebar */}
                    <aside className="hidden lg:block lg:col-span-3">
                        <SidebarContent />
                    </aside>

                    {/* Main Content */}
                    <main className="lg:col-span-9">
                        {/* Filters and Sort Bar */}
                        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
                            <div className="flex items-center space-x-4 w-full sm:w-auto">
                                <div className="relative w-full sm:w-auto">
                                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                                    <Input
                                        type="text"
                                        placeholder="Поиск товаров..."
                                        className="w-full lg:w-96 pl-10"
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter') {
                                                handleFilter();
                                            }
                                        }}
                                    />
                                </div>

                            </div>
                            <div className="flex items-center space-x-4">
                                <div className="flex items-center space-x-2">
                                    <span className="text-sm text-gray-600">
                                        Сортировка:
                                    </span>
                                    <Select value={sortBy} onValueChange={handleSortChange}>
                                        <SelectTrigger className="w-40">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="popular">
                                                Популярные
                                            </SelectItem>
                                            <SelectItem value="newest">
                                                Новые
                                            </SelectItem>
                                            <SelectItem value="price-low">
                                                Цена: по возрастанию
                                            </SelectItem>
                                            <SelectItem value="price-high">
                                                Цена: по убыванию
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <button
                                        onClick={() => setViewMode('grid')}
                                        className={`rounded p-2 ${viewMode === 'grid'
                                            ? 'bg-gray-200'
                                            : 'hover:bg-gray-100'
                                            }`}
                                    >
                                        <Grid3x3 className="h-5 w-5" />
                                    </button>
                                    <button
                                        onClick={() => setViewMode('list')}
                                        className={`rounded p-2 ${viewMode === 'list'
                                            ? 'bg-gray-200'
                                            : 'hover:bg-gray-100'
                                            }`}
                                    >
                                        <List className="h-5 w-5" />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {hasActiveFilters() && (
                            <div className="flex items-center flex-wrap gap-2 text-sm text-gray-600 w-full bg-gray-50 p-4 mb-4">
                                <span>Активные фильтры:</span>
                                {selectedCategory && (
                                    <button
                                        type="button"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            removeFilter('category');
                                        }}
                                        className="inline-flex items-center"
                                    >
                                        <Badge
                                            variant="secondary"
                                            className="bg-blue-100 text-blue-800 cursor-pointer hover:bg-blue-200"
                                        >
                                            {selectedCategory} ×
                                        </Badge>
                                    </button>
                                )}
                                {(minPrice || maxPrice) && (
                                    <button
                                        type="button"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            removeFilter('price');
                                        }}
                                        className="inline-flex items-center"
                                    >
                                        <Badge
                                            variant="secondary"
                                            className="bg-blue-100 text-blue-800 cursor-pointer hover:bg-blue-200"
                                        >
                                            {minPrice && maxPrice
                                                ? `${Number(minPrice).toLocaleString('ru-RU')} - ${Number(maxPrice).toLocaleString('ru-RU')} ₸`
                                                : minPrice
                                                    ? `От ${Number(minPrice).toLocaleString('ru-RU')} ₸`
                                                    : `До ${Number(maxPrice).toLocaleString('ru-RU')} ₸`
                                            } ×
                                        </Badge>
                                    </button>
                                )}
                                {search && (
                                    <button
                                        type="button"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            removeFilter('search');
                                        }}
                                        className="inline-flex items-center"
                                    >
                                        <Badge
                                            variant="secondary"
                                            className="bg-blue-100 text-blue-800 cursor-pointer hover:bg-blue-200"
                                        >
                                            Поиск: {search} ×
                                        </Badge>
                                    </button>
                                )}
                            </div>
                        )}

                        <div className="mb-4 text-sm text-gray-600">
                            <strong>Найдено {safeListings?.data?.length || 0} товаров.</strong>
                        </div>

                        {/* Products Grid/List */}
                        {safeListings?.data && safeListings.data.length > 0 ? (
                            viewMode === 'grid' ? (
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
                                    {safeListings.data.map((listing) => (
                                        <Link
                                            key={listing.id}
                                            href={`/products/${listing.id}`}
                                        >
                                            <Card className="group overflow-hidden shadow-none rounded-sm transition-shadow hover:shadow-lg p-0 cursor-pointer relative">
                                                <CardContent className='p-0'>
                                                    <div className="relative mb-3">
                                                        <div className="aspect-square overflow-hidden rounded-t-sm bg-gray-100 relative">
                                                            {listing.images && listing.images.length > 0 ? (
                                                                <img
                                                                    src={listing.images[0]}
                                                                    alt={listing.title}
                                                                    className="h-full w-full object-cover transition-transform group-hover:scale-105"
                                                                />
                                                            ) : (
                                                                <div className="flex h-full w-full items-center justify-center">
                                                                    <span className="text-sm text-gray-400">Нет фото</span>
                                                                </div>
                                                            )}
                                                            <button
                                                                onClick={(e) => {
                                                                    e.preventDefault();
                                                                    e.stopPropagation();
                                                                    addToCart(listing.id);
                                                                }}
                                                                className="absolute top-2 right-2 bg-white rounded-full p-2 shadow-md opacity-0 group-hover:opacity-100 transition-opacity hover:bg-[#FA8232] hover:text-white"
                                                                title="Добавить в корзину"
                                                            >
                                                                <ShoppingCart className="h-4 w-4" />
                                                            </button>
                                                            <button
                                                                onClick={(e) => toggleFavorite(e, listing)}
                                                                className={`absolute top-12 right-2 bg-white rounded-full p-2 shadow-md opacity-0 group-hover:opacity-100 transition-opacity hover:bg-gray-50 ${listing.is_favorited ? 'text-red-500 opacity-100' : 'text-gray-400'}`}
                                                                title="В избранное"
                                                            >
                                                                <Heart className={`h-4 w-4 ${listing.is_favorited ? 'fill-current' : ''}`} />
                                                            </button>
                                                        </div>
                                                    </div>
                                                    <div className='p-4'>
                                                        <div className="mb-2">
                                                            <span className="inline-block rounded bg-gray-100 px-2 py-1 text-xs text-gray-600">
                                                                {listing.category}
                                                            </span>
                                                        </div>
                                                        <h3 className="mb-2 line-clamp-2 text-sm font-medium text-gray-900 group-hover:text-[#2B6B8F] transition-colors">
                                                            {listing.title}
                                                        </h3>
                                                        <div className="flex items-center justify-between">
                                                            <span className="text-lg font-bold text-blue-600">
                                                                {listing.price.toLocaleString('ru-RU')} ₸
                                                            </span>
                                                        </div>
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        </Link>
                                    ))}
                                </div>
                            ) : (
                                <div>
                                    {safeListings.data.map((listing) => (
                                        <Link
                                            key={listing.id}
                                            href={`/products/${listing.id}`}
                                        >
                                            <Card className="py-0 mb-5 group overflow-hidden shadow-sm rounded-lg border border-gray-200 transition-shadow hover:shadow-md cursor-pointer">
                                                <CardContent className='p-0'>
                                                    <div className="flex gap-3 p-3">
                                                        <div className="relative w-48 flex-shrink-0">
                                                            <div className="aspect-square overflow-hidden rounded-lg bg-gray-100 relative">
                                                                {listing.images && listing.images.length > 0 ? (
                                                                    <img
                                                                        src={listing.images[0]}
                                                                        alt={listing.title}
                                                                        className="h-full w-full object-cover transition-transform group-hover:scale-105"
                                                                    />
                                                                ) : (
                                                                    <div className="flex h-full w-full items-center justify-center">
                                                                        <span className="text-sm text-gray-400">Нет фото</span>
                                                                    </div>
                                                                )}
                                                                <button
                                                                    onClick={(e) => {
                                                                        e.preventDefault();
                                                                        e.stopPropagation();
                                                                        addToCart(listing.id);
                                                                    }}
                                                                    className="absolute top-2 right-2 bg-white rounded-full p-2 shadow-md opacity-0 group-hover:opacity-100 transition-opacity hover:bg-[#FA8232] hover:text-white"
                                                                    title="Добавить в корзину"
                                                                >
                                                                    <ShoppingCart className="h-4 w-4" />
                                                                </button>
                                                                <button
                                                                    onClick={(e) => toggleFavorite(e, listing)}
                                                                    className={`absolute top-12 right-2 bg-white rounded-full p-2 shadow-md opacity-0 group-hover:opacity-100 transition-opacity hover:bg-gray-50 ${listing.is_favorited ? 'text-red-500 opacity-100' : 'text-gray-400'}`}
                                                                    title="В избранное"
                                                                >
                                                                    <Heart className={`h-4 w-4 ${listing.is_favorited ? 'fill-current' : ''}`} />
                                                                </button>
                                                            </div>
                                                        </div>
                                                        <div className='py-2 flex-1 flex flex-col justify-between'>
                                                            <div>
                                                                <div className="mb-2">
                                                                    <span className="inline-block rounded bg-gray-100 px-2 py-1 text-xs text-gray-600">
                                                                        {listing.category}
                                                                    </span>
                                                                </div>
                                                                <h3 className="mb-2 text-base font-semibold text-gray-900 group-hover:text-[#2B6B8F] transition-colors">
                                                                    {listing.title}
                                                                </h3>
                                                                {listing.description && (
                                                                    <p
                                                                        className="mb-2 text-sm text-gray-600 line-clamp-3 leading-relaxed"
                                                                        dangerouslySetInnerHTML={{ __html: listing.description }}
                                                                    />
                                                                )}
                                                            </div>
                                                            <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                                                                <span className="text-xl font-bold text-blue-600">
                                                                    {listing.price.toLocaleString('ru-RU')} ₸
                                                                </span>
                                                                <Button
                                                                    onClick={(e) => {
                                                                        e.preventDefault();
                                                                        e.stopPropagation();
                                                                        addToCart(listing.id);
                                                                    }}
                                                                    size="sm"
                                                                    className="bg-[#FA8232] hover:bg-[#FA8235] text-white"
                                                                >
                                                                    <ShoppingCart className="h-4 w-4 mr-2" />
                                                                    В корзину
                                                                </Button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        </Link>
                                    ))}
                                </div>
                            )
                        ) : (
                            <div className="text-center py-12 bg-gray-50 rounded-lg">
                                <p className="text-gray-600">Товары не найдены</p>
                            </div>
                        )}

                        {/* Pagination */}
                        {safeListings?.links && safeListings.links.length > 3 && (
                            <div className="mt-8 flex items-center justify-center space-x-2">
                                {safeListings.links.map((link, index) => (
                                    link.url ? (
                                        <Link
                                            key={index}
                                            href={link.url}
                                            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${link.active
                                                ? 'bg-[#FA8232] text-white shadow-md'
                                                : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                                                }`}
                                            dangerouslySetInnerHTML={{ __html: link.label }}
                                        />
                                    ) : (
                                        <span
                                            key={index}
                                            className="px-4 py-2 rounded-full text-sm font-medium bg-gray-100 text-gray-400 cursor-not-allowed"
                                            dangerouslySetInnerHTML={{ __html: link.label }}
                                        />
                                    )
                                ))}
                            </div>
                        )}
                    </main>
                </div>
            </div>

            <Footer />
        </>
    );
}
