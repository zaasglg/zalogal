import { ArrowRight } from 'lucide-react';
import { Link } from '@inertiajs/react';

interface Post {
    id: number;
    title: string;
    slug: string;
    excerpt: string | null;
    image: string | null;
    published_at: string | null;
    user: {
        name: string;
    };
}

interface NewsSectionProps {
    posts?: Post[];
}

export function NewsSection({ posts = [] }: NewsSectionProps) {
    if (posts.length === 0) {
        return null;
    }

    return (
        <div className="w-full bg-gray-100 py-8 md:py-12">
            <div className="mx-auto max-w-7xl px-4">
                {/* Title */}
                <h2 className="mb-6 md:mb-8 text-center text-xl md:text-3xl font-bold text-gray-900">
                    НОВОСТИ И БЛОГ
                </h2>

                {/* News Grid - Horizontal scroll on mobile */}
                <div className="flex md:grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 overflow-x-auto md:overflow-visible pb-4 md:pb-0 -mx-4 px-4 md:mx-0 md:px-0 scrollbar-hide snap-x snap-mandatory">
                    {posts.map((item) => (
                        <div
                            key={item.id}
                            className="flex-shrink-0 w-[280px] md:w-auto snap-start overflow-hidden rounded bg-white shadow-sm transition-shadow hover:shadow-md"
                        >
                            {/* Image */}
                            <div className="aspect-video overflow-hidden bg-gray-200">
                                {item.image ? (
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        className="h-full w-full object-cover transition-transform hover:scale-105"
                                    />
                                ) : (
                                    <div className="h-full w-full flex items-center justify-center text-gray-400">
                                        No Image
                                    </div>
                                )}
                            </div>

                            {/* Content */}
                            <div className="p-4 md:p-6">
                                {/* Meta */}
                                <div className="mb-2 md:mb-3 flex items-center gap-3 md:gap-4 text-[10px] md:text-xs text-gray-500">
                                    <div className="flex items-center gap-1">
                                        <svg
                                            className="h-3 w-3 md:h-4 md:w-4"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                            />
                                        </svg>
                                        <span>{item.user?.name || 'Admin'}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <svg
                                            className="h-3 w-3 md:h-4 md:w-4"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                            />
                                        </svg>
                                        <span>
                                            {item.published_at
                                                ? new Date(item.published_at).toLocaleDateString('ru-RU', {
                                                    day: 'numeric',
                                                    month: 'short',
                                                    year: 'numeric'
                                                })
                                                : ''}
                                        </span>
                                    </div>
                                </div>

                                {/* Title */}
                                <h3 className="mb-2 md:mb-3 text-sm md:text-lg font-semibold text-gray-900 line-clamp-2">
                                    {item.title}
                                </h3>

                                {/* Excerpt */}
                                <p className="mb-3 md:mb-4 text-xs md:text-sm text-gray-600 line-clamp-2 md:line-clamp-3">
                                    {item.excerpt}
                                </p>

                                {/* Read More Link */}
                                <Link
                                    href={`/blog/${item.id}`}
                                    className="flex items-center gap-1 text-xs md:text-sm font-semibold text-[#FF6B35] transition-colors hover:text-[#E55A2B] border border-[#FFE7D6] py-2 px-3 md:px-4 w-fit"
                                >
                                    ПОДРОБНЕЕ
                                    <ArrowRight className="h-3 w-3 md:h-4 md:w-4" />
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
