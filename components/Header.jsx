import React, { useState } from 'react';
import { Plane, User, Globe, DollarSign, LogOut, ChevronDown, Check, ShieldCheck, Ticket, Sparkles } from 'lucide-react';

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
  onViewBookings,
  t
}) => {
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isCurrOpen, setIsCurrOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const activeLang = LANGUAGES_CONFIG.find((l) => l.code === currentLang) || LANGUAGES_CONFIG[0];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/10 bg-[#080d19]/90 backdrop-blur-xl shadow-lg">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        {/* Brand Name with Aviation Crest */}
        <a href="#hero" className="flex items-center gap-3 group">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600 text-neutral-950 font-bold shadow-lg shadow-amber-500/25 group-hover:scale-105 transition-transform">
            <Plane className="h-6 w-6 transform -rotate-45 text-neutral-950" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-serif text-xl sm:text-2xl font-bold tracking-wider text-white">
                The Fly With Sky
              </span>
              <span className="hidden sm:inline-block rounded-full bg-amber-400/20 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-amber-300 border border-amber-400/30">
                Flagship
              </span>
            </div>
            <p className="text-[11px] text-neutral-400 font-light">
              {currentLang === 'ur' ? 'دی فلائی ود سکائی • شاہی عالمی پروازیں' : 'Luxury Beyond Horizons'}
            </p>
          </div>
        </a>

        {/* Clean Pill Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 rounded-full border border-white/10 bg-white/5 p-1 text-xs font-semibold text-neutral-300 backdrop-blur-md">
          <a href="#booking" className="rounded-full px-4 py-1.5 hover:text-white hover:bg-white/10 transition">
            {currentLang === 'ur' ? 'پروازیں بک کریں' : 'Book Flights'}
          </a>
          <a href="#fleet-gallery" className="rounded-full px-4 py-1.5 hover:text-white hover:bg-white/10 transition">
            {currentLang === 'ur' ? 'فضائی بیڑہ' : 'Fleet Showcase'}
          </a>
          <a href="#seats" className="rounded-full px-4 py-1.5 hover:text-white hover:bg-white/10 transition">
            {currentLang === 'ur' ? 'سیٹ میپ' : 'Cabin Suites'}
          </a>
        </nav>

        {/* Action Controls: Auth, e-KYC, Currency, Language */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* User Auth Status / Trigger */}
          {currentUser ? (
            <div className="relative">
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center gap-2 rounded-2xl border border-amber-400/40 bg-amber-400/10 px-3 py-1.5 text-xs hover:border-amber-400 transition"
              >
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-amber-400 text-neutral-950 font-bold text-xs">
                  {currentUser.name ? currentUser.name.charAt(0).toUpperCase() : 'U'}
                </div>
                <div className="hidden sm:block text-start leading-tight">
                  <span className="block font-bold text-white max-w-[120px] truncate">
                    {currentUser.name}
                  </span>
                  <span className="block font-mono text-[9px] text-amber-300">
                    CNIC: {currentUser.cnic}
                  </span>
                </div>
                <ChevronDown className="h-3 w-3 text-amber-300" />
              </button>

              {isUserMenuOpen && (
                <div className="absolute end-0 mt-2 w-56 rounded-2xl border border-white/15 bg-[#0e1626] p-2 shadow-2xl backdrop-blur-2xl z-50 animate-in fade-in">
                  <div className="px-3 py-2 border-b border-white/10">
                    <span className="block text-xs font-bold text-white">{currentUser.name}</span>
                    <span className="block text-[10px] text-neutral-400">{currentUser.phone}</span>
                    <span className="inline-block mt-1 rounded bg-amber-400/20 px-2 py-0.5 text-[9px] font-bold text-amber-300">
                      Verified Member
                    </span>
                  </div>

                  <button
                    onClick={() => {
                      onViewBookings && onViewBookings();
                      setIsUserMenuOpen(false);
                    }}
                    className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-xs text-neutral-300 hover:bg-white/5 hover:text-white transition mt-1"
                  >
                    <Ticket className="h-4 w-4 text-amber-400" />
                    <span>{currentLang === 'ur' ? 'میری ٹکٹس (PNR History)' : 'My PNR Tickets'}</span>
                  </button>

                  <button
                    onClick={() => {
                      onLogout();
                      setIsUserMenuOpen(false);
                    }}
                    className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-xs text-red-400 hover:bg-red-500/10 transition mt-1"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>{currentLang === 'ur' ? 'لاگ آؤٹ' : 'Sign Out'}</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={onOpenAuth}
              className="flex items-center gap-1.5 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 px-4 py-2 text-xs font-bold text-neutral-950 shadow-md hover:from-amber-300 hover:to-amber-400 transition transform active:scale-95"
            >
              <User className="h-3.5 w-3.5" />
              <span>{currentLang === 'ur' ? 'لاگ ان / رجسٹر' : 'Sign In / Register'}</span>
            </button>
          )}

          {/* e-KYC Passport Scanner Quick Trigger */}
          <button
            onClick={onOpenKyc}
            className="hidden sm:flex items-center gap-1.5 rounded-full border border-cyan-500/40 bg-cyan-950/30 px-3 py-1.5 text-xs font-semibold text-cyan-300 hover:bg-cyan-900/40 transition"
            title="Biometric Passport Scanner"
          >
            <ShieldCheck className="h-3.5 w-3.5 text-cyan-400" />
            <span>e-KYC</span>
          </button>

          {/* Currency Dropdown */}
          <div className="relative">
            <button
              onClick={() => {
                setIsCurrOpen(!isCurrOpen);
                setIsLangOpen(false);
              }}
              className="flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-mono font-bold text-amber-300 hover:border-amber-400/40 transition"
            >
              <span>{currentCurrency}</span>
              <ChevronDown className="h-3 w-3 text-neutral-400" />
            </button>

            {isCurrOpen && (
              <div className="absolute end-0 mt-2 w-36 rounded-2xl border border-white/15 bg-[#0e1626] p-1.5 shadow-2xl backdrop-blur-2xl z-50">
                {CURRENCIES_CONFIG.map((c) => (
                  <button
                    key={c.code}
                    onClick={() => {
                      onCurrencyChange(c.code);
                      setIsCurrOpen(false);
                    }}
                    className={`flex w-full items-center justify-between rounded-xl px-2.5 py-1.5 text-xs font-mono transition ${
                      c.code === currentCurrency
                        ? 'bg-amber-400/20 text-amber-300 font-bold'
                        : 'text-neutral-300 hover:bg-white/5'
                    }`}
                  >
                    <span>{c.label}</span>
                    {c.code === currentCurrency && <Check className="h-3 w-3 text-amber-400" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Language Switcher with Country Flags */}
          <div className="relative">
            <button
              onClick={() => {
                setIsLangOpen(!isLangOpen);
                setIsCurrOpen(false);
              }}
              className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-white hover:border-amber-400/40 transition"
            >
              <span className="text-base">{activeLang.flag}</span>
              <span className="hidden sm:inline">{activeLang.nativeName}</span>
              <ChevronDown className="h-3 w-3 text-neutral-400" />
            </button>

            {isLangOpen && (
              <div className="absolute end-0 mt-2 w-44 rounded-2xl border border-white/15 bg-[#0e1626] p-1.5 shadow-2xl backdrop-blur-2xl z-50">
                {LANGUAGES_CONFIG.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => {
                      onLanguageChange(l.code);
                      setIsLangOpen(false);
                    }}
                    className={`flex w-full items-center justify-between rounded-xl px-2.5 py-2 text-xs transition ${
                      l.code === currentLang
                        ? 'bg-cyan-500/20 text-cyan-300 font-bold'
                        : 'text-neutral-300 hover:bg-white/5'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <span className="text-base">{l.flag}</span>
                      <span>{l.nativeName}</span>
                    </span>
                    <span className="font-mono text-[9px] uppercase text-neutral-400">{l.dir}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
