import SuperAdminLayout from '@/layouts/super-admin-layout';
import { Link, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    FolderTree,
    Search,
    Edit,
    Trash2,
    Plus,
    Image as ImageIcon,
} from 'lucide-react';
import { useState } from 'react';

interface Category {
    id: number;
    name: string;
    slug: string;
    image: string | null;
    listings_count: number;
    created_at: string;
}

interface CategoriesIndexProps {
    categories: {
        data: Category[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
    };
    filters: {
        search?: string;
    };
}

export default function CategoriesIndex({
    categories,
    filters,
}: CategoriesIndexProps) {
    const [search, setSearch] = useState(filters.search || '');

    const handleSearch = () => {
        router.get('/super-admin/categories', { search }, {
            preserveState: true,
        });
    };

    const handleDelete = (categoryId: number) => {
        if (
            confirm(
                'Вы уверены, что хотите удалить эту категорию? Это действие нельзя отменить.',
            )
        ) {
            router.delete(`/super-admin/categories/${categoryId}`, {
                preserveScroll: true,
            });
        }
    };

    return (
        <SuperAdminLayout title="Управление категориями">
            {/* Header */}
            <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">
                            Категории
                        </h1>
                        <p className="text-gray-600 mt-1">
                            Управление категориями товаров
                        </p>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="text-sm text-gray-500">
                            Всего: <span className="font-semibold">{categories.total}</span>
                        </div>
                        <Link href="/super-admin/categories/create">
                            <Button className="bg-blue-600 hover:bg-blue-700 flex items-center gap-2">
                                <Plus className="w-4 h-4" />
                                Создать категорию
                            </Button>
                        </Link>
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
                                    placeholder="Поиск по названию или slug..."
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
                        <Button
                            onClick={handleSearch}
                            className="bg-blue-600 hover:bg-blue-700"
                        >
                            <Search className="w-4 h-4 mr-2" />
                            Поиск
                        </Button>
                    </div>
                </div>
            </div>

            {/* Categories Table */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="text-left py-3 px-6 font-semibold text-gray-700 text-sm">
                                    Изображение
                                </th>
                                <th className="text-left py-3 px-6 font-semibold text-gray-700 text-sm">
                                    Название
                                </th>
                                <th className="text-left py-3 px-6 font-semibold text-gray-700 text-sm">
                                    Slug
                                </th>
                                <th className="text-left py-3 px-6 font-semibold text-gray-700 text-sm">
                                    Товаров
                                </th>
                                <th className="text-left py-3 px-6 font-semibold text-gray-700 text-sm">
                                    Дата создания
                                </th>
                                <th className="text-right py-3 px-6 font-semibold text-gray-700 text-sm">
                                    Действия
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {categories.data.length > 0 ? (
                                categories.data.map((category) => (
                                    <tr
                                        key={category.id}
                                        className="hover:bg-gray-50 transition-colors"
                                    >
                                        <td className="py-4 px-6">
                                            {category.image ? (
                                                <img
                                                    src={category.image}
                                                    alt={category.name}
                                                    className="w-12 h-12 object-cover rounded-lg"
                                                />
                                            ) : (
                                                <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                                                    <ImageIcon className="w-6 h-6 text-gray-400" />
                                                </div>
                                            )}
                                        </td>
                                        <td className="py-4 px-6">
                                            <p className="font-medium text-gray-900">
                                                {category.name}
                                            </p>
                                        </td>
                                        <td className="py-4 px-6">
                                            <p className="text-sm text-gray-600 font-mono">
                                                {category.slug}
                                            </p>
                                        </td>
                                        <td className="py-4 px-6">
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                                {category.listings_count}
                                            </span>
                                        </td>
                                        <td className="py-4 px-6 text-sm text-gray-600">
                                            {new Date(
                                                category.created_at,
                                            ).toLocaleDateString('ru-RU')}
                                        </td>
                                        <td className="py-4 px-6">
                                            <div className="flex justify-end gap-2">
                                                <Link
                                                    href={`/super-admin/categories/${category.id}/edit`}
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
                                                <Button
                                                    variant="destructive"
                                                    size="sm"
                                                    onClick={() =>
                                                        handleDelete(category.id)
                                                    }
                                                    className="flex items-center gap-1"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                    Удалить
                                                </Button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan={6}
                                        className="py-12 text-center text-gray-500"
                                    >
                                        <FolderTree className="w-12 h-12 mx-auto mb-2 text-gray-400" />
                                        <p>Категории не найдены</p>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                {categories.last_page > 1 && (
                    <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
                        <div className="flex justify-center gap-2">
                            {Array.from(
                                { length: categories.last_page },
                                (_, i) => i + 1,
                            ).map((page) => (
                                <Button
                                    key={page}
                                    variant={
                                        page === categories.current_page
                                            ? 'default'
                                            : 'outline'
                                    }
                                    size="sm"
                                    onClick={() => {
                                        router.get('/super-admin/categories', {
                                            page,
                                            search,
                                        }, { preserveState: true });
                                    }}
                                    className={
                                        page === categories.current_page
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

