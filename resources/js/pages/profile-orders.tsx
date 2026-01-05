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
                <div className="mx-auto max-w-7xl">
                    <Breadcrumbs
                        breadcrumbs={[
                            { title: 'Главная', href: '/' },
                            { title: 'Личный кабинет', href: '/profile' },
                            { title: 'История заказов', href: '' },
                        ]}
                    />
                </div>
            </div>

            <div className="mx-auto max-w-7xl py-12">
                <div className="grid grid-cols-12 gap-6">
                    {/* Sidebar */}
                    <div className="col-span-3">
                        <ProfileSidebar />
                    </div>

                    {/* Main Content */}
                    <div className="col-span-9">
                        <div className="bg-white rounded-sm border border-gray-200">
                            <div className="p-6 border-b border-gray-200">
                                <h1 className="text-lg font-bold text-gray-900 uppercase">
                                    История заказов
                                </h1>
                            </div>

                            {safeOrders.data.length === 0 ? (
                                <div className="p-12 text-center">
                                    <p className="text-gray-500 text-lg">У вас пока нет заказов</p>
                                    <Link href="/products" className="mt-4 inline-block text-[#2DA5F3] hover:underline">
                                        Перейти к покупкам
                                    </Link>
                                </div>
                            ) : (
                                <>
                                    <div className="overflow-x-auto">
                                        <table className="w-full text-left text-sm">
                                            <thead className="bg-gray-50 text-gray-500 uppercase">
                                                <tr>
                                                    <th className="px-6 py-3 font-medium">ID Заказа</th>
                                                    <th className="px-6 py-3 font-medium">Товар</th>
                                                    <th className="px-6 py-3 font-medium">Статус</th>
                                                    <th className="px-6 py-3 font-medium">Дата</th>
                                                    <th className="px-6 py-3 font-medium">Сумма</th>
                                                    <th className="px-6 py-3 font-medium">Действие</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-100">
                                                {safeOrders.data.map((order) => {
                                                    const statusInfo = getStatusText(order.status);
                                                    return (
                                                        <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                                                            <td className="px-6 py-4 font-medium text-gray-900">
                                                                #{order.id}
                                                            </td>
                                                            <td className="px-6 py-4">
                                                                <div className="flex items-center gap-3">
                                                                    {order.listing.images && order.listing.images.length > 0 ? (
                                                                        <img
                                                                            src={order.listing.images[0]}
                                                                            alt={order.listing.title}
                                                                            className="h-12 w-12 rounded object-cover"
                                                                        />
                                                                    ) : (
                                                                        <div className="h-12 w-12 rounded bg-gray-100 flex items-center justify-center">
                                                                            <span className="text-xs text-gray-400">Нет фото</span>
                                                                        </div>
                                                                    )}
                                                                    <div>
                                                                        <p className="font-medium text-gray-900 line-clamp-1">{order.listing.title}</p>
                                                                        <p className="text-xs text-gray-500">Количество: {order.quantity}</p>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td className="px-6 py-4 font-bold uppercase">
                                                                <span className={statusInfo.color}>
                                                                    {statusInfo.text}
                                                                </span>
                                                            </td>
                                                            <td className="px-6 py-4 text-gray-600">
                                                                {formatDate(order.created_at)}
                                                            </td>
                                                            <td className="px-6 py-4 text-gray-600 font-medium">
                                                                {Number(order.total_price).toLocaleString('ru-RU')} ₸
                                                            </td>
                                                            <td className="px-6 py-4">
                                                                <div className="flex flex-col gap-2">
                                                                    <Link
                                                                        href={`/track-order/details/${order.id}`}
                                                                        className="flex items-center gap-1 text-[#2DA5F3] font-medium hover:underline"
                                                                    >
                                                                        Посмотреть
                                                                        <ArrowRight className="h-4 w-4" />
                                                                    </Link>
                                                                    {['completed', 'delivered'].includes(order.status) && (
                                                                        <Link
                                                                            href={`/products/${order.listing.id}?tab=reviews`}
                                                                            className="text-[#FA8232] text-sm font-medium hover:underline whitespace-nowrap"
                                                                        >
                                                                            Оставить отзыв
                                                                        </Link>
                                                                    )}
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    );
                                                })}
                                            </tbody>
                                        </table>
                                    </div>
                                </>
                            )}

                            {/* Pagination */}
                            {safeOrders.links && safeOrders.links.length > 3 && (
                                <div className="p-6 border-t border-gray-200 flex items-center justify-center gap-2">
                                    {safeOrders.links.map((link, index) => (
                                        link.url ? (
                                            <Link
                                                key={index}
                                                href={link.url}
                                                className={`h-10 w-10 rounded-full flex items-center justify-center text-sm font-medium transition-all ${link.active
                                                        ? 'bg-[#FA8232] text-white shadow-md'
                                                        : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-[#FA8232] hover:text-[#FA8232]'
                                                    }`}
                                                dangerouslySetInnerHTML={{ __html: link.label }}
                                            />
                                        ) : (
                                            <span
                                                key={index}
                                                className="h-10 w-10 rounded-full flex items-center justify-center text-sm font-medium bg-gray-100 text-gray-400 cursor-not-allowed"
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
        </>
    );
}
