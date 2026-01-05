import SuperAdminLayout from '@/layouts/super-admin-layout';
import {
    Users,
    ShoppingBag,
    Package,
    TrendingUp,
    UserCheck,
    Store,
    FileText,
    ArrowUpRight,
    ArrowDownRight,
} from 'lucide-react';

interface StatCard {
    title: string;
    value: number;
    icon: React.ReactNode;
    color: string;
    bgColor: string;
    change?: string;
    changeType?: 'up' | 'down';
}

interface DashboardProps {
    stats: {
        total_users: number;
        buyers: number;
        sellers: number;
        total_listings: number;
        active_listings: number;
        total_orders: number;
        pending_orders: number;
    };
    recent_users: Array<{
        id: number;
        name: string;
        email: string;
        role: string;
        created_at: string;
    }>;
    recent_orders: Array<{
        id: number;
        status: string;
        total_price: number;
        created_at: string;
        buyer?: {
            name: string;
            email: string;
        };
        seller?: {
            name: string;
            email: string;
        };
    }>;
}

export default function SuperAdminDashboard({
    stats,
    recent_users,
    recent_orders,
}: DashboardProps) {
    const statCards: StatCard[] = [
        {
            title: 'Всего пользователей',
            value: stats.total_users,
            icon: <Users className="w-6 h-6" />,
            color: 'text-blue-600',
            bgColor: 'bg-blue-100',
        },
        {
            title: 'Покупатели',
            value: stats.buyers,
            icon: <UserCheck className="w-6 h-6" />,
            color: 'text-green-600',
            bgColor: 'bg-green-100',
        },
        {
            title: 'Продавцы',
            value: stats.sellers,
            icon: <Store className="w-6 h-6" />,
            color: 'text-orange-600',
            bgColor: 'bg-orange-100',
        },
        {
            title: 'Всего товаров',
            value: stats.total_listings,
            icon: <ShoppingBag className="w-6 h-6" />,
            color: 'text-purple-600',
            bgColor: 'bg-purple-100',
        },
        {
            title: 'Активные товары',
            value: stats.active_listings,
            icon: <TrendingUp className="w-6 h-6" />,
            color: 'text-teal-600',
            bgColor: 'bg-teal-100',
        },
        {
            title: 'Всего заказов',
            value: stats.total_orders,
            icon: <Package className="w-6 h-6" />,
            color: 'text-pink-600',
            bgColor: 'bg-pink-100',
        },
        {
            title: 'Ожидающие заказы',
            value: stats.pending_orders,
            icon: <FileText className="w-6 h-6" />,
            color: 'text-yellow-600',
            bgColor: 'bg-yellow-100',
        },
    ];

    const getStatusBadge = (status: string) => {
        const statusColors: Record<string, string> = {
            pending: 'bg-yellow-100 text-yellow-800',
            completed: 'bg-green-100 text-green-800',
            cancelled: 'bg-red-100 text-red-800',
            processing: 'bg-blue-100 text-blue-800',
        };

        return (
            <span
                className={`px-2 py-1 text-xs font-semibold rounded-full ${
                    statusColors[status] || 'bg-gray-100 text-gray-800'
                }`}
            >
                {status}
            </span>
        );
    };

    const getRoleBadge = (role: string) => {
        const roleColors: Record<string, string> = {
            buyer: 'bg-green-100 text-green-800',
            seller: 'bg-orange-100 text-orange-800',
            super_admin: 'bg-red-100 text-red-800',
        };

        const roleLabels: Record<string, string> = {
            buyer: 'Покупатель',
            seller: 'Продавец',
            super_admin: 'Супер-Админ',
        };

        return (
            <span
                className={`px-2 py-1 text-xs font-semibold rounded-full ${
                    roleColors[role] || 'bg-gray-100 text-gray-800'
                }`}
            >
                {roleLabels[role] || role}
            </span>
        );
    };

    return (
        <SuperAdminLayout title="Панель управления">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                {statCards.map((stat, index) => (
                    <div
                        key={index}
                        className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
                    >
                        <div className="flex items-center justify-between">
                            <div className="flex-1">
                                <p className="text-sm font-medium text-gray-600 mb-1">
                                    {stat.title}
                                </p>
                                <p className="text-3xl font-bold text-gray-900">
                                    {stat.value}
                                </p>
                            </div>
                            <div
                                className={`${stat.bgColor} ${stat.color} p-3 rounded-lg`}
                            >
                                {stat.icon}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Users */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                    <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
                        <h2 className="text-lg font-semibold text-gray-900">
                            Недавние пользователи
                        </h2>
                        <a
                            href="/super-admin/users"
                            className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                        >
                            Посмотреть все →
                        </a>
                    </div>
                    <div className="p-6">
                        <div className="space-y-4">
                            {recent_users.length > 0 ? (
                                recent_users.map((user) => (
                                    <div
                                        key={user.id}
                                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                                                <span className="text-white text-sm font-semibold">
                                                    {user.name
                                                        .charAt(0)
                                                        .toUpperCase()}
                                                </span>
                                            </div>
                                            <div>
                                                <p className="font-medium text-gray-900">
                                                    {user.name}
                                                </p>
                                                <p className="text-sm text-gray-500">
                                                    {user.email}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            {getRoleBadge(user.role)}
                                            <span className="text-xs text-gray-400">
                                                {new Date(
                                                    user.created_at,
                                                ).toLocaleDateString('ru-RU')}
                                            </span>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="text-gray-500 text-center py-8">
                                    Нет пользователей
                                </p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Recent Orders */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                    <div className="px-6 py-4 border-b border-gray-200">
                        <h2 className="text-lg font-semibold text-gray-900">
                            Недавние заказы
                        </h2>
                    </div>
                    <div className="p-6">
                        <div className="space-y-4">
                            {recent_orders.length > 0 ? (
                                recent_orders.map((order) => (
                                    <div
                                        key={order.id}
                                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                                    >
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-1">
                                                <p className="font-semibold text-gray-900">
                                                    Заказ #{order.id}
                                                </p>
                                                {getStatusBadge(order.status)}
                                            </div>
                                            {order.buyer && (
                                                <p className="text-sm text-gray-600">
                                                    Покупатель: {order.buyer.name}
                                                </p>
                                            )}
                                            {order.seller && (
                                                <p className="text-sm text-gray-600">
                                                    Продавец: {order.seller.name}
                                                </p>
                                            )}
                                            <p className="text-xs text-gray-400 mt-1">
                                                {new Date(
                                                    order.created_at,
                                                ).toLocaleDateString('ru-RU')}
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-lg font-bold text-gray-900">
                                                {order.total_price} ₸
                                            </p>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="text-gray-500 text-center py-8">
                                    Нет заказов
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </SuperAdminLayout>
    );
}
