import React from 'react';
import { RotateCcw, Filter, ArrowRightLeft } from 'lucide-react';
import { CATEGORIES } from '../../data/categories';
import { UZBEKISTAN_REGIONS } from '../../data/regions';
import { useLanguage } from '../../context/LanguageContext';

export default function ProductFilterSidebar({
  selectedCategory,
  setSelectedCategory,
  selectedRegion,
  setSelectedRegion,
  selectedCondition,
  setSelectedCondition,
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
  exchangeOnly,
  setExchangeOnly,
  resetFilters,
  onCloseMobile
}) {
  const { t, getLocalizedCategory, getLocalizedRegion, getLocalizedCondition } = useLanguage();
  
  const conditions = [
    { key: '', label: t('explore.allConditions') },
    { key: 'Yangi', label: getLocalizedCondition('Yangi') },
    { key: 'Yangidek', label: getLocalizedCondition('Yangidek') },
    { key: 'Yaxshi', label: getLocalizedCondition('Yaxshi') },
    { key: 'O‘rtacha', label: getLocalizedCondition('O‘rtacha') }
  ];

  return (
    <div className="bg-white rounded-3xl p-6 border border-stone-200/90 shadow-soft space-y-6">
      
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-stone-100">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-emerald-800" />
          <h3 className="font-bold text-base text-charcoal-900">{t('explore.filters')}</h3>
        </div>
        <button
          onClick={resetFilters}
          className="text-xs font-semibold text-stone-500 hover:text-emerald-800 flex items-center gap-1 transition"
        >
          <RotateCcw className="w-3 h-3" />
          <span>{t('explore.clearFilters')}</span>
        </button>
      </div>

      {/* Exchange Only Toggle Pill */}
      <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-3.5">
        <label className="flex items-center justify-between cursor-pointer">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-emerald-600 text-white">
              <ArrowRightLeft className="w-3.5 h-3.5" />
            </span>
            <div>
              <div className="text-xs font-bold text-emerald-950">{t('explore.exchangeOnly')}</div>
              <div className="text-[11px] text-emerald-700">{t('explore.exchangeOnlyDesc')}</div>
            </div>
          </div>
          <input
            type="checkbox"
            checked={exchangeOnly}
            onChange={(e) => setExchangeOnly(e.target.checked)}
            className="w-4 h-4 rounded text-emerald-700 focus:ring-emerald-600 cursor-pointer"
          />
        </label>
      </div>

      {/* Category Filter */}
      <div className="space-y-2">
        <label className="block text-xs font-bold uppercase tracking-wider text-stone-500">
          {t('explore.category')}
        </label>
        <div className="space-y-1">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium transition flex items-center justify-between ${
              selectedCategory === 'all'
                ? 'bg-emerald-800 text-white font-semibold shadow-sm'
                : 'text-stone-700 hover:bg-stone-100'
            }`}
          >
            <span>{t('explore.allCategories')}</span>
          </button>
          {CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium transition flex items-center justify-between ${
                selectedCategory === cat.id
                  ? 'bg-emerald-800 text-white font-semibold shadow-sm'
                  : 'text-stone-700 hover:bg-stone-100'
              }`}
            >
              <span>{getLocalizedCategory(cat.id)}</span>
              <span className={`text-[10px] ${selectedCategory === cat.id ? 'text-emerald-200' : 'text-stone-400'}`}>
                {cat.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Region / Location Selector */}
      <div className="space-y-2 pt-2 border-t border-stone-100">
        <label className="block text-xs font-bold uppercase tracking-wider text-stone-500">
          {t('explore.region')}
        </label>
        <div className="relative">
          <select
            value={selectedRegion}
            onChange={(e) => setSelectedRegion(e.target.value)}
            className="w-full bg-[#FAF8F5] border border-stone-200 rounded-xl px-3 py-2.5 text-xs text-charcoal-900 focus:outline-none focus:ring-2 focus:ring-emerald-600 cursor-pointer"
          >
            <option value="all">{t('explore.allRegions')}</option>
            {UZBEKISTAN_REGIONS.map(reg => (
              <option key={reg.id} value={reg.id}>
                {getLocalizedRegion(reg.id)}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Price Range Filter */}
      <div className="space-y-2 pt-2 border-t border-stone-100">
        <label className="block text-xs font-bold uppercase tracking-wider text-stone-500">
          {t('explore.priceRange')}
        </label>
        <div className="grid grid-cols-2 gap-2">
          <input
            type="number"
            placeholder={t('explore.fromPrice')}
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            className="w-full bg-[#FAF8F5] border border-stone-200 rounded-xl px-3 py-2 text-xs text-charcoal-900 focus:outline-none focus:ring-2 focus:ring-emerald-600"
          />
          <input
            type="number"
            placeholder={t('explore.toPrice')}
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="w-full bg-[#FAF8F5] border border-stone-200 rounded-xl px-3 py-2 text-xs text-charcoal-900 focus:outline-none focus:ring-2 focus:ring-emerald-600"
          />
        </div>
      </div>

      {/* Item Condition Filter */}
      <div className="space-y-2 pt-2 border-t border-stone-100">
        <label className="block text-xs font-bold uppercase tracking-wider text-stone-500">
          {t('explore.condition')}
        </label>
        <div className="flex flex-wrap gap-1.5">
          {conditions.map(c => {
            const isSelected = selectedCondition === c.key;
            return (
              <button
                key={c.key || 'all'}
                onClick={() => setSelectedCondition(c.key)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition ${
                  isSelected
                    ? 'bg-charcoal-900 text-white font-semibold shadow-sm'
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                }`}
              >
                {c.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Apply / Close for mobile drawer */}
      {onCloseMobile && (
        <div className="pt-4 border-t border-stone-100">
          <button
            onClick={onCloseMobile}
            className="w-full py-2.5 rounded-xl bg-emerald-800 text-white text-xs font-bold"
          >
            {t('explore.applyFilters')}
          </button>
        </div>
      )}

    </div>
  );
}
