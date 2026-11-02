import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ArrowRightLeft, Lock, Phone, Mail, ArrowRight, Sparkles, 
  Eye, EyeOff, ShieldCheck, CheckCircle2, Star, UserCheck
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { isSupabaseConfigured, supabase } from '../services/supabaseClient';

export default function LoginPage() {
  const navigate = useNavigate();
  const { login, switchDemoUser } = useAuth();
  const { t } = useLanguage();

  const [identifier, setIdentifier] = useState('+998 90 123 45 67');
  const [password, setPassword] = useState('yanabor2026');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!identifier) {
      setError(t('auth.phoneOrEmail'));
      return;
    }

    setIsLoading(true);

    try {
      if (isSupabaseConfigured() && identifier.includes('@')) {
        try {
          await supabase.auth.signInWithPassword({
            email: identifier,
            password: password
          });
        } catch (supaErr) {
          console.warn('Supabase signIn notice:', supaErr);
        }
      }

      setTimeout(() => {
        login(identifier, password);
        setIsLoading(false);
        navigate('/profile');
      }, 400);

    } catch (err) {
      setIsLoading(false);
      setError(err?.message || 'Kirishda xatolik yuz berdi');
    }
  };

  const handleQuickDemo = (userId) => {
    switchDemoUser(userId);
    navigate('/profile');
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
          <ArrowRightLeft className="w-5 h-5 text-emerald-700" />
        </div>
        <div className="text-left">
          <div className="flex items-center gap-1.5 text-[10px] font-bold text-emerald-800 uppercase tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>
            Obmen amalga oshdi
          </div>
          <p className="text-xs font-semibold text-stone-800">Sony WH-1000XM4 ⇄ iPad Mini</p>
          <span className="text-[10px] text-stone-400">Toshkent • 4 daqiqa oldin</span>
        </div>
      </div>

      {/* Floating Micro Live Card: Bottom Right (Desktop) */}
      <div className="hidden xl:flex items-center gap-3 absolute bottom-16 right-12 p-3.5 pr-5 rounded-2xl bg-white/85 backdrop-blur-md border border-stone-200/80 shadow-lg shadow-emerald-950/5 animate-in fade-in slide-in-from-bottom-6 duration-700 pointer-events-none">
        <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center shadow-inner">
          <ShieldCheck className="w-5 h-5 text-amber-700" />
        </div>
        <div className="text-left">
          <div className="text-[10px] font-bold text-amber-800 uppercase tracking-wider">100% Xavfsiz kelishuv</div>
          <p className="text-xs font-semibold text-stone-800">Uchrashuv va tekshiruv kafolati</p>
          <span className="text-[10px] text-stone-400">Ortiqcha xavf-xatarsiz</span>
        </div>
      </div>

      {/* Centerpiece Auth Container */}
      <div className="w-full max-w-4xl lg:max-w-5xl bg-white/95 backdrop-blur-xl rounded-3xl lg:rounded-[32px] border border-stone-200/90 shadow-[0_25px_80px_-20px_rgba(6,78,59,0.2)] overflow-hidden grid grid-cols-1 md:grid-cols-12 relative z-10 transition-all">
        
        {/* Left Side: Editorial Brand Panel */}
        <div className="md:col-span-5 bg-gradient-to-br from-[#062016] via-[#093222] to-[#04150e] text-white p-7 sm:p-9 lg:p-10 flex flex-col justify-between relative overflow-hidden">
          
          {/* Subtle glowing interior orbs */}
          <div className="absolute -right-20 -top-20 w-64 h-64 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-emerald-600/15 rounded-full blur-3xl pointer-events-none" />

          {/* Top block */}
          <div className="relative z-10 space-y-6">
            
            {/* Brand Logo */}
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
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>Hozir 340+ obmen taklifi faol</span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold leading-tight text-white">
                Qadrlangan buyumlarning <span className="italic text-emerald-300 font-serif">yangi hayoti</span>.
              </h2>
              <p className="text-xs text-stone-300/80 leading-relaxed">
                Ortiqcha xarajatlarsiz soting, tejamkor xarid qiling yoki o‘zaro manfaatli ayirboshlang.
              </p>
            </div>

            {/* Quick 1-Click Demo Logins */}
            <div className="pt-2 space-y-2.5">
              <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-emerald-300">
                <span className="flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>Tezkor sinov akkauntlari:</span>
                </span>
                <span className="text-[10px] text-emerald-400/70 normal-case font-normal">1 bosishda kirish</span>
              </div>
              <div className="flex flex-col gap-2">
                <button
                  type="button"
                  onClick={() => handleQuickDemo('user-demo-1')}
                  className="w-full text-left p-3 rounded-2xl bg-white/[0.07] hover:bg-emerald-900/60 border border-white/10 hover:border-emerald-500/40 text-xs text-stone-200 hover:text-white transition-all flex items-center justify-between group cursor-pointer"
                >
                  <div className="flex items-center gap-2.5">
                    <img 
                      src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80" 
                      alt="Azizbek" 
                      className="w-8 h-8 rounded-full object-cover border border-emerald-400/30"
                    />
                    <div>
                      <div className="flex items-center gap-1">
                        <span className="font-semibold block text-white text-xs">Azizbek Rahimov</span>
                        <UserCheck className="w-3 h-3 text-emerald-400" />
                      </div>
                      <span className="text-[10px] text-stone-300/70">Toshkent • 4.9 reyting</span>
                    </div>
                  </div>
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 group-hover:bg-emerald-500 group-hover:text-white transition">
                    Kirish →
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => handleQuickDemo('user-2')}
                  className="w-full text-left p-3 rounded-2xl bg-white/[0.07] hover:bg-emerald-900/60 border border-white/10 hover:border-emerald-500/40 text-xs text-stone-200 hover:text-white transition-all flex items-center justify-between group cursor-pointer"
                >
                  <div className="flex items-center gap-2.5">
                    <img 
                      src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80" 
                      alt="Madina" 
                      className="w-8 h-8 rounded-full object-cover border border-emerald-400/30"
                    />
                    <div>
                      <div className="flex items-center gap-1">
                        <span className="font-semibold block text-white text-xs">Madina Karimova</span>
                        <UserCheck className="w-3 h-3 text-emerald-400" />
                      </div>
                      <span className="text-[10px] text-stone-300/70">Samarqand • 5.0 reyting</span>
                    </div>
                  </div>
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 group-hover:bg-emerald-500 group-hover:text-white transition">
                    Kirish →
                  </span>
                </button>
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
                <span className="text-stone-400">(2,400+ faol a’zo)</span>
              </div>
            </div>
          </div>

          {/* Bottom Link to Register */}
          <div className="relative z-10 pt-5 mt-5 border-t border-white/10 text-xs text-stone-300 flex items-center justify-between">
            <span>Profilingiz yo‘qmi?</span>
            <Link to="/register" className="text-emerald-400 font-bold hover:text-emerald-300 transition inline-flex items-center gap-1 group">
              <span>{t('auth.registerNow')}</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Right Side: Clean Login Form */}
        <div className="md:col-span-7 p-7 sm:p-10 lg:p-12 flex flex-col justify-center bg-white relative">
          
          {/* Top Form Navigation Switcher (Kirish / Ro'yxatdan o'tish) */}
          <div className="flex items-center p-1 bg-stone-100/90 rounded-2xl mb-7 max-w-xs border border-stone-200/80">
            <span className="w-1/2 py-2 text-center text-xs font-bold rounded-xl bg-white text-emerald-950 shadow-sm transition">
              {t('auth.signIn')}
            </span>
            <Link 
              to="/register" 
              className="w-1/2 py-2 text-center text-xs font-semibold rounded-xl text-stone-500 hover:text-stone-900 transition"
            >
              {t('auth.registerNow')}
            </Link>
          </div>

          <div className="mb-6">
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight">
              {t('auth.signIn')}
            </h3>
            <p className="text-xs sm:text-sm text-stone-500 mt-1.5">
              Platformaga kirish uchun telefon raqamingiz yoki pochtangizni kiriting.
            </p>
          </div>

          {error && (
            <div className="mb-5 p-3.5 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 font-medium flex items-center gap-2.5 animate-in fade-in">
              <span className="w-2 h-2 rounded-full bg-red-600 flex-shrink-0"></span>
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Phone or Email */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                {t('auth.phoneOrEmail')} <span className="text-emerald-700">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  placeholder="+998 90 123 45 67 yoki user@yanabor.uz"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  className="w-full bg-[#FAF8F5] hover:bg-white focus:bg-white border border-stone-200 hover:border-stone-300 focus:border-emerald-700 focus:ring-4 focus:ring-emerald-700/10 rounded-xl px-4 py-3 pl-11 text-sm text-stone-900 placeholder:text-stone-400 transition-all outline-none"
                />
                <Phone className="w-4 h-4 text-stone-400 absolute left-3.5 top-3.5 pointer-events-none" />
              </div>
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-[11px] font-bold uppercase tracking-wider text-stone-700">
                  {t('auth.password')} <span className="text-emerald-700">*</span>
                </label>
                <button
                  type="button"
                  onClick={() => alert("Parolni tiklash uchun qo'llab-quvvatlash xizmati yoki demo akkaunt orqali kiring.")}
                  className="text-[11px] text-emerald-800 hover:text-emerald-950 font-medium hover:underline cursor-pointer"
                >
                  Parolni unutdingizmi?
                </button>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="••••••••"
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

            {/* Remember Me Checkbox */}
            <div className="pt-0.5">
              <label className="flex items-center gap-2 cursor-pointer text-xs text-stone-600 select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded border-stone-300 text-emerald-800 accent-emerald-800 focus:ring-emerald-600 cursor-pointer"
                />
                <span>Meni tizimda eslab qolish</span>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-emerald-800 via-emerald-700 to-teal-800 hover:from-emerald-700 hover:to-teal-700 text-white font-semibold text-sm shadow-lg shadow-emerald-900/20 active:scale-[0.99] transition-all flex items-center justify-center gap-2 group cursor-pointer disabled:opacity-70 mt-2"
            >
              <span>{isLoading ? t('common.loading') : t('auth.enterAccount')}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
            </button>
          </form>

          {/* Alternative fast entry via Telegram */}
          <div className="relative my-6 text-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-stone-200"></div>
            </div>
            <span className="relative px-3 bg-white text-[11px] uppercase tracking-wider text-stone-400 font-semibold">
              yoki tezkor kirish
            </span>
          </div>

          <button
            type="button"
            onClick={() => handleQuickDemo('user-demo-1')}
            className="w-full py-2.5 px-4 rounded-xl border border-stone-200 hover:border-sky-300 hover:bg-sky-50/40 text-stone-700 text-xs font-semibold transition flex items-center justify-center gap-2 cursor-pointer group"
          >
            {/* Telegram Icon SVG */}
            <svg className="w-4 h-4 text-[#2AABEE] fill-current" viewBox="0 0 24 24">
              <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.121l-6.871 4.326-2.962-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.196 1.006.128.832.942z"/>
            </svg>
            <span>Telegram orqali 1-bosishda sinash</span>
          </button>

          {/* Clean footer */}
          <div className="text-center pt-5 mt-5 border-t border-stone-100 text-xs text-stone-500 flex items-center justify-between">
            <span className="flex items-center gap-1 text-[11px] text-stone-400">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>100% xavfsiz va shifrlangan</span>
            </span>
            <div>
              <span>{t('auth.noAccount')} </span>
              <Link to="/register" className="font-bold text-emerald-800 hover:text-emerald-950 hover:underline">
                {t('auth.registerNow')}
              </Link>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
