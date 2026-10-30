import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  Heart, MapPin, Clock, ArrowRightLeft, ShieldCheck, 
  MessageSquare, DollarSign, Share2, Star,
  CheckCircle2, Phone, Calendar, ChevronRight
} from 'lucide-react';
import { useMarketplace } from '../context/MarketplaceContext';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { getConditionStyle } from '../utils/formatters';
import ExchangeProposalModal from '../components/marketplace/ExchangeProposalModal';
import PurchaseInquiryModal from '../components/marketplace/PurchaseInquiryModal';
import ProductCard from '../components/marketplace/ProductCard';

export default function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { listings, isFavorite, toggleFavorite, startConversation } = useMarketplace();
  const { user } = useAuth();
  const { t, formatCurrency, getLocalizedTitle, getLocalizedCategory, getLocalizedRegion, getLocalizedCondition, formatDate } = useLanguage();

  const item = listings.find(i => String(i.id) === String(id));
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isExchangeModalOpen, setIsExchangeModalOpen] = useState(false);
  const [isInquiryModalOpen, setIsInquiryModalOpen] = useState(false);
  const [showPhone, setShowPhone] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    setActiveImageIndex(0);
  }, [id]);

  if (!item) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-serif font-bold text-charcoal-900">{t('product.notFoundTitle')}</h2>
        <p className="text-stone-500 text-sm">{t('product.notFoundDesc')}</p>
        <Link to="/explore" className="inline-block px-6 py-2.5 rounded-full bg-emerald-800 text-white text-xs font-semibold">
          {t('product.backToCatalog')}
        </Link>
      </div>
    );
  }

  const favorited = isFavorite(item.id);
  const conditionMeta = getConditionStyle(item.condition);
  const localizedTitle = getLocalizedTitle(item);
  const localizedCategory = getLocalizedCategory(item.category);
  const localizedCondition = getLocalizedCondition(item.condition);
  const localizedRegion = getLocalizedRegion(item.location?.regionId) || item.location?.regionName;
  const images = item.images && item.images.length > 0 ? item.images : ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80'];

  // Other products from same seller
  const sellerOtherItems = listings.filter(i => i.sellerId === item.sellerId && i.id !== item.id).slice(0, 2);

  // Related products in same category
  const relatedItems = listings.filter(i => i.category === item.category && i.id !== item.id).slice(0, 4);

  const handleDirectChat = () => {
    startConversation(item.seller, item, `Assalomu alaykum! "${localizedTitle}" buyumi bo‘yicha murojaat qilyapman.`);
    navigate('/messages');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: localizedTitle,
        text: `YanaBor: ${localizedTitle} - ${formatCurrency(item.price)}`,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert(t('common.linkCopied'));
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-xs text-stone-500">
        <Link to="/" className="hover:text-emerald-800">{t('nav.home')}</Link>
        <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
        <Link to="/explore" className="hover:text-emerald-800">{t('nav.explore')}</Link>
        <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
        <Link to={`/explore?category=${item.category}`} className="hover:text-emerald-800 capitalize">{localizedCategory}</Link>
        <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
        <span className="text-stone-800 font-medium truncate max-w-xs">{localizedTitle}</span>
      </nav>

      {/* Main Product Showcase Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* Left Column: Image Gallery */}
        <div className="lg:col-span-7 space-y-4">
          
          {/* Main Large Image */}
          <div className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-stone-100 border border-stone-200/90 shadow-card">
            <img
              src={images[activeImageIndex]}
              alt={localizedTitle}
              className="w-full h-full object-cover transition-all duration-300"
            />

            {/* Condition Pill on Top Left */}
            <div className="absolute top-4 left-4 z-10">
              <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold backdrop-blur-md shadow-sm border ${conditionMeta.bg}`}>
                <span className={`w-2 h-2 rounded-full ${conditionMeta.dot}`}></span>
                {localizedCondition} ({item.conditionScore || '9.5'}/10)
              </span>
            </div>

            {/* Top Right Action Buttons: Share & Favorite */}
            <div className="absolute top-4 right-4 z-10 flex items-center gap-2">
              <button
                onClick={handleShare}
                className="w-10 h-10 rounded-full bg-white/90 hover:bg-white text-stone-700 shadow-md backdrop-blur-md flex items-center justify-center transition"
                title={t('common.share')}
              >
                <Share2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => toggleFavorite(item.id)}
                className="w-10 h-10 rounded-full bg-white/90 hover:bg-white text-stone-700 hover:text-red-500 shadow-md backdrop-blur-md flex items-center justify-center transition active:scale-90"
                title={t('nav.favorites')}
              >
                <Heart className={`w-5 h-5 transition ${favorited ? 'fill-red-500 text-red-500 scale-110' : ''}`} />
              </button>
            </div>

            {/* Exchange Badge on Image Bottom */}
            {item.isExchangeable && (
              <div className="absolute bottom-4 left-4 z-10">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-emerald-950/90 text-emerald-300 backdrop-blur-md shadow-md border border-emerald-700/50">
                  <ArrowRightLeft className="w-3.5 h-3.5 text-emerald-400" />
                  {t('product.exchangeAvailable')}
                </span>
              </div>
            )}
          </div>

          {/* Thumbnails Row */}
          {images.length > 1 && (
            <div className="flex items-center gap-3 overflow-x-auto pb-2">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`relative w-20 h-20 rounded-2xl overflow-hidden flex-shrink-0 border-2 transition ${
                    activeImageIndex === idx
                      ? 'border-emerald-700 shadow-md scale-105'
                      : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}

          {/* Detailed Description Section */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/90 shadow-soft space-y-4">
            <h3 className="font-serif text-xl font-bold text-charcoal-900">
              {t('product.aboutItem')}
            </h3>
            <p className="text-stone-700 text-sm leading-relaxed whitespace-pre-line">
              {item.description}
            </p>

            {/* Obmen / Exchange Details Box */}
            {item.isExchangeable && (
              <div className="mt-4 p-4 rounded-2xl bg-emerald-50 border border-emerald-200/80 space-y-1.5">
                <div className="flex items-center gap-2 text-emerald-900 font-bold text-xs uppercase tracking-wider">
                  <ArrowRightLeft className="w-4 h-4 text-emerald-700" />
                  <span>{t('product.exchangePreference')}</span>
                </div>
                <p className="text-xs text-emerald-950 font-medium">
                  {item.exchangePreferences || t('product.exchangeAvailable')}
                </p>
              </div>
            )}

            {/* Quick Specs / Attributes Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-4 border-t border-stone-100 text-xs">
              <div className="p-3 rounded-xl bg-stone-50 border border-stone-100">
                <span className="text-stone-400 block mb-0.5">{t('product.condition')}</span>
                <span className="font-semibold text-stone-800">{localizedCondition}</span>
              </div>
              <div className="p-3 rounded-xl bg-stone-50 border border-stone-100">
                <span className="text-stone-400 block mb-0.5">{t('profile.joined')}</span>
                <span className="font-semibold text-stone-800">{formatDate(item.createdAt)}</span>
              </div>
              <div className="p-3 rounded-xl bg-stone-50 border border-stone-100">
                <span className="text-stone-400 block mb-0.5">{t('product.pickupWindow')}</span>
                <span className="font-semibold text-stone-800">{item.pickupWindow || '—'}</span>
              </div>
            </div>
          </div>

        </div>

        {/* Right Column: Pricing, CTAs, and Seller Card */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Main Action Box */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/90 shadow-soft space-y-6">
            
            {/* Header info */}
            <div>
              <div className="flex items-center justify-between text-xs text-stone-500 mb-2">
                <span className="uppercase font-bold tracking-wider text-emerald-800">{localizedCategory}</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" /> {item.pickupWindow || '—'}
                </span>
              </div>

              <h1 className="font-serif text-2xl sm:text-3xl font-bold text-charcoal-900 leading-snug">
                {localizedTitle}
              </h1>

              {/* Price display with discount strike */}
              <div className="mt-4 flex items-baseline gap-3">
                <span className="text-3xl font-bold text-charcoal-900">
                  {formatCurrency(item.price)}
                </span>
                {item.originalPrice && (
                  <span className="text-sm text-stone-400 line-through">
                    {formatCurrency(item.originalPrice)}
                  </span>
                )}
              </div>
            </div>

            {/* Location Display */}
            <div className="p-3.5 rounded-2xl bg-cream-50 border border-stone-200/80 flex items-start gap-3 text-xs">
              <MapPin className="w-4 h-4 text-emerald-700 mt-0.5 flex-shrink-0" />
              <div>
                <span className="font-bold text-charcoal-900">
                  {localizedRegion}
                  {item.location?.district ? `, ${item.location.district}` : ''}
                </span>
                {item.location?.addressHint && (
                  <p className="text-stone-500 mt-0.5">
                    {t('product.addressHint')} {item.location.addressHint}
                  </p>
                )}
              </div>
            </div>

            {/* Primary Action Buttons */}
            <div className="space-y-3 pt-2">
              
              {/* Contact Seller via Chat */}
              <button
                onClick={handleDirectChat}
                className="w-full py-3.5 rounded-2xl bg-emerald-800 hover:bg-emerald-900 active:bg-emerald-950 text-white font-bold text-sm shadow-md shadow-emerald-900/15 transition flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-4 h-4 text-emerald-300" />
                <span>{t('product.contactSeller')}</span>
              </button>

              {/* Make an Offer Button */}
              <button
                onClick={() => setIsInquiryModalOpen(true)}
                className="w-full py-3.5 rounded-2xl bg-[#F6F3EB] hover:bg-[#EFEAE0] text-charcoal-900 font-semibold text-sm border border-stone-300 transition flex items-center justify-center gap-2"
              >
                <DollarSign className="w-4 h-4 text-amber-700" />
                <span>{t('product.makeOffer')}</span>
              </button>

              {/* Propose Exchange Button */}
              {item.isExchangeable && (
                <button
                  onClick={() => setIsExchangeModalOpen(true)}
                  className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-emerald-900 to-teal-950 hover:from-emerald-950 hover:to-black text-emerald-200 font-bold text-sm border border-emerald-700/60 shadow-sm transition flex items-center justify-center gap-2"
                >
                  <ArrowRightLeft className="w-4 h-4 text-emerald-400" />
                  <span>{t('product.proposeExchange')}</span>
                </button>
              )}
            </div>

            {/* Show Phone Toggle */}
            <div className="pt-2">
              {showPhone ? (
                <div className="p-3 rounded-2xl bg-stone-100 border border-stone-200 text-center">
                  <span className="text-xs text-stone-500 block">{t('product.showPhone')}:</span>
                  <a href={`tel:${item.seller?.phone}`} className="text-base font-bold text-emerald-800 tracking-wider">
                    {item.seller?.phone || '+998 90 123 45 67'}
                  </a>
                </div>
              ) : (
                <button
                  onClick={() => setShowPhone(true)}
                  className="w-full py-2.5 rounded-2xl border border-stone-200 text-xs font-semibold text-stone-600 hover:bg-stone-50 flex items-center justify-center gap-1.5 transition"
                >
                  <Phone className="w-3.5 h-3.5 text-stone-500" />
                  <span>{t('product.showPhone')}</span>
                </button>
              )}
            </div>

            {/* Safe Trade Guarantee Pill */}
            <div className="pt-2 flex items-center gap-2 text-[11px] text-stone-500 border-t border-stone-100">
              <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span>{t('product.safetyTipDesc')}</span>
            </div>

          </div>

          {/* Seller Profile Card */}
          <div className="bg-white rounded-3xl p-6 border border-stone-200/90 shadow-soft space-y-4">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={item.seller?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=240&auto=format&fit=crop&q=80'}
                  alt={item.seller?.name}
                  className="w-14 h-14 rounded-2xl object-cover border border-stone-200"
                />
                <div>
                  <h4 className="font-bold text-base text-charcoal-900 flex items-center gap-1">
                    {item.seller?.name}
                    {item.seller?.isVerified && (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" title={t('common.verifiedUser')} />
                    )}
                  </h4>
                  <div className="flex items-center gap-2 text-xs text-stone-500 mt-0.5">
                    <span className="flex items-center gap-0.5 text-amber-600 font-bold">
                      <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                      {item.seller?.rating || '5.0'}
                    </span>
                    <span>•</span>
                    <span>{item.seller?.reviewsCount || 0} {t('product.reviews')}</span>
                  </div>
                </div>
              </div>

              <span className="text-[11px] font-semibold text-stone-400">
                {item.seller?.city || 'Toshkent'}
              </span>
            </div>

            {item.seller?.bio && (
              <p className="text-xs text-stone-600 leading-relaxed border-t border-stone-100 pt-3">
                «{item.seller.bio}»
              </p>
            )}

            <div className="pt-2 flex items-center justify-between text-xs text-stone-500 border-t border-stone-100">
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-stone-400" /> {t('profile.joined')} {item.seller?.joinedDate || '2024'}
              </span>
              <span className="text-emerald-800 font-semibold">
                {t('common.viewAll')} →
              </span>
            </div>
          </div>

          {/* Other Items by Seller */}
          {sellerOtherItems.length > 0 && (
            <div className="bg-white rounded-3xl p-6 border border-stone-200/90 shadow-soft space-y-4">
              <h4 className="font-bold text-sm text-charcoal-900">
                {t('product.sellerOtherItems')}
              </h4>
              <div className="space-y-3">
                {sellerOtherItems.map(other => (
                  <Link
                    key={other.id}
                    to={`/product/${other.id}`}
                    className="flex items-center gap-3 p-2 rounded-2xl hover:bg-stone-50 transition group"
                  >
                    <img
                      src={other.images?.[0]}
                      alt={getLocalizedTitle(other)}
                      className="w-14 h-14 rounded-xl object-cover bg-stone-100 flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h5 className="text-xs font-semibold text-charcoal-900 group-hover:text-emerald-800 truncate">
                        {getLocalizedTitle(other)}
                      </h5>
                      <span className="text-xs font-bold text-emerald-900">
                        {formatCurrency(other.price)}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

        </div>

      </div>

      {/* Related Items Section */}
      {relatedItems.length > 0 && (
        <section className="pt-12 border-t border-stone-200 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-serif text-2xl font-bold text-charcoal-900">
              {t('product.similarItems')}
            </h3>
            <Link to={`/explore?category=${item.category}`} className="text-xs font-semibold text-emerald-800 hover:underline">
              {t('common.viewAll')} →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedItems.map(rel => (
              <ProductCard key={rel.id} item={rel} />
            ))}
          </div>
        </section>
      )}

      {/* Exchange Proposal Modal */}
      <ExchangeProposalModal
        targetItem={item}
        isOpen={isExchangeModalOpen}
        onClose={() => setIsExchangeModalOpen(false)}
      />

      {/* Purchase Inquiry / Counteroffer Modal */}
      <PurchaseInquiryModal
        item={item}
        isOpen={isInquiryModalOpen}
        onClose={() => setIsInquiryModalOpen(false)}
      />

    </div>
  );
}
