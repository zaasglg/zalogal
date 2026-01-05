import { Breadcrumbs } from '@/components/breadcrumbs';
import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Head, useForm } from '@inertiajs/react';
import { ArrowRight, HelpCircle, Info, PackageSearch, Truck } from 'lucide-react';

export default function TrackOrder() {
  const { data, setData, post, processing, errors } = useForm({
    tracking_number: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post('/track-order');
  };

  return (
    <>
      <Head title="Отследить заказ - Zalogal" />
      <Header />

      <div className="min-h-screen bg-gray-50 flex flex-col">
        {/* Breadcrumbs Section */}
        <div className="bg-[#F2F4F5] py-4">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Breadcrumbs
              breadcrumbs={[
                { title: 'Главная', href: '/' },
                { title: 'Отследить заказ', href: '' },
              ]}
            />
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-grow">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 lg:py-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

              {/* Form Section */}
              <div className="space-y-8">
                <div className="space-y-4">
                  <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight">
                    Отследите путь <br />
                    <span className="text-[#FA8232]">вашего заказа</span>
                  </h1>
                  <p className="text-base sm:text-lg text-gray-600 max-w-xl">
                    Введите трек-номер, чтобы узнать текущий статус доставки и примерное время прибытия.
                  </p>
                </div>

                <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-gray-100">
                  <form className="space-y-6" onSubmit={handleSubmit}>
                    <div className="space-y-2">
                      <Label htmlFor="tracking_number" className="text-sm font-medium text-gray-700">
                        Номер заказа или трек-код
                      </Label>
                      <div className="relative">
                        <PackageSearch className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <Input
                          id="tracking_number"
                          placeholder="Например, ZLG-A3B7K9"
                          value={data.tracking_number}
                          onChange={e => setData('tracking_number', e.target.value)}
                          className={`pl-10 h-12 text-base transition-all hover:border-[#FA8232] focus:border-[#FA8232] focus:ring-[#FA8232] ${errors.tracking_number ? 'border-red-500 hover:border-red-500' : ''}`}
                          required
                        />
                      </div>
                      {errors.tracking_number && (
                        <p className="mt-1 text-sm text-red-500 animate-in slide-in-from-top-1">{errors.tracking_number}</p>
                      )}
                    </div>

                    <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 flex items-start gap-3">
                      <Info className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-blue-700">
                        Трек-номер был отправлен на ваш email и в SMS после подтверждения заказа.
                      </p>
                    </div>

                    <Button
                      type="submit"
                      className="w-full h-12 bg-[#FA8232] hover:bg-[#E97527] text-white font-semibold text-base shadow-lg shadow-orange-500/20 transition-all active:scale-[0.98]"
                      disabled={processing}
                    >
                      {processing ? 'Поиск...' : 'Отследить посылку'}
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </form>
                </div>

                {/* Mobile Help Text */}
                <div className="flex items-center gap-2 text-sm text-gray-500 lg:hidden">
                  <HelpCircle className="h-4 w-4" />
                  <span>Не можете найти номер? <a href="/contact" className="text-[#FA8232] hover:underline">Напишите нам</a></span>
                </div>
              </div>

              {/* Illustration / Info Section (Hidden on small mobile if desired, but good for "Pro" look) */}
              <div className="hidden lg:block relative">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-100/50 to-blue-50/50 rounded-3xl -z-10 blur-3xl transform rotate-3" />
                <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 relative overflow-hidden">
                  {/* Decorative Background Pattern */}
                  <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-orange-50 opacity-50" />
                  <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 rounded-full bg-blue-50 opacity-50" />

                  <div className="relative z-10 space-y-8">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-full bg-orange-100 flex items-center justify-center text-[#FA8232]">
                        <Truck className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">Быстрая доставка</h3>
                        <p className="text-sm text-gray-500">По всему Казахстану</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                        <PackageSearch className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">Отслеживание 24/7</h3>
                        <p className="text-sm text-gray-500">Статус обновляется в реальном времени</p>
                      </div>
                    </div>

                    <div className="pt-8 border-t border-gray-100">
                      <h4 className="font-medium text-gray-900 mb-2">Частые вопросы</h4>
                      <ul className="space-y-2 text-sm text-gray-600">
                        <li className="flex items-center gap-2">
                          <div className="h-1.5 w-1.5 rounded-full bg-[#FA8232]" />
                          Как узнать номер заказа?
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="h-1.5 w-1.5 rounded-full bg-[#FA8232]" />
                          Что делать, если заказ задерживается?
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="h-1.5 w-1.5 rounded-full bg-[#FA8232]" />
                          Можно ли изменить адрес доставки?
                        </li>
                      </ul>
                      <div className="mt-4">
                        <a href="/faq" className="text-[#FA8232] text-sm font-medium hover:underline inline-flex items-center">
                          Перейти в FAQ <ArrowRight className="ml-1 h-3 w-3" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
}
