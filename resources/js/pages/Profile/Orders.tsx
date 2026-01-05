import { Head, router } from '@inertiajs/react';
import { ProfileSidebar } from '@/components/profile-sidebar';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import { Toast } from '@/components/Toast';
import { Package, User, Calendar, DollarSign, ChevronDown, ChevronUp, MapPin, Phone, Mail } from 'lucide-react';
import { useState } from 'react';

interface Order {
  id: number;
  total_price: string;
  status: string;
  buyer_note: string | null;
  seller_note: string | null;
  created_at: string;
  tracking_number?: string | null;
  first_name?: string;
  last_name?: string;
  address?: string;
  city?: string;
  region?: string;
  postal_code?: string;
  country?: string;
  phone?: string;
  email?: string;
  payment_method?: string;
  quantity?: number;
  listing: {
    id: number;
    title: string;
    images: string[] | null;
  };
  buyer: {
    id: number;
    name: string;
    email: string;
  };
}

interface Props {
  orders: {
    data: Order[];
    links: any[];
  };
}

export default function Orders({ orders }: Props) {
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [expandedOrders, setExpandedOrders] = useState<Set<number>>(new Set());

  const filteredOrders = statusFilter === 'all' 
    ? orders.data 
    : orders.data.filter(order => order.status === statusFilter);
  const handleStatusUpdate = (orderId: number, status: string) => {
    router.post(`/orders/${orderId}/status`, { status }, {
      preserveScroll: true,
    });
  };

  const toggleOrderDetails = (orderId: number) => {
    setExpandedOrders(prev => {
      const newSet = new Set(prev);
      if (newSet.has(orderId)) {
        newSet.delete(orderId);
      } else {
        newSet.add(orderId);
      }
      return newSet;
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-gray-100 text-gray-800';
      case 'accepted': return 'bg-gray-100 text-gray-800';
      case 'packed': return 'bg-gray-100 text-gray-800';
      case 'shipped': return 'bg-gray-100 text-gray-800';
      case 'delivered': return 'bg-gray-100 text-gray-800';
      case 'completed': return 'bg-gray-100 text-gray-800';
      case 'rejected': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending': return 'Ожидает';
      case 'accepted': return 'Принят';
      case 'packed': return 'Запакован';
      case 'shipped': return 'В дороге';
      case 'delivered': return 'Доставлен';
      case 'completed': return 'Завершен';
      case 'rejected': return 'Отклонен';
      default: return status;
    }
  };

  return (
    <>
      <Head title="Заказы - Zalogal" />
      <Header />

      <div className="bg-[#F2F4F5] py-4">
        <div className="mx-auto max-w-7xl">
          <Breadcrumbs
            breadcrumbs={[
              { title: 'Главная', href: '/' },
              { title: 'Личный кабинет', href: '/profile' },
              { title: 'Заказы', href: '' },
            ]}
          />
        </div>
      </div>

      <div className="bg-white py-12">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-3">
              <ProfileSidebar />
            </div>

            <div className="col-span-9">
              <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold text-gray-900">Заказы</h1>
              </div>

              <div className="bg-white border border-gray-200 rounded-sm p-4 mb-6">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-sm font-medium text-gray-700">Фильтр:</span>
                  <button
                    onClick={() => setStatusFilter('all')}
                    className={`px-3 py-1.5 text-sm rounded-sm transition-colors ${
                      statusFilter === 'all'
                        ? 'bg-[#2DA5F3] text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Все ({orders.data.length})
                  </button>
                  <button
                    onClick={() => setStatusFilter('pending')}
                    className={`px-3 py-1.5 text-sm rounded-sm transition-colors ${
                      statusFilter === 'pending'
                        ? 'bg-[#2DA5F3] text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Ожидает ({orders.data.filter(o => o.status === 'pending').length})
                  </button>
                  <button
                    onClick={() => setStatusFilter('accepted')}
                    className={`px-3 py-1.5 text-sm rounded-sm transition-colors ${
                      statusFilter === 'accepted'
                        ? 'bg-[#2DA5F3] text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Принят ({orders.data.filter(o => o.status === 'accepted').length})
                  </button>
                  <button
                    onClick={() => setStatusFilter('packed')}
                    className={`px-3 py-1.5 text-sm rounded-sm transition-colors ${
                      statusFilter === 'packed'
                        ? 'bg-[#2DA5F3] text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Запакован ({orders.data.filter(o => o.status === 'packed').length})
                  </button>
                  <button
                    onClick={() => setStatusFilter('shipped')}
                    className={`px-3 py-1.5 text-sm rounded-sm transition-colors ${
                      statusFilter === 'shipped'
                        ? 'bg-[#2DA5F3] text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    В дороге ({orders.data.filter(o => o.status === 'shipped').length})
                  </button>
                  <button
                    onClick={() => setStatusFilter('delivered')}
                    className={`px-3 py-1.5 text-sm rounded-sm transition-colors ${
                      statusFilter === 'delivered'
                        ? 'bg-[#2DA5F3] text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Доставлен ({orders.data.filter(o => o.status === 'delivered').length})
                  </button>
                  <button
                    onClick={() => setStatusFilter('completed')}
                    className={`px-3 py-1.5 text-sm rounded-sm transition-colors ${
                      statusFilter === 'completed'
                        ? 'bg-[#2DA5F3] text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Завершен ({orders.data.filter(o => o.status === 'completed').length})
                  </button>
                  <button
                    onClick={() => setStatusFilter('rejected')}
                    className={`px-3 py-1.5 text-sm rounded-sm transition-colors ${
                      statusFilter === 'rejected'
                        ? 'bg-[#2DA5F3] text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Отклонен ({orders.data.filter(o => o.status === 'rejected').length})
                  </button>
                </div>
              </div>

              {filteredOrders.length === 0 ? (
                <div className="bg-gray-50 rounded-sm p-12 text-center">
                  <Package className="mx-auto h-12 w-12 text-gray-400" />
                  <p className="mt-4 text-gray-600">У вас пока нет заказов</p>
                </div>
              ) : (
                <>
                  <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-sm">
                        <thead className="bg-gray-50 text-gray-600 uppercase">
                          <tr>
                            <th className="px-6 py-3 font-semibold">ID</th>
                            <th className="px-6 py-3 font-semibold">Товар</th>
                            <th className="px-6 py-3 font-semibold">Покупатель</th>
                            <th className="px-6 py-3 font-semibold">Статус</th>
                            <th className="px-6 py-3 font-semibold">Дата</th>
                            <th className="px-6 py-3 font-semibold">Сумма</th>
                            <th className="px-6 py-3 font-semibold">Действия</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                          {filteredOrders.map((order) => (
                            <>
                              <tr 
                                key={order.id} 
                                onClick={() => toggleOrderDetails(order.id)}
                                className="hover:bg-gray-50 transition-colors cursor-pointer"
                              >
                                <td className="px-6 py-4 font-medium text-gray-900">
                                  #{order.id}
                                </td>
                                <td className="px-6 py-4">
                                  <div className="flex items-center gap-3">
                                    {order.listing.images && order.listing.images[0] && (
                                      <img
                                        src={order.listing.images[0]}
                                        alt={order.listing.title}
                                        className="w-12 h-12 object-cover rounded border border-gray-200"
                                      />
                                    )}
                                    <div>
                                      <p className="font-medium text-gray-900">{order.listing.title}</p>
                                      {order.quantity && (
                                        <p className="text-xs text-gray-500">Количество: {order.quantity}</p>
                                      )}
                                    </div>
                                  </div>
                                </td>
                                <td className="px-6 py-4">
                                  <div>
                                    <p className="font-medium text-gray-900">{order.buyer.name}</p>
                                    <p className="text-xs text-gray-500">{order.buyer.email}</p>
                                  </div>
                                </td>
                                <td className="px-6 py-4">
                                  <span className={`px-3 py-1 rounded-md text-xs font-semibold whitespace-nowrap ${getStatusColor(order.status)}`}>
                                    {getStatusText(order.status)}
                                  </span>
                                </td>
                                <td className="px-6 py-4 text-gray-600">
                                  {new Date(order.created_at).toLocaleDateString('ru-RU', { day: 'numeric', month: 'short', year: 'numeric' })}
                                </td>
                                <td className="px-6 py-4">
                                  <p className="font-bold text-gray-900">{Number(order.total_price).toLocaleString('ru-RU')} ₸</p>
                                </td>
                                <td className="px-6 py-4" onClick={(e) => e.stopPropagation()}>
                                  <div className="flex gap-2">
                                    {order.status === 'pending' && (
                                      <>
                                        <button
                                          onClick={() => handleStatusUpdate(order.id, 'accepted')}
                                          className="h-8 px-3 bg-[#2DA5F3] text-white text-xs font-semibold rounded-md hover:bg-[#2B6B8F] transition-colors"
                                        >
                                          Принять
                                        </button>
                                        <button
                                          onClick={() => handleStatusUpdate(order.id, 'rejected')}
                                          className="h-8 px-3 bg-gray-600 text-white text-xs font-semibold rounded-md hover:bg-gray-700 transition-colors"
                                        >
                                          Отклонить
                                        </button>
                                      </>
                                    )}
                                    {order.status === 'accepted' && (
                                      <button
                                        onClick={() => handleStatusUpdate(order.id, 'packed')}
                                        className="h-8 px-3 bg-[#2DA5F3] text-white text-xs font-semibold rounded-md hover:bg-[#2B6B8F] transition-colors"
                                      >
                                        Запакован
                                      </button>
                                    )}
                                    {order.status === 'packed' && (
                                      <button
                                        onClick={() => handleStatusUpdate(order.id, 'shipped')}
                                        className="h-8 px-3 bg-[#2DA5F3] text-white text-xs font-semibold rounded-md hover:bg-[#2B6B8F] transition-colors"
                                      >
                                        В дороге
                                      </button>
                                    )}
                                    {order.status === 'shipped' && (
                                      <button
                                        onClick={() => handleStatusUpdate(order.id, 'delivered')}
                                        className="h-8 px-3 bg-[#2DA5F3] text-white text-xs font-semibold rounded-md hover:bg-[#2B6B8F] transition-colors"
                                      >
                                        Доставлен
                                      </button>
                                    )}
                                    {order.status === 'delivered' && (
                                      <button
                                        onClick={() => handleStatusUpdate(order.id, 'completed')}
                                        className="h-8 px-3 bg-[#2DA5F3] text-white text-xs font-semibold rounded-md hover:bg-[#2B6B8F] transition-colors"
                                      >
                                        Завершить
                                      </button>
                                    )}
                                  </div>
                                </td>
                              </tr>
                              {expandedOrders.has(order.id) && (
                                <tr>
                                  <td colSpan={7} className="px-6 py-5 bg-gray-50">
                                    <div className="space-y-5">
                                      <h4 className="text-base font-semibold text-gray-900 mb-4">Адрес доставки</h4>
                                      <div className="grid grid-cols-2 gap-6">
                                        {/* Левая колонка */}
                                        <div className="space-y-4">
                                          {order.tracking_number && (
                                            <div className="flex items-start gap-3">
                                              <Package className="h-5 w-5 text-gray-600 mt-0.5 flex-shrink-0" />
                                              <div>
                                                <p className="text-sm text-gray-600 mb-1">Трек-номер</p>
                                                <p className="text-base font-semibold text-gray-900 font-mono">
                                                  {order.tracking_number}
                                                </p>
                                              </div>
                                            </div>
                                          )}
                                          
                                          {(order.first_name || order.last_name) && (
                                            <div className="flex items-start gap-3">
                                              <User className="h-5 w-5 text-gray-600 mt-0.5 flex-shrink-0" />
                                              <div>
                                                <p className="text-sm text-gray-600 mb-1">Получатель</p>
                                                <p className="text-base font-semibold text-gray-900">
                                                  {order.first_name} {order.last_name}
                                                </p>
                                              </div>
                                            </div>
                                          )}
                                          
                                          {order.phone && (
                                            <div className="flex items-start gap-3">
                                              <Phone className="h-5 w-5 text-gray-600 mt-0.5 flex-shrink-0" />
                                              <div>
                                                <p className="text-sm text-gray-600 mb-1">Телефон</p>
                                                <p className="text-base font-semibold text-gray-900">{order.phone}</p>
                                              </div>
                                            </div>
                                          )}
                                          
                                          {order.payment_method && (
                                            <div className="flex items-start gap-3">
                                              <DollarSign className="h-5 w-5 text-gray-600 mt-0.5 flex-shrink-0" />
                                              <div>
                                                <p className="text-sm text-gray-600 mb-1">Способ оплаты</p>
                                                <p className="text-base font-semibold text-gray-900">
                                                  {order.payment_method === 'cod' ? 'Наложенный платеж' :
                                                   order.payment_method === 'kaspi' ? 'Kaspi' :
                                                   order.payment_method === 'paypal' ? 'PayPal' :
                                                   order.payment_method === 'amazon' ? 'Amazon Pay' :
                                                   order.payment_method === 'card' ? 'Карта' : order.payment_method}
                                                </p>
                                              </div>
                                            </div>
                                          )}
                                        </div>
                                        
                                        {/* Правая колонка */}
                                        <div className="space-y-4">
                                          {order.address && (
                                            <div className="flex items-start gap-3">
                                              <MapPin className="h-5 w-5 text-gray-600 mt-0.5 flex-shrink-0" />
                                              <div>
                                                <p className="text-sm text-gray-600 mb-1">Адрес</p>
                                                <div className="space-y-0.5">
                                                  <p className="text-base font-semibold text-gray-900">{order.address}</p>
                                                  {order.city && order.region && (
                                                    <p className="text-sm text-gray-700">
                                                      {order.city}, {order.region}
                                                    </p>
                                                  )}
                                                  {order.postal_code && (
                                                    <p className="text-sm text-gray-700">{order.postal_code}</p>
                                                  )}
                                                  {order.country && (
                                                    <p className="text-sm text-gray-700">{order.country}</p>
                                                  )}
                                                </div>
                                              </div>
                                            </div>
                                          )}
                                          
                                          {order.email && (
                                            <div className="flex items-start gap-3">
                                              <Mail className="h-5 w-5 text-gray-600 mt-0.5 flex-shrink-0" />
                                              <div>
                                                <p className="text-sm text-gray-600 mb-1">Email</p>
                                                <p className="text-base font-semibold text-gray-900">{order.email}</p>
                                              </div>
                                            </div>
                                          )}
                                        </div>
                                      </div>
                                      {order.buyer_note && (
                                        <div className="mt-5 pt-5 border-t border-gray-200">
                                          <p className="text-sm font-semibold text-gray-700 mb-2">Сообщение от покупателя:</p>
                                          <p className="text-sm text-gray-600 bg-white rounded-md p-3 border border-gray-200">"{order.buyer_note}"</p>
                                        </div>
                                      )}
                                    </div>
                                  </td>
                                </tr>
                              )}
                            </>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {orders.links.length > 3 && (
                    <div className="flex justify-center gap-2 mt-6">
                      {orders.links.map((link, index) => (
                        <button
                          key={index}
                          onClick={() => link.url && router.visit(link.url)}
                          disabled={!link.url}
                          className={`h-10 px-4 rounded-sm ${
                            link.active
                              ? 'bg-[#2DA5F3] text-white'
                              : link.url
                              ? 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
                              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                          }`}
                          dangerouslySetInnerHTML={{ __html: link.label }}
                        />
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
      <Toast />
    </>
  );
}
