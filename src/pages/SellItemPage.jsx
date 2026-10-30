import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Camera, Upload, X, ArrowRight, ArrowLeft, Check, 
  Sparkles, DollarSign, MapPin, ArrowRightLeft, ShieldCheck, Clock 
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useMarketplace } from '../context/MarketplaceContext';
import { useLanguage } from '../context/LanguageContext';
import { CATEGORIES } from '../data/categories';
import { UZBEKISTAN_REGIONS } from '../data/regions';
import confetti from 'canvas-confetti';

export default function SellItemPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { createListing } = useMarketplace();
  const { t, formatCurrency, getLocalizedCategory, getLocalizedRegion, getLocalizedCondition } = useLanguage();

  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form Fields State
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('electronics');
  const [price, setPrice] = useState('');
  const [originalPrice, setOriginalPrice] = useState('');
  const [condition, setCondition] = useState('Yangidek');
  const [conditionScore, setConditionScore] = useState(9.5);
  const [description, setDescription] = useState('');
  const [images, setImages] = useState([
    'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1000&auto=format&fit=crop&q=80'
  ]);
  const [imageUrlInput, setImageUrlInput] = useState('');
  const [isExchangeable, setIsExchangeable] = useState(false);
  const [exchangePreferences, setExchangePreferences] = useState('');
  const [regionId, setRegionId] = useState('toshkent-shahar');
  const [district, setDistrict] = useState('Chilonzor tumani');
  const [addressHint, setAddressHint] = useState('');
  const [pickupWindow, setPickupWindow] = useState('Har kuni 18:00 – 21:00');
  const [contactPreference, setContactPreference] = useState('YanaBor chat yoki Telegram');

  const selectedRegion = UZBEKISTAN_REGIONS.find(r => r.id === regionId);

  // Quick preset sample photos for easy demonstration
  const samplePresets = [
    { label: 'Quloqchin', url: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800&auto=format&fit=crop&q=80' },
    { label: 'Smartfon', url: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&auto=format&fit=crop&q=80' },
    { label: 'Kreslo', url: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&auto=format&fit=crop&q=80' },
    { label: 'Soat', url: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=800&auto=format&fit=crop&q=80' },
    { label: 'Krossovka', url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&auto=format&fit=crop&q=80' }
  ];

  const handleAddImageUrl = (urlToAdd) => {
    const target = urlToAdd || imageUrlInput;
    if (!target) return;
    setImages(prev => [...prev, target]);
    setImageUrlInput('');
  };

  const handleRemoveImage = (index) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImages(prev => [...prev, reader.result]);
      };
      reader.readAsDataURL(file);
    }
  };

  // Step Validation
  const canProceedStep1 = title.trim().length >= 4 && category;
  const canProceedStep2 = price && Number(price) > 0 && condition && description.trim().length >= 10;
  const canProceedStep3 = images.length > 0;
  const canProceedStep4 = regionId;

  const handleSubmit = async () => {
    setIsSubmitting(true);

    const newListingData = {
      title,
      category,
      price: Number(price),
      originalPrice: originalPrice ? Number(originalPrice) : null,
      condition,
      conditionScore: Number(conditionScore),
      description,
      images,
      isExchangeable,
      exchangePreferences: isExchangeable ? exchangePreferences : '',
      location: {
        regionId,
        regionName: selectedRegion?.name || 'Toshkent shahri',
        district,
        addressHint
      },
      pickupWindow,
      contactPreference
    };

    const created = await createListing(newListingData);
    setIsSubmitting(false);

    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.5 }
    });

    setTimeout(() => {
      navigate(`/product/${created.id}`);
    }, 1500);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Title & Multi-Step Indicator */}
      <div className="text-center space-y-3">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-100 text-emerald-900">
          <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
          {t('sell.pageTitle')}
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal-900">
          {t('sell.pageSubtitle')}
        </h1>

        {/* Step Progress Bar */}
        <div className="flex items-center justify-center gap-2 sm:gap-4 pt-4">
          {[
            { num: 1, label: t('sell.step1') },
            { num: 2, label: t('sell.step2') },
            { num: 3, label: t('sell.step3') },
            { num: 4, label: t('sell.step4') },
            { num: 5, label: t('common.active') }
          ].map(s => (
            <button
              key={s.num}
              onClick={() => {
                if (s.num < currentStep) setCurrentStep(s.num);
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition ${
                currentStep === s.num
                  ? 'bg-emerald-800 text-white shadow-md'
                  : currentStep > s.num
                  ? 'bg-emerald-100 text-emerald-900'
                  : 'bg-stone-100 text-stone-400'
              }`}
            >
              <span>{s.num}</span>
              <span className="hidden sm:inline">{s.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Step Form Box */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-stone-200/90 shadow-soft">
        
        {/* STEP 1: Basic Info & Category */}
        {currentStep === 1 && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                {t('sell.titleLabel')}
              </label>
              <input
                type="text"
                required
                placeholder={t('sell.titlePlaceholder')}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-[#FAF8F5] focus:bg-white border border-stone-300 focus:border-emerald-600 rounded-2xl px-4 py-3 text-sm text-charcoal-900 focus:outline-none transition"
              />
              <span className="text-[11px] text-stone-400 mt-1 block">
                {t('sell.titleHint')}
              </span>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-2">
                {t('sell.categoryLabel')}
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {CATEGORIES.map(cat => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setCategory(cat.id)}
                    className={`p-3.5 rounded-2xl border text-left transition flex flex-col justify-between ${
                      category === cat.id
                        ? 'border-emerald-700 bg-emerald-50 text-emerald-950 font-bold shadow-sm'
                        : 'border-stone-200 hover:border-stone-300 text-stone-700'
                    }`}
                  >
                    <span className="text-xs font-bold">{getLocalizedCategory(cat.id)}</span>
                    <span className="text-[10px] text-stone-400 mt-1">{cat.tags?.[0]}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-4 flex justify-end">
              <button
                type="button"
                disabled={!canProceedStep1}
                onClick={() => setCurrentStep(2)}
                className="px-7 py-3 rounded-2xl bg-emerald-800 hover:bg-emerald-900 disabled:opacity-40 text-white font-bold text-xs shadow-md transition flex items-center gap-2"
              >
                <span>{t('sell.nextStep')}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: Condition, Pricing & Exchange */}
        {currentStep === 2 && (
          <div className="space-y-6 animate-in fade-in duration-200">
            {/* Condition */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-2">
                {t('sell.conditionLabel')}
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { value: 'Yangi', label: getLocalizedCondition('Yangi') },
                  { value: 'Yangidek', label: getLocalizedCondition('Yangidek') },
                  { value: 'Yaxshi', label: getLocalizedCondition('Yaxshi') },
                  { value: 'O‘rtacha', label: getLocalizedCondition('O‘rtacha') }
                ].map(c => (
                  <button
                    key={c.value}
                    type="button"
                    onClick={() => setCondition(c.value)}
                    className={`p-3.5 rounded-2xl border text-left transition ${
                      condition === c.value
                        ? 'border-emerald-700 bg-emerald-50 text-emerald-950 font-bold shadow-sm'
                        : 'border-stone-200 hover:border-stone-300 text-stone-700'
                    }`}
                  >
                    <div className="text-xs font-bold">{c.label}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Price in UZS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                  {t('sell.priceLabel')}
                </label>
                <div className="relative">
                  <input
                    type="number"
                    required
                    placeholder={t('sell.pricePlaceholder')}
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="w-full bg-[#FAF8F5] focus:bg-white border border-stone-300 focus:border-emerald-600 rounded-2xl px-4 py-3 pl-9 text-sm text-charcoal-900 font-bold focus:outline-none transition"
                  />
                  <DollarSign className="w-4 h-4 text-stone-400 absolute left-3 top-3.5 pointer-events-none" />
                </div>
                {price && (
                  <span className="text-xs text-emerald-800 font-semibold mt-1 block">
                    {formatCurrency(price)}
                  </span>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                  {t('sell.originalPriceLabel')}
                </label>
                <input
                  type="number"
                  placeholder={t('sell.originalPricePlaceholder')}
                  value={originalPrice}
                  onChange={(e) => setOriginalPrice(e.target.value)}
                  className="w-full bg-[#FAF8F5] focus:bg-white border border-stone-300 focus:border-emerald-600 rounded-2xl px-4 py-3 text-sm text-charcoal-900 focus:outline-none transition"
                />
              </div>
            </div>

            {/* Exchange Toggle */}
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-3">
              <label className="flex items-center justify-between cursor-pointer">
                <div className="flex items-center gap-2.5">
                  <span className="p-2 rounded-xl bg-emerald-700 text-white">
                    <ArrowRightLeft className="w-4 h-4" />
                  </span>
                  <div>
                    <span className="text-xs font-bold text-emerald-950 block">
                      {t('sell.exchangeToggle')}
                    </span>
                    <span className="text-[11px] text-emerald-800">
                      {t('sell.exchangeSectionTitle')}
                    </span>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={isExchangeable}
                  onChange={(e) => setIsExchangeable(e.target.checked)}
                  className="w-5 h-5 rounded text-emerald-800 focus:ring-emerald-600 cursor-pointer"
                />
              </label>

              {isExchangeable && (
                <div className="pt-2 border-t border-emerald-200">
                  <label className="block text-xs font-semibold text-emerald-950 mb-1">
                    {t('sell.exchangePreferencesLabel')}
                  </label>
                  <input
                    type="text"
                    placeholder={t('sell.exchangePreferencesPlaceholder')}
                    value={exchangePreferences}
                    onChange={(e) => setExchangePreferences(e.target.value)}
                    className="w-full bg-white border border-emerald-300 rounded-xl px-3.5 py-2.5 text-xs text-charcoal-900 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  />
                </div>
              )}
            </div>

            {/* Description */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                {t('sell.descriptionLabel')}
              </label>
              <textarea
                rows={4}
                required
                placeholder={t('sell.descriptionPlaceholder')}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full bg-[#FAF8F5] focus:bg-white border border-stone-300 focus:border-emerald-600 rounded-2xl px-4 py-3 text-sm text-charcoal-900 focus:outline-none transition resize-none"
              />
            </div>

            <div className="pt-4 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setCurrentStep(1)}
                className="px-5 py-2.5 rounded-2xl border border-stone-300 text-stone-700 text-xs font-semibold hover:bg-stone-50"
              >
                {t('sell.prevStep')}
              </button>
              <button
                type="button"
                disabled={!canProceedStep2}
                onClick={() => setCurrentStep(3)}
                className="px-7 py-3 rounded-2xl bg-emerald-800 hover:bg-emerald-900 disabled:opacity-40 text-white font-bold text-xs shadow-md transition flex items-center gap-2"
              >
                <span>{t('sell.nextStep')}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: Photos Upload & Previews */}
        {currentStep === 3 && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
                {t('sell.photosLabel')}
              </label>
              <p className="text-xs text-stone-500 mb-3">
                {t('sell.photosHint')}
              </p>

              {/* Upload Dropzone */}
              <div className="border-2 border-dashed border-stone-300 hover:border-emerald-600 rounded-3xl p-6 text-center bg-[#FAF8F5] transition relative cursor-pointer">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
                <Camera className="w-10 h-10 text-emerald-800 mx-auto mb-2" />
                <span className="text-xs font-bold text-charcoal-900 block">
                  {t('sell.uploadFromDevice')}
                </span>
                <span className="text-[11px] text-stone-400">
                  PNG, JPG, WEBP
                </span>
              </div>
            </div>

            {/* Quick Demo Photo Presets */}
            <div>
              <span className="text-xs font-bold text-stone-600 block mb-2">
                {t('sell.quickSamples')}
              </span>
              <div className="flex flex-wrap gap-2">
                {samplePresets.map(preset => (
                  <button
                    key={preset.label}
                    type="button"
                    onClick={() => handleAddImageUrl(preset.url)}
                    className="px-3 py-1.5 rounded-full bg-stone-100 hover:bg-emerald-50 hover:text-emerald-900 text-xs font-medium border border-stone-200 transition"
                  >
                    + {preset.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Uploaded Images Grid Previews */}
            {images.length > 0 && (
              <div>
                <span className="text-xs font-bold text-stone-700 block mb-2">
                  {t('sell.photosLabel')} ({images.length}):
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {images.map((img, idx) => (
                    <div key={idx} className="relative aspect-square rounded-2xl overflow-hidden bg-stone-100 border border-stone-200 group">
                      <img src={img} alt="" className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(idx)}
                        className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/70 hover:bg-red-600 text-white flex items-center justify-center transition"
                        title={t('common.delete')}
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="pt-4 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setCurrentStep(2)}
                className="px-5 py-2.5 rounded-2xl border border-stone-300 text-stone-700 text-xs font-semibold hover:bg-stone-50"
              >
                {t('sell.prevStep')}
              </button>
              <button
                type="button"
                disabled={!canProceedStep3}
                onClick={() => setCurrentStep(4)}
                className="px-7 py-3 rounded-2xl bg-emerald-800 hover:bg-emerald-900 disabled:opacity-40 text-white font-bold text-xs shadow-md transition flex items-center gap-2"
              >
                <span>{t('sell.nextStep')}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: Location & Handover */}
        {currentStep === 4 && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                  {t('sell.regionLabel')}
                </label>
                <select
                  value={regionId}
                  onChange={(e) => {
                    setRegionId(e.target.value);
                    const reg = UZBEKISTAN_REGIONS.find(r => r.id === e.target.value);
                    if (reg?.districts?.[0]) setDistrict(reg.districts[0]);
                  }}
                  className="w-full bg-[#FAF8F5] border border-stone-300 rounded-2xl px-3.5 py-3 text-sm text-charcoal-900 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                >
                  {UZBEKISTAN_REGIONS.map(reg => (
                    <option key={reg.id} value={reg.id}>{getLocalizedRegion(reg.id)}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                  {t('sell.districtLabel')}
                </label>
                <select
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  className="w-full bg-[#FAF8F5] border border-stone-300 rounded-2xl px-3.5 py-3 text-sm text-charcoal-900 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                >
                  {selectedRegion?.districts?.map(d => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                {t('sell.addressHintLabel')}
              </label>
              <input
                type="text"
                placeholder={t('sell.addressHintPlaceholder')}
                value={addressHint}
                onChange={(e) => setAddressHint(e.target.value)}
                className="w-full bg-[#FAF8F5] border border-stone-300 rounded-2xl px-4 py-3 text-sm text-charcoal-900 focus:outline-none focus:ring-2 focus:ring-emerald-600"
              />
            </div>

            {/* Pickup window */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                {t('sell.pickupWindowLabel')}
              </label>
              <input
                type="text"
                placeholder={t('sell.pickupWindowPlaceholder')}
                value={pickupWindow}
                onChange={(e) => setPickupWindow(e.target.value)}
                className="w-full bg-[#FAF8F5] border border-stone-300 rounded-2xl px-4 py-3 text-sm text-charcoal-900 focus:outline-none focus:ring-2 focus:ring-emerald-600"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                {t('sell.contactPrefLabel')}
              </label>
              <input
                type="text"
                placeholder={t('sell.contactPrefPlaceholder')}
                value={contactPreference}
                onChange={(e) => setContactPreference(e.target.value)}
                className="w-full bg-[#FAF8F5] border border-stone-300 rounded-2xl px-4 py-3 text-sm text-charcoal-900 focus:outline-none focus:ring-2 focus:ring-emerald-600"
              />
            </div>

            <div className="pt-4 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setCurrentStep(3)}
                className="px-5 py-2.5 rounded-2xl border border-stone-300 text-stone-700 text-xs font-semibold hover:bg-stone-50"
              >
                {t('sell.prevStep')}
              </button>
              <button
                type="button"
                disabled={!canProceedStep4}
                onClick={() => setCurrentStep(5)}
                className="px-7 py-3 rounded-2xl bg-emerald-800 hover:bg-emerald-900 disabled:opacity-40 text-white font-bold text-xs shadow-md transition flex items-center gap-2"
              >
                <span>{t('sell.nextStep')}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 5: Final Live Preview & Publish */}
        {currentStep === 5 && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="text-center pb-2">
              <h3 className="font-serif text-2xl font-bold text-charcoal-900">
                {t('sell.publishListing')}
              </h3>
            </div>

            {/* Live Preview Card */}
            <div className="bg-[#FAF8F5] p-6 rounded-3xl border border-stone-200/90 max-w-md mx-auto space-y-4">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-stone-200">
                <img src={images[0]} alt="" className="w-full h-full object-cover" />
                <span className="absolute bottom-3 left-3 px-2.5 py-1 rounded-full text-xs font-bold bg-white/90 text-charcoal-900 shadow">
                  {getLocalizedCondition(condition)}
                </span>
                {isExchangeable && (
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-950 text-emerald-200">
                    {t('product.exchangeAvailable')}
                  </span>
                )}
              </div>

              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800">{getLocalizedCategory(category)}</span>
                <h4 className="font-bold text-base text-charcoal-900">{title}</h4>
                <div className="text-xl font-bold text-charcoal-900 mt-1">{formatCurrency(price)}</div>
                <p className="text-xs text-stone-500 line-clamp-2 mt-1">{description}</p>
                <div className="text-xs text-stone-500 mt-2 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-stone-400" />
                  <span>{district ? `${district}, ` : ''}{getLocalizedRegion(regionId)}</span>
                </div>
              </div>
            </div>

            <div className="pt-4 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setCurrentStep(4)}
                className="px-5 py-2.5 rounded-2xl border border-stone-300 text-stone-700 text-xs font-semibold hover:bg-stone-50"
              >
                {t('common.edit')}
              </button>
              <button
                type="button"
                disabled={isSubmitting}
                onClick={handleSubmit}
                className="px-8 py-3.5 rounded-2xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-sm shadow-lg shadow-emerald-900/20 transition flex items-center gap-2"
              >
                {isSubmitting ? t('sell.publishing') : `${t('sell.publishListing')} 🎉`}
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
