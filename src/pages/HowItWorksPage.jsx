import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ShieldCheck, Sparkles, HelpCircle 
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function HowItWorksPage() {
  const { t, getLocalizedCondition } = useLanguage();

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      
      {/* Hero Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-100 text-emerald-900">
          <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
          {t('howItWorksPage.badge')}
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-charcoal-900 leading-tight">
          {t('howItWorksPage.title')}
        </h1>
        <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
          {t('howItWorksPage.subtitle')}
        </p>
      </div>

      {/* The 3 Core Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white rounded-3xl p-8 border border-stone-200/90 shadow-soft space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-lg">
            1
          </div>
          <h3 className="font-serif text-xl font-bold text-charcoal-900">{t('howItWorksPage.step1Title')}</h3>
          <p className="text-xs text-stone-600 leading-relaxed">
            {t('howItWorksPage.step1Desc')}
          </p>
        </div>

        <div className="bg-white rounded-3xl p-8 border border-stone-200/90 shadow-soft space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-lg">
            2
          </div>
          <h3 className="font-serif text-xl font-bold text-charcoal-900">{t('howItWorksPage.step2Title')}</h3>
          <p className="text-xs text-stone-600 leading-relaxed">
            {t('howItWorksPage.step2Desc')}
          </p>
        </div>

        <div className="bg-white rounded-3xl p-8 border border-stone-200/90 shadow-soft space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-lg">
            3
          </div>
          <h3 className="font-serif text-xl font-bold text-charcoal-900">{t('howItWorksPage.step3Title')}</h3>
          <p className="text-xs text-stone-600 leading-relaxed">
            {t('howItWorksPage.step3Desc')}
          </p>
        </div>
      </div>

      {/* Grading Standards in Uzbekistan */}
      <div className="bg-white rounded-3xl p-8 border border-stone-200/90 shadow-soft space-y-6">
        <h2 className="font-serif text-2xl font-bold text-charcoal-900">
          {t('howItWorksPage.rulesTitle')}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200">
            <span className="font-bold text-emerald-900 block mb-1">{getLocalizedCondition('Yangi')} (10/10)</span>
            <p className="text-emerald-800">
              Qutisi ochilmagan yoki plyonkada turgan, umuman foydalanilmagan buyumlar.
            </p>
          </div>
          <div className="p-4 rounded-2xl bg-teal-50 border border-teal-200">
            <span className="font-bold text-teal-900 block mb-1">{getLocalizedCondition('Yangidek')} (9-9.5/10)</span>
            <p className="text-teal-800">
              Bir necha marta ehtiyotlab ishlatilgan, hech qanday tirnalgan yoki nuqsoni yo‘q.
            </p>
          </div>
          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200">
            <span className="font-bold text-amber-900 block mb-1">{getLocalizedCondition('Yaxshi')} (8-8.5/10)</span>
            <p className="text-amber-800">
              Ishlatilganligini bildiruvchi yengil izlar bo‘lishi mumkin, ammo barcha funksiyalari to‘liq soz.
            </p>
          </div>
          <div className="p-4 rounded-2xl bg-stone-100 border border-stone-200">
            <span className="font-bold text-stone-800 block mb-1">{getLocalizedCondition('O‘rtacha')} (7/10)</span>
            <p className="text-stone-600">
              Ko‘rinadigan foydalanish izlari bor, lekin o‘z vazifasini to‘liq bajaradi.
            </p>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-white rounded-3xl p-8 border border-stone-200 space-y-6">
        <div className="flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-emerald-700" />
          <h2 className="font-serif text-2xl font-bold text-charcoal-900">
            {t('howItWorksPage.faqTitle')}
          </h2>
        </div>
        <div className="space-y-4 text-xs">
          <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-stone-200">
            <h4 className="font-bold text-sm text-charcoal-900 mb-1">{t('howItWorksPage.q1')}</h4>
            <p className="text-stone-600 leading-relaxed">{t('howItWorksPage.a1')}</p>
          </div>
          <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-stone-200">
            <h4 className="font-bold text-sm text-charcoal-900 mb-1">{t('howItWorksPage.q2')}</h4>
            <p className="text-stone-600 leading-relaxed">{t('howItWorksPage.a2')}</p>
          </div>
          <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-stone-200">
            <h4 className="font-bold text-sm text-charcoal-900 mb-1">{t('howItWorksPage.q3')}</h4>
            <p className="text-stone-600 leading-relaxed">{t('howItWorksPage.a3')}</p>
          </div>
        </div>
      </div>

      {/* Safe Trading Recommendations */}
      <div id="safe-trading" className="bg-[#FAF8F5] rounded-3xl p-8 border border-stone-200 space-y-4">
        <div className="flex items-center gap-2 text-emerald-900 font-bold text-sm">
          <ShieldCheck className="w-5 h-5 text-emerald-700" />
          <span>{t('footer.safeTrading')}</span>
        </div>
        <ul className="space-y-2 text-xs text-stone-700">
          <li className="flex items-start gap-2">
            <span className="text-emerald-700 font-bold">✓</span>
            <span>{t('product.safetyTipDesc')}</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-emerald-700 font-bold">✓</span>
            <span>{t('common.safeDeal')}</span>
          </li>
        </ul>
      </div>

      {/* CTA Box */}
      <div className="text-center pt-4">
        <Link
          to="/sell"
          className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-sm shadow-lg transition"
        >
          <span>{t('home.postAdNow')}</span>
        </Link>
      </div>

    </div>
  );
}
