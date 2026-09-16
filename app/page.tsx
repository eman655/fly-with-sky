'use client';

import React, { useState, useEffect } from 'react';
import { Header } from '../components/Header';
import { FlightBookingEngine } from '../components/FlightBookingEngine';
import { InteractiveSeatMap } from '../components/InteractiveSeatMap';
import { PassportVerificationModal } from '../components/PassportVerificationModal';
import { BoardingPassModal } from '../components/BoardingPassModal';
import { AuthModal } from '../components/AuthModal';
import { LANGUAGES, TRANSLATIONS, FLIGHTS_CATALOG } from '../lib/i18n';
import {
  LanguageCode,
  CurrencyCode,
  Direction,
  Flight,
  Seat,
  CabinClass,
  KycPassportData,
  UserProfile,
  ConfirmedBooking
} from '../types/airline';
import { ShieldCheck, Plane, CheckCircle2, Ticket } from 'lucide-react';

export default function Home() {
  const [lang, setLang] = useState<LanguageCode>('ur'); // Default to Urdu for friendly local experience
  const [currency, setCurrency] = useState<CurrencyCode>('PKR'); // Default to PKR
  const [dir, setDir] = useState<Direction>('rtl');

  // Active User Profile (from localStorage)
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  // Booking & Flight Selection
  const [selectedFlight, setSelectedFlight] = useState<Flight>(FLIGHTS_CATALOG[0]);
  const [selectedCabin, setSelectedCabin] = useState<CabinClass>('economy');
  const [selectedSeats, setSelectedSeats] = useState<Seat[]>([]);
  const [kycData, setKycData] = useState<KycPassportData | null>(null);

  // Modals
  const [isKycOpen, setIsKycOpen] = useState(false);
  const [isBoardingPassOpen, setIsBoardingPassOpen] = useState(false);

  // Restore saved session from localStorage on mount
  useEffect(() => {
    try {
      const savedUser = localStorage.getItem('empyrean_current_user');
      if (savedUser) {
        setCurrentUser(JSON.parse(savedUser));
      }
    } catch {}
  }, []);

  const t = (key: string): string => {
    return TRANSLATIONS[lang]?.[key] || TRANSLATIONS.ur[key] || TRANSLATIONS.en[key] || key;
  };

  const handleLanguageChange = (newLang: LanguageCode) => {
    setLang(newLang);
    const meta = LANGUAGES[newLang];
    setDir(meta.dir);
    document.documentElement.dir = meta.dir;
    document.documentElement.lang = newLang;
  };

  const handleLogout = () => {
    setCurrentUser(null);
    try {
      localStorage.removeItem('empyrean_current_user');
    } catch {}
  };

  return (
    <div
      dir={dir}
      className="min-h-screen bg-[#070a12] text-neutral-100 selection:bg-amber-400 selection:text-black antialiased"
      style={{ fontFamily: LANGUAGES[lang].fontFamily }}
    >
      {/* Clean Global Header */}
      <Header
        currentLang={lang}
        onLanguageChange={handleLanguageChange}
        currentCurrency={currency}
        onCurrencyChange={setCurrency}
        currentUser={currentUser}
        onOpenAuth={() => setIsAuthModalOpen(true)}
        onLogout={handleLogout}
        onOpenKyc={() => setIsKycOpen(true)}
        t={t}
      />

      {/* Clean, Friendly Hero Section */}
      <section className="relative overflow-hidden pt-8 pb-10 border-b border-white/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-400/40 bg-amber-400/10 px-4 py-1 text-xs font-bold text-amber-300 mb-4">
            <span>✦ امپیریئن ایئرویز (EMPYREAN AIRWAYS) ✦</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
            {t('hero_title')}
          </h1>

          <p className="mt-3 mx-auto max-w-2xl text-sm sm:text-base text-neutral-300 leading-relaxed">
            {t('hero_subtitle')}
          </p>
        </div>
      </section>

      {/* Main Core: Step-by-Step Flight Booking & Passenger Identity Engine */}
      <FlightBookingEngine
        currentCurrency={currency}
        currentUser={currentUser}
        onBookingComplete={(booking: ConfirmedBooking) => {
          setSelectedFlight(booking.flight);
          setSelectedCabin(booking.cabin);
        }}
        t={t}
      />

      {/* Interactive 3D Seat Map */}
      <InteractiveSeatMap
        currentCurrency={currency}
        selectedSeats={selectedSeats}
        onSeatToggle={(seat) => {
          setSelectedSeats((prev) =>
            prev.some((s) => s.id === seat.id)
              ? prev.filter((s) => s.id !== seat.id)
              : [...prev, seat]
          );
        }}
        cabinClass={selectedCabin}
        t={t}
      />

      {/* Clean Footer */}
      <footer className="border-t border-white/10 bg-[#0a0e1a] py-8 text-xs text-neutral-400">
        <div className="mx-auto max-w-7xl px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <span className="font-serif text-base font-bold text-white">امپیریئن ایئرویز (EMPYREAN AIRWAYS)</span>
            <p className="text-[11px] text-neutral-500">حکومت سے منظور شدہ بین الاقوامی و ملکی پروازیں</p>
          </div>
          <div className="text-center sm:text-end text-[11px] text-neutral-500">
            24/7 ہیلپ لائن: 111-EMPYREAN (042-111-367-973) • لاہور، کراچی، اسلام آباد، دبئی
          </div>
        </div>
      </footer>

      {/* Authentication Modal (Register / Login with CNIC, Email, Phone) */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLoginSuccess={(user) => {
          setCurrentUser(user);
        }}
        t={t}
      />

      {/* e-KYC Modal */}
      <PassportVerificationModal
        isOpen={isKycOpen}
        onClose={() => setIsKycOpen(false)}
        destinationAirport={selectedFlight.destination}
        onVerificationSuccess={(data) => setKycData(data)}
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
