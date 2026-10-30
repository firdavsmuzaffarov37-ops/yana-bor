import React from 'react';
import { Search, MessageSquare, ArrowRightLeft, ShieldCheck, CheckCircle } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export default function HowItWorksSection() {
  const { t } = useLanguage();

  const steps = [
    {
      number: '1',
      icon: Search,
      title: t('home.step1Title'),
      description: t('home.step1Desc')
    },
    {
      number: '2',
      icon: MessageSquare,
      title: t('home.step2Title'),
      description: t('home.step2Desc')
    },
    {
      number: '3',
      icon: ArrowRightLeft,
      title: t('home.step3Title'),
      description: t('home.step3Desc')
    }
  ];

  return (
    <section className="py-16 bg-[#F6F3EB]/60 border-y border-stone-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
            {t('home.howItWorksBadge')}
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal-900">
            {t('home.howItWorksTitle')}
          </h2>
          <p className="text-stone-600 text-sm leading-relaxed">
            {t('home.howItWorksDesc')}
          </p>
        </div>

        {/* 3 Step Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map(step => {
            const Icon = step.icon;
            return (
              <div 
                key={step.number}
                className="bg-white rounded-3xl p-8 border border-stone-200/90 shadow-soft hover:shadow-card hover:border-emerald-300 transition-all flex flex-col items-center text-center space-y-4"
              >
                <div className="w-14 h-14 rounded-2xl bg-cream-100 border border-stone-200 flex items-center justify-center text-emerald-800 shadow-inner">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-xl font-bold text-charcoal-900">
                  {step.title}
                </h3>
                <p className="text-stone-600 text-xs leading-relaxed">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Trust & Community Banner */}
        <div className="mt-12 bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center flex-shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-base text-charcoal-900">{t('home.communityTitle')}</h4>
              <p className="text-xs text-stone-500">{t('home.communityDesc')}</p>
            </div>
          </div>
          <div className="flex items-center gap-4 text-xs font-semibold text-stone-700">
            <span className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-emerald-600" /> {t('common.noCommission')}</span>
            <span className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-emerald-600" /> {t('common.realExchange')}</span>
          </div>
        </div>

      </div>
    </section>
  );
}
