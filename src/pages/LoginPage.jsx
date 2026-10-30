import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRightLeft, Lock, Phone, ArrowRight, Sparkles } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';

export default function LoginPage() {
  const navigate = useNavigate();
  const { login, switchDemoUser } = useAuth();
  const { t } = useLanguage();

  const [identifier, setIdentifier] = useState('+998 90 123 45 67');
  const [password, setPassword] = useState('yanabor2026');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!identifier) {
      setError(t('auth.phoneOrEmail'));
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      login(identifier, password);
      setIsLoading(false);
      navigate('/profile');
    }, 400);
  };

  const handleQuickDemo = (userId) => {
    switchDemoUser(userId);
    navigate('/profile');
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-4xl bg-white rounded-[2.5rem] border border-stone-200/90 shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-12">
        
        {/* Left Side: Editorial Brand Panel */}
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
                {t('auth.loginBadge')}
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold leading-tight">
                {t('auth.loginTitle')}
              </h2>
            </div>

            <p className="text-xs text-stone-400 leading-relaxed">
              {t('auth.loginSubtitle')}
            </p>
          </div>

          {/* Quick Demo Login Pill Helper */}
          <div className="relative z-10 pt-8 border-t border-stone-800 space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-emerald-400" /> {t('auth.quickDemoUsers')}
            </span>
            <div className="flex flex-col gap-1.5">
              <button
                type="button"
                onClick={() => handleQuickDemo('user-demo-1')}
                className="w-full text-left px-3 py-2 rounded-xl bg-white/10 hover:bg-emerald-900/60 border border-white/15 text-xs text-stone-200 hover:text-white transition flex items-center justify-between"
              >
                <span>Azizbek Rahimov (Toshkent)</span>
                <span className="text-[10px] text-emerald-300">→</span>
              </button>
              <button
                type="button"
                onClick={() => handleQuickDemo('user-2')}
                className="w-full text-left px-3 py-2 rounded-xl bg-white/10 hover:bg-emerald-900/60 border border-white/15 text-xs text-stone-200 hover:text-white transition flex items-center justify-between"
              >
                <span>Madina Karimova (Samarqand)</span>
                <span className="text-[10px] text-emerald-300">→</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Side: Login Form */}
        <div className="md:col-span-7 p-8 sm:p-12 flex flex-col justify-center space-y-6">
          <div>
            <h3 className="font-serif text-3xl font-bold text-charcoal-900">
              {t('auth.signIn')}
            </h3>
            <p className="text-xs text-stone-500 mt-1">
              {t('auth.phoneOrEmail')}
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
                {t('auth.phoneOrEmail')}
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  placeholder="+998 90 123 45 67 / user@yanabor.uz"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  className="w-full bg-[#FAF8F5] focus:bg-white border border-stone-300 focus:border-emerald-600 rounded-2xl px-4 py-3 pl-11 text-sm text-charcoal-900 focus:outline-none transition shadow-inner"
                />
                <Phone className="w-4 h-4 text-stone-400 absolute left-3.5 top-3.5 pointer-events-none" />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-bold uppercase tracking-wider text-stone-700">
                  {t('auth.password')}
                </label>
              </div>
              <div className="relative">
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-[#FAF8F5] focus:bg-white border border-stone-300 focus:border-emerald-600 rounded-2xl px-4 py-3 pl-11 text-sm text-charcoal-900 focus:outline-none transition shadow-inner"
                />
                <Lock className="w-4 h-4 text-stone-400 absolute left-3.5 top-3.5 pointer-events-none" />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 rounded-2xl bg-emerald-800 hover:bg-emerald-900 active:bg-emerald-950 text-white font-bold text-sm shadow-md shadow-emerald-900/15 transition flex items-center justify-center gap-2"
            >
              <span>{isLoading ? t('common.loading') : t('auth.enterAccount')}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="text-center pt-2 border-t border-stone-100 text-xs text-stone-500">
            <span>{t('auth.noAccount')} </span>
            <Link to="/register" className="font-bold text-emerald-800 hover:underline">
              {t('auth.registerNow')}
            </Link>
          </div>

        </div>

      </div>
    </div>
  );
}
