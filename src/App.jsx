import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Home, Compass, Heart, MessageSquare, User, PlusCircle, ArrowRightLeft, Sparkles, X } from 'lucide-react';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { MarketplaceProvider, useMarketplace } from './context/MarketplaceContext';

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

import HomePage from './pages/HomePage';
import ExplorePage from './pages/ExplorePage';
import ProductDetailPage from './pages/ProductDetailPage';
import SellItemPage from './pages/SellItemPage';
import ExchangeHubPage from './pages/ExchangeHubPage';
import MessagesPage from './pages/MessagesPage';
import ProfilePage from './pages/ProfilePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import HowItWorksPage from './pages/HowItWorksPage';

// Toast Notification Banner Component
function ToastNotification() {
  const { toastMessage } = useMarketplace();
  if (!toastMessage) return null;

  return (
    <div className="fixed bottom-20 md:bottom-6 right-6 z-50 animate-in slide-in-from-bottom-4 duration-200">
      <div className={`px-4 py-3 rounded-2xl shadow-xl flex items-center gap-3 text-xs font-semibold border ${
        toastMessage.type === 'success'
          ? 'bg-emerald-900 text-white border-emerald-700'
          : 'bg-stone-900 text-white border-stone-700'
      }`}>
        <Sparkles className="w-4 h-4 text-emerald-400" />
        <span>{toastMessage.message}</span>
      </div>
    </div>
  );
}

// Mobile Bottom Navigation Bar (Home, Explore, Sell, Favorites, Profile)
function MobileBottomNav() {
  const location = useLocation();
  const { favorites } = useMarketplace();
  const { t } = useLanguage();

  // Hide on detail or chat to give full focus
  const isMessageView = location.pathname.startsWith('/messages');

  return (
    <div className={`md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-stone-200 py-2 px-6 flex items-center justify-between ${isMessageView ? 'hidden' : ''}`}>
      <Link
        to="/"
        className={`flex flex-col items-center gap-0.5 text-[10px] font-bold ${
          location.pathname === '/' ? 'text-emerald-800' : 'text-stone-400 hover:text-stone-700'
        }`}
      >
        <Home className="w-5 h-5" />
        <span>{t('nav.home')}</span>
      </Link>

      <Link
        to="/explore"
        className={`flex flex-col items-center gap-0.5 text-[10px] font-bold ${
          location.pathname === '/explore' ? 'text-emerald-800' : 'text-stone-400 hover:text-stone-700'
        }`}
      >
        <Compass className="w-5 h-5" />
        <span>{t('nav.explore')}</span>
      </Link>

      {/* Floating Sell Button */}
      <Link
        to="/sell"
        className="w-11 h-11 -mt-5 rounded-full bg-emerald-800 text-white flex items-center justify-center shadow-lg shadow-emerald-900/30 active:scale-95 transition"
        title={t('nav.sell')}
      >
        <PlusCircle className="w-6 h-6 text-emerald-200" />
      </Link>

      <Link
        to="/profile?tab=favorites"
        className={`relative flex flex-col items-center gap-0.5 text-[10px] font-bold ${
          location.search.includes('favorites') ? 'text-emerald-800' : 'text-stone-400 hover:text-stone-700'
        }`}
      >
        <Heart className="w-5 h-5" />
        {favorites.length > 0 && (
          <span className="absolute -top-1 right-2 w-3.5 h-3.5 rounded-full bg-amber-600 text-white text-[9px] font-bold flex items-center justify-center">
            {favorites.length}
          </span>
        )}
        <span>{t('nav.favorites')}</span>
      </Link>

      <Link
        to="/profile"
        className={`flex flex-col items-center gap-0.5 text-[10px] font-bold ${
          location.pathname === '/profile' && !location.search.includes('favorites') ? 'text-emerald-800' : 'text-stone-400 hover:text-stone-700'
        }`}
      >
        <User className="w-5 h-5" />
        <span>{t('nav.profile')}</span>
      </Link>
    </div>
  );
}

function MainLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 pb-16 md:pb-0">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/explore" element={<ExplorePage />} />
          <Route path="/product/:id" element={<ProductDetailPage />} />
          <Route path="/sell" element={<SellItemPage />} />
          <Route path="/exchange" element={<ExchangeHubPage />} />
          <Route path="/messages" element={<MessagesPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/how-it-works" element={<HowItWorksPage />} />
        </Routes>
      </main>
      <Footer />
      <MobileBottomNav />
      <ToastNotification />
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <MarketplaceProvider>
          <Router>
            <MainLayout />
          </Router>
        </MarketplaceProvider>
      </AuthProvider>
    </LanguageProvider>
  );
}
