import { Breadcrumbs } from '@/components/breadcrumbs';
import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import { Button } from '@/components/ui/button';
import { Head, Link } from '@inertiajs/react';

export default function OrderSuccess() {
  return (
    <>
      <Head title="Заказ успешно оформлен - Zalogal" />
      <Header />
      <div className="bg-[#F2F4F5] py-4">
        <div className="mx-auto max-w-7xl">
          <Breadcrumbs
            breadcrumbs={[
              { title: 'Главная', href: '/' },
              { title: 'Shopping Card', href: '/cart' },
              { title: 'Checkout', href: '/checkout' },
              { title: 'Успех', href: '' },
            ]}
          />
        </div>
      </div>
      <div className="mx-auto max-w-7xl py-24 flex flex-col items-center justify-center min-h-[50vh]">
        <div className="mb-8 flex flex-col items-center">
          <span className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gray-100 animate-scale-in">
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none" className="checkmark-svg">
              <path 
                d="M16 25.5L22 31.5L33 19.5" 
                stroke="#22C55E" 
                strokeWidth="3" 
                strokeLinecap="round" 
                strokeLinejoin="round"
                className="checkmark-path"
                strokeDasharray="30"
                strokeDashoffset="30"
              />
            </svg>
          </span>
          <h1 className="text-2xl font-semibold text-gray-900 mb-2 text-center">Ваш заказ успешно оформлен!</h1>
          <p className="text-gray-500 text-center max-w-md">Спасибо за ваш заказ! Мы свяжемся с вами для подтверждения и доставки. Вы можете просмотреть детали заказа или вернуться на главную.</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 mt-6">
          <Link href="/profile">
            <Button variant="outline" className="border-[#FA8232] text-[#FA8232] hover:bg-[#FA8232] hover:text-white min-w-[200px] h-12">В ЛИЧНЫЙ КАБИНЕТ</Button>
          </Link>
          <Link href="/profile/orders">
            <Button className="bg-[#FA8232] text-white hover:bg-[#E97527] min-w-[200px] h-12">ПОСМОТРЕТЬ ЗАКАЗ</Button>
          </Link>
        </div>
      </div>
      <Footer />
    </>
  );
}
