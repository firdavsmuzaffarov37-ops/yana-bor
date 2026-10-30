import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, ArrowRightLeft, Sparkles } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';

// Animated orb / glowing sphere for the right panel
function GlowOrb() {
  return (
    <div className="relative w-32 h-32 mx-auto mb-6">
      {/* Outer glow rings */}
      <div className="absolute inset-0 rounded-full bg-purple-400/20 animate-ping" style={{ animationDuration: '3s' }} />
      <div className="absolute inset-2 rounded-full bg-purple-500/30 animate-pulse" />
      {/* Main orb */}
      <div className="absolute inset-4 rounded-full bg-gradient-to-br from-purple-300 via-violet-400 to-purple-600 shadow-2xl shadow-purple-500/60 flex items-center justify-center">
        <div className="w-4 h-4 rounded-full bg-white/80 blur-sm" />
        <div className="absolute w-3 h-3 rounded-full bg-purple-200/90 top-6 left-6 blur-[2px]" />
        <div className="absolute w-2 h-2 rounded-full bg-white/60 bottom-5 right-5 blur-[1px]" />
      </div>
    </div>
  );
}

// Quick action chips for the right panel
function ActionChip({ icon, label }) {
  return (
    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 text-white/80 text-xs cursor-default hover:bg-white/20 transition-colors">
      <span className="text-base">{icon}</span>
      <span>{label}</span>
    </div>
  );
}

