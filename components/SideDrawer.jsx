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
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 text-neutral-950 font-bold shadow-lg shadow-amber-500/20">
                <Plane className="h-5 w-5 transform -rotate-45" />
              </div>
              <div>
                <span className="font-serif text-lg font-bold tracking-wider text-white">
                  The Fly With Sky
                </span>
                <span className="block text-[10px] text-amber-300 font-mono">
                  {lang === 'ur' ? 'سائیڈ مینو اور ڈیش بورڈ' : 'Side Navigation & Control'}
                </span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="rounded-full p-2 text-neutral-400 hover:text-white hover:bg-white/10 transition"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* User Profile Card inside Drawer */}
          {currentUser ? (
            <div className="mb-6 rounded-2xl border border-amber-400/30 bg-amber-500/10 p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-400 text-neutral-950 font-bold text-sm">
                    {currentUser.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <span className="font-bold text-white text-sm block">{currentUser.name}</span>
                    <span className="font-mono text-[10px] text-amber-300 block">
                      CNIC: {currentUser.cnic}
                    </span>
                    <span className="text-[10px] text-neutral-400 block">
                      {currentUser.phone}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    onLogout();
                    onClose();
                  }}
                  className="rounded-lg p-1.5 text-neutral-400 hover:text-red-400 hover:bg-white/5 transition"
                  title="Sign Out"
                >
                  <LogOut className="h-4 w-4" />
                </button>
              </div>

              <div className="mt-3 pt-3 border-t border-white/10 flex justify-between items-center text-xs">
                <span className="text-neutral-400">{lang === 'ur' ? 'اکاؤنٹ اسٹیٹس:' : 'Account Status:'}</span>
                <span className="rounded-full bg-emerald-500/20 text-emerald-400 px-2 py-0.5 text-[10px] font-bold border border-emerald-500/40">
                  NADRA CNIC Verified ✓
                </span>
              </div>
            </div>
          ) : (
            <div className="mb-6 rounded-2xl border border-white/10 bg-white/5 p-4 text-center">
              <p className="text-xs text-neutral-300 mb-3">
                {lang === 'ur' ? 'پروازیں محفوظ کرنے اور ڈیش بورڈ کے لیے لاگ ان کریں' : 'Sign in to access your personal dashboard & tickets'}
              </p>
              <button
                onClick={() => {
                  onClose();
                  onOpenAuth();
                }}
                className="w-full rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 py-2.5 text-xs font-bold text-neutral-950 shadow-md hover:from-amber-300 transition"
              >
                {lang === 'ur' ? 'لاگ ان / نیا اکاؤنٹ بنائیں' : 'Sign In / Register'}
              </button>
            </div>
          )}

          {/* Navigation Links */}
          <div className="space-y-2">
            {/* 1. Main Home / Booking */}
            <button
              onClick={() => {
                onSelectView('MAIN');
                onClose();
              }}
              className={`w-full flex items-center justify-between rounded-2xl px-4 py-3 text-xs font-semibold transition ${
                activeView === 'MAIN'
                  ? 'bg-amber-400 text-neutral-950 font-bold shadow-md shadow-amber-400/20'
                  : 'border border-white/10 bg-white/5 text-neutral-200 hover:bg-white/10'
              }`}
            >
              <div className="flex items-center gap-3">
                <Plane className="h-4 w-4" />
                <span>{lang === 'ur' ? 'مین بکنگ اسکرین (Home)' : 'Flight Booking Portal'}</span>
              </div>
              <ChevronRight className="h-4 w-4 opacity-70" />
            </button>

            {/* 2. Customer Dashboard */}
            <button
              onClick={() => {
                onSelectView('DASHBOARD');
                onClose();
              }}
              className={`w-full flex items-center justify-between rounded-2xl px-4 py-3 text-xs font-semibold transition ${
                activeView === 'DASHBOARD'
                  ? 'bg-amber-400 text-neutral-950 font-bold shadow-md shadow-amber-400/20'
                  : 'border border-white/10 bg-white/5 text-neutral-200 hover:bg-white/10'
              }`}
            >
              <div className="flex items-center gap-3">
                <LayoutDashboard className="h-4 w-4 text-amber-400" />
                <span>{lang === 'ur' ? 'کسٹمر ڈیش بورڈ (Customer Dashboard)' : 'Customer Travel Dashboard'}</span>
              </div>
              <span className="rounded bg-amber-400/20 px-1.5 py-0.5 text-[9px] font-bold text-amber-300">
                VIP
              </span>
            </button>

            {/* 3. Global Fleet Gallery */}
            <button
              onClick={() => {
                onSelectView('FLEET');
                onClose();
              }}
              className={`w-full flex items-center justify-between rounded-2xl px-4 py-3 text-xs font-semibold transition ${
                activeView === 'FLEET'
                  ? 'bg-amber-400 text-neutral-950 font-bold shadow-md shadow-amber-400/20'
                  : 'border border-white/10 bg-white/5 text-neutral-200 hover:bg-white/10'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="text-base">🇵🇰</span>
                <span>{lang === 'ur' ? 'عالمی فضائی بیڑہ (Fleet Gallery)' : 'Global Fleet Showcase'}</span>
              </div>
              <ChevronRight className="h-4 w-4 opacity-70" />
            </button>

            {/* 4. e-KYC Scanner */}
            <button
              onClick={() => {
                onClose();
                onOpenKyc();
              }}
              className="w-full flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-xs font-semibold text-neutral-200 hover:bg-white/10 transition"
            >
              <div className="flex items-center gap-3">
                <ShieldCheck className="h-4 w-4 text-cyan-400" />
                <span>{lang === 'ur' ? 'بائیو میٹرک پاسپورٹ اسکینر (e-KYC)' : 'Biometric e-KYC Scanner'}</span>
              </div>
              <span className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
            </button>
          </div>

          {/* Backup & Data Vault Section */}
          <div className="mt-6 pt-5 border-t border-white/10">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-300 mb-3">
              <Database className="h-4 w-4" />
              <span>{lang === 'ur' ? 'بیک اپ اور ڈیٹا سیکیورٹی' : 'Data Backup & Security'}</span>
            </div>

            <p className="text-[11px] text-neutral-400 leading-relaxed mb-3">
              {lang === 'ur'
                ? 'آپ کے سفری کوائف، شناختی کارڈ اور ٹکٹس ہمیشہ محفوظ رہتے ہیں۔ آپ بیک اپ ڈاؤنلوڈ بھی کر سکتے ہیں۔'
                : 'Your travel history, CNIC identity, and issued tickets are permanently preserved in the local secure vault.'}
            </p>

            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={onDownloadBackup}
                className="flex items-center justify-center gap-1.5 rounded-xl border border-amber-400/40 bg-amber-400/10 py-2 text-xs font-semibold text-amber-300 hover:bg-amber-400/20 transition"
              >
                <Download className="h-3.5 w-3.5" />
                <span>{lang === 'ur' ? 'بیک اپ ڈاؤنلوڈ' : 'Export Backup'}</span>
              </button>

              <label className="flex items-center justify-center gap-1.5 rounded-xl border border-white/15 bg-white/5 py-2 text-xs font-semibold text-neutral-300 hover:bg-white/10 cursor-pointer transition">
                <Upload className="h-3.5 w-3.5" />
                <span>{lang === 'ur' ? 'بیک اپ بحال کریں' : 'Restore'}</span>
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
