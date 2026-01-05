import { Breadcrumbs } from '@/components/breadcrumbs';
import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import { Button } from '@/components/ui/button';
import { Head, Link, router } from '@inertiajs/react';
import { ShoppingCart, Star, X, Plus, Search } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import axios from 'axios';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';

interface Specification {
    key: string;
    value: string;
}

interface CompareListing {
    id: number;
    title: string;
    price: number;
    rating: number; // Will be mapped from reviews_avg_rating
    reviews_count: number;
    images: string[] | null;
    category: string;
    condition: string;
    location: string;
    status: string;
    specifications?: Specification[] | null;
    reviews_avg_rating?: string | number; // From backend
}

interface SearchResult {
    id: number;
    title: string;
    images: string[] | null;
    price: number;
    category: string;
}

export default function Compare() {
    const [products, setProducts] = useState<CompareListing[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
    const [isSearching, setIsSearching] = useState(false);

    useEffect(() => {
        loadProducts();
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (searchQuery.trim()) {
                performSearch(searchQuery);
            } else {
                setSearchResults([]);
            }
        }, 300);

        return () => clearTimeout(timer);
    }, [searchQuery]);

    const performSearch = async (query: string) => {
        setIsSearching(true);
        try {
            const response = await axios.get(`/listings/search?query=${encodeURIComponent(query)}`);
            setSearchResults(response.data);
        } catch (error) {
            console.error('Search failed', error);
        } finally {
            setIsSearching(false);
        }
    };

    const loadProducts = async () => {
        setIsLoading(true);
        const storedIds = localStorage.getItem('compare_ids');
        const ids = storedIds ? JSON.parse(storedIds) : [];

        if (ids.length === 0) {
            setProducts([]);
            setIsLoading(false);
            return;
        }

        try {
            const response = await axios.post('/listings/bulk-details', { ids });
            setProducts(response.data);
        } catch (error) {
            console.error('Failed to fetch compare products', error);
            toast.error('Не удалось загрузить товары для сравнения');
        } finally {
            setIsLoading(false);
        }
    };

    const addToCart = (productId: number) => {
        const product = products.find(p => p.id === productId);
        router.post('/cart', { listing_id: productId }, {
            preserveScroll: true,
            onSuccess: () => {
                toast.success('Товар добавлен в корзину', {
                    description: product?.title || 'Товар успешно добавлен',
                });
            },
            onError: () => {
                router.visit('/login');
            },
        });
    };

    const removeProduct = (id: number) => {
        const updatedProducts = products.filter((p) => p.id !== id);
        setProducts(updatedProducts);

        const currentIds = JSON.parse(localStorage.getItem('compare_ids') || '[]');
        const newIds = currentIds.filter((existingId: number) => existingId !== id);
        localStorage.setItem('compare_ids', JSON.stringify(newIds));
    };

    const addProductToCompare = async (id: number) => {
        const currentIds = JSON.parse(localStorage.getItem('compare_ids') || '[]');
        if (currentIds.includes(id)) {
            toast.info('Товар уже в списке сравнения');
            setIsSearchOpen(false);
            return;
        }

        if (currentIds.length >= 4) {
            toast.error('Достигнут лимит товаров для сравнения (4)');
            return;
        }

        const newIds = [...currentIds, id];
        localStorage.setItem('compare_ids', JSON.stringify(newIds));

        setIsSearchOpen(false);
        setSearchQuery('');
        setSearchResults([]);

        await loadProducts();
        toast.success('Товар добавлен к сравнению');
    };

    // Extract all unique specification keys
    const allSpecKeys = Array.from(new Set(products.flatMap(p => p.specifications?.map(s => s.key) || [])));

    const getSpecValue = (product: CompareListing, key: string) => {
        const spec = product.specifications?.find(s => s.key === key);
        return spec ? spec.value : '-';
    };

    const getRating = (product: CompareListing) => {
        return Number(product.reviews_avg_rating) || 0;
    };

    return (
        <>
            <Head title="Сравнение товаров - Zalogal" />
            <Header />
            <div className="bg-[#F2F4F5] py-4">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <Breadcrumbs
                        breadcrumbs={[
                            { title: 'Главная', href: '/' },
                            { title: 'Сравнение', href: '' },
                        ]}
                    />
                </div>
            </div>

            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
                {isLoading ? (
                    <div className="flex justify-center p-12">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FA8232]"></div>
                    </div>
                ) : products.length === 0 ? (
                    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-gray-300 bg-white p-12 text-center min-h-[400px]">
                        <div className="h-24 w-24 rounded-full bg-[#FFF3E5] flex items-center justify-center mb-6">
                            <Plus className="h-10 w-10 text-[#FA8232]" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">Сравнение товаров пуст</h2>
                        <p className="text-gray-500 mb-8 max-w-md text-lg">
                            Добавляйте товары к сравнению, чтобы выбрать лучший вариант. Вы можете добавить до 4-х товаров.
                        </p>

                        <Button
                            onClick={() => setIsSearchOpen(true)}
                            className="bg-[#FA8232] hover:bg-[#E97527] h-12 px-8 text-base shadow-lg shadow-orange-500/20"
                        >
                            <Plus className="mr-2 h-5 w-5" />
                            Добавить товар
                        </Button>
                    </div>
                ) : (
                    <div className="relative overflow-x-auto pb-6 -mx-4 sm:mx-0 px-4 sm:px-0">
                        <table className="w-full text-left border-collapse min-w-[800px] bg-white rounded-lg shadow-sm">
                            <thead>
                                <tr>
                                    <th className="p-4 bg-gray-50 border-b border-gray-100 min-w-[140px] md:min-w-[200px] md:sticky md:left-0 md:z-10 font-semibold text-gray-700">Товары</th>
                                    {products.map((product) => (
                                        <th key={product.id} className="p-4 border-b border-gray-100 min-w-[240px] md:min-w-[280px] relative">
                                            <button
                                                onClick={() => removeProduct(product.id)}
                                                className="absolute top-2 right-2 p-1 text-gray-400 hover:text-red-500 transition-colors rounded-full hover:bg-red-50"
                                            >
                                                <X className="h-5 w-5" />
                                            </button>
                                            <div className="flex flex-col items-center text-center">
                                                <div className="w-32 h-32 md:w-40 md:h-40 bg-gray-50 rounded-lg mb-4 flex items-center justify-center overflow-hidden">
                                                    {product.images && product.images[0] ? (
                                                        <img src={product.images[0]} alt={product.title} className="max-w-full max-h-full object-contain" />
                                                    ) : (
                                                        <span className="text-gray-400 text-xs">Нет фото</span>
                                                    )}
                                                </div>
                                                <Link href={`/products/${product.id}`} className="font-medium text-gray-900 hover:text-[#FA8232] line-clamp-2 mb-2 h-10 w-full text-sm md:text-base">
                                                    {product.title}
                                                </Link>
                                                <div className="font-bold text-lg md:text-xl text-blue-600 mb-4">
                                                    {Number(product.price).toLocaleString('ru-RU')} ₸
                                                </div>
                                                <Button
                                                    onClick={() => addToCart(product.id)}
                                                    className="w-full bg-[#FA8232] hover:bg-[#E97527] text-white"
                                                    size="sm"
                                                >
                                                    <ShoppingCart className="h-4 w-4 mr-2" />
                                                    В корзину
                                                </Button>
                                            </div>
                                        </th>
                                    ))}
                                    {products.length < 4 && (
                                        <th className="p-4 border-b border-gray-100 min-w-[200px] align-top">
                                            <div
                                                onClick={() => setIsSearchOpen(true)}
                                                className="w-full h-full min-h-[200px] border-2 border-dashed border-gray-200 rounded-lg flex flex-col items-center justify-center text-gray-400 hover:border-[#FA8232] hover:text-[#FA8232] cursor-pointer transition-all bg-gray-50/50 hover:bg-orange-50/10"
                                            >
                                                <Plus className="h-10 w-10 mb-2" />
                                                <span className="font-medium">Добавить</span>
                                            </div>
                                        </th>
                                    )}
                                </tr >
                            </thead >
                            <tbody className="divide-y divide-gray-100">
                                <tr>
                                    <td className="p-4 bg-gray-50 font-medium text-gray-600 md:sticky md:left-0 md:z-10">Рейтинг</td>
                                    {products.map((product) => (
                                        <td key={product.id} className="p-4 text-center">
                                            <div className="flex items-center justify-center gap-1">
                                                <Star className={`h-4 w-4 ${product.rating >= 1 ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />
                                                <span className="text-sm font-medium text-gray-700">{getRating(product)}</span>
                                                <span className="text-xs text-gray-400">({product.reviews_count})</span>
                                            </div>
                                        </td>
                                    ))}
                                    {products.length < 4 && <td></td>}
                                </tr>
                                <tr>
                                    <td className="p-4 bg-gray-50 font-medium text-gray-600 md:sticky md:left-0 md:z-10">Категория</td>
                                    {products.map((product) => (
                                        <td key={product.id} className="p-4 text-center text-sm text-gray-700">
                                            {product.category}
                                        </td>
                                    ))}
                                    {products.length < 4 && <td></td>}
                                </tr>
                                <tr>
                                    <td className="p-4 bg-gray-50 font-medium text-gray-600 md:sticky md:left-0 md:z-10">Состояние</td>
                                    {products.map((product) => (
                                        <td key={product.id} className="p-4 text-center text-sm">
                                            <span className="px-2 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-medium">
                                                {product.condition === 'new' ? 'Новое' :
                                                    product.condition === 'excellent' ? 'Отличное' :
                                                        product.condition === 'good' ? 'Хорошее' : 'Б/У'}
                                            </span>
                                        </td>
                                    ))}
                                    {products.length < 4 && <td></td>}
                                </tr>
                                <tr>
                                    <td className="p-4 bg-gray-50 font-medium text-gray-600 md:sticky md:left-0 md:z-10">Локация</td>
                                    {products.map((product) => (
                                        <td key={product.id} className="p-4 text-center text-sm text-gray-700">
                                            {product.location}
                                        </td>
                                    ))}
                                    {products.length < 4 && <td></td>}
                                </tr>
                                {allSpecKeys.map((key) => (
                                    <tr key={key}>
                                        <td className="p-4 bg-gray-50 font-medium text-gray-600 md:sticky md:left-0 md:z-10">{key}</td>
                                        {products.map((product) => (
                                            <td key={product.id} className="p-4 text-center text-sm text-gray-700">
                                                {getSpecValue(product, key)}
                                            </td>
                                        ))}
                                        {products.length < 4 && <td></td>}
                                    </tr>
                                ))}
                            </tbody>
                        </table >
                    </div >
                )
                }
            </div >

            <Dialog open={isSearchOpen} onOpenChange={setIsSearchOpen}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>Добавить товар к сравнению</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 pt-4">
                        <div className="relative">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                            <Input
                                placeholder="Поиск товара..."
                                className="pl-9"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>

                        <div className="max-h-[300px] overflow-y-auto space-y-2">
                            {isSearching ? (
                                <div className="text-center py-4 text-gray-500">Поиск...</div>
                            ) : searchResults.length > 0 ? (
                                searchResults.map((result) => (
                                    <div
                                        key={result.id}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            addProductToCompare(result.id);
                                        }}
                                        className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-50 cursor-pointer border border-transparent hover:border-gray-200 transition-colors"
                                    >
                                        {result.images && result.images[0] ? (
                                            <img src={result.images[0]} alt={result.title} className="h-10 w-10 rounded object-cover" />
                                        ) : (
                                            <div className="h-10 w-10 rounded bg-gray-100 flex items-center justify-center">
                                                <span className="text-[10px] text-gray-400">Нет</span>
                                            </div>
                                        )}
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium text-gray-900 truncate">{result.title}</p>
                                            <p className="text-xs text-gray-500">{Number(result.price).toLocaleString('ru-RU')} ₸</p>
                                        </div>
                                        <Plus className="h-4 w-4 text-[#FA8232]" />
                                    </div>
                                ))
                            ) : searchQuery ? (
                                <div className="text-center py-4 text-gray-500">Ничего не найдено</div>
                            ) : (
                                <div className="text-center py-4 text-gray-500 text-sm">Введите название товара для поиска</div>
                            )}
                        </div>
                    </div>
                </DialogContent>
            </Dialog>

            <Footer />
        </>
    );
}
