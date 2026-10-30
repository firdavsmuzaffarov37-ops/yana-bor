import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRightLeft, User, Phone, Mail, Lock, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { UZBEKISTAN_REGIONS } from '../data/regions';

export default function RegisterPage() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const { t, getLocalizedRegion } = useLanguage();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('+998 90 ');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('toshkent-shahar');
  const [password, setPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setError(t('auth.fullName'));
      return;
    }
    if (!agreeTerms) {
      setError(t('auth.agreeTerms'));
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      register({
        name,
        phone,
        email: email || `${name.toLowerCase().replace(/\s+/g, '')}@yanabor.uz`,
        city: getLocalizedRegion(city),
        password
      });
      setIsLoading(false);
      navigate('/profile');
    }, 450);
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-4xl bg-white rounded-[2.5rem] border border-stone-200/90 shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-12">
        
        {/* Left Side: Brand Panel */}
        <div className="md:col-span-5 bg-[#141A1E] text-white p-8 sm:p-10 flex flex-col justify-between relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-950/80 via-transparent to-black pointer-events-none"></div>

          <div className="relative z-10 space-y-4">
            <Link to="/" className="inline-flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-emerald-600 flex items-center justify-center text-white">
                <ArrowRightLeft className="w-4 h-4 text-emerald-100" />
              </div>
              <span className="font-serif text-xl font-bold tracking-tight text-white">
                Yana<span className="text-emerald-400">Bor</span>
              </span>
            </Link>

            <div className="pt-8 space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400">
                {t('auth.registerBadge')}
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold leading-tight">
                {t('auth.registerTitle')}
              </h2>
            </div>

            <p className="text-xs text-stone-400 leading-relaxed">
              {t('auth.registerSubtitle')}
            </p>

            <div className="pt-4 space-y-2.5 text-xs text-stone-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>{t('home.benefit1')}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>{t('common.safeDeal')}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>{t('explore.allRegions')}</span>
              </div>
            </div>
          </div>

          <div className="relative z-10 pt-8 border-t border-stone-800 text-xs text-stone-400">
            <span>{t('auth.hasAccount')} </span>
            <Link to="/login" className="text-emerald-400 font-bold hover:underline">
              {t('auth.loginHere')} →
            </Link>
          </div>
        </div>

        {/* Right Side: Registration Form */}
        <div className="md:col-span-7 p-8 sm:p-12 flex flex-col justify-center space-y-6">
          <div>
            <h3 className="font-serif text-3xl font-bold text-charcoal-900">
              {t('auth.createAccount')}
            </h3>
            <p className="text-xs text-stone-500 mt-1">
              {t('auth.registerSubtitle')}
            </p>
          </div>

          {error && (
            <div className="p-3 rounded-2xl bg-red-50 border border-red-200 text-xs text-red-700 font-medium">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
                {t('auth.fullName')} *
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  placeholder="Sardor Rustamov"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-[#FAF8F5] focus:bg-white border border-stone-300 focus:border-emerald-600 rounded-2xl px-4 py-3 pl-11 text-sm text-charcoal-900 focus:outline-none transition"
                />
                <User className="w-4 h-4 text-stone-400 absolute left-3.5 top-3.5 pointer-events-none" />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
                  {t('auth.phone')} *
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    required
                    placeholder="+998 90 123 45 67"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-[#FAF8F5] focus:bg-white border border-stone-300 focus:border-emerald-600 rounded-2xl px-4 py-3 pl-11 text-sm text-charcoal-900 focus:outline-none transition"
                  />
                  <Phone className="w-4 h-4 text-stone-400 absolute left-3.5 top-3.5 pointer-events-none" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
                  {t('auth.city')}
                </label>
                <select
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full bg-[#FAF8F5] border border-stone-300 rounded-2xl px-3.5 py-3 text-sm text-charcoal-900 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                >
                  {UZBEKISTAN_REGIONS.map(reg => (
                    <option key={reg.id} value={reg.id}>{getLocalizedRegion(reg.id)}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
                {t('auth.email')}
              </label>
              <div className="relative">
                <input
                  type="email"
                  placeholder="user@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#FAF8F5] focus:bg-white border border-stone-300 focus:border-emerald-600 rounded-2xl px-4 py-3 pl-11 text-sm text-charcoal-900 focus:outline-none transition"
                />
                <Mail className="w-4 h-4 text-stone-400 absolute left-3.5 top-3.5 pointer-events-none" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
                {t('auth.password')} *
              </label>
              <div className="relative">
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-[#FAF8F5] focus:bg-white border border-stone-300 focus:border-emerald-600 rounded-2xl px-4 py-3 pl-11 text-sm text-charcoal-900 focus:outline-none transition"
                />
                <Lock className="w-4 h-4 text-stone-400 absolute left-3.5 top-3.5 pointer-events-none" />
              </div>
            </div>

            <div className="pt-1">
              <label className="flex items-center gap-2 cursor-pointer text-xs text-stone-600">
                <input
                  type="checkbox"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  className="w-4 h-4 rounded text-emerald-800 focus:ring-emerald-600 cursor-pointer"
                />
                <span>
                  {t('auth.agreeTerms')}
                </span>
              </label>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 rounded-2xl bg-emerald-800 hover:bg-emerald-900 active:bg-emerald-950 text-white font-bold text-sm shadow-md shadow-emerald-900/15 transition flex items-center justify-center gap-2"
            >
              <span>{isLoading ? t('common.loading') : t('auth.createAccount')}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="text-center pt-2 border-t border-stone-100 text-xs text-stone-500">
            <span>{t('auth.hasAccount')} </span>
            <Link to="/login" className="font-bold text-emerald-800 hover:underline">
              {t('auth.loginHere')}
            </Link>
          </div>

        </div>

      </div>
    </div>
  );
}
