import { Link, usePage } from '@inertiajs/react';
import { router } from '@inertiajs/react';
import {
    Archive,
    LogOut,
    MapPin,
    MessageSquare,
    Package,
    Settings,
    User,
    FileText,
    ShoppingBag,
} from 'lucide-react';

const buyerMenuItems = [
    { icon: User, label: 'Личный кабинет', href: '/profile' },
    { icon: Package, label: 'История заказов', href: '/profile/orders' },
    { icon: MapPin, label: 'Карта & адрес', href: '/profile/address' },
    { icon: MessageSquare, label: 'Чат', href: '/profile/chat' },
];

const sellerMenuItems = [
    { icon: User, label: 'Личный кабинет', href: '/profile' },
    { icon: FileText, label: 'Активные объявления', href: '/profile/listings' },
    { icon: ShoppingBag, label: 'Заказы', href: '/profile/seller-orders' },
    { icon: MessageSquare, label: 'Чат', href: '/profile/chat' },
    { icon: Archive, label: 'Архив', href: '/profile/archive' },
];

export function ProfileSidebar() {
    const { url, props } = usePage();
    const auth = props.auth as { user: { id: number; name: string; email: string; role: string } | null };

    const menuItems = auth.user?.role === 'seller' ? sellerMenuItems : buyerMenuItems;

    return (
        <div className="bg-white rounded-sm border border-gray-200 overflow-hidden">
            <nav className="flex flex-col">
                {menuItems.map((item, index) => {
                    const isActive = url.startsWith(item.href) && (item.href !== '/profile' || url === '/profile');

                    return (
                        <Link
                            key={index}
                            href={item.href}
                            className={`flex items-center gap-3 px-6 py-4 text-sm font-medium transition-colors ${isActive
                                ? 'bg-[#FA8232] text-white'
                                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                }`}
                        >
                            <item.icon className={`h-5 w-5 ${isActive ? 'text-white' : 'text-gray-400'}`} />
                            {item.label}
                        </Link>
                    );
                })}

                {auth.user && (
                    <button
                        onClick={() => router.post('/logout')}
                        className="flex items-center gap-3 px-6 py-4 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors w-full text-left"
                    >
                        <LogOut className="h-5 w-5 text-gray-400" />
                        Выход
                    </button>
                )}
            </nav>
        </div>
    );
}
