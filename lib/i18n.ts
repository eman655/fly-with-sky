import { Airport, Flight, CurrencyConfig, CurrencyCode, LanguageCode, Direction } from '../types/airline';

export const BRAND_NAME = 'EMPYREAN AIRWAYS';
export const BRAND_NAME_UR = 'امپیریئن ایئرویز';

export interface LanguageMeta {
  code: LanguageCode;
  name: string;
  nativeName: string;
  dir: Direction;
  fontFamily: string;
  defaultCurrency: CurrencyCode;
}

export const LANGUAGES: Record<LanguageCode, LanguageMeta> = {
  ur: {
    code: 'ur',
    name: 'Urdu',
    nativeName: 'اردو',
    dir: 'rtl',
    fontFamily: "'Noto Nastaliq Urdu', 'Jameel Noori Nastaleeq', serif",
    defaultCurrency: 'PKR'
  },
  en: {
    code: 'en',
    name: 'English',
    nativeName: 'English',
    dir: 'ltr',
    fontFamily: 'Inter, system-ui, sans-serif',
    defaultCurrency: 'USD'
  },
  ar: {
    code: 'ar',
    name: 'Arabic',
    nativeName: 'العربية',
    dir: 'rtl',
    fontFamily: "'Tajawal', 'IBM Plex Sans Arabic', sans-serif",
    defaultCurrency: 'AED'
  },
  fr: {
    code: 'fr',
    name: 'French',
    nativeName: 'Français',
    dir: 'ltr',
    fontFamily: 'Inter, system-ui, sans-serif',
    defaultCurrency: 'EUR'
  },
  es: {
    code: 'es',
    name: 'Spanish',
    nativeName: 'Español',
    dir: 'ltr',
    fontFamily: 'Inter, system-ui, sans-serif',
    defaultCurrency: 'EUR'
  },
  zh: {
    code: 'zh',
    name: 'Chinese',
    nativeName: '中文',
    dir: 'ltr',
    fontFamily: "'PingFang SC', 'Microsoft YaHei', sans-serif",
    defaultCurrency: 'CNY'
  }
};

export const CURRENCIES: Record<CurrencyCode, CurrencyConfig> = {
  PKR: {
    code: 'PKR',
    symbol: '₨',
    rateAgainstUSD: 278.5,
    format: (amt) => `₨ ${Math.round(amt * 278.5).toLocaleString('ur-PK')}`
  },
  USD: {
    code: 'USD',
    symbol: '$',
    rateAgainstUSD: 1.0,
    format: (amt) => `$${Math.round(amt).toLocaleString('en-US')}`
  },
  AED: {
    code: 'AED',
    symbol: 'د.إ',
    rateAgainstUSD: 3.67,
    format: (amt) => `${Math.round(amt * 3.67).toLocaleString('ar-AE')} AED`
  },
  EUR: {
    code: 'EUR',
    symbol: '€',
    rateAgainstUSD: 0.92,
    format: (amt) => `€${Math.round(amt * 0.92).toLocaleString('de-DE')}`
  },
  GBP: {
    code: 'GBP',
    symbol: '£',
    rateAgainstUSD: 0.79,
    format: (amt) => `£${Math.round(amt * 0.79).toLocaleString('en-GB')}`
  },
  CNY: {
    code: 'CNY',
    symbol: '¥',
    rateAgainstUSD: 7.24,
    format: (amt) => `¥${Math.round(amt * 7.24).toLocaleString('zh-CN')}`
  }
};

export const AIRPORTS: Airport[] = [
  { iata: 'LHE', city: 'Lahore', country: 'Pakistan', name: 'Allama Iqbal International', isDomestic: true },
  { iata: 'KHI', city: 'Karachi', country: 'Pakistan', name: 'Jinnah International', isDomestic: true },
  { iata: 'ISB', city: 'Islamabad', country: 'Pakistan', name: 'Islamabad International', isDomestic: true },
  { iata: 'DXB', city: 'Dubai', country: 'United Arab Emirates', name: 'Dubai International' },
  { iata: 'JFK', city: 'New York', country: 'United States', name: 'John F. Kennedy International' },
  { iata: 'LHR', city: 'London', country: 'United Kingdom', name: 'Heathrow Airport' },
  { iata: 'JED', city: 'Jeddah', country: 'Saudi Arabia', name: 'King Abdulaziz International' }
];

