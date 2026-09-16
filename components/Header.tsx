'use client';

import React, { useState } from 'react';
import { LANGUAGES, CURRENCIES } from '../lib/i18n';
import { LanguageCode, CurrencyCode, UserProfile } from '../types/airline';
import { Plane, User, Globe, DollarSign, LogOut, ChevronDown, Check, ShieldCheck } from 'lucide-react';

interface HeaderProps {
  currentLang: LanguageCode;
  onLanguageChange: (lang: LanguageCode) => void;
  currentCurrency: CurrencyCode;
  onCurrencyChange: (curr: CurrencyCode) => void;
  currentUser: UserProfile | null;
  onOpenAuth: () => void;
  onLogout: () => void;
  onOpenKyc: () => void;
  t: (key: string) => string;
}

export const Header: React.FC<HeaderProps> = ({
  currentLang,
  onLanguageChange,
  currentCurrency,
  onCurrencyChange,
  currentUser,
  onOpenAuth,
  onLogout,
  onOpenKyc,
  t
}) => {
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isCurrOpen, setIsCurrOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/10 bg-[#0a0f1d]/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        {/* Brand Name & Crest */}
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 text-neutral-950 shadow-lg shadow-amber-500/20">
            <Plane className="h-6 w-6 transform -rotate-45" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-serif text-xl sm:text-2xl font-bold tracking-wider text-white">
                {currentLang === 'ur' ? 'امپیریئن ایئرویز' : 'EMPYREAN'}
              </span>
              <span className="rounded-full bg-amber-400/20 px-2 py-0.5 text-[10px] font-bold text-amber-300 border border-amber-400/30">
                AIRWAYS
              </span>
            </div>
            <p className="text-[11px] text-neutral-400">
              {t('brand_tagline')}
            </p>
          </div>
        </div>

        {/* Action Controls: Auth, Currency, Language */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          {/* User Profile / Login */}
          {currentUser ? (
            <div className="flex items-center gap-2 rounded-2xl border border-amber-400/40 bg-amber-400/10 px-3 py-1.5 text-xs">
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-amber-400 text-neutral-950 font-bold">
                {currentUser.fullName.charAt(0)}
              </div>
              <div className="hidden sm:block text-start">
                <span className="block font-bold text-white leading-tight">
                  {currentUser.fullName}
                </span>
                <span className="block font-mono text-[10px] text-amber-300">
                  CNIC: {currentUser.cnic}
                </span>
              </div>
              <button
                onClick={onLogout}
                className="ms-1 rounded-lg p-1 text-neutral-400 hover:text-red-400 hover:bg-white/5 transition"
                title={t('nav_logout')}
              >
                <LogOut className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={onOpenAuth}
              className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 px-4 py-2 text-xs font-bold text-neutral-950 shadow-md hover:from-amber-300 hover:to-amber-400 transition"
            >
              <User className="h-4 w-4" />
              <span>{t('nav_login')} / {t('nav_register')}</span>
            </button>
          )}

          {/* e-KYC Verification Trigger */}
          <button
            onClick={onOpenKyc}
            className="hidden sm:flex items-center gap-1.5 rounded-xl border border-cyan-500/30 bg-cyan-950/30 px-3 py-2 text-xs font-medium text-cyan-300 hover:bg-cyan-900/40 transition"
            title="Passport & Biometric Verification"
          >
            <ShieldCheck className="h-4 w-4 text-cyan-400" />
            <span className="text-[11px]">e-KYC</span>
          </button>

          {/* Currency Switcher */}
          <div className="relative">
            <button
              onClick={() => {
                setIsCurrOpen(!isCurrOpen);
                setIsLangOpen(false);
              }}
              className="flex items-center gap-1 rounded-xl border border-white/10 bg-white/5 px-2.5 py-2 text-xs font-mono font-bold text-amber-300 hover:border-amber-400/40 transition"
            >
              <span>{CURRENCIES[currentCurrency].symbol}</span>
              <span>{currentCurrency}</span>
              <ChevronDown className="h-3 w-3 text-neutral-400" />
            </button>

            {isCurrOpen && (
              <div className="absolute end-0 mt-2 w-36 rounded-xl border border-white/15 bg-[#0e1424] p-1 shadow-2xl backdrop-blur-xl z-50">
                {Object.values(CURRENCIES).map((c) => (
                  <button
                    key={c.code}
                    onClick={() => {
                      onCurrencyChange(c.code);
                      setIsCurrOpen(false);
                    }}
                    className={`flex w-full items-center justify-between rounded-lg px-2.5 py-1.5 text-xs transition ${
                      c.code === currentCurrency
                        ? 'bg-amber-400/20 text-amber-300 font-bold'
                        : 'text-neutral-300 hover:bg-white/5'
                    }`}
                  >
                    <span>{c.code} ({c.symbol})</span>
                    {c.code === currentCurrency && <Check className="h-3 w-3 text-amber-400" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Language Switcher */}
          <div className="relative">
            <button
              onClick={() => {
                setIsLangOpen(!isLangOpen);
                setIsCurrOpen(false);
              }}
              className="flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-2.5 py-2 text-xs font-medium text-white hover:border-amber-400/40 transition"
            >
              <Globe className="h-3.5 w-3.5 text-cyan-400" />
              <span>{LANGUAGES[currentLang].nativeName}</span>
              <ChevronDown className="h-3 w-3 text-neutral-400" />
            </button>

            {isLangOpen && (
              <div className="absolute end-0 mt-2 w-40 rounded-xl border border-white/15 bg-[#0e1424] p-1 shadow-2xl backdrop-blur-xl z-50">
                {Object.values(LANGUAGES).map((l) => (
                  <button
                    key={l.code}
                    onClick={() => {
                      onLanguageChange(l.code);
                      setIsLangOpen(false);
                    }}
                    className={`flex w-full items-center justify-between rounded-lg px-2.5 py-1.5 text-xs transition ${
                      l.code === currentLang
                        ? 'bg-cyan-500/20 text-cyan-300 font-bold'
                        : 'text-neutral-300 hover:bg-white/5'
                    }`}
                  >
                    <span>{l.nativeName}</span>
                    <span className="text-[10px] text-neutral-400 uppercase font-mono">{l.dir}</span>
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
