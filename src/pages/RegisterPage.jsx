import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ArrowRightLeft, User, Phone, Mail, Lock, Eye, EyeOff, 
  ArrowRight, CheckCircle2, ShieldCheck, Sparkles, MapPin, ChevronDown 
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { UZBEKISTAN_REGIONS } from '../data/regions';
import { isSupabaseConfigured, supabase } from '../services/supabaseClient';

export default function RegisterPage() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const { t, getLocalizedRegion } = useLanguage();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('+998 ');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('toshkent-shahar');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!name.trim()) {
      setError(t('auth.fullName') + ' talab qilinadi');
      return;
    }
    if (!agreeTerms) {
      setError(t('auth.agreeTerms'));
      return;
    }

    setIsLoading(true);

    try {
      // If Supabase is configured, try Supabase SignUp
      if (isSupabaseConfigured() && email) {
        try {
          await supabase.auth.signUp({
            email,
            password: password || 'yanabor_default_pass',
            options: {
              data: {
                name,
                phone,
                city: getLocalizedRegion(city)
              }
            }
          });
        } catch (supaErr) {
          console.warn('Supabase auth signup notice:', supaErr);
        }
      }

      // Complete local & session registration
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
      }, 400);

    } catch (err) {
      setIsLoading(false);
      setError(err?.message || 'Ro‘yxatdan o‘tishda xatolik yuz berdi');
    }
  };

  return (
    <div className="min-h-[88vh] py-10 px-4 sm:px-6 lg:px-8 flex items-center justify-center relative overflow-hidden bg-gradient-to-b from-[#F5F2EB] via-[#FAF8F5] to-[#EFEBE1]">
      {/* Ambient background blur circles */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-emerald-300/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-amber-200/20 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-4xl bg-white/95 backdrop-blur-xl rounded-3xl border border-stone-200/90 shadow-[0_20px_60px_-15px_rgba(20,40,30,0.12)] overflow-hidden grid grid-cols-1 md:grid-cols-12 relative z-10">
        
        {/* Left Side: Brand & Benefits Panel */}
        <div className="md:col-span-5 bg-gradient-to-br from-[#0c2e22] via-[#0a261c] to-[#061912] text-white p-8 sm:p-10 flex flex-col justify-between relative overflow-hidden">
          {/* Subtle decorative glow */}
          <div className="absolute -right-20 -top-20 w-64 h-64 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 space-y-6">
            {/* Logo */}
            <Link to="/" className="inline-flex items-center gap-2.5 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-emerald-500 flex items-center justify-center text-white shadow-md shadow-emerald-950/40 group-hover:scale-105 transition">
                <ArrowRightLeft className="w-5 h-5 text-emerald-100" />
              </div>
              <div>
                <span className="font-serif text-2xl font-bold tracking-tight text-white block leading-none">
                  Yana<span className="text-emerald-400">Bor</span>
                </span>
                <span className="text-[10px] tracking-wider uppercase text-emerald-300/70 font-semibold block mt-0.5">
                  Second-Life Uzbekistan
                </span>
              </div>
            </Link>

            {/* Tagline & Subheading */}
            <div className="pt-2 space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-400/25 text-emerald-300 text-[11px] font-semibold tracking-wider uppercase">
                <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                <span>{t('auth.registerBadge')}</span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white leading-tight">
                {t('auth.registerTitle')}
              </h2>
              <p className="text-xs text-stone-300/80 leading-relaxed">
                {t('auth.registerSubtitle')}
              </p>
            </div>

            {/* Visual Micro Benefit Cards */}
            <div className="space-y-2 pt-1">
              <div className="p-2.5 rounded-xl bg-white/[0.06] border border-white/10 backdrop-blur-sm flex items-start gap-2.5">
                <div className="w-5 h-5 rounded-lg bg-emerald-500/20 text-emerald-300 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-white leading-tight">{t('home.benefit1')}</h4>
                  <p className="text-[10px] text-stone-400 leading-tight mt-0.5">{t('common.noCommission')}</p>
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-white/[0.06] border border-white/10 backdrop-blur-sm flex items-start gap-2.5">
                <div className="w-5 h-5 rounded-lg bg-emerald-500/20 text-emerald-300 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <ShieldCheck className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-white leading-tight">{t('common.safeDeal')}</h4>
                  <p className="text-[10px] text-stone-400 leading-tight mt-0.5">{t('common.verifiedUser')}</p>
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-white/[0.06] border border-white/10 backdrop-blur-sm flex items-start gap-2.5">
                <div className="w-5 h-5 rounded-lg bg-emerald-500/20 text-emerald-300 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <MapPin className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-white leading-tight">{t('explore.allRegions')}</h4>
                  <p className="text-[10px] text-stone-400 leading-tight mt-0.5">{t('common.realExchange')}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Left panel bottom social proof badge */}
          <div className="relative z-10 pt-4 mt-4 border-t border-white/10 flex items-center justify-between text-[11px] text-stone-300">
            <div className="flex items-center gap-1.5">
              <span className="flex text-amber-400 text-xs">★★★★★</span>
              <span className="font-semibold text-white">4.9</span>
            </div>
            <span className="text-stone-400">2,400+ faol a’zo</span>
          </div>
        </div>

        {/* Right Side: Registration Form */}
        <div className="md:col-span-7 p-7 sm:p-10 lg:p-12 flex flex-col justify-center bg-white">
          <div className="mb-6">
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight">
              {t('auth.createAccount')}
            </h3>
            <p className="text-xs text-stone-500 mt-1">
              {t('auth.registerSubtitle')}
            </p>
          </div>

          {error && (
            <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 font-medium flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-red-600"></span>
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full Name */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                {t('auth.fullName')} <span className="text-emerald-700">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  placeholder="Sardor Rustamov"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-[#FAF8F5] hover:bg-white focus:bg-white border border-stone-200 hover:border-stone-300 focus:border-emerald-700 focus:ring-4 focus:ring-emerald-700/10 rounded-xl px-4 py-3 pl-11 text-sm text-stone-900 placeholder:text-stone-400 transition-all outline-none"
                />
                <User className="w-4 h-4 text-stone-400 absolute left-3.5 top-3.5 pointer-events-none" />
              </div>
            </div>

            {/* Phone & City (2 columns) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                  {t('auth.phone')} <span className="text-emerald-700">*</span>
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    required
                    placeholder="+998 90 123 45 67"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-[#FAF8F5] hover:bg-white focus:bg-white border border-stone-200 hover:border-stone-300 focus:border-emerald-700 focus:ring-4 focus:ring-emerald-700/10 rounded-xl px-4 py-3 pl-11 text-sm text-stone-900 placeholder:text-stone-400 transition-all outline-none"
                  />
                  <Phone className="w-4 h-4 text-stone-400 absolute left-3.5 top-3.5 pointer-events-none" />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                  {t('auth.city')}
                </label>
                <div className="relative">
                  <select
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full appearance-none bg-[#FAF8F5] hover:bg-white focus:bg-white border border-stone-200 hover:border-stone-300 focus:border-emerald-700 focus:ring-4 focus:ring-emerald-700/10 rounded-xl px-4 py-3 pr-9 text-sm text-stone-900 transition-all outline-none cursor-pointer"
                  >
                    {UZBEKISTAN_REGIONS.map(reg => (
                      <option key={reg.id} value={reg.id}>{getLocalizedRegion(reg.id)}</option>
                    ))}
                  </select>
                  <ChevronDown className="w-4 h-4 text-stone-400 absolute right-3.5 top-3.5 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Email (Optional) */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                {t('auth.email')}
              </label>
              <div className="relative">
                <input
                  type="email"
                  placeholder="nom@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#FAF8F5] hover:bg-white focus:bg-white border border-stone-200 hover:border-stone-300 focus:border-emerald-700 focus:ring-4 focus:ring-emerald-700/10 rounded-xl px-4 py-3 pl-11 text-sm text-stone-900 placeholder:text-stone-400 transition-all outline-none"
                />
                <Mail className="w-4 h-4 text-stone-400 absolute left-3.5 top-3.5 pointer-events-none" />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                {t('auth.password')} <span className="text-emerald-700">*</span>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="Kamida 6 ta belgi"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-[#FAF8F5] hover:bg-white focus:bg-white border border-stone-200 hover:border-stone-300 focus:border-emerald-700 focus:ring-4 focus:ring-emerald-700/10 rounded-xl px-4 py-3 pl-11 pr-11 text-sm text-stone-900 placeholder:text-stone-400 transition-all outline-none"
                />
                <Lock className="w-4 h-4 text-stone-400 absolute left-3.5 top-3.5 pointer-events-none" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-3.5 text-stone-400 hover:text-stone-700 transition"
                  title={showPassword ? 'Yashirish' : 'Ko‘rsatish'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Terms checkbox */}
            <div className="pt-1">
              <label className="flex items-start gap-2.5 cursor-pointer text-xs text-stone-600 select-none">
                <input
                  type="checkbox"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  className="w-4 h-4 mt-0.5 rounded border-stone-300 text-emerald-800 accent-emerald-800 focus:ring-emerald-600 cursor-pointer"
                />
                <span className="leading-snug">
                  {t('auth.agreeTerms')}
                </span>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-emerald-800 to-emerald-700 hover:from-emerald-700 hover:to-emerald-600 text-white font-semibold text-sm shadow-lg shadow-emerald-900/15 active:scale-[0.99] transition-all flex items-center justify-center gap-2 group cursor-pointer disabled:opacity-70"
            >
              <span>{isLoading ? t('common.loading') : t('auth.createAccount')}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          {/* Clean footer */}
          <div className="text-center pt-5 mt-5 border-t border-stone-100 text-xs text-stone-500">
            <span>{t('auth.hasAccount')} </span>
            <Link to="/login" className="font-bold text-emerald-800 hover:text-emerald-950 hover:underline">
              {t('auth.loginHere')}
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
