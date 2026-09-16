# AURA AERO — The Sovereign Sky
## Ultra-Luxury International Flagship Airline Web Platform

A production-grade, flagship digital experience crafted for an ultra-luxury international airline operating bespoke intercontinental routes. Built with high-contrast "Neo-Aero Luxury" aesthetics, native bi-directional internationalization (i18n), a bank-grade WebRTC e-KYC passport scanning engine, an interactive 3D fuselage seat map, and a cryptographic digital boarding pass.

---

### Key Capabilities & Architectural Highlights

#### 1. Internationalization (i18n) & Native Bi-Directional Engine
- **6 Supported World Languages**:
  - English (`en-US` - Default LTR)
  - Urdu (`ur-PK` - Native RTL with Noto Nastaliq Urdu typography)
  - Arabic (`ar-SA` - Native RTL with Tajawal typography)
  - French (`fr-FR` - LTR)
  - Spanish (`es-ES` - LTR)
  - Simplified Chinese (`zh-CN` - LTR)
- **Dynamic Directionality**: Instant, layout-shift-free switching (`dir="ltr"` and `dir="rtl"`) handling text alignment, flight vector arcs, input fields, and icon mirroring.
- **Dynamic Currency Switcher**: Linked with active language/region and real-time conversion rates:
  - USD (`$`), EUR (`€`), PKR (`₨`), AED (`د.إ`), CNY (`¥`), GBP (`£`).

#### 2. Live WebRTC Camera Passport Scanning & e-KYC Engine
- **Browser-Based Live Camera Stream**: Using `navigator.mediaDevices.getUserMedia` with high-resolution visual bounding guides and fallback simulation feed.
- **Step 1: Optical Passport MRZ Alignment**: 16:9 holographic framing with dynamic animated laser beam.
- **Step 2: Biometric Liveness Face Match**: Oval biometric reticle with dynamic pulse detection.
- **Step 3: ICAO PKD Cryptographic Clearance**:
  - Auto-fill parser mock for MRZ-2 machine-readable codes.
  - Automatic Visa Requirement Checker (evaluates passenger passport nationality vs. destination IATA code).

#### 3. Visual & Aesthetic Identity ("Neo-Aero Luxury")
- Dark obsidian (`#07090e`) and deep midnight navy (`#0e1424`) canvas.
- Subtle Champagne Gold (`#D4AF37`) and Hyper-Cyan Neon (`#06B6D4`) avionics accents.
- Frosted glassmorphism (`backdrop-blur-xl`) with custom avionics borders.

#### 4. Core Functional Modules
1. **Hero Global Flight Booking Engine**:
   - Trip Selector: One-way, Round-trip, Multi-city.
   - Smart Origin/Destination with IATA codes (DXB, LHR, JFK, ISB, CDG, HND).
   - Fare Calendar displaying lowest estimated fares.
   - Cabin Class: Grand Economy, Prestige Premium, Aura Lie-Flat Business, Sovereign Royal Suite.
2. **Interactive 3D Aircraft Cabin Seat Map**:
   - Boeing 777-9 Sovereign widebody layout.
   - Enclosed Royal Suites (1-1-1 with sliding doors), Business lie-flat, Premium Extra-Legroom, and Emergency Exit seats.
   - Real-time per-seat price calculation linked with active currency.
3. **Self-Service Portal & Digital Boarding Pass**:
   - Cryptographic boarding pass with high-contrast dynamic SVG QR code.
   - PNR reference retriever, gate details, and Apple/Google Wallet export triggers.

---

### Project File Structure

```
Air line website/
├── app/
│   ├── layout.tsx                      # Root layout with Google Fonts and metadata
│   ├── page.tsx                        # Main page integrating all reactive modules
│   └── globals.css                     # Custom glassmorphism, avionics & RTL typography
├── components/
│   ├── Header.tsx                      # Interactive header with language & currency switcher
│   ├── FlightBookingEngine.tsx         # Flight search, fare calendar & flight results
│   ├── InteractiveSeatMap.tsx          # 3D Boeing 777-9 cabin with Royal Suites
│   ├── PassportVerificationModal.tsx   # WebRTC live camera e-KYC & ICAO clearance
│   └── BoardingPassModal.tsx           # Digital boarding pass & wallet export
├── lib/
│   └── i18n.ts                         # 6-language translations, currency rates & visa logic
├── types/
│   └── airline.ts                      # Core TypeScript definitions
├── index.html                          # Standalone immediately executable browser bundle
├── package.json                        # Dependencies for Next.js / React 18/19
├── tailwind.config.js                  # Tailwind configuration
├── tsconfig.json                       # TypeScript compiler options
└── README.md                           # Documentation
```

---

### Immediate Execution Instructions

#### Method 1: Instant Browser Launch (Zero Dependencies)
You can immediately view and interact with the full application right now:
1. Open Windows Explorer in this directory: `d:\mandi system lqp\Air line website`
2. Double-click `index.html` (or run `Start-Process index.html` in PowerShell).
3. The application will immediately open in Google Chrome or Microsoft Edge with all interactive features, WebRTC camera feed, language switching, 3D seat map, and boarding pass active.

#### Method 2: Next.js App Router (When Node.js is installed)
```bash
npm install
npm run dev
```
Then visit `http://localhost:3000`.
