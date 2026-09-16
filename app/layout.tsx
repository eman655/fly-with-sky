import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'AURA AERO | The Sovereign Sky - Ultra-Luxury Flagship Airline',
  description: 'Global flagship airline operating bespoke private suites across the continents with real-time biometric e-KYC clearance.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" dir="ltr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cinzel:wght@500;700;900&family=Inter:wght@300;400;500;600;700&family=Noto+Nastaliq+Urdu:wght@400;700&family=Tajawal:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-[#07090e] text-neutral-100 antialiased">{children}</body>
    </html>
  );
}
