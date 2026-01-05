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
                <div className="mx-auto max-w-7xl">
                    <Breadcrumbs
                        breadcrumbs={[
                            { title: 'Главная', href: '/' },
                            { title: 'Личный кабинет', href: '/profile' },
                            { title: 'Архив', href: '' },
                        ]}
                    />
                </div>
            </div>

            <div className="bg-white py-12">
                <div className="mx-auto max-w-7xl">
                    <div className="grid grid-cols-12 gap-6">
                        <div className="col-span-3">
                            <ProfileSidebar />
                        </div>

                        <div className="col-span-9">
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
                                            className="bg-white border border-gray-200 rounded-sm p-6 hover:shadow-md transition-shadow opacity-75"
                                        >
                                            <div className="flex gap-4">
                                                {listing.images && listing.images.length > 0 && (
                                                    <img
                                                        src={listing.images[0]}
                                                        alt={listing.title}
                                                        className="w-32 h-32 object-cover rounded-sm grayscale"
                                                    />
                                                )}
                                                <div className="flex-1">
                                                    <div className="flex justify-between items-start">
                                                        <div className="flex-1">
                                                            <h3 className="text-lg font-bold text-gray-900 mb-2">
                                                                {listing.title}
                                                            </h3>
                                                            <p className="text-gray-600 mb-3 line-clamp-2">
                                                                {listing.description}
                                                            </p>
                                                            <div className="flex gap-4 text-sm text-gray-500">
                                                                <span>Цена: <span className="font-semibold text-[#2DA5F3]">{listing.price} ₸</span></span>
                                                                <span>Категория: {listing.category}</span>
                                                                <span>Состояние: {listing.condition}</span>
                                                                <span>Локация: {listing.location}</span>
                                                            </div>
                                                        </div>
                                                        <div className="flex gap-2 ml-4">
                                                            <Button
                                                                onClick={() => handleRestore(listing.id)}
                                                                variant="outline"
                                                                size="sm"
                                                                className="rounded-sm text-green-600 hover:text-green-700"
                                                            >
                                                                <RotateCcw className="h-4 w-4" />
                                                            </Button>
                                                            <Button
                                                                onClick={() => handleDelete(listing.id)}
                                                                variant="outline"
                                                                size="sm"
                                                                className="rounded-sm text-red-600 hover:text-red-700"
                                                            >
                                                                <Trash2 className="h-4 w-4" />
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
                                <div className="flex justify-center gap-2 mt-6">
                                    {listings.links.map((link, index) => (
                                        link.url ? (
                                            <Link
                                                key={index}
                                                href={link.url}
                                                className={`px-4 py-2 rounded-sm text-sm font-medium ${
                                                    link.active
                                                        ? 'bg-[#2DA5F3] text-white'
                                                        : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                                                }`}
                                                dangerouslySetInnerHTML={{ __html: link.label }}
                                            />
                                        ) : (
                                            <span
                                                key={index}
                                                className="px-4 py-2 rounded-sm text-sm font-medium bg-gray-100 text-gray-400 cursor-not-allowed"
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