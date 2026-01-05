import { Head, Link, router, usePage } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import {
    LayoutDashboard,
    Users,
    LogOut,
    Menu,
    X,
    Bell,
    Search,
    Home,
    ChevronDown,
    FolderTree,
    FileText,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SuperAdminLayoutProps {
    children: React.ReactNode;
    title?: string;
}

export default function SuperAdminLayout({
    children,
    title = 'Панель управления',
}: SuperAdminLayoutProps) {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const page = usePage();
    const { auth, flash } = page.props as any;
    const currentPath = page.url;

    // Показываем flash сообщения
    useEffect(() => {
        if (flash?.success) {
            toast.success(flash.success);
        }
        if (flash?.error) {
            toast.error(flash.error);
        }
    }, [flash]);

    const handleLogout = () => {
        router.post('/super-admin/logout');
    };

    const menuItems = [
        {
            name: 'Дашборд',
            href: '/super-admin/dashboard',
            icon: LayoutDashboard,
            active: currentPath === '/super-admin/dashboard',
        },
        {
            name: 'Пользователи',
            href: '/super-admin/users',
            icon: Users,
            active: currentPath.startsWith('/super-admin/users'),
        },
        {
            name: 'Новости',
            href: '/super-admin/posts',
            icon: FileText,
            active: currentPath.startsWith('/super-admin/posts'),
        },
        {
            name: 'Категории',
            href: '/super-admin/categories',
            icon: FolderTree,
            active: currentPath.startsWith('/super-admin/categories'),
        },
    ];

    return (
        <>
            <Head title={title} />
            <div className="min-h-screen bg-gray-100">
                {/* Sidebar */}
                <aside
                    className={`fixed top-0 left-0 z-40 h-screen transition-transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'
                        } lg:translate-x-0 w-64 bg-gray-800 border-r border-gray-700`}
                >
                    {/* Logo */}
                    <div className="flex items-center justify-between h-16 px-4 bg-gray-900">
                        <Link
                            href="/super-admin/dashboard"
                            className="flex items-center gap-2"
                        >
                            <div className="flex items-center justify-center w-8 h-8 bg-blue-600 rounded">
                                <span className="text-white font-bold text-lg">
                                    A
                                </span>
                            </div>
                            <span className="text-white font-bold text-lg">
                                AdminLTE
                            </span>
                        </Link>
                        <button
                            onClick={() => setSidebarOpen(false)}
                            className="lg:hidden text-gray-400 hover:text-white"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    {/* User Info */}
                    <div className="px-4 py-4 border-b border-gray-700">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                                <span className="text-white font-semibold">
                                    {auth?.user?.name?.charAt(0).toUpperCase()}
                                </span>
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-white text-sm font-medium truncate">
                                    {auth?.user?.name}
                                </p>
                                <p className="text-gray-400 text-xs truncate">
                                    Супер-Админ
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Navigation */}
                    <nav className="px-2 py-4 space-y-1">
                        {menuItems.map((item) => {
                            const Icon = item.icon;
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${item.active
                                        ? 'bg-blue-600 text-white'
                                        : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                                        }`}
                                >
                                    <Icon className="w-5 h-5" />
                                    <span className="font-medium">
                                        {item.name}
                                    </span>
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Footer */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-700">
                        <Link
                            href="/"
                            className="flex items-center gap-2 text-gray-300 hover:text-white text-sm"
                        >
                            <Home className="w-4 h-4" />
                            <span>На сайт</span>
                        </Link>
                    </div>
                </aside>

                {/* Sidebar Overlay */}
                {sidebarOpen && (
                    <div
                        className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
                        onClick={() => setSidebarOpen(false)}
                    />
                )}

                {/* Main Content */}
                <div className="lg:ml-64">
                    {/* Top Navbar */}
                    <nav className="bg-white border-b border-gray-200 sticky top-0 z-20">
                        <div className="px-4 sm:px-6 lg:px-8">
                            <div className="flex items-center justify-between h-16">
                                {/* Left side */}
                                <div className="flex items-center gap-4">
                                    <button
                                        onClick={() => setSidebarOpen(true)}
                                        className="lg:hidden text-gray-600 hover:text-gray-900"
                                    >
                                        <Menu className="w-6 h-6" />
                                    </button>
                                    <h1 className="text-xl font-semibold text-gray-800">
                                        {title}
                                    </h1>
                                </div>

                                {/* Right side */}
                                <div className="flex items-center gap-4">
                                    {/* Search */}
                                    <div className="hidden md:flex items-center gap-2 bg-gray-100 rounded-lg px-3 py-2">
                                        <Search className="w-4 h-4 text-gray-500" />
                                        <input
                                            type="text"
                                            placeholder="Поиск..."
                                            className="bg-transparent border-0 outline-0 text-sm w-48"
                                        />
                                    </div>

                                    {/* Notifications */}
                                    <button className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg">
                                        <Bell className="w-5 h-5" />
                                        <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                                    </button>

                                    {/* User Menu */}
                                    <div className="flex items-center gap-2">
                                        <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                                            <span className="text-white text-xs font-semibold">
                                                {auth?.user?.name
                                                    ?.charAt(0)
                                                    .toUpperCase()}
                                            </span>
                                        </div>
                                        <button
                                            onClick={handleLogout}
                                            className="flex items-center gap-1 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg"
                                        >
                                            <LogOut className="w-4 h-4" />
                                            <span className="hidden sm:inline">
                                                Выход
                                            </span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </nav>

                    {/* Content */}
                    <main className="p-4 sm:p-6 lg:p-8">{children}</main>
                </div>
            </div>
        </>
    );
}

