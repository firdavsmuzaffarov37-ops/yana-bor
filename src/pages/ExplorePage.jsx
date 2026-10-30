import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { 
  Search, LayoutGrid, List, SlidersHorizontal, ArrowUpDown, 
  X, Sparkles 
} from 'lucide-react';
import ProductCard from '../components/marketplace/ProductCard';
import ProductFilterSidebar from '../components/marketplace/ProductFilterSidebar';
import { useMarketplace } from '../context/MarketplaceContext';
import { useLanguage } from '../context/LanguageContext';

export default function ExplorePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { listings, searchTerm, setSearchTerm } = useMarketplace();
  const { t } = useLanguage();

  // Filters State
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'all');
  const [selectedRegion, setSelectedRegion] = useState(searchParams.get('region') || 'all');
  const [selectedCondition, setSelectedCondition] = useState(searchParams.get('condition') || '');
  const [minPrice, setMinPrice] = useState(searchParams.get('minPrice') || '');
  const [maxPrice, setMaxPrice] = useState(searchParams.get('maxPrice') || '');
  const [exchangeOnly, setExchangeOnly] = useState(searchParams.get('exchange') === 'true');
  const [sortBy, setSortBy] = useState('newest'); // newest, price_asc, price_desc
  const [viewMode, setViewMode] = useState('grid'); // grid, list
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Sync category from URL param if changed externally
  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat) setSelectedCategory(cat);
    const exch = searchParams.get('exchange');
    if (exch === 'true') setExchangeOnly(true);
  }, [searchParams]);

  const resetFilters = () => {
    setSelectedCategory('all');
    setSelectedRegion('all');
    setSelectedCondition('');
    setMinPrice('');
    setMaxPrice('');
    setExchangeOnly(false);
    setSearchTerm('');
    setSearchParams({});
  };

  // Filtered & Sorted listings
  const filteredListings = useMemo(() => {
    return listings.filter(item => {
      // 1. Keyword search (title + description)
      if (searchTerm.trim()) {
        const query = searchTerm.toLowerCase();
        const matchesTitle = item.title?.toLowerCase().includes(query) || item.titleRu?.toLowerCase().includes(query) || item.titleEn?.toLowerCase().includes(query);
        const matchesDesc = item.description?.toLowerCase().includes(query);
        const matchesCat = item.category?.toLowerCase().includes(query);
        if (!matchesTitle && !matchesDesc && !matchesCat) return false;
      }

      // 2. Category
      if (selectedCategory && selectedCategory !== 'all') {
        if (item.category !== selectedCategory) return false;
      }

      // 3. Region
      if (selectedRegion && selectedRegion !== 'all') {
        if (item.location?.regionId !== selectedRegion) return false;
      }

      // 4. Condition
      if (selectedCondition) {
        if (item.condition !== selectedCondition) return false;
      }

      // 5. Min Price
      if (minPrice && Number(minPrice) > 0) {
        if (item.price < Number(minPrice)) return false;
      }

      // 6. Max Price
      if (maxPrice && Number(maxPrice) > 0) {
        if (item.price > Number(maxPrice)) return false;
      }

      // 7. Exchange only
      if (exchangeOnly) {
        if (!item.isExchangeable) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price_asc') return a.price - b.price;
      if (sortBy === 'price_desc') return b.price - a.price;
      // Default: newest
      return new Date(b.createdAt) - new Date(a.createdAt);
    });
  }, [listings, searchTerm, selectedCategory, selectedRegion, selectedCondition, minPrice, maxPrice, exchangeOnly, sortBy]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Top Search & Layout Bar */}
      <div className="bg-white rounded-3xl p-4 sm:p-5 border border-stone-200/90 shadow-soft">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          
          {/* Search Input Field */}
          <div className="relative flex-1">
            <input
              type="text"
              placeholder={t('common.searchPlaceholder')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[#FAF8F5] focus:bg-white border border-stone-200 focus:border-emerald-600 text-sm text-charcoal-900 rounded-2xl py-3 pl-11 pr-10 focus:outline-none transition shadow-inner"
            />
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Right Controls: Sort, Grid/List, Mobile Filter Button */}
          <div className="flex items-center gap-2.5 flex-wrap sm:flex-nowrap justify-between">
            
            {/* Sort Selector */}
            <div className="relative flex items-center bg-[#FAF8F5] border border-stone-200 rounded-2xl px-3 py-2 text-xs">
              <ArrowUpDown className="w-3.5 h-3.5 text-stone-500 mr-2" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-transparent text-charcoal-900 font-semibold focus:outline-none cursor-pointer pr-2"
              >
                <option value="newest">{t('explore.sortNewest')}</option>
                <option value="price_asc">{t('explore.sortPriceAsc')}</option>
                <option value="price_desc">{t('explore.sortPriceDesc')}</option>
              </select>
            </div>

            {/* Grid vs List View Switcher */}
            <div className="flex items-center bg-[#FAF8F5] p-1 rounded-2xl border border-stone-200">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-xl transition ${
                  viewMode === 'grid'
                    ? 'bg-white text-emerald-900 shadow-sm'
                    : 'text-stone-400 hover:text-stone-700'
                }`}
                title={t('explore.grid')}
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-xl transition ${
                  viewMode === 'list'
                    ? 'bg-white text-emerald-900 shadow-sm'
                    : 'text-stone-400 hover:text-stone-700'
                }`}
                title={t('explore.list')}
              >
                <List className="w-4 h-4" />
              </button>
            </div>

            {/* Mobile Filter Toggle */}
            <button
              onClick={() => setMobileFilterOpen(true)}
              className="lg:hidden px-4 py-2.5 rounded-2xl bg-emerald-800 text-white text-xs font-semibold flex items-center gap-1.5 shadow-sm"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>{t('explore.filters')}</span>
            </button>

          </div>

        </div>
      </div>

      {/* Main Content Layout (Sidebar + Results) */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
        
        {/* Desktop Sidebar Filter */}
        <div className="hidden lg:block lg:col-span-1 sticky top-28">
          <ProductFilterSidebar
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            selectedRegion={selectedRegion}
            setSelectedRegion={setSelectedRegion}
            selectedCondition={selectedCondition}
            setSelectedCondition={setSelectedCondition}
            minPrice={minPrice}
            setMinPrice={setMinPrice}
            maxPrice={maxPrice}
            setMaxPrice={setMaxPrice}
            exchangeOnly={exchangeOnly}
            setExchangeOnly={setExchangeOnly}
            resetFilters={resetFilters}
          />
        </div>

        {/* Results Stream */}
        <div className="lg:col-span-3 space-y-4">
          
          {/* Results count header */}
          <div className="flex items-center justify-between text-xs text-stone-500 px-1">
            <span>
              <b className="text-charcoal-900 font-semibold">{filteredListings.length}</b> {t('explore.foundCount')}
            </span>
            {(selectedCategory !== 'all' || selectedRegion !== 'all' || selectedCondition || minPrice || maxPrice || exchangeOnly || searchTerm) && (
              <button
                onClick={resetFilters}
                className="text-emerald-700 hover:underline font-semibold"
              >
                {t('explore.clearFilters')}
              </button>
            )}
          </div>

          {/* Listings List / Grid */}
          {filteredListings.length > 0 ? (
            <div className={
              viewMode === 'grid'
                ? "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6"
                : "flex flex-col gap-4"
            }>
              {filteredListings.map(item => (
                <ProductCard key={item.id} item={item} viewMode={viewMode} />
              ))}
            </div>
          ) : (
            /* Empty State */
            <div className="bg-white rounded-3xl p-12 text-center border border-stone-200/90 shadow-soft space-y-4">
              <div className="w-16 h-16 rounded-3xl bg-cream-100 border border-stone-200 text-stone-400 flex items-center justify-center mx-auto">
                <Search className="w-8 h-8" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-charcoal-900">
                {t('explore.emptyTitle')}
              </h3>
              <p className="text-sm text-stone-500 max-w-md mx-auto">
                {t('explore.emptyDesc')}
              </p>
              <button
                onClick={resetFilters}
                className="px-6 py-2.5 rounded-full bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-semibold shadow-md transition"
              >
                {t('explore.resetFiltersBtn')}
              </button>
            </div>
          )}

        </div>

      </div>

      {/* Mobile Filter Drawer Modal */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-charcoal-900/60 backdrop-blur-sm p-0 sm:p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-t-[2rem] sm:rounded-3xl max-w-lg w-full max-h-[85vh] overflow-y-auto p-6 relative shadow-2xl">
            <button
              onClick={() => setMobileFilterOpen(false)}
              className="absolute top-4 right-4 p-2 text-stone-400 hover:text-stone-700"
            >
              <X className="w-5 h-5" />
            </button>
            <ProductFilterSidebar
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              selectedRegion={selectedRegion}
              setSelectedRegion={setSelectedRegion}
              selectedCondition={selectedCondition}
              setSelectedCondition={setSelectedCondition}
              minPrice={minPrice}
              setMinPrice={setMinPrice}
              maxPrice={maxPrice}
              setMaxPrice={setMaxPrice}
              exchangeOnly={exchangeOnly}
              setExchangeOnly={setExchangeOnly}
              resetFilters={resetFilters}
              onCloseMobile={() => setMobileFilterOpen(false)}
            />
          </div>
        </div>
      )}

    </div>
  );
}
