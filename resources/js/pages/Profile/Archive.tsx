import { ProfileSidebar } from '@/components/profile-sidebar';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import { Button } from '@/components/ui/button';
import { Toast } from '@/components/Toast';
import { Head, Link, usePage, router } from '@inertiajs/react';
import { RotateCcw, Trash2 } from 'lucide-react';

interface Listing {
    id: number;
    title: string;
    description: string;
    price: number;
    category: string;
    condition: string;
    location: string;
    images: string[] | null;
    status: string;
    created_at: string;
}

interface Props {
    listings: {
        data: Listing[];
        links: Array<{
            url: string | null;
            label: string;
            active: boolean;
        }>;
    };
}

export default function Archive({ listings }: Props) {
    const handleDelete = (id: number) => {
        if (confirm('Вы уверены, что хотите удалить это объявление?')) {
            router.delete(`/listings/${id}`);
        }
    };

    const handleRestore = (id: number) => {
        router.post(`/listings/${id}/restore`);
    };

    return (
        <>
            <Head title="Архив - Zalogal" />
            <Header />

            <div className="bg-[#F2F4F5] py-4">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <Breadcrumbs
                        breadcrumbs={[
                            { title: 'Главная', href: '/' },
                            { title: 'Личный кабинет', href: '/profile' },
                            { title: 'Архив', href: '' },
                        ]}
                    />
                </div>
            </div>

            <div className="bg-white py-8 md:py-12">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                        <div className="lg:col-span-3 order-1 lg:order-1">
                            <ProfileSidebar />
                        </div>

                        <div className="lg:col-span-9 order-2 lg:order-2">
                            <div className="mb-6">
                                <h1 className="text-2xl font-bold text-gray-900">
                                    Архив объявлений
                                </h1>
                            </div>

                            {listings.data.length === 0 ? (
                                <div className="text-center py-12 bg-gray-50 rounded-sm">
                                    <p className="text-gray-600">Архив пуст</p>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {listings.data.map((listing) => (
                                        <div
                                            key={listing.id}
                                            className="bg-white border border-gray-200 rounded-lg p-4 sm:p-6 hover:shadow-md transition-shadow opacity-75"
                                        >
                                            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                                                {listing.images && listing.images.length > 0 ? (
                                                    <img
                                                        src={listing.images[0]}
                                                        alt={listing.title}
                                                        className="w-full h-auto sm:w-32 sm:h-32 object-cover rounded-md grayscale flex-shrink-0"
                                                    />
                                                ) : (
                                                    <div className="w-full h-40 sm:w-32 sm:h-32 bg-gray-100 rounded-md flex-shrink-0" />
                                                )}
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                                                        <div className="flex-1 w-full">
                                                            <h3 className="text-lg font-bold text-gray-900 mb-2 truncate">
                                                                {listing.title}
                                                            </h3>
                                                            <div
                                                                className="text-gray-600 mb-3 line-clamp-2 text-sm"
                                                                dangerouslySetInnerHTML={{ __html: listing.description }}
                                                            />
                                                            <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-gray-500">
                                                                <span className="whitespace-nowrap">Цена: <span className="font-semibold text-[#2DA5F3]">{listing.price.toLocaleString('ru-RU')} ₸</span></span>
                                                                <span className="whitespace-nowrap">Кат.: {listing.category}</span>
                                                                <span className="whitespace-nowrap">Сост.: {listing.condition}</span>
                                                                <span className="whitespace-nowrap">Локация: {listing.location}</span>
                                                            </div>
                                                        </div>
                                                        <div className="flex flex-row sm:flex-col gap-2 w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-0 border-gray-100 justify-end">
                                                            <Button
                                                                onClick={() => handleRestore(listing.id)}
                                                                variant="outline"
                                                                size="sm"
                                                                className="flex-1 sm:flex-none rounded-md text-green-600 hover:text-green-700 bg-white border-gray-200"
                                                                title="Восстановить"
                                                            >
                                                                <RotateCcw className="h-4 w-4 mr-2 sm:mr-0" />
                                                                <span className="sm:hidden">Восстановить</span>
                                                            </Button>
                                                            <Button
                                                                onClick={() => handleDelete(listing.id)}
                                                                variant="outline"
                                                                size="sm"
                                                                className="flex-1 sm:flex-none rounded-md text-red-600 hover:text-red-700 bg-white border-gray-200"
                                                                title="Удалить"
                                                            >
                                                                <Trash2 className="h-4 w-4 mr-2 sm:mr-0" />
                                                                <span className="sm:hidden">Удалить</span>
                                                            </Button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {listings.data.length > 0 && (
                                <div className="flex flex-wrap justify-center gap-2 mt-6">
                                    {listings.links.map((link, index) => (
                                        link.url ? (
                                            <Link
                                                key={index}
                                                href={link.url}
                                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${link.active
                                                        ? 'bg-[#2DA5F3] text-white shadow-md'
                                                        : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                                                    }`}
                                                dangerouslySetInnerHTML={{ __html: link.label }}
                                            />
                                        ) : (
                                            <span
                                                key={index}
                                                className="px-4 py-2 rounded-lg text-sm font-medium bg-gray-100 text-gray-400 cursor-not-allowed"
                                                dangerouslySetInnerHTML={{ __html: link.label }}
                                            />
                                        )
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
            <Toast />
        </>
    );
}