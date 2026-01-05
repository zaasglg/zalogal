import { Breadcrumbs } from '@/components/breadcrumbs';
import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Head, Link, router, useForm, usePage } from '@inertiajs/react';
import { ArrowRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import { toast } from 'sonner';

interface CartItem {
  id: number;
  quantity: number;
  listing: {
    id: number;
    title: string;
    price: number;
    images: string[] | null;
  };
}

interface UserAddress {
  id: number;
  full_name: string;
  address_line_1: string;
  address_line_2?: string | null;
  city: string;
  state?: string | null;
  postal_code: string;
  country: string;
  phone?: string | null;
  is_default: boolean;
}

interface Props {
  cartItems: CartItem[];
  addresses?: UserAddress[];
}

const paymentOptions = [
  { label: 'Наложенный платеж', value: 'cod', icon: '💵' },
  { label: 'Kaspi', value: 'kaspi', icon: '🏦' },
  { label: 'PayPal', value: 'paypal', icon: '🅿️' },
  { label: 'Amazon Pay', value: 'amazon', icon: '🅰️' },
  { label: 'Карта', value: 'card', icon: '💳' },
];

export default function Checkout({ cartItems = [], addresses = [] }: Props) {
  const { auth } = usePage().props as any;
  const [selectedPayment, setSelectedPayment] = useState('card');
  const [selectedAddressId, setSelectedAddressId] = useState<number | null>(null);
  const [useSavedAddress, setUseSavedAddress] = useState(false);

  type FormData = {
    payment_method: string;
    first_name: string;
    last_name: string;
    company: string;
    address: string;
    country: string;
    region: string;
    city: string;
    postal_code: string;
    email: string;
    phone: string;
    comment: string;
  };

  const { data, setData, post, processing, errors } = useForm<FormData>({
    payment_method: 'card',
    first_name: '',
    last_name: '',
    company: '',
    address: '',
    country: 'Казахстан',
    region: '',
    city: '',
    postal_code: '',
    email: auth?.user?.email || '',
    phone: '',
    comment: '',
  });

  // Автозаполнение при первом открытии, если есть адрес по умолчанию
  useEffect(() => {
    if (addresses.length > 0 && !useSavedAddress && selectedAddressId === null) {
      const defaultAddress = addresses.find(a => a.is_default) || addresses[0];
      if (defaultAddress) {
        setSelectedAddressId(defaultAddress.id);
        setUseSavedAddress(true);
      }
    }
  }, [addresses.length]);

  // Автозаполнение формы при выборе сохраненного адреса
  useEffect(() => {
    if (useSavedAddress && selectedAddressId) {
      const address = addresses.find(a => a.id === selectedAddressId);
      if (address) {
        // Разделяем full_name на first_name и last_name
        const nameParts = address.full_name.split(' ');
        const firstName = nameParts[0] || '';
        const lastName = nameParts.slice(1).join(' ') || '';

        // Используем отдельные вызовы setData для каждого поля
        setData('first_name', firstName);
        setData('last_name', lastName);
        setData('address', address.address_line_1 + (address.address_line_2 ? `, ${address.address_line_2}` : ''));
        setData('country', address.country);
        setData('region', address.state || '');
        setData('city', address.city);
        setData('postal_code', address.postal_code);
        setData('phone', address.phone || '');
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedAddressId, useSavedAddress]);

  const subtotal = cartItems.reduce((sum, item) => sum + item.listing.price * item.quantity, 0);
  const shipping = 0;
  const discount = 0;
  const tax = subtotal * 0.12; // 12% НДС
  const total = subtotal + shipping + tax - discount;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post('/checkout', {
      onSuccess: () => {
        toast.success('Заказ успешно оформлен!');
      },
      onError: (errors) => {
        toast.error('Ошибка при оформлении заказа');
      },
    });
  };

  return (
    <>
      <Head title="Оформление заказа - Zalogal" />
      <Header />
      <div className="bg-[#F2F4F5] py-4">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Breadcrumbs
            breadcrumbs={[
              { title: 'Главная', href: '/' },
              { title: 'Shopping Card', href: '/cart' },
              { title: 'Оформление заказа', href: '' },
            ]}
          />
        </div>
      </div>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 mb-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Billing Form */}
          <form onSubmit={handleSubmit} className="lg:col-span-8 space-y-8">
            {/* Выбор сохраненного адреса */}
            {addresses.length > 0 && (
              <div className="mb-6 rounded-lg border border-gray-200 bg-white p-4 md:p-6 shadow-sm">
                <div className="mb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <h3 className="text-lg font-bold text-gray-900">Сохраненные адреса</h3>
                  <label className="flex items-center space-x-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={useSavedAddress}
                      onChange={(e) => {
                        setUseSavedAddress(e.target.checked);
                        if (!e.target.checked) {
                          setSelectedAddressId(null);
                          // Очищаем форму
                          setData({
                            ...data,
                            first_name: '',
                            last_name: '',
                            address: '',
                            country: 'Казахстан',
                            region: '',
                            city: '',
                            postal_code: '',
                            phone: '',
                          });
                        }
                      }}
                      className="rounded border-gray-300 text-[#FA8232] focus:ring-[#FA8232]"
                    />
                    <span className="text-sm text-gray-600">Использовать сохраненный адрес</span>
                  </label>
                </div>
                {useSavedAddress && (
                  <div className="space-y-3">
                    {addresses.map((address) => (
                      <label
                        key={address.id}
                        className={`flex cursor-pointer items-start space-x-3 rounded-lg border p-4 transition-all ${selectedAddressId === address.id
                            ? 'border-[#FA8232] bg-[#FFF8F0] shadow-sm'
                            : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                          }`}
                      >
                        <input
                          type="radio"
                          name="saved_address"
                          value={address.id}
                          checked={selectedAddressId === address.id}
                          onChange={() => setSelectedAddressId(address.id)}
                          className="mt-1 text-[#FA8232] focus:ring-[#FA8232]"
                        />
                        <div className="flex-1">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                            <span className="font-bold text-gray-900">{address.full_name}</span>
                            {address.is_default && (
                              <span className="inline-block w-fit rounded bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-800">
                                По умолчанию
                              </span>
                            )}
                          </div>
                          <p className="mt-1 text-sm text-gray-600 leading-relaxed">
                            {address.address_line_1}
                            {address.address_line_2 && `, ${address.address_line_2}`}
                          </p>
                          <p className="text-sm text-gray-600">
                            {address.city}, {address.state || ''} {address.postal_code}
                          </p>
                          <p className="text-sm text-gray-600">{address.country}</p>
                          {address.phone && (
                            <p className="mt-1 text-sm text-gray-600 font-medium">Тел: {address.phone}</p>
                          )}
                        </div>
                      </label>
                    ))}
                  </div>
                )}
              </div>
            )}
            {(!useSavedAddress || addresses.length === 0) && (
              <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                <h2 className="mb-6 text-xl font-bold text-gray-900">Платежная информация</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <div className="col-span-1">
                    <label className="text-sm font-medium text-gray-700 mb-1 block">Имя</label>
                    <Input
                      placeholder="Имя"
                      value={data.first_name}
                      onChange={(e) => setData('first_name', e.target.value)}
                      className={`h-11 ${errors.first_name ? 'border-red-500' : ''}`}
                      required
                    />
                    {errors.first_name && <p className="text-red-500 text-xs mt-1">{errors.first_name}</p>}
                  </div>
                  <div className="col-span-1">
                    <label className="text-sm font-medium text-gray-700 mb-1 block">Фамилия</label>
                    <Input
                      placeholder="Фамилия"
                      value={data.last_name}
                      onChange={(e) => setData('last_name', e.target.value)}
                      className={`h-11 ${errors.last_name ? 'border-red-500' : ''}`}
                      required
                    />
                    {errors.last_name && <p className="text-red-500 text-xs mt-1">{errors.last_name}</p>}
                  </div>
                  <div className="col-span-1 sm:col-span-2">
                    <label className="text-sm font-medium text-gray-700 mb-1 block">Компания <span className="text-gray-400 font-normal">(необязательно)</span></label>
                    <Input
                      placeholder="Название компании"
                      value={data.company}
                      onChange={(e) => setData('company', e.target.value)}
                      className="h-11"
                    />
                  </div>
                </div>
                <div className="mb-4">
                  <label className="text-sm font-medium text-gray-700 mb-1 block">Адрес</label>
                  <Input
                    placeholder="Улица, дом, квартира"
                    value={data.address}
                    onChange={(e) => setData('address', e.target.value)}
                    className={`h-11 ${errors.address ? 'border-red-500' : ''}`}
                    required
                  />
                  {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div className="col-span-1">
                    <label className="text-sm font-medium text-gray-700 mb-1 block">Страна</label>
                    <Input
                      placeholder="Страна"
                      value={data.country}
                      onChange={(e) => setData('country', e.target.value)}
                      className={`h-11 ${errors.country ? 'border-red-500' : ''}`}
                      required
                    />
                    {errors.country && <p className="text-red-500 text-xs mt-1">{errors.country}</p>}
                  </div>
                  <div className="col-span-1">
                    <label className="text-sm font-medium text-gray-700 mb-1 block">Регион</label>
                    <Input
                      placeholder="Область/Край"
                      value={data.region}
                      onChange={(e) => setData('region', e.target.value)}
                      className={`h-11 ${errors.region ? 'border-red-500' : ''}`}
                      required
                    />
                    {errors.region && <p className="text-red-500 text-xs mt-1">{errors.region}</p>}
                  </div>
                  <div className="col-span-1">
                    <label className="text-sm font-medium text-gray-700 mb-1 block">Город</label>
                    <Input
                      placeholder="Город"
                      value={data.city}
                      onChange={(e) => setData('city', e.target.value)}
                      className={`h-11 ${errors.city ? 'border-red-500' : ''}`}
                      required
                    />
                    {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
                  </div>
                  <div className="col-span-1">
                    <label className="text-sm font-medium text-gray-700 mb-1 block">Индекс</label>
                    <Input
                      placeholder="Почтовый индекс"
                      value={data.postal_code}
                      onChange={(e) => setData('postal_code', e.target.value)}
                      className={`h-11 ${errors.postal_code ? 'border-red-500' : ''}`}
                      required
                    />
                    {errors.postal_code && <p className="text-red-500 text-xs mt-1">{errors.postal_code}</p>}
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1 block">Email</label>
                    <Input
                      placeholder="Email"
                      type="email"
                      value={data.email}
                      onChange={(e) => setData('email', e.target.value)}
                      className={`h-11 ${errors.email ? 'border-red-500' : ''}`}
                      required
                    />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1 block">Телефон</label>
                    <Input
                      placeholder="Телефон"
                      value={data.phone}
                      onChange={(e) => setData('phone', e.target.value)}
                      className={`h-11 ${errors.phone ? 'border-red-500' : ''}`}
                      required
                    />
                    {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                  </div>
                </div>
              </div>
            )}

            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <h2 className="mb-6 text-xl font-bold text-gray-900">Способ оплаты</h2>
              <div className="grid grid-cols-3 sm:grid-cols-5 gap-4 mb-6">
                {paymentOptions.map((option) => (
                  <label
                    key={option.value}
                    className={`flex flex-col items-center justify-center cursor-pointer p-3 rounded-lg border transition-all h-24 ${data.payment_method === option.value
                        ? 'border-[#FA8232] bg-[#FFF8F0] shadow-sm'
                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                      }`}
                  >
                    <span className="text-3xl mb-2 filter drop-shadow-sm">{option.icon}</span>
                    <span className="text-xs font-medium text-gray-700 text-center leading-tight">{option.label}</span>
                    <input
                      type="radio"
                      name="payment"
                      value={option.value}
                      checked={data.payment_method === option.value}
                      onChange={() => setData('payment_method', option.value)}
                      className="hidden" // Hiding actual radio, styling the label
                    />
                  </label>
                ))}
              </div>
              {data.payment_method === 'card' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4 p-4 bg-gray-50 rounded-lg border border-gray-100">
                  <Input placeholder="Имя на карте" className="col-span-1 sm:col-span-2 h-11 bg-white" />
                  <Input placeholder="Номер карты" className="col-span-1 sm:col-span-2 h-11 bg-white" />
                  <Input placeholder="Срок действия (MM/YY)" className="h-11 bg-white" />
                  <Input placeholder="CVC" className="h-11 bg-white" />
                </div>
              )}
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <h2 className="mb-4 text-xl font-bold text-gray-900">Дополнительная информация</h2>
              <label className="text-sm font-medium text-gray-700 mb-1 block">Комментарий к заказу</label>
              <textarea
                className="w-full rounded-md border border-gray-300 p-3 text-sm focus:border-[#FA8232] focus:ring-[#FA8232] min-h-[100px]"
                rows={4}
                placeholder="Примечания к вашему заказу, например, особые пожелания по доставке."
                value={data.comment}
                onChange={(e) => setData('comment', e.target.value)}
              />
            </div>
          </form>
          {/* Order Summary */}
          <div className="lg:col-span-4">
            <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm sticky top-4">
              <h2 className="mb-6 text-xl font-bold text-gray-900 border-b pb-4">Ваш заказ</h2>
              {cartItems.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-500 mb-4">Корзина пуста</p>
                  <Link href="/cart">
                    <Button variant="outline" className="text-[#FA8232] border-[#FA8232] hover:bg-orange-50">
                      Вернуться в корзину
                    </Button>
                  </Link>
                </div>
              ) : (
                <>
                  <div className="space-y-4 mb-6 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex items-start space-x-3 py-2 border-b border-gray-50 last:border-0">
                        <div className="h-14 w-14 flex-shrink-0 rounded-md border border-gray-200 bg-gray-50 overflow-hidden">
                          {item.listing.images && item.listing.images.length > 0 ? (
                            <img
                              src={item.listing.images[0]}
                              alt={item.listing.title}
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <div className="h-full w-full flex items-center justify-center">
                              <span className="text-xs text-gray-400">Нет фото</span>
                            </div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-medium text-gray-900 line-clamp-2 leading-snug mb-1">{item.listing.title}</div>
                          <div className="text-xs text-gray-500">
                            <span className="font-semibold text-gray-700">{item.quantity}</span> x {item.listing.price.toLocaleString('ru-RU')} ₸
                          </div>
                        </div>
                        <div className="text-sm font-semibold text-gray-900">
                          {(item.quantity * item.listing.price).toLocaleString('ru-RU')} ₸
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="space-y-3 text-sm bg-gray-50 p-4 rounded-lg">
                    <div className="flex justify-between text-gray-600">
                      <span>Промежуточный итог:</span>
                      <span className="font-medium text-gray-900">{subtotal.toLocaleString('ru-RU')} ₸</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>Доставка:</span>
                      <span className="font-medium text-green-600">{shipping === 0 ? 'Бесплатно' : `${Number(shipping).toLocaleString('ru-RU')} ₸`}</span>
                    </div>
                    {discount > 0 && (
                      <div className="flex justify-between text-gray-600">
                        <span>Скидка:</span>
                        <span className="text-red-500">-{discount.toLocaleString('ru-RU')} ₸</span>
                      </div>
                    )}
                    <div className="flex justify-between text-gray-600">
                      <span>НДС (12%):</span>
                      <span className="font-medium text-gray-900">{Number(tax).toFixed(2)} ₸</span>
                    </div>
                    <Separator className="my-2" />
                    <div className="flex justify-between font-bold text-lg">
                      <span>Итого:</span>
                      <span className="text-[#FA8232]">{total.toLocaleString('ru-RU')} ₸</span>
                    </div>
                  </div>
                  <Button
                    type="submit"
                    onClick={handleSubmit}
                    disabled={processing || cartItems.length === 0}
                    className="mt-6 w-full bg-[#FA8232] uppercase text-white hover:bg-[#E97527] h-12 font-bold shadow-md shadow-orange-100 transition-all hover:shadow-lg"
                  >
                    {processing ? 'Оформление...' : 'Оформить заказ'}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
