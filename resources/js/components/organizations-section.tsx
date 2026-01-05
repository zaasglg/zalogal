import { ArrowRight } from 'lucide-react';
import { useMemo } from 'react';

interface ListingWithUser {
    id: number;
    title: string;
    price: number;
    user?: {
        id: number;
        name: string;
        profile_photo_url?: string;
    };
}

interface OrganizationsSectionProps {
    listings?: ListingWithUser[];
    stats?: {
        total: number;
        active: number;
    };
}

const sections = [
    {
        title: 'Топ ломбарды по ценам',
        organizations: [
            {
                id: 1,
                name: 'Rixos Sport Earbuds Wireless Earphones in Ear...',
                logo: '/assets/images/belyi.png',
                price: '30 230 kzt',
                bgColor: 'bg-white',
                textColor: 'text-white',
            },
            {
                id: 2,
                name: 'Samsung Electronics Samsung Galaxy S21 5G',
                logo: '/assets/images/belyi.png',
                price: '30 230 kzt',
                bgColor: 'bg-yellow-400',
                textColor: 'text-black',
            },
            {
                id: 3,
                name: 'Portable Wshing Machine, 11lbs capacity Model 18NMF...',
                logo: '/assets/images/belyi.png',
                price: '30 230 kzt',
                bgColor: 'bg-white',
                textColor: 'text-black',
            },
        ],
    },
    {
        title: 'Топ ломбарды по отзывам',
        organizations: [
            {
                id: 4,
                name: 'TOZO T6 True Wireless Earbuds Bluetooth Headphon...',
                logo: '/assets/images/belyi.png',
                price: '30 230 kzt',
                bgColor: 'bg-white',
                textColor: 'text-black',
            },
            {
                id: 5,
                name: 'Simple Mobile 4G LTE Prepaid Smartphone',
                logo: '/assets/images/belyi.png',
                price: '30 230 kzt',
                bgColor: 'bg-black',
                textColor: 'text-white',
            },
            {
                id: 6,
                name: 'Simple Mobile 5G LTE Galaxy 1P Mini KJDUB Gaming Phone',
                logo: '/assets/images/belyi.png',
                price: '30 230 kzt',
                bgColor: 'bg-white',
                textColor: 'text-black',
            },
        ],
    },
    {
        title: 'Топ МФО по отзывам',
        organizations: [
            {
                id: 7,
                name: 'Sony DSCHX8 High Zoom Point & Shoot Camera',
                logo: '/assets/images/belyi.png',
                price: '30 230 kzt',
                bgColor: 'bg-white',
                textColor: 'text-black',
            },
            {
                id: 8,
                name: 'JBL FLIP 4 - Waterproof Portable Bluetooth Speaker...',
                logo: '/assets/images/belyi.png',
                price: '30 230 kzt',
                bgColor: 'bg-white',
                textColor: 'text-black',
            },
            {
                id: 9,
                name: '4K UHD LED Smart TV with Chromecast Built-in',
                logo: '/assets/images/belyi.png',
                price: '30 230 kzt',
                bgColor: 'bg-yellow-400',
                textColor: 'text-black',
            },
        ],
    },
    {
        title: 'Топ МФО по ценам',
        organizations: [
            {
                id: 10,
                name: 'Sony DSCHX8 High Zoom Point & Shoot Camera',
                logo: '/assets/images/belyi.png',
                price: '30 230 kzt',
                bgColor: 'bg-black',
                textColor: 'text-white',
            },
            {
                id: 11,
                name: 'Dell Optiplex 7000x7480 All-in-One Computer Monitor',
                logo: '/assets/images/belyi.png',
                price: '30 230 kzt',
                bgColor: 'bg-white',
                textColor: 'text-black',
            },
            {
                id: 12,
                name: 'Wyze Cam Pan v2 1080p Pan/Tilt/Zoom Wi-Fi Indoor Smart...',
                logo: '/assets/images/belyi.png',
                price: '30 230 kzt',
                bgColor: 'bg-yellow-400',
                textColor: 'text-black',
            },
        ],
    },
];

const oldOrganizations = [
    {
        id: 1,
        name: 'Rixos Sport Earbuds Wireless Earphones in Ear...',
        logo: '/assets/images/belyi.png',
        price: '30 230 kzt',
        bgColor: 'bg-white',
        textColor: 'text-white',
    },
    {
        id: 2,
        name: 'Samsung Electronics Samsung Galaxy S21 5G',
        logo: '/assets/images/belyi.png',
        price: '30 230 kzt',
        bgColor: 'bg-yellow-400',
        textColor: 'text-black',
    },
    {
        id: 3,
        name: 'Portable Wshing Machine, 11lbs capacity Model 18NMF...',
        logo: '/assets/images/belyi.png',
        price: '30 230 kzt',
        bgColor: 'bg-white',
        textColor: 'text-black',
    },
    {
        id: 4,
        name: 'TOZO T6 True Wireless Earbuds Bluetooth Headphon...',
        logo: '/assets/images/belyi.png',
        price: '30 230 kzt',
        bgColor: 'bg-white',
        textColor: 'text-black',
    },
    {
        id: 5,
        name: 'Simple Mobile 4G LTE Prepaid Smartphone',
        logo: '/assets/images/belyi.png',
        price: '30 230 kzt',
        bgColor: 'bg-black',
        textColor: 'text-white',
    },
    {
        id: 6,
        name: 'Simple Mobile 5G LTE Galaxy 1P Mini KJDUB Gaming Phone',
        logo: '/assets/images/belyi.png',
        price: '30 230 kzt',
        bgColor: 'bg-white',
        textColor: 'text-black',
    },
    {
        id: 7,
        name: 'Sony DSCHX8 High Zoom Point & Shoot Camera',
        logo: '/assets/images/belyi.png',
        price: '30 230 kzt',
        bgColor: 'bg-white',
        textColor: 'text-black',
    },
    {
        id: 8,
        name: 'JBL FLIP 4 - Waterproof Portable Bluetooth Speaker...',
        logo: '/assets/images/belyi.png',
        price: '30 230 kzt',
        bgColor: 'bg-white',
        textColor: 'text-black',
    },
    {
        id: 9,
        name: '4K UHD LED Smart TV with Chromecast Built-in',
        logo: '/assets/images/belyi.png',
        price: '30 230 kzt',
        bgColor: 'bg-yellow-400',
        textColor: 'text-black',
    },
    {
        id: 10,
        name: 'Sony DSCHX8 High Zoom Point & Shoot Camera',
        logo: '/assets/images/belyi.png',
        price: '30 230 kzt',
        bgColor: 'bg-black',
        textColor: 'text-white',
    },
    {
        id: 11,
        name: 'Dell Optiplex 7000x7480 All-in-One Computer Monitor',
        logo: '/assets/images/belyi.png',
        price: '30 230 kzt',
        bgColor: 'bg-white',
        textColor: 'text-black',
    },
    {
        id: 12,
        name: 'Wyze Cam Pan v2 1080p Pan/Tilt/Zoom Wi-Fi Indoor Smart...',
        logo: '/assets/images/belyi.png',
        price: '30 230 kzt',
        bgColor: 'bg-yellow-400',
        textColor: 'text-black',
    },
];