export default function LoginPage() {
  const navigate = useNavigate();
  const { login, switchDemoUser } = useAuth();
  const { t } = useLanguage();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [keepLogin, setKeepLogin] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      setError('Email manzilini kiriting');
      return;
    }
    setIsLoading(true);
    setError('');
    setTimeout(() => {
      login(email, password);
      setIsLoading(false);
      navigate('/profile');
    }, 500);
  };

  const handleQuickDemo = (userId) => {
    switchDemoUser(userId);
    navigate('/profile');
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 py-10"
      style={{
        background: 'linear-gradient(135deg, #0d0015 0%, #1a0030 40%, #0a001a 100%)',
      }}
    >
      {/* Card */}
      <div
        className="w-full max-w-4xl rounded-3xl overflow-hidden shadow-2xl grid grid-cols-1 md:grid-cols-2"
        style={{ background: 'rgba(15, 5, 30, 0.95)', border: '1px solid rgba(139, 92, 246, 0.18)' }}
      >
        {/* ─── LEFT: Login Form ─── */}
        <div className="p-8 sm:p-10 flex flex-col justify-center space-y-6">
          {/* Logo */}
          <Link to="/" className="inline-flex items-center gap-2 mb-2">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-600 to-purple-800 flex items-center justify-center shadow-lg shadow-violet-800/40">
              <ArrowRightLeft className="w-4 h-4 text-white" />
            </div>
            <span className="font-serif text-xl font-bold tracking-tight text-white">
              Yana<span className="text-violet-400">Bor</span>
            </span>
          </Link>

          {/* Avatar placeholder */}
          <div className="flex justify-center">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-violet-600 to-purple-900 border-2 border-violet-500/40 flex items-center justify-center text-2xl shadow-lg shadow-violet-800/30">
              👤
            </div>
          </div>

          {/* Heading */}
          <div className="text-center space-y-1">
            <h2 className="text-2xl font-bold text-white">Welcome Back</h2>
            <p className="text-sm text-purple-300/70">Enter your email and passwords to access</p>
          </div>

          {/* Error */}
          {error && (
            <div className="px-4 py-2.5 rounded-xl bg-red-900/40 border border-red-500/40 text-xs text-red-300">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div>
              <label className="block text-xs font-medium text-purple-300/80 mb-1.5">
                Email address
              </label>
              <input
                type="text"
                required
                placeholder="user@yanabor.uz"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl px-4 py-3 text-sm text-white placeholder-purple-400/40 outline-none transition-all focus:ring-2 focus:ring-violet-500/60"
                style={{
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(139,92,246,0.25)',
                }}
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-medium text-purple-300/80 mb-1.5">
                Passwords
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-xl px-4 py-3 pr-11 text-sm text-white placeholder-purple-400/40 outline-none transition-all focus:ring-2 focus:ring-violet-500/60"
                  style={{
                    background: 'rgba(255,255,255,0.06)',
                    border: '1px solid rgba(139,92,246,0.25)',
                  }}
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

            {/* Keep me login + Forget password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer text-xs text-purple-300/70">
                <input
                  type="checkbox"
                  checked={keepLogin}
                  onChange={(e) => setKeepLogin(e.target.checked)}
                  className="w-3.5 h-3.5 accent-violet-500 cursor-pointer rounded"
                />
                Keep me login
              </label>
              <button type="button" className="text-xs text-violet-400 hover:text-violet-300 transition-colors">
                Forget password?
              </button>
            </div>

            {/* Login button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 rounded-xl font-semibold text-sm text-white transition-all hover:opacity-90 active:scale-[0.98] shadow-lg shadow-violet-900/40 disabled:opacity-60"
              style={{
                background: 'linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)',
              }}
            >
              {isLoading ? 'Kirish...' : 'Login'}
            </button>
          </form>

          {/* Register link */}
          <p className="text-center text-xs text-purple-300/60">
            Don't have an account?{' '}
            <Link to="/register" className="text-violet-400 font-semibold hover:text-violet-300 transition-colors">
              Register
            </Link>
          </p>

          {/* Demo users */}
          <div className="pt-4 border-t border-violet-800/30">
            <p className="text-[10px] font-bold uppercase tracking-wider text-purple-400/60 flex items-center gap-1 mb-2">
              <Sparkles className="w-3 h-3 text-violet-400" /> Demo foydalanuvchilar
            </p>
            <div className="flex flex-col gap-1.5">
              {[
                { id: 'user-demo-1', label: 'Azizbek Rahimov (Toshkent)' },
                { id: 'user-2', label: 'Madina Karimova (Samarqand)' },
              ].map(({ id, label }) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => handleQuickDemo(id)}
                  className="w-full text-left px-3 py-2 rounded-xl text-xs text-purple-200/80 hover:text-white transition-all flex items-center justify-between"
                  style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(139,92,246,0.15)' }}
                >
                  <span>{label}</span>
                  <span className="text-violet-400">→</span>
                </button>
              ))}
            </div>
          </div>
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

          {/* Top content */}
          <div className="relative z-10 text-center pt-6 flex-1 flex flex-col items-center justify-center">
            <GlowOrb />

            <h3 className="text-xl font-bold text-white mb-2">What Can I Help You.!</h3>
            <p className="text-xs text-white/60 max-w-[220px] leading-relaxed">
              I'm here to listen, understand your needs, and provide clear.
            </p>

            {/* Quick action chips */}
            <div className="flex flex-wrap justify-center gap-2 mt-6">
              <ActionChip icon="📊" label="Dashboard" />
              <ActionChip icon="🚀" label="Landing Page" />
              <ActionChip icon="💡" label="Plan My MVP" />
              <ActionChip icon="🌐" label="Web" />
            </div>
          </div>

          {/* Chat input mockup */}
          <div
            className="relative z-10 w-full rounded-2xl p-4 mt-4"
            style={{ background: 'rgba(0,0,0,0.25)', border: '1px solid rgba(255,255,255,0.15)' }}
          >
            <p className="text-xs text-white/50 mb-4">Ask me anything......</p>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <button className="w-6 h-6 rounded-full bg-white/20 text-white/70 flex items-center justify-center text-xs hover:bg-white/30 transition-colors">+</button>
                <button className="flex items-center gap-1 px-2 py-1 rounded-full bg-white/10 text-white/60 text-[10px] hover:bg-white/20 transition-colors">
                  📎 Files
                </button>
                <button className="flex items-center gap-1 px-2 py-1 rounded-full bg-white/10 text-white/60 text-[10px] hover:bg-white/20 transition-colors">
                  🔍 Search
                </button>
              </div>
              <div className="flex items-center gap-2">
                <button className="w-6 h-6 rounded-full bg-white/10 text-white/60 flex items-center justify-center text-xs hover:bg-white/20 transition-colors">🎤</button>
                <button className="flex items-center gap-1 px-2 py-1 rounded-full text-[10px] text-white font-medium hover:opacity-80 transition-opacity"
                  style={{ background: 'linear-gradient(135deg,#7c3aed,#a855f7)' }}>
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