export const FLIGHTS_CATALOG: Flight[] = [
  // 1. Lahore to Dubai (LHE -> DXB)
  {
    id: 'EMP-701',
    flightNumber: 'EMP 701',
    origin: AIRPORTS[0], // LHE
    destination: AIRPORTS[3], // DXB
    departureTime: '09:15',
    arrivalTime: '11:55',
    duration: '3h 40m',
    aircraft: 'Boeing 777-300ER Flagship',
    stops: 0,
    basePricesUSD: { economy: 320, business: 950, first_suite: 2400 },
    baggageAllowance: '2 x 23kg Check-in + 7kg Hand Baggage',
    mealIncluded: 'Gourmet Halal Warm Breakfast & Refreshments'
  },
  // 2. Lahore to Karachi (LHE -> KHI) Domestic Express
  {
    id: 'EMP-301',
    flightNumber: 'EMP 301',
    origin: AIRPORTS[0], // LHE
    destination: AIRPORTS[1], // KHI
    departureTime: '08:00',
    arrivalTime: '09:45',
    duration: '1h 45m',
    aircraft: 'Airbus A330 Prestige',
    stops: 0,
    basePricesUSD: { economy: 95, business: 280, first_suite: 550 },
    baggageAllowance: '30kg Check-in + 7kg Hand Baggage',
    mealIncluded: 'Hot Savory Snack & Fresh Mango Juice'
  },
  // 3. Lahore to New York (LHE -> JFK)
  {
    id: 'EMP-901',
    flightNumber: 'EMP 901',
    origin: AIRPORTS[0], // LHE
    destination: AIRPORTS[4], // JFK
    departureTime: '03:40',
    arrivalTime: '14:30',
    duration: '16h 50m',
    aircraft: 'Boeing 777-300ER / Dreamliner',
    stops: 1,
    stopDescription: 'Direct 1-Stop connection via Dubai DXB (1h 40m transit)',
    basePricesUSD: { economy: 880, business: 3400, first_suite: 7900 },
    baggageAllowance: '2 x 32kg Check-in (Royal Baggage) + 10kg Hand',
    mealIncluded: 'Full 3-Course Halal Feast, Caviar Service & High Tea'
  },
  // 4. Karachi to New York (KHI -> JFK)
  {
    id: 'EMP-905',
    flightNumber: 'EMP 905',
    origin: AIRPORTS[1], // KHI
    destination: AIRPORTS[4], // JFK
    departureTime: '04:15',
    arrivalTime: '15:10',
    duration: '16h 55m',
    aircraft: 'Boeing 777-300ER Executive',
    stops: 1,
    stopDescription: 'Seamless 1-Stop via Dubai DXB (1h 30m transfer)',
    basePricesUSD: { economy: 850, business: 3300, first_suite: 7800 },
    baggageAllowance: '2 x 32kg Check-in + 10kg Hand Baggage',
    mealIncluded: 'Multi-course Gourmet Dining with Continental & Pakistani Delicacies'
  },
  // 5. Karachi to Dubai (KHI -> DXB)
  {
    id: 'EMP-703',
    flightNumber: 'EMP 703',
    origin: AIRPORTS[1], // KHI
    destination: AIRPORTS[3], // DXB
    departureTime: '13:30',
    arrivalTime: '14:45',
    duration: '2h 15m',
    aircraft: 'Boeing 787-9 Dreamliner',
    stops: 0,
    basePricesUSD: { economy: 240, business: 750, first_suite: 1900 },
    baggageAllowance: '35kg Check-in + 7kg Hand Baggage',
    mealIncluded: 'Chefs Special Biryani & Traditional Dessert'
  },
  // 6. Islamabad to London (ISB -> LHR)
  {
    id: 'EMP-801',
    flightNumber: 'EMP 801',
    origin: AIRPORTS[2], // ISB
    destination: AIRPORTS[5], // LHR
    departureTime: '11:00',
    arrivalTime: '15:15',
    duration: '8h 15m',
    aircraft: 'Boeing 777-300ER Non-stop',
    stops: 0,
    basePricesUSD: { economy: 650, business: 2400, first_suite: 5900 },
    baggageAllowance: '2 x 23kg Check-in + 7kg Hand Baggage',
    mealIncluded: 'Royal In-Flight Dining & High Tea Service'
  }
];

