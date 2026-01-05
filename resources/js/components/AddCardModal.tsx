import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useForm } from '@inertiajs/react';
import { X } from 'lucide-react';

interface Props {
    isOpen: boolean;
    onClose: () => void;
}

export function AddCardModal({ isOpen, onClose }: Props) {
    const { data, setData, post, processing, errors, reset } = useForm({
        card_holder_name: '',
        card_number: '',
        card_type: 'visa',
        expiry_month: '',
        expiry_year: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/cards', {
            onSuccess: () => {
                onClose();
                reset();
            }
        });
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-sm w-full max-w-md shadow-2xl">
                <div className="bg-[#2B6B8F] px-6 py-4 flex justify-between items-center">
                    <h2 className="text-xl font-bold text-white uppercase">
                        Добавить карту
                    </h2>
                    <button onClick={onClose} className="text-white hover:text-gray-200 transition-colors">
                        <X className="h-6 w-6" />
                    </button>
                </div>
                <div className="p-6">

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <Label htmlFor="card_holder_name" className="text-gray-900 font-semibold">Имя владельца карты *</Label>
                            <Input
                                id="card_holder_name"
                                value={data.card_holder_name}
                                onChange={(e) => setData('card_holder_name', e.target.value)}
                                className={`rounded-sm h-9 ${errors.card_holder_name ? 'border-red-500' : 'border-gray-300'}`}
                            />
                            {errors.card_holder_name && (
                                <p className="text-red-500 text-sm mt-1">{errors.card_holder_name}</p>
                            )}
                        </div>

                        <div>
                            <Label htmlFor="card_number" className="text-gray-900 font-semibold">Номер карты *</Label>
                            <Input
                                id="card_number"
                                value={data.card_number}
                                onChange={(e) => setData('card_number', e.target.value.replace(/\s/g, ''))}
                                placeholder="1234567812345678"
                                maxLength={16}
                                className={`rounded-sm h-9 ${errors.card_number ? 'border-red-500' : 'border-gray-300'}`}
                            />
                            {errors.card_number && (
                                <p className="text-red-500 text-sm mt-1">{errors.card_number}</p>
                            )}
                        </div>

                        <div>
                            <Label htmlFor="card_type" className="text-gray-900 font-semibold">Тип карты *</Label>
                            <select
                                id="card_type"
                                value={data.card_type}
                                onChange={(e) => setData('card_type', e.target.value)}
                                className="w-full h-9 px-3 border border-gray-300 rounded-sm"
                            >
                                <option value="visa">Visa</option>
                                <option value="mastercard">Mastercard</option>
                            </select>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="expiry_month" className="text-gray-900 font-semibold">Месяц *</Label>
                                <Input
                                    id="expiry_month"
                                    value={data.expiry_month}
                                    onChange={(e) => setData('expiry_month', e.target.value)}
                                    placeholder="12"
                                    maxLength={2}
                                    className={`rounded-sm h-9 ${errors.expiry_month ? 'border-red-500' : 'border-gray-300'}`}
                                />
                                {errors.expiry_month && (
                                    <p className="text-red-500 text-sm mt-1">{errors.expiry_month}</p>
                                )}
                            </div>

                            <div>
                                <Label htmlFor="expiry_year" className="text-gray-900 font-semibold">Год *</Label>
                                <Input
                                    id="expiry_year"
                                    value={data.expiry_year}
                                    onChange={(e) => setData('expiry_year', e.target.value)}
                                    placeholder="2025"
                                    maxLength={4}
                                    className={`rounded-sm h-9 ${errors.expiry_year ? 'border-red-500' : 'border-gray-300'}`}
                                />
                                {errors.expiry_year && (
                                    <p className="text-red-500 text-sm mt-1">{errors.expiry_year}</p>
                                )}
                            </div>
                        </div>

                        <div className="flex gap-3 pt-6">
                            <Button
                                type="submit"
                                disabled={processing}
                                className="flex-1 bg-[#2DA5F3] hover:bg-[#2594DD] text-white rounded-sm h-10 font-semibold uppercase"
                            >
                                {processing ? 'Добавление...' : 'Добавить карту'}
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