import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { 
  User, Tag, Heart, ArrowRightLeft, MessageSquare, 
  Trash2, Edit, Star, MapPin, CheckCircle, 
  PlusCircle, Settings, LogOut, RefreshCw
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useMarketplace } from '../context/MarketplaceContext';
import { useLanguage } from '../context/LanguageContext';
import ProductCard from '../components/marketplace/ProductCard';

export default function ProfilePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { user, logout } = useAuth();
  const { 
    listings, favorites, proposals, inquiries, 
    deleteListing, updateProposalStatus, resetAllData 
  } = useMarketplace();
  const { t, formatCurrency, getLocalizedTitle, getLocalizedRegion, formatDate } = useLanguage();

  const [activeTab, setActiveTab] = useState(searchParams.get('tab') || 'listings');

  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab) setActiveTab(tab);
  }, [searchParams]);

  const handleTabChange = (tabKey) => {
    setActiveTab(tabKey);
    setSearchParams({ tab: tabKey });
  };

  // User's own listings
  const myListings = listings.filter(i => i.sellerId === user?.id);

  // User's favorited listings
  const myFavoriteItems = listings.filter(i => favorites.includes(String(i.id)));

  // User's exchange proposals (both proposed by me or targeted at me)
  const myProposals = proposals.filter(p => p.proposerId === user?.id || p.targetSellerId === user?.id);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Profile Header Card */}
      <div className="bg-white rounded-[2.5rem] p-6 sm:p-10 border border-stone-200/90 shadow-soft">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          
          <div className="flex items-center gap-5">
            <img
              src={user?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=240&auto=format&fit=crop&q=80'}
              alt={user?.name}
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl object-cover border-2 border-emerald-700/30 shadow-md"
            />
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h1 className="font-serif text-2xl sm:text-3xl font-bold text-charcoal-900">
                  {user?.name}
                </h1>
                {user?.isVerified && (
                  <CheckCircle className="w-5 h-5 text-emerald-600" title={t('common.verifiedUser')} />
                )}
              </div>

              <div className="flex items-center gap-3 text-xs text-stone-500 flex-wrap">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-stone-400" />
                  {user?.city || 'Toshkent'}{user?.district ? `, ${user.district}` : ''}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1 text-amber-600 font-bold">
                  <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                  {user?.rating || '5.0'} ({user?.reviewsCount || 0} {t('product.reviews')})
                </span>
                <span>•</span>
                <span>{t('profile.joined')} {user?.joinedDate || '2024'}</span>
              </div>

              {user?.bio && (
                <p className="text-xs text-stone-600 max-w-xl pt-1">
                  {user.bio}
                </p>
              )}
            </div>
          </div>

          {/* Quick Header Actions */}
          <div className="flex items-center gap-3 w-full md:w-auto">
            <Link
              to="/sell"
              className="flex-1 md:flex-none px-5 py-3 rounded-2xl bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold shadow-md transition flex items-center justify-center gap-2"
            >
              <PlusCircle className="w-4 h-4 text-emerald-300" />
              <span>{t('profile.newListing')}</span>
            </Link>

            <button
              onClick={logout}
              className="p-3 rounded-2xl border border-stone-200 text-stone-600 hover:text-red-600 hover:bg-red-50 transition"
              title={t('nav.logout')}
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>

        </div>

        {/* Profile Statistics Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-8 mt-8 border-t border-stone-100 text-center">
          <div className="p-3 rounded-2xl bg-[#FAF8F5]">
            <span className="text-2xl font-bold text-charcoal-900 block">{myListings.length}</span>
            <span className="text-xs text-stone-500">{t('home.activeAdsLabel')}</span>
          </div>
          <div className="p-3 rounded-2xl bg-[#FAF8F5]">
            <span className="text-2xl font-bold text-emerald-800 block">{user?.completedExchanges || 0}</span>
            <span className="text-xs text-stone-500">{t('home.exchangeSuccessLabel')}</span>
          </div>
          <div className="p-3 rounded-2xl bg-[#FAF8F5]">
            <span className="text-2xl font-bold text-amber-700 block">{favorites.length}</span>
            <span className="text-xs text-stone-500">{t('nav.favorites')}</span>
          </div>
          <div className="p-3 rounded-2xl bg-[#FAF8F5]">
            <span className="text-2xl font-bold text-teal-800 block">{proposals.length}</span>
            <span className="text-xs text-stone-500">{t('nav.exchangeOffers')}</span>
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex items-center gap-2 border-b border-stone-200 overflow-x-auto no-scrollbar">
        {[
          { key: 'listings', label: t('profile.tabListings'), count: myListings.length, icon: Tag },
          { key: 'favorites', label: t('profile.tabFavorites'), count: myFavoriteItems.length, icon: Heart },
          { key: 'exchanges', label: t('profile.tabExchanges'), count: myProposals.length, icon: ArrowRightLeft },
          { key: 'inquiries', label: t('inquiryModal.title'), count: inquiries.length, icon: MessageSquare },
          { key: 'settings', label: t('profile.tabSettings'), icon: Settings }
        ].map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => handleTabChange(tab.key)}
              className={`pb-3.5 px-4 text-xs font-bold transition flex items-center gap-2 border-b-2 whitespace-nowrap ${
                isActive
                  ? 'border-emerald-800 text-emerald-900'
                  : 'border-transparent text-stone-500 hover:text-stone-800'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
              {tab.count !== undefined && (
                <span className={`px-2 py-0.5 rounded-full text-[10px] ${
                  isActive ? 'bg-emerald-100 text-emerald-900' : 'bg-stone-100 text-stone-500'
                }`}>
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Tab 1: My Listings */}
      {activeTab === 'listings' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-lg text-charcoal-900">
              {t('profile.tabListings')} ({myListings.length})
            </h2>
            <Link
              to="/sell"
              className="text-xs font-bold text-emerald-800 hover:underline flex items-center gap-1"
            >
              + {t('profile.newListing')}
            </Link>
          </div>

          {myListings.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {myListings.map(item => (
                <div
                  key={item.id}
                  className="bg-white rounded-3xl p-4 border border-stone-200/90 shadow-soft flex items-center gap-4"
                >
                  <img
                    src={item.images?.[0]}
                    alt={getLocalizedTitle(item)}
                    className="w-24 h-24 rounded-2xl object-cover bg-stone-100 flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 block">
                      {item.category}
                    </span>
                    <Link to={`/product/${item.id}`} className="font-bold text-sm text-charcoal-900 hover:text-emerald-800 truncate block">
                      {getLocalizedTitle(item)}
                    </Link>
                    <div className="text-sm font-bold text-stone-900 mt-1">
                      {formatCurrency(item.price)}
                    </div>
                    <div className="text-[11px] text-stone-400 mt-0.5">
                      {item.views || 1} {t('product.views')} • {item.favoritesCount || 0} {t('nav.favorites')}
                    </div>

                    <div className="flex items-center gap-2 mt-2">
                      <Link
                        to={`/product/${item.id}`}
                        className="px-3 py-1 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold"
                      >
                        {t('product.viewAction')}
                      </Link>
                      <button
                        onClick={() => {
                          if (confirm(`"${getLocalizedTitle(item)}" — ${t('common.delete')}?`)) {
                            deleteListing(item.id);
                          }
                        }}
                        className="px-3 py-1 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 text-xs font-semibold flex items-center gap-1"
                      >
                        <Trash2 className="w-3 h-3" />
                        {t('common.delete')}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-3xl p-12 text-center border border-stone-200 space-y-3">
              <Tag className="w-12 h-12 text-stone-300 mx-auto" />
              <h3 className="font-bold text-base text-charcoal-900">{t('profile.noListings')}</h3>
              <p className="text-xs text-stone-500 max-w-sm mx-auto">
                {t('profile.noListingsDesc')}
              </p>
              <Link
                to="/sell"
                className="inline-block px-6 py-2.5 rounded-full bg-emerald-800 text-white text-xs font-bold shadow-md"
              >
                {t('profile.postFirstAd')}
              </Link>
            </div>
          )}
        </div>
      )}

      {/* Tab 2: My Favorites */}
      {activeTab === 'favorites' && (
        <div className="space-y-4">
          <h2 className="font-bold text-lg text-charcoal-900">
            {t('profile.tabFavorites')} ({myFavoriteItems.length})
          </h2>

          {myFavoriteItems.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {myFavoriteItems.map(item => (
                <ProductCard key={item.id} item={item} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-3xl p-12 text-center border border-stone-200 space-y-3">
              <Heart className="w-12 h-12 text-stone-300 mx-auto" />
              <h3 className="font-bold text-base text-charcoal-900">{t('profile.noFavorites')}</h3>
              <p className="text-xs text-stone-500">
                {t('profile.noFavoritesDesc')}
              </p>
              <Link to="/explore" className="inline-block px-6 py-2.5 rounded-full bg-emerald-800 text-white text-xs font-bold">
                {t('profile.exploreCatalog')}
              </Link>
            </div>
          )}
        </div>
      )}

      {/* Tab 3: Exchange Proposals */}
      {activeTab === 'exchanges' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-lg text-charcoal-900">
              {t('profile.tabExchanges')}
            </h2>
            <span className="text-xs text-stone-500">{t('profile.status')} {t('common.pending')} / {t('common.accepted')} / {t('common.rejected')}</span>
          </div>

          {myProposals.length > 0 ? (
            <div className="space-y-4">
              {myProposals.map(prop => {
                const isMyOffer = prop.proposerId === user?.id;
                return (
                  <div
                    key={prop.id}
                    className="bg-white rounded-3xl p-6 border border-stone-200/90 shadow-soft space-y-4"
                  >
                    <div className="flex items-center justify-between border-b border-stone-100 pb-3">
                      <div className="flex items-center gap-2">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                          prop.status === 'Accepted'
                            ? 'bg-emerald-100 text-emerald-800'
                            : prop.status === 'Declined'
                            ? 'bg-red-100 text-red-800'
                            : 'bg-amber-100 text-amber-900'
                        }`}>
                          {prop.status === 'Accepted' ? `✓ ${t('common.accepted')}` : prop.status === 'Declined' ? `✗ ${t('common.rejected')}` : `⏳ ${t('common.pending')}`}
                        </span>
                        <span className="text-xs text-stone-400">
                          {formatDate(prop.createdAt)}
                        </span>
                      </div>
                      <span className="text-xs text-stone-500">
                        {isMyOffer ? t('profile.outgoingProposals') : t('profile.incomingProposals')}
                      </span>
                    </div>

                    {/* Both items side-by-side */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
                      {/* Offered item */}
                      <div className="p-3 rounded-2xl bg-[#FAF8F5] border border-stone-200 flex items-center gap-3">
                        <img src={prop.offeredItemImage} alt="" className="w-14 h-14 rounded-xl object-cover bg-stone-200" />
                        <div className="min-w-0">
                          <span className="text-[10px] font-bold uppercase text-emerald-800">{t('profile.offeredItem')}</span>
                          <h4 className="text-xs font-bold text-charcoal-900 truncate">{prop.offeredItemTitle}</h4>
                          <span className="text-xs font-bold text-stone-900">{formatCurrency(prop.offeredItemPrice)}</span>
                        </div>
                      </div>

                      {/* Requested item */}
                      <div className="p-3 rounded-2xl bg-[#FAF8F5] border border-stone-200 flex items-center gap-3">
                        <img src={prop.requestedItemImage} alt="" className="w-14 h-14 rounded-xl object-cover bg-stone-200" />
                        <div className="min-w-0">
                          <span className="text-[10px] font-bold uppercase text-emerald-800">{t('profile.requestedItem')}</span>
                          <h4 className="text-xs font-bold text-charcoal-900 truncate">{prop.requestedItemTitle}</h4>
                          <span className="text-xs font-bold text-stone-900">{formatCurrency(prop.requestedItemPrice)}</span>
                        </div>
                      </div>
                    </div>

                    {prop.message && (
                      <p className="text-xs text-stone-600 bg-stone-50 p-3 rounded-xl border border-stone-100 italic">
                        «{prop.message}»
                      </p>
                    )}

                    {/* Action buttons if targeted at current user */}
                    <div className="flex items-center justify-end gap-2 pt-1">
                      {prop.status === 'Pending' && !isMyOffer && (
                        <>
                          <button
                            onClick={() => updateProposalStatus(prop.id, 'Declined')}
                            className="px-4 py-2 rounded-xl border border-stone-300 text-stone-700 text-xs font-semibold hover:bg-stone-50"
                          >
                            {t('profile.reject')}
                          </button>
                          <button
                            onClick={() => updateProposalStatus(prop.id, 'Accepted')}
                            className="px-5 py-2 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold shadow-sm"
                          >
                            {t('profile.accept')}
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="bg-white rounded-3xl p-12 text-center border border-stone-200 space-y-2">
              <ArrowRightLeft className="w-12 h-12 text-stone-300 mx-auto" />
              <h3 className="font-bold text-base text-charcoal-900">{t('profile.noExchanges')}</h3>
              <p className="text-xs text-stone-500">
                {t('exchangeHub.subtitle')}
              </p>
            </div>
          )}
        </div>
      )}

      {/* Tab 4: Inquiries */}
      {activeTab === 'inquiries' && (
        <div className="space-y-4">
          <h2 className="font-bold text-lg text-charcoal-900">
            {t('inquiryModal.title')}
          </h2>

          {inquiries.length > 0 ? (
            <div className="space-y-3">
              {inquiries.map(inq => (
                <div key={inq.id} className="bg-white rounded-3xl p-5 border border-stone-200/90 shadow-soft flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <img src={inq.itemImage} alt="" className="w-14 h-14 rounded-2xl object-cover bg-stone-100" />
                    <div>
                      <h4 className="text-sm font-bold text-charcoal-900">{inq.itemTitle}</h4>
                      <p className="text-xs text-stone-500">
                        {t('inquiryModal.offerPrice')}: <b className="text-emerald-800">{formatCurrency(inq.offerPrice)}</b>
                      </p>
                      <p className="text-xs text-stone-400 mt-0.5">{inq.message}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Link
                      to="/messages"
                      className="px-4 py-2 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold"
                    >
                      {t('nav.myMessages')}
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-3xl p-12 text-center border border-stone-200 text-xs text-stone-500">
              {t('messages.noChats')}
            </div>
          )}
        </div>
      )}

      {/* Tab 5: Account Settings */}
      {activeTab === 'settings' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/90 shadow-soft space-y-6 max-w-2xl">
          <h3 className="font-serif text-2xl font-bold text-charcoal-900">
            {t('profile.settingsTitle')}
          </h3>

          <div className="space-y-4 text-xs">
            <div>
              <label className="block font-bold text-stone-700 mb-1">{t('profile.nameLabel')}:</label>
              <input type="text" defaultValue={user?.name} className="w-full bg-[#FAF8F5] border border-stone-300 rounded-xl p-3 text-sm" />
            </div>
            <div>
              <label className="block font-bold text-stone-700 mb-1">{t('profile.phoneLabel')}:</label>
              <input type="text" defaultValue={user?.phone} className="w-full bg-[#FAF8F5] border border-stone-300 rounded-xl p-3 text-sm" />
            </div>
            <div>
              <label className="block font-bold text-stone-700 mb-1">{t('profile.cityLabel')}:</label>
              <input type="text" defaultValue={user?.city} className="w-full bg-[#FAF8F5] border border-stone-300 rounded-xl p-3 text-sm" />
            </div>
            <div>
              <label className="block font-bold text-stone-700 mb-1">{t('profile.bioLabel')}:</label>
              <textarea defaultValue={user?.bio} rows={3} className="w-full bg-[#FAF8F5] border border-stone-300 rounded-xl p-3 text-sm" />
            </div>

            <div className="pt-2 flex items-center justify-between">
              <button
                type="button"
                onClick={resetAllData}
                className="text-red-600 hover:underline flex items-center gap-1 font-semibold"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                {t('profile.resetAllData')}
              </button>
              <button
                type="button"
                onClick={() => alert(t('common.success'))}
                className="px-6 py-2.5 rounded-xl bg-emerald-800 text-white font-bold"
              >
                {t('profile.saveChanges')}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
