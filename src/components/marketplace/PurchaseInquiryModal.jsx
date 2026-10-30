import React, { useState } from 'react';
import { X, Send, Check, Phone, DollarSign } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useMarketplace } from '../../context/MarketplaceContext';
import { useLanguage } from '../../context/LanguageContext';

export default function PurchaseInquiryModal({ item, isOpen, onClose }) {
  const { user } = useAuth();
  const { sendInquiry } = useMarketplace();
  const { t, formatCurrency, getLocalizedTitle } = useLanguage();

  const [offerPrice, setOfferPrice] = useState(item?.price || '');
  const [phone, setPhone] = useState(user?.phone || '+998 90 ');
  const [message, setMessage] = useState(
    'Assalomu alaykum! Ushbu buyumni xarid qilish istagidaman. Qachon va qayerda uchrashishimiz mumkin?'
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen || !item) return null;

  const localizedTitle = getLocalizedTitle(item);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      sendInquiry({
        itemId: item.id,
        itemTitle: item.title,
        itemPrice: item.price,
        itemImage: item.images?.[0],
        item: item,
        sellerId: item.sellerId,
        sellerName: item.seller?.name || t('product.seller'),
        seller: item.seller,
        offerPrice: offerPrice ? Number(offerPrice) : item.price,
        contactPhone: phone,
        message: message
      });

      setIsSubmitting(false);
      setIsSuccess(true);

      setTimeout(() => {
        setIsSuccess(false);
        onClose();
      }, 2000);
    }, 500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-stone-200 relative overflow-hidden">
        
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {isSuccess ? (
          <div className="text-center py-8 space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
              <Check className="w-8 h-8 stroke-[3]" />
            </div>
            <h3 className="text-2xl font-bold font-serif text-charcoal-900">
              {t('inquiryModal.successTitle')}
            </h3>
            <p className="text-sm text-stone-600">
              {t('inquiryModal.successDesc')}
            </p>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="p-2 rounded-xl bg-emerald-50 text-emerald-800">
                <Send className="w-5 h-5" />
              </span>
              <div>
                <h3 className="text-xl font-bold font-serif text-charcoal-900">
                  {t('inquiryModal.title')}
                </h3>
                <p className="text-xs text-stone-500">
                  {t('product.contactSeller')}
                </p>
              </div>
            </div>

            {/* Target Item Pill */}
            <div className="bg-[#FAF8F5] p-3 rounded-2xl border border-stone-200 my-4 flex items-center gap-3">
              <img
                src={item.images?.[0]}
                alt={localizedTitle}
                className="w-12 h-12 rounded-xl object-cover bg-stone-200"
              />
              <div className="flex-1 min-w-0">
                <h4 className="text-xs font-semibold text-charcoal-900 truncate">{localizedTitle}</h4>
                <p className="text-xs text-stone-500">{t('sell.priceLabel')}: <b className="text-stone-900">{formatCurrency(item.price)}</b></p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  {t('inquiryModal.offerPrice')}:
                </label>
                <div className="relative">
                  <input
                    type="number"
                    required
                    value={offerPrice}
                    onChange={(e) => setOfferPrice(e.target.value)}
                    className="w-full bg-white border border-stone-300 rounded-xl px-3.5 py-2.5 pl-9 text-sm text-charcoal-900 focus:outline-none focus:ring-2 focus:ring-emerald-600 font-semibold"
                  />
                  <DollarSign className="w-4 h-4 text-stone-400 absolute left-3 top-3 pointer-events-none" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  {t('inquiryModal.phone')}:
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-white border border-stone-300 rounded-xl px-3.5 py-2.5 pl-9 text-sm text-charcoal-900 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  />
                  <Phone className="w-4 h-4 text-stone-400 absolute left-3 top-3 pointer-events-none" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  {t('inquiryModal.message')}:
                </label>
                <textarea
                  rows={3}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full bg-white border border-stone-300 rounded-xl px-3.5 py-2.5 text-sm text-charcoal-900 focus:outline-none focus:ring-2 focus:ring-emerald-600 resize-none"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2.5 rounded-xl border border-stone-300 text-stone-700 text-xs font-semibold hover:bg-stone-50 transition"
                >
                  {t('common.cancel')}
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 disabled:opacity-50 text-white text-xs font-semibold shadow-md transition"
                >
                  {isSubmitting ? t('inquiryModal.submitting') : t('inquiryModal.submitInquiry')}
                </button>
              </div>
            </form>
          </div>
        )}

      </div>
    </div>
  );
}
