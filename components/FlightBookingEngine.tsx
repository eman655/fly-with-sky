'use client';

import React, { useState } from 'react';
import { Airport, CabinClass, TripType, Flight, CurrencyCode } from '../types/airline';
import { AIRPORTS, FLIGHTS_MOCK, CURRENCIES } from '../lib/i18n';
import {
  PlaneTakeoff,
  PlaneLanding,
  Calendar,
  Users,
  Award,
  ArrowRightLeft,
  Search,
  Sparkles,
  Clock,
  ShieldCheck,
  ChevronRight,
  Armchair
} from 'lucide-react';

interface FlightBookingEngineProps {
  currentCurrency: CurrencyCode;
  onSelectFlight: (flight: Flight, cabin: CabinClass) => void;
  selectedFlightId?: string;
  t: (key: string) => string;
}

export const FlightBookingEngine: React.FC<FlightBookingEngineProps> = ({
  currentCurrency,
  onSelectFlight,
  selectedFlightId,
  t
}) => {
  const [tripType, setTripType] = useState<TripType>('round_trip');
  const [origin, setOrigin] = useState<Airport>(AIRPORTS[0]); // DXB
  const [destination, setDestination] = useState<Airport>(AIRPORTS[1]); // LHR
  const [departDate, setDepartDate] = useState<string>('2026-10-15');
  const [returnDate, setReturnDate] = useState<string>('2026-10-24');
  const [passengers, setPassengers] = useState<number>(1);
  const [cabinClass, setCabinClass] = useState<CabinClass>('first_suite');

  const [availableFlights, setAvailableFlights] = useState<Flight[]>(FLIGHTS_MOCK);
  const [activeDateIndex, setActiveDateIndex] = useState<number>(2);

  const currencyConfig = CURRENCIES[currentCurrency];

  const swapAirports = () => {
    const temp = origin;
    setOrigin(destination);
    setDestination(temp);
  };

  // Mock lowest fare calendar days around the departure date
  const fareCalendarDays = [
    { day: 'Oct 13', date: '2026-10-13', priceUSD: 8900 },
    { day: 'Oct 14', date: '2026-10-14', priceUSD: 9400 },
    { day: 'Oct 15 (Selected)', date: '2026-10-15', priceUSD: 9800 },
    { day: 'Oct 16', date: '2026-10-16', priceUSD: 9100 },
    { day: 'Oct 17', date: '2026-10-17', priceUSD: 8750 },
    { day: 'Oct 18', date: '2026-10-18', priceUSD: 9200 }
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Filter mock flights or show flagship route
    const filtered = FLIGHTS_MOCK.filter(
      (f) =>
        (f.origin.iata === origin.iata && f.destination.iata === destination.iata) ||
        (f.origin.iata === origin.iata) ||
        true
    );
    setAvailableFlights(filtered);
  };

  return (
    <section id="booking-engine" className="relative w-full py-8">
      {/* Background Decorative Avionics Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-amber-500/5 blur-[120px] pointer-events-none rounded-full" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Booking Card Glass Container */}
        <div className="relative overflow-hidden rounded-3xl border border-white/15 bg-gradient-to-b from-[#0e1424]/90 to-[#070a12]/95 p-6 sm:p-8 shadow-[0_20px_60px_rgba(0,0,0,0.6)] backdrop-blur-2xl">
          {/* Trip Type Selector & Cabin Pill Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-6">
            <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-black/40 p-1">
              <button
                type="button"
                onClick={() => setTripType('round_trip')}
                className={`rounded-xl px-4 py-2 text-xs font-semibold tracking-wide transition ${
                  tripType === 'round_trip'
                    ? 'bg-amber-400 text-neutral-950 shadow-md shadow-amber-400/20'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                {t('trip_round_trip')}
              </button>
              <button
                type="button"
                onClick={() => setTripType('one_way')}
                className={`rounded-xl px-4 py-2 text-xs font-semibold tracking-wide transition ${
                  tripType === 'one_way'
                    ? 'bg-amber-400 text-neutral-950 shadow-md shadow-amber-400/20'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                {t('trip_one_way')}
              </button>
              <button
                type="button"
                onClick={() => setTripType('multi_city')}
                className={`rounded-xl px-4 py-2 text-xs font-semibold tracking-wide transition ${
                  tripType === 'multi_city'
                    ? 'bg-amber-400 text-neutral-950 shadow-md shadow-amber-400/20'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                {t('trip_multi_city')}
              </button>
            </div>

            {/* Cabin Class Selector */}
            <div className="flex flex-wrap items-center gap-2">
              {(
                [
                  { id: 'first_suite', label: t('cabin_first_suite'), badge: 'Royal' },
                  { id: 'business', label: t('cabin_business'), badge: 'Lie-Flat' },
                  { id: 'premium_economy', label: t('cabin_premium_economy'), badge: null },
                  { id: 'economy', label: t('cabin_economy'), badge: null }
                ] as const
              ).map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setCabinClass(item.id)}
                  className={`relative flex items-center gap-1.5 rounded-xl border px-3 py-1.5 text-xs font-medium transition ${
                    cabinClass === item.id
                      ? 'border-amber-400/80 bg-amber-500/15 text-amber-300 shadow-sm shadow-amber-500/10'
                      : 'border-white/10 bg-white/5 text-neutral-300 hover:border-white/20'
                  }`}
                >
                  <Armchair className="h-3.5 w-3.5" />
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="ms-1 rounded bg-amber-400/20 px-1 py-0.2 text-[9px] font-bold uppercase text-amber-300">
                      {item.badge}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Search Inputs Matrix */}
          <form onSubmit={handleSearch} className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-12">
            {/* Origin Airport */}
            <div className="relative rounded-2xl border border-white/10 bg-white/[0.03] p-3.5 hover:border-amber-400/40 transition md:col-span-3">
              <span className="flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-wider text-neutral-400">
                <PlaneTakeoff className="h-3.5 w-3.5 text-amber-400" />
                {t('label_origin')}
              </span>
              <select
                value={origin.iata}
                onChange={(e) => {
                  const found = AIRPORTS.find((a) => a.iata === e.target.value);
                  if (found) setOrigin(found);
                }}
                className="mt-1 w-full bg-transparent font-serif text-lg font-bold text-white focus:outline-none cursor-pointer"
              >
                {AIRPORTS.map((a) => (
                  <option key={a.iata} value={a.iata} className="bg-[#0e1424] text-white">
                    {a.city} ({a.iata}) - {a.name}
                  </option>
                ))}
              </select>
              <span className="font-mono text-xs text-amber-300/80">{origin.country}</span>
            </div>

            {/* Swap Button */}
            <div className="flex items-center justify-center md:col-span-1">
              <button
                type="button"
                onClick={swapAirports}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-neutral-300 hover:border-amber-400 hover:bg-amber-400/20 hover:text-amber-300 transition"
                title="Swap Route"
              >
                <ArrowRightLeft className="h-4 w-4" />
              </button>
            </div>

            {/* Destination Airport */}
            <div className="relative rounded-2xl border border-white/10 bg-white/[0.03] p-3.5 hover:border-amber-400/40 transition md:col-span-3">
              <span className="flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-wider text-neutral-400">
                <PlaneLanding className="h-3.5 w-3.5 text-cyan-400" />
                {t('label_destination')}
              </span>
              <select
                value={destination.iata}
                onChange={(e) => {
                  const found = AIRPORTS.find((a) => a.iata === e.target.value);
                  if (found) setDestination(found);
                }}
                className="mt-1 w-full bg-transparent font-serif text-lg font-bold text-white focus:outline-none cursor-pointer"
              >
                {AIRPORTS.map((a) => (
                  <option key={a.iata} value={a.iata} className="bg-[#0e1424] text-white">
                    {a.city} ({a.iata}) - {a.name}
                  </option>
                ))}
              </select>
              <span className="font-mono text-xs text-cyan-300/80">{destination.country}</span>
            </div>

            {/* Departure / Return Dates */}
            <div className="relative rounded-2xl border border-white/10 bg-white/[0.03] p-3.5 hover:border-amber-400/40 transition md:col-span-3">
              <span className="flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-wider text-neutral-400">
                <Calendar className="h-3.5 w-3.5 text-amber-400" />
                {t('label_depart_date')} {tripType === 'round_trip' ? `& ${t('label_return_date')}` : ''}
              </span>
              <div className="mt-1 flex items-center gap-2">
                <input
                  type="date"
                  value={departDate}
                  onChange={(e) => setDepartDate(e.target.value)}
                  className="w-full bg-transparent text-sm font-semibold text-white focus:outline-none cursor-pointer"
                />
                {tripType === 'round_trip' && (
                  <>
                    <span className="text-neutral-500">→</span>
                    <input
                      type="date"
                      value={returnDate}
                      onChange={(e) => setReturnDate(e.target.value)}
                      className="w-full bg-transparent text-sm font-semibold text-white focus:outline-none cursor-pointer"
                    />
                  </>
                )}
              </div>
            </div>

            {/* Travelers & Search Trigger */}
            <div className="flex items-center gap-2 md:col-span-2">
              <div className="w-1/3 rounded-2xl border border-white/10 bg-white/[0.03] p-3 text-center">
                <span className="block text-[10px] text-neutral-400">{t('label_passengers')}</span>
                <select
                  value={passengers}
                  onChange={(e) => setPassengers(Number(e.target.value))}
                  className="w-full bg-transparent text-center font-bold text-white focus:outline-none cursor-pointer"
                >
                  {[1, 2, 3, 4, 6, 8].map((n) => (
                    <option key={n} value={n} className="bg-[#0e1424] text-white">
                      {n}
                    </option>
                  ))}
                </select>
              </div>

              <button
                type="submit"
                className="w-2/3 flex h-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 px-4 py-3 font-semibold text-neutral-950 shadow-lg shadow-amber-500/25 hover:from-amber-300 hover:to-amber-500 transition active:scale-[0.98]"
              >
                <Search className="h-4 w-4" />
                <span className="text-xs font-bold uppercase tracking-wider">{t('btn_search_flights')}</span>
              </button>
            </div>
          </form>

          {/* Fare Calendar Strip - Showing Lowest Estimated Fares */}
          <div className="mt-6 border-t border-white/10 pt-4">
            <div className="mb-2 flex items-center justify-between">
              <span className="font-mono text-xs text-neutral-400">
                LOWEST ESTIMATED SOVEREIGN FARES ({currencyConfig.code}):
              </span>
              <span className="text-[11px] text-amber-300 flex items-center gap-1">
                <Sparkles className="h-3 w-3" /> Best Price Guarantee
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-6">
              {fareCalendarDays.map((item, idx) => (
                <button
                  key={item.date}
                  type="button"
                  onClick={() => {
                    setActiveDateIndex(idx);
                    setDepartDate(item.date);
                  }}
                  className={`rounded-xl border p-2 text-center transition ${
                    activeDateIndex === idx
                      ? 'border-amber-400 bg-amber-400/15 text-white shadow-md shadow-amber-400/10'
                      : 'border-white/10 bg-white/[0.02] text-neutral-400 hover:border-white/20'
                  }`}
                >
                  <span className="block text-[11px] font-medium">{item.day}</span>
                  <span className="block font-mono text-xs font-bold text-amber-300 mt-0.5">
                    {currencyConfig.format(item.priceUSD)}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Flight Results List */}
        <div className="mt-8 space-y-4">
          <div className="flex items-center justify-between px-2">
            <h3 className="font-serif text-xl font-bold text-white">
              Available Sovereign Flights ({origin.iata} → {destination.iata})
            </h3>
            <span className="font-mono text-xs text-cyan-300">
              {availableFlights.length} Direct Flagship Service(s) Scheduled
            </span>
          </div>

          <div className="space-y-4">
            {availableFlights.map((flight) => {
              const priceUSD = flight.basePricesUSD[cabinClass];
              const isSelected = selectedFlightId === flight.id;

              return (
                <div
                  key={flight.id}
                  className={`relative overflow-hidden rounded-3xl border p-6 transition-all duration-300 ${
                    isSelected
                      ? 'border-amber-400 bg-[#121829] shadow-[0_0_40px_rgba(212,175,55,0.2)] ring-1 ring-amber-400'
                      : 'border-white/10 bg-white/[0.03] hover:border-white/25 hover:bg-white/[0.05]'
                  }`}
                >
                  <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-center">
                    {/* Flight Code & Aircraft Spec */}
                    <div className="lg:col-span-3">
                      <div className="flex items-center gap-2">
                        <span className="rounded-md bg-amber-400/20 px-2 py-0.5 font-mono text-xs font-bold text-amber-300 border border-amber-400/30">
                          {flight.flightNumber}
                        </span>
                        <span className="text-xs text-neutral-400">{flight.aircraft}</span>
                      </div>
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {flight.perks.slice(0, 2).map((perk, i) => (
                          <span
                            key={i}
                            className="rounded-full bg-cyan-950/40 border border-cyan-500/30 px-2 py-0.5 text-[10px] text-cyan-300"
                          >
                            {perk}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Flight Schedule Timeline Graphic */}
                    <div className="lg:col-span-5">
                      <div className="flex items-center justify-between">
                        <div className="text-center">
                          <span className="font-mono text-2xl font-bold text-white">
                            {flight.departureTime}
                          </span>
                          <span className="block font-mono text-xs font-bold text-amber-300">
                            {flight.origin.iata}
                          </span>
                          <span className="block text-[11px] text-neutral-400">{flight.origin.city}</span>
                        </div>

                        {/* Visual Flight Vector Arc */}
                        <div className="flex flex-1 flex-col items-center px-4">
                          <span className="font-mono text-[11px] text-neutral-400 mb-1">
                            {flight.duration} • Non-stop
                          </span>
                          <div className="relative w-full flex items-center">
                            <div className="h-[2px] w-full bg-gradient-to-r from-amber-400/30 via-cyan-400 to-amber-400/30"></div>
                            <div className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 flex h-6 w-6 items-center justify-center rounded-full bg-[#0a0e1a] border border-cyan-400 text-cyan-300 shadow-sm shadow-cyan-400">
                              <PlaneTakeoff className="h-3 w-3" />
                            </div>
                          </div>
                          <span className="font-mono text-[9px] uppercase tracking-wider text-cyan-300/80 mt-1">
                            Supersonic Cruise 0.86M
                          </span>
                        </div>

                        <div className="text-center">
                          <span className="font-mono text-2xl font-bold text-white">
                            {flight.arrivalTime}
                          </span>
                          <span className="block font-mono text-xs font-bold text-cyan-300">
                            {flight.destination.iata}
                          </span>
                          <span className="block text-[11px] text-neutral-400">{flight.destination.city}</span>
                        </div>
                      </div>
                    </div>

                    {/* Price and Action Button */}
                    <div className="flex flex-col items-end justify-between gap-3 border-t border-white/10 pt-4 lg:col-span-4 lg:border-t-0 lg:border-s lg:border-white/10 lg:ps-6 lg:pt-0">
                      <div className="text-right">
                        <span className="block text-[10px] uppercase tracking-wider text-neutral-400">
                          {cabinClass.replace('_', ' ')} All-Inclusive
                        </span>
                        <div className="font-mono text-2xl sm:text-3xl font-bold text-amber-300">
                          {currencyConfig.format(priceUSD)}
                        </div>
                        <span className="text-[10px] text-neutral-400">Taxes, Krug Champagne & Chauffeur Included</span>
                      </div>

                      <button
                        onClick={() => onSelectFlight(flight, cabinClass)}
                        className={`w-full flex items-center justify-center gap-2 rounded-xl py-2.5 px-4 font-semibold text-xs transition ${
                          isSelected
                            ? 'bg-emerald-500 text-neutral-950 shadow-lg shadow-emerald-500/20'
                            : 'bg-amber-400 text-neutral-950 hover:bg-amber-300 shadow-lg shadow-amber-400/20'
                        }`}
                      >
                        <span>{isSelected ? 'Flight Selected ✓' : t('btn_select_flight')}</span>
                        <ChevronRight className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
