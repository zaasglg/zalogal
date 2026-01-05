import { ProfileSidebar } from '@/components/profile-sidebar';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import { Button } from '@/components/ui/button';
import { Head, Link } from '@inertiajs/react';
import { ArrowRight } from 'lucide-react';

interface Order {
    id: number;
    total_price: number;
    quantity: number;
    status: string;
    created_at: string;
    listing: {
        id: number;
        title: string;
        images: string[] | null;
    };
    seller: {
        id: number;
        name: string;
    };
}

interface Props {
    orders?: {
        data: Order[];
        links: Array<{
            url: string | null;
            label: string;
            active: boolean;
        }>;
    };
}

const getStatusText = (status: string): { text: string; color: string } => {
    const statusMap: Record<string, { text: string; color: string }> = {
        'pending': { text: 'В ОБРАБОТКЕ', color: 'text-[#FA8232]' },
        'accepted': { text: 'ПРИНЯТ', color: 'text-[#2DA5F3]' },
        'rejected': { text: 'ОТМЕНЕН', color: 'text-[#EE5858]' },
        'packed': { text: 'УПАКОВАН', color: 'text-[#2DA5F3]' },
        'shipped': { text: 'ОТПРАВЛЕН', color: 'text-[#2DA5F3]' },
        'delivered': { text: 'ДОСТАВЛЕН', color: 'text-[#2DB224]' },
        'completed': { text: 'ЗАВЕРШЕН', color: 'text-[#2DB224]' },
    };

    return statusMap[status] || { text: status.toUpperCase(), color: 'text-gray-600' };
};

const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const months = ['янв', 'фев', 'мар', 'апр', 'май', 'июн', 'июл', 'авг', 'сен', 'окт', 'ноя', 'дек'];
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');

    return `${day} ${month}, ${year} ${hours}:${minutes}`;
};

