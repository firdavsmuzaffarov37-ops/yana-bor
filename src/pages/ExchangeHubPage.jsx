import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRightLeft, Plus } from 'lucide-react';
import { useMarketplace } from '../context/MarketplaceContext';
import { useLanguage } from '../context/LanguageContext';
import ProductCard from '../components/marketplace/ProductCard';

export default function ExchangeHubPage() {
  const { listings, proposals } = useMarketplace();
  const { t, getLocalizedCategory } = useLanguage();
  const [filterCat, setFilterCat] = useState('all');

  // All listings open for exchange
  const exchangeItems = listings.filter(item => {
    if (!item.isExchangeable) return false;
    if (filterCat !== 'all' && item.category !== filterCat) return false;
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      {/* Editorial Header Banner */}
      <div className="relative rounded-[2.5rem] bg-gradient-to-br from-emerald-950 via-[#0a3528] to-stone-900 text-white p-8 sm:p-14 overflow-hidden shadow-2xl border border-emerald-800/40">
        <div className="relative z-10 max-w-2xl space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
            <ArrowRightLeft className="w-3.5 h-3.5 text-emerald-400" />
            <span>{t('exchangeHub.badge')}</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-bold leading-tight text-cream-50">
            {t('exchangeHub.title1')} <br />
            <span className="text-emerald-400 italic">{t('exchangeHub.titleHighlight')}</span> {t('exchangeHub.title2')}
          </h1>

          <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
            {t('exchangeHub.subtitle')}
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-4">
            <Link
              to="/sell"
              className="px-6 py-3 rounded-full bg-emerald-500 hover:bg-emerald-400 text-charcoal-900 font-bold text-xs shadow-md transition flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              <span>{t('exchangeHub.postForExchange')}</span>
            </Link>

            <Link
              to="/profile?tab=exchanges"
              className="px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-semibold border border-white/20 transition"
            >
              {t('exchangeHub.myProposals')} ({proposals.length})
            </Link>
          </div>
        </div>
      </div>

      {/* How Barter / Exchange Works Steps */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-3xl p-6 border border-stone-200/90 shadow-soft space-y-2">
          <span className="text-2xl font-bold text-emerald-800">1</span>
          <h3 className="font-bold text-base text-charcoal-900">{t('exchangeHub.step1Title')}</h3>
          <p className="text-xs text-stone-500 leading-relaxed">
            {t('exchangeHub.step1Desc')}
          </p>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-stone-200/90 shadow-soft space-y-2">
          <span className="text-2xl font-bold text-emerald-800">2</span>
          <h3 className="font-bold text-base text-charcoal-900">{t('exchangeHub.step2Title')}</h3>
          <p className="text-xs text-stone-500 leading-relaxed">
            {t('exchangeHub.step2Desc')}
          </p>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-stone-200/90 shadow-soft space-y-2">
          <span className="text-2xl font-bold text-emerald-800">3</span>
          <h3 className="font-bold text-base text-charcoal-900">{t('exchangeHub.step3Title')}</h3>
          <p className="text-xs text-stone-500 leading-relaxed">
            {t('exchangeHub.step3Desc')}
          </p>
        </div>
      </div>

      {/* Active Exchange Items Grid */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-charcoal-900">
              {t('exchangeHub.activeExchangeTitle')} ({exchangeItems.length})
            </h2>
            <p className="text-xs text-stone-500">
              {t('exchangeHub.subtitle')}
            </p>
          </div>

          {/* Quick Category Filters */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
            {['all', 'electronics', 'phones', 'fashion', 'furniture', 'sports'].map(cat => (
              <button
                key={cat}
                onClick={() => setFilterCat(cat)}
                className={`px-3 py-1.5 rounded-full text-xs font-bold transition whitespace-nowrap ${
                  filterCat === cat
                    ? 'bg-emerald-800 text-white'
                    : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                }`}
              >
                {cat === 'all' ? t('common.seeAll') : getLocalizedCategory(cat)}
              </button>
            ))}
          </div>
        </div>

        {exchangeItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {exchangeItems.map(item => (
              <ProductCard key={item.id} item={item} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-12 text-center border border-stone-200 text-stone-500 text-sm">
            {t('exchangeHub.emptyCategory')}
          </div>
        )}
      </div>

    </div>
  );
}
