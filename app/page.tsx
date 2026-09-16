'use client';

import React, { useState, useEffect } from 'react';
import { Header } from '../components/Header';
import { FlightBookingEngine } from '../components/FlightBookingEngine';
import { InteractiveSeatMap } from '../components/InteractiveSeatMap';
import { PassportVerificationModal } from '../components/PassportVerificationModal';
import { BoardingPassModal } from '../components/BoardingPassModal';
import { LANGUAGES, TRANSLATIONS, FLIGHTS_MOCK } from '../lib/i18n';
import {
  LanguageCode,
  CurrencyCode,
  Direction,
  Flight,
  Seat,
  CabinClass,
  KycPassportData
} from '../types/airline';
import {
  ShieldCheck,
  Plane,
  Sparkles,
  Award,
  Crown,
  Coffee,
  Wifi,
  Compass,
  ArrowRight,
  Ticket,
  ChevronDown
} from 'lucide-react';

export default function Home() {
  const [lang, setLang] = useState<LanguageCode>('en');
  const [currency, setCurrency] = useState<CurrencyCode>('USD');
  const [dir, setDir] = useState<Direction>('ltr');

  // Booking state
  const [selectedFlight, setSelectedFlight] = useState<Flight>(FLIGHTS_MOCK[0]);
  const [selectedCabin, setSelectedCabin] = useState<CabinClass>('first_suite');
  const [selectedSeats, setSelectedSeats] = useState<Seat[]>([]);
  const [kycData, setKycData] = useState<KycPassportData | null>(null);

  // Modals
  const [isKycOpen, setIsKycOpen] = useState<boolean>(false);
  const [isBoardingPassOpen, setIsBoardingPassOpen] = useState<boolean>(false);

  // Translation helper
  const t = (key: string): string => {
    return TRANSLATIONS[lang]?.[key] || TRANSLATIONS.en[key] || key;
  };

  // Handle language change with automatic direction and default currency
  const handleLanguageChange = (newLang: LanguageCode) => {
    setLang(newLang);
    const meta = LANGUAGES[newLang];
    setDir(meta.dir);
    setCurrency(meta.defaultCurrency);
    document.documentElement.dir = meta.dir;
    document.documentElement.lang = newLang;
  };

  // Manual direction toggle
  const handleToggleDirection = () => {
    const nextDir = dir === 'ltr' ? 'rtl' : 'ltr';
    setDir(nextDir);
    document.documentElement.dir = nextDir;
  };

  const handleSeatToggle = (seat: Seat) => {
    setSelectedSeats((prev) => {
      const exists = prev.some((s) => s.id === seat.id);
      if (exists) {
        return prev.filter((s) => s.id !== seat.id);
      } else {
        return [...prev, seat];
      }
    });
  };

  return (
    <div
      dir={dir}
      className={`min-h-screen bg-[#07090e] text-neutral-100 selection:bg-amber-400 selection:text-black font-sans antialiased`}
      style={{ fontFamily: LANGUAGES[lang].fontFamily }}
    >
      {/* Dynamic Header */}
      <Header
        currentLang={lang}
        onLanguageChange={handleLanguageChange}
        currentCurrency={currency}
        onCurrencyChange={setCurrency}
        direction={dir}
        onToggleDirection={handleToggleDirection}
        onOpenKycModal={() => setIsKycOpen(true)}
        isKycVerified={!!kycData?.icaoVerified}
        t={t}
      />

      {/* Hero Flagship Presentation */}
      <section className="relative overflow-hidden pt-12 pb-16 lg:pt-20 lg:pb-24 border-b border-white/10">
        {/* Background Ambient Radial Glow */}
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 h-[600px] w-[1200px] bg-gradient-to-b from-amber-500/10 via-cyan-500/5 to-transparent blur-3xl pointer-events-none rounded-full" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            {/* VIP Crest Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-400/40 bg-gradient-to-r from-amber-500/10 to-transparent px-4 py-1.5 text-xs font-mono text-amber-300 shadow-lg shadow-amber-500/10">
              <Crown className="h-3.5 w-3.5 text-amber-400" />
              <span>THE SOVEREIGN SKY • INTERCONTINENTAL FLAGSHIP</span>
            </div>

            <h1 className="mt-6 font-serif text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-tight">
              A New Era of <br />
              <span className="bg-gradient-to-r from-amber-200 via-amber-400 to-amber-100 bg-clip-text text-transparent">
                Sovereign Aviation
              </span>
            </h1>

            <p className="mt-6 text-base sm:text-lg text-neutral-300 font-light leading-relaxed">
              Operating bespoke private suites across the globe. Unrivaled hospitality, Michelin-acclaimed culinary atelier, and seamless bank-grade biometric e-KYC for frictionless intercontinental passage.
            </p>

            {/* Quick Action Buttons */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <a
                href="#booking-engine"
                className="flex items-center gap-2 rounded-2xl bg-gradient-to-r from-amber-400 to-amber-500 px-6 py-3.5 text-sm font-semibold text-neutral-950 shadow-xl shadow-amber-500/20 hover:from-amber-300 hover:to-amber-400 transition transform hover:-translate-y-0.5"
              >
                <span>{t('btn_search_flights')}</span>
                <ArrowRight className="h-4 w-4" />
              </a>

              <button
                onClick={() => setIsKycOpen(true)}
                className="flex items-center gap-2 rounded-2xl border border-cyan-500/40 bg-cyan-950/40 px-6 py-3.5 text-sm font-semibold text-cyan-300 shadow-xl shadow-cyan-500/10 hover:bg-cyan-900/50 hover:border-cyan-300 transition transform hover:-translate-y-0.5"
              >
                <ShieldCheck className="h-4 w-4 text-cyan-400" />
                <span>{kycData ? t('badge_verified') : t('btn_kyc_verification')}</span>
              </button>

              <button
                onClick={() => setIsBoardingPassOpen(true)}
                className="flex items-center gap-2 rounded-2xl border border-white/15 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white hover:bg-white/10 transition"
              >
                <Ticket className="h-4 w-4 text-amber-400" />
                <span>View Boarding Pass</span>
              </button>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="mt-16 grid grid-cols-2 gap-4 border-t border-white/10 pt-8 sm:grid-cols-4">
            <div className="text-center">
              <span className="font-mono text-2xl sm:text-3xl font-bold text-white">Mach 0.86</span>
              <span className="block text-xs text-neutral-400 uppercase tracking-wider mt-1">
                Supersonic Cruise
              </span>
            </div>
            <div className="text-center">
              <span className="font-mono text-2xl sm:text-3xl font-bold text-amber-300">100% Lie-Flat</span>
              <span className="block text-xs text-neutral-400 uppercase tracking-wider mt-1">
                Enclosed Royal Suites
              </span>
            </div>
            <div className="text-center">
              <span className="font-mono text-2xl sm:text-3xl font-bold text-cyan-300">ICAO PKD</span>
              <span className="block text-xs text-neutral-400 uppercase tracking-wider mt-1">
                Biometric Clearance
              </span>
            </div>
            <div className="text-center">
              <span className="font-mono text-2xl sm:text-3xl font-bold text-white">3 Michelin*</span>
              <span className="block text-xs text-neutral-400 uppercase tracking-wider mt-1">
                Onboard Haute Cuisine
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Module 1: Flight Booking Engine */}
      <FlightBookingEngine
        currentCurrency={currency}
        onSelectFlight={(flight, cabin) => {
          setSelectedFlight(flight);
          setSelectedCabin(cabin);
        }}
        selectedFlightId={selectedFlight.id}
        t={t}
      />

      {/* Module 2: Interactive 3D Seat Map */}
      <InteractiveSeatMap
        currentCurrency={currency}
        selectedSeats={selectedSeats}
        onSeatToggle={handleSeatToggle}
        cabinClass={selectedCabin}
        t={t}
      />

      {/* Module 3: Sovereign Flagship Privileges Grid */}
      <section id="dining" className="py-16 border-t border-white/10 bg-[#090d16]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="font-mono text-xs uppercase tracking-wider text-amber-400">
              HAUTE LIVING AT 40,000 FEET
            </span>
            <h2 className="mt-2 font-serif text-3xl font-bold text-white">
              The Art of Sovereign Travel
            </h2>
            <p className="mt-2 text-sm text-neutral-400">
              Every detail is meticulously curated to deliver uncompromising comfort and distinction.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-8 hover:border-amber-400/40 transition">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-400/10 text-amber-400 mb-6">
                <Crown className="h-6 w-6" />
              </div>
              <h3 className="font-serif text-xl font-bold text-white mb-2">Royal Private Suites</h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Full-height motorized sliding doors, personal wardrobe, temperature-controlled bed, and dedicated private butler service throughout your voyage.
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-8 hover:border-cyan-400/40 transition">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-400/10 text-cyan-400 mb-6">
                <Coffee className="h-6 w-6" />
              </div>
              <h3 className="font-serif text-xl font-bold text-white mb-2">Michelin Dining Atelier</h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Unlimited Beluga caviar service, vintage Krug champagne, customized Halal gourmet creations, and dining on-demand prepared fresh aloft.
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-8 hover:border-emerald-400/40 transition">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-400/10 text-emerald-400 mb-6">
                <Wifi className="h-6 w-6" />
              </div>
              <h3 className="font-serif text-xl font-bold text-white mb-2">Low-Earth Orbit Wi-Fi</h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Uncapped multi-gigabit Starlink connectivity with 4K streaming, zero latency videoconferencing, and private cryptographic encrypted satellite tunnels.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-black/80 py-12 text-xs text-neutral-400">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <span className="font-serif text-lg font-bold tracking-widest text-white">
                AURA AERO
              </span>
              <p className="mt-1 text-neutral-500">
                International Flagship Airline • Sovereign Aviation Group LLC
              </p>
            </div>
            <div className="flex items-center gap-6 font-mono text-[11px]">
              <span>ICAO CODE: AUA</span>
              <span>IATA CODE: AU</span>
              <span>RADIO: AURA FLAGSHIP</span>
            </div>
          </div>
          <div className="mt-8 border-t border-white/5 pt-6 text-center text-[10px] text-neutral-600">
            © 2026 AURA AERO. All global rights reserved. Certified under International Civil Aviation Organization (ICAO Doc 9303).
          </div>
        </div>
      </footer>

      {/* e-KYC Passport Camera Modal */}
      <PassportVerificationModal
        isOpen={isKycOpen}
        onClose={() => setIsKycOpen(false)}
        destinationAirport={selectedFlight.destination}
        onVerificationSuccess={(data) => {
          setKycData(data);
        }}
        t={t}
      />

      {/* Boarding Pass Modal */}
      <BoardingPassModal
        isOpen={isBoardingPassOpen}
        onClose={() => setIsBoardingPassOpen(false)}
        flight={selectedFlight}
        seat={selectedSeats[0] || null}
        kycData={kycData}
        currentCurrency={currency}
        t={t}
      />
    </div>
  );
}
