import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  Search, Heart, MessageSquare, PlusCircle, User, 
  Menu, X, Sparkles, RefreshCw, LogOut, ArrowRightLeft,
  ChevronDown, ShieldCheck, Tag
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useMarketplace } from '../../context/MarketplaceContext';
import { useLanguage } from '../../context/LanguageContext';
import LanguageSelector from '../common/LanguageSelector';
import { isSupabaseConfigured } from '../../services/supabaseClient';

export default function Navbar() {
  const { user, isAuthenticated, logout, switchDemoUser } = useAuth();
  const { favorites, conversations, searchTerm, setSearchTerm, resetAllData } = useMarketplace();
  const { t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [demoMenuOpen, setDemoMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (location.pathname !== '/explore') {
      navigate('/explore');
    }
  };

  const unreadMessagesCount = conversations.reduce((acc, c) => acc + (c.unreadCount || 0), 0);

  return (
    <header className="sticky top-0 z-50 bg-[#FAF8F5]/90 backdrop-blur-md border-b border-[#E8E4DA] transition-all">
      {/* Top Demo Bar / Announcement */}
      <div className="bg-emerald-950 text-emerald-200 text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            {isSupabaseConfigured() ? (
              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                Supabase Ulangan
              </span>
            ) : (
              <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                {t('common.demoMode')}
              </span>
            )}
            <span className="hidden sm:inline">
              {t('common.announcement')}
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* Language Selector in top bar */}
            <LanguageSelector variant="pills" />

            <span className="text-emerald-700 hidden sm:inline">|</span>

            <div className="relative">
              <button 
                onClick={() => setDemoMenuOpen(!demoMenuOpen)}
                className="text-xs text-emerald-300 hover:text-white flex items-center gap-1 transition"
              >
                <span>{t('common.user')}: <b>{user?.name || t('common.guest')}</b></span>
                <ChevronDown className="w-3 h-3" />
              </button>

              {demoMenuOpen && (
                <div className="absolute right-0 mt-1 w-56 bg-white text-charcoal-900 rounded-xl shadow-xl border border-stone-200 py-2 z-50 text-xs">
                  <div className="px-3 py-1 font-semibold text-stone-500 border-b border-stone-100">
                    {t('common.switchAccount')}
                  </div>
                  <button
                    onClick={() => { switchDemoUser('user-demo-1'); setDemoMenuOpen(false); }}
                    className="w-full text-left px-3 py-2 hover:bg-emerald-50 flex items-center justify-between"
                  >
                    <span>Azizbek Rahimov (Toshkent)</span>
                    {user?.id === 'user-demo-1' && <span className="text-emerald-600 font-bold">✓</span>}
                  </button>
                  <button
                    onClick={() => { switchDemoUser('user-2'); setDemoMenuOpen(false); }}
                    className="w-full text-left px-3 py-2 hover:bg-emerald-50 flex items-center justify-between"
                  >
                    <span>Madina Karimova (Samarqand)</span>
                    {user?.id === 'user-2' && <span className="text-emerald-600 font-bold">✓</span>}
                  </button>
                  <button
                    onClick={() => { switchDemoUser('user-3'); setDemoMenuOpen(false); }}
                    className="w-full text-left px-3 py-2 hover:bg-emerald-50 flex items-center justify-between"
                  >
                    <span>Jasur Temirov (Toshkent)</span>
                    {user?.id === 'user-3' && <span className="text-emerald-600 font-bold">✓</span>}
                  </button>
                  <div className="border-t border-stone-100 my-1"></div>
                  <button
                    onClick={() => { resetAllData(); setDemoMenuOpen(false); }}
                    className="w-full text-left px-3 py-2 text-red-600 hover:bg-red-50 flex items-center gap-1.5"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>{t('common.resetData')}</span>
                  </button>
                </div>
              )}
            </div>

            <span className="text-emerald-500 hidden sm:inline">|</span>
            <Link to="/how-it-works" className="hover:text-white transition hidden sm:inline">
              {t('nav.howItWorksMenu')}
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-emerald-800 to-emerald-950 flex items-center justify-center text-white shadow-md shadow-emerald-900/20 group-hover:scale-105 transition-transform">
              <ArrowRightLeft className="w-5 h-5 text-emerald-300 transform -rotate-12 group-hover:rotate-0 transition-transform duration-300" />
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-2xl font-bold tracking-tight text-emerald-950 flex items-center gap-1">
                Yana<span className="text-emerald-600">Bor</span>
              </span>
              <span className="text-[10px] tracking-widest uppercase font-semibold text-stone-500 -mt-1">
                Second-Life Uzbekistan
              </span>
            </div>
          </Link>

          {/* Nav Links - Desktop */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-stone-700">
            <Link 
              to="/" 
              className={`hover:text-emerald-700 transition ${location.pathname === '/' ? 'text-emerald-700 font-semibold' : ''}`}
            >
              {t('nav.home')}
            </Link>
            <Link 
              to="/explore" 
              className={`hover:text-emerald-700 transition ${location.pathname === '/explore' ? 'text-emerald-700 font-semibold' : ''}`}
            >
              {t('nav.explore')}
            </Link>
            <Link 
              to="/exchange" 
              className={`flex items-center gap-1.5 hover:text-emerald-700 transition ${location.pathname === '/exchange' ? 'text-emerald-700 font-semibold' : ''}`}
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600"></span>
              </span>
              {t('nav.exchange')}
            </Link>
            <Link 
              to="/how-it-works" 
              className={`hover:text-emerald-700 transition ${location.pathname === '/how-it-works' ? 'text-emerald-700 font-semibold' : ''}`}
            >
              {t('nav.howItWorks')}
            </Link>
          </nav>

          {/* Search Bar - Quick Header */}
          <form onSubmit={handleSearchSubmit} className="hidden md:flex items-center flex-1 max-w-xs xl:max-w-md relative">
            <input
              type="text"
              placeholder={t('common.searchPlaceholder')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[#F3EFE6] hover:bg-[#EFEAE0] focus:bg-white text-sm text-charcoal-900 placeholder-stone-500 rounded-full py-2.5 pl-10 pr-4 border border-transparent focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-600/10 transition shadow-inner"
            />
            <Search className="w-4 h-4 text-stone-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </form>

          {/* Right Action Icons & Auth */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Language Selector Dropdown */}
            <LanguageSelector className="hidden sm:block" />

            {/* Favorites Icon */}
            <Link 
              to="/profile?tab=favorites" 
              className="relative p-2.5 rounded-full text-stone-700 hover:text-emerald-700 hover:bg-stone-200/50 transition"
              title={t('nav.favorites')}
            >
              <Heart className="w-5 h-5" />
              {favorites.length > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-amber-600 text-white text-[10px] font-bold flex items-center justify-center">
                  {favorites.length}
                </span>
              )}
            </Link>

            {/* Messages Icon */}
            <Link 
              to="/messages" 
              className="relative p-2.5 rounded-full text-stone-700 hover:text-emerald-700 hover:bg-stone-200/50 transition"
              title={t('nav.messages')}
            >
              <MessageSquare className="w-5 h-5" />
              {unreadMessagesCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-emerald-600 text-white text-[10px] font-bold flex items-center justify-center animate-pulse">
                  {unreadMessagesCount}
                </span>
              )}
            </Link>

            {/* Sell Button - Prominent CTA */}
            <Link
              to="/sell"
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-emerald-800 hover:bg-emerald-900 active:bg-emerald-950 text-white font-medium text-sm shadow-md shadow-emerald-900/15 hover:shadow-lg transition transform hover:-translate-y-0.5"
            >
              <PlusCircle className="w-4 h-4 text-emerald-300" />
              <span>{t('nav.sell')}</span>
            </Link>

            {/* User Dropdown / Auth Links */}
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 p-1 pl-2 rounded-full border border-stone-300 hover:border-emerald-600 bg-white transition shadow-sm"
                >
                  <img
                    src={user.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=240&auto=format&fit=crop&q=80'}
                    alt={user.name}
                    className="w-7 h-7 rounded-full object-cover"
                  />
                  <span className="text-xs font-semibold text-stone-800 max-w-[80px] truncate hidden sm:inline">
                    {user.name.split(' ')[0]}
                  </span>
                  <ChevronDown className="w-3.5 h-3.5 text-stone-500 mr-1" />
                </button>

                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-stone-200 py-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                    <div className="px-4 py-2 border-b border-stone-100">
                      <p className="text-xs text-stone-500">{t('nav.myProfile')}:</p>
                      <p className="text-sm font-semibold text-stone-900 truncate">{user.name}</p>
                      <p className="text-[11px] text-stone-500 truncate">{user.phone || user.email}</p>
                    </div>

                    <Link
                      to="/profile"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-stone-700 hover:bg-emerald-50 hover:text-emerald-800 transition"
                    >
                      <User className="w-4 h-4" />
                      {t('nav.myProfile')}
                    </Link>

                    <Link
                      to="/profile?tab=listings"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-stone-700 hover:bg-emerald-50 hover:text-emerald-800 transition"
                    >
                      <Tag className="w-4 h-4" />
                      {t('nav.myListings')}
                    </Link>

                    <Link
                      to="/profile?tab=exchanges"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-stone-700 hover:bg-emerald-50 hover:text-emerald-800 transition"
                    >
                      <ArrowRightLeft className="w-4 h-4" />
                      {t('nav.exchangeOffers')}
                    </Link>

                    <Link
                      to="/messages"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-stone-700 hover:bg-emerald-50 hover:text-emerald-800 transition"
                    >
                      <MessageSquare className="w-4 h-4" />
                      {t('nav.myMessages')}
                    </Link>

                    <div className="border-t border-stone-100 my-1"></div>

                    <button
                      onClick={() => {
                        logout();
                        setUserDropdownOpen(false);
                      }}
                      className="w-full flex items-center gap-2.5 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition text-left"
                    >
                      <LogOut className="w-4 h-4" />
                      {t('nav.logout')}
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to="/login"
                  className="px-3 py-2 text-sm font-semibold text-stone-700 hover:text-emerald-800 transition"
                >
                  {t('nav.login')}
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 rounded-full bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-semibold shadow-sm transition"
                >
                  {t('nav.register')}
                </Link>
              </div>
            )}

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-stone-700 hover:bg-stone-200 transition"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-stone-200 px-4 pt-3 pb-6 space-y-3">
          {/* Mobile Language Switcher */}
          <div className="pb-2 border-b border-stone-100">
            <p className="text-[10px] font-bold uppercase tracking-wider text-stone-400 mb-2">Til / Язык / Language:</p>
            <LanguageSelector variant="list" />
          </div>

          <form onSubmit={handleSearchSubmit} className="relative">
            <input
              type="text"
              placeholder={t('common.searchPlaceholder')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-stone-100 text-sm text-charcoal-900 rounded-xl py-2.5 pl-10 pr-4 border-0 focus:ring-2 focus:ring-emerald-600"
            />
            <Search className="w-4 h-4 text-stone-500 absolute left-3 top-3 pointer-events-none" />
          </form>

          <div className="flex flex-col space-y-1 font-medium text-stone-800 pt-2">
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-emerald-50 hover:text-emerald-800"
            >
              {t('nav.home')}
            </Link>
            <Link
              to="/explore"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-emerald-50 hover:text-emerald-800"
            >
              {t('nav.allListingsMenu')}
            </Link>
            <Link
              to="/exchange"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-emerald-50 hover:text-emerald-800 flex items-center justify-between"
            >
              <span>{t('nav.exchange')}</span>
              <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-bold">{t('common.active')}</span>
            </Link>
            <Link
              to="/how-it-works"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-emerald-50 hover:text-emerald-800"
            >
              {t('nav.howItWorksMenu')}
            </Link>
            <Link
              to="/sell"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg bg-emerald-50 text-emerald-900 font-bold flex items-center gap-2"
            >
              <PlusCircle className="w-4 h-4 text-emerald-600" />
              {t('nav.sellOrExchangeMenu')}
            </Link>
          </div>

          <div className="border-t border-stone-200 pt-3 flex items-center justify-between">
            {isAuthenticated ? (
              <div className="flex items-center gap-3">
                <img src={user.avatar} alt={user.name} className="w-9 h-9 rounded-full object-cover" />
                <div>
                  <div className="text-sm font-semibold">{user.name}</div>
                  <Link to="/profile" onClick={() => setMobileMenuOpen(false)} className="text-xs text-emerald-700 underline">
                    {t('nav.viewProfileLink')}
                  </Link>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-2 w-full">
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-1/2 text-center py-2 text-sm font-medium border border-stone-300 rounded-xl"
                >
                  {t('nav.login')}
                </Link>
                <Link
                  to="/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-1/2 text-center py-2 text-sm font-medium bg-emerald-800 text-white rounded-xl"
                >
                  {t('nav.register')}
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
