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
        <div className="mx-auto max-w-7xl">
          <Breadcrumbs
            breadcrumbs={[
              { title: 'Главная', href: '/' },
              { title: 'Shopping Card', href: '/cart' },
              { title: 'Оформление заказа', href: '' },
            ]}
          />
        </div>
      </div>
      <div className="mx-auto max-w-7xl py-8">
        <div className="grid grid-cols-12 gap-8">
          {/* Billing Form */}
          <form onSubmit={handleSubmit} className="col-span-8 space-y-8">
            {/* Выбор сохраненного адреса */}
            {addresses.length > 0 && (
              <div className="mb-6 rounded-lg border border-gray-200 bg-white p-4">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="text-base font-semibold">Сохраненные адреса</h3>
                  <label className="flex items-center space-x-2 cursor-pointer">
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
                      className="rounded border-gray-300"
                    />
                    <span className="text-sm text-gray-600">Использовать сохраненный адрес</span>
                  </label>
                </div>
                {useSavedAddress && (
                  <div className="space-y-2">
                    {addresses.map((address) => (
                      <label
                        key={address.id}
                        className={`flex cursor-pointer items-start space-x-3 rounded border p-3 transition-colors ${
                          selectedAddressId === address.id
                            ? 'border-[#FA8232] bg-[#FA8232]/5'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <input
                          type="radio"
                          name="saved_address"
                          value={address.id}
                          checked={selectedAddressId === address.id}
                          onChange={() => setSelectedAddressId(address.id)}
                          className="mt-1"
                        />
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <span className="font-medium text-gray-900">{address.full_name}</span>
                            {address.is_default && (
                              <span className="rounded bg-blue-100 px-2 py-1 text-xs text-blue-800">
                                По умолчанию
                              </span>
                            )}
                          </div>
                          <p className="mt-1 text-sm text-gray-600">
                            {address.address_line_1}
                            {address.address_line_2 && `, ${address.address_line_2}`}
                          </p>
                          <p className="text-sm text-gray-600">
                            {address.city}, {address.state || ''} {address.postal_code}
                          </p>
                          <p className="text-sm text-gray-600">{address.country}</p>
                          {address.phone && (
                            <p className="mt-1 text-sm text-gray-600">Телефон: {address.phone}</p>
                          )}
                        </div>
                      </label>
                    ))}
                  </div>
                )}
              </div>
            )}
            {(!useSavedAddress || addresses.length === 0) && (
              <div>
                <h2 className="mb-4 text-lg font-semibold">Платежная информация</h2>
              <div className="grid grid-cols-4 gap-4 mb-4">
                <div className="col-span-1">
                  <Input 
                    placeholder="Имя" 
                    value={data.first_name}
                    onChange={(e) => setData('first_name', e.target.value)}
                    className={errors.first_name ? 'border-red-500' : ''}
                    required
                  />
                  {errors.first_name && <p className="text-red-500 text-xs mt-1">{errors.first_name}</p>}
                </div>
                <div className="col-span-1">
                  <Input 
                    placeholder="Фамилия" 
                    value={data.last_name}
                    onChange={(e) => setData('last_name', e.target.value)}
                    className={errors.last_name ? 'border-red-500' : ''}
                    required
                  />
                  {errors.last_name && <p className="text-red-500 text-xs mt-1">{errors.last_name}</p>}
                </div>
                <div className="col-span-2">
                  <Input 
                    placeholder="Компания (необязательно)" 
                    value={data.company}
                    onChange={(e) => setData('company', e.target.value)}
                  />
                </div>
              </div>
              <div className="mb-4">
                <Input 
                  placeholder="Адрес" 
                  value={data.address}
                  onChange={(e) => setData('address', e.target.value)}
                  className={errors.address ? 'border-red-500' : ''}
                  required
                />
                {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
              </div>
              <div className="grid grid-cols-4 gap-4 mb-4">
                <div className="col-span-1">
                  <Input 
                    placeholder="Страна" 
                    value={data.country}
                    onChange={(e) => setData('country', e.target.value)}
                    className={errors.country ? 'border-red-500' : ''}
                    required
                  />
                  {errors.country && <p className="text-red-500 text-xs mt-1">{errors.country}</p>}
                </div>
                <div className="col-span-1">
                  <Input 
                    placeholder="Регион/Область" 
                    value={data.region}
                    onChange={(e) => setData('region', e.target.value)}
                    className={errors.region ? 'border-red-500' : ''}
                    required
                  />
                  {errors.region && <p className="text-red-500 text-xs mt-1">{errors.region}</p>}
                </div>
                <div className="col-span-1">
                  <Input 
                    placeholder="Город" 
                    value={data.city}
                    onChange={(e) => setData('city', e.target.value)}
                    className={errors.city ? 'border-red-500' : ''}
                    required
                  />
                  {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
                </div>
                <div className="col-span-1">
                  <Input 
                    placeholder="Почтовый индекс" 
                    value={data.postal_code}
                    onChange={(e) => setData('postal_code', e.target.value)}
                    className={errors.postal_code ? 'border-red-500' : ''}
                    required
                  />
                  {errors.postal_code && <p className="text-red-500 text-xs mt-1">{errors.postal_code}</p>}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <Input 
                    placeholder="Email" 
                    type="email"
                    value={data.email}
                    onChange={(e) => setData('email', e.target.value)}
                    className={errors.email ? 'border-red-500' : ''}
                    required
                  />
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                </div>
                <div>
                  <Input 
                    placeholder="Телефон" 
                    value={data.phone}
                    onChange={(e) => setData('phone', e.target.value)}
                    className={errors.phone ? 'border-red-500' : ''}
                    required
                  />
                  {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                </div>
              </div>
              </div>
            )}
            <Separator />
            <div>
              <h2 className="mb-4 text-lg font-semibold">Способ оплаты</h2>
              <div className="grid grid-cols-5 gap-4 mb-4">
                {paymentOptions.map((option) => (
                  <label key={option.value} className="flex flex-col items-center cursor-pointer">
                    <span className="text-3xl mb-2">{option.icon}</span>
                    <input
                      type="radio"
                      name="payment"
                      value={option.value}
                      checked={data.payment_method === option.value}
                      onChange={() => setData('payment_method', option.value)}
                      className="mb-1"
                    />
                    <span className="text-xs text-gray-700">{option.label}</span>
                  </label>
                ))}
              </div>
              {data.payment_method === 'card' && (
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <Input placeholder="Имя на карте" className="col-span-2" />
                  <Input placeholder="Номер карты" className="col-span-2" />
                  <Input placeholder="Срок действия (MM/YY)" />
                  <Input placeholder="CVC" />
                </div>
              )}
            </div>
            <Separator />
            <div>
              <h2 className="mb-4 text-lg font-semibold">Дополнительная информация</h2>
              <textarea
                className="w-full rounded border border-gray-300 p-2 text-sm"
                rows={4}
                placeholder="Комментарий к заказу (необязательно)"
                value={data.comment}
                onChange={(e) => setData('comment', e.target.value)}
              />
            </div>
          </form>
          {/* Order Summary */}
          <div className="col-span-4">
            <div className="rounded border border-gray-200 bg-white p-6">
              <h2 className="mb-4 text-lg font-semibold">Ваш заказ</h2>
              {cartItems.length === 0 ? (
                <p className="text-gray-500 text-sm mb-4">Корзина пуста</p>
              ) : (
                <>
                  <div className="space-y-4 mb-4">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex items-center space-x-3">
                        {item.listing.images && item.listing.images.length > 0 ? (
                          <img 
                            src={item.listing.images[0]} 
                            alt={item.listing.title} 
                            className="h-12 w-12 rounded border border-gray-200 object-cover" 
                          />
                        ) : (
                          <div className="h-12 w-12 rounded border border-gray-200 bg-gray-100 flex items-center justify-center">
                            <span className="text-xs text-gray-400">Нет фото</span>
                          </div>
                        )}
                        <div className="flex-1">
                          <div className="text-sm font-medium text-gray-900 line-clamp-1">{item.listing.title}</div>
                          <div className="text-xs text-gray-500">{item.quantity} x {item.listing.price.toLocaleString('ru-RU')} ₸</div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Промежуточный итог:</span>
                      <span>{subtotal.toLocaleString('ru-RU')} ₸</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Доставка:</span>
                      <span>{shipping === 0 ? 'Бесплатно' : `${Number(shipping).toLocaleString('ru-RU')} ₸`}</span>
                    </div>
                    {discount > 0 && (
                      <div className="flex justify-between">
                        <span>Скидка:</span>
                        <span>-{discount.toLocaleString('ru-RU')} ₸</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span>НДС (12%):</span>
                      <span>{Number(tax).toFixed(2)} ₸</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between font-semibold text-base">
                      <span>Итого</span>
                      <span className="text-blue-600">{total.toFixed(2)} ₸</span>
                    </div>
                  </div>
                  <Button 
                    type="submit"
                    onClick={handleSubmit}
                    disabled={processing || cartItems.length === 0}
                    className="mt-6 w-full bg-[#FA8232] uppercase text-white hover:bg-[#E97527] h-12"
                  >
                    {processing ? 'Оформление...' : 'Оформить заказ'}
                    <ArrowRight className="ml-2 h-4 w-4" />
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