export default function ProfileOrders({ orders }: Props) {
    const safeOrders = orders ?? { data: [], links: [] };
    return (
        <>
            <Head title="История заказов - Zalogal" />
            <Header />

            <div className="bg-[#F2F4F5] py-4">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <Breadcrumbs
                        breadcrumbs={[
                            { title: 'Главная', href: '/' },
                            { title: 'Личный кабинет', href: '/profile' },
                            { title: 'История заказов', href: '' },
                        ]}
                    />
                </div>
            </div>

            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 md:py-12">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Sidebar */}
                    <div className="lg:col-span-3 order-1 lg:order-1">
                        <ProfileSidebar />
                    </div>

                    {/* Main Content */}
                    <div className="lg:col-span-9 order-2 lg:order-2">
                        <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
                            <div className="p-6 border-b border-gray-200 bg-gray-50 flex items-center justify-between">
                                <h1 className="text-lg font-bold text-gray-900 uppercase tracking-wide">
                                    История заказов
                                </h1>
                                <span className="text-sm text-gray-500 font-medium">
                                    Всего: {safeOrders.data.length}
                                </span>
                            </div>

                            {safeOrders.data.length === 0 ? (
                                <div className="p-12 text-center">
                                    <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                                        <ArrowRight className="h-8 w-8 text-gray-400 rotate-180" />
                                    </div>
                                    <h3 className="text-lg font-semibold text-gray-900 mb-2">У вас пока нет заказов</h3>
                                    <p className="text-gray-500 mb-6">Начните делать покупки, чтобы увидеть историю заказов здесь.</p>
                                    <Link href="/products">
                                        <Button className="bg-[#FA8232] hover:bg-[#E97527] text-white">
                                            Перейти к покупкам
                                        </Button>
                                    </Link>
                                </div>
                            ) : (
                                <>
                                    {/* Desktop Table Header */}
                                    <div className="hidden md:grid grid-cols-12 gap-4 bg-gray-50 px-6 py-3 border-b text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                        <div className="col-span-2">ID Заказа</div>
                                        <div className="col-span-4">Товар</div>
                                        <div className="col-span-2">Статус</div>
                                        <div className="col-span-2">Сумма</div>
                                        <div className="col-span-2 text-right">Действие</div>
                                    </div>

                                    <div className="divide-y divide-gray-100">
                                        {safeOrders.data.map((order) => {
                                            const statusInfo = getStatusText(order.status);
                                            return (
                                                <div
                                                    key={order.id}
                                                    className="p-4 md:px-6 md:py-4 flex flex-col md:grid md:grid-cols-12 gap-4 hover:bg-gray-50 transition-colors"
                                                >
                                                    {/* Mobile Header: ID & Date */}
                                                    <div className="md:hidden flex justify-between items-center text-sm text-gray-500 mb-2 border-b border-gray-100 pb-2">
                                                        <span className="font-medium text-gray-900">Заказ #{order.id}</span>
                                                        <span>{formatDate(order.created_at)}</span>
                                                    </div>

                                                    {/* ID & Date (Desktop) */}
                                                    <div className="hidden md:col-span-2 md:flex flex-col justify-center">
                                                        <span className="font-bold text-gray-900">#{order.id}</span>
                                                        <span className="text-xs text-gray-500 mt-1">{formatDate(order.created_at)}</span>
                                                    </div>

                                                    {/* Product Info */}
                                                    <div className="md:col-span-4 flex items-center gap-3">
                                                        {order.listing.images && order.listing.images.length > 0 ? (
                                                            <div className="h-16 w-16 flex-shrink-0 rounded border border-gray-200 overflow-hidden">
                                                                <img
                                                                    src={order.listing.images[0]}
                                                                    alt={order.listing.title}
                                                                    className="h-full w-full object-cover"
                                                                />
                                                            </div>
                                                        ) : (
                                                            <div className="h-16 w-16 flex-shrink-0 rounded border border-gray-200 bg-gray-100 flex items-center justify-center">
                                                                <span className="text-[10px] text-gray-400">Нет фото</span>
                                                            </div>
                                                        )}
                                                        <div className="flex-1 min-w-0">
                                                            <Link href={`/products/${order.listing.id}`} className="font-medium text-gray-900 line-clamp-2 hover:text-[#FA8232] transition-colors">
                                                                {order.listing.title}
                                                            </Link>
                                                            <p className="text-xs text-gray-500 mt-1">Количество: <span className="font-medium">{order.quantity}</span></p>
                                                        </div>
                                                    </div>

                                                    {/* Status */}
                                                    <div className="md:col-span-2 flex items-center justify-between md:justify-start">
                                                        <span className="md:hidden text-sm text-gray-500">Статус:</span>
                                                        <span className={`text-xs font-bold uppercase px-2 py-1 rounded bg-opacity-10 ${statusInfo.color.replace('text-', 'bg-')} ${statusInfo.color}`}>
                                                            {statusInfo.text}
                                                        </span>
                                                    </div>

                                                    {/* Total Price */}
                                                    <div className="md:col-span-2 flex items-center justify-between md:justify-start">
                                                        <span className="md:hidden text-sm text-gray-500">Сумма:</span>
                                                        <span className="font-bold text-gray-900">
                                                            {Number(order.total_price).toLocaleString('ru-RU')} ₸
                                                        </span>
                                                    </div>

                                                    {/* Actions */}
                                                    <div className="md:col-span-2 flex items-center justify-end gap-3 mt-2 md:mt-0 pt-2 md:pt-0 border-t md:border-t-0 border-gray-100">
                                                        {['completed', 'delivered'].includes(order.status) && (
                                                            <Link
                                                                href={`/products/${order.listing.id}?tab=reviews`}
                                                                className="text-xs font-medium text-gray-500 hover:text-[#FA8232] transition-colors"
                                                            >
                                                                Отзыв
                                                            </Link>
                                                        )}
                                                        <Link
                                                            href={`/track-order/details/${order.id}`}
                                                            className="flex items-center gap-1 text-sm font-medium text-[#2DA5F3] hover:text-[#238acb] transition-colors"
                                                        >
                                                            Детали
                                                            <ArrowRight className="h-4 w-4" />
                                                        </Link>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </>
                            )}

                            {/* Pagination */}
                            {safeOrders.links && safeOrders.links.length > 3 && (
                                <div className="p-4 md:p-6 border-t border-gray-200 bg-gray-50 flex flex-wrap items-center justify-center gap-2">
                                    {safeOrders.links.map((link, index) => {
                                        // Simple clean up for HTML entities if needed or just render safe HTML
                                        return link.url ? (
                                            <Link
                                                key={index}
                                                href={link.url}
                                                className={`h-8 w-8 md:h-10 md:w-10 rounded-full flex items-center justify-center text-xs md:text-sm font-medium transition-all ${link.active
                                                    ? 'bg-[#FA8232] text-white shadow-md'
                                                    : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-[#FA8232] hover:text-[#FA8232]'
                                                    }`}
                                                dangerouslySetInnerHTML={{ __html: link.label }}
                                            />
                                        ) : (
                                            <span
                                                key={index}
                                                className="h-8 w-8 md:h-10 md:w-10 rounded-full flex items-center justify-center text-xs md:text-sm font-medium bg-gray-100 text-gray-400 cursor-not-allowed"
                                                dangerouslySetInnerHTML={{ __html: link.label }}
                                            />
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </>
    );
}
