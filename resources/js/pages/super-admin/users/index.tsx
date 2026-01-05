import SuperAdminLayout from '@/layouts/super-admin-layout';
import { Link, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Users,
    Search,
    Edit,
    UserCheck,
    Store,
    Shield,
} from 'lucide-react';
import { useState } from 'react';

interface User {
    id: number;
    name: string;
    email: string;
    role: 'buyer' | 'seller' | 'super_admin';
    phone?: string;
    created_at: string;
}

interface UsersIndexProps {
    users: {
        data: User[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
    };
    filters: {
        role?: string;
        search?: string;
    };
}

export default function UsersIndex({ users, filters }: UsersIndexProps) {
    const [search, setSearch] = useState(filters.search || '');
    const [roleFilter, setRoleFilter] = useState(filters.role || '');

    const handleSearch = () => {
        router.get('/super-admin/users', { search, role: roleFilter }, {
            preserveState: true,
        });
    };

    const getRoleIcon = (role: string) => {
        switch (role) {
            case 'super_admin':
                return <Shield className="w-4 h-4 text-red-600" />;
            case 'seller':
                return <Store className="w-4 h-4 text-orange-600" />;
            default:
                return <UserCheck className="w-4 h-4 text-green-600" />;
        }
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
        <SuperAdminLayout title="Управление пользователями">
            {/* Header */}
            <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">
                            Пользователи
                        </h1>
                        <p className="text-gray-600 mt-1">
                            Управление всеми пользователями системы
                        </p>
                    </div>
                    <div className="text-sm text-gray-500">
                        Всего: <span className="font-semibold">{users.total}</span>
                    </div>
                </div>

                {/* Filters */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                    <div className="flex gap-4">
                        <div className="flex-1">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <Input
                                    type="text"
                                    placeholder="Поиск по имени, email, телефону..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    onKeyPress={(e) => {
                                        if (e.key === 'Enter') {
                                            handleSearch();
                                        }
                                    }}
                                    className="pl-10"
                                />
                            </div>
                        </div>
                        <select
                            value={roleFilter}
                            onChange={(e) => setRoleFilter(e.target.value)}
                            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                            <option value="">Все роли</option>
                            <option value="buyer">Покупатель</option>
                            <option value="seller">Продавец</option>
                            <option value="super_admin">Супер-Админ</option>
                        </select>
                        <Button onClick={handleSearch} className="bg-blue-600 hover:bg-blue-700">
                            <Search className="w-4 h-4 mr-2" />
                            Поиск
                        </Button>
                    </div>
                </div>
            </div>

            {/* Users Table */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="text-left py-3 px-6 font-semibold text-gray-700 text-sm">
                                    Пользователь
                                </th>
                                <th className="text-left py-3 px-6 font-semibold text-gray-700 text-sm">
                                    Роль
                                </th>
                                <th className="text-left py-3 px-6 font-semibold text-gray-700 text-sm">
                                    Телефон
                                </th>
                                <th className="text-left py-3 px-6 font-semibold text-gray-700 text-sm">
                                    Дата регистрации
                                </th>
                                <th className="text-right py-3 px-6 font-semibold text-gray-700 text-sm">
                                    Действия
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {users.data.length > 0 ? (
                                users.data.map((user) => (
                                    <tr
                                        key={user.id}
                                        className="hover:bg-gray-50 transition-colors"
                                    >
                                        <td className="py-4 px-6">
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
                                        </td>
                                        <td className="py-4 px-6">
                                            <div className="flex items-center gap-2">
                                                {getRoleIcon(user.role)}
                                                {getRoleBadge(user.role)}
                                            </div>
                                        </td>
                                        <td className="py-4 px-6 text-sm text-gray-600">
                                            {user.phone || '-'}
                                        </td>
                                        <td className="py-4 px-6 text-sm text-gray-600">
                                            {new Date(
                                                user.created_at,
                                            ).toLocaleDateString('ru-RU')}
                                        </td>
                                        <td className="py-4 px-6">
                                            <div className="flex justify-end">
                                                <Link
                                                    href={`/super-admin/users/${user.id}`}
                                                >
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        className="flex items-center gap-1"
                                                    >
                                                        <Edit className="w-4 h-4" />
                                                        Редактировать
                                                    </Button>
                                                </Link>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan={5}
                                        className="py-12 text-center text-gray-500"
                                    >
                                        <Users className="w-12 h-12 mx-auto mb-2 text-gray-400" />
                                        <p>Пользователи не найдены</p>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                {users.last_page > 1 && (
                    <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
                        <div className="flex justify-center gap-2">
                            {Array.from(
                                { length: users.last_page },
                                (_, i) => i + 1,
                            ).map((page) => (
                                <Button
                                    key={page}
                                    variant={
                                        page === users.current_page
                                            ? 'default'
                                            : 'outline'
                                    }
                                    size="sm"
                                    onClick={() => {
                                        router.get('/super-admin/users', {
                                            page,
                                            search,
                                            role: roleFilter,
                                        }, { preserveState: true });
                                    }}
                                    className={
                                        page === users.current_page
                                            ? 'bg-blue-600 hover:bg-blue-700'
                                            : ''
                                    }
                                >
                                    {page}
                                </Button>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </SuperAdminLayout>
    );
}
