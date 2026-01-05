import { Breadcrumbs } from '@/components/breadcrumbs';
import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Head } from '@inertiajs/react';
import { ChevronDown, Plus } from 'lucide-react';
import { useState } from 'react';

const faqData = [
  {
    question: 'Какие способы оплаты вы принимаете?',
    answer: 'Мы принимаем следующие способы оплаты: банковские карты (Visa, MasterCard, МИР), электронные кошельки, наличные при получении, безналичный расчет для юридических лиц. Все платежи защищены современной системой шифрования данных.',
    highlighted: true,
  },
  {
    question: 'Как я могу отследить свой заказ?',
    answer: 'После оформления заказа вы получите трек-номер на ваш email и в личный кабинет. Вы можете отследить заказ на странице "Отследить заказ" или через SMS-уведомления. Мы также предоставляем возможность отслеживания через мобильное приложение.',
    highlighted: false,
  },
  {
    question: 'Какие сроки доставки?',
    answer: 'Сроки доставки зависят от вашего региона: по городу Алматы - 1-2 рабочих дня, по Казахстану - 3-7 рабочих дней, международная доставка - 10-14 рабочих дней. Доступна экспресс-доставка в течение 24 часов.',
    highlighted: false,
  },
  {
    question: 'Могу ли я вернуть товар?',
    answer: 'Да, вы можете вернуть товар в течение 14 дней с момента получения. Товар должен быть в оригинальной упаковке, с сохраненными ярлыками и не иметь следов использования. Возврат осуществляется на банковскую карту в течение 7-10 рабочих дней.',
    highlighted: false,
  },
  {
    question: 'Есть ли гарантия на товары?',
    answer: 'На все товары предоставляется официальная гарантия производителя. Срок гарантии указан в описании каждого товара и обычно составляет от 6 месяцев до 3 лет. Гарантийное обслуживание осуществляется в авторизованных сервисных центрах.',
    highlighted: false,
  },
  {
    question: 'Как я могу связаться со службой поддержки?',
    answer: 'Вы можете связаться с нами по телефону +7 777 964 2944 (с 9:00 до 18:00), по email support@zalogal.kz, через онлайн-чат на сайте или через форму обратной связи. Мы также доступны в социальных сетях.',
    highlighted: false,
  },
  {
    question: 'Можно ли изменить или отменить заказ?',
    answer: 'Вы можете изменить или отменить заказ в течение 1 часа после оформления через личный кабинет. После этого необходимо связаться со службой поддержки. Если заказ уже отправлен, вы можете оформить возврат после получения.',
    highlighted: false,
  },
  {
    question: 'Какая минимальная сумма заказа для бесплатной доставки?',
    answer: 'Бесплатная доставка предоставляется при заказе на сумму от 50 000 тенге по городу Алматы и от 75 000 тенге по всему Казахстану. Для некоторых акционных товаров бесплатная доставка доступна без минимальной суммы.',
    highlighted: false,
  },
];

export default function FAQ() {
  const [searchQuery, setSearchQuery] = useState('');
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <>
      <Head title="Помощь - Zalogal" />
      <Header />
      <div className="bg-[#F2F4F5] py-4">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Breadcrumbs
            breadcrumbs={[
              { title: 'Главная', href: '/' },
              { title: 'FAQs', href: '' },
            ]}
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="py-12 md:py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Sidebar - Order 2 on mobile, Order 1 on large screens */}
            <div className="order-2 lg:order-1 lg:col-span-1">
              <div className="bg-[#FFF8F0] p-6 rounded-lg border border-[#FFE4CC]">
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                  Есть трудности или пожелания?
                </h3>
                <Input
                  type="email"
                  placeholder="Адрес электронной почты"
                  className="mb-3 h-12 rounded-md"
                />
                <Input
                  placeholder="Тема"
                  className="mb-3 h-12 rounded-md"
                />
                <textarea
                  placeholder="Сообщение или пожелание"
                  className="w-full min-h-[120px] p-3 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#FA8232] mb-4"
                />
                <Button className="w-full bg-[#FA8232] text-white hover:bg-[#E97527] h-12 rounded-md uppercase font-bold tracking-wide">
                  Отправить
                </Button>
              </div>
            </div>

            {/* Right Content - FAQ - Order 1 on mobile, Order 2 on large screens */}
            <div className="order-1 lg:order-2 lg:col-span-2">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 md:mb-8">
                Часто задаваемые вопросы
              </h1>

              <div className="space-y-4">
                {faqData.map((faq, index) => (
                  <div
                    key={index}
                    className={`border rounded-lg transition-all overflow-hidden ${openIndex === index
                        ? 'border-[#FA8232] bg-[#FFF8F0]'
                        : 'border-gray-200 bg-white hover:border-gray-300'
                      }`}
                  >
                    <button
                      onClick={() => toggleAccordion(index)}
                      className="w-full flex items-center justify-between p-4 md:p-5 text-left"
                    >
                      <div className="flex items-center gap-4">
                        {openIndex === index ? (
                          <ChevronDown className="h-5 w-5 text-[#FA8232] flex-shrink-0" />
                        ) : (
                          <Plus className="h-5 w-5 text-gray-400 flex-shrink-0" />
                        )}
                        <span
                          className={`font-medium text-sm md:text-base ${openIndex === index || faq.highlighted
                              ? 'text-[#FA8232]'
                              : 'text-gray-900'
                            }`}
                        >
                          {faq.question}
                        </span>
                      </div>
                    </button>
                    {openIndex === index && (
                      <div className="px-4 pb-4 md:px-5 md:pb-5 pl-14 md:pl-14">
                        <p className="text-gray-600 text-sm leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
