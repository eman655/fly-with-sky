import React, { useState } from 'react';
import { Plane, Users, Gauge, ArrowRight, Sparkles, CheckCircle2, Shield } from 'lucide-react';

export const FLEET_ITEMS = [
  {
    id: 'fleet-pk-777',
    name: 'Boeing 777-300ER Flagship',
    airlineLivery: 'Pakistan Emerald Green & White Livery',
    country: 'Pakistan',
    countryCode: 'PK',
    flag: '🇵🇰',
    capacity: '396 Passengers (Royal First, Business, Economy)',
    cruiseSpeed: '905 km/h (Mach 0.84)',
    range: '13,650 km',
    image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=1200&q=80',
    badge: 'National Pride Livery',
    description: 'Bespoke green-tail sovereign livery with traditional floral calligraphy and spacious twin-aisle executive comfort.',
    accentColor: 'from-emerald-500/20 to-emerald-900/40'
  },
  {
    id: 'fleet-uae-a380',
    name: 'Airbus A380-800 Superjumbo',
    airlineLivery: 'Emirates Golden Falcon Tail Livery',
    country: 'United Arab Emirates',
    countryCode: 'AE',
    flag: '🇦🇪',
    capacity: '517 Passengers (Private Suites, Shower Spa)',
    cruiseSpeed: '945 km/h (Mach 0.85)',
    range: '15,200 km',
    image: 'https://images.unsplash.com/photo-1570710891163-6d3b5c47248b?auto=format&fit=crop&w=1200&q=80',
    badge: 'Ultra-Luxury Double Decker',
    description: 'Gleaming champagne-gold tail emblem, enclosed First Class royal suites, and on-board lounge bar.',
    accentColor: 'from-amber-500/20 to-yellow-900/40'
  },
  {
    id: 'fleet-sa-787',
    name: 'Boeing 787-9 Dreamliner',
    airlineLivery: 'Saudia Green & Sand Heritage Livery',
    country: 'Saudi Arabia',
    countryCode: 'SA',
    flag: '🇸🇦',
    capacity: '298 Passengers (Lie-Flat Suites)',
    cruiseSpeed: '913 km/h (Mach 0.85)',
    range: '14,140 km',
    image: 'https://images.unsplash.com/photo-1519074069444-1ba4ea16e834?auto=format&fit=crop&w=1200&q=80',
    badge: 'Modern Heritage Livery',
    description: 'Modernized deep-green and desert-sand livery celebrating historical aviation excellence and quiet cabin technology.',
    accentColor: 'from-emerald-600/20 to-amber-900/40'
  },
  {
    id: 'fleet-uk-a350',
    name: 'Airbus A350-1000 Intercontinental',
    airlineLivery: 'British Airways Union Jack Speedbird',
    country: 'United Kingdom',
    countryCode: 'GB',
    flag: '🇬🇧',
    capacity: '331 Passengers (Club Suite with Sliding Doors)',
    cruiseSpeed: '903 km/h (Mach 0.85)',
    range: '16,100 km',
    image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1200&q=80',
    badge: 'Speedbird Icon',
    description: 'Iconic stylized Union Jack fin and Chatham Historic Dockyard ribbon styling with whisper-quiet carbon composite wings.',
    accentColor: 'from-blue-600/20 to-red-900/40'
  },
  {
    id: 'fleet-us-787',
    name: 'Boeing 787-10 Dreamliner',
    airlineLivery: 'American Classic Flagship Livery',
    country: 'United States',
    countryCode: 'US',
    flag: '🇺🇸',
    capacity: '330 Passengers (Flagship Suite®)',
    cruiseSpeed: '903 km/h (Mach 0.85)',
    range: '11,910 km',
    image: 'https://images.unsplash.com/photo-1520437358207-323b43b50729?auto=format&fit=crop&w=1200&q=80',
    badge: 'Transatlantic Cruiser',
    description: 'Polished mica silver composite fuselage adorned with the dynamic patriotic red, white, and blue aerodynamic tail.',
    accentColor: 'from-blue-500/20 to-indigo-950/40'
  },
  {
    id: 'fleet-fr-a350',
    name: 'Airbus A350-900 Haute Aero',
    airlineLivery: 'Air France Elegant Tricolor Accent',
    country: 'France',
    countryCode: 'FR',
    flag: '🇫🇷',
    capacity: '324 Passengers (Haute Couture Cabin)',
    cruiseSpeed: '903 km/h (Mach 0.85)',
    range: '15,000 km',
    image: 'https://images.unsplash.com/photo-1569154941061-e231b4725ef1?auto=format&fit=crop&w=1200&q=80',
    badge: 'Art of French Travel',
    description: 'Chic minimalist pure white fuselage with the historic winged seahorse emblem and subtle Parisian tricolor wingtips.',
    accentColor: 'from-indigo-600/20 to-blue-900/40'
  },
  {
    id: 'fleet-tr-787',
    name: 'Boeing 787-9 Dreamliner',
    airlineLivery: 'Turkish Airlines Crimson Wing & Wild Goose',
    country: 'Turkey',
    countryCode: 'TR',
    flag: '🇹🇷',
    capacity: '300 Passengers (Flow Philosophy Design)',
    cruiseSpeed: '913 km/h (Mach 0.85)',
    range: '14,800 km',
    image: 'https://images.unsplash.com/photo-1506015391300-4802dc74de2e?auto=format&fit=crop&w=1200&q=80',
    badge: 'Eurasian Gateway Livery',
    description: 'Deep crimson tail featuring the iconic wild-goose symbol capable of non-stop transcontinental voyages spanning all continents.',
    accentColor: 'from-red-600/20 to-rose-950/40'
  }
];

