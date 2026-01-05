import { Link } from '@inertiajs/react';
import { ArrowRight } from 'lucide-react';

export function Footer() {
    return (
        <footer className="w-full bg-[#1A1A1A] py-8 md:py-12 text-white">
            <div className="mx-auto max-w-7xl px-4">
                <div className="grid grid-cols-2 gap-6 md:gap-8 md:grid-cols-2 lg:grid-cols-5">
                    {/* Logo and Contact */}
                    <div className="col-span-2 md:col-span-2 lg:col-span-1">
                        <div className="mb-3 md:mb-4 flex items-center space-x-2">
                            <div className="flex h-8 w-8 md:h-10 md:w-10 items-center justify-center rounded-full bg-[#FF6B35]">
                                <div className="h-5 w-5 md:h-6 md:w-6 rounded-full border-2 border-white" />
                            </div>
                            <span className="text-lg md:text-xl font-bold">ZALOGAL</span>
                        </div>
                        <div className="space-y-1 md:space-y-2 text-xs md:text-sm text-gray-400">
                            <p className="font-semibold text-white text-sm md:text-base">
                                Служба Поддержки:
                            </p>
                            <p className="text-base md:text-lg font-semibold text-white">
                                +7 777 964 2944
                            </p>
                            <p>Алматы, ул. Гагарина, 34А</p>
                            <p>info@zalogal.kz</p>
                        </div>
                    </div>

                    {/* Top Categories */}
                    <div>
                        <h3 className="mb-3 md:mb-4 text-xs md:text-sm font-semibold uppercase">
                            ТОП КАТЕГОРИИ
                        </h3>
                        <ul className="space-y-1.5 md:space-y-2 text-xs md:text-sm text-gray-400">
                            <li>
                                <Link
                                    href="#"
                                    className="hover:text-white"
                                >
                                    Ноутбуки
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="#"
                                    className="hover:text-white"
                                >
                                    Смартфоны
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="#"
                                    className="hover:text-white"
                                >
                                    Наушники
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="#"
                                    className="hover:text-white"
                                >
                                    Аксессуары
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="#"
                                    className="hover:text-white"
                                >
                                    Камера и фото
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="#"
                                    className="hover:text-white"
                                >
                                    Телевизоры
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="#"
                                    className="flex items-center gap-1 font-semibold text-[#F4C430] hover:text-[#E5B520]"
                                >
                                    Все товары
                                    <ArrowRight className="h-3 w-3 md:h-4 md:w-4" />
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="mb-3 md:mb-4 text-xs md:text-sm font-semibold uppercase">
                            ГОРЯЧИЕ ССЫЛКИ
                        </h3>
                        <ul className="space-y-1.5 md:space-y-2 text-xs md:text-sm text-gray-400">
                            <li>
                                <Link
                                    href="#"
                                    className="hover:text-white"
                                >
                                    Магазин товаров
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="#"
                                    className="hover:text-white"
                                >
                                    Корзина
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="#"
                                    className="hover:text-white"
                                >
                                    Избранное
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="#"
                                    className="hover:text-white"
                                >
                                    Сравнить
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="#"
                                    className="hover:text-white"
                                >
                                    Отслеживать
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="#"
                                    className="hover:text-white"
                                >
                                    Поддержка
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="#"
                                    className="hover:text-white"
                                >
                                    Кто мы
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Download App */}
                    <div className="col-span-2 md:col-span-1">
                        <h3 className="mb-3 md:mb-4 text-xs md:text-sm font-semibold uppercase">
                            СКАЧАТЬ ПРИЛОЖЕНИЕ
                        </h3>
                        <div className="flex md:flex-col gap-2 md:space-y-3">
                            <a
                                href="#"
                                className="flex items-center gap-2 md:gap-3 rounded border border-gray-700 p-2 md:p-3 transition-colors hover:border-gray-600 flex-1 md:flex-none"
                            >
                                <svg
                                    className="h-6 w-6 md:h-8 md:w-8"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                >
                                    <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
                                </svg>
                                <div className="text-left">
                                    <div className="text-[10px] md:text-xs text-gray-400">
                                        Скачать из:
                                    </div>
                                    <div className="text-xs md:text-base font-semibold">
                                        Google Play
                                    </div>
                                </div>
                            </a>
                            <a
                                href="#"
                                className="flex items-center gap-2 md:gap-3 rounded border border-gray-700 p-2 md:p-3 transition-colors hover:border-gray-600 flex-1 md:flex-none"
                            >
                                <svg
                                    className="h-6 w-6 md:h-8 md:w-8"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                >
                                    <path d="M18.71,19.5C17.88,20.74 17,21.95 15.66,21.97C14.32,22 13.89,21.18 12.37,21.18C10.84,21.18 10.37,21.95 9.1,22C7.79,22.05 6.8,20.68 5.96,19.47C4.25,17 2.94,12.45 4.7,9.39C5.57,7.87 7.13,6.91 8.82,6.88C10.1,6.86 11.32,7.75 12.11,7.75C12.89,7.75 14.37,6.68 15.92,6.84C16.57,6.87 18.39,7.1 19.56,8.82C19.47,8.88 17.39,10.1 17.41,12.63C17.44,15.65 20.06,16.66 20.09,16.67C20.06,16.74 19.67,18.11 18.71,19.5M13,3.5C13.73,2.67 14.94,2.04 15.94,2C16.07,3.17 15.6,4.35 14.9,5.19C14.21,6.04 13.07,6.7 11.95,6.61C11.8,5.46 12.36,4.26 13,3.5Z" />
                                </svg>
                                <div className="text-left">
                                    <div className="text-[10px] md:text-xs text-gray-400">
                                        Скачать из:
                                    </div>
                                    <div className="text-xs md:text-base font-semibold">
                                        App Store
                                    </div>
                                </div>
                            </a>
                        </div>
                    </div>

                    {/* Popular Tags */}
                    <div className="col-span-2 lg:col-span-1">
                        <h3 className="mb-3 md:mb-4 text-xs md:text-sm font-semibold uppercase">
                            ПОПУЛЯРНЫЕ ТЕГИ
                        </h3>
                        <div className="flex flex-wrap gap-1.5 md:gap-2">
                            {[
                                'Game',
                                'iPhone',
                                'TV',
                                'Asus Laptops',
                                'Macbook',
                                'SSD',
                                'Graphics Card',
                                'Power Bank',
                                'Smart TV',
                                'Speaker',
                                'Tablet',
                                'Microwave',
                                'Samsung',
                            ].map((tag) => (
                                <Link
                                    key={tag}
                                    href="#"
                                    className="rounded border border-gray-700 px-2 md:px-3 py-1 text-[10px] md:text-xs text-gray-400 transition-colors hover:border-gray-600 hover:text-white"
                                >
                                    {tag}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-8 md:mt-12 border-t border-gray-800 pt-4 md:pt-6 text-center text-xs md:text-sm text-gray-500">
                    <p>
                        Erabyy - Zalogal Template © 2024. Design by Template
                    </p>
                </div>
            </div>
        </footer>
    );
}
