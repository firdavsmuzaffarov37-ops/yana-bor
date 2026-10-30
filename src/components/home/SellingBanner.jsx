import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Sparkles } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export default function SellingBanner() {
  const { t, formatCurrency, getLocalizedRegion } = useLanguage();

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Warm Cream Card */}
        <div className="relative rounded-[2.5rem] bg-[#F4EFE6] border border-[#E5DFD3] p-8 sm:p-12 lg:p-16 overflow-hidden">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Column Text */}
            <div className="lg:col-span-7 space-y-6">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-600/10 text-amber-900 border border-amber-600/20">
                {t('home.sellerCenterBadge')}
              </span>

              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-charcoal-900 leading-tight">
                {t('home.sellerCenterTitle1')} <br className="hidden sm:inline" />
                {t('home.sellerCenterTitle2')}
              </h2>

              <p className="text-stone-600 text-sm sm:text-base leading-relaxed max-w-xl">
                {t('home.sellerCenterDesc')}
              </p>

              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-2.5 text-stone-800 text-sm font-medium">
                  <CheckCircle2 className="w-5 h-5 text-emerald-700 flex-shrink-0" />
                  <span>{t('home.benefit1')}</span>
                </div>
                <div className="flex items-center gap-2.5 text-stone-800 text-sm font-medium">
                  <CheckCircle2 className="w-5 h-5 text-emerald-700 flex-shrink-0" />
                  <span>{t('home.benefit2')}</span>
                </div>
                <div className="flex items-center gap-2.5 text-stone-800 text-sm font-medium">
                  <CheckCircle2 className="w-5 h-5 text-emerald-700 flex-shrink-0" />
                  <span>{t('home.benefit3')}</span>
                </div>
              </div>

              <div className="pt-4">
                <Link
                  to="/sell"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-sm shadow-lg shadow-emerald-900/15 hover:shadow-xl transition transform hover:-translate-y-0.5"
                >
                  <span>{t('home.postAdNow')}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Right Column - Floating Card Preview */}
            <div className="lg:col-span-5 relative flex justify-center">
              {/* Backing decorative glow */}
              <div className="absolute inset-0 bg-emerald-500/10 rounded-3xl blur-2xl transform rotate-3"></div>

              {/* Floating Product Card */}
              <div className="relative w-full max-w-sm bg-white rounded-3xl p-5 shadow-2xl border border-stone-200/90 transform hover:-rotate-1 transition-transform duration-300">
                <div className="relative rounded-2xl overflow-hidden aspect-[4/3] mb-4 bg-stone-100">
                  <img
                    src="https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&auto=format&fit=crop&q=80"
                    alt="Vintage Designer Bag"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                    {t('common.active')}
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-stone-400">
                    {t('categories.fashion')}
                  </div>
                  <h4 className="font-bold text-stone-900 text-base">
                    Vintage Leather Bag
                  </h4>
                  <div className="flex items-center justify-between pt-2">
                    <span className="text-lg font-bold text-emerald-800">
                      {formatCurrency(850000)}
                    </span>
                    <span className="text-xs text-stone-500">
                      {getLocalizedRegion('toshkent-shahar')}
                    </span>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
                  <span className="flex items-center gap-1 text-emerald-700 font-medium">
                    <Sparkles className="w-3.5 h-3.5" /> 12 {t('product.views')}
                  </span>
                  <span>{t('common.today')}</span>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