export const FleetGallery = ({ onSelectAircraft, t, lang = 'en' }) => {
  const [activeFilter, setActiveFilter] = useState('ALL');
  const [selectedFleet, setSelectedFleet] = useState(FLEET_ITEMS[0]);

  const filteredItems = activeFilter === 'ALL'
    ? FLEET_ITEMS
    : FLEET_ITEMS.filter((item) => item.countryCode === activeFilter);

  return (
    <section id="fleet-gallery" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/10">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 rounded-full border border-amber-400/40 bg-amber-400/10 px-4 py-1.5 text-xs font-bold text-amber-300 mb-3 shadow-md shadow-amber-500/10">
          <Sparkles className="h-3.5 w-3.5 text-amber-400" />
          <span>{lang === 'ur' ? 'عالمی فلیگ شپ فضائی بیڑہ' : 'WORLD-CLASS GLOBAL FLEET'}</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
          {lang === 'ur' ? 'خصوصی قومی رنگوں میں سجے طیارے' : 'Signature Country Airline Liveries'}
        </h2>
        <p className="mt-3 text-sm sm:text-base text-neutral-300 leading-relaxed">
          {lang === 'ur'
            ? 'پاکستان، امارات، سعودی عرب، برطانیہ، امریکہ، فرانس اور ترکیہ کے مستند ایئرلائن طیاروں کے ساتھ اپنا سفر باوقار بنائیں۔'
            : 'Experience intercontinental voyages aboard iconic aircraft styled in world-renowned national flagship liveries.'}
        </p>
      </div>

      {/* Country Filter Pill Navigation */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
        <button
          onClick={() => setActiveFilter('ALL')}
          className={`rounded-full px-4 py-2 text-xs font-semibold transition-all ${
            activeFilter === 'ALL'
              ? 'bg-amber-400 text-neutral-950 shadow-lg shadow-amber-400/20'
              : 'border border-white/10 bg-white/5 text-neutral-300 hover:border-white/20'
          }`}
        >
          {lang === 'ur' ? 'تمام طیارے (All Fleet)' : 'All Aircraft (7)'}
        </button>

        {FLEET_ITEMS.map((plane) => (
          <button
            key={plane.countryCode}
            onClick={() => setActiveFilter(plane.countryCode)}
            className={`flex items-center gap-1.5 rounded-full px-3.5 py-2 text-xs font-semibold transition-all ${
              activeFilter === plane.countryCode
                ? 'bg-amber-400 text-neutral-950 shadow-lg shadow-amber-400/20'
                : 'border border-white/10 bg-white/5 text-neutral-300 hover:border-white/20'
            }`}
          >
            <span className="text-base">{plane.flag}</span>
            <span>{plane.country}</span>
          </button>
        ))}
      </div>

      {/* Grid of Aircraft Fleet Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((aircraft) => (
          <div
            key={aircraft.id}
            className="group relative overflow-hidden rounded-3xl border border-white/15 bg-gradient-to-b from-[#0e1626] to-[#0a0e1a] shadow-xl hover:border-amber-400/50 hover:shadow-2xl hover:shadow-amber-500/10 transition-all duration-300 flex flex-col justify-between"
          >
            {/* Top Image Frame with Livery Tag */}
            <div className="relative aspect-[16/10] w-full overflow-hidden bg-neutral-900">
              <img
                src={aircraft.image}
                alt={aircraft.name}
                className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0e1626] via-black/20 to-transparent" />

              {/* Country Badge & Livery Highlight */}
              <div className="absolute top-3 start-3 flex items-center gap-2 rounded-full border border-white/20 bg-black/60 backdrop-blur-md px-3 py-1 text-xs font-semibold text-white">
                <span className="text-base">{aircraft.flag}</span>
                <span>{aircraft.country}</span>
              </div>

              <div className="absolute bottom-3 start-3 end-3">
                <span className="inline-block rounded-lg bg-amber-400/90 text-neutral-950 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider">
                  {aircraft.badge}
                </span>
                <h3 className="font-serif text-lg font-bold text-white mt-1 leading-snug drop-shadow-md">
                  {aircraft.name}
                </h3>
              </div>
            </div>

            {/* Content Body */}
            <div className="p-5 flex-1 flex flex-col justify-between">
              <div>
                <p className="text-xs font-semibold text-amber-300 mb-2">
                  {aircraft.airlineLivery}
                </p>
                <p className="text-xs text-neutral-300 leading-relaxed mb-4">
                  {aircraft.description}
                </p>

                {/* Specs Box */}
                <div className="space-y-2 rounded-2xl border border-white/10 bg-white/[0.02] p-3 text-xs">
                  <div className="flex items-center justify-between text-neutral-400">
                    <span className="flex items-center gap-1.5">
                      <Users className="h-3.5 w-3.5 text-amber-400" />
                      {lang === 'ur' ? 'مسافر گنجائش' : 'Seating Capacity'}
                    </span>
                    <span className="font-semibold text-neutral-200">{aircraft.capacity.split('(')[0]}</span>
                  </div>
                  <div className="flex items-center justify-between text-neutral-400">
                    <span className="flex items-center gap-1.5">
                      <Gauge className="h-3.5 w-3.5 text-cyan-400" />
                      {lang === 'ur' ? 'رفتار پرواز' : 'Cruising Speed'}
                    </span>
                    <span className="font-mono text-neutral-200">{aircraft.cruiseSpeed}</span>
                  </div>
                </div>
              </div>

              {/* Action Button: Fly with this Aircraft */}
              <div className="mt-5 pt-3 border-t border-white/10">
                <button
                  onClick={() => onSelectAircraft && onSelectAircraft(aircraft)}
                  className="w-full flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-amber-400 to-amber-500 py-3 text-xs font-bold text-neutral-950 shadow-md hover:from-amber-300 hover:to-amber-400 transition transform active:scale-98"
                >
                  <Plane className="h-4 w-4" />
                  <span>{lang === 'ur' ? 'اس طیارے میں پرواز منتخب کریں' : 'Fly with this Aircraft'}</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
