import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export function AdBanner() {
    return (
        <div className="w-full bg-[#F5E6D3]">
            <div className="mx-auto max-w-7xl px-4">
                <div className="flex flex-col items-center justify-between gap-4 py-6 md:py-0 lg:flex-row">
                    {/* Left Content */}
                    <div className="flex-1 text-center lg:text-left">
                        <div className="mb-2 inline-block rounded bg-[#4A9FD8] px-2 md:px-3 py-1 text-xs md:text-sm font-semibold text-white">
                            МЕСТО ДЛЯ ВАШЕЙ РЕКЛАМЫ
                        </div>
                        <h2 className="mb-2 text-2xl md:text-4xl font-bold text-gray-900">
                            РЕКЛАМА
                        </h2>
                        <p className="mb-4 text-sm md:text-lg text-gray-700">
                            ЛЮБАЯ РЕКЛАМА ДЛЯ МОДЕРАЦИИ
                            <br className="hidden md:block" /><span className="md:hidden"> </span>И МОНЕТИЗАЦИИ САЙТА
                        </p>
                        <Button className="rounded-sm bg-[#FF6B35] px-4 md:px-5 py-2 text-sm md:text-base text-white hover:bg-[#E55A2B] w-full sm:w-auto">
                            ССЫЛКА НА РЕКЛАМУ
                            <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5" />
                        </Button>
                    </div>

                    {/* Right Content - Laptop Image */}
                    <div className="relative flex-1 hidden md:block">
                        <div className="absolute top-10 right-20 flex h-12 w-12 md:h-16 md:w-16 items-center justify-center rounded-full bg-white shadow-lg z-10">
                            <div className="text-center">
                                <div className="text-sm md:text-lg font-bold text-gray-900">
                                    $1999
                                </div>
                            </div>
                        </div>
                        <div className="relative h-[240px] md:h-[324px]">
                            <img
                                src="/assets/images/macbook.png"
                                alt="MacBook Pro"
                                className="h-full w-full object-contain"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
