'use client';

import React, { useState, useEffect } from 'react';
import { Header } from '../components/Header';
import { FleetGallery } from '../components/FleetGallery';
import { Footer } from '../components/Footer';
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

export default function Home() {
  const [lang, setLang] = useState<LanguageCode>('en');
  const [currency, setCurrency] = useState<CurrencyCode>('PKR');
  const [dir, setDir] = useState<Direction>('ltr');

  // Active User Profile
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

  useEffect(() => {
    try {
      const savedUser = localStorage.getItem('flywithsky_user');
      if (savedUser) {
        setCurrentUser(JSON.parse(savedUser));
      }
    } catch {}
  }, []);

  const t = (key: string): string => {
    return TRANSLATIONS[lang]?.[key] || TRANSLATIONS.en[key] || key;
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
      localStorage.removeItem('flywithsky_user');
    } catch {}
  };

  return (
    <div
      dir={dir}
      className="min-h-screen bg-[#060a14] text-neutral-100 selection:bg-amber-400 selection:text-black antialiased flex flex-col justify-between"
      style={{ fontFamily: LANGUAGES[lang].fontFamily }}
    >
      {/* 1. Master Header with "The Fly With Sky" Branding */}
      <Header
        currentLang={lang}
        onLanguageChange={handleLanguageChange}
        currentCurrency={currency}
        onCurrencyChange={setCurrency}
        currentUser={currentUser}
        onOpenAuth={() => setIsAuthModalOpen(true)}
        onLogout={handleLogout}
        onOpenKyc={() => setIsKycOpen(true)}
        onViewBookings={() => setIsBoardingPassOpen(true)}
        t={t}
      />

      <main className="flex-1">
        {/* 2. Elevated Hero Section */}
        <section id="hero" className="relative py-12 lg:py-16 px-4 text-center border-b border-white/10 bg-gradient-to-b from-[#080d19] to-[#060a14]">
          <div className="max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-400/40 bg-amber-400/10 px-4 py-1.5 text-xs font-bold text-amber-300 mb-4 shadow-md">
              <span>✦ The Fly With Sky — Flagship Global Aviation ✦</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-6xl font-bold tracking-tight text-white leading-tight">
              {lang === 'ur'
                ? 'دی فلائی ود سکائی — ایک باوقار سفر کا آغاز'
                : 'Fly with Grace, Luxury & Complete Ease'}
            </h1>

            <p className="mt-4 text-sm sm:text-base text-neutral-300 max-w-2xl mx-auto leading-relaxed">
              {lang === 'ur'
                ? 'لاہور، کراچی، اسلام آباد، دبئی، نیویارک اور لندن کے لیے پریمیئر پروازیں سب سے شفاف کرایوں اور شاہی انداز میں بک کریں۔'
                : 'Experience intercontinental flagship routes connecting Lahore, Karachi, Islamabad, Dubai, New York, and London with effortless digital booking.'}
            </p>
          </div>
        </section>

        {/* 3. Core Flight Booking Engine (Mandatory CNIC & Phone data before booking) */}
        <FlightBookingEngine
          currentCurrency={currency}
          currentUser={currentUser}
          onBookingComplete={(booking: ConfirmedBooking) => {
            setSelectedFlight(booking.flight);
            setSelectedCabin(booking.cabin);
            setIsBoardingPassOpen(true);
          }}
          t={t}
        />

        {/* 4. Global Aircraft Fleet Gallery with Country-Specific Liveries */}
        <FleetGallery
          onSelectAircraft={(aircraft) => {
            const el = document.getElementById('booking');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          lang={lang}
          t={t}
        />

        {/* 5. 3D Aircraft Cabin Seat Map */}
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
      </main>

      {/* 6. Footer with Mandatory "Developed by Hamza Latif" Signature */}
      <Footer lang={lang} />

      {/* Mandatory Auth Modal (CNIC / ID Card & Phone Auth with OTP) */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLoginSuccess={(user) => {
          setCurrentUser(user);
        }}
        lang={lang}
        t={t}
      />

      {/* WebRTC Live Camera Passport Scanner & e-KYC Verification Modal */}
      <PassportVerificationModal
        isOpen={isKycOpen}
        onClose={() => setIsKycOpen(false)}
        destinationAirport={selectedFlight.destination}
        onVerificationSuccess={(data) => setKycData(data)}
        t={t}
      />

      {/* Digital Boarding Pass Modal */}
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
