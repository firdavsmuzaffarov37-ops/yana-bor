import React, { useState, useRef, useEffect } from 'react';
import { Globe, ChevronDown, Check } from 'lucide-react';
import { useLanguage, SUPPORTED_LANGUAGES } from '../../context/LanguageContext';

export default function LanguageSelector({ variant = 'default', className = '' }) {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const currentLang = SUPPORTED_LANGUAGES.find(l => l.code === language) || SUPPORTED_LANGUAGES[0];

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Variant 1: Compact pills (e.g. in top announcement bar or mobile footer)
  if (variant === 'pills') {
    return (
      <div className={`inline-flex items-center gap-1 p-0.5 bg-black/20 rounded-full border border-white/10 ${className}`}>
        {SUPPORTED_LANGUAGES.map((item) => (
          <button
            key={item.code}
            onClick={() => setLanguage(item.code)}
            className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-bold transition ${
              language === item.code
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-stone-300 hover:text-white'
            }`}
            title={item.name}
          >
            <span>{item.flag}</span>
            <span>{item.short}</span>
          </button>
        ))}
      </div>
    );
  }

  // Variant 2: Mobile drawer list
  if (variant === 'list') {
    return (
      <div className={`grid grid-cols-3 gap-2 ${className}`}>
        {SUPPORTED_LANGUAGES.map((item) => (
          <button
            key={item.code}
            onClick={() => {
              setLanguage(item.code);
            }}
            className={`flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-semibold border transition ${
              language === item.code
                ? 'bg-emerald-800 text-white border-emerald-900 shadow-sm'
                : 'bg-stone-50 hover:bg-stone-100 text-stone-700 border-stone-200'
            }`}
          >
            <span className="text-sm">{item.flag}</span>
            <span>{item.name}</span>
          </button>
        ))}
      </div>
    );
  }

  // Variant 3: Default Dropdown (Navbar)
  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full border border-stone-200 hover:border-emerald-600 bg-white/80 hover:bg-white text-stone-800 text-xs font-semibold transition shadow-sm"
        aria-label="Change language"
      >
        <span className="text-sm leading-none">{currentLang.flag}</span>
        <span className="hidden sm:inline">{currentLang.short}</span>
        <ChevronDown className={`w-3.5 h-3.5 text-stone-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-44 bg-white rounded-2xl shadow-xl border border-stone-200 py-1.5 z-50 animate-in fade-in zoom-in-95 duration-150">
          <div className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-stone-400 border-b border-stone-100">
            Tilni tanlang / Язык / Language
          </div>
          {SUPPORTED_LANGUAGES.map((item) => {
            const isSelected = language === item.code;
            return (
              <button
                key={item.code}
                onClick={() => {
                  setLanguage(item.code);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3.5 py-2 text-xs transition text-left ${
                  isSelected
                    ? 'bg-emerald-50 text-emerald-900 font-bold'
                    : 'text-stone-700 hover:bg-stone-50'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="text-base">{item.flag}</span>
                  <span>{item.name}</span>
                </div>
                {isSelected && <Check className="w-4 h-4 text-emerald-600" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