export const TRANSLATIONS: Record<LanguageCode, Record<string, string>> = {
  ur: {
    brand_name: 'امپیریئن ایئرویز',
    brand_tagline: 'شاہی عالمی پروازیں | ایک باوقار سفر کا آغاز',
    nav_home: 'ہوم',
    nav_flights: 'پروازیں',
    nav_my_bookings: 'میری بکنگز',
    nav_login: 'لاگ ان',
    nav_register: 'اکاؤنٹ بنائیں',
    nav_logout: 'لاگ آؤٹ',
    hero_title: 'آسانی اور فخریہ انداز کے ساتھ سفر کریں',
    hero_subtitle: 'لاہور، کراچی، اسلام آباد، دبئی، نیویارک اور لندن کی براہِ راست اور پرتعیش پروازیں کم ترین ریٹس پر۔',
    tab_flights: 'پرواز کی بکنگ',
    label_from: 'کہاں سے (روانگی)',
    label_to: 'کہاں تک (منزل)',
    label_date: 'روانگی کی تاریخ',
    label_cabin: 'کلاس',
    label_passengers: 'مسافرین',
    btn_search: 'پروازیں تلاش کریں',
    cabin_economy: 'اکانومی کلاس',
    cabin_business: 'بزنس کلاس (لائی فلیٹ)',
    cabin_first_suite: 'شاہی فرسٹ سویٹ',
    results_found: 'دستیاب پروازیں',
    btn_book_now: 'یہ سیٹ بک کریں',
    passenger_title: 'مسافر کی ذاتی معلومات',
    passenger_desc: 'ٹکٹ اور ایئرپورٹ بورڈنگ کے لیے درست کوائف درج کریں:',
    field_fullname: 'پورا نام (شناختی کارڈ / پاسپورٹ کے مطابق)',
    field_cnic: 'قومی شناختی کارڈ نمبر (CNIC)',
    field_passport: 'پاسپورٹ نمبر (بین الاقوامی سفر کے لیے)',
    field_phone: 'موبائل نمبر / واٹس ایپ',
    field_email: 'ای میل ایڈریس',
    field_dob: 'تاریخِ پیدائش',
    field_gender: 'جنس',
    field_gender_m: 'مرد (Male)',
    field_gender_f: 'خاتون (Female)',
    field_meal: 'کھانے کی ترجیح',
    btn_confirm_ticket: 'ٹکٹ جاری کریں اور بورڈنگ پاس حاصل کریں',
    ticket_success_title: 'مبارک ہو! آپ کی ٹکٹ کنفرم ہو گئی ہے',
    ticket_pnr: 'بکنگ ریفرنس (PNR)',
    ticket_eticket: 'ای ٹکٹ نمبر',
    ticket_passenger: 'مسافر کا نام',
    ticket_cnic: 'شناختی کارڈ نمبر',
    btn_print_ticket: 'ٹکٹ پرنٹ / محفوظ کریں (Print Ticket)',
    auth_login_title: 'اپنے اکاؤنٹ میں لاگ ان کریں',
    auth_register_title: 'نیا اکاؤنٹ رجسٹر کریں',
    auth_login_desc: 'اپنے شناختی کارڈ، ای میل یا فون نمبر سے لاگ ان کریں:',
    auth_or_method: 'لاگ ان کا طریقہ منتخب کریں:',
    auth_by_cnic: 'شناختی کارڈ (CNIC)',
    auth_by_email: 'ای میل (Email)',
    auth_by_phone: 'فون نمبر (Phone)',
    auth_password: 'پاس ورڈ (Password)',
    auth_btn_login: 'لاگ ان کریں',
    auth_btn_register: 'اکاؤنٹ بنائیں (Register)',
    auth_switch_to_register: 'اکاؤنٹ نہیں ہے؟ نیا اکاؤنٹ بنائیں',
    auth_switch_to_login: 'پہلے سے رجسٹرڈ ہیں؟ لاگ ان کریں',
    auth_logged_in_as: 'خوش آمدید',
    baggage_info: 'سامان کی اجازت:',
    meal_info: 'کھانا:'
  },
  en: {
    brand_name: 'EMPYREAN AIRWAYS',
    brand_tagline: 'The Royal Flagship | Travel with Dignity & Comfort',
    nav_home: 'Home',
    nav_flights: 'Book Flights',
    nav_my_bookings: 'My Bookings',
    nav_login: 'Sign In',
    nav_register: 'Create Account',
    nav_logout: 'Sign Out',
    hero_title: 'Effortless Luxury in the Skies',
    hero_subtitle: 'Premier direct and seamless connections between Lahore, Karachi, Islamabad, Dubai, New York, and London.',
    tab_flights: 'Book a Flight',
    label_from: 'From (Origin)',
    label_to: 'To (Destination)',
    label_date: 'Departure Date',
    label_cabin: 'Class',
    label_passengers: 'Travelers',
    btn_search: 'Search Flights',
    cabin_economy: 'Economy Class',
    cabin_business: 'Business Class (Lie-Flat)',
    cabin_first_suite: 'Royal First Suite',
    results_found: 'Available Flights',
    btn_book_now: 'Book This Flight',
    passenger_title: 'Passenger Personal Details',
    passenger_desc: 'Please enter accurate information as printed on your CNIC or Passport:',
    field_fullname: 'Full Legal Name (as on CNIC/Passport)',
    field_cnic: 'National ID / CNIC Number',
    field_passport: 'Passport Number (For International Travel)',
    field_phone: 'Mobile / WhatsApp Number',
    field_email: 'Email Address',
    field_dob: 'Date of Birth',
    field_gender: 'Gender',
    field_gender_m: 'Male',
    field_gender_f: 'Female',
    field_meal: 'Meal Preference',
    btn_confirm_ticket: 'Confirm Booking & Issue E-Ticket',
    ticket_success_title: 'Booking Confirmed! E-Ticket Issued',
    ticket_pnr: 'Booking Reference (PNR)',
    ticket_eticket: 'E-Ticket Number',
    ticket_passenger: 'Passenger Name',
    ticket_cnic: 'CNIC / ID Number',
    btn_print_ticket: 'Print / Save E-Ticket (PDF)',
    auth_login_title: 'Sign In to Your Account',
    auth_register_title: 'Create Your Member Profile',
    auth_login_desc: 'Sign in using your National ID (CNIC), Email, or Phone number:',
    auth_or_method: 'Choose Sign-In Method:',
    auth_by_cnic: 'CNIC / National ID',
    auth_by_email: 'Email Address',
    auth_by_phone: 'Phone Number',
    auth_password: 'Password',
    auth_btn_login: 'Sign In',
    auth_btn_register: 'Complete Registration',
    auth_switch_to_register: "Don't have an account? Register now",
    auth_switch_to_login: 'Already registered? Sign In',
    auth_logged_in_as: 'Welcome',
    baggage_info: 'Baggage Allowance:',
    meal_info: 'In-Flight Catering:'
  },
  ar: {
    brand_name: 'طيران إمبيريان',
    brand_tagline: 'الرحلات الملكية العالمية | الفخامة والراحة في السماء',
    nav_home: 'الرئيسية',
    nav_flights: 'حجز الرحلات',
    nav_my_bookings: 'حجوزاتي',
    nav_login: 'تسجيل الدخول',
    nav_register: 'إنشاء حساب',
    nav_logout: 'تسجيل الخروج',
    hero_title: 'سافر برفاهية وسهولة مطلقة',
    hero_subtitle: 'رحلات مباشرة وفاخرة بين لاهور، كراتشي، دبي، نيويورك، ولندن بأفضل الأسعار.',
    tab_flights: 'حجز رحلة',
    label_from: 'من (مطار الإقلاع)',
    label_to: 'إلى (مطار الوصول)',
    label_date: 'تاريخ المغادرة',
    label_cabin: 'درجة السفر',
    label_passengers: 'المسافرون',
    btn_search: 'بحث عن الرحلات',
    cabin_economy: 'الدرجة السياحية',
    cabin_business: 'درجة الأعمال المنبسطة',
    cabin_first_suite: 'الجناح الملكي الأول',
    results_found: 'الرحلات المتاحة',
    btn_book_now: 'احجز هذه الرحلة',
    passenger_title: 'بيانات المسافر الشخصية',
    passenger_desc: 'يرجى إدخال البيانات المطابقة للهوية أو جواز السفر:',
    field_fullname: 'الاسم الكامل',
    field_cnic: 'رقم الهوية الوطنية / الإقامة',
    field_passport: 'رقم جواز السفر',
    field_phone: 'رقم الهاتف / واتساب',
    field_email: 'البريد الإلكتروني',
    field_dob: 'تاريخ الميلاد',
    field_gender: 'الجنس',
    field_gender_m: 'ذكر',
    field_gender_f: 'أنثى',
    field_meal: 'تفضيل الوجبة',
    btn_confirm_ticket: 'تأكيد الحجز وإصدار التذكرة الإلكترونية',
    ticket_success_title: 'تم تأكيد حجزك بنجاح!',
    ticket_pnr: 'مرجع الحجز (PNR)',
    ticket_eticket: 'رقم التذكرة الإلكترونية',
    ticket_passenger: 'اسم المسافر',
    ticket_cnic: 'رقم الهوية',
    btn_print_ticket: 'طباعة التذكرة الإلكترونية',
    auth_login_title: 'تسجيل الدخول',
    auth_register_title: 'إنشاء حساب جديد',
    auth_login_desc: 'سجل الدخول برقم الهوية، البريد أو الهاتف:',
    auth_or_method: 'طريقة الدخول:',
    auth_by_cnic: 'الهوية الوطنية',
    auth_by_email: 'البريد الإلكتروني',
    auth_by_phone: 'رقم الهاتف',
    auth_password: 'كلمة المرور',
    auth_btn_login: 'دخول',
    auth_btn_register: 'تسجيل',
    auth_switch_to_register: 'ليس لديك حساب؟ سجل الآن',
    auth_switch_to_login: 'لديك حساب بالفعل؟ سجل دخولك',
    auth_logged_in_as: 'مرحباً',
    baggage_info: 'الأمتعة المسموحة:',
    meal_info: 'الوجبات:'
  },
  fr: {
    brand_name: 'EMPYREAN AIRWAYS',
    brand_tagline: 'La Flotte Royale | Voyagez avec Élégance',
    nav_home: 'Accueil',
    nav_flights: 'Vols',
    nav_my_bookings: 'Mes Réservations',
    nav_login: 'Connexion',
    nav_register: 'S\'inscrire',
    nav_logout: 'Déconnexion',
    hero_title: 'L\'Excellence Aérienne Réinventée',
    hero_subtitle: 'Vols directs de prestige entre Lahore, Karachi, Dubaï, New York et Londres.',
    tab_flights: 'Réserver un Vol',
    label_from: 'Départ',
    label_to: 'Arrivée',
    label_date: 'Date de départ',
    label_cabin: 'Classe',
    label_passengers: 'Passagers',
    btn_search: 'Rechercher',
    cabin_economy: 'Classe Économie',
    cabin_business: 'Classe Affaires',
    cabin_first_suite: 'Suite Royale Première',
    results_found: 'Vols Disponibles',
    btn_book_now: 'Réserver ce vol',
    passenger_title: 'Coordonnées du Passager',
    passenger_desc: 'Veuillez saisir vos informations exactes de pièce d\'identité / passeport:',
    field_fullname: 'Nom Légal Complet',
    field_cnic: 'Numéro de Carte d\'Identité (CNIC)',
    field_passport: 'Numéro de Passeport',
    field_phone: 'Téléphone / WhatsApp',
    field_email: 'Adresse E-mail',
    field_dob: 'Date de Naissance',
    field_gender: 'Genre',
    field_gender_m: 'Homme',
    field_gender_f: 'Femme',
    field_meal: 'Repas Préféré',
    btn_confirm_ticket: 'Confirmer et Émettre le Billet',
    ticket_success_title: 'Réservation Confirmée !',
    ticket_pnr: 'Référence PNR',
    ticket_eticket: 'Numéro de Billet',
    ticket_passenger: 'Passager',
    ticket_cnic: 'Identité / CNIC',
    btn_print_ticket: 'Imprimer le Billet',
    auth_login_title: 'Connexion',
    auth_register_title: 'Créer un Compte',
    auth_login_desc: 'Connectez-vous avec votre CNIC, E-mail ou Téléphone:',
    auth_or_method: 'Méthode de Connexion:',
    auth_by_cnic: 'CNIC / Pièce d\'Identité',
    auth_by_email: 'E-mail',
    auth_by_phone: 'Téléphone',
    auth_password: 'Mot de Passe',
    auth_btn_login: 'Se Connecter',
    auth_btn_register: 'Créer mon Compte',
    auth_switch_to_register: 'Pas de compte ? Inscrivez-vous',
    auth_switch_to_login: 'Déjà inscrit ? Connectez-vous',
    auth_logged_in_as: 'Bienvenue',
    baggage_info: 'Franchise Bagages:',
    meal_info: 'Restauration à Bord:'
  },
  es: {
    brand_name: 'EMPYREAN AIRWAYS',
    brand_tagline: 'El Buque Real | Viaje con Comodidad y Prestigio',
    nav_home: 'Inicio',
    nav_flights: 'Vuelos',
    nav_my_bookings: 'Mis Reservas',
    nav_login: 'Iniciar Sesión',
    nav_register: 'Registrarse',
    nav_logout: 'Cerrar Sesión',
    hero_title: 'Lujo y Sencillez en las Alturas',
    hero_subtitle: 'Vuelos directos y exclusivos entre Lahore, Karachi, Dubái, Nueva York y Londres.',
    tab_flights: 'Reservar un Vuelo',
    label_from: 'Origen',
    label_to: 'Destino',
    label_date: 'Fecha de Salida',
    label_cabin: 'Clase',
    label_passengers: 'Pasajeros',
    btn_search: 'Buscar Vuelos',
    cabin_economy: 'Clase Turista',
    cabin_business: 'Clase Ejecutiva',
    cabin_first_suite: 'Suite Real de Primera',
    results_found: 'Vuelos Disponibles',
    btn_book_now: 'Reservar este Vuelo',
    passenger_title: 'Datos del Pasajero',
    passenger_desc: 'Ingrese sus datos tal como aparecen en su documento de identidad:',
    field_fullname: 'Nombre Completo Legal',
    field_cnic: 'Documento Nacional (CNIC)',
    field_passport: 'Número de Pasaporte',
    field_phone: 'Teléfono / WhatsApp',
    field_email: 'Correo Electrónico',
    field_dob: 'Fecha de Nacimiento',
    field_gender: 'Sexo',
    field_gender_m: 'Masculino',
    field_gender_f: 'Femenino',
    field_meal: 'Preferencia de Comida',
    btn_confirm_ticket: 'Confirmar Reserva y Emitir Billete',
    ticket_success_title: '¡Reserva Confirmada!',
    ticket_pnr: 'Código de Reserva (PNR)',
    ticket_eticket: 'Número de Billete Electrónico',
    ticket_passenger: 'Nombre del Pasajero',
    ticket_cnic: 'Identidad / CNIC',
    btn_print_ticket: 'Imprimir Billete Electrónico',
    auth_login_title: 'Iniciar Sesión',
    auth_register_title: 'Crear una Cuenta',
    auth_login_desc: 'Acceda con su CNIC, correo o teléfono:',
    auth_or_method: 'Método de Entrada:',
    auth_by_cnic: 'Documento / CNIC',
    auth_by_email: 'Correo Electrónico',
    auth_by_phone: 'Teléfono',
    auth_password: 'Contraseña',
    auth_btn_login: 'Entrar',
    auth_btn_register: 'Registrarme',
    auth_switch_to_register: '¿No tiene cuenta? Regístrese',
    auth_switch_to_login: '¿Ya registrado? Inicie sesión',
    auth_logged_in_as: 'Bienvenido',
    baggage_info: 'Equipaje Permitido:',
    meal_info: 'Comida a Bordo:'
  },
  zh: {
    brand_name: '帝国航空 EMPYREAN AIRWAYS',
    brand_tagline: '皇家尊爵旗舰航空 | 尊贵便捷之选',
    nav_home: '首页',
    nav_flights: '预订航班',
    nav_my_bookings: '我的行程',
    nav_login: '登录',
    nav_register: '注册',
    nav_logout: '退出登录',
    hero_title: '尊享天际 轻松启程',
    hero_subtitle: '拉合尔、卡拉奇、伊斯兰堡往返迪拜、纽约及伦敦的旗舰直达航线。',
    tab_flights: '航班预订',
    label_from: '始发地',
    label_to: '目的地',
    label_date: '出发日期',
    label_cabin: '舱位等级',
    label_passengers: '乘客人数',
    btn_search: '查询航班',
    cabin_economy: '经济舱',
    cabin_business: '公务平躺舱',
    cabin_first_suite: '皇家头等独立套房',
    results_found: '可选航班',
    btn_book_now: '立即预订',
    passenger_title: '乘机人个人资料',
    passenger_desc: '请输入与身份证或护照一致的真实信息：',
    field_fullname: '法定姓名',
    field_cnic: '身份证件号码 (CNIC/ID)',
    field_passport: '护照号码（国际航线适用）',
    field_phone: '手机 / 微信',
    field_email: '电子邮箱',
    field_dob: '出生日期',
    field_gender: '性别',
    field_gender_m: '男',
    field_gender_f: '女',
    field_meal: '餐饮喜好',
    btn_confirm_ticket: '确认出票并生成电子行程单',
    ticket_success_title: '出票成功！',
    ticket_pnr: '预订编号 (PNR)',
    ticket_eticket: '电子客票号',
    ticket_passenger: '旅客姓名',
    ticket_cnic: '证件号码',
    btn_print_ticket: '打印 / 下载电子客票',
    auth_login_title: '会员登录',
    auth_register_title: '注册新会员',
    auth_login_desc: '使用身份证号、电子邮箱或手机号码登录：',
    auth_or_method: '选择登录方式：',
    auth_by_cnic: '身份证号码 (CNIC)',
    auth_by_email: '电子邮箱',
    auth_by_phone: '手机号码',
    auth_password: '密码',
    auth_btn_login: '登录',
    auth_btn_register: '立即注册',
    auth_switch_to_register: '还没有账号？点击注册',
    auth_switch_to_login: '已有账号？点击登录',
    auth_logged_in_as: '尊贵的会员',
    baggage_info: '免费行李额：',
    meal_info: '机上餐饮：'
  }
};

