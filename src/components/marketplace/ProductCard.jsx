import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, MapPin, Clock, ArrowRightLeft, Sparkles, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { getConditionStyle } from '../../utils/formatters';
import { useMarketplace } from '../../context/MarketplaceContext';
import { useLanguage } from '../../context/LanguageContext';

export default function ProductCard({ item, viewMode = 'grid' }) {
  const { isFavorite, toggleFavorite } = useMarketplace();
  const { t, formatCurrency, getLocalizedCategory, getLocalizedRegion, getLocalizedCondition, getLocalizedTitle } = useLanguage();
  
  const favorited = isFavorite(item.id);
  const conditionMeta = getConditionStyle(item.condition);
  const localizedTitle = getLocalizedTitle(item);
  const localizedCondition = getLocalizedCondition(item.condition);
  const localizedCategory = getLocalizedCategory(item.category);
  const localizedRegion = getLocalizedRegion(item.location?.regionId) || item.location?.regionName;

  const handleFavoriteClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(item.id);
  };

  if (viewMode === 'list') {
    return (
      <motion.div 
        layout
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ y: -3 }}
        transition={{ duration: 0.2 }}
        className="group bg-white rounded-3xl p-4 border border-stone-200/80 shadow-soft hover:shadow-card hover:border-emerald-300 transition-all flex flex-col sm:flex-row gap-5"
      >
        {/* Image */}
        <Link to={`/product/${item.id}`} className="relative sm:w-60 h-52 sm:h-auto rounded-2xl overflow-hidden bg-stone-100 flex-shrink-0 block">
          <img
            src={item.images?.[0] || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80'}
            alt={localizedTitle}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          />
          
          {/* Condition Badge on image */}
          <div className="absolute bottom-3 left-3">
            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold backdrop-blur-md shadow-sm border ${conditionMeta.bg}`}>
              <span className={`w-1.5 h-1.5 rounded-full ${conditionMeta.dot}`}></span>
              {localizedCondition}
            </span>
          </div>

          {/* Exchange badge */}
          {item.isExchangeable && (
            <div className="absolute top-3 left-3">
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-900/90 text-emerald-200 backdrop-blur-md shadow-sm border border-emerald-700/50">
                <ArrowRightLeft className="w-3 h-3 text-emerald-300" />
                {t('product.exchangeAvailable')}
              </span>
            </div>
          )}

          {/* Heart button */}
          <button
            onClick={handleFavoriteClick}
            className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 hover:bg-white text-stone-700 hover:text-red-500 shadow-md backdrop-blur-md flex items-center justify-center transition active:scale-90"
            title={t('nav.favorites')}
          >
            <Heart className={`w-4 h-4 transition ${favorited ? 'fill-red-500 text-red-500 scale-110' : ''}`} />
          </button>
        </Link>

        {/* Content */}
        <div className="flex-1 flex flex-col justify-between py-1">
          <div>
            <div className="flex items-center justify-between gap-2 mb-1.5">
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800">
                {localizedCategory}
              </span>
              {item.pickupWindow && (
                <span className="inline-flex items-center gap-1 text-[11px] font-medium text-amber-800 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
                  <Clock className="w-3 h-3" />
                  {item.pickupWindow}
                </span>
              )}
            </div>

            <Link to={`/product/${item.id}`} className="block">
              <h3 className="font-semibold text-lg text-charcoal-900 group-hover:text-emerald-800 transition line-clamp-1">
                {localizedTitle}
              </h3>
            </Link>

            <p className="text-stone-500 text-xs mt-1.5 line-clamp-2 leading-relaxed">
              {item.description}
            </p>

            {item.isExchangeable && item.exchangePreferences && (
              <div className="mt-2 text-xs bg-emerald-50 text-emerald-900 p-2 rounded-xl border border-emerald-100 flex items-center gap-1.5">
                <ArrowRightLeft className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                <span className="truncate"><b>{t('product.exchangePreference')}</b> {item.exchangePreferences}</span>
              </div>
            )}
          </div>

          <div className="pt-4 border-t border-stone-100 flex items-center justify-between gap-4">
            <div>
              <div className="flex items-baseline gap-2">
                <span className="text-xl font-bold text-stone-900">
                  {formatCurrency(item.price)}
                </span>
                {item.originalPrice && (
                  <span className="text-xs text-stone-400 line-through">
                    {formatCurrency(item.originalPrice)}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-1 text-xs text-stone-500 mt-0.5">
                <MapPin className="w-3 h-3 text-stone-400" />
                <span>{item.location?.district ? `${item.location.district}, ` : ''}{localizedRegion}</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="hidden md:flex items-center gap-2">
                <img
                  src={item.seller?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=240&auto=format&fit=crop&q=80'}
                  alt={item.seller?.name}
                  className="w-7 h-7 rounded-full object-cover"
                />
                <span className="text-xs font-medium text-stone-700">{item.seller?.name}</span>
              </div>

              <Link
                to={`/product/${item.id}`}
                className="px-4 py-2 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-semibold shadow-sm transition"
              >
                {t('product.viewAction')}
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  // Grid view (Default)
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="group bg-white rounded-3xl overflow-hidden border border-stone-200/90 shadow-soft hover:shadow-card hover:border-emerald-300 transition-all flex flex-col h-full"
    >
      {/* Top Image Container */}
      <Link to={`/product/${item.id}`} className="relative aspect-[4/3] w-full overflow-hidden bg-stone-100 block">
        <img
          src={item.images?.[0] || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80'}
          alt={localizedTitle}
          className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500 ease-out"
        />

        {/* Condition Badge */}
        <div className="absolute bottom-3 left-3 z-10">
          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold backdrop-blur-md shadow-sm border ${conditionMeta.bg}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${conditionMeta.dot}`}></span>
            {localizedCondition}
          </span>
        </div>

        {/* Exchange badge */}
        {item.isExchangeable && (
          <div className="absolute top-3 left-3 z-10">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-950/85 text-emerald-300 backdrop-blur-md shadow-sm border border-emerald-700/50">
              <ArrowRightLeft className="w-3 h-3 text-emerald-400" />
              {t('product.exchangeAvailable')}
            </span>
          </div>
        )}

        {/* Floating Heart Button */}
        <button
          onClick={handleFavoriteClick}
          className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-white/90 hover:bg-white text-stone-700 hover:text-red-500 shadow-md backdrop-blur-md flex items-center justify-center transition active:scale-90"
          title={t('nav.favorites')}
        >
          <Heart className={`w-4 h-4 transition ${favorited ? 'fill-red-500 text-red-500 scale-110' : ''}`} />
        </button>
      </Link>

      {/* Card Body */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Category & Pickup Badge (Leboncoin style) */}
          <div className="flex items-center justify-between gap-1 mb-1.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800">
              {localizedCategory}
            </span>
            {item.pickupWindow && (
              <span className="inline-flex items-center gap-1 text-[10px] font-medium text-amber-800 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
                <Clock className="w-2.5 h-2.5" />
                {item.pickupWindow}
              </span>
            )}
          </div>

          <Link to={`/product/${item.id}`} className="block">
            <h3 className="font-semibold text-stone-900 group-hover:text-emerald-800 transition line-clamp-1 text-base">
              {localizedTitle}
            </h3>
          </Link>

          <p className="text-stone-500 text-xs mt-1 line-clamp-2 leading-relaxed">
            {item.description}
          </p>
        </div>

        {/* Price & Location Bottom */}
        <div className="pt-3.5 mt-3.5 border-t border-stone-100">
          <div className="flex items-baseline justify-between mb-1.5">
            <div className="flex items-baseline gap-1.5">
              <span className="text-lg font-bold text-stone-900">
                {formatCurrency(item.price)}
              </span>
              {item.originalPrice && (
                <span className="text-xs text-stone-400 line-through">
                  {formatCurrency(item.originalPrice)}
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between text-xs text-stone-500">
            <div className="flex items-center gap-1 truncate">
              <MapPin className="w-3 h-3 text-stone-400 flex-shrink-0" />
              <span className="truncate">{localizedRegion}</span>
            </div>

            <div className="flex items-center gap-1.5 flex-shrink-0">
              <img
                src={item.seller?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=240&auto=format&fit=crop&q=80'}
                alt={item.seller?.name}
                className="w-5 h-5 rounded-full object-cover"
              />
              <span className="text-[11px] font-medium text-stone-600 truncate max-w-[80px]">
                {item.seller?.name?.split(' ')[0]}
              </span>
            </div>
          </div>
        </div>

      </div>
    </motion.div>
  );
}
