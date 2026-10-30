import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, ArrowRightLeft, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { UZBEKISTAN_REGIONS } from '../data/regions';

// Animated orb for the right panel
function GlowOrb() {
  return (
    <div className="relative w-28 h-28 mx-auto mb-5">
      <div className="absolute inset-0 rounded-full bg-purple-400/20 animate-ping" style={{ animationDuration: '3s' }} />
      <div className="absolute inset-2 rounded-full bg-purple-500/30 animate-pulse" />
      <div className="absolute inset-4 rounded-full bg-gradient-to-br from-purple-300 via-violet-400 to-purple-600 shadow-2xl shadow-purple-500/60 flex items-center justify-center">
        <div className="w-4 h-4 rounded-full bg-white/80 blur-sm" />
        <div className="absolute w-3 h-3 rounded-full bg-purple-200/90 top-5 left-5 blur-[2px]" />
        <div className="absolute w-2 h-2 rounded-full bg-white/60 bottom-4 right-4 blur-[1px]" />
      </div>
    </div>
  );
}

function ActionChip({ icon, label }) {
  return (
    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 text-white/80 text-xs cursor-default hover:bg-white/20 transition-colors">
      <span className="text-base">{icon}</span>
      <span>{label}</span>
    </div>
  );
}

export default function RegisterPage() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const { t, getLocalizedRegion } = useLanguage();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('+998 90 ');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('toshkent-shahar');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Ism-familiyangizni kiriting');
      return;
    }
    if (!agreeTerms) {
      setError('Foydalanish shartlariga rozilik bildiring');
      return;
    }
    setIsLoading(true);
    setError('');
    setTimeout(() => {
      register({
        name,
        phone,
        email: email || `${name.toLowerCase().replace(/\s+/g, '')}@yanabor.uz`,
        city: getLocalizedRegion(city),
        password,
      });
      setIsLoading(false);
      navigate('/profile');
    }, 500);
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 py-10"
      style={{
        background: 'linear-gradient(135deg, #0d0015 0%, #1a0030 40%, #0a001a 100%)',
      }}
    >
      <div
        className="w-full max-w-4xl rounded-3xl overflow-hidden shadow-2xl grid grid-cols-1 md:grid-cols-2"
        style={{ background: 'rgba(15, 5, 30, 0.95)', border: '1px solid rgba(139, 92, 246, 0.18)' }}
      >
        {/* ─── LEFT: Register Form ─── */}
        <div className="p-8 sm:p-10 flex flex-col justify-center space-y-5">
          {/* Logo */}
          <Link to="/" className="inline-flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-600 to-purple-800 flex items-center justify-center shadow-lg shadow-violet-800/40">
              <ArrowRightLeft className="w-4 h-4 text-white" />
            </div>
            <span className="font-serif text-xl font-bold tracking-tight text-white">
              Yana<span className="text-violet-400">Bor</span>
            </span>
          </Link>

          {/* Heading */}
          <div className="space-y-1">
            <h2 className="text-2xl font-bold text-white">Create Account</h2>
            <p className="text-sm text-purple-300/70">Join YanaBor and start exchanging today</p>
          </div>

          {/* Error */}
          {error && (
            <div className="px-4 py-2.5 rounded-xl bg-red-900/40 border border-red-500/40 text-xs text-red-300">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-3.5">
            {/* Full Name */}
            <div>
              <label className="block text-xs font-medium text-purple-300/80 mb-1.5">Full Name *</label>
              <input
                type="text"
                required
                placeholder="Sardor Rustamov"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-xl px-4 py-2.5 text-sm text-white placeholder-purple-400/40 outline-none transition-all focus:ring-2 focus:ring-violet-500/60"
                style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(139,92,246,0.25)' }}
              />
            </div>

            {/* Phone + City row */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-purple-300/80 mb-1.5">Phone *</label>
                <input
                  type="tel"
                  required
                  placeholder="+998 90 123 45 67"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full rounded-xl px-3 py-2.5 text-sm text-white placeholder-purple-400/40 outline-none transition-all focus:ring-2 focus:ring-violet-500/60"
                  style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(139,92,246,0.25)' }}
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-purple-300/80 mb-1.5">City</label>
                <select
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full rounded-xl px-3 py-2.5 text-sm text-white outline-none transition-all focus:ring-2 focus:ring-violet-500/60 appearance-none"
                  style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(139,92,246,0.25)' }}
                >
                  {UZBEKISTAN_REGIONS.map((reg) => (
                    <option key={reg.id} value={reg.id} style={{ background: '#1a0030' }}>
                      {getLocalizedRegion(reg.id)}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs font-medium text-purple-300/80 mb-1.5">Email address</label>
              <input
                type="email"
                placeholder="user@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl px-4 py-2.5 text-sm text-white placeholder-purple-400/40 outline-none transition-all focus:ring-2 focus:ring-violet-500/60"
                style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(139,92,246,0.25)' }}
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-medium text-purple-300/80 mb-1.5">Password *</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-xl px-4 py-2.5 pr-11 text-sm text-white placeholder-purple-400/40 outline-none transition-all focus:ring-2 focus:ring-violet-500/60"
                  style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(139,92,246,0.25)' }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-purple-400/60 hover:text-purple-300 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Agree terms */}
            <label className="flex items-center gap-2 cursor-pointer text-xs text-purple-300/70 pt-1">
              <input
                type="checkbox"
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
                className="w-3.5 h-3.5 accent-violet-500 cursor-pointer rounded"
              />
              Foydalanish shartlari va maxfiylik siyosatiga roziman
            </label>

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 rounded-xl font-semibold text-sm text-white transition-all hover:opacity-90 active:scale-[0.98] shadow-lg shadow-violet-900/40 disabled:opacity-60"
              style={{ background: 'linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)' }}
            >
              {isLoading ? 'Ro\'yxatdan o\'tilmoqda...' : 'Register'}
            </button>
          </form>

          {/* Login link */}
          <p className="text-center text-xs text-purple-300/60">
            Already have an account?{' '}
            <Link to="/login" className="text-violet-400 font-semibold hover:text-violet-300 transition-colors">
              Login
            </Link>
          </p>
        </div>

        {/* ─── RIGHT: AI Assistant Preview Panel ─── */}
        <div
          className="hidden md:flex flex-col items-center justify-between p-8 relative overflow-hidden"
          style={{
            background: 'linear-gradient(160deg, #3b0d6e 0%, #6d28d9 40%, #9333ea 70%, #c026d3 100%)',
          }}
        >
          {/* Background glow blobs */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 rounded-full bg-white/10 blur-3xl pointer-events-none" />
          <div className="absolute bottom-10 right-4 w-40 h-40 rounded-full bg-purple-300/10 blur-2xl pointer-events-none" />

          {/* Content */}
          <div className="relative z-10 text-center flex-1 flex flex-col items-center justify-center">
            <GlowOrb />

            <h3 className="text-xl font-bold text-white mb-2">What Can I Help You.!</h3>
            <p className="text-xs text-white/60 max-w-[220px] leading-relaxed mb-6">
              I'm here to listen, understand your needs, and provide clear.
            </p>

            {/* Quick action chips */}
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              <ActionChip icon="📊" label="Dashboard" />
              <ActionChip icon="🚀" label="Landing Page" />
              <ActionChip icon="💡" label="Plan My MVP" />
              <ActionChip icon="🌐" label="Web" />
            </div>

            {/* Benefits */}
            <div className="space-y-2.5 text-left w-full max-w-[220px]">
              {[
                'Bepul ro\'yxatdan o\'ting',
                'Xavfsiz kelishuv kafolati',
                'Barcha viloyatlarda ishlaydi',
              ].map((item) => (
                <div key={item} className="flex items-center gap-2 text-xs text-white/80">
                  <CheckCircle2 className="w-4 h-4 text-violet-300 flex-shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Chat input mockup */}
          <div
            className="relative z-10 w-full rounded-2xl p-4"
            style={{ background: 'rgba(0,0,0,0.25)', border: '1px solid rgba(255,255,255,0.15)' }}
          >
            <p className="text-xs text-white/50 mb-4">Ask me anything......</p>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <button className="w-6 h-6 rounded-full bg-white/20 text-white/70 flex items-center justify-center text-xs hover:bg-white/30 transition-colors">+</button>
                <button className="flex items-center gap-1 px-2 py-1 rounded-full bg-white/10 text-white/60 text-[10px] hover:bg-white/20 transition-colors">📎 Files</button>
                <button className="flex items-center gap-1 px-2 py-1 rounded-full bg-white/10 text-white/60 text-[10px] hover:bg-white/20 transition-colors">🔍 Search</button>
              </div>
              <div className="flex items-center gap-2">
                <button className="w-6 h-6 rounded-full bg-white/10 text-white/60 flex items-center justify-center text-xs hover:bg-white/20 transition-colors">🎤</button>
                <button
                  className="flex items-center gap-1 px-2 py-1 rounded-full text-[10px] text-white font-medium hover:opacity-80 transition-opacity"
                  style={{ background: 'linear-gradient(135deg,#7c3aed,#a855f7)' }}
                >
                  ✦ Task
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
