'use client';

import React, { useState } from 'react';
import { LANGUAGES, CURRENCIES } from '../lib/i18n';
import { LanguageCode, CurrencyCode, Direction } from '../types/airline';
import { Globe, DollarSign, ShieldCheck, Compass, Plane, ChevronDown, Check, Sparkles } from 'lucide-react';

interface HeaderProps {
  currentLang: LanguageCode;
  onLanguageChange: (lang: LanguageCode) => void;
  currentCurrency: CurrencyCode;
  onCurrencyChange: (curr: CurrencyCode) => void;
  direction: Direction;
  onToggleDirection: () => void;
  onOpenKycModal: () => void;
  isKycVerified: boolean;
  t: (key: string) => string;
}

export const Header: React.FC<HeaderProps> = ({
  currentLang,
  onLanguageChange,
  currentCurrency,
  onCurrencyChange,
  direction,
  onToggleDirection,
  onOpenKycModal,
  isKycVerified,
  t
}) => {
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const [isCurrMenuOpen, setIsCurrMenuOpen] = useState(false);

  const activeLangMeta = LANGUAGES[currentLang];
  const activeCurrencyMeta = CURRENCIES[currentCurrency];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#07090e]/80 backdrop-blur-xl transition-all duration-300">
      {/* Top micro-bar for VIP Concierge and dynamic direction indicator */}
      <div className="w-full border-b border-white/5 bg-gradient-to-r from-amber-500/10 via-cyan-500/10 to-amber-500/10 px-4 py-1 text-xs text-neutral-400">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="inline-block h-2 w-2 animate-ping rounded-full bg-cyan-400"></span>
            <span className="font-mono tracking-widest text-cyan-300 uppercase">
              Global Sovereign Network • Fleet Status: Active
            </span>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={onToggleDirection}
              className="flex items-center gap-1.5 rounded-full border border-amber-500/30 bg-black/40 px-2.5 py-0.5 font-mono text-[11px] text-amber-300 hover:border-amber-400 transition"
              title="Manual Layout Direction Switcher"
            >
              <Compass className="h-3 w-3 text-amber-400" />
              <span>Direction: {direction.toUpperCase()}</span>
            </button>
            <span className="hidden sm:inline-block font-mono text-neutral-400">
              VIP Concierge: +971 4 AURA-VIP
            </span>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        {/* Brand Logo & Tagline */}
        <div className="flex items-center gap-3">
          <div className="relative flex h-11 w-11 items-center justify-center rounded-xl border border-amber-400/40 bg-gradient-to-br from-neutral-900 to-black shadow-lg shadow-amber-500/10">
            <Plane className="h-6 w-6 text-amber-400 transform -rotate-45" />
            <div className="absolute -top-1 -right-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-cyan-500 ring-2 ring-[#07090e]">
              <Sparkles className="h-2 w-2 text-black" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-serif text-xl font-bold tracking-widest text-white sm:text-2xl">
                {t('brand_name')}
              </span>
              <span className="rounded bg-amber-400/10 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-amber-300 border border-amber-400/30">
                Flagship
              </span>
            </div>
            <p className="hidden text-[11px] font-light tracking-wider text-neutral-400 sm:block">
              {t('brand_tagline')}
            </p>
          </div>
        </div>

        {/* Desktop Nav Links */}
        <nav className="hidden xl:flex items-center gap-8 text-sm font-medium text-neutral-300">
          <a href="#booking-engine" className="hover:text-amber-300 transition-colors">
            {t('nav_flights')}
          </a>
          <a href="#seat-map" className="hover:text-amber-300 transition-colors">
            {t('nav_suites')}
          </a>
          <a href="#dining" className="hover:text-amber-300 transition-colors">
            {t('nav_experience')}
          </a>
          <a href="#circle" className="hover:text-amber-300 transition-colors">
            {t('nav_membership')}
          </a>
        </nav>

        {/* Action Controls: e-KYC Modal Trigger, Currency Switcher, Language Switcher */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          {/* Bank-Grade e-KYC Trigger */}
          <button
            onClick={onOpenKycModal}
            className={`group relative flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-semibold tracking-wide transition-all duration-300 shadow-md ${
              isKycVerified
                ? 'border border-emerald-500/50 bg-emerald-950/40 text-emerald-300 shadow-emerald-500/20'
                : 'border border-cyan-500/40 bg-cyan-950/30 text-cyan-300 hover:border-cyan-400 hover:bg-cyan-900/40 shadow-cyan-500/20'
            }`}
          >
            <ShieldCheck className={`h-4 w-4 ${isKycVerified ? 'text-emerald-400' : 'text-cyan-400 group-hover:scale-110 transition-transform'}`} />
            <span className="hidden md:inline">
              {isKycVerified ? t('badge_verified') : t('btn_kyc_verification')}
            </span>
            <span className="md:hidden">
              {isKycVerified ? 'ICAO Verified' : 'e-KYC'}
            </span>
            <span className="relative flex h-2 w-2">
              <span className={`absolute inline-flex h-full w-full animate-ping rounded-full opacity-75 ${isKycVerified ? 'bg-emerald-400' : 'bg-cyan-400'}`}></span>
              <span className={`relative inline-flex h-2 w-2 rounded-full ${isKycVerified ? 'bg-emerald-500' : 'bg-cyan-500'}`}></span>
            </span>
          </button>

          {/* Currency Dropdown */}
          <div className="relative">
            <button
              onClick={() => {
                setIsCurrMenuOpen(!isCurrMenuOpen);
                setIsLangMenuOpen(false);
              }}
              className="flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-2.5 py-2 text-xs font-medium text-neutral-200 hover:border-amber-400/40 hover:bg-white/10 transition"
              aria-label="Select Currency"
            >
              <DollarSign className="h-3.5 w-3.5 text-amber-400" />
              <span className="font-mono font-semibold text-amber-300">{activeCurrencyMeta.code}</span>
              <span className="text-neutral-400">({activeCurrencyMeta.symbol})</span>
              <ChevronDown className={`h-3 w-3 text-neutral-400 transition-transform duration-200 ${isCurrMenuOpen ? 'rotate-180' : ''}`} />
            </button>

            {isCurrMenuOpen && (
              <div className="absolute end-0 mt-2 w-44 rounded-xl border border-white/15 bg-[#0e131f] p-1.5 shadow-2xl backdrop-blur-2xl ring-1 ring-black/50 z-50">
                <div className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-neutral-400 border-b border-white/10 mb-1">
                  Global Currencies
                </div>
                {Object.values(CURRENCIES).map((curr) => (
                  <button
                    key={curr.code}
                    onClick={() => {
                      onCurrencyChange(curr.code);
                      setIsCurrMenuOpen(false);
                    }}
                    className={`flex w-full items-center justify-between rounded-lg px-2.5 py-1.5 text-left text-xs transition ${
                      curr.code === currentCurrency
                        ? 'bg-amber-500/20 text-amber-300 font-semibold'
                        : 'text-neutral-300 hover:bg-white/5'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <span className="font-mono text-amber-400">{curr.symbol}</span>
                      <span>{curr.code}</span>
                    </span>
                    {curr.code === currentCurrency && <Check className="h-3 w-3 text-amber-400" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Internationalization (Language Switcher) */}
          <div className="relative">
            <button
              onClick={() => {
                setIsLangMenuOpen(!isLangMenuOpen);
                setIsCurrMenuOpen(false);
              }}
              className="flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-2.5 py-2 text-xs font-medium text-neutral-200 hover:border-amber-400/40 hover:bg-white/10 transition"
              aria-label="Select Language"
            >
              <Globe className="h-3.5 w-3.5 text-cyan-400" />
              <span className="font-medium">{activeLangMeta.nativeName}</span>
              <span className="rounded bg-white/10 px-1 py-0.2 text-[9px] uppercase text-neutral-400">
                {activeLangMeta.dir.toUpperCase()}
              </span>
              <ChevronDown className={`h-3 w-3 text-neutral-400 transition-transform duration-200 ${isLangMenuOpen ? 'rotate-180' : ''}`} />
            </button>

            {isLangMenuOpen && (
              <div className="absolute end-0 mt-2 w-56 rounded-xl border border-white/15 bg-[#0e131f] p-1.5 shadow-2xl backdrop-blur-2xl ring-1 ring-black/50 z-50">
                <div className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-neutral-400 border-b border-white/10 mb-1">
                  Language & Locale (i18n)
                </div>
                {Object.values(LANGUAGES).map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      onLanguageChange(lang.code);
                      setIsLangMenuOpen(false);
                    }}
                    className={`flex w-full items-center justify-between rounded-lg px-2.5 py-2 text-left text-xs transition ${
                      lang.code === currentLang
                        ? 'bg-cyan-500/20 text-cyan-300 font-semibold'
                        : 'text-neutral-300 hover:bg-white/5'
                    }`}
                  >
                    <div className="flex flex-col">
                      <span className="font-medium text-white">{lang.nativeName}</span>
                      <span className="text-[10px] text-neutral-400">{lang.name}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className={`text-[9px] px-1.5 py-0.5 rounded font-mono ${lang.dir === 'rtl' ? 'bg-purple-900/60 text-purple-300 border border-purple-500/30' : 'bg-neutral-800 text-neutral-400'}`}>
                        {lang.dir.toUpperCase()}
                      </span>
                      {lang.code === currentLang && <Check className="h-3.5 w-3.5 text-cyan-400" />}
                    </div>
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
