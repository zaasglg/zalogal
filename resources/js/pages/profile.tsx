import { ProfileSidebar } from '@/components/profile-sidebar';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import { Button } from '@/components/ui/button';
import { AddressModal } from '@/components/AddressModal';
import { AddCardModal } from '@/components/AddCardModal';
import { Toast } from '@/components/Toast';
import { Head, Link, usePage, router } from '@inertiajs/react';
import { User as UserIcon, Trash2 } from 'lucide-react';
import { useState } from 'react';

interface Props {
    auth: any;
    billingAddress: any;
    paymentCards: any[];
    orderStats?: {
        total_orders: number;
        pending_orders: number;
        completed_orders: number;
    };
}

export default function Profile() {
    const page = usePage();
    const { auth, billingAddress, paymentCards, orderStats } = page.props as any;
    const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
    const [isCardModalOpen, setIsCardModalOpen] = useState(false);

    const handleDeleteCard = (cardId: number) => {
        if (confirm('Вы уверены, что хотите удалить эту карту?')) {
            router.delete(`/cards/${cardId}`);
        }
    };

    const getCardGradient = (type: string) => {
        return type === 'visa' 
            ? 'from-[#1E3A5F] to-[#2B5A8E]' 
            : 'from-[#2DB224] to-[#5FD553]';
    };

    return (
        <>
            <Head title="Личный кабинет - Zalogal" />
            <Header />

            <div className="bg-[#F2F4F5] py-4">
                <div className="mx-auto max-w-7xl">
                    <Breadcrumbs
                        breadcrumbs={[
                            { title: 'Главная', href: '/' },
                            { title: 'Личный кабинет', href: '/profile' },
                            { title: 'Панель управления', href: '' },
                        ]}
                    />
                </div>
            </div>

            {/* Main Content */}
            <div className="bg-white py-12">
                <div className="mx-auto max-w-7xl">
                    <div className="grid grid-cols-12 gap-6">
                        {/* Sidebar */}
                        <div className="col-span-3">
                            <ProfileSidebar />
                        </div>

                        {/* Main Content */}
                        <div className="col-span-9">
                            <div>
                                <div className="mb-6">
                                    <h1 className="text-2xl font-bold text-gray-900 mb-2">
                                        Привет, {auth.user?.name || 'Пользователь'}
                                    </h1>
                                    <p className="text-sm text-gray-600">
                                        В приборной панели вы можете легко редактировать свои
                                        личные данные, получать обзор своих последних заказов
                                        и отслеживать свои последние заказы и изменять Пароль и{' '}
                                        <Link href="/profile/settings" className="text-[#2B6B8F] hover:underline">
                                            информация об аккаунте
                                        </Link>
                                        .
                                    </p>
                                </div>

                                <div className="grid grid-cols-8 gap-3 mb-8">
                                    {/* Account Info Card */}
                                    <div className="col-span-3 border border-gray-200 rounded-sm p-6">
                                        <h3 className="font-bold text-gray-900 mb-4 uppercase">
                                            Информация об аккаунте
                                        </h3>
                                        <div className="flex items-center gap-3 mb-4">
                                            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                                                <UserIcon className="h-6 w-6 text-gray-600" />
                                            </div>
                                            <h3 className="font-bold text-gray-900">
                                                {auth.user?.name || 'Пользователь'}
                                            </h3>
                                        </div>
                                        <div className="space-y-2 text-sm mb-4">
                                            <p className="text-gray-600">
                                                Роли:{' '}
                                                <span className="text-gray-900">
                                                    {auth.user?.role || 'Пользователь'}
                                                </span>
                                            </p>
                                            <p className="text-gray-600">
                                                Email:{' '}
                                                <span className="text-gray-900">
                                                    {auth.user?.email || 'Нет email'}
                                                </span>
                                            </p>
                                            <p className="text-gray-600">
                                                Телефон:{' '}
                                                <span className="text-gray-900">
                                                    {auth.user?.phone || 'Нет телефона'}
                                                </span>
                                            </p>
                                        </div>
                                        <Button className="w-full bg-[#2DA5F3] hover:bg-[#2594DD] text-white rounded-none h-12">
                                            РЕДАКТИРОВАТЬ АККАУНТ
                                        </Button>
                                    </div>

                                    {/* Billing Address Card */}
                                    <div className="col-span-3 border border-gray-200 rounded-sm p-6">
                                        <h3 className="font-bold text-gray-900 mb-4">
                                            АДРЕС ПЛАТЕЖА
                                        </h3>
                                        <div className="space-y-2 text-sm mb-4">
                                            <p className="font-semibold text-gray-900">
                                                {billingAddress?.full_name || auth.user?.name || 'Пользователь'}
                                            </p>
                                            <p className="text-gray-600">
                                                {billingAddress?.address_line_1 || 'Адрес не указан'}
                                            </p>
                                            {billingAddress?.address_line_2 && (
                                                <p className="text-gray-600">
                                                    {billingAddress.address_line_2}
                                                </p>
                                            )}
                                            <p className="text-gray-600">
                                                {billingAddress ? `${billingAddress.city}${billingAddress.state ? `, ${billingAddress.state}` : ''} - ${billingAddress.postal_code}, ${billingAddress.country}` : 'Город не указан'}
                                            </p>
                                            <p className="text-gray-600">
                                                Phone Number: {billingAddress?.phone || auth.user?.phone || 'Нет телефона'}
                                            </p>
                                            <p className="text-gray-600">
                                                Email:{' '}
                                                <span className="text-gray-900">
                                                    {auth.user?.email || 'Нет email'}
                                                </span>
                                            </p>
                                        </div>
                                        <Button 
                                            onClick={() => setIsAddressModalOpen(true)}
                                            className="w-full bg-[#2DA5F3] hover:bg-[#2594DD] text-white rounded-none h-12"
                                        >
                                            РЕДАКТИРОВАТЬ АДРЕС
                                        </Button>
                                    </div>

                                    {/* Stats Cards */}
                                    <div className="col-span-2 mb-8">
                                        <div className="space-y-3">
                                            <div className="bg-[#EDF4FE] rounded-sm p-4 flex items-center space-x-4">
                                                <div className="w-10 h-10  rounded-full flex items-center justify-center">
                                                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path opacity="0.2" d="M9.23769 13.9248L5.31269 18.6248C5.21381 18.7402 5.14404 18.8776 5.10924 19.0255C5.07444 19.1734 5.07562 19.3275 5.11269 19.4748L6.65019 26.4373C6.68729 26.6028 6.76587 26.7561 6.87855 26.8829C6.99123 27.0097 7.1343 27.1057 7.2943 27.162C7.45431 27.2182 7.62599 27.2328 7.79321 27.2045C7.96043 27.1761 8.11768 27.1057 8.25019 26.9998L12.0002 23.9998C9.80019 20.1748 9.08769 16.8123 9.23769 13.9248Z" fill="#2DA5F3" />
                                                        <path opacity="0.2" d="M22.6883 13.8379L26.6133 18.5504C26.7122 18.6658 26.7819 18.8031 26.8167 18.9511C26.8515 19.099 26.8503 19.253 26.8133 19.4004L25.2758 26.3504C25.2403 26.5169 25.163 26.6717 25.051 26.8C24.939 26.9282 24.7961 27.0258 24.6359 27.0834C24.4756 27.141 24.3033 27.1567 24.1353 27.129C23.9673 27.1014 23.8091 27.0313 23.6758 26.9254L19.9258 23.9254C22.1258 20.0879 22.8383 16.7254 22.6883 13.8379Z" fill="#2DA5F3" />
                                                        <path d="M18 28H14" stroke="#2DA5F3" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                                        <path d="M15.3749 2.47472C12.9999 4.37472 5.06243 11.9747 11.9999 23.9997H19.9999C26.7999 11.9747 18.9749 4.38722 16.6249 2.47472C16.4496 2.32827 16.2284 2.24805 15.9999 2.24805C15.7715 2.24805 15.5503 2.32827 15.3749 2.47472Z" stroke="#2DA5F3" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                                        <path d="M9.23769 13.9248L5.31269 18.6248C5.21381 18.7402 5.14404 18.8776 5.10924 19.0255C5.07444 19.1734 5.07562 19.3275 5.11269 19.4748L6.65019 26.4373C6.68729 26.6028 6.76587 26.7561 6.87855 26.8829C6.99123 27.0097 7.1343 27.1057 7.2943 27.162C7.45431 27.2182 7.62599 27.2328 7.79321 27.2045C7.96043 27.1761 8.11768 27.1057 8.25019 26.9998L12.0002 23.9998" stroke="#2DA5F3" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                                        <path d="M22.6875 13.8252L26.6875 18.6252C26.7864 18.7406 26.8561 18.878 26.8909 19.0259C26.9258 19.1738 26.9246 19.3278 26.8875 19.4752L25.35 26.4377C25.3129 26.6032 25.2343 26.7565 25.1216 26.8833C25.009 27.0101 24.8659 27.1061 24.7059 27.1623C24.5459 27.2186 24.3742 27.2332 24.207 27.2049C24.0398 27.1765 23.8825 27.1061 23.75 27.0002L20 24.0002" stroke="#2DA5F3" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                                        <path d="M16 13.5C16.8284 13.5 17.5 12.8284 17.5 12C17.5 11.1716 16.8284 10.5 16 10.5C15.1716 10.5 14.5 11.1716 14.5 12C14.5 12.8284 15.1716 13.5 16 13.5Z" fill="#2DA5F3" />
                                                    </svg>

                                                </div>
                                                <div>
                                                    <p className="text-2xl font-bold text-gray-900 mb-0">
                                                        {orderStats?.total_orders ?? 0}
                                                    </p>
                                                    <p className="text-sm text-gray-600">Всего заказов</p>
                                                </div>
                                            </div>
                                            <div className="bg-[#FFF4E6] rounded-sm p-4 flex items-center space-x-4">
                                                <div className="w-10 h-10 rounded-full flex items-center justify-center">
                                                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path opacity="0.2" d="M4 26V7C4 6.73478 4.10536 6.48043 4.29289 6.29289C4.48043 6.10536 4.73478 6 5 6H27C27.2652 6 27.5196 6.10536 27.7071 6.29289C27.8946 6.48043 28 6.73478 28 7V26L24 24L20 26L16 24L12 26L8 24L4 26Z" fill="#FA8232" />
                                                        <path d="M9.5 13H22.5" stroke="#FA8232" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                        <path d="M9.5 17H22.5" stroke="#FA8232" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                        <path d="M4 26V7C4 6.73478 4.10536 6.48043 4.29289 6.29289C4.48043 6.10536 4.73478 6 5 6H27C27.2652 6 27.5196 6.10536 27.7071 6.29289C27.8946 6.48043 28 6.73478 28 7V26L24 24L20 26L16 24L12 26L8 24L4 26Z" stroke="#FA8232" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                    </svg>

                                                </div>
                                                <div>
                                                    <p className="text-2xl font-bold text-gray-900 mb-0">
                                                        {String(orderStats?.pending_orders ?? 0).padStart(2, '0')}
                                                    </p>
                                                    <p className="text-sm text-gray-600">
                                                        В ожидании
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="bg-[#E8F8F0] rounded-sm p-4 flex items-center space-x-4">
                                                <div className="w-10 h-10  rounded-full flex items-center justify-center">
                                                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path opacity="0.2" d="M4.1375 9.3252C4.04693 9.48077 3.99946 9.65768 4 9.8377V22.1627C4.00096 22.3407 4.04884 22.5154 4.13882 22.669C4.2288 22.8226 4.35769 22.9498 4.5125 23.0377L15.5125 29.2252C15.6608 29.3099 15.8292 29.3531 16 29.3502L16.1125 16.0002L4.1375 9.3252Z" fill="#2DB324" />
                                                        <path d="M28 22.1627V9.83766C27.999 9.65963 27.9512 9.485 27.8612 9.33137C27.7712 9.17775 27.6423 9.05057 27.4875 8.96266L16.4875 2.77516C16.3393 2.68958 16.1711 2.64453 16 2.64453C15.8289 2.64453 15.6607 2.68958 15.5125 2.77516L4.5125 8.96266C4.35769 9.05057 4.22879 9.17775 4.13882 9.33137C4.04884 9.485 4.00096 9.65963 4 9.83766V22.1627C4.00096 22.3407 4.04884 22.5153 4.13882 22.6689C4.22879 22.8226 4.35769 22.9497 4.5125 23.0377L15.5125 29.2252C15.6607 29.3107 15.8289 29.3558 16 29.3558C16.1711 29.3558 16.3393 29.3107 16.4875 29.2252L27.4875 23.0377C27.6423 22.9497 27.7712 22.8226 27.8612 22.6689C27.9512 22.5153 27.999 22.3407 28 22.1627V22.1627Z" stroke="#2DB324" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                        <path d="M22.125 19.0625V12.5625L10 5.875" stroke="#2DB324" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                        <path d="M27.8617 9.3252L16.1117 16.0002L4.13672 9.3252" stroke="#2DB324" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                        <path d="M16.1125 16L16 29.35" stroke="#2DB324" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                    </svg>

                                                </div>
                                                <div>
                                                    <p className="text-2xl font-bold text-gray-900 mb-0">
                                                        {orderStats?.completed_orders ?? 0}
                                                    </p>
                                                    <p className="text-sm text-gray-600">
                                                        Завершенные заказы
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Payment Cards */}
                                <div>
                                    <div className="flex items-center justify-between mb-4">
                                        <h2 className="text-xl font-bold text-gray-900">
                                            СПИСОК ОТЗЫВОК
                                        </h2>
                                        <Link
                                            href="/cards"
                                            className="text-sm text-[#2DA5F3] hover:underline flex items-center gap-1"
                                        >
                                            Посмотреть все
                                            <span>→</span>
                                        </Link>
                                    </div>
                                    <div className="grid grid-cols-3 gap-4">
                                        {paymentCards?.map((card: any) => (
                                            <div key={card.id} className={`relative bg-gradient-to-br ${getCardGradient(card.card_type)} rounded-lg p-6 text-white overflow-hidden group`}>
                                                <button
                                                    onClick={() => handleDeleteCard(card.id)}
                                                    className="absolute top-2 right-2 p-2 bg-white/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white/30"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </button>
                                                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16" />
                                                <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-12 -mb-12" />
                                                <div className="relative">
                                                    <p className="text-xs mb-4 opacity-80">
                                                        Номер карты
                                                    </p>
                                                    <p className="text-sm mb-2 tracking-wider">
                                                        **** **** **** {card.card_number_last4}
                                                    </p>
                                                    <div className="flex items-center justify-between">
                                                        <div>
                                                            <p className="text-xs opacity-80">
                                                                Владелец карты
                                                            </p>
                                                            <p className="text-sm font-semibold">
                                                                {card.card_holder_name.toUpperCase()}
                                                            </p>
                                                        </div>
                                                        <div className="text-2xl font-bold">
                                                            {card.card_type.toUpperCase()}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}

                                        <button 
                                            onClick={() => setIsCardModalOpen(true)}
                                            className="border-2 border-dashed border-gray-300 rounded-md p-6 flex flex-col items-center justify-center gap-3 hover:border-[#2DA5F3] hover:bg-blue-50/30 transition-colors"
                                        >
                                            <div className="w-12 h-12 border-2 border-gray-300 rounded-full flex items-center justify-center">
                                                <span className="text-3xl text-gray-400">
                                                    +
                                                </span>
                                            </div>
                                            <p className="text-sm font-semibold text-gray-700">
                                                Добавить карту
                                            </p>
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Hot Products */}
                            <div className="mt-8">
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-xl font-bold text-gray-900">
                                        ГОРЯЧИЕ ТОВАРЫ
                                    </h2>
                                    <Link
                                        href="/products"
                                        className="text-sm text-[#2DA5F3] hover:underline flex items-center gap-1"
                                    >
                                        Посмотреть все
                                        <span>→</span>
                                    </Link>
                                </div>
                                <div className="grid grid-cols-4 divide-x">
                                    {[1, 2, 3, 4].map((item) => (
                                        <div
                                            key={item}
                                            className="hover:shadow-2xl transition-shadow p-3"
                                        >
                                            <div className="aspect-square bg-gray-100 rounded-sm mb-3 flex items-center justify-center">
                                                <img
                                                    src={`https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop`}
                                                    alt="Product"
                                                    className="w-full h-full object-cover rounded-sm"
                                                />
                                            </div>
                                            <div className="flex gap-1 mb-2">
                                                {[...Array(5)].map((_, i) => (
                                                    <svg
                                                        key={i}
                                                        className="w-3 h-3 fill-[#FA8232]"
                                                        viewBox="0 0 20 20"
                                                    >
                                                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                                                    </svg>
                                                ))}
                                            </div>
                                            <h3 className="text-sm font-medium text-gray-900 mb-2 line-clamp-2">
                                                Название продукта {item}
                                            </h3>
                                            <p className="text-sm font-bold text-[#2DA5F3]">
                                                450 000 ₸
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
            
            <AddressModal
                address={billingAddress}
                isOpen={isAddressModalOpen}
                onClose={() => setIsAddressModalOpen(false)}
            />
            
            <AddCardModal
                isOpen={isCardModalOpen}
                onClose={() => setIsCardModalOpen(false)}
            />
            
            <Toast />
        </>
    );
}
