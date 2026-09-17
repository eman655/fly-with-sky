import React from 'react';
import { Plane, ShieldCheck, Heart, Sparkles, Globe, Mail, Phone } from 'lucide-react';

export const Footer = ({ lang = 'en' }) => {
  return (
    <footer className="border-t border-white/10 bg-[#070b14] text-xs text-neutral-400">
      {/* Upper Footer Links */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Info */}
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 text-neutral-950 font-bold shadow-md">
                <Plane className="h-5 w-5 transform -rotate-45" />
              </div>
              <span className="font-serif text-lg font-bold tracking-wider text-white">
                The Fly With Sky
              </span>
            </div>
            <p className="text-[12px] text-neutral-400 leading-relaxed">
              {lang === 'ur'
                ? 'دی فلائی ود سکائی — دنیا بھر میں جدید، محفوظ اور پرتعیش بین الاقوامی پروازوں کا سب سے معتبر ادارہ۔'
                : 'The premier international flagship carrier redefining global luxury travel across continents with seamless biometric intelligence.'}
            </p>
          </div>

          {/* Quick Hubs */}
          <div>
            <h4 className="font-serif text-sm font-bold text-white mb-3">
              {lang === 'ur' ? 'اہم ایئرپورٹ روٹس' : 'Key Global Hubs'}
            </h4>
            <ul className="space-y-2 text-[12px]">
              <li>Lahore Allama Iqbal (LHE) ⇄ Dubai (DXB)</li>
              <li>Karachi Jinnah (KHI) ⇄ New York (JFK)</li>
              <li>Islamabad (ISB) ⇄ London Heathrow (LHR)</li>
              <li>Jeddah King Abdulaziz (JED) ⇄ Paris (CDG)</li>
            </ul>
          </div>

          {/* Customer Care */}
          <div>
            <h4 className="font-serif text-sm font-bold text-white mb-3">
              {lang === 'ur' ? 'کسٹمر سپورٹ و ہیلپ لائن' : 'VIP Concierge & Help'}
            </h4>
            <ul className="space-y-2 text-[12px]">
              <li className="flex items-center gap-2">
                <Phone className="h-3.5 w-3.5 text-amber-400" />
                <span>+92 42 111-FLY-SKY (359-759)</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-3.5 w-3.5 text-cyan-400" />
                <span>support@theflywithsky.com</span>
              </li>
              <li className="flex items-center gap-2">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
                <span>ICAO PKD Doc 9303 Compliant</span>
              </li>
            </ul>
          </div>

          {/* Fleet Countries */}
          <div>
            <h4 className="font-serif text-sm font-bold text-white mb-3">
              {lang === 'ur' ? 'فضائی بیڑہ ممالک' : 'Partner Liveries'}
            </h4>
            <p className="text-[12px] leading-relaxed text-neutral-400 mb-2">
              Boeing 777, Airbus A380 & Dreamliner 787 operating with bespoke country flags.
            </p>
            <div className="flex gap-2 text-lg">
              <span title="Pakistan">🇵🇰</span>
              <span title="United Arab Emirates">🇦🇪</span>
              <span title="Saudi Arabia">🇸🇦</span>
              <span title="United Kingdom">🇬🇧</span>
              <span title="United States">🇺🇸</span>
              <span title="France">🇫🇷</span>
              <span title="Turkey">🇹🇷</span>
            </div>
          </div>
        </div>

        {/* Middle divider */}
        <div className="my-8 border-t border-white/5" />

        {/* Bottom Signature Section with Mandatory Developer Attribution */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-start text-[11px] text-neutral-500">
            © 2026 The Fly With Sky Airlines Group LLC. All rights reserved.
          </div>

          {/* MANDATORY DEVELOPER SIGNATURE */}
          <div className="flex items-center gap-2 rounded-full border border-amber-400/40 bg-gradient-to-r from-amber-500/15 via-amber-400/10 to-amber-500/15 px-4 py-1.5 shadow-lg shadow-amber-500/10 backdrop-blur-md">
            <Sparkles className="h-3.5 w-3.5 text-amber-400 animate-pulse" />
            <span className="text-[11px] font-medium text-neutral-300">
              {lang === 'ur' ? 'تیار کردہ:' : 'Crafted with precision:'}
            </span>
            <span className="font-serif text-xs font-bold tracking-wider text-amber-300">
              Developed by Hamza Latif
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
