import { Breadcrumbs } from '@/components/breadcrumbs';
import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Head } from '@inertiajs/react';
import { Search, Phone, MessageCircle } from 'lucide-react';
import { useState } from 'react';

const categories = [
  { icon: '📦', title: 'Отследить заказ', active: true },
  { icon: '🔑', title: 'Сброс пароля' },
  { icon: '💳', title: 'Оплата' },
  { icon: '👤', title: 'Пользователь и аккаунт' },
  { icon: '❤️', title: 'Избранное и сравнение' },
  { icon: '🛍️', title: 'Доставка и оплата' },
  { icon: '🛒', title: 'Корзина и кошелек' },
  { icon: '💰', title: 'Продажа на Zalogal' },
];

const popularTopics = [
  { text: 'Как вернуть товар?', highlighted: false },
  { text: 'Какова политика возврата Zalogal?', highlighted: true },
  { text: 'Сколько длится возврат средств?', highlighted: false },
  { text: 'Какие сроки доставки?', highlighted: false },
  { text: 'Что такое акция "Откройте для себя Zalogal"?', highlighted: false },
  { text: 'Что за купоны и подарки в этой акции?', highlighted: false },
  { text: 'Как отменить заказ на Zalogal?', highlighted: false },
  { text: 'Вопросы по цифровым устройствам', highlighted: false },
  { text: 'Как изменить название магазина?', highlighted: false },
];

export default function Support() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <>
      <Head title="Поддержка - Zalogal" />
      <Header />
      <div className="bg-[#F2F4F5] py-4">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Breadcrumbs
            breadcrumbs={[
              { title: 'Главная', href: '/' },
              { title: 'Поддержка', href: '' },
            ]}
          />
        </div>
      </div>

      {/* Hero Section */}
      <div className="py-12 md:py-16 bg-[url('/assets/images/support-img.png')] bg-cover bg-center bg-no-repeat">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className='max-w-xl'>
              <div className="inline-block bg-[#FA8232] text-white px-4 py-1 rounded text-sm font-medium mb-4">
                ЦЕНТР ПОДДЕРЖКИ
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Чем мы можем вам помочь?
              </h1>
              <div className="relative">
                <Input
                  placeholder="Введите ваш вопрос или ключевое слово"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pr-32 h-14 w-full"
                />
                <Button className="absolute right-1 top-1 bg-[#FA8232] text-white hover:bg-[#E97527] h-12 px-6">
                  <Search className="h-4 w-4 mr-2" />
                  <span className="hidden sm:inline">ПОИСК</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* What can we assist you with today */}
      <div className="py-12 md:py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-8 md:mb-12">
            Чем мы можем помочь вам сегодня?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {categories.map((category, index) => (
              <button
                key={index}
                className={`px-6 py-4 rounded-lg border transition-all hover:border-[#FA8232] hover:shadow-md text-left flex items-center gap-3 ${category.active
                  ? 'border-[#FA8232] bg-orange-50'
                  : 'border-gray-200 bg-white'
                  }`}
              >
                <span className="text-2xl flex-shrink-0">{category.icon}</span>
                <span className="font-medium text-gray-900">
                  {category.title}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Popular Topics */}
      <div className="py-12 md:py-16 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-8 md:mb-12">
            Популярные вопросы
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {popularTopics.map((topic, index) => (
              <button
                key={index}
                className={`text-left p-4 rounded-lg bg-white shadow-sm hover:shadow-md transition-all ${topic.highlighted ? 'text-[#FA8232] font-medium border border-[#FA8232]/20' : 'text-gray-700 border border-transparent'
                  }`}
              >
                <span className="mr-2">•</span> {topic.text}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="py-12 md:py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-block bg-blue-100 text-blue-600 px-4 py-1 rounded text-sm font-medium mb-4">
              СВЯЗАТЬСЯ С НАМИ
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              Не нашли ответ на свой вопрос?
            </h2>
            <h3 className="text-xl text-gray-600">Свяжитесь с нами</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto">
            {/* Call us */}
            <div className="bg-white border border-gray-200 rounded-xl p-8 text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Phone className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Позвоните нам
              </h3>
              <p className="text-gray-500 text-sm mb-4">
                Мы онлайн с 9:00 до 17:00 (GMT+5)
                <br />
                Позвоните нам сейчас
              </p>
              <p className="text-xl md:text-2xl font-bold text-gray-900 mb-6">
                +7-777-555-0126
              </p>
              <Button className="bg-blue-500 text-white hover:bg-blue-600 w-full h-12 text-base">
                ПОЗВОНИТЬ →
              </Button>
            </div>

            {/* Chat with us */}
            <div className="bg-white border border-gray-200 rounded-xl p-8 text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <MessageCircle className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Напишите нам
              </h3>
              <p className="text-gray-500 text-sm mb-4">
                Мы онлайн с 9:00 до 17:00 (GMT+5)
                <br />
                Напишите нам сейчас
              </p>
              <p className="text-xl md:text-2xl font-bold text-gray-900 mb-6 break-all">
                support@zalogal.kz
              </p>
              <Button className="bg-[#00D85A] text-white hover:bg-[#00C050] w-full h-12 text-base">
                НАПИСАТЬ →
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
