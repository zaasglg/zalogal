import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';

interface Category {
    id: number;
    name: string;
    slug: string;
    image: string | null;
}

interface CategoriesSectionProps {
    categories?: Category[];
}

export function CategoriesSection({ categories = [] }: CategoriesSectionProps) {
    const [startIndex, setStartIndex] = useState(0);
    const itemsToShow = 6;

    const handlePrev = () => {
        setStartIndex((prev) => Math.max(0, prev - 1));
    };

    const handleNext = () => {
        setStartIndex((prev) =>
            Math.min(categories.length - itemsToShow, prev + 1),
        );
    };

    const visibleCategories = categories.slice(
        startIndex,
        startIndex + itemsToShow,
    );

    return (
        <div className="w-full pt-6 md:pt-8 bg-gray-50">
            <div className="mx-auto max-w-7xl px-4">
                <h2 className="mb-4 md:mb-6 text-center text-lg md:text-2xl font-semibold text-black">
                    Категорий всех товаров и продукции
                </h2>

                <div className="relative">
                    {/* Previous Button - Hidden on mobile */}
                    {startIndex > 0 && (
                        <button
                            onClick={handlePrev}
                            className="hidden md:flex absolute -left-4 top-1/2 z-10 h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-[#FF6B35] text-white shadow-lg transition-all hover:bg-[#E55A2B]"
                            aria-label="Предыдущая категория"
                        >
                            <ChevronLeft className="h-6 w-6" />
                        </button>
                    )}

                    {/* Categories Grid - Horizontal scroll on mobile */}
                    <div className="flex md:grid md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4 overflow-x-auto md:overflow-visible pb-4 md:pb-0 -mx-4 px-4 md:mx-0 md:px-0 scrollbar-hide snap-x snap-mandatory">
                        {visibleCategories.map((category) => (
                            <div
                                key={category.id}
                                className="group cursor-pointer flex-shrink-0 w-[140px] md:w-auto snap-start"
                            >
                                <div className="overflow-hidden border border-gray-200 rounded-lg bg-white p-2 md:p-3 transition-all hover:shadow-lg">
                                    <div className="mb-2 md:mb-3 flex aspect-square items-center justify-center bg-gray-50 rounded-md">
                                        {category.image ? (
                                            <img
                                                src={category.image}
                                                alt={category.name}
                                                className="h-full w-full object-cover transition-transform rounded-md"
                                            />
                                        ) : (
                                            <span className="text-xs text-gray-400">Нет фото</span>
                                        )}
                                    </div>
                                    <p className="text-center text-xs md:text-sm font-bold text-gray-900 line-clamp-2">
                                        {category.name}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Next Button - Hidden on mobile */}
                    {startIndex < categories.length - itemsToShow && (
                        <button
                            onClick={handleNext}
                            className="hidden md:flex absolute -right-4 top-1/2 z-10 h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-[#FF6B35] text-white shadow-lg transition-all hover:bg-[#E55A2B]"
                            aria-label="Следующая категория"
                        >
                            <ChevronRight className="h-6 w-6" />
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
