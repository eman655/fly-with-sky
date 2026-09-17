import React from 'react';
import {
  X,
  Plane,
  LayoutDashboard,
  Ticket,
  ShieldCheck,
  Database,
  Globe,
  DollarSign,
  User,
  LogOut,
  Sparkles,
  ChevronRight,
  Download,
  Upload
} from 'lucide-react';

const IconBox = ({ children, className = "" }) => (
  <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-amber-400/30 bg-amber-400/10 text-amber-400 shadow-sm transition-all ${className}`}>
    {children}
  </div>
);

export const SideDrawer = ({
  isOpen,
  onClose,
  currentUser,
  activeView,
  onSelectView,
  onOpenAuth,
  onLogout,
  onOpenKyc,
  onDownloadBackup,
  onRestoreBackup,
  lang = 'en',
  currency = 'PKR',
  onLanguageChange,
  onCurrencyChange
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end animate-in fade-in duration-200">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/75 backdrop-blur-sm transition-opacity"
      />

      {/* Drawer Panel */}
      <div className="relative w-full max-w-sm sm:max-w-md h-full bg-gradient-to-b from-[#090f1d] via-[#0d1629] to-[#070b14] border-s border-amber-400/30 p-6 shadow-2xl flex flex-col justify-between z-10 overflow-y-auto">
        <div>
          {/* Drawer Top Header */}
          <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
            <div className="flex items-center gap-3">
              <IconBox className="bg-gradient-to-br from-amber-400 to-amber-600 text-neutral-950 font-bold border-none shadow-md">
                <Plane className="h-5 w-5 transform -rotate-45" />
              </IconBox>
              <div>
                <span className="font-serif text-lg font-bold tracking-wider text-white">
                  The Fly With Sky
                </span>
                <span className="block text-[10px] text-amber-300 font-mono">
                  {lang === 'ur' ? 'سائیڈ مینو اور تمام سہولیات' : 'Side Navigation & Services'}
                </span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/15 bg-white/5 text-neutral-400 hover:text-white hover:bg-white/10 transition"
              title="Close"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* User Profile Card inside Drawer */}
          <div className="mb-6 rounded-2xl border border-amber-400/30 bg-amber-500/10 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <IconBox className="bg-amber-400 text-neutral-950 font-bold border-none shadow-md">
                  <span className="text-base font-bold">
                    {currentUser ? (currentUser.fullName || currentUser.name || 'H').charAt(0).toUpperCase() : 'H'}
                  </span>
                </IconBox>
                <div>
                  <span className="font-bold text-white text-sm block">
                    {currentUser ? (currentUser.fullName || currentUser.name) : 'Hamza Latif'}
                  </span>
                  <span className="font-mono text-[10px] text-amber-300 block">
                    CNIC: {currentUser ? currentUser.cnic : '31302-5257137-7'}
                  </span>
                  <span className="text-[10px] text-emerald-400 font-semibold block">
                    NADRA CNIC Verified ✓
                  </span>
                </div>
              </div>

              {currentUser ? (
                <button
                  onClick={() => {
                    onLogout();
                    onClose();
                  }}
                  className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-neutral-400 hover:text-red-400 hover:bg-white/10 transition"
                  title="Sign Out"
                >
                  <LogOut className="h-5 w-5" />
                </button>
              ) : (
                <button
                  onClick={() => {
                    onClose();
                    onOpenAuth();
                  }}
                  className="rounded-xl bg-amber-400 px-3.5 py-2 text-xs font-bold text-neutral-950 shadow hover:bg-amber-300 transition"
                >
                  Login
                </button>
              )}
            </div>
          </div>

          {/* Navigation Links with UNIFORM IconBox */}
          <div className="space-y-2.5">
            {/* 1. Main Home / Booking */}
            <button
              onClick={() => {
                onSelectView('MAIN');
                onClose();
              }}
              className={`w-full flex items-center justify-between rounded-2xl p-2.5 text-xs font-semibold transition ${
                activeView === 'MAIN'
                  ? 'bg-amber-400 text-neutral-950 font-bold shadow-md shadow-amber-400/20'
                  : 'border border-white/10 bg-white/5 text-neutral-200 hover:bg-white/10'
              }`}
            >
              <div className="flex items-center gap-3">
                <IconBox className={activeView === 'MAIN' ? 'bg-neutral-950 text-amber-400 border-none' : ''}>
                  <Plane className="h-5 w-5" />
                </IconBox>
                <span className="text-sm font-medium">
                  {lang === 'ur' ? 'فلائٹ بکنگ پورٹل (Home)' : 'Flight Booking Portal'}
                </span>
              </div>
              <ChevronRight className="h-4 w-4 opacity-70 pe-1" />
            </button>

            {/* 2. Customer Dashboard */}
            <button
              onClick={() => {
                onSelectView('DASHBOARD');
                onClose();
              }}
              className={`w-full flex items-center justify-between rounded-2xl p-2.5 text-xs font-semibold transition ${
                activeView === 'DASHBOARD'
                  ? 'bg-amber-400 text-neutral-950 font-bold shadow-md shadow-amber-400/20'
                  : 'border border-white/10 bg-white/5 text-neutral-200 hover:bg-white/10'
              }`}
            >
              <div className="flex items-center gap-3">
                <IconBox className={activeView === 'DASHBOARD' ? 'bg-neutral-950 text-amber-400 border-none' : ''}>
                  <LayoutDashboard className="h-5 w-5" />
                </IconBox>
                <span className="text-sm font-medium">
                  {lang === 'ur' ? 'کسٹمر ڈیش بورڈ' : 'Customer Travel Dashboard'}
                </span>
              </div>
              <span className="rounded bg-amber-400/20 px-2 py-0.5 text-[10px] font-bold text-amber-300">
                VIP
              </span>
            </button>

            {/* 3. Global Fleet Gallery */}
            <button
              onClick={() => {
                onSelectView('FLEET');
                onClose();
              }}
              className={`w-full flex items-center justify-between rounded-2xl p-2.5 text-xs font-semibold transition ${
                activeView === 'FLEET'
                  ? 'bg-amber-400 text-neutral-950 font-bold shadow-md shadow-amber-400/20'
                  : 'border border-white/10 bg-white/5 text-neutral-200 hover:bg-white/10'
              }`}
            >
              <div className="flex items-center gap-3">
                <IconBox>
                  <Plane className="h-5 w-5 transform rotate-45" />
                </IconBox>
                <span className="text-sm font-medium">
                  {lang === 'ur' ? 'عالمی فضائی بیڑہ (Fleet Gallery)' : 'Global Fleet Showcase'}
                </span>
              </div>
              <ChevronRight className="h-4 w-4 opacity-70 pe-1" />
            </button>

            {/* 4. e-KYC Scanner */}
            <button
              onClick={() => {
                onClose();
                onOpenKyc();
              }}
              className="w-full flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 p-2.5 text-xs font-semibold text-neutral-200 hover:bg-white/10 transition"
            >
              <div className="flex items-center gap-3">
                <IconBox className="border-cyan-500/30 bg-cyan-500/10 text-cyan-300">
                  <ShieldCheck className="h-5 w-5" />
                </IconBox>
                <span className="text-sm font-medium">
                  {lang === 'ur' ? 'بائیو میٹرک پاسپورٹ اسکینر (e-KYC)' : 'Biometric e-KYC Scanner'}
                </span>
              </div>
              <span className="h-2.5 w-2.5 rounded-full bg-cyan-400 animate-pulse me-2" />
            </button>
          </div>

          {/* Settings Section: Currency & Language Switchers */}
          <div className="mt-5 pt-4 border-t border-white/10 space-y-3">
            {/* Currency Switcher */}
            <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 p-2.5">
              <div className="flex items-center gap-3">
                <IconBox>
                  <DollarSign className="h-5 w-5" />
                </IconBox>
                <span className="text-xs font-semibold text-neutral-200">
                  {lang === 'ur' ? 'کرنسی منتخب کریں:' : 'Currency:'}
                </span>
              </div>
              <select
                value={currency}
                onChange={(e) => onCurrencyChange && onCurrencyChange(e.target.value)}
                className="rounded-xl border border-white/15 bg-[#0e1626] px-3 py-1.5 text-xs font-mono font-bold text-amber-300 cursor-pointer focus:outline-none"
              >
                <option value="PKR" className="bg-[#0e1626]">PKR (₨)</option>
                <option value="USD" className="bg-[#0e1626]">USD ($)</option>
                <option value="AED" className="bg-[#0e1626]">AED (د.إ)</option>
                <option value="GBP" className="bg-[#0e1626]">GBP (£)</option>
                <option value="EUR" className="bg-[#0e1626]">EUR (€)</option>
              </select>
            </div>

            {/* Language Switcher */}
            <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 p-2.5">
              <div className="flex items-center gap-3">
                <IconBox>
                  <Globe className="h-5 w-5" />
                </IconBox>
                <span className="text-xs font-semibold text-neutral-200">
                  {lang === 'ur' ? 'زبان منتخب کریں:' : 'Language:'}
                </span>
              </div>
              <select
                value={lang}
                onChange={(e) => onLanguageChange && onLanguageChange(e.target.value)}
                className="rounded-xl border border-white/15 bg-[#0e1626] px-3 py-1.5 text-xs font-medium text-white cursor-pointer focus:outline-none"
              >
                <option value="en" className="bg-[#0e1626]">🇬🇧 English</option>
                <option value="ur" className="bg-[#0e1626]">🇵🇰 اردو</option>
                <option value="ar" className="bg-[#0e1626]">🇸🇦 العربية</option>
                <option value="fr" className="bg-[#0e1626]">🇫🇷 Français</option>
              </select>
            </div>
          </div>

          {/* Backup & Data Vault Section */}
          <div className="mt-5 pt-4 border-t border-white/10">
            <div className="flex items-center gap-3 mb-3">
              <IconBox>
                <Database className="h-5 w-5" />
              </IconBox>
              <div>
                <span className="text-xs font-bold text-amber-300 block">
                  {lang === 'ur' ? 'بیک اپ اور ڈیٹا سیکیورٹی' : 'Data Backup & Vault'}
                </span>
                <span className="text-[10px] text-neutral-400 block">
                  {lang === 'ur'
                    ? 'آپ کے تمام سفری کوائف محفوظ رہتے ہیں'
                    : 'Your travel history is preserved locally'}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={onDownloadBackup}
                className="flex items-center justify-center gap-2 rounded-2xl border border-amber-400/40 bg-amber-400/10 py-2.5 text-xs font-bold text-amber-300 hover:bg-amber-400/20 transition"
              >
                <Download className="h-4 w-4" />
                <span>{lang === 'ur' ? 'بیک اپ لیں' : 'Export'}</span>
              </button>

              <label className="flex items-center justify-center gap-2 rounded-2xl border border-white/15 bg-white/5 py-2.5 text-xs font-bold text-neutral-300 hover:bg-white/10 cursor-pointer transition">
                <Upload className="h-4 w-4" />
                <span>{lang === 'ur' ? 'بحال کریں' : 'Restore'}</span>
                <input
                  type="file"
                  accept=".json"
                  onChange={onRestoreBackup}
                  className="hidden"
                />
              </label>
            </div>
          </div>
        </div>

        {/* Drawer Bottom Signature */}
        <div className="mt-8 pt-4 border-t border-white/10 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-400/40 bg-amber-500/10 px-4 py-1.5 shadow-md shadow-amber-500/10">
            <Sparkles className="h-3.5 w-3.5 text-amber-400 animate-pulse" />
            <span className="font-serif text-xs font-bold text-amber-300">
              Developed by Hamza Latif
            </span>
          </div>
          <span className="block text-[10px] text-neutral-500 mt-2">
            The Fly With Sky • Secure Architecture
          </span>
        </div>
      </div>
    </div>
  );
};
