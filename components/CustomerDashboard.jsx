import React, { useState } from 'react';
import {
  User,
  Ticket,
  ShieldCheck,
  Database,
  Award,
  Calendar,
  Clock,
  Download,
  Upload,
  Printer,
  Sparkles,
  Plane,
  Luggage,
  CheckCircle2,
  Lock,
  RefreshCw,
  CreditCard
} from 'lucide-react';

export const CustomerDashboard = ({
  currentUser,
  travelHistory = [],
  onOpenBooking,
  onDownloadBackup,
  onRestoreBackup,
  onPrintTicket,
  currencyConfig,
  lang = 'en'
}) => {
  const [activeTab, setActiveTab] = useState('BOOKINGS'); // 'BOOKINGS' | 'PROFILE' | 'BACKUP' | 'MILES'

  // Default fallback user if not logged in
  const user = currentUser || {
    name: 'Hamza Latif',
    cnic: '31302-5257137-7',
    phone: '+92 300 1234567',
    email: 'hamza.latif@flywithsky.com',
    tier: 'Empyrean VIP Flagship',
    miles: 18500
  };

  return (
    <section className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full animate-in fade-in">
      {/* Dashboard Top Banner */}
      <div className="relative overflow-hidden rounded-3xl border border-amber-400/30 bg-gradient-to-r from-[#0d1629] via-[#101b33] to-[#0d1629] p-6 sm:p-8 shadow-2xl mb-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 text-neutral-950 font-bold text-2xl shadow-lg shadow-amber-500/20">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-serif text-2xl sm:text-3xl font-bold text-white">
                  {user.name}
                </h1>
                <span className="rounded-full bg-amber-400/20 px-2.5 py-0.5 text-xs font-bold text-amber-300 border border-amber-400/30">
                  {lang === 'ur' ? 'وی آئی پی مسافر' : 'VIP Passenger'}
                </span>
              </div>
              <p className="text-xs text-neutral-400 mt-1 font-mono">
                CNIC: <span className="text-amber-300 font-bold">{user.cnic}</span> • {user.phone}
              </p>
              <div className="flex items-center gap-3 mt-2 text-xs">
                <span className="flex items-center gap-1 text-emerald-400 font-semibold">
                  <ShieldCheck className="h-4 w-4" /> NADRA CNIC Verified ✓
                </span>
                <span className="text-neutral-500">•</span>
                <span className="flex items-center gap-1 text-cyan-300 font-semibold">
                  <Sparkles className="h-3.5 w-3.5" /> 18,500 SkyMiles Active
                </span>
              </div>
            </div>
          </div>

          {/* Quick Action Button to Book New Flight */}
          <div className="flex flex-wrap gap-2.5">
            <button
              onClick={onOpenBooking}
              className="flex items-center gap-2 rounded-2xl bg-gradient-to-r from-amber-400 to-amber-500 px-5 py-3 text-xs font-bold text-neutral-950 shadow-lg shadow-amber-400/20 hover:from-amber-300 transition"
            >
              <Plane className="h-4 w-4" />
              <span>{lang === 'ur' ? 'نئی پرواز بک کریں' : 'Book New Flight'}</span>
            </button>

            <button
              onClick={onDownloadBackup}
              className="flex items-center gap-2 rounded-2xl border border-white/15 bg-white/5 px-4 py-3 text-xs font-semibold text-neutral-200 hover:bg-white/10 transition"
              title="Download Data Backup"
            >
              <Download className="h-4 w-4 text-amber-400" />
              <span>{lang === 'ur' ? 'ڈیٹا بیک اپ محفوظ کریں' : 'Backup My Data'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Dashboard Tabs Bar */}
      <div className="flex flex-wrap gap-2 border-b border-white/10 pb-4 mb-6">
        {[
          { id: 'BOOKINGS', label: lang === 'ur' ? 'میری پروازیں اور ٹکٹس (Flight History)' : 'My Flights & PNR History', icon: Ticket },
          { id: 'PROFILE', label: lang === 'ur' ? 'شناختی کارڈ و کوائف (Identity)' : 'Identity & CNIC Profile', icon: User },
          { id: 'BACKUP', label: lang === 'ur' ? 'بیک اپ اور ڈیٹا سیکیورٹی (Backup & Vault)' : 'Data Backup & Security Vault', icon: Database },
          { id: 'MILES', label: lang === 'ur' ? 'انعامات اور لاؤنج (Rewards)' : 'Rewards & VIP Lounge', icon: Award }
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 rounded-2xl px-4 py-2.5 text-xs font-bold transition-all ${
                activeTab === tab.id
                  ? 'bg-amber-400 text-neutral-950 shadow-lg shadow-amber-400/20'
                  : 'border border-white/10 bg-white/5 text-neutral-300 hover:border-white/20'
              }`}
            >
              <Icon className="h-4 w-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: PERMANENT TRAVEL HISTORY & BOOKED TICKETS */}
      {activeTab === 'BOOKINGS' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center px-1">
            <h3 className="font-serif text-lg font-bold text-white">
              {lang === 'ur' ? 'آپ کی محفوظ شدہ پروازیں اور ہسٹری' : 'Confirmed Flights & Lifetime Travel History'}
            </h3>
            <span className="text-xs text-amber-300 font-mono">
              {travelHistory.length} {lang === 'ur' ? 'ٹکٹس محفوظ ہیں' : 'Records in Secure Storage'}
            </span>
          </div>

          {travelHistory.length > 0 ? (
            travelHistory.map((booking, idx) => (
              <div
                key={idx}
                className="rounded-3xl border border-white/15 bg-gradient-to-b from-[#0d1629] to-[#070b14] p-6 shadow-xl hover:border-amber-400/40 transition"
              >
                <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-sm font-bold text-neutral-950 bg-amber-400 px-2.5 py-0.5 rounded-lg">
                        PNR: {booking.pnr}
                      </span>
                      <span className="rounded bg-emerald-500/20 text-emerald-400 px-2 py-0.5 text-[10px] font-bold border border-emerald-500/30">
                        CONFIRMED & CLEARED
                      </span>
                      <span className="text-xs text-neutral-400 font-mono">
                        ETicket: {booking.ticketNo || '724-8921402'}
                      </span>
                    </div>

                    <div className="mt-3">
                      <span className="font-serif text-base font-bold text-white">
                        {booking.flight.origin.city} ({booking.flight.origin.iata}) ➔ {booking.flight.destination.city} ({booking.flight.destination.iata})
                      </span>
                      <p className="text-xs text-neutral-400 mt-0.5">
                        {booking.flight.flightNumber} • {booking.flight.aircraft} • Seat {booking.seat}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-6 text-center">
                    <div>
                      <span className="font-mono text-xl font-bold text-white">{booking.flight.departureTime}</span>
                      <span className="block text-[11px] text-amber-300">{booking.flight.origin.iata}</span>
                    </div>
                    <div className="text-xs text-neutral-400 font-mono">
                      <span>{booking.flight.duration}</span>
                      <div className="h-[2px] w-20 bg-gradient-to-r from-amber-400 to-cyan-400 my-1 mx-auto" />
                    </div>
                    <div>
                      <span className="font-mono text-xl font-bold text-white">{booking.flight.arrivalTime}</span>
                      <span className="block text-[11px] text-cyan-300">{booking.flight.destination.iata}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => onPrintTicket && onPrintTicket(booking)}
                      className="flex items-center gap-2 rounded-2xl bg-gradient-to-r from-amber-400 to-amber-500 px-5 py-2.5 text-xs font-bold text-neutral-950 shadow-md hover:from-amber-300 transition"
                    >
                      <Printer className="h-4 w-4" />
                      <span>{lang === 'ur' ? 'ٹکٹ پرنٹ کریں' : 'Print E-Ticket'}</span>
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="rounded-3xl border border-white/10 bg-[#0d1629] p-10 text-center">
              <div className="h-14 w-14 rounded-2xl bg-white/5 flex items-center justify-center text-amber-300 text-2xl mx-auto mb-3">
                ✈
              </div>
              <h4 className="font-serif text-lg font-bold text-white">
                {lang === 'ur' ? 'ابھی کوئی پرواز محفوظ نہیں ہے' : 'No Booked Flights Yet'}
              </h4>
              <p className="text-xs text-neutral-400 mt-1 max-w-md mx-auto">
                {lang === 'ur'
                  ? 'جب آپ اپنی پہلی پرواز بک کریں گے تو وہ یہاں مستقل طور پر محفوظ ہو جائے گی اور آپ کبھی بھی ٹکٹ نکال سکیں گے۔'
                  : 'Book your first flagship flight. Once confirmed, your records remain permanently stored in your secure customer vault.'}
              </p>
              <button
                onClick={onOpenBooking}
                className="mt-5 rounded-2xl bg-gradient-to-r from-amber-400 to-amber-500 px-6 py-2.5 text-xs font-bold text-neutral-950 shadow-md hover:from-amber-300 transition"
              >
                {lang === 'ur' ? 'ابھی پرواز تلاش کریں' : 'Book Your First Flight'}
              </button>
            </div>
          )}
        </div>
      )}

      {/* TAB 2: IDENTITY & CNIC PROFILE */}
      {activeTab === 'PROFILE' && (
        <div className="rounded-3xl border border-white/15 bg-[#0d1629] p-6 sm:p-8 shadow-xl">
          <h3 className="font-serif text-lg font-bold text-white mb-4">
            {lang === 'ur' ? 'مستقل مسافر شناخت (Permanent Passenger Profile)' : 'Verified Passenger Profile'}
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <span className="text-neutral-400 block">{lang === 'ur' ? 'پورا قانونی نام' : 'Full Legal Name'}:</span>
              <span className="font-bold text-white text-base mt-0.5 block">{user.name}</span>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <span className="text-neutral-400 block">{lang === 'ur' ? 'قومی شناختی کارڈ نمبر' : 'National ID / CNIC'}:</span>
              <span className="font-mono font-bold text-amber-300 text-base mt-0.5 block">{user.cnic}</span>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <span className="text-neutral-400 block">{lang === 'ur' ? 'موبائل و واٹس ایپ' : 'Mobile Phone'}:</span>
              <span className="font-mono font-bold text-white text-base mt-0.5 block">{user.phone}</span>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <span className="text-neutral-400 block">{lang === 'ur' ? 'ای میل ایڈریس' : 'Email Address'}:</span>
              <span className="font-bold text-white text-base mt-0.5 block">{user.email}</span>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: BACKUP & DATA SECURITY VAULT */}
      {activeTab === 'BACKUP' && (
        <div className="rounded-3xl border border-amber-400/30 bg-[#0d1629] p-6 sm:p-8 shadow-xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-400/10 text-amber-400 border border-amber-400/30">
              <Database className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold text-white">
                {lang === 'ur' ? 'ڈیٹا بیک اپ و سیکیورٹی سنٹر' : 'Customer Data Backup & Security Vault'}
              </h3>
              <p className="text-xs text-neutral-400">
                {lang === 'ur'
                  ? 'آپ کی تمام پروازوں، ٹکٹس اور شناختی معلومات کا محفوظ بیک اپ'
                  : 'Encrypted export and restoration of all customer flight vouchers, PNR records, and profile telemetry.'}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Export Backup Card */}
            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5 flex flex-col justify-between">
              <div>
                <span className="font-bold text-amber-300 text-sm block mb-1">
                  {lang === 'ur' ? '1. ڈاؤنلوڈ ڈیٹا بیک اپ (Export JSON)' : '1. Download Backup File (JSON)'}
                </span>
                <p className="text-xs text-neutral-300 leading-relaxed mb-4">
                  {lang === 'ur'
                    ? 'ایک کلک پر اپنی تمام پروازوں اور ٹکٹس کا مکمل بیک اپ اپنے کمپیوٹر پر محفوظ کر لیں تاکہ آپ کا ڈیٹا کبھی ضائع نہ ہو۔'
                    : 'Download a complete encrypted archive of your travel history and issued e-tickets to keep permanently.'}
                </p>
              </div>

              <button
                onClick={onDownloadBackup}
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 py-3 text-xs font-bold text-neutral-950 shadow-md hover:from-amber-300 transition"
              >
                <Download className="h-4 w-4" />
                <span>{lang === 'ur' ? 'ابھی بیک اپ ڈاؤنلوڈ کریں' : 'Download Backup File'}</span>
              </button>
            </div>

            {/* Restore Backup Card */}
            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5 flex flex-col justify-between">
              <div>
                <span className="font-bold text-cyan-300 text-sm block mb-1">
                  {lang === 'ur' ? '2. بیک اپ بحال کریں (Restore Backup)' : '2. Restore Previous Backup'}
                </span>
                <p className="text-xs text-neutral-300 leading-relaxed mb-4">
                  {lang === 'ur'
                    ? 'کسی بھی دوسرے کمپیوٹر یا براؤزر پر اپنی پرانی فائل اپ لوڈ کر کے تمام ٹکٹس اور ہسٹری واپس لائیں۔'
                    : 'Upload your saved backup file on any device or browser to instantly restore all past flight vouchers and profile data.'}
                </p>
              </div>

              <label className="w-full flex items-center justify-center gap-2 rounded-xl border border-cyan-400/40 bg-cyan-950/40 py-3 text-xs font-bold text-cyan-300 shadow-md hover:bg-cyan-900/40 cursor-pointer transition">
                <Upload className="h-4 w-4" />
                <span>{lang === 'ur' ? 'بیک اپ فائل منتخب کریں' : 'Choose Backup File'}</span>
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
      )}

      {/* TAB 4: MILES & VIP REWARDS */}
      {activeTab === 'MILES' && (
        <div className="rounded-3xl border border-white/15 bg-[#0d1629] p-6 sm:p-8 shadow-xl">
          <div className="flex justify-between items-center border-b border-white/10 pb-4 mb-6">
            <div>
              <h3 className="font-serif text-lg font-bold text-white">
                {lang === 'ur' ? 'سوورن سرکل مائلز اور مراعات' : 'Empyrean SkyMiles & Lounge Privileges'}
              </h3>
              <p className="text-xs text-neutral-400">Exclusive VIP Benefits on Flagship Intercontinental Flights</p>
            </div>
            <span className="font-mono text-xl font-bold text-amber-300">18,500 Miles</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <span className="font-bold text-white block mb-1">VIP Lounge Pass</span>
              <span className="text-neutral-400">Lahore (LHE) & Dubai (DXB) Priority Alpha Lounge Access</span>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <span className="font-bold text-white block mb-1">Extra Baggage Allowance</span>
              <span className="text-neutral-400">+10 kg Complimentary baggage voucher attached to CNIC</span>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <span className="font-bold text-white block mb-1">Chauffeur Drive Service</span>
              <span className="text-neutral-400">Private luxury limousine transfer on all Royal Suite reservations</span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
