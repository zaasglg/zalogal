import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowRight } from 'lucide-react';

export function NewsletterSection() {
    return (
        <div className="w-full bg-[#2B6B8F] py-8 md:py-12">
            <div className="mx-auto max-w-4xl text-center px-4">
                {/* Title */}
                <h2 className="mb-3 md:mb-4 text-xl md:text-3xl font-bold text-white">
                    Подпишитесь на нашу рассылку новостей
                </h2>

                {/* Description */}
                <p className="mb-6 md:mb-8 text-xs md:text-sm text-white/90">
                    Хотите первыми узнавать о новых продуктах, акциях и
                    <br className="hidden md:block" /><span className="md:hidden"> </span>специальных предложениях? Подпишитесь на нашу рассылку
                    <br className="hidden md:block" /><span className="md:hidden"> </span>новостей и будьте в курсе всех обновлений!
                </p>

                {/* Email Form */}
                <div className="mx-auto mb-6 md:mb-8 flex flex-col sm:flex-row max-w-2xl gap-2">
                    <Input
                        type="email"
                        placeholder="Адрес электронной почты"
                        className="h-12 flex-1 rounded-sm border-white/20 bg-white text-gray-900 placeholder:text-gray-500 rounded-none"
                    />
                    <Button className="h-12 rounded-sm bg-[#FF6B35] px-6 text-white hover:bg-[#E55A2B] rounded-none w-full sm:w-auto">
                        ПОДПИСАТЬСЯ
                        <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5" />
                    </Button>
                </div>

                {/* Partner Logos */}
                <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8 opacity-80">
                    <img
                        src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_light_color_92x30dp.png"
                        alt="Google"
                        className="h-4 md:h-6 brightness-0 invert"
                    />
                    <img
                        src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg"
                        alt="Amazon"
                        className="h-4 md:h-6 brightness-0 invert"
                    />
                    <div className="text-sm md:text-xl font-bold text-white">PHILIPS</div>
                    <div className="text-sm md:text-xl font-bold text-white">TOSHIBA</div>
                    <div className="text-sm md:text-xl font-bold text-white">SAMSUNG</div>
                </div>
            </div>
        </div>
    );
}