export function OrganizationsSection({ listings = [], stats }: OrganizationsSectionProps) {

    const sections = useMemo(() => {
        // Divide listings into 4 groups for the columns
        // If we don't have listings, we could fallback to empty or show a placeholder message.
        // But for now, let's distribute what we have.

        const groups = [[], [], [], []] as ListingWithUser[][];

        listings.forEach((listing, index) => {
            const groupIndex = index % 4;
            groups[groupIndex].push(listing);
        });

        return [
            {
                title: 'Новые поступления',
                listings: groups[0] || []
            },
            {
                title: 'Топ ломбарды по ценам',
                listings: groups[1] || []
            },
            {
                title: 'Топ ломбарды по отзывам',
                listings: groups[2] || []
            },
            {
                title: 'Топ МФО по отзывам', // Just reusing headers as placeholders for columns
                listings: groups[3] || []
            }
        ];
    }, [listings]);

    return (
        <div className="w-full bg-white py-6 md:py-8">
            <div className="mx-auto max-w-7xl px-4">
                {/* Header */}
                <div className="mb-6 md:mb-8 flex flex-col items-start justify-between gap-3 md:gap-4 sm:flex-row sm:items-center">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 md:gap-4">
                        <h2 className="text-lg md:text-xl font-semibold text-gray-900">
                            Список ломбардов и других юр. организации
                        </h2>
                        {stats && (
                            <div className="rounded bg-yellow-400 px-2 md:px-3 py-1 text-[10px] md:text-sm font-semibold text-black self-start">
                                КОЛИЧЕСТВО: {stats.total} зарегистрированных, {stats.active} активна
                            </div>
                        )}
                    </div>
                    <button className="flex items-center gap-1 text-sm text-[#4A9FD8] hover:underline">
                        Весь список
                        <ArrowRight className="h-4 w-4" />
                    </button>
                </div>

                {/* Sections Grid - Horizontal scroll on mobile */}
                <div className="flex md:grid md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 overflow-x-auto md:overflow-visible pb-4 md:pb-0 -mx-4 px-4 md:mx-0 md:px-0 scrollbar-hide snap-x snap-mandatory">
                    {sections.map((section, sectionIndex) => (
                        <div key={sectionIndex} className="flex-shrink-0 w-[280px] md:w-auto snap-start">
                            {/* Section Title */}
                            <h3 className="mb-3 md:mb-4 text-sm md:text-base font-semibold text-gray-900">
                                {section.title}
                            </h3>

                            {/* Listings List */}
                            <div className="space-y-2 md:space-y-3">
                                {section.listings.length > 0 ? (
                                    section.listings.map((item) => (
                                        <div
                                            key={item.id}
                                            className="flex items-center gap-2 md:gap-3 rounded border border-gray-200 bg-white p-2 md:p-3 transition-all hover:border-gray-300 hover:shadow-md h-[80px]" // Fixed height for consistency
                                        >
                                            {/* Logo/Image */}
                                            <div
                                                className={`flex h-10 w-10 md:h-14 md:w-14 flex-shrink-0 items-center justify-center rounded bg-gray-100 overflow-hidden text-xs text-center p-1`}
                                            >
                                                {item.user?.profile_photo_url ? (
                                                    <img
                                                        src={item.user.profile_photo_url}
                                                        alt={item.user.name}
                                                        className="h-full w-full object-cover"
                                                    />
                                                ) : (
                                                    <span>{item.user?.name ? item.user.name.substring(0, 2).toUpperCase() : 'N/A'}</span>
                                                )}
                                            </div>

                                            {/* Info */}
                                            <div className="flex-1 overflow-hidden flex flex-col justify-center h-full">
                                                <h4 className="mb-1 line-clamp-2 text-xs md:text-sm text-gray-900 leading-tight">
                                                    {item.title}
                                                </h4>
                                                <p className="text-xs text-[#4A9FD8] font-semibold mt-auto">
                                                    {item.price.toLocaleString('ru-RU')} ₸
                                                </p>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-xs text-gray-500 italic p-4 border border-dashed rounded">
                                        Нет данных
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
