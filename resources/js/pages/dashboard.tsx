import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import { Head, usePage, Link } from '@inertiajs/react';
import SuperAdminLayout from '@/layouts/super-admin-layout';
import {
    LayoutDashboard,
    Package,
    ShoppingBag,
    Settings,
    LogOut,
    Users,
    TrendingUp,
    DollarSign,
    CreditCard,
    FileText
} from 'lucide-react';

interface DashboardProps {
    auth: {
        user: {
            id: number;
            name: string;
            email: string;
            role: 'buyer' | 'seller' | 'super_admin';
            profile_photo_url?: string;
        };
    };
    stats: {
        total_listings: number;
        active_listings: number;
        total_orders: number;
        pending_orders: number;
        completed_orders: number;
        revenue: number;
        total_users?: number;
    };
    [key: string]: any;
}



export default function Dashboard() {
    const { auth, stats } = usePage<DashboardProps>().props;
    const isSeller = auth.user.role === 'seller';
    const isSuperAdmin = auth.user.role === 'super_admin';

    const menuItems = [
        { name: 'Дашборд', icon: LayoutDashboard, href: '/dashboard', active: true },
        ...(isSeller ? [
            { name: 'Мои товары', icon: Package, href: '/profile/listings', active: false },
            { name: 'Заказы', icon: ShoppingBag, href: '/profile/seller-orders', active: false },
            { name: 'Финансы', icon: DollarSign, href: '#', active: false },
        ] : []),
        ...(!isSeller && !isSuperAdmin ? [
            { name: 'Мои заказы', icon: ShoppingBag, href: '/profile/orders', active: false },
            { name: 'Избранное', icon: Package, href: '/wishlist', active: false },
        ] : []),
        ...(isSuperAdmin ? [
            { name: 'Категории', icon: Package, href: '/super-admin/categories', active: false },
            { name: 'Новости', icon: FileText, href: '/super-admin/posts', active: false },
            { name: 'Пользователи', icon: Users, href: '/super-admin/users', active: false },
        ] : []),
        { name: 'Настройки', icon: Settings, href: '/profile', active: false },
    ];

    const statsCards = isSeller ? [
        { title: 'Общий доход', value: `${stats.revenue?.toLocaleString() ?? 0} ₸`, icon: TrendingUp, color: 'bg-green-500' },
        { title: 'Всего заказов', value: stats.total_orders, icon: ShoppingBag, color: 'bg-blue-500' },
        { title: 'Активные товары', value: stats.active_listings, icon: Package, color: 'bg-orange-500' },
        { title: 'В ожидании', value: stats.pending_orders, icon: Users, color: 'bg-purple-500' },
    ] : isSuperAdmin ? [
        { title: 'Пользователи', value: stats.total_users ?? 0, icon: Users, color: 'bg-blue-500' },
        { title: 'Всего товаров', value: stats.total_listings, icon: Package, color: 'bg-orange-500' },
        { title: 'Всего заказов', value: stats.total_orders, icon: ShoppingBag, color: 'bg-purple-500' },
        { title: 'Доход системы', value: `${stats.revenue?.toLocaleString() ?? 0} ₸`, icon: TrendingUp, color: 'bg-green-500' },
    ] : [
        { title: 'Мои заказы', value: stats.total_orders, icon: ShoppingBag, color: 'bg-blue-500' },
        { title: 'Избранное', value: 0, icon: Package, color: 'bg-red-500' }, // Placeholder
        { title: 'Потрачено', value: '0 ₸', icon: CreditCard, color: 'bg-green-500' },
    ];

    if (isSuperAdmin) {
        return (
            <SuperAdminLayout title="Дашборд">
                {/* Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {statsCards.map((card, index) => (
                        <div key={index} className="bg-white rounded-lg shadow-sm p-6 flex items-center">
                            <div className={`h-12 w-12 rounded-lg ${card.color} flex items-center justify-center text-white shadow-md`}>
                                <card.icon className="h-6 w-6" />
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-500">{card.title}</p>
                                <p className="text-xl font-bold text-gray-900">{card.value}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Recent Content Area */}
                <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                        <h2 className="text-lg font-semibold text-gray-900">
                            История активности
                        </h2>
                    </div>
                    <div className="p-6">
                        <div className="text-center py-12">
                            <div className="bg-gray-50 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Package className="h-8 w-8 text-gray-400" />
                            </div>
                            <h3 className="text-gray-900 font-medium mb-1">Нет недавней активности</h3>
                            <p className="text-gray-500 text-sm max-w-sm mx-auto">
                                Здесь будет отображаться список ваших последних действий.
                            </p>
                        </div>
                    </div>
                </div>
            </SuperAdminLayout>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 font-sans">
            <Head title="Панель управления" />

            {/* Top Navigation - simplified as we have sidebar */}
            <Header />

            <div className="flex pt-4 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Sidebar */}
                <aside className="w-64 hidden md:block shrink-0 pr-8">
                    <div className="bg-white rounded-lg shadow-sm overflow-hidden sticky top-8">
                        <div className="p-6 border-b border-gray-100 flex items-center gap-3">
                            <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 font-bold overflow-hidden">
                                {auth.user.profile_photo_url ? (
                                    <img src={auth.user.profile_photo_url} alt={auth.user.name} className="h-full w-full object-cover" />
                                ) : (
                                    auth.user.name.charAt(0).toUpperCase()
                                )}
                            </div>
                            <div className="overflow-hidden">
                                <p className="font-semibold text-gray-900 truncate">{auth.user.name}</p>
                                <p className="text-xs text-gray-500 capitalize truncate">
                                    {auth.user.role === 'seller' ? 'Продавец' : (auth.user.role === 'buyer' ? 'Покупатель' : 'Администратор')}
                                </p>
                            </div>
                        </div>
                        <nav className="p-4 space-y-1">
                            {menuItems.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className={`flex items-center gap-3 px-4 py-3 rounded-md text-sm font-medium transition-colors ${item.active
                                        ? 'bg-blue-50 text-blue-700'
                                        : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                                        }`}
                                >
                                    <item.icon className={`h-5 w-5 ${item.active ? 'text-blue-600' : 'text-gray-400'}`} />
                                    {item.name}
                                </Link>
                            ))}
                            <Link
                                method="post"
                                href="/logout"
                                as="button"
                                className="w-full flex items-center gap-3 px-4 py-3 rounded-md text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
                            >
                                <LogOut className="h-5 w-5" />
                                Выйти
                            </Link>
                        </nav>
                    </div>
                </aside>

                {/* Main Content */}
                <main className="flex-1 pb-12">
                    <div className="mb-8">
                        <h1 className="text-2xl font-bold text-gray-900">Дашборд</h1>
                        <p className="text-gray-500 text-sm mt-1">Огляд вашей активности и показателей</p>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        {statsCards.map((card, index) => (
                            <div key={index} className="bg-white rounded-lg shadow-sm p-6 flex items-center">
                                <div className={`h-12 w-12 rounded-lg ${card.color} flex items-center justify-center text-white shadow-md`}>
                                    <card.icon className="h-6 w-6" />
                                </div>
                                <div className="ml-4">
                                    <p className="text-sm font-medium text-gray-500">{card.title}</p>
                                    <p className="text-xl font-bold text-gray-900">{card.value}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Recent Content Area */}
                    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                            <h2 className="text-lg font-semibold text-gray-900">
                                {isSeller ? 'Последние заказы' : 'История активности'}
                            </h2>
                            <Link href={isSeller ? '/profile/seller-orders' : '/profile/orders'} className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                                Посмотреть все
                            </Link>
                        </div>
                        <div className="p-6">
                            {/* Placeholder for list/table */}
                            <div className="text-center py-12">
                                <div className="bg-gray-50 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Package className="h-8 w-8 text-gray-400" />
                                </div>
                                <h3 className="text-gray-900 font-medium mb-1">Нет недавней активности</h3>
                                <p className="text-gray-500 text-sm max-w-sm mx-auto">
                                    Здесь будет отображаться список ваших последних заказов и действий.
                                </p>
                            </div>
                        </div>
                    </div>
                </main>
            </div>

            <Footer />
        </div>
    );
}
