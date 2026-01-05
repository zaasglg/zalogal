import { ProfileSidebar } from '@/components/profile-sidebar';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import { Button } from '@/components/ui/button';
import { Toast } from '@/components/Toast';
import { Head, Link, usePage, router } from '@inertiajs/react';
import { Plus, Edit, Archive, Trash2, Package, Calendar, MapPin, Tag } from 'lucide-react';
import { useState } from 'react';
import { ListingModal } from '@/components/ListingModal';

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
}

interface Category {
    id: number;
    name: string;
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
    categories: Category[];
}

export default function Listings({ listings, categories }: Props) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingListing, setEditingListing] = useState<Listing | null>(null);

    const handleEdit = (listing: Listing) => {
        setEditingListing(listing);
        setIsModalOpen(true);
    };

    const handleCreate = () => {
        setEditingListing(null);
        setIsModalOpen(true);
    };

    const handleDelete = (id: number) => {
        if (confirm('Вы уверены, что хотите удалить это объявление?')) {
            router.delete(`/listings/${id}`);
        }
    };

    const handleArchive = (id: number) => {
        router.post(`/listings/${id}/archive`);
    };

    return (
        <>
            <Head title="Активные объявления - Zalogal" />
            <Header />

            <div className="bg-[#F2F4F5] py-4">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <Breadcrumbs
                        breadcrumbs={[
                            { title: 'Главная', href: '/' },
                            { title: 'Личный кабинет', href: '/profile' },
                            { title: 'Активные объявления', href: '' },
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
                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                                <div>
                                    <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                                        Активные объявления
                                    </h1>
                                    <p className="text-gray-500 text-sm">
                                        Управляйте своими объявлениями и отслеживайте их статус
                                    </p>
                                </div>
                                <Button
                                    onClick={handleCreate}
                                    className="bg-[#2DA5F3] hover:bg-[#2594DD] text-white rounded-lg h-11 px-6 shadow-sm hover:shadow-md transition-all"
                                >
                                    <Plus className="h-5 w-5 mr-2" />
                                    Создать объявление
                                </Button>
                            </div>

                            {listings.data.length === 0 ? (
                                <div className="text-center py-20 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border border-gray-200">
                                    <div className="inline-flex items-center justify-center w-20 h-20 bg-[#2DA5F3]/10 rounded-full mb-6">
                                        <Package className="h-10 w-10 text-[#2DA5F3]" />
                                    </div>
                                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                        У вас пока нет активных объявлений
                                    </h3>
                                    <p className="text-gray-600 max-w-md mx-auto">
                                        Создайте свое первое объявление и начните продавать на нашей платформе
                                    </p>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {listings.data.map((listing) => (
                                        <div
                                            key={listing.id}
                                            className="bg-white border border-gray-200 rounded-xl p-4 sm:p-6 hover:shadow-lg transition-all duration-200 group"
                                        >
                                            <div className="flex flex-col sm:flex-row gap-6">
                                                {listing.images && listing.images.length > 0 ? (
                                                    <div className="relative flex-shrink-0 w-full sm:w-40">
                                                        <div className="aspect-[4/3] sm:aspect-auto sm:h-40 w-full">
                                                            <img
                                                                src={listing.images[0]}
                                                                alt={listing.title}
                                                                className="w-full h-full object-cover rounded-lg shadow-sm group-hover:shadow-md transition-shadow"
                                                            />
                                                        </div>
                                                        {listing.images.length > 1 && (
                                                            <div className="absolute top-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded-md">
                                                                +{listing.images.length - 1}
                                                            </div>
                                                        )}
                                                    </div>
                                                ) : (
                                                    <div className="aspect-[4/3] sm:aspect-auto sm:w-40 sm:h-40 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center flex-shrink-0 w-full">
                                                        <Package className="h-12 w-12 text-gray-400" />
                                                    </div>
                                                )}
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                                                        <div className="flex-1 min-w-0 w-full">
                                                            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 group-hover:text-[#2DA5F3] transition-colors">
                                                                {listing.title}
                                                            </h3>
                                                            <div
                                                                className="text-gray-600 mb-4 line-clamp-2 leading-relaxed prose prose-sm max-w-none text-sm"
                                                                dangerouslySetInnerHTML={{ __html: listing.description }}
                                                            />
                                                            {listing.specifications && listing.specifications.length > 0 && (
                                                                <div className="mb-4 p-3 bg-gray-50 rounded-lg border border-gray-200">
                                                                    <h4 className="text-xs sm:text-sm font-semibold text-gray-700 mb-2">Характеристики:</h4>
                                                                    <div className="grid grid-cols-1 xs:grid-cols-2 gap-2">
                                                                        {listing.specifications.map((spec, idx) => (
                                                                            spec.key && spec.value && (
                                                                                <div key={idx} className="text-xs sm:text-sm">
                                                                                    <span className="font-medium text-gray-700">{spec.key}:</span>
                                                                                    <span className="text-gray-600 ml-1">{spec.value}</span>
                                                                                </div>
                                                                            )
                                                                        ))}
                                                                    </div>
                                                                </div>
                                                            )}
                                                            <div className="flex flex-wrap gap-3 sm:gap-4 mb-4">
                                                                <div className="flex items-center gap-2 text-sm w-full sm:w-auto mb-1 sm:mb-0">
                                                                    <span className="font-semibold text-[#2DA5F3] text-lg">
                                                                        {listing.price.toLocaleString('ru-RU')} ₸
                                                                    </span>
                                                                </div>
                                                                <div className="flex items-center gap-1.5 text-xs sm:text-sm text-gray-600 bg-gray-50 px-2 py-1 rounded-md border border-gray-100">
                                                                    <Tag className="h-3.5 w-3.5 text-gray-400" />
                                                                    <span>{listing.category}</span>
                                                                </div>
                                                                <div className="flex items-center gap-1.5 text-xs sm:text-sm text-gray-600 bg-gray-50 px-2 py-1 rounded-md border border-gray-100">
                                                                    <Package className="h-3.5 w-3.5 text-gray-400" />
                                                                    <span className="capitalize">
                                                                        {listing.condition === 'new' ? 'Новое' :
                                                                            listing.condition === 'excellent' ? 'Отличное' :
                                                                                listing.condition === 'good' ? 'Хорошее' : 'Б/У'}
                                                                    </span>
                                                                </div>
                                                                <div className="flex items-center gap-1.5 text-xs sm:text-sm text-gray-600 bg-gray-50 px-2 py-1 rounded-md border border-gray-100">
                                                                    <MapPin className="h-3.5 w-3.5 text-gray-400" />
                                                                    <span>{listing.location}</span>
                                                                </div>
                                                            </div>
                                                            <div className="flex items-center gap-2 text-xs text-gray-500">
                                                                <Calendar className="h-3.5 w-3.5" />
                                                                <span>
                                                                    Создано: {new Date(listing.created_at).toLocaleDateString('ru-RU', {
                                                                        day: 'numeric',
                                                                        month: 'long',
                                                                        year: 'numeric'
                                                                    })}
                                                                </span>
                                                            </div>
                                                        </div>
                                                        <div className="flex flex-row sm:flex-col gap-2 flex-shrink-0 w-full sm:w-auto mt-4 sm:mt-0 pt-4 sm:pt-0 border-t sm:border-0 border-gray-100 justify-end">
                                                            <Button
                                                                onClick={() => handleEdit(listing)}
                                                                variant="outline"
                                                                size="sm"
                                                                className="flex-1 sm:flex-none rounded-lg border-gray-300 hover:border-[#2DA5F3] hover:text-[#2DA5F3] hover:bg-[#2DA5F3]/5 transition-all"
                                                                title="Редактировать"
                                                            >
                                                                <Edit className="h-4 w-4 mr-2 sm:mr-0" />
                                                                <span className="sm:hidden">Редактировать</span>
                                                            </Button>
                                                            <Button
                                                                onClick={() => handleArchive(listing.id)}
                                                                variant="outline"
                                                                size="sm"
                                                                className="flex-1 sm:flex-none rounded-lg border-gray-300 hover:border-amber-500 hover:text-amber-600 hover:bg-amber-50 transition-all"
                                                                title="Архивировать"
                                                            >
                                                                <Archive className="h-4 w-4 mr-2 sm:mr-0" />
                                                                <span className="sm:hidden">Архив</span>
                                                            </Button>
                                                            <Button
                                                                onClick={() => handleDelete(listing.id)}
                                                                variant="outline"
                                                                size="sm"
                                                                className="flex-1 sm:flex-none rounded-lg border-gray-300 hover:border-red-500 hover:text-red-600 hover:bg-red-50 transition-all"
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
                                <div className="flex flex-wrap justify-center gap-2 mt-8">
                                    {listings.links.map((link, index) => (
                                        link.url ? (
                                            <Link
                                                key={index}
                                                href={link.url}
                                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${link.active
                                                        ? 'bg-[#2DA5F3] text-white shadow-md hover:shadow-lg'
                                                        : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400'
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

            <ListingModal
                isOpen={isModalOpen}
                onClose={() => {
                    setIsModalOpen(false);
                    setEditingListing(null);
                }}
                listing={editingListing}
                categories={categories}
            />

            <Toast />
        </>
    );
}