import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ArrowRightLeft, User, Phone, Mail, Lock, Eye, EyeOff, 
  ArrowRight, CheckCircle2, ShieldCheck, Sparkles, MapPin, ChevronDown, Star 
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
    <div className="min-h-[calc(100vh-80px)] py-10 sm:py-14 px-4 sm:px-6 lg:px-8 flex items-center justify-center relative overflow-hidden bg-gradient-to-b from-[#F5F2EB] via-[#FAF8F5] to-[#EFEBE1]">
      
      {/* Delicate background dot pattern for luxury texture */}
      <div className="absolute inset-0 bg-[radial-gradient(#065f46_1px,transparent_1px)] [background-size:28px_28px] opacity-[0.05] pointer-events-none" />

      {/* Ambient glowing atmosphere orbs */}
      <div className="absolute -top-32 -left-32 w-[30rem] h-[30rem] bg-emerald-400/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-[30rem] h-[30rem] bg-amber-300/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[40rem] bg-emerald-600/5 rounded-full blur-3xl pointer-events-none" />

      {/* Floating Micro Live Card: Top Left (Desktop) */}
      <div className="hidden xl:flex items-center gap-3 absolute top-16 left-12 p-3.5 pr-5 rounded-2xl bg-white/85 backdrop-blur-md border border-stone-200/80 shadow-lg shadow-emerald-950/5 animate-in fade-in slide-in-from-top-6 duration-700 pointer-events-none">
        <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center shadow-inner">
          <Sparkles className="w-5 h-5 text-emerald-700" />
        </div>
        <div className="text-left">
          <div className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider">Hamjamiyat a’zosi</div>
          <p className="text-xs font-semibold text-stone-800">2,400+ faol sotuvchi va xaridor</p>
          <span className="text-[10px] text-stone-400">O‘zbekiston bo‘ylab</span>
        </div>
      </div>

      {/* Floating Micro Live Card: Bottom Right (Desktop) */}
      <div className="hidden xl:flex items-center gap-3 absolute bottom-16 right-12 p-3.5 pr-5 rounded-2xl bg-white/85 backdrop-blur-md border border-stone-200/80 shadow-lg shadow-emerald-950/5 animate-in fade-in slide-in-from-bottom-6 duration-700 pointer-events-none">
        <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center shadow-inner">
          <ShieldCheck className="w-5 h-5 text-amber-700" />
        </div>
        <div className="text-left">
          <div className="text-[10px] font-bold text-amber-800 uppercase tracking-wider">0% Komissiya</div>
          <p className="text-xs font-semibold text-stone-800">100% Bepul e’lon va obmen</p>
          <span className="text-[10px] text-stone-400">Hech qanday yashirin to‘lovsiz</span>
        </div>
      </div>

      {/* Centerpiece Auth Container */}
      <div className="w-full max-w-4xl lg:max-w-5xl bg-white/95 backdrop-blur-xl rounded-3xl lg:rounded-[32px] border border-stone-200/90 shadow-[0_25px_80px_-20px_rgba(6,78,59,0.2)] overflow-hidden grid grid-cols-1 md:grid-cols-12 relative z-10 transition-all">
        
        {/* Left Side: Brand & Benefits Panel */}
        <div className="md:col-span-5 bg-gradient-to-br from-[#062016] via-[#093222] to-[#04150e] text-white p-7 sm:p-9 lg:p-10 flex flex-col justify-between relative overflow-hidden">
          
          {/* Subtle interior glows */}
          <div className="absolute -right-20 -top-20 w-64 h-64 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-emerald-600/15 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 space-y-6">
            
            {/* Logo */}
            <Link to="/" className="inline-flex items-center gap-3 group">
              <img 
                src="/logo.png" 
                alt="YanaBor" 
                className="w-12 h-12 rounded-2xl object-cover shadow-lg shadow-emerald-950/60 group-hover:scale-105 transition-transform duration-300 ring-1 ring-emerald-400/40" 
              />
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
            <div className="pt-2 space-y-2.5">
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
            <div className="space-y-2.5 pt-1">
              <div className="p-3 rounded-2xl bg-white/[0.07] border border-white/10 backdrop-blur-sm flex items-start gap-3">
                <div className="w-6 h-6 rounded-xl bg-emerald-500/20 text-emerald-300 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-white leading-tight">{t('home.benefit1')}</h4>
                  <p className="text-[10px] text-stone-300/70 leading-tight mt-0.5">{t('common.noCommission')}</p>
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-white/[0.07] border border-white/10 backdrop-blur-sm flex items-start gap-3">
                <div className="w-6 h-6 rounded-xl bg-emerald-500/20 text-emerald-300 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-white leading-tight">{t('common.safeDeal')}</h4>
                  <p className="text-[10px] text-stone-300/70 leading-tight mt-0.5">{t('common.verifiedUser')}</p>
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-white/[0.07] border border-white/10 backdrop-blur-sm flex items-start gap-3">
                <div className="w-6 h-6 rounded-xl bg-emerald-500/20 text-emerald-300 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-white leading-tight">{t('explore.allRegions')}</h4>
                  <p className="text-[10px] text-stone-300/70 leading-tight mt-0.5">{t('common.realExchange')}</p>
                </div>
              </div>
            </div>

            {/* Social Proof Star rating banner */}
            <div className="pt-2 flex items-center justify-between border-t border-white/10 text-xs">
              <div className="flex -space-x-1.5 overflow-hidden">
                <img className="inline-block h-6 w-6 rounded-full ring-2 ring-emerald-950" src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=80&auto=format&fit=crop&q=80" alt="" />
                <img className="inline-block h-6 w-6 rounded-full ring-2 ring-emerald-950" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&auto=format&fit=crop&q=80" alt="" />
                <img className="inline-block h-6 w-6 rounded-full ring-2 ring-emerald-950" src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=80&auto=format&fit=crop&q=80" alt="" />
              </div>
              <div className="flex items-center gap-1 text-[11px] text-emerald-200">
                <div className="flex text-amber-400">
                  <Star className="w-3 h-3 fill-amber-400" />
                  <Star className="w-3 h-3 fill-amber-400" />
                  <Star className="w-3 h-3 fill-amber-400" />
                  <Star className="w-3 h-3 fill-amber-400" />
                  <Star className="w-3 h-3 fill-amber-400" />
                </div>
                <span className="font-bold text-white">4.9</span>
                <span className="text-stone-400">(2,400+ a’zo)</span>
              </div>
            </div>
          </div>

          {/* Left panel bottom link */}
          <div className="relative z-10 pt-5 mt-5 border-t border-white/10 text-xs text-stone-300 flex items-center justify-between">
            <span>Profilingiz bormi?</span>
            <Link to="/login" className="text-emerald-400 font-bold hover:text-emerald-300 transition inline-flex items-center gap-1 group">
              <span>{t('auth.loginHere')}</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Right Side: Registration Form */}
        <div className="md:col-span-7 p-7 sm:p-10 lg:p-12 flex flex-col justify-center bg-white relative">
          
          {/* Top Form Navigation Switcher (Kirish / Ro'yxatdan o'tish) */}
          <div className="flex items-center p-1 bg-stone-100/90 rounded-2xl mb-7 max-w-xs border border-stone-200/80">
            <Link 
              to="/login" 
              className="w-1/2 py-2 text-center text-xs font-semibold rounded-xl text-stone-500 hover:text-stone-900 transition"
            >
              {t('auth.signIn')}
            </Link>
            <span className="w-1/2 py-2 text-center text-xs font-bold rounded-xl bg-white text-emerald-950 shadow-sm transition">
              {t('auth.registerNow')}
            </span>
          </div>

          <div className="mb-6">
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight">
              {t('auth.createAccount')}
            </h3>
            <p className="text-xs sm:text-sm text-stone-500 mt-1.5">
              Ortiqcha buyumlarga ikkinchi hayot bering va xavfsiz obmen qiling.
            </p>
          </div>

          {error && (
            <div className="mb-5 p-3.5 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 font-medium flex items-center gap-2.5 animate-in fade-in">
              <span className="w-2 h-2 rounded-full bg-red-600 flex-shrink-0"></span>
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
                  className="absolute right-3.5 top-3.5 text-stone-400 hover:text-stone-700 transition cursor-pointer"
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
              className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-emerald-800 via-emerald-700 to-teal-800 hover:from-emerald-700 hover:to-teal-700 text-white font-semibold text-sm shadow-lg shadow-emerald-900/20 active:scale-[0.99] transition-all flex items-center justify-center gap-2 group cursor-pointer disabled:opacity-70 mt-2"
            >
              <span>{isLoading ? t('common.loading') : t('auth.createAccount')}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
            </button>
          </form>

          {/* Clean footer */}
          <div className="text-center pt-5 mt-5 border-t border-stone-100 text-xs text-stone-500 flex items-center justify-between">
            <span className="flex items-center gap-1 text-[11px] text-stone-400">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>100% xavfsiz ro‘yxatdan o‘tish</span>
            </span>
            <div>
              <span>{t('auth.hasAccount')} </span>
              <Link to="/login" className="font-bold text-emerald-800 hover:text-emerald-950 hover:underline">
                {t('auth.loginHere')}
              </Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
