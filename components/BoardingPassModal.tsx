'use client';

import React, { useState } from 'react';
import { Flight, Seat, KycPassportData, CurrencyCode } from '../types/airline';
import { CURRENCIES } from '../lib/i18n';
import {
  X,
  QrCode,
  Sparkles,
  Plane,
  ShieldCheck,
  Download,
  Share2,
  CheckCircle2,
  Calendar,
  Clock,
  MapPin,
  Smartphone
} from 'lucide-react';

interface BoardingPassModalProps {
  isOpen: boolean;
  onClose: () => void;
  flight: Flight;
  seat: Seat | null;
  kycData: KycPassportData | null;
  currentCurrency: CurrencyCode;
  t: (key: string) => string;
}

export const BoardingPassModal: React.FC<BoardingPassModalProps> = ({
  isOpen,
  onClose,
  flight,
  seat,
  kycData,
  currentCurrency,
  t
}) => {
  const [walletSaved, setWalletSaved] = useState<string | null>(null);

  if (!isOpen) return null;

  const pnr = 'AU99X2';
  const passengerName = kycData?.fullName || 'HIS HIGHNESS TARIQ AL-HASHIMI';
  const seatId = seat ? seat.id : '1A';
  const seatCategory = seat ? seat.category.replace('_', ' ').toUpperCase() : 'SOVEREIGN ROYAL SUITE';

  const handleWalletExport = (type: 'apple' | 'google') => {
    setWalletSaved(type);
    setTimeout(() => setWalletSaved(null), 3500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-xl animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl overflow-hidden rounded-3xl border border-amber-400/40 bg-[#0a0d14] shadow-[0_0_80px_rgba(212,175,55,0.2)] ring-1 ring-white/10">
        {/* Top Control Bar */}
        <div className="flex items-center justify-between border-b border-white/10 bg-gradient-to-r from-neutral-900 to-[#0e1424] px-6 py-4">
          <div className="flex items-center gap-2 text-xs font-mono text-amber-300">
            <Sparkles className="h-4 w-4 text-amber-400" />
            <span>SOVEREIGN CRYPTOGRAPHIC PASS • PNR: {pnr}</span>
          </div>
          <button
            onClick={onClose}
            className="rounded-full p-1.5 text-neutral-400 hover:bg-white/10 hover:text-white transition"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Boarding Pass Canvas Card */}
        <div className="p-6">
          <div className="relative overflow-hidden rounded-3xl border border-amber-400/30 bg-gradient-to-b from-[#121929] via-[#0b0f19] to-[#080b12] shadow-2xl">
            {/* Holographic Watermark Header */}
            <div className="border-b border-white/10 bg-amber-500/10 px-6 py-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-serif text-xl font-bold tracking-widest text-white">
                    AURA AERO
                  </span>
                  <span className="ms-2 rounded bg-amber-400/20 px-2 py-0.5 text-[9px] font-mono font-bold uppercase text-amber-300 border border-amber-400/30">
                    ROYAL FIRST CLASS
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-emerald-400 text-xs font-mono">
                  <ShieldCheck className="h-4 w-4" />
                  <span>ICAO Verified</span>
                </div>
              </div>
            </div>

            {/* Passenger & Flight Highlights */}
            <div className="p-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-b border-white/10 pb-5">
                <div>
                  <span className="block text-[10px] font-mono uppercase text-neutral-400">
                    PASSENGER NAME
                  </span>
                  <span className="font-bold text-white text-sm sm:text-base">
                    {passengerName}
                  </span>
                </div>
                <div>
                  <span className="block text-[10px] font-mono uppercase text-neutral-400">
                    FLIGHT CODE
                  </span>
                  <span className="font-mono font-bold text-amber-300 text-base">
                    {flight.flightNumber}
                  </span>
                </div>
                <div>
                  <span className="block text-[10px] font-mono uppercase text-neutral-400">
                    CLASS & SUITE
                  </span>
                  <span className="font-mono font-bold text-cyan-300 text-base">
                    {seatId} ({seatCategory})
                  </span>
                </div>
              </div>

              {/* Route & Times */}
              <div className="my-6 flex items-center justify-between">
                <div>
                  <span className="block font-mono text-3xl font-bold text-white">
                    {flight.origin.iata}
                  </span>
                  <span className="text-xs text-neutral-400">{flight.origin.city}</span>
                  <span className="block font-mono text-xs text-amber-300 mt-1">
                    DEP {flight.departureTime}
                  </span>
                </div>

                <div className="flex flex-1 flex-col items-center px-4">
                  <span className="font-mono text-[10px] text-neutral-400">{flight.duration}</span>
                  <div className="relative w-full my-1 flex items-center">
                    <div className="h-[2px] w-full bg-gradient-to-r from-amber-400 to-cyan-400"></div>
                    <Plane className="h-4 w-4 text-cyan-400 absolute left-1/2 -translate-x-1/2 -translate-y-1/2" />
                  </div>
                  <span className="font-mono text-[9px] text-cyan-300 uppercase">Non-Stop Flagship</span>
                </div>

                <div className="text-right">
                  <span className="block font-mono text-3xl font-bold text-white">
                    {flight.destination.iata}
                  </span>
                  <span className="text-xs text-neutral-400">{flight.destination.city}</span>
                  <span className="block font-mono text-xs text-cyan-300 mt-1">
                    ARR {flight.arrivalTime}
                  </span>
                </div>
              </div>

              {/* Gate, Terminal, Boarding Time Bar */}
              <div className="grid grid-cols-3 rounded-2xl border border-white/10 bg-white/[0.02] p-3.5 text-center text-xs">
                <div>
                  <span className="block text-[10px] text-neutral-400">BOARDING GATE</span>
                  <span className="font-mono text-sm font-bold text-white">A12 (Alpha Lounge)</span>
                </div>
                <div>
                  <span className="block text-[10px] text-neutral-400">BOARDING TIME</span>
                  <span className="font-mono text-sm font-bold text-amber-300">08:05 GST</span>
                </div>
                <div>
                  <span className="block text-[10px] text-neutral-400">ZONE</span>
                  <span className="font-mono text-sm font-bold text-cyan-300">ROYAL ALPHA</span>
                </div>
              </div>

              {/* QR Code & Barcode Section */}
              <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-dashed border-white/20 pt-6">
                <div className="flex items-center gap-4">
                  {/* High-Contrast Luxury QR Code Simulation */}
                  <div className="flex h-24 w-24 items-center justify-center rounded-2xl bg-white p-2 shadow-lg">
                    <svg viewBox="0 0 100 100" className="h-full w-full">
                      {/* Realistic QR Pattern Blocks */}
                      <rect width="100" height="100" fill="white" />
                      <rect x="5" y="5" width="30" height="30" fill="#07090e" />
                      <rect x="10" y="10" width="20" height="20" fill="white" />
                      <rect x="14" y="14" width="12" height="12" fill="#07090e" />

                      <rect x="65" y="5" width="30" height="30" fill="#07090e" />
                      <rect x="70" y="10" width="20" height="20" fill="white" />
                      <rect x="74" y="14" width="12" height="12" fill="#07090e" />

                      <rect x="5" y="65" width="30" height="30" fill="#07090e" />
                      <rect x="10" y="70" width="20" height="20" fill="white" />
                      <rect x="14" y="74" width="12" height="12" fill="#07090e" />

                      {/* Random Data Dots */}
                      <rect x="42" y="15" width="6" height="6" fill="#07090e" />
                      <rect x="52" y="15" width="6" height="6" fill="#07090e" />
                      <rect x="42" y="25" width="6" height="6" fill="#07090e" />
                      <rect x="25" y="45" width="6" height="6" fill="#07090e" />
                      <rect x="35" y="45" width="6" height="6" fill="#07090e" />
                      <rect x="45" y="45" width="12" height="12" fill="#07090e" />
                      <rect x="65" y="45" width="6" height="6" fill="#07090e" />
                      <rect x="75" y="55" width="10" height="6" fill="#07090e" />
                      <rect x="42" y="70" width="8" height="8" fill="#07090e" />
                      <rect x="55" y="75" width="14" height="8" fill="#07090e" />
                      <rect x="75" y="75" width="12" height="12" fill="#07090e" />
                    </svg>
                  </div>
                  <div>
                    <span className="block font-mono text-xs font-bold text-neutral-200">
                      ELECTRONIC BOARDING PASS
                    </span>
                    <span className="font-mono text-[10px] text-neutral-400">
                      DOC: 9303 / SHA-512 SECURE
                    </span>
                    <p className="mt-1 text-[11px] text-amber-300/90">
                      Scan at Chauffeur, Lounge & Aircraft Entrance
                    </p>
                  </div>
                </div>

                <div className="flex flex-col sm:items-end">
                  <span className="font-mono text-[10px] text-neutral-400">PASSENGER PASSPORT:</span>
                  <span className="font-mono text-xs font-bold text-cyan-300">
                    {kycData?.passportNumber || 'N9872140A (ARE)'}
                  </span>
                  <span className="font-mono text-[9px] text-neutral-500 mt-0.5">
                    ISSUED BY AURA SOVEREIGN SYSTEM
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Wallet Export and Actions */}
          <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap gap-2.5">
              <button
                onClick={() => handleWalletExport('apple')}
                className="flex items-center gap-2 rounded-xl border border-white/20 bg-black/60 px-4 py-2.5 text-xs font-semibold text-white hover:bg-black transition shadow-md"
              >
                <Smartphone className="h-4 w-4 text-white" />
                <span>{t('btn_apple_wallet')}</span>
              </button>

              <button
                onClick={() => handleWalletExport('google')}
                className="flex items-center gap-2 rounded-xl border border-white/20 bg-neutral-900 px-4 py-2.5 text-xs font-semibold text-white hover:bg-neutral-800 transition shadow-md"
              >
                <Smartphone className="h-4 w-4 text-cyan-400" />
                <span>{t('btn_google_wallet')}</span>
              </button>
            </div>

            <button
              onClick={() => alert('Encrypted Boarding Pass PDF downloaded with official ICAO barcode seal.')}
              className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 px-4 py-2.5 text-xs font-bold text-neutral-950 shadow-lg shadow-amber-400/20 hover:from-amber-300 hover:to-amber-400 transition"
            >
              <Download className="h-4 w-4" />
              <span>{t('btn_print_pdf')}</span>
            </button>
          </div>

          {/* Feedback Message for Wallet Export */}
          {walletSaved && (
            <div className="mt-3 flex items-center justify-center gap-2 rounded-xl border border-emerald-500/40 bg-emerald-950/40 p-2 text-xs font-medium text-emerald-300 animate-in fade-in">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" />
              <span>
                Successfully generated and synced to {walletSaved === 'apple' ? 'Apple Wallet' : 'Google Wallet'}!
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