export function checkVisaStatus(nationality: string, destinationIata: string): { status: 'EXEMPT' | 'REQUIRED' | 'EVisa_ELIGIBLE'; note: string } {
  const normNat = (nationality || '').toUpperCase().trim();
  
  if (['USA', 'UNITED STATES', 'GBR', 'UNITED KINGDOM', 'CAN', 'CANADA', 'FRA', 'FRANCE', 'DEU', 'GERMANY', 'JPN', 'JAPAN', 'ARE', 'UNITED ARAB EMIRATES'].includes(normNat)) {
    if (destinationIata === 'LHR' || destinationIata === 'CDG' || destinationIata === 'DXB') {
      return { status: 'EXEMPT', note: 'Bilateral visa-free agreement applies for up to 90 days.' };
    }
    return { status: 'EVisa_ELIGIBLE', note: 'Electronic travel authorization required prior to boarding.' };
  }

  if (normNat === 'PAK' || normNat === 'PAKISTAN') {
    if (destinationIata === 'DXB') {
      return { status: 'EVisa_ELIGIBLE', note: 'UAE 30/60-day tourist eVisa automatically expedited via VIP concierge.' };
    }
    return { status: 'REQUIRED', note: 'Biometric Embassy Visa clearance required prior to check-in.' };
  }

  return { status: 'EVisa_ELIGIBLE', note: 'Electronic Visa eligible via fast-track Sovereign immigration lane.' };
}

