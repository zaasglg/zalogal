import { useEffect, useState } from 'react';
import { usePage } from '@inertiajs/react';
import { CheckCircle, XCircle, X } from 'lucide-react';

export function Toast() {
    const { flash } = usePage().props as any;
    const [visible, setVisible] = useState(false);
    const [message, setMessage] = useState('');
    const [type, setType] = useState<'success' | 'error'>('success');

    useEffect(() => {
        if (flash?.success) {
            setMessage(flash.success);
            setType('success');
            setVisible(true);
            setTimeout(() => setVisible(false), 3000);
        } else if (flash?.error) {
            setMessage(flash.error);
            setType('error');
            setVisible(true);
            setTimeout(() => setVisible(false), 3000);
        }
    }, [flash]);

    if (!visible) return null;

    return (
        <div className="fixed top-4 right-4 z-[100] animate-in slide-in-from-top-2">
            <div className={`flex items-center gap-3 px-4 py-3 rounded-sm shadow-lg min-w-[300px] ${
                type === 'success' 
                    ? 'bg-green-50 border border-green-200' 
                    : 'bg-red-50 border border-red-200'
            }`}>
                {type === 'success' ? (
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                ) : (
                    <XCircle className="h-5 w-5 text-red-600 flex-shrink-0" />
                )}
                <p className={`text-sm font-medium flex-1 ${
                    type === 'success' ? 'text-green-900' : 'text-red-900'
                }`}>
                    {message}
                </p>
                <button
                    onClick={() => setVisible(false)}
                    className={`flex-shrink-0 ${
                        type === 'success' 
                            ? 'text-green-600 hover:text-green-800' 
                            : 'text-red-600 hover:text-red-800'
                    }`}
                >
                    <X className="h-4 w-4" />
                </button>
            </div>
        </div>
    );
}