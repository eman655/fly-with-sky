export type LanguageCode = 'en' | 'ur' | 'fr' | 'ar' | 'es' | 'zh';
export type Direction = 'ltr' | 'rtl';
export type CurrencyCode = 'USD' | 'EUR' | 'PKR' | 'AED' | 'CNY' | 'GBP';

export interface CurrencyConfig {
  code: CurrencyCode;
  symbol: string;
  rateAgainstUSD: number;
  format: (amountUSD: number) => string;
}

export interface Airport {
  iata: string;
  city: string;
  country: string;
  name: string;
  timezone: string;
}

export type CabinClass = 'economy' | 'premium_economy' | 'business' | 'first_suite';

export type TripType = 'round_trip' | 'one_way' | 'multi_city';

export interface Flight {
  id: string;
  flightNumber: string;
  origin: Airport;
  destination: Airport;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  aircraft: string;
  stops: number;
  basePricesUSD: Record<CabinClass, number>;
  perks: string[];
}

export interface KycPassportData {
  fullName: string;
  passportNumber: string;
  nationality: string;
  dateOfBirth: string;
  expiryDate: string;
  gender: 'M' | 'F' | 'X';
  mrzRaw: string;
  icaoVerified: boolean;
  biometricMatchConfidence: number;
  visaStatus: 'EXEMPT' | 'REQUIRED' | 'EVisa_ELIGIBLE' | 'CHECKING';
  visaNotes?: string;
}

export type SeatCategory = 'first_suite' | 'business_lie_flat' | 'premium_legroom' | 'economy_standard';
export type SeatFeature = 'window' | 'aisle' | 'middle' | 'extra_legroom' | 'bassinet' | 'emergency_exit';

export interface Seat {
  id: string;
  row: number;
  col: string;
  category: SeatCategory;
  features: SeatFeature[];
  priceUSD: number;
  isOccupied: boolean;
  isSelected?: boolean;
}

export interface BookingState {
  tripType: TripType;
  origin: Airport;
  destination: Airport;
  departureDate: string;
  returnDate: string;
  passengers: {
    adults: number;
    children: number;
    infants: number;
  };
  cabinClass: CabinClass;
  selectedFlight?: Flight;
  selectedSeats: Seat[];
  kycData?: KycPassportData;
  pnr?: string;
  totalPriceUSD: number;
}
