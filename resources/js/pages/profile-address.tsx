import { ProfileSidebar } from '@/components/profile-sidebar';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Head, Link } from '@inertiajs/react';
import { ArrowRight, Copy, MoreHorizontal } from 'lucide-react';

export default function ProfileAddress() {
    return (
        <>
            <Head title="Карта & адрес - Zalogal" />
            <Header />

            <div className="bg-[#F2F4F5] py-4">
                <div className="mx-auto max-w-7xl">
                    <Breadcrumbs
                        breadcrumbs={[
                            { title: 'Главная', href: '/' },
                            { title: 'User Account', href: '/profile' },
                            { title: 'Dashboard', href: '/dashboard' },
                            { title: 'Cards & Address', href: '' },
                        ]}
                    />
                </div>
            </div>

            <div className="mx-auto max-w-7xl py-12">
                <div className="grid grid-cols-12 gap-6">
                    {/* Sidebar */}
                    <div className="col-span-3">
                        <ProfileSidebar />
                    </div>

                    {/* Main Content */}
                    <div className="col-span-9">
                        {/* Payment Option */}
                        <div className="bg-white rounded-sm border border-gray-200 mb-6">
                            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
                                <h2 className="text-sm font-bold text-gray-900 uppercase">
                                    СПОСОБ ОПЛАТЫ
                                </h2>
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <button className="text-[#FA8232] text-sm font-bold flex items-center gap-2 hover:underline">
                                            Добавить карточку
                                            <ArrowRight className="h-4 w-4" />
                                        </button>
                                    </DialogTrigger>
                                    <DialogContent className="sm:max-w-[500px] p-0 gap-0 overflow-hidden bg-white">
                                        <DialogHeader className="px-6 py-4 border-b border-gray-100">
                                            <DialogTitle className="text-sm font-bold text-gray-900 uppercase tracking-wide">
                                                ДОБАВИТЬ НОВУЮ КАРТУ
                                            </DialogTitle>
                                        </DialogHeader>
                                        <div className="p-6 space-y-4">
                                            <div className="space-y-2">
                                                <Label htmlFor="name" className="text-sm text-gray-900 font-normal">Имя на карте</Label>
                                                <Input id="name" className="h-11 rounded-sm border-gray-200" />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="number" className="text-sm text-gray-900 font-normal">Номер карты</Label>
                                                <Input id="number" className="h-11 rounded-sm border-gray-200" />
                                            </div>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="space-y-2">
                                                    <Label htmlFor="expire" className="text-sm text-gray-900 font-normal">Срок действия</Label>
                                                    <Input id="expire" className="h-11 rounded-sm border-gray-200" />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label htmlFor="cvc" className="text-sm text-gray-900 font-normal">CVC</Label>
                                                    <Input id="cvc" className="h-11 rounded-sm border-gray-200" />
                                                </div>
                                            </div>
                                            <div className="pt-2">
                                                <Button className="bg-[#FA8232] hover:bg-[#e06918] text-white font-bold uppercase text-sm h-12 px-8 rounded-sm">
                                                    ДОБАВИТЬ КАРТУ
                                                </Button>
                                            </div>
                                        </div>
                                    </DialogContent>
                                </Dialog>
                            </div>
                            <div className="p-6">
                                <div className="grid grid-cols-2 gap-6">
                                    {/* Visa Card */}
                                    <div className="relative bg-[#1E3A5F] rounded-lg p-6 text-white overflow-hidden h-48 flex flex-col justify-between">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <p className="text-2xl font-bold mb-1">$95, 400.00 <span className="text-sm font-normal opacity-80">USD</span></p>
                                                <p className="text-xs opacity-60 uppercase">Номер карты</p>
                                            </div>
                                            <MoreHorizontal className="h-6 w-6 opacity-80 cursor-pointer" />
                                        </div>

                                        <div className="flex items-center gap-4 mb-4">
                                            <p className="text-xl tracking-widest font-mono">**** **** **** 3814</p>
                                            <Copy className="h-4 w-4 opacity-60 cursor-pointer hover:opacity-100" />
                                        </div>

                                        <div className="flex justify-between items-end">
                                            <div className="text-2xl font-bold italic">VISA</div>
                                            <div className="text-sm font-medium">Kevin Gilbert</div>
                                        </div>
                                    </div>

                                    {/* Mastercard */}
                                    <div className="relative bg-[#2DB224] rounded-lg p-6 text-white overflow-hidden h-48 flex flex-col justify-between">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <p className="text-2xl font-bold mb-1">$87, 583.00 <span className="text-sm font-normal opacity-80">USD</span></p>
                                                <p className="text-xs opacity-60 uppercase">Номер карты</p>
                                            </div>
                                            <MoreHorizontal className="h-6 w-6 opacity-80 cursor-pointer" />
                                        </div>

                                        <div className="flex items-center gap-4 mb-4">
                                            <p className="text-xl tracking-widest font-mono">**** **** **** 1761</p>
                                            <Copy className="h-4 w-4 opacity-60 cursor-pointer hover:opacity-100" />
                                        </div>

                                        <div className="flex justify-between items-end">
                                            <div className="flex gap-1">
                                                <div className="w-8 h-8 bg-red-500 rounded-full opacity-90" />
                                                <div className="w-8 h-8 bg-yellow-400 rounded-full opacity-90 -ml-4" />
                                            </div>
                                            <div className="text-sm font-medium">Kevin Gilbert</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                            {/* Billing Address */}
                            <div className="bg-white rounded-sm border border-gray-200">
                                <div className="p-6 border-b border-gray-200">
                                    <h2 className="text-sm font-bold text-gray-900 uppercase">
                                        платежный адрес
                                    </h2>
                                </div>
                                <div className="p-6">
                                    <h3 className="font-bold text-gray-900 mb-3">Kevin Gilbert</h3>
                                    <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                                        East Tejturi Bazar, Word No. 04, Road No. 13/x, House no. 1320/C, Flat No. 5D, Dhaka - 1200, Bangladesh
                                    </p>
                                    <div className="space-y-2 text-sm mb-6">
                                        <p className="text-gray-900"><span className="text-gray-600">Телефон:</span> +1-202-555-0118</p>
                                        <p className="text-gray-900"><span className="text-gray-600">Email:</span> kevin.gilbert@gmail.com</p>
                                    </div>
                                    <Button variant="outline" className="text-[#2DA5F3]  border-[#2DA5F3] hover:bg-[#2DA5F3] hover:text-white font-bold uppercase text-xs px-6 py-3 h-auto !rounded-xs">
                                        Изменить адрес
                                    </Button>
                                </div>
                            </div>

                            {/* Shipping Address */}
                            <div className="bg-white rounded-sm border border-gray-200">
                                <div className="p-6 border-b border-gray-200">
                                    <h2 className="text-sm font-bold text-gray-900 uppercase">
                                        адрес доставки
                                    </h2>
                                </div>
                                <div className="p-6">
                                    <h3 className="font-bold text-gray-900 mb-3">Kevin Gilbert</h3>
                                    <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                                        East Tejturi Bazar, Word No. 04, Road No. 13/x, House no. 1320/C, Flat No. 5D, Dhaka - 1200, Bangladesh
                                    </p>
                                    <div className="space-y-2 text-sm mb-6">
                                        <p className="text-gray-900"><span className="text-gray-600">Телефон:</span> +1-202-555-0118</p>
                                        <p className="text-gray-900"><span className="text-gray-600">Email:</span> kevin.gilbert@gmail.com</p>
                                    </div>
                                    <Button variant="outline" className="text-[#2DA5F3] border-[#2DA5F3] hover:bg-[#2DA5F3] hover:text-white font-bold uppercase text-xs px-6 py-3 h-auto !rounded-xs">
                                        Изменить адрес
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </>
    );
}
