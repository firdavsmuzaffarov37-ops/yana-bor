import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ArrowRight, ArrowRightLeft, Sparkles, ShieldCheck, ShoppingBag } from 'lucide-react';
import { useMarketplace } from '../../context/MarketplaceContext';
import { useLanguage } from '../../context/LanguageContext';

export default function HeroSection() {
  const [activeTab, setActiveTab] = useState('buy'); // buy or sell
  const { searchTerm, setSearchTerm } = useMarketplace();
  const { t, getLocalizedCategory } = useLanguage();
  const navigate = useNavigate();

  const quickPills = [
    { id: 'electronics' },
    { id: 'fashion' },
    { id: 'furniture' },
    { id: 'phones' },
    { id: 'books' },
    { id: 'sports' }
  ];

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    navigate('/explore');
  };

  const handleQuickPill = (catId) => {
    navigate(`/explore?category=${catId}`);
  };

  return (
    <section className="relative pt-6 pb-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Dark Editorial Hero Container */}
        <div className="relative rounded-[2.5rem] bg-[#141A1E] text-white p-8 sm:p-14 lg:p-20 overflow-hidden shadow-2xl border border-stone-800">
          
          {/* Subtle Ambient Background Gradient & Pattern */}
          <div className="absolute inset-0 bg-gradient-to-tr from-emerald-950/80 via-transparent to-amber-950/20 pointer-events-none"></div>
          <div className="absolute -right-20 -top-20 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none"></div>
          
          {/* Background image overlay with soft opacity for texture */}
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-15 mix-blend-luminosity pointer-events-none"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=1600&auto=format&fit=crop&q=80')`
            }}
          ></div>

          <div className="relative z-10 max-w-2xl space-y-6">
            
            {/* Tagline Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-400/30 text-emerald-300 text-xs font-semibold backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span>{t('home.heroTagline')}</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-cream-50 leading-[1.15]">
              {t('home.heroTitle1')} <br />
              <span className="text-emerald-400 italic">{t('home.heroTitleHighlight')}</span> {t('home.heroTitle2')}
            </h1>

            {/* Subtitle */}
            <p className="text-stone-300 text-base sm:text-lg leading-relaxed max-w-xl font-normal">
              {t('home.heroSubtitle')}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                to="/explore"
                className="px-7 py-3.5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-charcoal-900 font-bold text-sm shadow-lg shadow-emerald-500/25 transition flex items-center gap-2 group"
              >
                <span>{t('home.startShopping')}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                to="/sell"
                className="px-7 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-medium text-sm border border-white/20 backdrop-blur-md transition flex items-center gap-2"
              >
                <span>{t('home.sellOrExchange')}</span>
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="pt-8 flex flex-wrap items-center gap-6 sm:gap-10 border-t border-stone-800/80 text-xs text-stone-300">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-emerald-900/50 border border-emerald-700/50 flex items-center justify-center text-emerald-400">
                  <ShoppingBag className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-bold text-white text-sm">{t('home.activeAdsCount')}</div>
                  <div className="text-stone-400">{t('home.activeAdsLabel')}</div>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-emerald-900/50 border border-emerald-700/50 flex items-center justify-center text-emerald-400">
                  <ArrowRightLeft className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-bold text-white text-sm">{t('home.exchangeSuccessCount')}</div>
                  <div className="text-stone-400">{t('home.exchangeSuccessLabel')}</div>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-emerald-900/50 border border-emerald-700/50 flex items-center justify-center text-emerald-400">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-bold text-white text-sm">{t('home.trustScore')}</div>
                  <div className="text-stone-400">{t('home.trustLabel')}</div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Floating Search Pill Container */}
        <div className="relative -mt-10 max-w-4xl mx-auto px-4 z-20">
          <div className="bg-white rounded-3xl p-4 sm:p-5 shadow-float border border-stone-200/90 backdrop-blur-xl">
            <form onSubmit={handleSearchSubmit} className="space-y-3">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                
                {/* Buy / Sell Toggle Pill */}
                <div className="inline-flex p-1 bg-stone-100 rounded-2xl flex-shrink-0">
                  <button
                    type="button"
                    onClick={() => setActiveTab('buy')}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
                      activeTab === 'buy'
                        ? 'bg-white text-emerald-950 shadow-sm'
                        : 'text-stone-600 hover:text-stone-900'
                    }`}
                  >
                    {t('home.tabBuy')}
                  </button>
                  <button
                    type="button"
                    onClick={() => { setActiveTab('sell'); navigate('/sell'); }}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
                      activeTab === 'sell'
                        ? 'bg-white text-emerald-950 shadow-sm'
                        : 'text-stone-600 hover:text-stone-900'
                    }`}
                  >
                    {t('home.tabSell')}
                  </button>
                </div>

                {/* Search Input */}
                <div className="relative flex-1">
                  <input
                    type="text"
                    placeholder={t('common.searchPlaceholder')}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-[#FAF8F5] focus:bg-white border border-stone-200 focus:border-emerald-600 text-sm text-charcoal-900 placeholder-stone-400 rounded-2xl py-3 pl-11 pr-4 focus:outline-none transition shadow-inner"
                  />
                  <Search className="w-5 h-5 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>

                {/* Submit Action Button */}
                <button
                  type="submit"
                  className="px-7 py-3 rounded-2xl bg-emerald-800 hover:bg-emerald-900 text-white font-semibold text-sm shadow-md transition flex items-center justify-center gap-2 flex-shrink-0"
                >
                  <Search className="w-4 h-4 text-emerald-300" />
                  <span>{t('common.search')}</span>
                </button>
              </div>

              {/* Popular Categories Tags */}
              <div className="flex items-center gap-2 pt-1 text-xs text-stone-500 overflow-x-auto no-scrollbar">
                <span className="font-bold text-[10px] tracking-wider uppercase text-stone-400 flex-shrink-0">
                  {t('home.popular')}
                </span>
                {quickPills.map(pill => (
                  <button
                    key={pill.id}
                    type="button"
                    onClick={() => handleQuickPill(pill.id)}
                    className="px-3 py-1 rounded-full bg-stone-100 hover:bg-emerald-50 hover:text-emerald-800 text-stone-700 font-medium transition flex-shrink-0 border border-stone-200/50"
                  >
                    {getLocalizedCategory(pill.id)}
                  </button>
                ))}
              </div>
            </form>
          </div>
        </div>

      </div>
    </section>
  );
}
