import SuperAdminLayout from '@/layouts/super-admin-layout';
import { Link, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import InputError from '@/components/input-error';
import { ArrowLeft, Save, Trash2, Upload, Download, X } from 'lucide-react';
import { router } from '@inertiajs/react';
import { useState, useEffect } from 'react';

interface Category {
    id: number;
    name: string;
    slug: string;
    image: string | null;
}

interface CategoryEditProps {
    category: Category;
}

export default function CategoryEdit({ category }: CategoryEditProps) {
    const [imagePreview, setImagePreview] = useState<string | null>(category.image || null);
    const [uploadMethod, setUploadMethod] = useState<'file' | 'url' | 'direct'>(
        category.image && category.image.startsWith('/storage/') ? 'file' : 
        category.image ? 'direct' : 'file'
    );
    
    const { data, setData, put, processing, errors, delete: destroy } = useForm({
        name: category.name,
        image: category.image || '',
        image_file: null as File | null,
        image_url: '',
    });

    useEffect(() => {
        if (category.image) {
            setImagePreview(category.image);
        }
    }, [category.image]);

    const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setData('image_file', file);
            setData('image', '');
            setData('image_url', '');
            const reader = new FileReader();
            reader.onload = (e) => {
                setImagePreview(e.target?.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleImageUrlChange = (url: string) => {
        setData('image_url', url);
        setData('image', '');
        setData('image_file', null);
        if (url) {
            setImagePreview(url);
        } else {
            setImagePreview(category.image);
        }
    };

    const handleDirectUrlChange = (url: string) => {
        setData('image', url);
        setData('image_url', '');
        setData('image_file', null);
        if (url) {
            setImagePreview(url);
        } else {
            setImagePreview(category.image);
        }
    };

    const removeImage = () => {
        setData('image_file', null);
        setData('image', '');
        setData('image_url', '');
        setImagePreview(null);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(`/super-admin/categories/${category.id}`, {
            forceFormData: true,
            preserveScroll: true,
        });
    };

    const handleDelete = () => {
        if (
            confirm(
                'Вы уверены, что хотите удалить эту категорию? Это действие нельзя отменить.',
            )
        ) {
            destroy(`/super-admin/categories/${category.id}`, {
                preserveScroll: false,
            });
        }
    };

    return (
        <SuperAdminLayout title={`Редактирование категории: ${category.name}`}>
            <div className="mb-6">
                <Link
                    href="/super-admin/categories"
                    className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Назад к списку категорий
                </Link>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="mb-6 pb-4 border-b border-gray-200">
                    <h2 className="text-xl font-semibold text-gray-900">
                        Редактирование категории
                    </h2>
                    <p className="text-sm text-gray-600 mt-1">
                        Измените информацию о категории
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6" encType="multipart/form-data">
                    {/* Name */}
                    <div>
                        <Label htmlFor="name">
                            Название категории <span className="text-red-500">*</span>
                        </Label>
                        <Input
                            id="name"
                            type="text"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            required
                            className="mt-1"
                            placeholder="Например: Электроника"
                        />
                        <InputError message={errors.name} />
                        <p className="mt-1 text-sm text-gray-500">
                            Название категории будет отображаться на сайте
                        </p>
                    </div>

                    {/* Slug (read-only) */}
                    <div>
                        <Label htmlFor="slug">Slug (автоматически)</Label>
                        <Input
                            id="slug"
                            type="text"
                            value={category.slug}
                            disabled
                            className="mt-1 bg-gray-50"
                        />
                        <p className="mt-1 text-sm text-gray-500">
                            Slug генерируется автоматически на основе названия
                        </p>
                    </div>

                    {/* Image Upload Method Selection */}
                    <div>
                        <Label>Способ загрузки изображения</Label>
                        <div className="mt-2 flex gap-4">
                            <button
                                type="button"
                                onClick={() => setUploadMethod('file')}
                                className={`px-4 py-2 rounded-lg border transition-colors ${
                                    uploadMethod === 'file'
                                        ? 'bg-blue-600 text-white border-blue-600'
                                        : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                                }`}
                            >
                                <Upload className="w-4 h-4 inline mr-2" />
                                Загрузить файл
                            </button>
                            <button
                                type="button"
                                onClick={() => setUploadMethod('url')}
                                className={`px-4 py-2 rounded-lg border transition-colors ${
                                    uploadMethod === 'url'
                                        ? 'bg-blue-600 text-white border-blue-600'
                                        : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                                }`}
                            >
                                <Download className="w-4 h-4 inline mr-2" />
                                Загрузить с URL
                            </button>
                            <button
                                type="button"
                                onClick={() => setUploadMethod('direct')}
                                className={`px-4 py-2 rounded-lg border transition-colors ${
                                    uploadMethod === 'direct'
                                        ? 'bg-blue-600 text-white border-blue-600'
                                        : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                                }`}
                            >
                                Прямая ссылка
                            </button>
                        </div>
                    </div>

                    {/* File Upload */}
                    {uploadMethod === 'file' && (
                        <div>
                            <Label htmlFor="image_file">Загрузить изображение</Label>
                            <div className="mt-2">
                                <input
                                    id="image_file"
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageFileChange}
                                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                                />
                            </div>
                            <InputError message={errors.image_file} />
                            <p className="mt-1 text-sm text-gray-500">
                                Максимальный размер: 2MB. Поддерживаемые форматы: JPG, PNG, GIF, WebP
                            </p>
                        </div>
                    )}

                    {/* URL Upload */}
                    {uploadMethod === 'url' && (
                        <div>
                            <Label htmlFor="image_url">
                                URL изображения для загрузки
                            </Label>
                            <Input
                                id="image_url"
                                type="url"
                                value={data.image_url}
                                onChange={(e) => handleImageUrlChange(e.target.value)}
                                className="mt-1"
                                placeholder="https://example.com/image.jpg"
                            />
                            <InputError message={errors.image_url} />
                            <p className="mt-1 text-sm text-gray-500">
                                Изображение будет загружено и сохранено на сервере
                            </p>
                        </div>
                    )}

                    {/* Direct URL */}
                    {uploadMethod === 'direct' && (
                        <div>
                            <Label htmlFor="image">URL изображения (прямая ссылка)</Label>
                            <Input
                                id="image"
                                type="url"
                                value={data.image}
                                onChange={(e) => handleDirectUrlChange(e.target.value)}
                                className="mt-1"
                                placeholder="https://example.com/image.jpg"
                            />
                            <InputError message={errors.image} />
                            <p className="mt-1 text-sm text-gray-500">
                                Изображение будет использоваться напрямую по ссылке
                            </p>
                        </div>
                    )}

                    {/* Preview */}
                    {imagePreview && (
                        <div>
                            <Label>Предпросмотр изображения</Label>
                            <div className="mt-2 relative inline-block">
                                <img
                                    src={imagePreview}
                                    alt="Preview"
                                    className="w-48 h-48 object-cover rounded-lg border border-gray-200"
                                    onError={(e) => {
                                        (e.target as HTMLImageElement).style.display = 'none';
                                    }}
                                />
                                <button
                                    type="button"
                                    onClick={removeImage}
                                    className="absolute top-2 right-2 bg-red-600 text-white rounded-full p-1 hover:bg-red-700"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Actions */}
                    <div className="flex justify-between items-center pt-6 border-t border-gray-200">
                        <Button
                            type="button"
                            variant="destructive"
                            onClick={handleDelete}
                            className="flex items-center gap-2"
                        >
                            <Trash2 className="w-4 h-4" />
                            Удалить категорию
                        </Button>
                        <div className="flex gap-4">
                            <Link href="/super-admin/categories">
                                <Button type="button" variant="outline">
                                    Отмена
                                </Button>
                            </Link>
                            <Button
                                type="submit"
                                disabled={processing}
                                className="bg-blue-600 hover:bg-blue-700 flex items-center gap-2"
                            >
                                <Save className="w-4 h-4" />
                                Сохранить изменения
                            </Button>
                        </div>
                    </div>
                </form>
            </div>
        </SuperAdminLayout>
    );
}
