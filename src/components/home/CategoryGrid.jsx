import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Tv, Smartphone, Shirt, Armchair, BookOpen, 
  Dumbbell, Baby, Boxes, ArrowUpRight 
} from 'lucide-react';
import { CATEGORIES } from '../../data/categories';
import { useLanguage } from '../../context/LanguageContext';

const iconMap = {
  Tv,
  Smartphone,
  Shirt,
  Armchair,
  BookOpen,
  Dumbbell,
  Baby,
  Boxes
};

export default function CategoryGrid() {
  const { t, getLocalizedCategory, getLocalizedCategoryDesc } = useLanguage();

  return (
    <section className="py-12 bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
              {t('home.categoryBadge')}
            </span>
            <h2 className="font-serif text-3xl font-bold text-charcoal-900 mt-1">
              {t('home.categoryTitle')}
            </h2>
          </div>
          <Link
            to="/explore"
            className="text-sm font-semibold text-emerald-800 hover:text-emerald-900 inline-flex items-center gap-1 group"
          >
            <span>{t('home.allCategories')}</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {CATEGORIES.map(category => {
            const Icon = iconMap[category.iconName] || Boxes;
            const localizedName = getLocalizedCategory(category.id);
            const localizedDesc = getLocalizedCategoryDesc(category.id);

            return (
              <Link
                key={category.id}
                to={`/explore?category=${category.id}`}
                className="group relative rounded-3xl overflow-hidden bg-white border border-stone-200/80 shadow-soft hover:shadow-card hover:border-emerald-400 transition-all duration-300 flex flex-col justify-between p-5 min-h-[160px]"
              >
                {/* Background image preview with soft fade */}
                <div 
                  className="absolute inset-0 bg-cover bg-center opacity-10 group-hover:opacity-20 group-hover:scale-105 transition-all duration-500 pointer-events-none"
                  style={{ backgroundImage: `url('${category.image}')` }}
                ></div>

                <div className="relative z-10 flex items-start justify-between">
                  <div className="w-11 h-11 rounded-2xl bg-[#FAF8F5] group-hover:bg-emerald-800 text-stone-700 group-hover:text-emerald-200 flex items-center justify-center transition-colors shadow-sm">
                    <Icon className="w-5 h-5 transition-transform group-hover:scale-110" />
                  </div>
                  <span className="text-[11px] font-semibold text-stone-500 bg-stone-100 group-hover:bg-emerald-100 group-hover:text-emerald-900 px-2 py-0.5 rounded-full transition-colors">
                    {category.count} {t('home.itemsCount')}
                  </span>
                </div>

                <div className="relative z-10 mt-4">
                  <h3 className="font-bold text-base text-charcoal-900 group-hover:text-emerald-900 transition-colors">
                    {localizedName}
                  </h3>
                  <p className="text-xs text-stone-500 mt-1 line-clamp-1">
                    {localizedDesc}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>

      </div>
    </section>
  );
}
