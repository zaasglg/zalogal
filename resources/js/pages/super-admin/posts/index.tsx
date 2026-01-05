import SuperAdminLayout from '@/layouts/super-admin-layout';
import { Link, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    FileText,
    Search,
    Edit,
    Trash2,
    Plus,
    Image as ImageIcon,
    Eye,
    EyeOff
} from 'lucide-react';
import { useState } from 'react';

interface Post {
    id: number;
    title: string;
    slug: string;
    image: string | null;
    is_published: boolean;
    published_at: string | null;
    created_at: string;
    user: {
        name: string;
    }
}

interface PostsIndexProps {
    posts: {
        data: Post[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
    };
    filters: {
        search?: string;
    };
}

export default function PostsIndex({
    posts,
    filters,
}: PostsIndexProps) {
    const [search, setSearch] = useState(filters.search || '');

    const handleSearch = () => {
        router.get('/super-admin/posts', { search }, {
            preserveState: true,
        });
    };

    const handleDelete = (postId: number) => {
        if (
            confirm(
                'Вы уверены, что хотите удалить эту новость? Это действие нельзя отменить.',
            )
        ) {
            router.delete(`/super-admin/posts/${postId}`, {
                preserveScroll: true,
            });
        }
    };

    return (
        <SuperAdminLayout title="Управление новостями">
            {/* Header */}
            <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">
                            Новости
                        </h1>
                        <p className="text-gray-600 mt-1">
                            Управление новостями и публикациями
                        </p>
                    </div>
                    <div className="flex items-center gap-4">
                        <Link href="/super-admin/posts/create">
                            <Button className="bg-blue-600 hover:bg-blue-700 flex items-center gap-2">
                                <Plus className="w-4 h-4" />
                                Создать новость
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
                                    placeholder="Поиск по заголовку..."
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

            {/* Posts Table */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="text-left py-3 px-6 font-semibold text-gray-700 text-sm">Изображение</th>
                                <th className="text-left py-3 px-6 font-semibold text-gray-700 text-sm">Заголовок</th>
                                <th className="text-left py-3 px-6 font-semibold text-gray-700 text-sm">Статус</th>
                                <th className="text-left py-3 px-6 font-semibold text-gray-700 text-sm">Автор</th>
                                <th className="text-left py-3 px-6 font-semibold text-gray-700 text-sm">Дата публикации</th>
                                <th className="text-right py-3 px-6 font-semibold text-gray-700 text-sm">Действия</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {posts.data.length > 0 ? (
                                posts.data.map((post) => (
                                    <tr key={post.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="py-4 px-6">
                                            {post.image ? (
                                                <img
                                                    src={post.image}
                                                    alt={post.title}
                                                    className="w-12 h-12 object-cover rounded-lg"
                                                />
                                            ) : (
                                                <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                                                    <ImageIcon className="w-6 h-6 text-gray-400" />
                                                </div>
                                            )}
                                        </td>
                                        <td className="py-4 px-6">
                                            <p className="font-medium text-gray-900 line-clamp-2">{post.title}</p>
                                        </td>
                                        <td className="py-4 px-6">
                                            <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${post.is_published
                                                    ? 'bg-green-100 text-green-800'
                                                    : 'bg-gray-100 text-gray-800'
                                                }`}>
                                                {post.is_published ? (
                                                    <><Eye className="w-3 h-3 mr-1" /> Опубликовано</>
                                                ) : (
                                                    <><EyeOff className="w-3 h-3 mr-1" /> Черновик</>
                                                )}
                                            </div>
                                        </td>
                                        <td className="py-4 px-6 text-sm text-gray-600">
                                            {post.user.name}
                                        </td>
                                        <td className="py-4 px-6 text-sm text-gray-600">
                                            {post.published_at ? new Date(post.published_at).toLocaleDateString('ru-RU') : '-'}
                                        </td>
                                        <td className="py-4 px-6">
                                            <div className="flex justify-end gap-2">
                                                <Link href={`/super-admin/posts/${post.id}/edit`}>
                                                    <Button variant="outline" size="sm" className="flex items-center gap-1">
                                                        <Edit className="w-4 h-4" />
                                                        Ред.
                                                    </Button>
                                                </Link>
                                                <Button
                                                    variant="destructive"
                                                    size="sm"
                                                    onClick={() => handleDelete(post.id)}
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
                                    <td colSpan={6} className="py-12 text-center text-gray-500">
                                        <FileText className="w-12 h-12 mx-auto mb-2 text-gray-400" />
                                        <p>Новости не найдены</p>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                {posts.last_page > 1 && (
                    <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
                        <div className="flex justify-center gap-2">
                            {Array.from({ length: posts.last_page }, (_, i) => i + 1).map((page) => (
                                <Button
                                    key={page}
                                    variant={page === posts.current_page ? 'default' : 'outline'}
                                    size="sm"
                                    onClick={() => router.get('/super-admin/posts', { page, search }, { preserveState: true })}
                                    className={page === posts.current_page ? 'bg-blue-600' : ''}
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
