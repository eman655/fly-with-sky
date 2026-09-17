export type LanguageCode = 'en' | 'ur' | 'ar' | 'fr' | 'es' | 'zh';
export type Direction = 'ltr' | 'rtl';
export type CurrencyCode = 'PKR' | 'USD' | 'AED' | 'EUR' | 'GBP' | 'CNY';

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
  isDomestic?: boolean;
}

export type CabinClass = 'economy' | 'business' | 'first_suite';

export type TripType = 'round_trip' | 'one_way';

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
  stopDescription?: string;
  basePricesUSD: Record<CabinClass, number>;
  baggageAllowance: string;
  mealIncluded: string;
}

export interface UserProfile {
  fullName: string;
  cnic: string; // e.g. 35201-1234567-1
  email: string;
  phone: string;
  passportNumber?: string;
  nationality: string;
  loyaltyTier: 'Classic' | 'Silver' | 'Gold' | 'Empyrean VIP';
  milesBalance: number;
}

export interface PassengerBookingDetails {
  fullName: string;
  cnic: string;
  passportNumber: string;
  phone: string;
  email: string;
  dateOfBirth: string;
  gender: 'M' | 'F';
  nationality: string;
  mealPreference: string;
  specialAssistance: string;
}

export interface Seat {
  id: string;
  row: number;
  col: string;
  category: 'royal_suite' | 'business_flat' | 'economy_plus' | 'economy';
  priceUSD: number;
  isOccupied: boolean;
  features: string[];
}

export interface ConfirmedBooking {
  pnr: string;
  eTicketNumber: string;
  flight: Flight;
  cabin: CabinClass;
  passenger: PassengerBookingDetails;
  seatId: string;
  totalPaidUSD: number;
  bookingDate: string;
  status: 'CONFIRMED' | 'ISSUED';
}

export interface KycPassportData {
  fullName: string;
  passportNumber: string;
  nationality: string;
  dateOfBirth: string;
  expiryDate: string;
  gender: string;
  mrzRaw: string;
  icaoVerified: boolean;
  biometricMatchConfidence: number;
  visaStatus: 'EXEMPT' | 'ETA_REQUIRED' | 'VISA_REQUIRED' | 'REQUIRED' | 'EVisa_ELIGIBLE';
  visaNotes: string;
}

