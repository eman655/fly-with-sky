import React, { useState } from 'react';
import { Plane, User, Globe, DollarSign, LogOut, ChevronDown, Check, ShieldCheck, Ticket, Sparkles, Menu, LayoutDashboard } from 'lucide-react';

export const LANGUAGES_CONFIG = [
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇬🇧', dir: 'ltr' },
  { code: 'ur', name: 'Urdu', nativeName: 'اردو', flag: '🇵🇰', dir: 'rtl' },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية', flag: '🇸🇦', dir: 'rtl' },
  { code: 'fr', name: 'French', nativeName: 'Français', flag: '🇫🇷', dir: 'ltr' }
];

export const CURRENCIES_CONFIG = [
  { code: 'PKR', symbol: '₨', label: 'PKR (₨)' },
  { code: 'USD', symbol: '$', label: 'USD ($)' },
  { code: 'AED', symbol: 'د.إ', label: 'AED (د.إ)' },
  { code: 'GBP', symbol: '£', label: 'GBP (£)' },
  { code: 'EUR', symbol: '€', label: 'EUR (€)' }
];

export const Header = ({
  currentLang = 'en',
  onLanguageChange,
  currentCurrency = 'PKR',
  onCurrencyChange,
  currentUser,
  onOpenAuth,
  onLogout,
  onOpenKyc,
  onOpenSideDrawer,
  onOpenDashboard,
  t
}) => {
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isCurrOpen, setIsCurrOpen] = useState(false);

  const activeLang = LANGUAGES_CONFIG.find((l) => l.code === currentLang) || LANGUAGES_CONFIG[0];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/10 bg-[#080d19]/95 backdrop-blur-xl shadow-lg">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        {/* Left Side: Uniform Logo Icon */}
        <div className="flex items-center">
          <a href="#hero" className="flex items-center group cursor-pointer" title="The Fly With Sky">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600 text-neutral-950 font-bold shadow-lg shadow-amber-500/25 group-hover:scale-105 transition-transform">
              <Plane className="h-5 w-5 transform -rotate-45 text-neutral-950" />
            </div>
          </a>
        </div>

        {/* Center / Front Screen: ONLY the Website Name */}
        <div className="text-center select-none px-2">
          <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold tracking-wider text-white uppercase drop-shadow-md">
            The Fly With Sky
          </h1>
          <p className="text-[11px] sm:text-xs text-amber-400/85 font-medium tracking-widest uppercase mt-0.5">
            {currentLang === 'ur' ? 'دی فلائی ود سکائی • شاہی پروازیں' : 'Luxury Beyond Horizons'}
          </p>
        </div>

        {/* Right Side: Side Drawer Trigger Button (Exact Same h-10 w-10 Size) */}
        <div className="flex items-center gap-2">
          <button
            onClick={onOpenSideDrawer}
            className="flex h-10 w-10 items-center justify-center rounded-2xl border border-amber-400/40 bg-amber-400/10 text-amber-400 hover:bg-amber-400 hover:text-neutral-950 transition shadow-md group cursor-pointer"
            title={currentLang === 'ur' ? 'سائیڈ مینو اور تمام سہولیات کھولیں' : 'Open All Services & Side Menu'}
          >
            <Menu className="h-5 w-5 group-hover:scale-110 transition-transform" />
          </button>
        </div>
      </div>
    </header>
  );
};
