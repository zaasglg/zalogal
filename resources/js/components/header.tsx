import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { Link, usePage, router } from '@inertiajs/react';
import {
    ChevronDown,
    Heart,
    Menu,
    Search,
    ShoppingCart,
    User,
    LogOut,
    X,
} from 'lucide-react';
import { useState } from 'react';

export function Header() {
    const { url, props } = usePage();
    const auth = props.auth as { user: { id: number; name: string; email: string; role: string } | null };
    const isTrackOrderActive = url.startsWith('/track-order');
    const isProductsActive = url.startsWith('/products');
    const isCompareActive = url.startsWith('/compare');
    const isBlogActive = url.startsWith('/blog');
    const isSupportActive = url.startsWith('/support');
    const isFAQActive = url.startsWith('/faq');

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);

    const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
    const closeMobileMenu = () => setIsMobileMenuOpen(false);

    return (
        <header className="w-full bg-[#2B6B8F]">
            {/* Top Bar - Hidden on mobile */}
            <div className="border-b border-[#3A7FA8] hidden md:block">
                <div className="mx-auto flex h-10 max-w-7xl items-center justify-between px-4 py-4 text-sm text-white">
                    <div className="flex items-center space-x-2">
                        <span>Добро пожаловать в портал заголовые имущества</span>
                        <span className="font-semibold">Zalog.AI</span>
                    </div>
                    <div className="flex items-center space-x-4">
                        <Link href="/cart" className="flex items-center space-x-1 hover:text-white/80">
                            <svg width="28" height="28" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M10 29C11.1046 29 12 28.1046 12 27C12 25.8954 11.1046 25 10 25C8.89543 25 8 25.8954 8 27C8 28.1046 8.89543 29 10 29Z" fill="white" />
                                <path d="M23 29C24.1046 29 25 28.1046 25 27C25 25.8954 24.1046 25 23 25C21.8954 25 21 25.8954 21 27C21 28.1046 21.8954 29 23 29Z" fill="white" />
                                <path d="M5.2875 9H27.7125L24.4125 20.55C24.2948 20.9692 24.0426 21.3381 23.6948 21.6001C23.3471 21.862 22.9229 22.0025 22.4875 22H10.5125C10.0771 22.0025 9.65293 21.862 9.30515 21.6001C8.95738 21.3381 8.70524 20.9692 8.5875 20.55L4.0625 4.725C4.0027 4.51594 3.8764 4.33207 3.70271 4.20125C3.52903 4.07042 3.31744 3.99977 3.1 4H1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </Link>
                        <Link href="/wishlist" className="flex items-center space-x-1 hover:text-white/80">
                            <svg width="28" height="28" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M16 27C16 27 3.5 20 3.5 11.5C3.5 9.99737 4.02062 8.54114 4.97328 7.37908C5.92593 6.21703 7.25178 5.42093 8.72525 5.12624C10.1987 4.83154 11.7288 5.05646 13.0551 5.76272C14.3814 6.46898 15.4221 7.61296 16 9.00001C16.5779 7.61296 17.6186 6.46898 18.9449 5.76272C20.2712 5.05646 21.8013 4.83154 23.2748 5.12624C24.7482 5.42093 26.0741 6.21703 27.0267 7.37908C27.9794 8.54114 28.5 9.99737 28.5 11.5C28.5 20 16 27 16 27Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </Link>
                        {auth.user ? (
                            <div className="relative group">
                                <button className="flex items-center justify-between space-x-2 hover:text-white/80">
                                    <svg width="28" height="28" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M16 20C20.4183 20 24 16.4183 24 12C24 7.58172 20.4183 4 16 4C11.5817 4 8 7.58172 8 12C8 16.4183 11.5817 20 16 20Z" stroke="white" strokeWidth="2" strokeMiterlimit="10" />
                                        <path d="M3.875 27.0001C5.10367 24.8716 6.87104 23.104 8.99944 21.875C11.1278 20.646 13.5423 19.999 16 19.999C18.4577 19.999 20.8722 20.646 23.0006 21.875C25.129 23.104 26.8963 24.8716 28.125 27.0001" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                    <ChevronDown className="h-4 w-4" />
                                </button>
                                <div className="absolute right-0 z-10 top-full mt-2 w-48 rounded bg-white py-2 shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                                    <div className="px-4 py-2 border-b border-gray-200">
                                        <p className="text-sm font-semibold text-gray-900">{auth.user.name}</p>
                                        <p className="text-xs text-gray-500">{auth.user.email}</p>
                                    </div>
                                    <Link href="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                        Личный кабинет
                                    </Link>
                                    <button
                                        onClick={() => router.post('/logout')}
                                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                                    >
                                        <LogOut className="h-4 w-4" />
                                        Выход
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <Link href="/login" className="flex items-center space-x-1 hover:text-white/80">
                                <svg width="28" height="28" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M16 20C20.4183 20 24 16.4183 24 12C24 7.58172 20.4183 4 16 4C11.5817 4 8 7.58172 8 12C8 16.4183 11.5817 20 16 20Z" stroke="white" strokeWidth="2" strokeMiterlimit="10" />
                                    <path d="M3.875 27.0001C5.10367 24.8716 6.87104 23.104 8.99944 21.875C11.1278 20.646 13.5423 19.999 16 19.999C18.4577 19.999 20.8722 20.646 23.0006 21.875C25.129 23.104 26.8963 24.8716 28.125 27.0001" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </Link>
                        )}
                    </div>
                </div>
            </div>

            {/* Main Header */}
            <div className="mx-auto max-w-7xl px-4 py-3 md:py-4">
                <div className="flex items-center justify-between gap-4">
                    {/* Mobile Menu Button */}
                    <button
                        onClick={toggleMobileMenu}
                        className="md:hidden p-2 text-white hover:bg-white/10 rounded-lg transition-colors"
                        aria-label="Открыть меню"
                    >
                        <Menu className="h-6 w-6" />
                    </button>

                    {/* Logo */}
                    <Link href="/" className="flex items-center space-x-2">
                        <div className="flex h-8 w-8 md:h-10 md:w-10 items-center justify-center rounded-full bg-white">
                            <div className="h-5 w-5 md:h-6 md:w-6 rounded-full border-2 border-[#2B6B8F]" />
                        </div>
                        <span className="text-lg md:text-xl font-bold text-white">
                            ZALOGAL
                        </span>
                    </Link>

                    {/* Search Bar - Hidden on mobile */}
                    <div className="hidden lg:flex flex-1 max-w-3xl items-center gap-2">
                        <Input
                            type="text"
                            placeholder="Ищите что угодно..."
                            className="w-[400px] h-[2.5rem] border-white/20 bg-white text-black placeholder:text-gray-400 rounded-none"
                        />

                        <Select defaultValue="all">
                            <SelectTrigger className="w-[180px] h-[2.5rem] border-white/20 bg-white text-white rounded-none text-black">
                                <SelectValue placeholder="Вид Казахстан" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">
                                    Вид Казахстан
                                </SelectItem>
                                <SelectItem value="type1">Тип 1</SelectItem>
                                <SelectItem value="type2">Тип 2</SelectItem>
                            </SelectContent>
                        </Select>

                        <Select defaultValue="all">
                            <SelectTrigger className="w-[180px] h-[2.5rem] border-white/20 bg-white text-white rounded-none text-black">
                                <SelectValue placeholder="Все организации" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">
                                    Все организации
                                </SelectItem>
                                <SelectItem value="org1">
                                    Организация 1
                                </SelectItem>
                                <SelectItem value="org2">
                                    Организация 2
                                </SelectItem>
                            </SelectContent>
                        </Select>

                        <Button className="bg-[#F4C430] h-[2.5rem] text-white hover:bg-[#E5B520] uppercase rounded-none ">
                            Поиск
                        </Button>
                    </div>

                    {/* Mobile Icons */}
                    <div className="flex items-center space-x-2 md:hidden">
                        <button
                            onClick={() => setIsMobileSearchOpen(!isMobileSearchOpen)}
                            className="p-2 text-white hover:bg-white/10 rounded-lg transition-colors"
                            aria-label="Поиск"
                        >
                            <Search className="h-5 w-5" />
                        </button>
                        <Link href="/cart" className="p-2 text-white hover:bg-white/10 rounded-lg transition-colors">
                            <ShoppingCart className="h-5 w-5" />
                        </Link>
                        <Link href="/wishlist" className="p-2 text-white hover:bg-white/10 rounded-lg transition-colors">
                            <Heart className="h-5 w-5" />
                        </Link>
                        {auth.user ? (
                            <Link href="/profile" className="p-2 text-white hover:bg-white/10 rounded-lg transition-colors">
                                <User className="h-5 w-5" />
                            </Link>
                        ) : (
                            <Link href="/login" className="p-2 text-white hover:bg-white/10 rounded-lg transition-colors">
                                <User className="h-5 w-5" />
                            </Link>
                        )}
                    </div>
                </div>

                {/* Mobile Search Panel */}
                <div className={cn(
                    "lg:hidden overflow-hidden transition-all duration-300 ease-in-out",
                    isMobileSearchOpen ? "max-h-40 opacity-100 mt-4" : "max-h-0 opacity-0"
                )}>
                    <div className="flex flex-col gap-2">
                        <Input
                            type="text"
                            placeholder="Ищите что угодно..."
                            className="w-full h-[2.5rem] border-white/20 bg-white text-black placeholder:text-gray-400 rounded-none"
                        />
                        <div className="flex gap-2">
                            <Select defaultValue="all">
                                <SelectTrigger className="flex-1 h-[2.5rem] border-white/20 bg-white rounded-none text-black text-sm">
                                    <SelectValue placeholder="Вид" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">Вид Казахстан</SelectItem>
                                    <SelectItem value="type1">Тип 1</SelectItem>
                                    <SelectItem value="type2">Тип 2</SelectItem>
                                </SelectContent>
                            </Select>
                            <Select defaultValue="all">
                                <SelectTrigger className="flex-1 h-[2.5rem] border-white/20 bg-white rounded-none text-black text-sm">
                                    <SelectValue placeholder="Организация" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">Все организации</SelectItem>
                                    <SelectItem value="org1">Организация 1</SelectItem>
                                    <SelectItem value="org2">Организация 2</SelectItem>
                                </SelectContent>
                            </Select>
                            <Button className="bg-[#F4C430] h-[2.5rem] text-white hover:bg-[#E5B520] rounded-none px-4">
                                <Search className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Navigation Bar - Hidden on mobile */}
            <div className="border-t border-[#3A7FA8] bg-white hidden md:block">
                <div className="mx-auto max-w-7xl px-4">
                    <nav className="flex items-center justify-between py-3">
                        <div className="flex items-center space-x-6 text-sm">
                            <button className="flex items-center space-x-1 font-medium hover:text-[#2B6B8F] text-black bg-[#F2F4F5] py-3 px-3 rounded">
                                <span>Все категории</span>
                                <ChevronDown className="h-4 w-4" />
                            </button>
                            <Link
                                href="/products"
                                className={`hover:text-[#2B6B8F] flex items-center space-x-2 ${isProductsActive ? 'text-[#DE732D]' : 'text-black'}`}
                            >
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M20.25 4.5H3.75C3.33579 4.5 3 4.83579 3 5.25V18.75C3 19.1642 3.33579 19.5 3.75 19.5H20.25C20.6642 19.5 21 19.1642 21 18.75V5.25C21 4.83579 20.6642 4.5 20.25 4.5Z" stroke={isProductsActive ? '#DE732D' : '#5F6C72'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M15.75 8.25C15.75 9.24456 15.3549 10.1984 14.6517 10.9017C13.9484 11.6049 12.9946 12 12 12C11.0054 12 10.0516 11.6049 9.34835 10.9017C8.64509 10.1984 8.25 9.24456 8.25 8.25" stroke={isProductsActive ? '#DE732D' : '#5F6C72'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>

                                <span className={isProductsActive ? 'text-[#DE732D] text-sm' : 'text-[#5F6C72] text-sm'}>
                                    Все продукции
                                </span>
                            </Link>

                            {/* <Link
                                href="/products"
                                className="hover:text-[#2B6B8F] text-black flex items-center space-x-2"
                            >
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12 3.75V20.25" stroke="#5F6C72" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M9.75 20.25H14.25" stroke="#5F6C72" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M5.25 8.25L18.75 5.25" stroke="#5F6C72" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M2.25 15.75C2.25 17.4094 4.125 18 5.25 18C6.375 18 8.25 17.4094 8.25 15.75L5.25 8.25L2.25 15.75Z" stroke="#5F6C72" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M15.75 12.75C15.75 14.4094 17.625 15 18.75 15C19.875 15 21.75 14.4094 21.75 12.75L18.75 5.25L15.75 12.75Z" stroke="#5F6C72" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>


                                <span className="text-[#5F6C72] text-sm">
                                    Аукцион
                                </span>
                            </Link> */}




                            <Link
                                href="/track-order"
                                className={`hover:text-[#2B6B8F] flex items-center space-x-2 ${isTrackOrderActive ? 'text-[#DE732D]' : 'text-black'}`}
                            >
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M5.25 21.75H18.75" stroke={isTrackOrderActive ? '#DE732D' : '#5F6C72'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M19.5 9.75C19.5 16.5 12 21.75 12 21.75C12 21.75 4.5 16.5 4.5 9.75C4.5 7.76088 5.29018 5.85322 6.6967 4.4467C8.10322 3.04018 10.0109 2.25 12 2.25C13.9891 2.25 15.8968 3.04018 17.3033 4.4467C18.7098 5.85322 19.5 7.76088 19.5 9.75V9.75Z" stroke={isTrackOrderActive ? '#DE732D' : '#5F6C72'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M12 12.75C13.6569 12.75 15 11.4069 15 9.75C15 8.09315 13.6569 6.75 12 6.75C10.3431 6.75 9 8.09315 9 9.75C9 11.4069 10.3431 12.75 12 12.75Z" stroke={isTrackOrderActive ? '#DE732D' : '#5F6C72'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>

                                <span className={isTrackOrderActive ? 'text-[#DE732D] text-sm' : 'text-[#5F6C72] text-sm'}>
                                    Отследить
                                </span>
                            </Link>
                            <Link
                                href="/compare"
                                className={`hover:text-[#2B6B8F] flex items-center space-x-2 ${isCompareActive ? 'text-[#DE732D]' : 'text-black'}`}
                            >
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M7.4812 9.34668H2.9812V4.84668" stroke={isCompareActive ? '#DE732D' : '#5F6C72'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M17.8312 6.16885C17.0658 5.40236 16.1569 4.79429 15.1563 4.37941C14.1557 3.96453 13.0831 3.75098 12 3.75098C10.9168 3.75098 9.84421 3.96453 8.84362 4.37941C7.84304 4.79429 6.93407 5.40236 6.1687 6.16885L2.9812 9.34698" stroke={isCompareActive ? '#DE732D' : '#5F6C72'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M16.5188 14.6533H21.0188V19.1533" stroke={isCompareActive ? '#DE732D' : '#5F6C72'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M6.1687 17.8314C6.93407 18.5979 7.84304 19.206 8.84362 19.6209C9.84421 20.0358 10.9168 20.2493 12 20.2493C13.0831 20.2493 14.1557 20.0358 15.1563 19.6209C16.1569 19.206 17.0658 18.5979 17.8312 17.8314L21.0187 14.6533" stroke={isCompareActive ? '#DE732D' : '#5F6C72'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>



                                <span className={isCompareActive ? 'text-[#DE732D] text-sm' : 'text-[#5F6C72] text-sm'}>
                                    Сравнить
                                </span>
                            </Link>
                            <Link
                                href="/support"
                                className={`hover:text-[#2B6B8F] flex items-center space-x-2 ${isSupportActive ? 'text-[#DE732D]' : 'text-black'}`}
                            >
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M21.1406 12.7503H18.1406C17.7428 12.7503 17.3613 12.9083 17.08 13.1897C16.7987 13.471 16.6406 13.8525 16.6406 14.2503V18.0003C16.6406 18.3981 16.7987 18.7797 17.08 19.061C17.3613 19.3423 17.7428 19.5003 18.1406 19.5003H19.6406C20.0384 19.5003 20.42 19.3423 20.7013 19.061C20.9826 18.7797 21.1406 18.3981 21.1406 18.0003V12.7503ZM21.1406 12.7503C21.1407 11.5621 20.9054 10.3856 20.4484 9.28875C19.9915 8.1919 19.3218 7.1964 18.4781 6.35969C17.6344 5.52297 16.6334 4.86161 15.5328 4.41375C14.4322 3.96589 13.2538 3.74041 12.0656 3.75031C10.8782 3.74165 9.70083 3.96805 8.60132 4.41647C7.5018 4.86488 6.50189 5.52645 5.6592 6.36304C4.81651 7.19963 4.1477 8.19471 3.69131 9.29094C3.23492 10.3872 2.99997 11.5629 3 12.7503V18.0003C3 18.3981 3.15804 18.7797 3.43934 19.061C3.72064 19.3423 4.10218 19.5003 4.5 19.5003H6C6.39782 19.5003 6.77936 19.3423 7.06066 19.061C7.34196 18.7797 7.5 18.3981 7.5 18.0003V14.2503C7.5 13.8525 7.34196 13.471 7.06066 13.1897C6.77936 12.9083 6.39782 12.7503 6 12.7503H3" stroke={isSupportActive ? '#DE732D' : '#5F6C72'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>




                                <span className={isSupportActive ? 'text-[#DE732D] text-sm' : 'text-[#5F6C72] text-sm'}>
                                    Поддержка
                                </span>
                            </Link>

                            <Link
                                href="/faq"
                                className={`hover:text-[#2B6B8F] flex items-center space-x-2 ${isFAQActive ? 'text-[#DE732D]' : 'text-black'}`}
                            >
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z" stroke={isFAQActive ? '#DE732D' : '#5F6C72'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M11.25 11.25H12V16.5H12.75" stroke={isFAQActive ? '#DE732D' : '#5F6C72'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M11.8125 7.5C12.0196 7.5 12.1875 7.66789 12.1875 7.875C12.1875 8.08211 12.0196 8.25 11.8125 8.25C11.6054 8.25 11.4375 8.08211 11.4375 7.875C11.4375 7.66789 11.6054 7.5 11.8125 7.5Z" fill="#191C1F" stroke={isFAQActive ? '#DE732D' : '#5F6C72'} strokeWidth="1.5" />
                                </svg>

                                <span className={isFAQActive ? 'text-[#DE732D] text-sm' : 'text-[#5F6C72] text-sm'}>
                                    Помощь
                                </span>
                            </Link>

                            <Link
                                href="/blog"
                                className={`hover:text-[#2B6B8F] flex items-center space-x-2 ${isBlogActive ? 'text-[#DE732D]' : 'text-black'}`}
                            >
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M3 20.25V5.25C3 5.05109 3.07902 4.86032 3.21967 4.71967C3.36032 4.57902 3.55109 4.5 3.75 4.5H20.25C20.4489 4.5 20.6397 4.57902 20.7803 4.71967C20.921 4.86032 21 5.05109 21 5.25V20.25L18 18.75L15 20.25L12 18.75L9 20.25L6 18.75L3 20.25Z" stroke={isBlogActive ? '#DE732D' : '#5F6C72'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M13.5 10.5H18" stroke={isBlogActive ? '#DE732D' : '#5F6C72'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M13.5 13.5H18" stroke={isBlogActive ? '#DE732D' : '#5F6C72'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M10.5 9H6V15H10.5V9Z" stroke={isBlogActive ? '#DE732D' : '#5F6C72'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>





                                <span className={isBlogActive ? 'text-[#DE732D] text-sm' : 'text-[#5F6C72] text-sm'}>
                                    Новости и Блог
                                </span>
                            </Link>
                        </div>
                        <div className="flex items-center space-x-2 text-sm">
                            <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M17.4346 4.375C18.9187 4.77332 20.272 5.55499 21.3586 6.64159C22.4452 7.72818 23.2269 9.08147 23.6252 10.5656" stroke="#191C1F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M16.5264 7.75488C17.419 7.99195 18.2331 8.46077 18.8862 9.11384C19.5392 9.7669 20.0081 10.581 20.2451 11.4736" stroke="#191C1F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M10.1172 13.6504C11.0176 15.5098 12.5211 17.0095 14.3828 17.9051C14.5201 17.9701 14.672 17.9983 14.8235 17.9868C14.975 17.9752 15.1209 17.9245 15.2469 17.8395L17.9812 16.0129C18.1021 15.931 18.2417 15.881 18.387 15.8676C18.5324 15.8542 18.6788 15.8778 18.8125 15.9363L23.9312 18.1348C24.1062 18.2076 24.2524 18.3359 24.3472 18.4999C24.4421 18.664 24.4804 18.8546 24.4562 19.0426C24.294 20.3089 23.6759 21.4726 22.7177 22.3162C21.7594 23.1597 20.5266 23.6251 19.25 23.6254C15.3049 23.6254 11.5214 22.0582 8.73179 19.2686C5.94218 16.479 4.375 12.6955 4.375 8.7504C4.37529 7.47377 4.84073 6.24099 5.68425 5.28273C6.52776 4.32447 7.69153 3.70639 8.95781 3.54415C9.14576 3.52001 9.33643 3.55832 9.50047 3.65319C9.66451 3.74805 9.79281 3.89421 9.86562 4.06915L12.0641 9.19884C12.1212 9.33047 12.1451 9.47414 12.1337 9.61719C12.1223 9.76024 12.0758 9.89829 11.9984 10.0192L10.1719 12.7973C10.0906 12.9229 10.0428 13.0673 10.0333 13.2167C10.0237 13.3661 10.0526 13.5154 10.1172 13.6504V13.6504Z" stroke="#191C1F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>

                            <span className="font-bold text-black text-md">+7 777 964 2944</span>
                        </div>
                    </nav>
                </div>
            </div>

            {/* Mobile Navigation Drawer */}
            <div className={cn(
                "fixed inset-0 z-50 md:hidden transition-all duration-300",
                isMobileMenuOpen ? "visible" : "invisible"
            )}>
                {/* Overlay */}
                <div
                    className={cn(
                        "absolute inset-0 bg-black/50 transition-opacity duration-300",
                        isMobileMenuOpen ? "opacity-100" : "opacity-0"
                    )}
                    onClick={closeMobileMenu}
                />

                {/* Drawer */}
                <div className={cn(
                    "absolute left-0 top-0 h-full w-[85%] max-w-sm bg-white shadow-xl transition-transform duration-300 ease-out overflow-y-auto",
                    isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
                )}>
                    {/* Drawer Header */}
                    <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-[#2B6B8F]">
                        <Link href="/" className="flex items-center space-x-2" onClick={closeMobileMenu}>
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white">
                                <div className="h-5 w-5 rounded-full border-2 border-[#2B6B8F]" />
                            </div>
                            <span className="text-lg font-bold text-white">ZALOGAL</span>
                        </Link>
                        <button
                            onClick={closeMobileMenu}
                            className="p-2 text-white hover:bg-white/10 rounded-lg transition-colors"
                            aria-label="Закрыть меню"
                        >
                            <X className="h-6 w-6" />
                        </button>
                    </div>

                    {/* User Section */}
                    {auth.user ? (
                        <div className="p-4 border-b border-gray-200 bg-gray-50">
                            <div className="flex items-center space-x-3">
                                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#2B6B8F]">
                                    <User className="h-6 w-6 text-white" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="font-semibold text-gray-900 truncate">{auth.user.name}</p>
                                    <p className="text-sm text-gray-500 truncate">{auth.user.email}</p>
                                </div>
                            </div>
                            <div className="mt-3 flex gap-2">
                                <Link
                                    href="/profile"
                                    onClick={closeMobileMenu}
                                    className="flex-1 py-2 px-3 text-center text-sm font-medium text-[#2B6B8F] bg-white border border-[#2B6B8F] rounded-lg hover:bg-[#2B6B8F]/5 transition-colors"
                                >
                                    Личный кабинет
                                </Link>
                                <button
                                    onClick={() => {
                                        closeMobileMenu();
                                        router.post('/logout');
                                    }}
                                    className="py-2 px-3 text-sm font-medium text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-1"
                                >
                                    <LogOut className="h-4 w-4" />
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="p-4 border-b border-gray-200 bg-gray-50">
                            <Link
                                href="/login"
                                onClick={closeMobileMenu}
                                className="flex items-center justify-center gap-2 w-full py-3 px-4 text-white bg-[#2B6B8F] rounded-lg hover:bg-[#1f5470] transition-colors font-medium"
                            >
                                <User className="h-5 w-5" />
                                Войти
                            </Link>
                        </div>
                    )}

                    {/* Navigation Links */}
                    <nav className="p-4">
                        <div className="space-y-1">
                            <Link
                                href="/products"
                                onClick={closeMobileMenu}
                                className={cn(
                                    "flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors",
                                    isProductsActive
                                        ? "bg-[#DE732D]/10 text-[#DE732D]"
                                        : "text-gray-700 hover:bg-gray-100"
                                )}
                            >
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M20.25 4.5H3.75C3.33579 4.5 3 4.83579 3 5.25V18.75C3 19.1642 3.33579 19.5 3.75 19.5H20.25C20.6642 19.5 21 19.1642 21 18.75V5.25C21 4.83579 20.6642 4.5 20.25 4.5Z" stroke={isProductsActive ? '#DE732D' : '#5F6C72'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M15.75 8.25C15.75 9.24456 15.3549 10.1984 14.6517 10.9017C13.9484 11.6049 12.9946 12 12 12C11.0054 12 10.0516 11.6049 9.34835 10.9017C8.64509 10.1984 8.25 9.24456 8.25 8.25" stroke={isProductsActive ? '#DE732D' : '#5F6C72'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                <span className="font-medium">Все продукции</span>
                            </Link>

                            <Link
                                href="/track-order"
                                onClick={closeMobileMenu}
                                className={cn(
                                    "flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors",
                                    isTrackOrderActive
                                        ? "bg-[#DE732D]/10 text-[#DE732D]"
                                        : "text-gray-700 hover:bg-gray-100"
                                )}
                            >
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M5.25 21.75H18.75" stroke={isTrackOrderActive ? '#DE732D' : '#5F6C72'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M19.5 9.75C19.5 16.5 12 21.75 12 21.75C12 21.75 4.5 16.5 4.5 9.75C4.5 7.76088 5.29018 5.85322 6.6967 4.4467C8.10322 3.04018 10.0109 2.25 12 2.25C13.9891 2.25 15.8968 3.04018 17.3033 4.4467C18.7098 5.85322 19.5 7.76088 19.5 9.75V9.75Z" stroke={isTrackOrderActive ? '#DE732D' : '#5F6C72'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M12 12.75C13.6569 12.75 15 11.4069 15 9.75C15 8.09315 13.6569 6.75 12 6.75C10.3431 6.75 9 8.09315 9 9.75C9 11.4069 10.3431 12.75 12 12.75Z" stroke={isTrackOrderActive ? '#DE732D' : '#5F6C72'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                <span className="font-medium">Отследить</span>
                            </Link>

                            <Link
                                href="/compare"
                                onClick={closeMobileMenu}
                                className={cn(
                                    "flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors",
                                    isCompareActive
                                        ? "bg-[#DE732D]/10 text-[#DE732D]"
                                        : "text-gray-700 hover:bg-gray-100"
                                )}
                            >
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M7.4812 9.34668H2.9812V4.84668" stroke={isCompareActive ? '#DE732D' : '#5F6C72'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M17.8312 6.16885C17.0658 5.40236 16.1569 4.79429 15.1563 4.37941C14.1557 3.96453 13.0831 3.75098 12 3.75098C10.9168 3.75098 9.84421 3.96453 8.84362 4.37941C7.84304 4.79429 6.93407 5.40236 6.1687 6.16885L2.9812 9.34698" stroke={isCompareActive ? '#DE732D' : '#5F6C72'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M16.5188 14.6533H21.0188V19.1533" stroke={isCompareActive ? '#DE732D' : '#5F6C72'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M6.1687 17.8314C6.93407 18.5979 7.84304 19.206 8.84362 19.6209C9.84421 20.0358 10.9168 20.2493 12 20.2493C13.0831 20.2493 14.1557 20.0358 15.1563 19.6209C16.1569 19.206 17.0658 18.5979 17.8312 17.8314L21.0187 14.6533" stroke={isCompareActive ? '#DE732D' : '#5F6C72'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                <span className="font-medium">Сравнить</span>
                            </Link>

                            <Link
                                href="/support"
                                onClick={closeMobileMenu}
                                className={cn(
                                    "flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors",
                                    isSupportActive
                                        ? "bg-[#DE732D]/10 text-[#DE732D]"
                                        : "text-gray-700 hover:bg-gray-100"
                                )}
                            >
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M21.1406 12.7503H18.1406C17.7428 12.7503 17.3613 12.9083 17.08 13.1897C16.7987 13.471 16.6406 13.8525 16.6406 14.2503V18.0003C16.6406 18.3981 16.7987 18.7797 17.08 19.061C17.3613 19.3423 17.7428 19.5003 18.1406 19.5003H19.6406C20.0384 19.5003 20.42 19.3423 20.7013 19.061C20.9826 18.7797 21.1406 18.3981 21.1406 18.0003V12.7503ZM21.1406 12.7503C21.1407 11.5621 20.9054 10.3856 20.4484 9.28875C19.9915 8.1919 19.3218 7.1964 18.4781 6.35969C17.6344 5.52297 16.6334 4.86161 15.5328 4.41375C14.4322 3.96589 13.2538 3.74041 12.0656 3.75031C10.8782 3.74165 9.70083 3.96805 8.60132 4.41647C7.5018 4.86488 6.50189 5.52645 5.6592 6.36304C4.81651 7.19963 4.1477 8.19471 3.69131 9.29094C3.23492 10.3872 2.99997 11.5629 3 12.7503V18.0003C3 18.3981 3.15804 18.7797 3.43934 19.061C3.72064 19.3423 4.10218 19.5003 4.5 19.5003H6C6.39782 19.5003 6.77936 19.3423 7.06066 19.061C7.34196 18.7797 7.5 18.3981 7.5 18.0003V14.2503C7.5 13.8525 7.34196 13.471 7.06066 13.1897C6.77936 12.9083 6.39782 12.7503 6 12.7503H3" stroke={isSupportActive ? '#DE732D' : '#5F6C72'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                <span className="font-medium">Поддержка</span>
                            </Link>

                            <Link
                                href="/faq"
                                onClick={closeMobileMenu}
                                className={cn(
                                    "flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors",
                                    isFAQActive
                                        ? "bg-[#DE732D]/10 text-[#DE732D]"
                                        : "text-gray-700 hover:bg-gray-100"
                                )}
                            >
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z" stroke={isFAQActive ? '#DE732D' : '#5F6C72'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M11.25 11.25H12V16.5H12.75" stroke={isFAQActive ? '#DE732D' : '#5F6C72'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M11.8125 7.5C12.0196 7.5 12.1875 7.66789 12.1875 7.875C12.1875 8.08211 12.0196 8.25 11.8125 8.25C11.6054 8.25 11.4375 8.08211 11.4375 7.875C11.4375 7.66789 11.6054 7.5 11.8125 7.5Z" fill="#191C1F" stroke={isFAQActive ? '#DE732D' : '#5F6C72'} strokeWidth="1.5" />
                                </svg>
                                <span className="font-medium">Помощь</span>
                            </Link>

                            <Link
                                href="/blog"
                                onClick={closeMobileMenu}
                                className={cn(
                                    "flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors",
                                    isBlogActive
                                        ? "bg-[#DE732D]/10 text-[#DE732D]"
                                        : "text-gray-700 hover:bg-gray-100"
                                )}
                            >
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M3 20.25V5.25C3 5.05109 3.07902 4.86032 3.21967 4.71967C3.36032 4.57902 3.55109 4.5 3.75 4.5H20.25C20.4489 4.5 20.6397 4.57902 20.7803 4.71967C20.921 4.86032 21 5.05109 21 5.25V20.25L18 18.75L15 20.25L12 18.75L9 20.25L6 18.75L3 20.25Z" stroke={isBlogActive ? '#DE732D' : '#5F6C72'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M13.5 10.5H18" stroke={isBlogActive ? '#DE732D' : '#5F6C72'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M13.5 13.5H18" stroke={isBlogActive ? '#DE732D' : '#5F6C72'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M10.5 9H6V15H10.5V9Z" stroke={isBlogActive ? '#DE732D' : '#5F6C72'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                <span className="font-medium">Новости и Блог</span>
                            </Link>
                        </div>

                        {/* Quick Links */}
                        <div className="mt-6 pt-6 border-t border-gray-200">
                            <Link
                                href="/cart"
                                onClick={closeMobileMenu}
                                className="flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
                            >
                                <ShoppingCart className="h-5 w-5 text-gray-500" />
                                <span className="font-medium">Корзина</span>
                            </Link>
                            <Link
                                href="/wishlist"
                                onClick={closeMobileMenu}
                                className="flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
                            >
                                <Heart className="h-5 w-5 text-gray-500" />
                                <span className="font-medium">Избранное</span>
                            </Link>
                        </div>

                        {/* Phone */}
                        <div className="mt-6 pt-6 border-t border-gray-200">
                            <a
                                href="tel:+77779642944"
                                className="flex items-center space-x-3 px-4 py-3 rounded-lg bg-[#2B6B8F]/5 text-[#2B6B8F] hover:bg-[#2B6B8F]/10 transition-colors"
                            >
                                <svg width="24" height="24" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M17.4346 4.375C18.9187 4.77332 20.272 5.55499 21.3586 6.64159C22.4452 7.72818 23.2269 9.08147 23.6252 10.5656" stroke="#2B6B8F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M16.5264 7.75488C17.419 7.99195 18.2331 8.46077 18.8862 9.11384C19.5392 9.7669 20.0081 10.581 20.2451 11.4736" stroke="#2B6B8F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M10.1172 13.6504C11.0176 15.5098 12.5211 17.0095 14.3828 17.9051C14.5201 17.9701 14.672 17.9983 14.8235 17.9868C14.975 17.9752 15.1209 17.9245 15.2469 17.8395L17.9812 16.0129C18.1021 15.931 18.2417 15.881 18.387 15.8676C18.5324 15.8542 18.6788 15.8778 18.8125 15.9363L23.9312 18.1348C24.1062 18.2076 24.2524 18.3359 24.3472 18.4999C24.4421 18.664 24.4804 18.8546 24.4562 19.0426C24.294 20.3089 23.6759 21.4726 22.7177 22.3162C21.7594 23.1597 20.5266 23.6251 19.25 23.6254C15.3049 23.6254 11.5214 22.0582 8.73179 19.2686C5.94218 16.479 4.375 12.6955 4.375 8.7504C4.37529 7.47377 4.84073 6.24099 5.68425 5.28273C6.52776 4.32447 7.69153 3.70639 8.95781 3.54415C9.14576 3.52001 9.33643 3.55832 9.50047 3.65319C9.66451 3.74805 9.79281 3.89421 9.86562 4.06915L12.0641 9.19884C12.1212 9.33047 12.1451 9.47414 12.1337 9.61719C12.1223 9.76024 12.0758 9.89829 11.9984 10.0192L10.1719 12.7973C10.0906 12.9229 10.0428 13.0673 10.0333 13.2167C10.0237 13.3661 10.0526 13.5154 10.1172 13.6504V13.6504Z" stroke="#2B6B8F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                <span className="font-bold">+7 777 964 2944</span>
                            </a>
                        </div>
                    </nav>
                </div>
            </div>
        </header>
    );
}
