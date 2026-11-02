import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { X, ArrowRightLeft, Check, AlertCircle, PlusCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useMarketplace } from '../../context/MarketplaceContext';
import { useLanguage } from '../../context/LanguageContext';
import confetti from 'canvas-confetti';

export default function ExchangeProposalModal({ targetItem, isOpen, onClose }) {
  const { user } = useAuth();
  const { listings, sendExchangeProposal } = useMarketplace();
  const { t, formatCurrency, getLocalizedTitle } = useLanguage();

  // Find listings owned by current user
  const myItems = listings.filter(item => item.sellerId === user?.id);

  const [selectedMyItemId, setSelectedMyItemId] = useState(myItems[0]?.id || '');
  const [cashAdjustment, setCashAdjustment] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Auto-select first item when myItems becomes available
  React.useEffect(() => {
    if (!selectedMyItemId && myItems.length > 0) {
      setSelectedMyItemId(myItems[0].id);
    }
  }, [myItems, selectedMyItemId]);

  if (!isOpen || !targetItem) return null;

  const selectedMyItem = myItems.find(i => i.id === selectedMyItemId) || myItems[0];
  const targetTitle = getLocalizedTitle(targetItem);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedMyItem) {
      alert(t('exchangeModal.selectYourItem'));
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      sendExchangeProposal({
        requestedItemId: targetItem.id,
        requestedItemTitle: targetItem.title,
        requestedItemPrice: targetItem.price,
        requestedItemImage: targetItem.images?.[0],
        requestedItem: targetItem,
        targetSellerId: targetItem.sellerId,
        targetSellerName: targetItem.seller?.name || t('product.seller'),
        targetSeller: targetItem.seller,
        offeredItemId: selectedMyItem.id,
        offeredItemTitle: selectedMyItem.title,
        offeredItemPrice: selectedMyItem.price,
        offeredItemImage: selectedMyItem.images?.[0],
        cashAdjustment: cashAdjustment ? Number(cashAdjustment) : 0,
        message: message || t('exchangeModal.messagePlaceholder')
      });

      setIsSubmitting(false);
      setIsSuccess(true);
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 }
      });

      setTimeout(() => {
        setIsSuccess(false);
        onClose();
      }, 2200);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-stone-200 relative overflow-hidden">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {isSuccess ? (
          <div className="text-center py-10 space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
              <Check className="w-8 h-8 stroke-[3]" />
            </div>
            <h3 className="text-2xl font-bold font-serif text-charcoal-900">
              {t('exchangeModal.successTitle')}
            </h3>
            <p className="text-sm text-stone-600 max-w-sm mx-auto">
              {t('exchangeModal.successDesc')}
            </p>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="p-2 rounded-xl bg-emerald-50 text-emerald-700">
                <ArrowRightLeft className="w-5 h-5" />
              </span>
              <div>
                <h3 className="text-xl font-bold font-serif text-charcoal-900">
                  {t('exchangeModal.title')}
                </h3>
                <p className="text-xs text-stone-500">
                  {t('exchangeModal.requestedItem')}
                </p>
              </div>
            </div>

            {/* Target Item Summary */}
            <div className="bg-[#FAF8F5] p-3 rounded-2xl border border-stone-200 my-4 flex items-center gap-3">
              <img
                src={targetItem.images?.[0]}
                alt={targetTitle}
                className="w-14 h-14 rounded-xl object-cover bg-stone-200"
              />
              <div className="flex-1 min-w-0">
                <span className="text-[10px] uppercase font-bold text-emerald-800">
                  {t('exchangeModal.requestedItem')}:
                </span>
                <h4 className="text-sm font-semibold text-charcoal-900 truncate">{targetTitle}</h4>
                <p className="text-xs font-bold text-stone-900">{formatCurrency(targetItem.price)}</p>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Select My Item */}
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                  {t('exchangeModal.selectYourItem')}
                </label>
                {myItems.length > 0 ? (
                  <select
                    value={selectedMyItemId}
                    onChange={(e) => setSelectedMyItemId(e.target.value)}
                    className="w-full bg-[#FAF8F5] hover:bg-white focus:bg-white border border-stone-200 hover:border-stone-300 focus:border-emerald-700 focus:ring-4 focus:ring-emerald-700/10 rounded-xl px-3.5 py-2.5 text-sm text-stone-900 outline-none transition-all cursor-pointer"
                  >
                    {myItems.map(item => (
                      <option key={item.id} value={item.id}>
                        {getLocalizedTitle(item)} ({formatCurrency(item.price)})
                      </option>
                    ))}
                  </select>
                ) : (
                  <div className="p-4 bg-amber-50/80 border border-amber-200/80 rounded-2xl text-xs text-amber-950 flex flex-col gap-2.5">
                    <div className="flex items-start gap-2">
                      <AlertCircle className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
                      <span>{t('exchangeModal.noOwnItems')}</span>
                    </div>
                    <Link
                      to="/sell"
                      onClick={onClose}
                      className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-semibold text-xs transition shadow-sm w-fit"
                    >
                      <PlusCircle className="w-3.5 h-3.5" />
                      <span>{t('nav.sell')}</span>
                    </Link>
                  </div>
                )}
              </div>

              {/* Extra Cash Difference */}
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                  {t('exchangeModal.cashAdjustment')}:
                </label>
                <input
                  type="number"
                  placeholder={t('exchangeModal.cashAdjustmentPlaceholder')}
                  value={cashAdjustment}
                  onChange={(e) => setCashAdjustment(e.target.value)}
                  className="w-full bg-[#FAF8F5] hover:bg-white focus:bg-white border border-stone-200 hover:border-stone-300 focus:border-emerald-700 focus:ring-4 focus:ring-emerald-700/10 rounded-xl px-3.5 py-2.5 text-sm text-stone-900 outline-none transition-all"
                />
                <p className="text-[11px] text-stone-400 mt-1">
                  {t('exchangeModal.cashAdjustmentHint')}
                </p>
              </div>

              {/* Message to Seller */}
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                  {t('exchangeModal.message')}:
                </label>
                <textarea
                  rows={3}
                  placeholder={t('exchangeModal.messagePlaceholder')}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full bg-[#FAF8F5] hover:bg-white focus:bg-white border border-stone-200 hover:border-stone-300 focus:border-emerald-700 focus:ring-4 focus:ring-emerald-700/10 rounded-xl px-3.5 py-2.5 text-sm text-stone-900 outline-none transition-all resize-none"
                />
              </div>

              {/* Submit Buttons */}
              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2.5 rounded-xl border border-stone-200 text-stone-700 text-xs font-semibold hover:bg-stone-50 transition"
                >
                  {t('common.cancel')}
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting || myItems.length === 0}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-800 to-emerald-700 hover:from-emerald-700 hover:to-emerald-600 disabled:opacity-50 text-white text-xs font-semibold shadow-md shadow-emerald-900/15 active:scale-[0.99] transition-all flex items-center gap-1.5 cursor-pointer disabled:cursor-not-allowed"
                >
                  {isSubmitting ? t('exchangeModal.submitting') : t('exchangeModal.submitProposal')}
                </button>
              </div>
            </form>
          </div>
        )}

      </div>
    </div>
  );
}
