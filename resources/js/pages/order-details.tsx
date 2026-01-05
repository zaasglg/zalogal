import { Breadcrumbs } from '@/components/breadcrumbs';
import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import { Head, Link } from '@inertiajs/react';
import { Check } from 'lucide-react';

interface Order {
    id: number;
    tracking_number: string | null;
    total_price: number;
    quantity: number;
    status: string;
    created_at: string;
    updated_at: string;
    payment_method: string;
    first_name: string;
    last_name: string;
    address: string;
    city: string;
    region: string;
    postal_code: string;
    country: string;
    email: string;
    phone: string;
    comment?: string | null;
    listing: {
        id: number;
        title: string;
        images: string[] | null;
        price: number;
    };
    seller: {
        id: number;
        name: string;
    };
}

interface Props {
    order: Order;
}

const getStatusSteps = (status: string) => {
    const steps = [
        { key: 'pending', label: 'Заказ оформлен', completed: true },
        { key: 'accepted', label: 'Принят', completed: false },
        { key: 'packed', label: 'Упаковка', completed: false },
        { key: 'shipped', label: 'В пути', completed: false },
        { key: 'delivered', label: 'Доставлено', completed: false },
    ];

    const statusOrder = ['pending', 'accepted', 'packed', 'shipped', 'delivered', 'completed'];
    const currentIndex = statusOrder.indexOf(status);

    return steps.map((step, index) => ({
        ...step,
        completed: index <= currentIndex,
        active: index === currentIndex,
    }));
};

const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const months = ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'];
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    
    return `${day} ${month}, ${year} в ${hours}:${minutes}`;
};

const getStatusText = (status: string): string => {
    const statusMap: Record<string, string> = {
        'pending': 'В обработке',
        'accepted': 'Принят',
        'rejected': 'Отменен',
        'packed': 'Упакован',
        'shipped': 'Отправлен',
        'delivered': 'Доставлен',
        'completed': 'Завершен',
    };
    
    return statusMap[status] || status;
};

