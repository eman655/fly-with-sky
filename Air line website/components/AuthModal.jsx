import React, { useState } from 'react';
import { X, ShieldCheck, Phone, CreditCard, Lock, User, CheckCircle2, ArrowRight, KeyRound } from 'lucide-react';

const COUNTRY_CODES = [
  { code: '+92', country: 'Pakistan', flag: '🇵🇰', mask: '3XX-XXXXXXX' },
  { code: '+971', country: 'UAE', flag: '🇦🇪', mask: '5X-XXXXXXX' },
  { code: '+1', country: 'USA/Canada', flag: '🇺🇸', mask: 'XXX-XXX-XXXX' },
  { code: '+44', country: 'UK', flag: '🇬🇧', mask: '7XXX-XXXXXX' },
  { code: '+966', country: 'Saudi Arabia', flag: '🇸🇦', mask: '5X-XXXXXXX' }
];

export const AuthModal = ({ isOpen, onClose, onLoginSuccess, lang = 'en' }) => {
  const [mode, setMode] = useState('LOGIN'); // 'LOGIN' | 'REGISTER' | 'OTP_VERIFICATION'
  const [loginType, setLoginType] = useState('PHONE'); // 'PHONE' | 'CNIC'

  // Input states
  const [selectedCountryCode, setSelectedCountryCode] = useState(COUNTRY_CODES[0]);
  const [phoneRaw, setPhoneRaw] = useState('');
  const [cnicRaw, setCnicRaw] = useState('');
  const [fullName, setFullName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [otpInput, setOtpInput] = useState(['4', '8', '2', '9']); // pre-filled realistic mock OTP for instant frictionless test

  const [errorMessage, setErrorMessage] = useState('');
  const [registeredTempUser, setRegisteredTempUser] = useState(null);

  if (!isOpen) return null;

  // Mask formatter for CNIC (XXXXX-XXXXXXX-X)
  const handleCnicChange = (val) => {
    const cleaned = val.replace(/\D/g, '').slice(0, 13);
    let formatted = cleaned;
    if (cleaned.length > 5 && cleaned.length <= 12) {
      formatted = `${cleaned.slice(0, 5)}-${cleaned.slice(5)}`;
    } else if (cleaned.length > 12) {
      formatted = `${cleaned.slice(0, 5)}-${cleaned.slice(5, 12)}-${cleaned.slice(12)}`;
    }
    setCnicRaw(formatted);
  };

  // Registration Submit -> triggers OTP screen
  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!fullName.trim()) {
      setErrorMessage(lang === 'ur' ? 'براہ کرم پورا قانونی نام درج کریں۔' : 'Please enter your full legal name.');
      return;
    }
    if (cnicRaw.length < 13) {
      setErrorMessage(lang === 'ur' ? 'درست شناختی کارڈ / CNIC نمبر درج کریں (13 ہندسے)' : 'Please enter a valid 13-digit ID/CNIC number.');
      return;
    }
    if (!phoneRaw.trim()) {
      setErrorMessage(lang === 'ur' ? 'براہ کرم اپنا موبائل نمبر درج کریں۔' : 'Please provide your mobile phone number.');
      return;
    }
    if (password.length < 6) {
      setErrorMessage(lang === 'ur' ? 'پاس ورڈ کم از کم 6 ہندسوں کا ہونا چاہیے۔' : 'Password must be at least 6 characters.');
      return;
    }
    if (password !== confirmPassword) {
      setErrorMessage(lang === 'ur' ? 'پاس ورڈز مطابقت نہیں رکھتے۔' : 'Passwords do not match.');
      return;
    }

    const newUser = {
      name: fullName.trim(),
      cnic: cnicRaw,
      phone: `${selectedCountryCode.code} ${phoneRaw.trim()}`,
      country: selectedCountryCode.country,
      flag: selectedCountryCode.flag,
      isVerified: true
    };

    setRegisteredTempUser(newUser);
    setMode('OTP_VERIFICATION');
  };

  // Verify OTP
  const handleVerifyOtp = (e) => {
    e.preventDefault();
    const entered = otpInput.join('');
    if (entered.length < 4) {
      setErrorMessage(lang === 'ur' ? '4 ہندسوں کا درست OTP کوڈ درج کریں۔' : 'Please enter the complete 4-digit OTP code.');
      return;
    }

    const user = registeredTempUser || {
      name: fullName || 'Hamza Latif',
      cnic: cnicRaw || '35201-7892140-5',
      phone: `${selectedCountryCode.code} ${phoneRaw || '3001234567'}`,
      isVerified: true
    };

    try {
      localStorage.setItem('flywithsky_user', JSON.stringify(user));
    } catch (err) {}

    onLoginSuccess(user);
    onClose();
  };

  // Login Submit
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');

    const identifier = loginType === 'PHONE' ? phoneRaw : cnicRaw;
    if (!identifier.trim()) {
      setErrorMessage(
        loginType === 'PHONE'
          ? (lang === 'ur' ? 'موبائل نمبر درج کریں۔' : 'Enter your registered phone number.')
          : (lang === 'ur' ? 'شناختی کارڈ نمبر درج کریں۔' : 'Enter your registered CNIC/ID.')
      );
      return;
    }
    if (!password) {
      setErrorMessage(lang === 'ur' ? 'پاس ورڈ درج کریں۔' : 'Enter your account password.');
      return;
    }

    // Authenticated profile
    const user = {
      name: loginType === 'PHONE' ? 'Hamza Latif (VIP Passenger)' : 'محمد طارق علی (Tariq Ali)',
      cnic: loginType === 'CNIC' ? cnicRaw : '35201-7892140-5',
      phone: loginType === 'PHONE' ? `${selectedCountryCode.code} ${phoneRaw}` : '+92 300 7829104',
      isVerified: true,
      pnrList: ['SKY-8821', 'SKY-1094']
    };

    try {
      localStorage.setItem('flywithsky_user', JSON.stringify(user));
    } catch (err) {}

    onLoginSuccess(user);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-xl animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-amber-400/30 bg-[#0d1527] shadow-2xl ring-1 ring-white/10">
        {/* Header Bar */}
        <div className="flex items-center justify-between border-b border-white/10 bg-[#121c33] px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-amber-400/10 border border-amber-400/30 text-amber-400 shadow-inner">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold text-white">
                {mode === 'LOGIN' && (lang === 'ur' ? 'لاگ ان پورٹل' : 'The Fly With Sky Sign In')}
                {mode === 'REGISTER' && (lang === 'ur' ? 'نیا مسافر اکاؤنٹ بنائیں' : 'Create Verified Passenger Account')}
                {mode === 'OTP_VERIFICATION' && (lang === 'ur' ? 'موبائل نمبر تصدیق (OTP)' : 'Phone OTP Verification')}
              </h3>
              <p className="text-xs text-neutral-400">
                {lang === 'ur' ? 'محفوظ بکنگ اور شناختی کارڈ تصدیق لازمی ہے' : 'Mandatory CNIC & Phone Verification for Ticket Booking'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-full p-1.5 text-neutral-400 hover:bg-white/10 hover:text-white transition"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Tab Selector (Sign In vs Register) */}
        {mode !== 'OTP_VERIFICATION' && (
          <div className="flex border-b border-white/10 bg-black/30 p-1.5 text-xs font-semibold">
            <button
              onClick={() => { setMode('LOGIN'); setErrorMessage(''); }}
              className={`flex-1 rounded-2xl py-2.5 transition ${
                mode === 'LOGIN'
                  ? 'bg-amber-400 text-neutral-950 shadow-md font-bold'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              {lang === 'ur' ? 'لاگ ان کریں (Sign In)' : 'Sign In'}
            </button>
            <button
              onClick={() => { setMode('REGISTER'); setErrorMessage(''); }}
              className={`flex-1 rounded-2xl py-2.5 transition ${
                mode === 'REGISTER'
                  ? 'bg-amber-400 text-neutral-950 shadow-md font-bold'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              {lang === 'ur' ? 'نیا اکاؤنٹ بنائیں (Register)' : 'Register (CNIC & Phone)'}
            </button>
          </div>
        )}

        {/* Form Body */}
        <div className="p-6">
          {errorMessage && (
            <div className="mb-4 rounded-2xl border border-red-500/40 bg-red-950/40 p-3 text-xs text-red-300">
              {errorMessage}
            </div>
          )}

          {/* 1. LOGIN FLOW */}
          {mode === 'LOGIN' && (
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1.5">
                  {lang === 'ur' ? 'لاگ ان کرنے کا طریقہ منتخب کریں:' : 'Select Login Method:'}
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => { setLoginType('PHONE'); setErrorMessage(''); }}
                    className={`flex items-center justify-center gap-1.5 rounded-2xl border py-2 text-xs font-semibold transition ${
                      loginType === 'PHONE'
                        ? 'border-amber-400 bg-amber-400/20 text-amber-300'
                        : 'border-white/10 bg-white/5 text-neutral-400 hover:border-white/20'
                    }`}
                  >
                    <Phone className="h-3.5 w-3.5" />
                    <span>{lang === 'ur' ? 'موبائل نمبر (Phone)' : 'Phone Number'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => { setLoginType('CNIC'); setErrorMessage(''); }}
                    className={`flex items-center justify-center gap-1.5 rounded-2xl border py-2 text-xs font-semibold transition ${
                      loginType === 'CNIC'
                        ? 'border-amber-400 bg-amber-400/20 text-amber-300'
                        : 'border-white/10 bg-white/5 text-neutral-400 hover:border-white/20'
                    }`}
                  >
                    <CreditCard className="h-3.5 w-3.5" />
                    <span>{lang === 'ur' ? 'شناختی کارڈ (CNIC/ID)' : 'CNIC / National ID'}</span>
                  </button>
                </div>
              </div>

              {loginType === 'PHONE' ? (
                <div>
                  <label className="block text-xs text-neutral-300 mb-1 font-medium">
                    {lang === 'ur' ? 'موبائل فون نمبر' : 'Mobile Phone Number'}
                  </label>
                  <div className="flex gap-2">
                    <select
                      value={selectedCountryCode.code}
                      onChange={(e) => {
                        const c = COUNTRY_CODES.find((x) => x.code === e.target.value);
                        if (c) setSelectedCountryCode(c);
                      }}
                      className="rounded-2xl border border-white/15 bg-white/5 px-2.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
                    >
                      {COUNTRY_CODES.map((c) => (
                        <option key={c.code} value={c.code} className="bg-[#0e1626]">
                          {c.flag} {c.code}
                        </option>
                      ))}
                    </select>

                    <input
                      type="tel"
                      required
                      value={phoneRaw}
                      onChange={(e) => setPhoneRaw(e.target.value)}
                      placeholder="300 1234567"
                      className="flex-1 rounded-2xl border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-white placeholder-neutral-500 focus:border-amber-400 focus:outline-none"
                    />
                  </div>
                </div>
              ) : (
                <div>
                  <label className="block text-xs text-neutral-300 mb-1 font-medium">
                    {lang === 'ur' ? 'قومی شناختی کارڈ نمبر (CNIC)' : 'CNIC / National ID Card Number'}
                  </label>
                  <input
                    type="text"
                    required
                    value={cnicRaw}
                    onChange={(e) => handleCnicChange(e.target.value)}
                    placeholder="35201-1234567-1"
                    maxLength={15}
                    className="w-full rounded-2xl border border-white/15 bg-white/5 px-4 py-2.5 text-sm font-mono text-white placeholder-neutral-500 focus:border-amber-400 focus:outline-none"
                  />
                </div>
              )}

              <div>
                <label className="block text-xs text-neutral-300 mb-1 font-medium">
                  {lang === 'ur' ? 'پاس ورڈ (Password)' : 'Password'}
                </label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded-2xl border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-white placeholder-neutral-500 focus:border-amber-400 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-2xl bg-gradient-to-r from-amber-400 to-amber-500 py-3.5 text-sm font-bold text-neutral-950 shadow-lg shadow-amber-400/20 hover:from-amber-300 hover:to-amber-400 transition"
              >
                {lang === 'ur' ? 'لاگ ان کریں اور ٹکٹ بکنگ شروع کریں' : 'Sign In to Flight Dashboard'}
              </button>
            </form>
          )}

          {/* 2. REGISTRATION FLOW */}
          {mode === 'REGISTER' && (
            <form onSubmit={handleRegisterSubmit} className="space-y-3.5">
              <div>
                <label className="block text-xs text-neutral-300 mb-1 font-medium">
                  {lang === 'ur' ? 'پورا قانونی نام (پاسپورٹ/شناختی کارڈ کے مطابق) *' : 'Full Legal Name (as on Passport/CNIC) *'}
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Hamza Latif (محمد حمزہ لطیف)"
                  className="w-full rounded-2xl border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-white placeholder-neutral-500 focus:border-amber-400 focus:outline-none"
                />
              </div>

              {/* CNIC with input mask */}
              <div>
                <label className="block text-xs text-neutral-300 mb-1 font-medium">
                  {lang === 'ur' ? 'قومی شناختی کارڈ نمبر (CNIC / National ID) *' : 'CNIC / National ID Number (XXXXX-XXXXXXX-X) *'}
                </label>
                <input
                  type="text"
                  required
                  value={cnicRaw}
                  onChange={(e) => handleCnicChange(e.target.value)}
                  placeholder="35201-1234567-1"
                  maxLength={15}
                  className="w-full rounded-2xl border border-white/15 bg-white/5 px-4 py-2.5 text-sm font-mono text-white placeholder-neutral-500 focus:border-amber-400 focus:outline-none"
                />
                <span className="text-[10px] text-neutral-400 mt-0.5 block">
                  {lang === 'ur' ? 'پاکستانی شہریوں کے لیے 13 ہندسوں کا نادرا شناختی کارڈ' : '13-digit official NADRA identity format for Pakistan or Global ID'}
                </span>
              </div>

              {/* Phone with Country selector */}
              <div>
                <label className="block text-xs text-neutral-300 mb-1 font-medium">
                  {lang === 'ur' ? 'موبائل نمبر (SMS و WhatsApp الرٹس کے لیے) *' : 'Mobile Phone Number (for SMS & WhatsApp PNR Alerts) *'}
                </label>
                <div className="flex gap-2">
                  <select
                    value={selectedCountryCode.code}
                    onChange={(e) => {
                      const c = COUNTRY_CODES.find((x) => x.code === e.target.value);
                      if (c) setSelectedCountryCode(c);
                    }}
                    className="rounded-2xl border border-white/15 bg-white/5 px-2.5 py-2 text-xs text-white focus:outline-none focus:border-amber-400 cursor-pointer"
                  >
                    {COUNTRY_CODES.map((c) => (
                      <option key={c.code} value={c.code} className="bg-[#0e1626]">
                        {c.flag} {c.code} ({c.country})
                      </option>
                    ))}
                  </select>

                  <input
                    type="tel"
                    required
                    value={phoneRaw}
                    onChange={(e) => setPhoneRaw(e.target.value)}
                    placeholder="300 1234567"
                    className="flex-1 rounded-2xl border border-white/15 bg-white/5 px-4 py-2 text-sm text-white placeholder-neutral-500 focus:border-amber-400 focus:outline-none"
                  />
                </div>
              </div>

              {/* Password & Confirm Password */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-neutral-300 mb-1 font-medium">
                    {lang === 'ur' ? 'پاس ورڈ بنائیں *' : 'Create Password *'}
                  </label>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Min 6 characters"
                    className="w-full rounded-2xl border border-white/15 bg-white/5 px-3 py-2 text-sm text-white placeholder-neutral-500 focus:border-amber-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs text-neutral-300 mb-1 font-medium">
                    {lang === 'ur' ? 'پاس ورڈ کی تصدیق *' : 'Confirm Password *'}
                  </label>
                  <input
                    type="password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Repeat password"
                    className="w-full rounded-2xl border border-white/15 bg-white/5 px-3 py-2 text-sm text-white placeholder-neutral-500 focus:border-amber-400 focus:outline-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full rounded-2xl bg-gradient-to-r from-amber-400 to-amber-500 py-3.5 text-sm font-bold text-neutral-950 shadow-lg shadow-amber-400/20 hover:from-amber-300 hover:to-amber-400 transition"
              >
                {lang === 'ur' ? 'موبائل پر OTP کوڈ بھیجیں ➔' : 'Proceed to Phone Verification (OTP) ➔'}
              </button>
            </form>
          )}

          {/* 3. OTP VERIFICATION SCREEN */}
          {mode === 'OTP_VERIFICATION' && (
            <form onSubmit={handleVerifyOtp} className="space-y-5 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-cyan-400/10 text-cyan-400 border border-cyan-400/30 mx-auto">
                <KeyRound className="h-7 w-7 animate-pulse" />
              </div>

              <div>
                <h4 className="font-serif text-lg font-bold text-white">
                  {lang === 'ur' ? '4 ہندسوں کا سیکیورٹی کوڈ درج کریں' : 'Enter 4-Digit One-Time Passcode'}
                </h4>
                <p className="text-xs text-neutral-300 mt-1">
                  {lang === 'ur'
                    ? `ہم نے آپ کے رجسٹرڈ نمبر (${registeredTempUser?.phone}) پر کوڈ بھیج دیا ہے۔`
                    : `We sent an instant verification passcode to your mobile (${registeredTempUser?.phone}).`}
                </p>
              </div>

              {/* 4-digit Input Boxes */}
              <div className="flex justify-center gap-3">
                {otpInput.map((digit, idx) => (
                  <input
                    key={idx}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => {
                      const next = [...otpInput];
                      next[idx] = e.target.value.slice(-1);
                      setOtpInput(next);
                    }}
                    className="h-12 w-12 rounded-2xl border border-amber-400/50 bg-white/5 text-center font-mono text-xl font-bold text-amber-300 focus:border-amber-400 focus:outline-none"
                  />
                ))}
              </div>

              <div className="flex justify-center items-center gap-2 text-xs text-emerald-400 font-mono">
                <CheckCircle2 className="h-4 w-4" />
                <span>Mock Code: 4829 (Auto-verified)</span>
              </div>

              <button
                type="submit"
                className="w-full rounded-2xl bg-gradient-to-r from-emerald-400 to-teal-500 py-3.5 text-sm font-bold text-neutral-950 shadow-lg shadow-emerald-400/20 hover:from-emerald-300 hover:to-teal-400 transition"
              >
                {lang === 'ur' ? 'تصدیق مکمل کریں اور لاگ ان ہوں' : 'Verify & Activate Passenger Profile'}
              </button>

              <button
                type="button"
                onClick={() => setMode('REGISTER')}
                className="text-xs text-neutral-400 hover:text-white"
              >
                ← {lang === 'ur' ? 'نمبر تبدیل کریں' : 'Change Phone Number'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
