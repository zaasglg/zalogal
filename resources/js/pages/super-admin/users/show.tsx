import SuperAdminLayout from '@/layouts/super-admin-layout';
import { Link, router, useForm, usePage } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import InputError from '@/components/input-error';
import {
    ArrowLeft,
    Save,
    Trash2,
} from 'lucide-react';

interface User {
    id: number;
    name: string;
    email: string;
    role: 'buyer' | 'seller' | 'super_admin';
    phone?: string;
    organization_type?: string;
    bin?: string;
    created_at: string;
    addresses?: Array<any>;
    payment_cards?: Array<any>;
    listings?: Array<any>;
}

interface UserShowProps {
    user: User;
}

export default function UserShow({ user }: UserShowProps) {
    const { auth } = usePage().props as any;
    const { data, setData, put, processing, errors, delete: destroy } = useForm({
        name: user.name,
        email: user.email,
        role: user.role,
        phone: user.phone || '',
        organization_type: user.organization_type || '',
        bin: user.bin || '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(`/super-admin/users/${user.id}`, {
            preserveScroll: true,
        });
    };

    const handleDelete = () => {
        if (
            confirm(
                'Вы уверены, что хотите удалить этого пользователя? Это действие нельзя отменить.',
            )
        ) {
            destroy(`/super-admin/users/${user.id}`, {
                preserveScroll: false,
            });
        }
    };

    return (
        <SuperAdminLayout title={`Редактирование пользователя: ${user.name}`}>
            <div className="mb-6">
                <Link
                    href="/super-admin/users"
                    className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Назад к списку пользователей
                </Link>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="mb-6 pb-4 border-b border-gray-200">
                    <h2 className="text-xl font-semibold text-gray-900">
                        Редактирование пользователя
                    </h2>
                    <p className="text-sm text-gray-600 mt-1">
                        Измените информацию о пользователе
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Basic Info */}
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">
                            Основная информация
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="name">Имя</Label>
                                <Input
                                    id="name"
                                    value={data.name}
                                    onChange={(e) =>
                                        setData('name', e.target.value)
                                    }
                                    className="mt-1"
                                />
                                <InputError message={errors.name} />
                            </div>

                            <div>
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    value={data.email}
                                    onChange={(e) =>
                                        setData('email', e.target.value)
                                    }
                                    className="mt-1"
                                />
                                <InputError message={errors.email} />
                            </div>

                            <div>
                                <Label htmlFor="role">Роль</Label>
                                <select
                                    id="role"
                                    value={data.role}
                                    onChange={(e) =>
                                        setData(
                                            'role',
                                            e.target.value as
                                                | 'buyer'
                                                | 'seller'
                                                | 'super_admin',
                                        )
                                    }
                                    className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                >
                                    <option value="buyer">Покупатель</option>
                                    <option value="seller">Продавец</option>
                                    <option value="super_admin">
                                        Супер-Админ
                                    </option>
                                </select>
                                <InputError message={errors.role} />
                            </div>

                            <div>
                                <Label htmlFor="phone">Телефон</Label>
                                <Input
                                    id="phone"
                                    value={data.phone}
                                    onChange={(e) =>
                                        setData('phone', e.target.value)
                                    }
                                    className="mt-1"
                                />
                                <InputError message={errors.phone} />
                            </div>
                        </div>
                    </div>

                    {/* Seller Info */}
                    {data.role === 'seller' && (
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">
                                Информация о продавце
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <Label htmlFor="organization_type">
                                        Тип организации
                                    </Label>
                                    <Input
                                        id="organization_type"
                                        value={data.organization_type}
                                        onChange={(e) =>
                                            setData(
                                                'organization_type',
                                                e.target.value,
                                            )
                                        }
                                        className="mt-1"
                                    />
                                    <InputError
                                        message={errors.organization_type}
                                    />
                                </div>

                                <div>
                                    <Label htmlFor="bin">БИН</Label>
                                    <Input
                                        id="bin"
                                        value={data.bin}
                                        onChange={(e) =>
                                            setData('bin', e.target.value)
                                        }
                                        className="mt-1"
                                    />
                                    <InputError message={errors.bin} />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Actions */}
                    <div className="flex justify-between items-center pt-6 border-t border-gray-200">
                        <Button
                            type="button"
                            variant="destructive"
                            onClick={handleDelete}
                            disabled={user.id === auth?.user?.id}
                            className="flex items-center gap-2"
                        >
                            <Trash2 className="w-4 h-4" />
                            Удалить пользователя
                        </Button>
                        <Button
                            type="submit"
                            disabled={processing}
                            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700"
                        >
                            <Save className="w-4 h-4" />
                            Сохранить изменения
                        </Button>
                    </div>
                </form>
            </div>
        </SuperAdminLayout>
    );
}