export default function OrderDetails({ order }: Props) {
    const statusSteps = getStatusSteps(order.status);
  return (
    <>
      <Head title="Детали заказа - Zalogal" />
      <Header />
      <div className="bg-[#F2F4F5] py-4">
        <div className="mx-auto max-w-7xl">
          <Breadcrumbs
            breadcrumbs={[
              { title: 'Главная', href: '/' },
              { title: 'Личный кабинет', href: '/profile' },
              { title: 'История заказов', href: '/profile/orders' },
              { title: 'Детали заказа', href: '' },
            ]}
          />
        </div>
      </div>
      <div className="mx-auto max-w-7xl py-12">
        {/* Order Summary */}
        <div className="bg-yellow-50 border border-yellow-200 rounded p-6 flex justify-between items-center mb-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="text-gray-700 font-semibold text-lg">Заказ #{order.tracking_number}</div>
            </div>
            <div className="text-gray-500 text-sm">
              {order.quantity} {order.quantity === 1 ? 'товар' : order.quantity < 5 ? 'товара' : 'товаров'} • Заказ оформлен {formatDate(order.created_at)}
            </div>
          </div>
          <div className="text-2xl font-bold text-[#2B6B8F]">
            {Number(order.total_price).toLocaleString('ru-RU')} ₸
          </div>
        </div>

        {/* Order Status Tracking */}
        <div className="bg-white border border-gray-200 rounded p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="text-gray-700 font-semibold">
              Статус заказа: <span className="text-black">{getStatusText(order.status)}</span>
            </div>
            <div className="flex items-center space-x-4">
              {statusSteps.map((step, index) => (
                <div key={index} className="flex items-center">
                  <div className="flex flex-col items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${
                      step.completed 
                        ? step.active 
                          ? 'bg-[#FA8232]' 
                          : 'bg-[#2B6B8F]'
                        : 'bg-gray-200 text-gray-500'
                    }`}>
                      {step.completed ? <Check className="h-4 w-4" /> : index + 1}
                    </div>
                    <div className={`text-xs mt-2 ${step.completed ? 'text-gray-700' : 'text-gray-400'}`}>
                      {step.label}
                    </div>
                  </div>
                  {index < statusSteps.length - 1 && (
                    <div className={`h-1 w-12 mx-2 rounded ${
                      step.completed ? 'bg-[#FA8232]' : 'bg-gray-200'
                    }`} />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Order Information */}
        <div className="grid grid-cols-2 gap-6 mb-8">
          {/* Product Info */}
          <div className="bg-white border border-gray-200 rounded p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Информация о товаре</h3>
            <div className="flex gap-4">
              {order.listing.images && order.listing.images.length > 0 ? (
                <img 
                  src={order.listing.images[0]} 
                  alt={order.listing.title}
                  className="h-24 w-24 rounded object-cover"
                />
              ) : (
                <div className="h-24 w-24 rounded bg-gray-100 flex items-center justify-center">
                  <span className="text-xs text-gray-400">Нет фото</span>
                </div>
              )}
              <div className="flex-1">
                <Link 
                  href={`/products/${order.listing.id}`}
                  className="font-medium text-gray-900 hover:text-[#2B6B8F] mb-2 block"
                >
                  {order.listing.title}
                </Link>
                <p className="text-sm text-gray-600 mb-1">Количество: {order.quantity}</p>
                <p className="text-sm text-gray-600">Цена за единицу: {Number(order.listing.price).toLocaleString('ru-RU')} ₸</p>
              </div>
            </div>
          </div>

          {/* Delivery Address */}
          <div className="bg-white border border-gray-200 rounded p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Адрес доставки</h3>
            <div className="text-sm text-gray-600 space-y-1">
              <p className="font-medium text-gray-900">{order.first_name} {order.last_name}</p>
              <p>{order.address}</p>
              <p>{order.city}, {order.region}</p>
              <p>{order.postal_code}</p>
              <p>{order.country}</p>
              {order.phone && <p className="mt-2">Телефон: {order.phone}</p>}
              {order.email && <p>Email: {order.email}</p>}
            </div>
          </div>
        </div>

        {/* Payment and Seller Info */}
        <div className="grid grid-cols-2 gap-6 mb-8">
          <div className="bg-white border border-gray-200 rounded p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Способ оплаты</h3>
            <p className="text-sm text-gray-600">
              {order.payment_method === 'cod' ? 'Наложенный платеж' :
               order.payment_method === 'kaspi' ? 'Kaspi' :
               order.payment_method === 'paypal' ? 'PayPal' :
               order.payment_method === 'amazon' ? 'Amazon Pay' :
               order.payment_method === 'card' ? 'Карта' : order.payment_method}
            </p>
          </div>
          <div className="bg-white border border-gray-200 rounded p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Продавец</h3>
            <p className="text-sm text-gray-600">{order.seller.name}</p>
          </div>
        </div>

        {/* Order Activity */}
        <div className="bg-white border border-gray-200 rounded p-6">
          <div className="font-semibold mb-4">Активность заказа</div>
          <ul className="space-y-3">
            <li className="flex items-start space-x-2">
              <span className="text-green-500 mt-1">✔</span>
              <span className="text-gray-700">Заказ оформлен</span>
              <span className="ml-auto text-xs text-gray-400">{formatDate(order.created_at)}</span>
            </li>
            {order.status !== 'pending' && (
              <li className="flex items-start space-x-2">
                <span className="text-blue-500 mt-1">⏳</span>
                <span className="text-gray-700">Заказ обновлен: {getStatusText(order.status)}</span>
                <span className="ml-auto text-xs text-gray-400">{formatDate(order.updated_at)}</span>
              </li>
            )}
            {order.comment && (
              <li className="flex items-start space-x-2">
                <span className="text-gray-500 mt-1">💬</span>
                <span className="text-gray-700">Комментарий: {order.comment}</span>
              </li>
            )}
          </ul>
        </div>
      </div>
      <Footer />
    </>
  );
}
