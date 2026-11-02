import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ArrowRightLeft, Lock, Phone, Mail, ArrowRight, Sparkles, Eye, EyeOff, ShieldCheck 
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
    <div className="min-h-[85vh] py-10 px-4 sm:px-6 lg:px-8 flex items-center justify-center relative overflow-hidden bg-gradient-to-b from-[#F5F2EB] via-[#FAF8F5] to-[#EFEBE1]">
      {/* Ambient background blur circles */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-emerald-300/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-amber-200/20 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-4xl bg-white/95 backdrop-blur-xl rounded-3xl border border-stone-200/90 shadow-[0_20px_60px_-15px_rgba(20,40,30,0.12)] overflow-hidden grid grid-cols-1 md:grid-cols-12 relative z-10">
        
        {/* Left Side: Editorial Brand Panel */}
        <div className="md:col-span-5 bg-gradient-to-br from-[#0c2e22] via-[#0a261c] to-[#061912] text-white p-8 sm:p-10 flex flex-col justify-between relative overflow-hidden">
          {/* Subtle decorative glow */}
          <div className="absolute -right-20 -top-20 w-64 h-64 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 space-y-6">
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

            <div className="pt-2 space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-400/25 text-emerald-300 text-[11px] font-semibold tracking-wider uppercase">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>{t('auth.loginBadge')}</span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold leading-tight text-white">
                {t('auth.loginTitle')}
              </h2>
              <p className="text-xs text-stone-300/80 leading-relaxed">
                {t('auth.loginSubtitle')}
              </p>
            </div>

            {/* Quick Demo Login Pill Helper */}
            <div className="pt-2 space-y-2.5">
              <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-emerald-300">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>{t('auth.quickDemoUsers')}</span>
              </div>
              <div className="flex flex-col gap-2">
                <button
                  type="button"
                  onClick={() => handleQuickDemo('user-demo-1')}
                  className="w-full text-left p-3 rounded-xl bg-white/[0.07] hover:bg-emerald-900/60 border border-white/10 hover:border-emerald-500/40 text-xs text-stone-200 hover:text-white transition-all flex items-center justify-between group"
                >
                  <div>
                    <span className="font-semibold block text-white">Azizbek Rahimov</span>
                    <span className="text-[10px] text-stone-400">Toshkent • 4.9 baho</span>
                  </div>
                  <span className="text-xs text-emerald-400 group-hover:translate-x-1 transition-transform">→</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleQuickDemo('user-2')}
                  className="w-full text-left p-3 rounded-xl bg-white/[0.07] hover:bg-emerald-900/60 border border-white/10 hover:border-emerald-500/40 text-xs text-stone-200 hover:text-white transition-all flex items-center justify-between group"
                >
                  <div>
                    <span className="font-semibold block text-white">Madina Karimova</span>
                    <span className="text-[10px] text-stone-400">Samarqand • 5.0 baho</span>
                  </div>
                  <span className="text-xs text-emerald-400 group-hover:translate-x-1 transition-transform">→</span>
                </button>
              </div>
            </div>
          </div>

          <div className="relative z-10 pt-6 mt-6 border-t border-white/10 text-xs text-stone-300 flex items-center justify-between">
            <span>Profilingiz yo‘qmi?</span>
            <Link to="/register" className="text-emerald-400 font-bold hover:text-emerald-300 transition inline-flex items-center gap-1">
              <span>{t('auth.registerNow')}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Right Side: Login Form */}
        <div className="md:col-span-7 p-7 sm:p-10 lg:p-12 flex flex-col justify-center bg-white">
          <div className="mb-6">
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight">
              {t('auth.signIn')}
            </h3>
            <p className="text-xs text-stone-500 mt-1">
              Platformaga kirish uchun telefon raqamingiz yoki pochtangizni kiriting.
            </p>
          </div>

          {error && (
            <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 font-medium flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-red-600"></span>
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                {t('auth.phoneOrEmail')} <span className="text-emerald-700">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  placeholder="+998 90 123 45 67 yoki email"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  className="w-full bg-[#FAF8F5] hover:bg-white focus:bg-white border border-stone-200 hover:border-stone-300 focus:border-emerald-700 focus:ring-4 focus:ring-emerald-700/10 rounded-xl px-4 py-3 pl-11 text-sm text-stone-900 placeholder:text-stone-400 transition-all outline-none"
                />
                <Phone className="w-4 h-4 text-stone-400 absolute left-3.5 top-3.5 pointer-events-none" />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-[11px] font-bold uppercase tracking-wider text-stone-700">
                  {t('auth.password')} <span className="text-emerald-700">*</span>
                </label>
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
                  className="absolute right-3.5 top-3.5 text-stone-400 hover:text-stone-700 transition"
                  title={showPassword ? 'Yashirish' : 'Ko‘rsatish'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-emerald-800 to-emerald-700 hover:from-emerald-700 hover:to-emerald-600 text-white font-semibold text-sm shadow-lg shadow-emerald-900/15 active:scale-[0.99] transition-all flex items-center justify-center gap-2 group cursor-pointer disabled:opacity-70 mt-2"
            >
              <span>{isLoading ? t('common.loading') : t('auth.enterAccount')}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          <div className="text-center pt-5 mt-5 border-t border-stone-100 text-xs text-stone-500">
            <span>{t('auth.noAccount')} </span>
            <Link to="/register" className="font-bold text-emerald-800 hover:text-emerald-950 hover:underline">
              {t('auth.registerNow')}
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
