'use client';

import React, { useState } from 'react';
import { Seat, SeatCategory, CurrencyCode, CabinClass } from '../types/airline';
import { CURRENCIES } from '../lib/i18n';
import {
  Armchair,
  Shield,
  Sparkles,
  Check,
  Crown,
  Info,
  ChevronRight,
  Maximize2
} from 'lucide-react';

interface InteractiveSeatMapProps {
  currentCurrency: CurrencyCode;
  selectedSeats: Seat[];
  onSeatToggle: (seat: Seat) => void;
  cabinClass: CabinClass;
  t: (key: string) => string;
}

// Initial mock cabin layout: First Class Suites (Rows 1-2: 1-1-1), Business (Rows 3-5: 1-2-1), Premium/Economy (Rows 6-10: 2-3-2 / 3-3-3)
const INITIAL_SEATS: Seat[] = [
  // First Class Royal Suites (Row 1-2)
  { id: '1A', row: 1, col: 'A', category: 'first_suite', features: ['window', 'extra_legroom'], priceUSD: 1800, isOccupied: false },
  { id: '1E', row: 1, col: 'E', category: 'first_suite', features: ['aisle', 'extra_legroom'], priceUSD: 1600, isOccupied: false },
  { id: '1K', row: 1, col: 'K', category: 'first_suite', features: ['window', 'extra_legroom'], priceUSD: 1800, isOccupied: true },
  { id: '2A', row: 2, col: 'A', category: 'first_suite', features: ['window', 'extra_legroom'], priceUSD: 1800, isOccupied: false },
  { id: '2E', row: 2, col: 'E', category: 'first_suite', features: ['aisle', 'extra_legroom'], priceUSD: 1600, isOccupied: false },
  { id: '2K', row: 2, col: 'K', category: 'first_suite', features: ['window', 'extra_legroom'], priceUSD: 1800, isOccupied: false },

  // Business Lie-Flat (Row 3-4)
  { id: '3A', row: 3, col: 'A', category: 'business_lie_flat', features: ['window'], priceUSD: 650, isOccupied: false },
  { id: '3D', row: 3, col: 'D', category: 'business_lie_flat', features: ['aisle'], priceUSD: 550, isOccupied: true },
  { id: '3G', row: 3, col: 'G', category: 'business_lie_flat', features: ['aisle'], priceUSD: 550, isOccupied: false },
  { id: '3K', row: 3, col: 'K', category: 'business_lie_flat', features: ['window'], priceUSD: 650, isOccupied: false },
  { id: '4A', row: 4, col: 'A', category: 'business_lie_flat', features: ['window'], priceUSD: 650, isOccupied: false },
  { id: '4D', row: 4, col: 'D', category: 'business_lie_flat', features: ['aisle'], priceUSD: 550, isOccupied: false },
  { id: '4G', row: 4, col: 'G', category: 'business_lie_flat', features: ['aisle'], priceUSD: 550, isOccupied: true },
  { id: '4K', row: 4, col: 'K', category: 'business_lie_flat', features: ['window'], priceUSD: 650, isOccupied: false },

  // Premium Economy / Economy (Rows 5-6)
  { id: '5A', row: 5, col: 'A', category: 'premium_legroom', features: ['window', 'extra_legroom'], priceUSD: 150, isOccupied: false },
  { id: '5B', row: 5, col: 'B', category: 'premium_legroom', features: ['middle', 'extra_legroom'], priceUSD: 120, isOccupied: false },
  { id: '5C', row: 5, col: 'C', category: 'premium_legroom', features: ['aisle', 'extra_legroom'], priceUSD: 140, isOccupied: false },
  { id: '5H', row: 5, col: 'H', category: 'premium_legroom', features: ['aisle', 'extra_legroom'], priceUSD: 140, isOccupied: false },
  { id: '5J', row: 5, col: 'J', category: 'premium_legroom', features: ['middle', 'extra_legroom'], priceUSD: 120, isOccupied: true },
  { id: '5K', row: 5, col: 'K', category: 'premium_legroom', features: ['window', 'extra_legroom'], priceUSD: 150, isOccupied: false },

  // Economy Standard (Row 6)
  { id: '6A', row: 6, col: 'A', category: 'economy_standard', features: ['window', 'emergency_exit'], priceUSD: 60, isOccupied: false },
  { id: '6B', row: 6, col: 'B', category: 'economy_standard', features: ['middle', 'emergency_exit'], priceUSD: 35, isOccupied: false },
  { id: '6C', row: 6, col: 'C', category: 'economy_standard', features: ['aisle', 'emergency_exit'], priceUSD: 50, isOccupied: false },
  { id: '6H', row: 6, col: 'H', category: 'economy_standard', features: ['aisle', 'emergency_exit'], priceUSD: 50, isOccupied: false },
  { id: '6J', row: 6, col: 'J', category: 'economy_standard', features: ['middle', 'emergency_exit'], priceUSD: 35, isOccupied: false },
  { id: '6K', row: 6, col: 'K', category: 'economy_standard', features: ['window', 'emergency_exit'], priceUSD: 60, isOccupied: false }
];

