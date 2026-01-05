import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { useEffect, useState, useMemo } from 'react';
import { Link } from '@inertiajs/react';

interface Listing {
    id: number;
    title: string;
    description?: string;
    price: number;
    images: string[] | null;
}

interface Seller {
    id: number;
    name: string;
}

interface HeroSectionProps {
    listings?: Listing[];
    sellers?: Seller[];
}



export function HeroSection({ listings = [], sellers = [] }: HeroSectionProps) {
    const [currentSlide, setCurrentSlide] = useState(0);

    const slides = useMemo(() => {
        if (listings.length === 0) {
            return [
                {
                    id: 0,
                    title: 'Пример',
                    description: 'Земельный участок с площадью 15га. г. Алматы, Медеуский район, с кадастровым номером: 24-256-8965-5-6',
                    price: '1456K',
                    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&h=600&fit=crop',
                }
            ];
        }

        return listings.slice(0, 5).map(listing => ({
            id: listing.id,
            title: listing.title,
            description: listing.description || 'Описание отсутствует',
            price: `${(listing.price / 1000).toFixed(0)}K`,
            image: listing.images && listing.images.length > 0
                ? listing.images[0]
                : '/assets/images/placeholder.jpg'
        }));
    }, [listings]);

    useEffect(() => {
        setCurrentSlide(0);
    }, [listings]);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 5000); // Переключение каждые 5 секунд

        return () => clearInterval(interval);
    }, [slides.length]);
    return (
        <div className="w-full bg-gray-50">
            {/* Hero Banners */}
            <div className="mx-auto max-w-7xl px-4 py-6 md:py-10">
                <div className="grid grid-cols-1 gap-4 md:gap-6 lg:grid-cols-3">
                    {/* Left Banner - Auction */}
                    <div className="relative overflow-hidden rounded bg-white shadow-sm lg:col-span-2 flex flex-col justify-center">
                        <div className="flex flex-col gap-4 md:gap-6 p-4 md:p-6 lg:flex-row lg:items-center lg:p-8">
                            <div className="flex-1">
                                <div className="mb-3 md:mb-4 flex items-center space-x-2 text-xs md:text-sm text-[#2B6B8F]">
                                    <div className="h-0.5 w-6 md:w-8 bg-[#2B6B8F]" />
                                    <span>
                                        Участвуйте в аукционах и приобретайте
                                        недвижимости по низкой цене
                                    </span>
                                </div>
                                <h2 className="mb-3 md:mb-4 text-2xl md:text-4xl font-bold text-gray-900">
                                    {slides[currentSlide].title}
                                </h2>
                                <p className="mb-4 md:mb-6 text-sm md:text-base text-gray-600">
                                    {slides[currentSlide].description}
                                </p>
                                <Link href={slides[currentSlide].id ? `/products/${slides[currentSlide].id}` : '#'}>
                                    <Button className="rounded-sm bg-[#FF6B35] px-4 md:px-6 py-3 md:py-5 text-sm md:text-base text-white hover:bg-[#E55A2B] w-full sm:w-auto">
                                        ПОДРОБНЕЕ
                                        <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5" />
                                    </Button>
                                </Link>
                            </div>
                            <div className="relative h-48 md:h-64 flex-1 lg:h-80">
                                <img
                                    src={slides[currentSlide].image}
                                    alt={slides[currentSlide].title}
                                    className="h-full w-full rounded object-cover"
                                />
                                <div className="absolute right-2 md:right-4 top-2 md:top-4 flex h-14 w-14 md:h-20 md:w-20 items-center justify-center rounded-full bg-[#4A9FD8] text-white shadow-lg">
                                    <div className="text-center">
                                        <div className="text-sm md:text-xl font-bold">
                                            {slides[currentSlide].price}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-center md:justify-start space-x-2 p-3 md:p-4">
                            {slides.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentSlide(index)}
                                    className={`h-2 w-2 rounded-full transition-colors ${index === currentSlide
                                        ? 'bg-gray-900'
                                        : 'bg-gray-300 hover:bg-gray-400'
                                        }`}
                                    aria-label={`Перейти к слайду ${index + 1}`}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Right Banners */}
                    <div className="flex flex-col gap-4 md:gap-6 lg:col-span-1">
                        {/* Discount Banner */}
                        <div className="relative overflow-hidden rounded bg-gradient-to-r from-gray-800 to-gray-900 p-4 text-white">
                            <div className="absolute right-3 md:right-4 top-3 md:top-4">
                                <div className="rounded bg-[#F4C430] px-2 md:px-3 py-1 text-xs md:text-sm font-bold text-black">
                                    15% OFF
                                </div>
                            </div>
                            <div className="mb-2 text-xs md:text-sm uppercase tracking-wide text-[#F4C430]">
                                СКИДОЧНЫЕ ТОВАРЫ
                            </div>
                            <h3 className="mb-4 md:mb-6 text-lg md:text-2xl font-bold">
                                Успейте приобрести
                                <br />
                                скидочные продукции от
                                <br />
                                наших продавцов
                            </h3>
                            <Button className="rounded-sm bg-[#FF6B35] px-4 md:px-6 py-3 md:py-5 text-sm md:text-base text-white hover:bg-[#E55A2B] w-full sm:w-auto">
                                КАТАЛОГ ТОВАРОВ
                                <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5" />
                            </Button>
                        </div>

                        {/* Rating Banner */}
                        <div className="rounded bg-white p-4 shadow-sm">
                            <h3 className="mb-3 md:mb-4 text-lg md:text-xl font-bold text-gray-900">
                                Рейтинг продавцов по
                                <br />
                                отзывам и ценам
                            </h3>
                            <ol className="mb-4 md:mb-6 space-y-2 text-sm md:text-base text-[#2B6B8F]">
                                {sellers.length > 0 ? (
                                    sellers.map((seller, index) => (
                                        <li key={seller.id}>{index + 1}. {seller.name}</li>
                                    ))
                                ) : (
                                    <>
                                        <li>1. Ломбард актив</li>
                                        <li>2. Ломбард Nice Price</li>
                                        <li>3. Банк Halyk bank</li>
                                    </>
                                )}
                            </ol>
                            <Button className="rounded-sm bg-[#FF6B35] px-4 md:px-6 py-3 md:py-5 text-sm md:text-base text-white hover:bg-[#E55A2B] w-full sm:w-auto">
                                ПОСМОТРЕТЬ
                                <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5" />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Features Section */}
            <div className="mx-4 md:mx-auto max-w-7xl border border-gray-200 bg-white rounded-lg md:rounded-none">
                <div className="mx-auto max-w-7xl px-4 py-4">
                    <div className="grid grid-cols-2 gap-4 md:gap-6 md:grid-cols-2 lg:grid-cols-4">
                        {/* Fast Delivery */}
                        <div className="flex flex-col md:flex-row items-center md:items-center space-y-2 md:space-y-0 md:space-x-4 border-b md:border-b-0 md:border-r border-gray-200 pb-4 md:pb-0 md:pr-6 last:border-b-0">
                            <div className="flex h-10 w-10 md:h-12 md:w-12 items-center justify-center">
                                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 md:w-10 md:h-10">
                                    <path d="M35 27.7033V12.2971C34.9988 12.0745 34.939 11.8562 34.8265 11.6642C34.714 11.4722 34.5529 11.3132 34.3594 11.2033L20.6094 3.46895C20.4241 3.36198 20.2139 3.30566 20 3.30566C19.7861 3.30566 19.5759 3.36198 19.3906 3.46895L5.64062 11.2033C5.44711 11.3132 5.28599 11.4722 5.17352 11.6642C5.06105 11.8562 5.0012 12.0745 5 12.2971V27.7033C5.0012 27.9259 5.06105 28.1441 5.17352 28.3362C5.28599 28.5282 5.44711 28.6872 5.64062 28.7971L19.3906 36.5314C19.5759 36.6384 19.7861 36.6947 20 36.6947C20.2139 36.6947 20.4241 36.6384 20.6094 36.5314L34.3594 28.7971C34.5529 28.6872 34.714 28.5282 34.8265 28.3362C34.939 28.1441 34.9988 27.9259 35 27.7033V27.7033Z" stroke="#191C1F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M27.6562 23.8281V15.7031L12.5 7.34375" stroke="#191C1F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M34.8281 11.6562L20.1406 20L5.17188 11.6562" stroke="#191C1F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M20.1406 20L20 36.6875" stroke="#191C1F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>

                            </div>
                            <div className="text-center md:text-left">
                                <div className="font-semibold text-gray-900 text-xs md:text-sm">
                                    БЫСТРАЯ ДОСТАВКА
                                </div>
                                <div className="text-xs md:text-sm text-gray-600">
                                    в течении 24 ч.
                                </div>
                            </div>
                        </div>

                        {/* 24h Return */}
                        <div className="flex flex-col md:flex-row items-center md:items-center space-y-2 md:space-y-0 md:space-x-4 border-b md:border-b-0 md:border-r border-gray-200 pb-4 md:pb-0 md:pr-6">
                            <div className="flex h-10 w-10 md:h-12 md:w-12 items-center justify-center">
                                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 md:w-10 md:h-10">
                                    <path d="M8.75 8.75V17.3594C8.75 23.5625 13.7187 28.7031 19.9219 28.75C21.4058 28.7603 22.8771 28.4769 24.2511 27.9162C25.625 27.3554 26.8744 26.5284 27.9274 25.4827C28.9803 24.437 29.816 23.1933 30.3862 21.8233C30.9565 20.4533 31.25 18.984 31.25 17.5V8.75C31.25 8.41848 31.1183 8.10054 30.8839 7.86612C30.6495 7.6317 30.3315 7.5 30 7.5H10C9.66848 7.5 9.35054 7.6317 9.11612 7.86612C8.8817 8.10054 8.75 8.41848 8.75 8.75Z" stroke="#191C1F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M15 35H25" stroke="#191C1F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M20 28.75V35" stroke="#191C1F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M30.9688 20H32.5C33.8261 20 35.0979 19.4732 36.0355 18.5355C36.9732 17.5979 37.5 16.3261 37.5 15V12.5C37.5 12.1685 37.3683 11.8505 37.1339 11.6161C36.8995 11.3817 36.5815 11.25 36.25 11.25H31.25" stroke="#191C1F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M9.0625 20H7.48438C6.15829 20 4.88652 19.4732 3.94884 18.5355C3.01116 17.5979 2.48438 16.3261 2.48438 15V12.5C2.48438 12.1685 2.61607 11.8505 2.85049 11.6161C3.08491 11.3817 3.40285 11.25 3.73438 11.25H8.73438" stroke="#191C1F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>

                            </div>
                            <div className="text-center md:text-left">
                                <div className="font-semibold text-gray-900 text-xs md:text-sm">
                                    ВОЗВРАТ ЧЕРЕЗ 24 ЧАСА
                                </div>
                                <div className="text-xs md:text-sm text-gray-600">
                                    100% гарантия возврата
                                </div>
                            </div>
                        </div>

                        {/* Secure Payment */}
                        <div className="flex flex-col md:flex-row items-center md:items-center space-y-2 md:space-y-0 md:space-x-4 border-b md:border-b-0 md:border-r border-gray-200 pb-4 md:pb-0 md:pr-6">
                            <div className="flex h-10 w-10 md:h-12 md:w-12 items-center justify-center">
                                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 md:w-10 md:h-10">
                                    <path d="M35 8.75H5C4.30964 8.75 3.75 9.30964 3.75 10V30C3.75 30.6904 4.30964 31.25 5 31.25H35C35.6904 31.25 36.25 30.6904 36.25 30V10C36.25 9.30964 35.6904 8.75 35 8.75Z" stroke="#191C1F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M26.25 26.25H31.25" stroke="#191C1F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M18.75 26.25H21.25" stroke="#191C1F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M3.75 15.1406H36.25" stroke="#191C1F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>

                            </div>
                            <div className="text-center md:text-left">
                                <div className="font-semibold text-gray-900 text-xs md:text-sm">
                                    БЕЗОПАСНЫЙ ПЛАТЕЖ
                                </div>
                                <div className="text-xs md:text-sm text-gray-600">
                                    Деньги в безопасности
                                </div>
                            </div>
                        </div>

                        {/* 24/7 Support */}
                        <div className="flex flex-col md:flex-row items-center md:items-center space-y-2 md:space-y-0 md:space-x-4">
                            <div className="flex h-10 w-10 md:h-12 md:w-12 items-center justify-center">
                                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 md:w-10 md:h-10">
                                    <path d="M35.2344 21.2495H30.2344C29.5713 21.2495 28.9354 21.5129 28.4666 21.9818C27.9978 22.4506 27.7344 23.0865 27.7344 23.7495V29.9995C27.7344 30.6626 27.9978 31.2985 28.4666 31.7673C28.9354 32.2362 29.5713 32.4995 30.2344 32.4995H32.7344C33.3974 32.4995 34.0333 32.2362 34.5021 31.7673C34.971 31.2985 35.2344 30.6626 35.2344 29.9995V21.2495ZM35.2344 21.2495C35.2344 19.2692 34.8424 17.3084 34.0807 15.4803C33.3191 13.6522 32.203 11.993 30.7969 10.5985C29.3907 9.20398 27.7224 8.1017 25.888 7.35527C24.0537 6.60885 22.0897 6.23304 20.1094 6.24954C18.1304 6.23511 16.1681 6.61245 14.3355 7.35981C12.503 8.10716 10.8365 9.20977 9.432 10.6041C8.02751 11.9984 6.91283 13.6569 6.15218 15.4839C5.39153 17.311 4.99995 19.2705 5 21.2495V29.9995C5 30.6626 5.26339 31.2985 5.73223 31.7673C6.20107 32.2362 6.83696 32.4995 7.5 32.4995H10C10.663 32.4995 11.2989 32.2362 11.7678 31.7673C12.2366 31.2985 12.5 30.6626 12.5 29.9995V23.7495C12.5 23.0865 12.2366 22.4506 11.7678 21.9818C11.2989 21.5129 10.663 21.2495 10 21.2495H5" stroke="#191C1F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>

                            </div>
                            <div className="text-center md:text-left">
                                <div className="font-semibold text-gray-900 text-xs md:text-sm">
                                    ПОДДЕРЖКА 24/7
                                </div>
                                <div className="text-xs md:text-sm text-gray-600">
                                    Онлайн созвон/сообщении
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
