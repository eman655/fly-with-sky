'use client';

import React, { useState, useEffect } from 'react';
import { Airport, CabinClass, Flight, CurrencyCode, UserProfile, PassengerBookingDetails, ConfirmedBooking } from '../types/airline';
import { AIRPORTS, FLIGHTS_CATALOG, CURRENCIES } from '../lib/i18n';
import {
  PlaneTakeoff,
  PlaneLanding,
  Calendar,
  Users,
  Search,
  ArrowRightLeft,
  CheckCircle2,
  Luggage,
  Coffee,
  Clock,
  ChevronRight,
  Printer,
  Sparkles
} from 'lucide-react';

interface FlightBookingEngineProps {
  currentCurrency: CurrencyCode;
  currentUser: UserProfile | null;
  onBookingComplete: (booking: ConfirmedBooking) => void;
  t: (key: string) => string;
}

export const FlightBookingEngine: React.FC<FlightBookingEngineProps> = ({
  currentCurrency,
  currentUser,
  onBookingComplete,
  t
}) => {
  // Booking Wizard Step: 'SEARCH' | 'PASSENGER_FORM' | 'CONFIRMED'
  const [step, setStep] = useState<'SEARCH' | 'PASSENGER_FORM' | 'CONFIRMED'>('SEARCH');

  // Search State
  const [origin, setOrigin] = useState<Airport>(AIRPORTS[0]); // Lahore (LHE)
  const [destination, setDestination] = useState<Airport>(AIRPORTS[3]); // Dubai (DXB)
  const [departDate, setDepartDate] = useState<string>('2026-10-20');
  const [cabinClass, setCabinClass] = useState<CabinClass>('economy');
  const [passengersCount, setPassengersCount] = useState<number>(1);

  // Selected Flight for Booking
  const [selectedFlight, setSelectedFlight] = useState<Flight>(FLIGHTS_CATALOG[0]);
  const [filteredFlights, setFilteredFlights] = useState<Flight[]>(FLIGHTS_CATALOG);

  // Passenger Personal Data (What the user enters to book)
  const [passengerData, setPassengerData] = useState<PassengerBookingDetails>({
    fullName: currentUser?.fullName || '',
    cnic: currentUser?.cnic || '',
    passportNumber: currentUser?.passportNumber || '',
    phone: currentUser?.phone || '',
    email: currentUser?.email || '',
    dateOfBirth: '1995-06-15',
    gender: 'M',
    mealPreference: 'Halal Chicken Biryani (حلال سپیشل بریانی)',
    specialAssistance: 'None'
  });

  // Confirmed booking record
  const [latestBooking, setLatestBooking] = useState<ConfirmedBooking | null>(null);

  const currencyConfig = CURRENCIES[currentCurrency];

  // Auto-fill passenger details if user logs in
  useEffect(() => {
    if (currentUser) {
      setPassengerData((prev) => ({
        ...prev,
        fullName: prev.fullName || currentUser.fullName,
        cnic: prev.cnic || currentUser.cnic,
        phone: prev.phone || currentUser.phone,
        email: prev.email || currentUser.email,
        passportNumber: prev.passportNumber || currentUser.passportNumber || ''
      }));
    }
  }, [currentUser]);

  // Handle Airport Swap
  const handleSwapAirports = () => {
    const temp = origin;
    setOrigin(destination);
    setDestination(temp);
  };

  // Quick Preset Route selector
  const setQuickRoute = (origIata: string, destIata: string) => {
    const o = AIRPORTS.find((a) => a.iata === origIata) || AIRPORTS[0];
    const d = AIRPORTS.find((a) => a.iata === destIata) || AIRPORTS[3];
    setOrigin(o);
    setDestination(d);

    const matches = FLIGHTS_CATALOG.filter(
      (f) => f.origin.iata === origIata && f.destination.iata === destIata
    );
    if (matches.length > 0) {
      setFilteredFlights(matches);
      setSelectedFlight(matches[0]);
    } else {
      setFilteredFlights(FLIGHTS_CATALOG);
    }
  };

  // Filter flights on Search
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const matches = FLIGHTS_CATALOG.filter(
      (f) => f.origin.iata === origin.iata && f.destination.iata === destination.iata
    );
    if (matches.length > 0) {
      setFilteredFlights(matches);
    } else {
      // If exact route not mocked, show flagship connection
      setFilteredFlights([
        {
          id: `EMP-${origin.iata}${destination.iata}`,
          flightNumber: `EMP 892`,
          origin: origin,
          destination: destination,
          departureTime: '10:30',
          arrivalTime: '18:45',
          duration: '8h 15m',
          aircraft: 'Boeing 777-300ER Executive',
          stops: origin.isDomestic && destination.isDomestic ? 0 : 1,
          stopDescription: origin.isDomestic && destination.isDomestic ? 'Direct Flight' : 'Via Dubai Hub',
          basePricesUSD: { economy: 450, business: 1200, first_suite: 3200 },
          baggageAllowance: '30kg Check-in + 7kg Cabin Bag',
          mealIncluded: 'Halal Gourmet Dining Service'
        }
      ]);
    }
  };

  // Proceed to Step 2: Passenger Data
  const handleSelectFlight = (flight: Flight) => {
    setSelectedFlight(flight);
    setStep('PASSENGER_FORM');
    // Scroll smoothly to form
    window.scrollTo({ top: 350, behavior: 'smooth' });
  };

  // Step 3: Confirm Ticket & Issue PNR
  const handleConfirmTicket = (e: React.FormEvent) => {
    e.preventDefault();
    const pnr = 'EMP-' + Math.floor(1000 + Math.random() * 9000);
    const eTicket = '724-' + Math.floor(1000000000 + Math.random() * 9000000000);
    const seatChoice = cabinClass === 'first_suite' ? '1A' : cabinClass === 'business' ? '3A' : '12F';

    const confirmed: ConfirmedBooking = {
      pnr,
      eTicketNumber: eTicket,
      flight: selectedFlight,
      cabin: cabinClass,
      passenger: passengerData,
      seatId: seatChoice,
      totalPaidUSD: selectedFlight.basePricesUSD[cabinClass] * passengersCount,
      bookingDate: new Date().toLocaleDateString('en-GB'),
      status: 'ISSUED'
    };

    setLatestBooking(confirmed);
    setStep('CONFIRMED');
    onBookingComplete(confirmed);
  };

  return (
    <section id="booking" className="py-6 px-4 max-w-7xl mx-auto">
      {/* QUICK POPULAR ROUTES BAR (Lahore -> Dubai, Lahore -> Karachi, Lahore -> New York, Karachi -> New York) */}
      <div className="mb-6 flex flex-wrap items-center justify-center gap-2">
        <span className="text-xs font-medium text-neutral-400 me-2">مقبول ترین پروازیں (Quick Routes):</span>
        <button
          onClick={() => setQuickRoute('LHE', 'DXB')}
          className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-neutral-200 hover:border-amber-400 hover:text-amber-300 transition"
        >
          لاہور ⇄ دبئی (LHE - DXB)
        </button>
        <button
          onClick={() => setQuickRoute('LHE', 'KHI')}
          className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-neutral-200 hover:border-amber-400 hover:text-amber-300 transition"
        >
          لاہور ⇄ کراچی (LHE - KHI)
        </button>
        <button
          onClick={() => setQuickRoute('LHE', 'JFK')}
          className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-neutral-200 hover:border-amber-400 hover:text-amber-300 transition"
        >
          لاہور ⇄ نیویارک (LHE - JFK)
        </button>
        <button
          onClick={() => setQuickRoute('KHI', 'JFK')}
          className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-neutral-200 hover:border-amber-400 hover:text-amber-300 transition"
        >
          کراچی ⇄ نیویارک (KHI - JFK)
        </button>
      </div>

      {/* --- STEP 1: SEARCH CARD --- */}
      {step === 'SEARCH' && (
        <div className="space-y-6">
          <div className="rounded-3xl border border-white/10 bg-[#0d131f] p-6 sm:p-8 shadow-xl">
            <div className="mb-6 flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4">
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                <PlaneTakeoff className="h-5 w-5 text-amber-400" />
                {t('tab_flights')}
              </h2>

              {/* Cabin Class Selection */}
              <div className="flex gap-2">
                {[
                  { id: 'economy', label: t('cabin_economy') },
                  { id: 'business', label: t('cabin_business') },
                  { id: 'first_suite', label: t('cabin_first_suite') }
                ].map((c) => (
                  <button
                    key={c.id}
                    onClick={() => setCabinClass(c.id as CabinClass)}
                    className={`rounded-xl px-3 py-1.5 text-xs font-semibold transition ${
                      cabinClass === c.id
                        ? 'bg-amber-400 text-neutral-950 shadow'
                        : 'border border-white/10 bg-white/5 text-neutral-300 hover:border-white/20'
                    }`}
                  >
                    {c.label}
                  </button>
                ))}
              </div>
            </div>

            <form onSubmit={handleSearch} className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-12">
              {/* Origin */}
              <div className="lg:col-span-3 rounded-2xl border border-white/10 bg-white/5 p-3.5">
                <span className="block text-[11px] font-medium text-neutral-400">{t('label_from')}</span>
                <select
                  value={origin.iata}
                  onChange={(e) => {
                    const found = AIRPORTS.find((a) => a.iata === e.target.value);
                    if (found) setOrigin(found);
                  }}
                  className="mt-1 w-full bg-transparent font-serif text-base sm:text-lg font-bold text-white focus:outline-none cursor-pointer"
                >
                  {AIRPORTS.map((a) => (
                    <option key={a.iata} value={a.iata} className="bg-[#0e1424] text-white">
                      {a.city} ({a.iata}) - {a.country}
                    </option>
                  ))}
                </select>
              </div>

              {/* Swap Button */}
              <div className="flex items-center justify-center lg:col-span-1">
                <button
                  type="button"
                  onClick={handleSwapAirports}
                  className="h-10 w-10 rounded-full border border-white/10 bg-white/5 text-neutral-300 hover:text-amber-300 hover:border-amber-400 transition flex items-center justify-center"
                  title="Swap"
                >
                  <ArrowRightLeft className="h-4 w-4" />
                </button>
              </div>

              {/* Destination */}
              <div className="lg:col-span-3 rounded-2xl border border-white/10 bg-white/5 p-3.5">
                <span className="block text-[11px] font-medium text-neutral-400">{t('label_to')}</span>
                <select
                  value={destination.iata}
                  onChange={(e) => {
                    const found = AIRPORTS.find((a) => a.iata === e.target.value);
                    if (found) setDestination(found);
                  }}
                  className="mt-1 w-full bg-transparent font-serif text-base sm:text-lg font-bold text-white focus:outline-none cursor-pointer"
                >
                  {AIRPORTS.map((a) => (
                    <option key={a.iata} value={a.iata} className="bg-[#0e1424] text-white">
                      {a.city} ({a.iata}) - {a.country}
                    </option>
                  ))}
                </select>
              </div>

              {/* Departure Date */}
              <div className="lg:col-span-3 rounded-2xl border border-white/10 bg-white/5 p-3.5">
                <span className="block text-[11px] font-medium text-neutral-400">{t('label_date')}</span>
                <input
                  type="date"
                  value={departDate}
                  onChange={(e) => setDepartDate(e.target.value)}
                  className="mt-1 w-full bg-transparent text-sm font-bold text-white focus:outline-none cursor-pointer"
                />
              </div>

              {/* Search Button */}
              <div className="lg:col-span-2 flex items-center">
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-amber-400 to-amber-500 py-4 text-sm font-bold text-neutral-950 shadow-lg shadow-amber-400/20 hover:from-amber-300 hover:to-amber-400 transition"
                >
                  <Search className="h-4 w-4" />
                  <span>{t('btn_search')}</span>
                </button>
              </div>
            </form>
          </div>

          {/* Results List */}
          <div className="space-y-4">
            <div className="flex justify-between items-center px-1">
              <h3 className="font-serif text-lg font-bold text-white">
                {origin.city} ({origin.iata}) ➔ {destination.city} ({destination.iata})
              </h3>
              <span className="text-xs text-amber-300 font-mono">
                {filteredFlights.length} پروازیں دستیاب ہیں
              </span>
            </div>

            {filteredFlights.map((flight) => {
              const priceUSD = flight.basePricesUSD[cabinClass];

              return (
                <div
                  key={flight.id}
                  className="rounded-3xl border border-white/10 bg-[#0d131f] p-6 hover:border-amber-400/40 transition shadow-lg"
                >
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                    {/* Airline & Aircraft Spec */}
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="rounded-lg bg-amber-400/20 px-2.5 py-1 text-xs font-mono font-bold text-amber-300 border border-amber-400/30">
                          {flight.flightNumber}
                        </span>
                        <span className="text-xs text-neutral-400">{flight.aircraft}</span>
                      </div>

                      {flight.stopDescription && (
                        <p className="mt-2 text-xs text-cyan-300 font-medium">
                          ✦ {flight.stopDescription}
                        </p>
                      )}

                      <div className="mt-3 flex flex-wrap gap-3 text-xs text-neutral-400">
                        <span className="flex items-center gap-1">
                          <Luggage className="h-3.5 w-3.5 text-amber-400" /> {flight.baggageAllowance}
                        </span>
                        <span className="flex items-center gap-1">
                          <Coffee className="h-3.5 w-3.5 text-amber-400" /> {flight.mealIncluded}
                        </span>
                      </div>
                    </div>

                    {/* Flight Schedule */}
                    <div className="flex items-center justify-between gap-8 text-center sm:px-8">
                      <div>
                        <span className="font-mono text-2xl font-bold text-white">{flight.departureTime}</span>
                        <span className="block font-bold text-amber-300 text-xs">{flight.origin.city}</span>
                        <span className="text-[10px] text-neutral-400">{flight.origin.iata}</span>
                      </div>

                      <div className="flex flex-col items-center">
                        <span className="text-[11px] font-mono text-neutral-400 mb-1">{flight.duration}</span>
                        <div className="h-[2px] w-24 bg-gradient-to-r from-amber-400 to-cyan-400"></div>
                        <span className="text-[9px] text-cyan-300 mt-1 uppercase font-semibold">
                          {flight.stops === 0 ? 'غیر معطل پرواز (Non-Stop)' : '1-Stop Direct'}
                        </span>
                      </div>

                      <div>
                        <span className="font-mono text-2xl font-bold text-white">{flight.arrivalTime}</span>
                        <span className="block font-bold text-cyan-300 text-xs">{flight.destination.city}</span>
                        <span className="text-[10px] text-neutral-400">{flight.destination.iata}</span>
                      </div>
                    </div>

                    {/* Price & Booking Trigger */}
                    <div className="flex items-center justify-between lg:flex-col lg:items-end gap-3 border-t border-white/10 pt-4 lg:border-t-0 lg:pt-0">
                      <div className="text-right">
                        <span className="font-mono text-2xl font-bold text-amber-300">
                          {currencyConfig.format(priceUSD)}
                        </span>
                        <span className="block text-[10px] text-neutral-400">تمام ٹیکسز شامل ہیں</span>
                      </div>

                      <button
                        onClick={() => handleSelectFlight(flight)}
                        className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 px-5 py-2.5 text-xs font-bold text-neutral-950 shadow-md hover:from-amber-300 hover:to-amber-400 transition"
                      >
                        <span>{t('btn_book_now')}</span>
                        <ChevronRight className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* --- STEP 2: PASSENGER PERSONAL DATA FORM ("میں اپنی ذاتی فلائٹ بک کرنا چاہوں تو میں کیا کیا ڈیٹا لکھوں گا؟") --- */}
      {step === 'PASSENGER_FORM' && (
        <div className="rounded-3xl border border-amber-400/30 bg-[#0d131f] p-6 sm:p-8 shadow-2xl animate-in fade-in">
          {/* Back button & header */}
          <div className="mb-6 flex items-center justify-between border-b border-white/10 pb-4">
            <div>
              <h2 className="font-serif text-2xl font-bold text-white">
                {t('passenger_title')}
              </h2>
              <p className="text-xs text-neutral-400 mt-1">
                {t('passenger_desc')}
              </p>
            </div>
            <button
              onClick={() => setStep('SEARCH')}
              className="rounded-xl border border-white/15 px-3 py-1.5 text-xs text-neutral-300 hover:bg-white/5"
            >
              ← پرواز تبدیل کریں (Change Flight)
            </button>
          </div>

          {/* Selected flight summary pill */}
          <div className="mb-6 flex flex-wrap items-center justify-between rounded-2xl border border-amber-400/30 bg-amber-500/10 p-4 text-xs">
            <div className="flex items-center gap-3">
              <span className="font-mono font-bold text-amber-300">{selectedFlight.flightNumber}</span>
              <span className="text-white font-bold">
                {selectedFlight.origin.city} ({selectedFlight.origin.iata}) ➔ {selectedFlight.destination.city} ({selectedFlight.destination.iata})
              </span>
              <span className="text-neutral-400">({selectedFlight.duration})</span>
            </div>
            <div className="font-mono text-base font-bold text-amber-300">
              کل کرایہ: {currencyConfig.format(selectedFlight.basePricesUSD[cabinClass] * passengersCount)}
            </div>
          </div>

          {/* Passenger Input Form */}
          <form onSubmit={handleConfirmTicket} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Full Name */}
              <div>
                <label className="mb-1 block text-xs font-semibold text-neutral-200">
                  {t('field_fullname')} *
                </label>
                <input
                  type="text"
                  required
                  value={passengerData.fullName}
                  onChange={(e) => setPassengerData({ ...passengerData, fullName: e.target.value })}
                  placeholder="محمد طارق علی (Tariq Ali)"
                  className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder-neutral-500 focus:border-amber-400 focus:outline-none"
                />
              </div>

              {/* CNIC Number */}
              <div>
                <label className="mb-1 block text-xs font-semibold text-neutral-200">
                  {t('field_cnic')} *
                </label>
                <input
                  type="text"
                  required
                  value={passengerData.cnic}
                  onChange={(e) => setPassengerData({ ...passengerData, cnic: e.target.value })}
                  placeholder="35201-1234567-1"
                  className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder-neutral-500 focus:border-amber-400 focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Phone / WhatsApp */}
              <div>
                <label className="mb-1 block text-xs font-semibold text-neutral-200">
                  {t('field_phone')} *
                </label>
                <input
                  type="text"
                  required
                  value={passengerData.phone}
                  onChange={(e) => setPassengerData({ ...passengerData, phone: e.target.value })}
                  placeholder="+92 300 1234567"
                  className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder-neutral-500 focus:border-amber-400 focus:outline-none"
                />
              </div>

              {/* Email Address */}
              <div>
                <label className="mb-1 block text-xs font-semibold text-neutral-200">
                  {t('field_email')} *
                </label>
                <input
                  type="email"
                  required
                  value={passengerData.email}
                  onChange={(e) => setPassengerData({ ...passengerData, email: e.target.value })}
                  placeholder="tariq@example.com"
                  className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder-neutral-500 focus:border-amber-400 focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* Passport Number (Optional for domestic, required for intl) */}
              <div>
                <label className="mb-1 block text-xs font-semibold text-neutral-200">
                  {t('field_passport')}
                </label>
                <input
                  type="text"
                  value={passengerData.passportNumber}
                  onChange={(e) => setPassengerData({ ...passengerData, passportNumber: e.target.value })}
                  placeholder="PK892104"
                  className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder-neutral-500 focus:border-amber-400 focus:outline-none"
                />
              </div>

              {/* Date of Birth */}
              <div>
                <label className="mb-1 block text-xs font-semibold text-neutral-200">
                  {t('field_dob')}
                </label>
                <input
                  type="date"
                  value={passengerData.dateOfBirth}
                  onChange={(e) => setPassengerData({ ...passengerData, dateOfBirth: e.target.value })}
                  className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white focus:border-amber-400 focus:outline-none cursor-pointer"
                />
              </div>

              {/* Gender */}
              <div>
                <label className="mb-1 block text-xs font-semibold text-neutral-200">
                  {t('field_gender')}
                </label>
                <select
                  value={passengerData.gender}
                  onChange={(e) => setPassengerData({ ...passengerData, gender: e.target.value as 'M' | 'F' })}
                  className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white focus:border-amber-400 focus:outline-none cursor-pointer"
                >
                  <option value="M" className="bg-[#0e1424]">{t('field_gender_m')}</option>
                  <option value="F" className="bg-[#0e1424]">{t('field_gender_f')}</option>
                </select>
              </div>
            </div>

            {/* Meal Preference */}
            <div>
              <label className="mb-1 block text-xs font-semibold text-neutral-200">
                {t('field_meal')}
              </label>
              <select
                value={passengerData.mealPreference}
                onChange={(e) => setPassengerData({ ...passengerData, mealPreference: e.target.value })}
                className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white focus:border-amber-400 focus:outline-none cursor-pointer"
              >
                <option value="Halal Special Biryani" className="bg-[#0e1424]">حلال سپیشل چکن بریانی (Halal Chicken Biryani)</option>
                <option value="Mutton Karahi with Naan" className="bg-[#0e1424]">مٹن کڑاہی مع تازہ نان (Mutton Karahi Gourmet)</option>
                <option value="Continental Vegetarian Feast" className="bg-[#0e1424]">ویجیٹیرین کھانا (Vegetarian Special)</option>
                <option value="Diabetic / Low Calorie" className="bg-[#0e1424]">شوگر و ہلکی غذا (Diabetic Meal)</option>
              </select>
            </div>

            <div className="pt-4 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setStep('SEARCH')}
                className="rounded-xl border border-white/15 px-5 py-3 text-xs text-neutral-300 hover:bg-white/5"
              >
                منسوخ کریں (Cancel)
              </button>
              <button
                type="submit"
                className="rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 px-8 py-3.5 text-sm font-bold text-neutral-950 shadow-lg shadow-amber-400/25 hover:from-amber-300 hover:to-amber-400 transition"
              >
                {t('btn_confirm_ticket')}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* --- STEP 3: CONFIRMED E-TICKET VOUCHER --- */}
      {step === 'CONFIRMED' && latestBooking && (
        <div className="rounded-3xl border border-emerald-500/40 bg-[#0d131f] p-6 sm:p-8 shadow-2xl animate-in zoom-in-95">
          <div className="text-center mb-6">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/20 text-emerald-400 mb-2">
              <CheckCircle2 className="h-7 w-7" />
            </div>
            <h2 className="font-serif text-2xl font-bold text-white">
              {t('ticket_success_title')}
            </h2>
            <p className="text-xs text-neutral-400">
              آپ کی نشست بک ہو چکی ہے اور ای ٹکٹ جاری کر دیا گیا ہے۔
            </p>
          </div>

          {/* Printable Ticket Box */}
          <div className="rounded-2xl border border-amber-400/30 bg-[#121929] p-6 shadow-inner">
            <div className="flex justify-between items-center border-b border-white/10 pb-4 mb-4">
              <div>
                <span className="font-serif text-lg font-bold text-amber-300">امپیریئن ایئرویز (EMPYREAN AIRWAYS)</span>
                <span className="block text-[11px] text-neutral-400">آفیشل الیکٹرانک ٹکٹ و سفری دستاویز</span>
              </div>
              <div className="text-right font-mono">
                <span className="text-xs text-neutral-400 block">{t('ticket_pnr')}</span>
                <span className="text-lg font-bold text-white bg-amber-400/10 px-2 py-0.5 rounded border border-amber-400/30">
                  {latestBooking.pnr}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs border-b border-white/10 pb-4 mb-4 font-mono">
              <div>
                <span className="text-neutral-400 block">{t('ticket_passenger')}:</span>
                <span className="font-bold text-white text-sm">{latestBooking.passenger.fullName}</span>
              </div>
              <div>
                <span className="text-neutral-400 block">{t('ticket_cnic')}:</span>
                <span className="font-bold text-amber-300">{latestBooking.passenger.cnic}</span>
              </div>
              <div>
                <span className="text-neutral-400 block">پرواز نمبر:</span>
                <span className="font-bold text-cyan-300">{latestBooking.flight.flightNumber}</span>
              </div>
              <div>
                <span className="text-neutral-400 block">سیٹ نمبر:</span>
                <span className="font-bold text-white">{latestBooking.seatId} ({latestBooking.cabin.toUpperCase()})</span>
              </div>
            </div>

            <div className="flex justify-between items-center py-2 text-center">
              <div>
                <span className="font-mono text-2xl font-bold text-white">{latestBooking.flight.origin.iata}</span>
                <span className="block text-xs text-neutral-300">{latestBooking.flight.origin.city}</span>
                <span className="text-[10px] text-amber-400 font-mono">{latestBooking.flight.departureTime}</span>
              </div>
              <div className="text-xs font-mono text-cyan-300">
                {latestBooking.flight.duration}
                <div className="h-[2px] w-24 bg-gradient-to-r from-amber-400 to-cyan-400 my-1 mx-auto"></div>
                CONFIRMED
              </div>
              <div>
                <span className="font-mono text-2xl font-bold text-white">{latestBooking.flight.destination.iata}</span>
                <span className="block text-xs text-neutral-300">{latestBooking.flight.destination.city}</span>
                <span className="text-[10px] text-cyan-400 font-mono">{latestBooking.flight.arrivalTime}</span>
              </div>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap justify-between items-center gap-3">
            <button
              onClick={() => setStep('SEARCH')}
              className="rounded-xl border border-white/15 px-4 py-2.5 text-xs text-neutral-300 hover:bg-white/5"
            >
              مزید ٹکٹ بک کریں (Book Another Flight)
            </button>

            <button
              onClick={() => window.print()}
              className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 px-6 py-2.5 text-xs font-bold text-neutral-950 shadow-md hover:from-amber-300 transition"
            >
              <Printer className="h-4 w-4" />
              <span>{t('btn_print_ticket')}</span>
            </button>
          </div>
        </div>
      )}
    </section>
  );
};