export const InteractiveSeatMap: React.FC<InteractiveSeatMapProps> = ({
  currentCurrency,
  selectedSeats,
  onSeatToggle,
  cabinClass,
  t
}) => {
  const [seats] = useState<Seat[]>(INITIAL_SEATS);
  const [hoveredSeat, setHoveredSeat] = useState<Seat | null>(null);

  const currencyConfig = CURRENCIES[currentCurrency];

  const isSeatSelected = (seatId: string) => {
    return selectedSeats.some((s) => s.id === seatId);
  };

  const totalSeatsPriceUSD = selectedSeats.reduce((acc, s) => acc + s.priceUSD, 0);

  return (
    <section id="seat-map" className="relative w-full py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Title and Intro */}
        <div className="mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="rounded-md bg-amber-400/20 px-2 py-0.5 text-xs font-mono font-bold text-amber-300 border border-amber-400/30">
                AIRCRAFT CONFIGURATION
              </span>
              <span className="text-xs text-neutral-400">Ultra-Widebody Flagship</span>
            </div>
            <h2 className="mt-1 font-serif text-2xl sm:text-3xl font-bold text-white">
              {t('seat_map_title')}
            </h2>
          </div>

          {/* Seat Status Legend */}
          <div className="flex flex-wrap items-center gap-4 text-xs font-mono">
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 rounded-md border border-amber-400/60 bg-amber-500/20"></div>
              <span className="text-neutral-300">{t('seat_available')}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 rounded-md border border-cyan-400 bg-cyan-400 text-black flex items-center justify-center">
                <Check className="h-3 w-3" />
              </div>
              <span className="text-cyan-300">{t('seat_selected')}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 rounded-md border border-neutral-700 bg-neutral-800 opacity-50"></div>
              <span className="text-neutral-500">{t('seat_occupied')}</span>
            </div>
          </div>
        </div>

        {/* Fuselage Container */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* 3D Fuselage Visualization */}
          <div className="relative overflow-hidden rounded-3xl border border-white/15 bg-gradient-to-b from-[#0a0e1a] via-[#07090e] to-[#04060a] p-8 shadow-2xl backdrop-blur-2xl lg:col-span-8">
            {/* Aircraft Nose Cone Curve */}
            <div className="mx-auto mb-8 flex w-48 flex-col items-center justify-center">
              <div className="h-16 w-36 rounded-t-full border-t-2 border-x-2 border-amber-400/40 bg-gradient-to-b from-amber-500/10 to-transparent flex items-center justify-center">
                <Crown className="h-5 w-5 text-amber-400" />
              </div>
              <span className="font-mono text-[10px] uppercase tracking-widest text-amber-300">
                Cockpit & Alpha Avionics
              </span>
            </div>

            {/* SEAT GRID: Zone 1 - Royal First Suites */}
            <div className="mb-8 rounded-2xl border border-amber-400/30 bg-gradient-to-b from-amber-500/10 to-transparent p-4">
              <div className="mb-3 flex items-center justify-between text-xs font-mono text-amber-300">
                <span className="flex items-center gap-1.5 font-bold">
                  <Crown className="h-4 w-4 text-amber-400" /> ZONE 1: SOVEREIGN ROYAL SUITES (1-1-1)
                </span>
                <span>Enclosed Full Height Sliding Doors</span>
              </div>

              <div className="space-y-3">
                {[1, 2].map((rowNum) => {
                  const rowSeats = seats.filter((s) => s.row === rowNum);
                  return (
                    <div key={rowNum} className="flex items-center justify-between gap-4">
                      {/* Left Suite */}
                      {rowSeats.filter((s) => s.col === 'A').map((seat) => (
                        <SuiteCard
                          key={seat.id}
                          seat={seat}
                          selected={isSeatSelected(seat.id)}
                          currencyConfig={currencyConfig}
                          onToggle={() => onSeatToggle(seat)}
                          onHover={() => setHoveredSeat(seat)}
                        />
                      ))}

                      {/* Aisle */}
                      <div className="font-mono text-xs text-neutral-600">AISLE</div>

                      {/* Center Suite */}
                      {rowSeats.filter((s) => s.col === 'E').map((seat) => (
                        <SuiteCard
                          key={seat.id}
                          seat={seat}
                          selected={isSeatSelected(seat.id)}
                          currencyConfig={currencyConfig}
                          onToggle={() => onSeatToggle(seat)}
                          onHover={() => setHoveredSeat(seat)}
                        />
                      ))}

                      {/* Aisle */}
                      <div className="font-mono text-xs text-neutral-600">AISLE</div>

                      {/* Right Suite */}
                      {rowSeats.filter((s) => s.col === 'K').map((seat) => (
                        <SuiteCard
                          key={seat.id}
                          seat={seat}
                          selected={isSeatSelected(seat.id)}
                          currencyConfig={currencyConfig}
                          onToggle={() => onSeatToggle(seat)}
                          onHover={() => setHoveredSeat(seat)}
                        />
                      ))}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* SEAT GRID: Zone 2 - Business Lie-Flat */}
            <div className="mb-8 rounded-2xl border border-white/10 bg-white/[0.02] p-4">
              <div className="mb-3 flex items-center justify-between text-xs font-mono text-neutral-300">
                <span className="flex items-center gap-1.5 font-bold">
                  <Armchair className="h-4 w-4 text-cyan-400" /> ZONE 2: AURA LIE-FLAT BUSINESS (1-2-1)
                </span>
                <span>Direct Aisle Access</span>
              </div>

              <div className="space-y-3">
                {[3, 4].map((rowNum) => {
                  const rowSeats = seats.filter((s) => s.row === rowNum);
                  return (
                    <div key={rowNum} className="flex items-center justify-between gap-3">
                      {/* Window Left */}
                      {rowSeats.filter((s) => s.col === 'A').map((seat) => (
                        <StandardSeatCard
                          key={seat.id}
                          seat={seat}
                          selected={isSeatSelected(seat.id)}
                          currencyConfig={currencyConfig}
                          onToggle={() => onSeatToggle(seat)}
                          onHover={() => setHoveredSeat(seat)}
                        />
                      ))}

                      <div className="w-4"></div>

                      {/* Center Pair */}
                      <div className="flex gap-2">
                        {rowSeats.filter((s) => s.col === 'D' || s.col === 'G').map((seat) => (
                          <StandardSeatCard
                            key={seat.id}
                            seat={seat}
                            selected={isSeatSelected(seat.id)}
                            currencyConfig={currencyConfig}
                            onToggle={() => onSeatToggle(seat)}
                            onHover={() => setHoveredSeat(seat)}
                          />
                        ))}
                      </div>

                      <div className="w-4"></div>

                      {/* Window Right */}
                      {rowSeats.filter((s) => s.col === 'K').map((seat) => (
                        <StandardSeatCard
                          key={seat.id}
                          seat={seat}
                          selected={isSeatSelected(seat.id)}
                          currencyConfig={currencyConfig}
                          onToggle={() => onSeatToggle(seat)}
                          onHover={() => setHoveredSeat(seat)}
                        />
                      ))}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* SEAT GRID: Zone 3 - Premium Economy & Grand Economy */}
            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4">
              <div className="mb-3 flex items-center justify-between text-xs font-mono text-neutral-400">
                <span className="font-bold">ZONE 3: PRESTIGE & GRAND CABIN</span>
                <span>Row 5: Extra Legroom • Row 6: Emergency Exit</span>
              </div>

              <div className="space-y-3">
                {[5, 6].map((rowNum) => {
                  const rowSeats = seats.filter((s) => s.row === rowNum);
                  return (
                    <div key={rowNum} className="flex items-center justify-between gap-2">
                      {/* Left Trio */}
                      <div className="flex gap-1.5">
                        {rowSeats.filter((s) => ['A', 'B', 'C'].includes(s.col)).map((seat) => (
                          <StandardSeatCard
                            key={seat.id}
                            seat={seat}
                            selected={isSeatSelected(seat.id)}
                            currencyConfig={currencyConfig}
                            onToggle={() => onSeatToggle(seat)}
                            onHover={() => setHoveredSeat(seat)}
                          />
                        ))}
                      </div>

                      <div className="font-mono text-[10px] text-neutral-600">ROW {rowNum}</div>

                      {/* Right Trio */}
                      <div className="flex gap-1.5">
                        {rowSeats.filter((s) => ['H', 'J', 'K'].includes(s.col)).map((seat) => (
                          <StandardSeatCard
                            key={seat.id}
                            seat={seat}
                            selected={isSeatSelected(seat.id)}
                            currencyConfig={currencyConfig}
                            onToggle={() => onSeatToggle(seat)}
                            onHover={() => setHoveredSeat(seat)}
                          />
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Seat Inspector & Reservation Summary Sidebar */}
          <div className="flex flex-col justify-between rounded-3xl border border-white/15 bg-[#0e1424] p-6 shadow-2xl backdrop-blur-2xl lg:col-span-4">
            <div>
              <div className="border-b border-white/10 pb-4">
                <span className="font-mono text-xs uppercase tracking-wider text-amber-400">
                  Seat Specification Details
                </span>
                <h3 className="mt-1 font-serif text-xl font-bold text-white">
                  {hoveredSeat ? `Suite / Seat ${hoveredSeat.id}` : 'Select a Suite or Seat'}
                </h3>
              </div>

              {hoveredSeat ? (
                <div className="mt-4 space-y-4 text-xs">
                  <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
                    <div className="flex justify-between font-mono text-neutral-300">
                      <span>Category:</span>
                      <span className="font-bold text-amber-300 uppercase">
                        {hoveredSeat.category.replace('_', ' ')}
                      </span>
                    </div>
                    <div className="mt-2 flex justify-between font-mono text-neutral-300">
                      <span>Per-Seat Upgrade Fare:</span>
                      <span className="font-bold text-white">
                        {currencyConfig.format(hoveredSeat.priceUSD)}
                      </span>
                    </div>
                    <div className="mt-2 flex justify-between font-mono text-neutral-300">
                      <span>Features:</span>
                      <span className="text-cyan-300">
                        {hoveredSeat.features.join(', ').replace('_', ' ')}
                      </span>
                    </div>
                  </div>

                  <div className="rounded-xl border border-amber-400/20 bg-amber-500/5 p-4 text-neutral-300">
                    <div className="flex items-center gap-1.5 text-amber-400 font-bold mb-1">
                      <Sparkles className="h-4 w-4" /> Flagship Privileges
                    </div>
                    <p className="text-[11px] leading-relaxed">
                      {hoveredSeat.category === 'first_suite'
                        ? t('seat_suite_perks')
                        : 'Lie-flat 180° beds with direct aisle access, ambient noise cancellation, and gourmet dining.'}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="mt-8 flex flex-col items-center justify-center p-6 text-center text-neutral-400">
                  <Armchair className="h-12 w-12 text-neutral-600 mb-2" />
                  <p className="text-xs">Hover or tap on any seat on the fuselage map to inspect amenities and luxury upgrades.</p>
                </div>
              )}
            </div>

            {/* Selected Seats Tally */}
            <div className="mt-8 border-t border-white/10 pt-4">
              <div className="mb-3 flex justify-between items-center">
                <span className="text-xs text-neutral-400">Selected Seats ({selectedSeats.length}):</span>
                <span className="font-mono text-sm font-bold text-amber-300">
                  {selectedSeats.map((s) => s.id).join(', ') || 'None'}
                </span>
              </div>

              <div className="mb-4 flex justify-between items-center">
                <span className="text-xs text-neutral-400">Seat Upgrade Total:</span>
                <span className="font-mono text-xl font-bold text-white">
                  {currencyConfig.format(totalSeatsPriceUSD)}
                </span>
              </div>

              <a
                href="#booking-engine"
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 py-3 text-xs font-bold uppercase tracking-wider text-neutral-950 shadow-lg shadow-amber-400/20 hover:from-amber-300 hover:to-amber-400 transition"
              >
                <span>Confirm Seats & Proceed</span>
                <ChevronRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Subcomponent: Luxury Royal Suite Card with 3D enclosure simulation
const SuiteCard: React.FC<{
  seat: Seat;
  selected: boolean;
  currencyConfig: ReturnType<typeof CURRENCIES[CurrencyCode]>;
  onToggle: () => void;
  onHover: () => void;
}> = ({ seat, selected, currencyConfig, onToggle, onHover }) => {
  return (
    <button
      type="button"
      disabled={seat.isOccupied}
      onClick={onToggle}
      onMouseEnter={onHover}
      className={`group relative flex h-24 w-28 flex-col items-center justify-between rounded-2xl border p-2.5 transition-all duration-300 ${
        seat.isOccupied
          ? 'cursor-not-allowed border-neutral-800 bg-neutral-900/50 opacity-40'
          : selected
          ? 'border-cyan-400 bg-gradient-to-b from-cyan-950/80 to-[#0c1a26] shadow-[0_0_25px_rgba(6,182,212,0.4)] scale-105 ring-2 ring-cyan-400'
          : 'border-amber-400/50 bg-gradient-to-b from-amber-500/10 to-neutral-900/80 hover:border-amber-300 hover:scale-102 shadow-md shadow-amber-500/10'
      }`}
    >
      <div className="flex w-full items-center justify-between">
        <span className="font-mono text-xs font-bold text-amber-300 group-hover:text-amber-200">
          SUITE {seat.id}
        </span>
        <Crown className={`h-3.5 w-3.5 ${selected ? 'text-cyan-400' : 'text-amber-400'}`} />
      </div>

      <div className="flex flex-col items-center">
        <Armchair className={`h-7 w-7 ${selected ? 'text-cyan-300' : 'text-neutral-300'}`} />
        <span className="mt-0.5 text-[9px] font-mono text-neutral-400">
          {seat.isOccupied ? 'Occupied' : currencyConfig.format(seat.priceUSD)}
        </span>
      </div>

      <div className="w-full text-center">
        <span className="block text-[8px] uppercase tracking-wider text-amber-400/80">
          {selected ? 'SELECTED' : 'PRIVATE SUITE'}
        </span>
      </div>
    </button>
  );
};

// Subcomponent: Standard & Business Seat Card
const StandardSeatCard: React.FC<{
  seat: Seat;
  selected: boolean;
  currencyConfig: ReturnType<typeof CURRENCIES[CurrencyCode]>;
  onToggle: () => void;
  onHover: () => void;
}> = ({ seat, selected, currencyConfig, onToggle, onHover }) => {
  return (
    <button
      type="button"
      disabled={seat.isOccupied}
      onClick={onToggle}
      onMouseEnter={onHover}
      className={`group relative flex h-14 w-12 flex-col items-center justify-between rounded-xl border p-1.5 transition-all duration-200 ${
        seat.isOccupied
          ? 'cursor-not-allowed border-neutral-800 bg-neutral-900/40 opacity-40'
          : selected
          ? 'border-cyan-400 bg-cyan-500 text-black shadow-[0_0_20px_rgba(6,182,212,0.5)] scale-110'
          : 'border-white/15 bg-white/5 text-neutral-300 hover:border-amber-400/60 hover:bg-white/10'
      }`}
    >
      <span className="font-mono text-[10px] font-bold">{seat.id}</span>
      <Armchair className="h-4 w-4" />
      <span className="font-mono text-[8px] opacity-75">
        {seat.isOccupied ? 'X' : currencyConfig.symbol}
      </span>
    </button>
  );
};
