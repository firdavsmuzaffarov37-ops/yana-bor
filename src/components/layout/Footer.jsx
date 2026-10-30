import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRightLeft, Globe, Send, ShieldCheck } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import LanguageSelector from '../common/LanguageSelector';

export default function Footer() {
  const { t, getLocalizedCategory } = useLanguage();

  return (
    <footer className="bg-[#121619] text-[#E2DDCF] pt-16 pb-12 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-stone-800">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="inline-flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-2xl bg-emerald-600 flex items-center justify-center text-white shadow-lg shadow-emerald-500/20">
                <ArrowRightLeft className="w-5 h-5 text-emerald-100" />
              </div>
              <span className="font-serif text-2xl font-bold tracking-tight text-white">
                Yana<span className="text-emerald-400">Bor</span>
              </span>
            </Link>

            <p className="text-stone-400 text-sm leading-relaxed max-w-sm">
              {t('footer.description')}
            </p>

            <div className="flex items-center gap-4 pt-2 text-stone-400">
              <a href="#" className="w-9 h-9 rounded-full bg-stone-800/80 flex items-center justify-center hover:text-white hover:bg-emerald-700 transition">
                <Globe className="w-4 h-4" />
              </a>
              <a href="https://t.me" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-full bg-stone-800/80 flex items-center justify-center hover:text-white hover:bg-emerald-700 transition">
                <Send className="w-4 h-4" />
              </a>
              <div className="flex items-center gap-1.5 text-xs text-stone-400 pl-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>{t('footer.safeMeeting')}</span>
              </div>
            </div>

            {/* Language switcher in footer */}
            <div className="pt-3">
              <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500 block mb-2">Til / Язык / Language:</span>
              <LanguageSelector variant="pills" />
            </div>
          </div>

          {/* Nav Col 1: Bozor / Market */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4 tracking-wider uppercase">{t('footer.market')}</h4>
            <ul className="space-y-2.5 text-sm text-stone-400">
              <li><Link to="/explore" className="hover:text-emerald-300 transition">{t('footer.allAds')}</Link></li>
              <li><Link to="/sell" className="hover:text-emerald-300 transition">{t('footer.postAd')}</Link></li>
              <li><Link to="/exchange" className="hover:text-emerald-300 transition">{t('footer.exchange')}</Link></li>
              <li><Link to="/explore?category=electronics" className="hover:text-emerald-300 transition">{getLocalizedCategory('electronics')}</Link></li>
              <li><Link to="/explore?category=furniture" className="hover:text-emerald-300 transition">{getLocalizedCategory('furniture')}</Link></li>
            </ul>
          </div>

          {/* Nav Col 2: Platform */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4 tracking-wider uppercase">{t('footer.platform')}</h4>
            <ul className="space-y-2.5 text-sm text-stone-400">
              <li><Link to="/how-it-works" className="hover:text-emerald-300 transition">{t('footer.howItWorks')}</Link></li>
              <li><Link to="/how-it-works#safe-trading" className="hover:text-emerald-300 transition">{t('footer.safeTrading')}</Link></li>
              <li><Link to="/how-it-works" className="hover:text-emerald-300 transition">{t('footer.sustainability')}</Link></li>
              <li><Link to="/login" className="hover:text-emerald-300 transition">{t('footer.login')}</Link></li>
              <li><Link to="/register" className="hover:text-emerald-300 transition">{t('footer.register')}</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4 tracking-wider uppercase">{t('footer.newsletter')}</h4>
            <p className="text-stone-400 text-xs mb-3">
              {t('footer.newsletterDesc')}
            </p>
            <form onSubmit={(e) => { e.preventDefault(); alert(t('footer.subscribed')); }} className="space-y-2">
              <input
                type="email"
                required
                placeholder={t('footer.emailPlaceholder')}
                className="w-full bg-stone-900 border border-stone-700 rounded-xl px-3.5 py-2 text-xs text-white placeholder-stone-500 focus:outline-none focus:border-emerald-500"
              />
              <button
                type="submit"
                className="w-full bg-emerald-700 hover:bg-emerald-600 text-white font-semibold rounded-xl py-2 text-xs transition shadow-sm"
              >
                {t('footer.subscribe')}
              </button>
            </form>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-4">
          <p>{t('footer.rights')}</p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-stone-300 transition">{t('footer.privacy')}</a>
            <a href="#" className="hover:text-stone-300 transition">{t('footer.terms')}</a>
            <a href="#" className="hover:text-stone-300 transition">{t('footer.publicOffer')}</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
