import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useForm } from '@inertiajs/react';
import { X } from 'lucide-react';

interface Address {
    id?: number;
    full_name: string;
    address_line_1: string;
    address_line_2?: string;
    city: string;
    state?: string;
    postal_code: string;
    country: string;
    phone?: string;
}

interface Props {
    address?: Address;
    isOpen: boolean;
    onClose: () => void;
}

export function AddressModal({ address, isOpen, onClose }: Props) {
    const { data, setData, post, processing, errors, reset } = useForm({
        full_name: address?.full_name || '',
        address_line_1: address?.address_line_1 || '',
        address_line_2: address?.address_line_2 || '',
        city: address?.city || '',
        state: address?.state || '',
        postal_code: address?.postal_code || '',
        country: address?.country || 'Казахстан',
        phone: address?.phone || '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/address/update', {
            onSuccess: () => {
                onClose();
                reset();
            }
        });
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-sm w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
                <div className="bg-[#2B6B8F] px-6 py-4 flex justify-between items-center">
                    <h2 className="text-xl font-bold text-white uppercase">
                        Редактировать адрес платежа
                    </h2>
                    <button onClick={onClose} className="text-white hover:text-gray-200 transition-colors">
                        <X className="h-6 w-6" />
                    </button>
                </div>
                <div className="p-6">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <Label htmlFor="full_name" className="text-gray-900 font-semibold">Полное имя *</Label>
                            <Input
                                id="full_name"
                                value={data.full_name}
                                onChange={(e) => setData('full_name', e.target.value)}
                                className={`rounded-sm h-9 ${errors.full_name ? 'border-red-500' : 'border-gray-300'}`}
                            />
                            {errors.full_name && (
                                <p className="text-red-500 text-sm mt-1">{errors.full_name}</p>
                            )}
                        </div>

                        <div>
                            <Label htmlFor="address_line_1" className="text-gray-900 font-semibold">Адрес (строка 1) *</Label>
                            <Input
                                id="address_line_1"
                                value={data.address_line_1}
                                onChange={(e) => setData('address_line_1', e.target.value)}
                                className={`rounded-sm h-9 ${errors.address_line_1 ? 'border-red-500' : 'border-gray-300'}`}
                            />
                            {errors.address_line_1 && (
                                <p className="text-red-500 text-sm mt-1">{errors.address_line_1}</p>
                            )}
                        </div>

                        <div>
                            <Label htmlFor="address_line_2" className="text-gray-900 font-semibold">Адрес (строка 2)</Label>
                            <Input
                                id="address_line_2"
                                value={data.address_line_2}
                                onChange={(e) => setData('address_line_2', e.target.value)}
                                className="rounded-sm h-9 border-gray-300"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="city" className="text-gray-900 font-semibold">Город *</Label>
                                <Input
                                    id="city"
                                    value={data.city}
                                    onChange={(e) => setData('city', e.target.value)}
                                    className={`rounded-sm h-9 ${errors.city ? 'border-red-500' : 'border-gray-300'}`}
                                />
                                {errors.city && (
                                    <p className="text-red-500 text-sm mt-1">{errors.city}</p>
                                )}
                            </div>

                            <div>
                                <Label htmlFor="state" className="text-gray-900 font-semibold">Область/Регион</Label>
                                <Input
                                    id="state"
                                    value={data.state}
                                    onChange={(e) => setData('state', e.target.value)}
                                    className="rounded-sm h-9 border-gray-300"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="postal_code" className="text-gray-900 font-semibold">Почтовый индекс *</Label>
                                <Input
                                    id="postal_code"
                                    value={data.postal_code}
                                    onChange={(e) => setData('postal_code', e.target.value)}
                                    className={`rounded-sm h-9 ${errors.postal_code ? 'border-red-500' : 'border-gray-300'}`}
                                />
                                {errors.postal_code && (
                                    <p className="text-red-500 text-sm mt-1">{errors.postal_code}</p>
                                )}
                            </div>

                            <div>
                                <Label htmlFor="country" className="text-gray-900 font-semibold">Страна *</Label>
                                <Input
                                    id="country"
                                    value={data.country}
                                    onChange={(e) => setData('country', e.target.value)}
                                    className={`rounded-sm h-9 ${errors.country ? 'border-red-500' : 'border-gray-300'}`}
                                />
                                {errors.country && (
                                    <p className="text-red-500 text-sm mt-1">{errors.country}</p>
                                )}
                            </div>
                        </div>

                        <div>
                            <Label htmlFor="phone" className="text-gray-900 font-semibold">Телефон</Label>
                            <Input
                                id="phone"
                                value={data.phone}
                                onChange={(e) => setData('phone', e.target.value)}
                                className="rounded-sm h-9 border-gray-300"
                            />
                        </div>

                        <div className="flex gap-3 pt-6">
                            <Button
                                type="submit"
                                disabled={processing}
                                className="flex-1 bg-[#2DA5F3] hover:bg-[#2594DD] text-white rounded-sm h-10 font-semibold uppercase"
                            >
                                {processing ? 'Сохранение...' : 'Сохранить адрес'}
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