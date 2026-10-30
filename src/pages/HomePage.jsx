import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Flame, Clock } from 'lucide-react';
import HeroSection from '../components/home/HeroSection';
import CategoryGrid from '../components/home/CategoryGrid';
import HowItWorksSection from '../components/home/HowItWorksSection';
import SellingBanner from '../components/home/SellingBanner';
import ProductCard from '../components/marketplace/ProductCard';
import { useMarketplace } from '../context/MarketplaceContext';
import { useLanguage } from '../context/LanguageContext';

export default function HomePage() {
  const { listings } = useMarketplace();
  const { t, getLocalizedCategory } = useLanguage();
  const [featuredTab, setFeaturedTab] = useState('all');

  // Filter featured listings
  const featuredListings = listings.filter(item => {
    if (featuredTab === 'all') return true;
    if (featuredTab === 'exchange') return item.isExchangeable;
    return item.category === featuredTab;
  }).slice(0, 8);

  const recentlyAdded = [...listings].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 4);

  return (
    <div className="space-y-12 pb-16">
      
      {/* 1. Hero Section */}
      <HeroSection />

      {/* 2. Featured Collections */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-800 mb-1">
              <Flame className="w-3.5 h-3.5 text-amber-600" />
              <span>{t('home.featuredBadge')}</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal-900">
              {t('home.featuredTitle')}
            </h2>
            <p className="text-stone-500 text-sm mt-1">
              {t('home.featuredSubtitle')}
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar bg-stone-100 p-1.5 rounded-2xl">
            <button
              onClick={() => setFeaturedTab('all')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                featuredTab === 'all'
                  ? 'bg-white text-emerald-950 shadow-sm'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              {t('home.tabAll')}
            </button>
            <button
              onClick={() => setFeaturedTab('exchange')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                featuredTab === 'exchange'
                  ? 'bg-white text-emerald-950 shadow-sm'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              {t('home.tabExchangeOnly')}
            </button>
            <button
              onClick={() => setFeaturedTab('electronics')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                featuredTab === 'electronics'
                  ? 'bg-white text-emerald-950 shadow-sm'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              {getLocalizedCategory('electronics')}
            </button>
            <button
              onClick={() => setFeaturedTab('furniture')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                featuredTab === 'furniture'
                  ? 'bg-white text-emerald-950 shadow-sm'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              {getLocalizedCategory('furniture')}
            </button>
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredListings.map(item => (
            <ProductCard key={item.id} item={item} />
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-10">
          <Link
            to="/explore"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full border border-stone-300 hover:border-emerald-700 bg-white hover:bg-emerald-50 text-stone-800 hover:text-emerald-900 font-semibold text-sm shadow-sm transition"
          >
            <span>{t('home.viewAllCatalog')} ({listings.length})</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* 3. Category Grid */}
      <CategoryGrid />

      {/* 4. Selling Banner */}
      <SellingBanner />

      {/* 5. Recently Added Feed */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-800 mb-1">
              <Clock className="w-3.5 h-3.5 text-emerald-600" />
              <span>{t('home.recentBadge')}</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-charcoal-900">
              {t('home.recentTitle')}
            </h2>
          </div>
          <Link
            to="/explore"
            className="text-xs sm:text-sm font-semibold text-emerald-800 hover:underline"
          >
            {t('home.viewAllArrow')}
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {recentlyAdded.map(item => (
            <ProductCard key={item.id} item={item} />
          ))}
        </div>
      </section>

      {/* 6. How It Works Section */}
      <HowItWorksSection />

    </div>
  );
}
