'use client';

import React, { useState, useEffect } from 'react';
import { Header } from '../components/Header';
import { FleetGallery } from '../components/FleetGallery';
import { Footer } from '../components/Footer';
import { SideDrawer } from '../components/SideDrawer';
import { CustomerDashboard } from '../components/CustomerDashboard';
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

  // View state: 'MAIN' vs 'DASHBOARD'
  const [currentView, setCurrentView] = useState<'MAIN' | 'DASHBOARD'>('MAIN');

  // Active User Profile & Permanent Travel History
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [travelHistory, setTravelHistory] = useState<any[]>([]);

  // Navigation Modals
  const [isSideDrawerOpen, setIsSideDrawerOpen] = useState(false);
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
      } else {
        const defaultUser: UserProfile = {
          fullName: 'Hamza Latif',
          cnic: '31302-5257137-7',
          phone: '+92 300 1234567',
          email: 'hamza.latif@flywithsky.com',
          nationality: 'Pakistan',
          loyaltyTier: 'Empyrean VIP',
          milesBalance: 18500
        };
        setCurrentUser(defaultUser);
        localStorage.setItem('flywithsky_user', JSON.stringify(defaultUser));
      }

      const savedHistory = localStorage.getItem('flywithsky_bookings');
      if (savedHistory) {
        setTravelHistory(JSON.parse(savedHistory));
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

  // Backup Export
  const handleDownloadBackup = () => {
    const backupData = {
      airline: 'The Fly With Sky',
      timestamp: new Date().toISOString(),
      customerProfile: currentUser,
      travelHistory: travelHistory,
      preferences: { currency, lang }
    };

    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(backupData, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `TheFlyWithSky_Backup_${currentUser?.cnic || 'Customer'}_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    alert('Customer data backup successfully exported and saved to your device!');
  };

  // Backup Restore
  const handleRestoreBackup = (e: any) => {
    const fileReader = new FileReader();
    if (e.target.files && e.target.files[0]) {
      fileReader.readAsText(e.target.files[0], 'UTF-8');
      fileReader.onload = (event: any) => {
        try {
          const parsed = JSON.parse(event.target.result);
          if (parsed.customerProfile) {
            setCurrentUser(parsed.customerProfile);
            localStorage.setItem('flywithsky_user', JSON.stringify(parsed.customerProfile));
          }
          if (parsed.travelHistory && Array.isArray(parsed.travelHistory)) {
            setTravelHistory(parsed.travelHistory);
            localStorage.setItem('flywithsky_bookings', JSON.stringify(parsed.travelHistory));
          }
          alert('Backup restored successfully! All past flight records restored.');
          setIsSideDrawerOpen(false);
          setCurrentView('DASHBOARD');
        } catch (err) {
          alert('Invalid backup file format.');
        }
      };
    }
  };

  return (
    <div
      dir={dir}
      className="min-h-screen bg-[#060a14] text-neutral-100 selection:bg-amber-400 selection:text-black antialiased flex flex-col justify-between"
      style={{ fontFamily: LANGUAGES[lang].fontFamily }}
    >
      {/* 1. Header with Side Drawer Hamburger Trigger */}
      <Header
        currentLang={lang}
        onLanguageChange={handleLanguageChange}
        currentCurrency={currency}
        onCurrencyChange={setCurrency}
        currentUser={currentUser}
        onOpenAuth={() => setIsAuthModalOpen(true)}
        onLogout={handleLogout}
        onOpenKyc={() => setIsKycOpen(true)}
        onOpenSideDrawer={() => setIsSideDrawerOpen(true)}
        onOpenDashboard={() => setCurrentView('DASHBOARD')}
        t={t}
      />

      {/* 2. Side Drawer (Pop-up Side Menu) */}
      <SideDrawer
        isOpen={isSideDrawerOpen}
        onClose={() => setIsSideDrawerOpen(false)}
        currentUser={currentUser}
        activeView={currentView}
        onSelectView={(v: any) => {
          if (v === 'MAIN' || v === 'DASHBOARD') setCurrentView(v);
        }}
        onOpenAuth={() => setIsAuthModalOpen(true)}
        onLogout={handleLogout}
        onOpenKyc={() => setIsKycOpen(true)}
        onDownloadBackup={handleDownloadBackup}
        onRestoreBackup={handleRestoreBackup}
        lang={lang}
        currency={currency}
        onLanguageChange={handleLanguageChange}
        onCurrencyChange={setCurrency}
      />

      <main className="flex-1">
        {currentView === 'DASHBOARD' ? (
          /* Dedicated Customer Dashboard */
          <CustomerDashboard
            currentUser={currentUser}
            travelHistory={travelHistory}
            onOpenBooking={() => setCurrentView('MAIN')}
            onDownloadBackup={handleDownloadBackup}
            onRestoreBackup={handleRestoreBackup}
            onPrintTicket={(booking: any) => {
              setSelectedFlight(booking.flight);
              setIsBoardingPassOpen(true);
            }}
            currencyConfig={currency}
            lang={lang}
          />
        ) : (
          /* Main Public Booking Experience */
          <>
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

            {/* Core Flight Booking Engine */}
            <FlightBookingEngine
              currentCurrency={currency}
              currentUser={currentUser}
              onBookingComplete={(booking: ConfirmedBooking) => {
                setSelectedFlight(booking.flight);
                setSelectedCabin(booking.cabin);
                const updated = [booking, ...travelHistory];
                setTravelHistory(updated);
                localStorage.setItem('flywithsky_bookings', JSON.stringify(updated));
                setIsBoardingPassOpen(true);
              }}
              t={t}
            />

            {/* Global Aircraft Fleet Showcase */}
            <FleetGallery
              onSelectAircraft={(aircraft: any) => {
                const el = document.getElementById('booking');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              lang={lang}
              t={t}
            />

            {/* 3D Seat Map */}
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
          </>
        )}
      </main>

      {/* 3. Footer with Developed by Hamza Latif */}
      <Footer lang={lang} />

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLoginSuccess={(user: any) => {
          setCurrentUser(user);
        }}
        lang={lang}
        t={t}
      />

      {/* WebRTC Live Camera Passport Scanner */}
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
