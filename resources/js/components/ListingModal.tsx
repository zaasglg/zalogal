import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RichTextEditor } from '@/components/RichTextEditor';
import { useForm } from '@inertiajs/react';
import { X, Upload, Trash, Download, Plus, Minus } from 'lucide-react';
import { useState, useEffect } from 'react';

interface Specification {
    key: string;
    value: string;
}

interface Listing {
    id: number;
    title: string;
    description: string;
    specifications?: Specification[] | null;
    price: number;
    category: string;
    condition: string;
    location: string;
    images: string[] | null;
}

interface Category {
    id: number;
    name: string;
}

interface Props {
    isOpen: boolean;
    onClose: () => void;
    listing?: Listing | null;
    categories?: Category[];
}

export function ListingModal({ isOpen, onClose, listing, categories = [] }: Props) {
    const [imagePreviews, setImagePreviews] = useState<string[]>([]);
    const [existingImages, setExistingImages] = useState<string[]>([]);
    const [uploadMethod, setUploadMethod] = useState<'file' | 'url'>('file');
    
    const { data, setData, post, put, processing, errors, reset, clearErrors } = useForm({
        title: '',
        description: '',
        specifications: [] as Specification[],
        price: '',
        category: '',
        condition: 'new',
        location: '',
        images: [] as File[],
        image_urls: [] as string[],
        existing_images: [] as string[],
    });

    useEffect(() => {
        if (listing) {
            const existing = listing.images || [];
            setExistingImages(existing);
            setData({
                title: listing.title,
                description: listing.description,
                specifications: listing.specifications || [],
                price: listing.price.toString(),
                category: listing.category,
                condition: listing.condition,
                location: listing.location,
                images: [],
                image_urls: [],
                existing_images: existing,
            });
            setImagePreviews(existing);
            clearErrors();
        } else {
            setExistingImages([]);
            reset();
            setImagePreviews([]);
            clearErrors();
        }
    }, [listing, isOpen]);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        setData('images', files);
        setData('image_urls', []);
        
        const filePreviews = files.map(file => URL.createObjectURL(file));
        setImagePreviews([...existingImages, ...filePreviews]);
    };

    const handleAddImageUrl = () => {
        const newUrls = [...(data.image_urls || []), ''];
        setData('image_urls', newUrls);
    };

    const handleImageUrlChange = (index: number, url: string) => {
        const newUrls = [...(data.image_urls || [])];
        newUrls[index] = url;
        setData('image_urls', newUrls);
        setData('images', []);
        
        // Обновляем превью только для заполненных URL
        const urlPreviews = newUrls.filter(u => u && u.trim() !== '');
        setImagePreviews([...existingImages, ...urlPreviews]);
    };

    const removeImageUrl = (index: number) => {
        const newUrls = (data.image_urls || []).filter((_, i) => i !== index);
        setData('image_urls', newUrls);
        
        // Обновляем превью (учитываем существующие изображения)
        const urlPreviews = newUrls.filter(u => u && u.trim() !== '');
        setImagePreviews([...existingImages, ...urlPreviews]);
    };

    const removeImage = (index: number) => {
        // Если удаляем существующее изображение
        if (index < existingImages.length) {
            const newExisting = existingImages.filter((_, i) => i !== index);
            setExistingImages(newExisting);
            setData('existing_images', newExisting);
            setImagePreviews([...newExisting, ...imagePreviews.slice(existingImages.length)]);
        } 
        // Если удаляем новое изображение
        else {
            const newIndex = index - existingImages.length;
            if (uploadMethod === 'file') {
                const newImages = data.images.filter((_, i) => i !== newIndex);
                setData('images', newImages);
                
                // Обновляем превью для файлов
                const filePreviews = newImages.map(file => URL.createObjectURL(file));
                setImagePreviews([...existingImages, ...filePreviews]);
            } else {
                removeImageUrl(newIndex);
            }
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        if (listing) {
            put(`/listings/${listing.id}`, {
                onSuccess: () => {
                    onClose();
                    reset();
                    setImagePreviews([]);
                }
            });
        } else {
            post('/listings', {
                onSuccess: () => {
                    onClose();
                    reset();
                    setImagePreviews([]);
                }
            });
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-sm w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
                <div className="bg-[#2B6B8F] px-6 py-4 flex justify-between items-center">
                    <h2 className="text-xl font-bold text-white uppercase">
                        {listing ? 'Редактировать объявление' : 'Создать объявление'}
                    </h2>
                    <button onClick={onClose} className="text-white hover:text-gray-200 transition-colors">
                        <X className="h-6 w-6" />
                    </button>
                </div>
                <div className="p-6">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <Label htmlFor="title" className="text-gray-900 font-semibold">Название *</Label>
                            <Input
                                id="title"
                                value={data.title}
                                onChange={(e) => setData('title', e.target.value)}
                                className={`rounded-sm h-9 ${errors.title ? 'border-red-500' : 'border-gray-300'}`}
                            />
                            {errors.title && (
                                <p className="text-red-500 text-sm mt-1">{errors.title}</p>
                            )}
                        </div>

                        <div>
                            <Label htmlFor="description" className="text-gray-900 font-semibold">Описание *</Label>
                            <RichTextEditor
                                value={data.description}
                                onChange={(value) => setData('description', value)}
                                placeholder="Введите описание объявления..."
                                className="mt-1"
                                error={errors.description}
                            />
                        </div>

                        <div>
                            <div className="flex justify-between items-center mb-2">
                                <Label className="text-gray-900 font-semibold">Характеристики</Label>
                                <Button
                                    type="button"
                                    onClick={() => {
                                        const newSpecs = [...(data.specifications || []), { key: '', value: '' }];
                                        setData('specifications', newSpecs);
                                    }}
                                    variant="outline"
                                    size="sm"
                                    className="rounded-sm text-sm"
                                >
                                    <Plus className="h-4 w-4 mr-1" />
                                    Добавить
                                </Button>
                            </div>
                            <div className="space-y-2">
                                {(data.specifications || []).map((spec, index) => (
                                    <div key={index} className="flex gap-2">
                                        <Input
                                            type="text"
                                            value={spec.key}
                                            onChange={(e) => {
                                                const newSpecs = [...(data.specifications || [])];
                                                newSpecs[index] = { ...newSpecs[index], key: e.target.value };
                                                setData('specifications', newSpecs);
                                            }}
                                            placeholder="Название характеристики"
                                            className="rounded-sm h-9 flex-1"
                                        />
                                        <Input
                                            type="text"
                                            value={spec.value}
                                            onChange={(e) => {
                                                const newSpecs = [...(data.specifications || [])];
                                                newSpecs[index] = { ...newSpecs[index], value: e.target.value };
                                                setData('specifications', newSpecs);
                                            }}
                                            placeholder="Значение"
                                            className="rounded-sm h-9 flex-1"
                                        />
                                        <Button
                                            type="button"
                                            onClick={() => {
                                                const newSpecs = (data.specifications || []).filter((_, i) => i !== index);
                                                setData('specifications', newSpecs);
                                            }}
                                            variant="outline"
                                            size="sm"
                                            className="rounded-sm text-red-600 hover:text-red-700 hover:bg-red-50"
                                        >
                                            <Minus className="h-4 w-4" />
                                        </Button>
                                    </div>
                                ))}
                                {(!data.specifications || data.specifications.length === 0) && (
                                    <p className="text-sm text-gray-500 italic">
                                        Нажмите "Добавить" чтобы добавить характеристику (например: Бренд, Модель, Год выпуска)
                                    </p>
                                )}
                            </div>
                            {errors.specifications && (
                                <p className="text-red-500 text-sm mt-1">{errors.specifications}</p>
                            )}
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="price" className="text-gray-900 font-semibold">Цена (₸) *</Label>
                                <Input
                                    id="price"
                                    type="number"
                                    value={data.price}
                                    onChange={(e) => setData('price', e.target.value)}
                                    className={`rounded-sm h-9 ${errors.price ? 'border-red-500' : 'border-gray-300'}`}
                                />
                                {errors.price && (
                                    <p className="text-red-500 text-sm mt-1">{errors.price}</p>
                                )}
                            </div>

                            <div>
                                <Label htmlFor="category" className="text-gray-900 font-semibold">Категория *</Label>
                                <select
                                    id="category"
                                    value={data.category}
                                    onChange={(e) => setData('category', e.target.value)}
                                    className={`w-full h-9 px-3 border rounded-sm ${errors.category ? 'border-red-500' : 'border-gray-300'}`}
                                >
                                    <option value="">Выберите категорию</option>
                                    {categories.map((category) => (
                                        <option key={category.id} value={category.name}>
                                            {category.name}
                                        </option>
                                    ))}
                                </select>
                                {errors.category && (
                                    <p className="text-red-500 text-sm mt-1">{errors.category}</p>
                                )}
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="condition" className="text-gray-900 font-semibold">Состояние *</Label>
                                <select
                                    id="condition"
                                    value={data.condition}
                                    onChange={(e) => setData('condition', e.target.value)}
                                    className="w-full h-9 px-3 border border-gray-300 rounded-sm"
                                >
                                    <option value="new">Новое</option>
                                    <option value="excellent">Отличное</option>
                                    <option value="good">Хорошее</option>
                                    <option value="used">Б/У</option>
                                </select>
                            </div>

                            <div>
                                <Label htmlFor="location" className="text-gray-900 font-semibold">Локация *</Label>
                                <Input
                                    id="location"
                                    value={data.location}
                                    onChange={(e) => setData('location', e.target.value)}
                                    className={`rounded-sm h-9 ${errors.location ? 'border-red-500' : 'border-gray-300'}`}
                                />
                                {errors.location && (
                                    <p className="text-red-500 text-sm mt-1">{errors.location}</p>
                                )}
                            </div>
                        </div>

                        <div>
                            <Label className="text-gray-900 font-semibold">Фото</Label>
                            
                            {/* Способ загрузки */}
                            <div className="mt-2 flex gap-2 mb-4">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setUploadMethod('file');
                                        setData('image_urls', []);
                                        // Сохраняем существующие и новые файлы
                                        if (data.images && data.images.length > 0) {
                                            const filePreviews = data.images.map((file: File) => URL.createObjectURL(file));
                                            setImagePreviews([...existingImages, ...filePreviews]);
                                        } else {
                                            setImagePreviews([...existingImages]);
                                        }
                                    }}
                                    className={`px-4 py-2 rounded-sm border transition-colors text-sm ${
                                        uploadMethod === 'file'
                                            ? 'bg-[#2DA5F3] text-white border-[#2DA5F3]'
                                            : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                                    }`}
                                >
                                    <Upload className="w-4 h-4 inline mr-2" />
                                    Загрузить файл
                                </button>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setUploadMethod('url');
                                        setData('images', []);
                                        // Сохраняем существующие и новые URL
                                        if (data.image_urls && data.image_urls.length > 0) {
                                            const urlPreviews = data.image_urls.filter((u: string) => u && u.trim() !== '');
                                            setImagePreviews([...existingImages, ...urlPreviews]);
                                        } else {
                                            setImagePreviews([...existingImages]);
                                        }
                                    }}
                                    className={`px-4 py-2 rounded-sm border transition-colors text-sm ${
                                        uploadMethod === 'url'
                                            ? 'bg-[#2DA5F3] text-white border-[#2DA5F3]'
                                            : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                                    }`}
                                >
                                    <Download className="w-4 h-4 inline mr-2" />
                                    Загрузить с URL
                                </button>
                            </div>

                            {/* Загрузка файлов */}
                            {uploadMethod === 'file' && (
                                <div className="mt-2">
                                    <label className="flex items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-sm cursor-pointer hover:border-[#2DA5F3] transition-colors">
                                        <div className="text-center">
                                            <Upload className="mx-auto h-8 w-8 text-gray-400" />
                                            <p className="mt-2 text-sm text-gray-600">Загрузить фото</p>
                                        </div>
                                        <input
                                            id="images"
                                            type="file"
                                            multiple
                                            accept="image/*"
                                            onChange={handleImageChange}
                                            className="hidden"
                                        />
                                    </label>
                                    <p className="mt-1 text-sm text-gray-500">
                                        Максимальный размер: 2MB. Поддерживаемые форматы: JPG, PNG, GIF, WebP
                                    </p>
                                </div>
                            )}

                            {/* Загрузка по URL */}
                            {uploadMethod === 'url' && (
                                <div className="mt-2 space-y-2">
                                    {(data.image_urls || []).map((url, index) => (
                                        <div key={index} className="flex gap-2">
                                            <Input
                                                type="url"
                                                value={url}
                                                onChange={(e) => handleImageUrlChange(index, e.target.value)}
                                                placeholder="https://example.com/image.jpg"
                                                className="rounded-sm h-9"
                                            />
                                            <Button
                                                type="button"
                                                onClick={() => removeImageUrl(index)}
                                                variant="outline"
                                                size="sm"
                                                className="rounded-sm"
                                            >
                                                <Trash className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    ))}
                                    <Button
                                        type="button"
                                        onClick={handleAddImageUrl}
                                        variant="outline"
                                        className="rounded-sm"
                                    >
                                        <Plus className="h-4 w-4 mr-2" />
                                        Добавить URL
                                    </Button>
                                    <p className="mt-1 text-sm text-gray-500">
                                        Изображения будут загружены и сохранены на сервере
                                    </p>
                                </div>
                            )}

                            {/* Превью изображений */}
                            {imagePreviews.length > 0 && (
                                <div className="grid grid-cols-4 gap-2 mt-3">
                                    {imagePreviews.map((preview, index) => (
                                        <div key={index} className="relative group">
                                            <img
                                                src={preview}
                                                alt={`Preview ${index + 1}`}
                                                className="w-full h-20 object-cover rounded-sm"
                                                onError={(e) => {
                                                    (e.target as HTMLImageElement).style.display = 'none';
                                                }}
                                            />
                                            <button
                                                type="button"
                                                onClick={() => removeImage(index)}
                                                className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                            >
                                                <Trash className="h-3 w-3" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className="flex gap-3 pt-6">
                            <Button
                                type="submit"
                                disabled={processing}
                                className="flex-1 bg-[#2DA5F3] hover:bg-[#2594DD] text-white rounded-sm h-10 font-semibold uppercase"
                            >
                                {processing ? 'Сохранение...' : (listing ? 'Обновить' : 'Создать')}
                            </Button>
                            
                            <Button 
                                type="button" 
                                variant="outline" 
                                onClick={onClose}
                                className="flex-1 border-gray-300 rounded-sm h-10 font-semibold uppercase hover:bg-gray-50"
                            >
                                Отмена
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}