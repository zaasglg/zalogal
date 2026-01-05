import SuperAdminLayout from '@/layouts/super-admin-layout';
import { RichTextEditor } from '@/components/RichTextEditor';
import { Link, router, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
    ArrowLeft,
    Save,
    Image as ImageIcon,
    Upload,
    Download
} from 'lucide-react';
import { useState } from 'react';

export default function PostsCreate() {
    const [uploadMethod, setUploadMethod] = useState<'file' | 'url' | 'direct'>('file');

    const { data, setData, post, processing, errors } = useForm({
        title: '',
        excerpt: '',
        content: '',
        image_file: null as File | null,
        image_url: '',
        image: '',
        is_published: false,
    });

    // ... existing handlers ...

    // Add image handlers
    const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setData('image_file', file);
            setData('image', '');
            setData('image_url', '');
        }
    };

    const handleImageUrlChange = (url: string) => {
        setData('image_url', url);
        setData('image', '');
        setData('image_file', null);
    };

    const handleDirectUrlChange = (url: string) => {
        setData('image', url);
        setData('image_url', '');
        setData('image_file', null);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/super-admin/posts', {
            forceFormData: true,
        });
    };

    return (
        <SuperAdminLayout title="Создание новости">
            <div className="w-full">

                {/* ... Header ... */}

                <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                    <form onSubmit={handleSubmit} className="p-6 space-y-6">

                        {/* Title */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Заголовок <span className="text-red-500">*</span>
                            </label>
                            <Input
                                type="text"
                                value={data.title}
                                onChange={(e) => setData('title', e.target.value)}
                                className={errors.title ? 'border-red-500' : ''}
                                placeholder="Введите заголовок новости"
                            />
                            {errors.title && (
                                <p className="mt-1 text-sm text-red-500">{errors.title}</p>
                            )}
                        </div>

                        {/* Excerpt */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Краткое описание
                            </label>
                            <Textarea
                                value={data.excerpt}
                                onChange={(e) => setData('excerpt', e.target.value)}
                                className="h-24 resize-none"
                                placeholder="Краткое описание для карточки..."
                            />
                            {errors.excerpt && (
                                <p className="mt-1 text-sm text-red-500">{errors.excerpt}</p>
                            )}
                        </div>

                        {/* Content */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Содержание <span className="text-red-500">*</span>
                            </label>
                            <RichTextEditor
                                value={data.content}
                                onChange={(value) => setData('content', value)}
                                placeholder="Полный текст новости..."
                                error={errors.content}
                            />
                        </div>

                        {/* Image Upload */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Способ загрузки изображения
                            </label>

                            <div className="flex gap-4 mb-4">
                                <button
                                    type="button"
                                    onClick={() => setUploadMethod('file')}
                                    className={`px-4 py-2 rounded-lg border transition-colors ${uploadMethod === 'file'
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
                                    className={`px-4 py-2 rounded-lg border transition-colors ${uploadMethod === 'url'
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
                                    className={`px-4 py-2 rounded-lg border transition-colors ${uploadMethod === 'direct'
                                        ? 'bg-blue-600 text-white border-blue-600'
                                        : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                                        }`}
                                >
                                    Прямая ссылка
                                </button>
                            </div>

                            {uploadMethod === 'file' && (
                                <div className="mt-2 flex items-center justify-center w-full">
                                    <label
                                        htmlFor="image-upload"
                                        className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                                    >
                                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                            <ImageIcon className="w-8 h-8 mb-2 text-gray-400" />
                                            <p className="text-sm text-gray-500">
                                                {data.image_file ? (
                                                    <span className="text-blue-600 font-medium">
                                                        {data.image_file.name}
                                                    </span>
                                                ) : (
                                                    <>
                                                        <span className="font-medium text-blue-600">Нажмите для загрузки</span> или перетащите файл
                                                    </>
                                                )}
                                            </p>
                                            <p className="text-xs text-gray-500">PNG, JPG до 2MB</p>
                                        </div>
                                        <input
                                            id="image-upload"
                                            type="file"
                                            className="hidden"
                                            accept="image/*"
                                            onChange={handleImageFileChange}
                                        />
                                    </label>
                                </div>
                            )}

                            {uploadMethod === 'url' && (
                                <div>
                                    <Input
                                        type="url"
                                        value={data.image_url}
                                        onChange={(e) => handleImageUrlChange(e.target.value)}
                                        placeholder="https://example.com/image.jpg"
                                    />
                                    <p className="mt-1 text-sm text-gray-500">
                                        Изображение будет загружено и сохранено на сервере
                                    </p>
                                </div>
                            )}

                            {uploadMethod === 'direct' && (
                                <div>
                                    <Input
                                        type="url"
                                        value={data.image}
                                        onChange={(e) => handleDirectUrlChange(e.target.value)}
                                        placeholder="https://example.com/image.jpg"
                                    />
                                    <p className="mt-1 text-sm text-gray-500">
                                        Изображение будет использоваться напрямую по ссылке
                                    </p>
                                </div>
                            )}

                            {errors.image_file && <p className="mt-1 text-sm text-red-500">{errors.image_file}</p>}
                            {errors.image_url && <p className="mt-1 text-sm text-red-500">{errors.image_url}</p>}
                            {errors.image && <p className="mt-1 text-sm text-red-500">{errors.image}</p>}
                        </div>

                        {/* Published Status */}
                        <div className="flex items-center">
                            <input
                                id="is_published"
                                type="checkbox"
                                checked={data.is_published}
                                onChange={(e) => setData('is_published', e.target.checked)}
                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                            />
                            <label htmlFor="is_published" className="ml-2 block text-sm text-gray-900">
                                Опубликовать сразу
                            </label>
                        </div>


                        {/* Actions */}
                        <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
                            <Link href="/super-admin/posts">
                                <Button type="button" variant="outline">
                                    Отмена
                                </Button>
                            </Link>
                            <Button
                                type="submit"
                                className="bg-blue-600 hover:bg-blue-700"
                                disabled={processing}
                            >
                                <Save className="w-4 h-4 mr-2" />
                                {processing ? 'Сохранение...' : 'Создать новость'}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </SuperAdminLayout>
    );
}
