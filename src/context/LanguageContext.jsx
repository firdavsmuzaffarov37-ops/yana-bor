import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations } from '../i18n/translations';

const LanguageContext = createContext();

export const SUPPORTED_LANGUAGES = [
  { code: 'uz', name: 'O‘zbekcha', short: 'UZ', flag: '🇺🇿' },
  { code: 'ru', name: 'Русский', short: 'RU', flag: '🇷🇺' },
  { code: 'en', name: 'English', short: 'EN', flag: '🇬🇧' }
];

export const LanguageProvider = ({ children }) => {
  const [language, setLanguageState] = useState(() => {
    const saved = localStorage.getItem('yanabor_language');
    if (saved && ['uz', 'ru', 'en'].includes(saved)) {
      return saved;
    }
    return 'uz';
  });

  const setLanguage = (lang) => {
    if (['uz', 'ru', 'en'].includes(lang)) {
      setLanguageState(lang);
      localStorage.setItem('yanabor_language', lang);
      document.documentElement.lang = lang;
    }
  };

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  /**
   * Helper translation function with nested key resolution e.g. t('nav.home')
   */
  const t = (path, fallback = '') => {
    if (!path) return '';
    const keys = path.split('.');
    
    // 1. Try current language
    let current = translations[language];
    for (const key of keys) {
      if (current && current[key] !== undefined) {
        current = current[key];
      } else {
        current = null;
        break;
      }
    }

    if (current !== null && current !== undefined) {
      return current;
    }

    // 2. Fallback to Uzbek ('uz')
    let fallbackObj = translations['uz'];
    for (const key of keys) {
      if (fallbackObj && fallbackObj[key] !== undefined) {
        fallbackObj = fallbackObj[key];
      } else {
        fallbackObj = null;
        break;
      }
    }

    if (fallbackObj !== null && fallbackObj !== undefined) {
      return fallbackObj;
    }

    // 3. Fallback to provided fallback or last segment of key
    return fallback || keys[keys.length - 1];
  };

  /**
   * Localized Price Formatter
   */
  const formatCurrency = (amount) => {
    if (amount === undefined || amount === null || isNaN(amount)) return `0 ${t('common.currency')}`;
    const rounded = Math.round(amount);

    if (language === 'en') {
      return `${new Intl.NumberFormat('en-US').format(rounded)} UZS`;
    }
    if (language === 'ru') {
      return `${new Intl.NumberFormat('ru-RU').format(rounded)} сум`;
    }
    // Uzbek
    return `${new Intl.NumberFormat('ru-RU').format(rounded)} so‘m`;
  };

  /**
   * Localized Category Name
   */
  const getLocalizedCategory = (cat) => {
    if (!cat) return '';
    const id = typeof cat === 'string' ? cat : cat.id;
    return translations[language]?.categories?.[id] || 
           translations['uz']?.categories?.[id] || 
           (typeof cat === 'object' ? cat.name : id);
  };

  /**
   * Localized Category Description
   */
  const getLocalizedCategoryDesc = (cat) => {
    if (!cat) return '';
    const id = typeof cat === 'string' ? cat : cat.id;
    return translations[language]?.categoryDescriptions?.[id] || 
           (typeof cat === 'object' ? cat.description : '');
  };

  /**
   * Localized Region Name
   */
  const getLocalizedRegion = (region) => {
    if (!region) return '';
    const id = typeof region === 'string' ? region : region.id;
    return translations[language]?.regions?.[id] || 
           translations['uz']?.regions?.[id] || 
           (typeof region === 'object' ? region.name : id);
  };

  /**
   * Localized Condition Badge & Label
   */
  const getLocalizedCondition = (condition) => {
    if (!condition) return '';
    return translations[language]?.conditions?.[condition] || 
           translations['uz']?.conditions?.[condition] || 
           condition;
  };

  /**
   * Localized Item Title
   */
  const getLocalizedTitle = (item) => {
    if (!item) return '';
    if (language === 'ru' && item.titleRu) return item.titleRu;
    if (language === 'en' && item.titleEn) return item.titleEn;
    return item.title;
  };

  /**
   * Localized Date Formatter
   */
  const formatDate = (isoString) => {
    if (!isoString) return '';
    const date = new Date(isoString);
    const now = new Date();
    const diffDays = Math.floor((now - date) / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return t('common.today');
    if (diffDays === 1) return t('common.yesterday');
    if (diffDays < 7) return `${diffDays} ${t('common.daysAgo')}`;

    const locale = language === 'ru' ? 'ru-RU' : language === 'en' ? 'en-US' : 'uz-UZ';
    return date.toLocaleDateString(locale, {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  return (
    <LanguageContext.Provider value={{
      language,
      setLanguage,
      t,
      formatCurrency,
      getLocalizedCategory,
      getLocalizedCategoryDesc,
      getLocalizedRegion,
      getLocalizedCondition,
      getLocalizedTitle,
      formatDate,
      supportedLanguages: SUPPORTED_LANGUAGES
    }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
