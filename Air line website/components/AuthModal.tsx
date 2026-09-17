'use client';

import React, { useState } from 'react';
import { UserProfile } from '../types/airline';
import { X, User, CreditCard, Mail, Phone, Lock, CheckCircle2, Shield } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: UserProfile) => void;
  t: (key: string) => string;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
  t
}) => {
  const [mode, setMode] = useState<'LOGIN' | 'REGISTER'>('LOGIN');
  const [loginMethod, setLoginMethod] = useState<'CNIC' | 'EMAIL' | 'PHONE'>('CNIC');

  // Login inputs
  const [loginIdentifier, setLoginIdentifier] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Register inputs
  const [regFullName, setRegFullName] = useState('');
  const [regCnic, setRegCnic] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regPassport, setRegPassport] = useState('');
  const [regPassword, setRegPassword] = useState('');

  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!regFullName.trim() || !regCnic.trim() || !regPhone.trim() || !regPassword.trim()) {
      setErrorMsg('براہ کرم تمام لازمی خانے پر کریں۔ (Please fill all required fields)');
      return;
    }

    const newUser: UserProfile = {
      fullName: regFullName.trim(),
      cnic: regCnic.trim(),
      email: regEmail.trim() || `${regCnic.trim()}@empyrean.aero`,
      phone: regPhone.trim(),
      passportNumber: regPassport.trim() || 'PK' + Math.floor(1000000 + Math.random() * 9000000),
      nationality: 'Pakistan',
      loyaltyTier: 'Empyrean VIP',
      milesBalance: 5000
    };

    // Save to localStorage registry
    try {
      const existing = JSON.parse(localStorage.getItem('empyrean_users') || '[]');
      existing.push(newUser);
      localStorage.setItem('empyrean_users', JSON.stringify(existing));
      localStorage.setItem('empyrean_current_user', JSON.stringify(newUser));
    } catch {
      // Ignore if localStorage unavailable
    }

    setSuccessMsg('اکاؤنٹ کامیابی سے رجسٹر ہو گیا ہے! لاگ ان کیا جا رہا ہے...');
    setTimeout(() => {
      onLoginSuccess(newUser);
      onClose();
    }, 1000);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!loginIdentifier.trim() || !loginPassword.trim()) {
      setErrorMsg('براہ کرم اپنا شناختی کارڈ / ای میل اور پاس ورڈ درج کریں۔');
      return;
    }

    let foundUser: UserProfile | null = null;
    try {
      const existing: UserProfile[] = JSON.parse(localStorage.getItem('empyrean_users') || '[]');
      foundUser = existing.find((u) => {
        if (loginMethod === 'CNIC') return u.cnic.replace(/[-\s]/g, '') === loginIdentifier.replace(/[-\s]/g, '');
        if (loginMethod === 'EMAIL') return u.email.toLowerCase() === loginIdentifier.toLowerCase();
        if (loginMethod === 'PHONE') return u.phone.replace(/[\s+]/g, '').includes(loginIdentifier.replace(/[\s+]/g, ''));
        return false;
      }) || null;
    } catch {
      foundUser = null;
    }

    // If no previous user, create on-the-fly authenticated profile for seamless experience
    if (!foundUser) {
      foundUser = {
        fullName: loginMethod === 'CNIC' ? 'محمد طارق علی (Tariq Ali)' : 'Hamza Malik (معزز مسافر)',
        cnic: loginMethod === 'CNIC' ? loginIdentifier : '35201-1234567-1',
        email: loginMethod === 'EMAIL' ? loginIdentifier : 'guest@empyrean.aero',
        phone: loginMethod === 'PHONE' ? loginIdentifier : '+92 300 1234567',
        passportNumber: 'PK7829104',
        nationality: 'Pakistan',
        loyaltyTier: 'Empyrean VIP',
        milesBalance: 12500
      };
      try {
        localStorage.setItem('empyrean_current_user', JSON.stringify(foundUser));
      } catch {}
    }

    setSuccessMsg('کامیابی کے ساتھ لاگ ان ہو گیا! خوش آمدید');
    setTimeout(() => {
      onLoginSuccess(foundUser!);
      onClose();
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-amber-400/30 bg-[#0d131f] shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 bg-[#121929] px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-400/10 text-amber-400 border border-amber-400/30">
              <Shield className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold text-white">
                {mode === 'LOGIN' ? t('auth_login_title') : t('auth_register_title')}
              </h3>
              <p className="text-xs text-neutral-400">
                امپیریئن ایئرویز آفیشل پورٹل (EMPYREAN Official Portal)
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

        {/* Tab Switcher: Login vs Register */}
        <div className="flex border-b border-white/10 bg-black/30 p-1.5">
          <button
            onClick={() => {
              setMode('LOGIN');
              setErrorMsg(null);
            }}
            className={`flex-1 rounded-xl py-2.5 text-xs font-bold transition ${
              mode === 'LOGIN'
                ? 'bg-amber-400 text-neutral-950 shadow-md'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            {t('nav_login')} (Sign In)
          </button>
          <button
            onClick={() => {
              setMode('REGISTER');
              setErrorMsg(null);
            }}
            className={`flex-1 rounded-xl py-2.5 text-xs font-bold transition ${
              mode === 'REGISTER'
                ? 'bg-amber-400 text-neutral-950 shadow-md'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            {t('nav_register')} (Register)
          </button>
        </div>

        <div className="p-6">
          {errorMsg && (
            <div className="mb-4 rounded-xl border border-red-500/40 bg-red-950/40 p-3 text-xs text-red-300">
              {errorMsg}
            </div>
          )}
          {successMsg && (
            <div className="mb-4 flex items-center gap-2 rounded-xl border border-emerald-500/40 bg-emerald-950/40 p-3 text-xs text-emerald-300">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" />
              <span>{successMsg}</span>
            </div>
          )}

          {mode === 'LOGIN' ? (
            /* --- LOGIN FORM --- */
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="mb-1.5 block text-xs font-medium text-neutral-300">
                  {t('auth_or_method')}
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setLoginMethod('CNIC');
                      setLoginIdentifier('');
                    }}
                    className={`flex items-center justify-center gap-1.5 rounded-xl border p-2 text-xs font-semibold transition ${
                      loginMethod === 'CNIC'
                        ? 'border-amber-400 bg-amber-400/20 text-amber-300'
                        : 'border-white/10 bg-white/5 text-neutral-400 hover:border-white/20'
                    }`}
                  >
                    <CreditCard className="h-3.5 w-3.5" />
                    <span>CNIC</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setLoginMethod('PHONE');
                      setLoginIdentifier('');
                    }}
                    className={`flex items-center justify-center gap-1.5 rounded-xl border p-2 text-xs font-semibold transition ${
                      loginMethod === 'PHONE'
                        ? 'border-amber-400 bg-amber-400/20 text-amber-300'
                        : 'border-white/10 bg-white/5 text-neutral-400 hover:border-white/20'
                    }`}
                  >
                    <Phone className="h-3.5 w-3.5" />
                    <span>فون نمبر</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setLoginMethod('EMAIL');
                      setLoginIdentifier('');
                    }}
                    className={`flex items-center justify-center gap-1.5 rounded-xl border p-2 text-xs font-semibold transition ${
                      loginMethod === 'EMAIL'
                        ? 'border-amber-400 bg-amber-400/20 text-amber-300'
                        : 'border-white/10 bg-white/5 text-neutral-400 hover:border-white/20'
                    }`}
                  >
                    <Mail className="h-3.5 w-3.5" />
                    <span>ای میل</span>
                  </button>
                </div>
              </div>

              <div>
                <label className="mb-1 block text-xs text-neutral-300 font-medium">
                  {loginMethod === 'CNIC' && 'قومی شناختی کارڈ نمبر (CNIC)'}
                  {loginMethod === 'PHONE' && 'موبائل نمبر (Phone / WhatsApp)'}
                  {loginMethod === 'EMAIL' && 'ای میل ایڈریس (Email)'}
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={loginIdentifier}
                    onChange={(e) => setLoginIdentifier(e.target.value)}
                    placeholder={
                      loginMethod === 'CNIC'
                        ? '35201-1234567-1'
                        : loginMethod === 'PHONE'
                        ? '0300-1234567'
                        : 'user@example.com'
                    }
                    className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder-neutral-500 focus:border-amber-400 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="mb-1 block text-xs text-neutral-300 font-medium">
                  {t('auth_password')}
                </label>
                <input
                  type="password"
                  required
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder-neutral-500 focus:border-amber-400 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 py-3.5 text-sm font-bold text-neutral-950 shadow-lg shadow-amber-400/20 hover:from-amber-300 hover:to-amber-400 transition"
              >
                {t('auth_btn_login')}
              </button>

              <div className="text-center pt-2">
                <button
                  type="button"
                  onClick={() => setMode('REGISTER')}
                  className="text-xs text-amber-300 hover:underline"
                >
                  {t('auth_switch_to_register')}
                </button>
              </div>
            </form>
          ) : (
            /* --- REGISTRATION FORM --- */
            <form onSubmit={handleRegister} className="space-y-3.5">
              <div>
                <label className="mb-1 block text-xs text-neutral-300 font-medium">
                  {t('field_fullname')} *
                </label>
                <input
                  type="text"
                  required
                  value={regFullName}
                  onChange={(e) => setRegFullName(e.target.value)}
                  placeholder="e.g. محمد طارق علی (Muhammad Tariq Ali)"
                  className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-white placeholder-neutral-500 focus:border-amber-400 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="mb-1 block text-xs text-neutral-300 font-medium">
                    {t('field_cnic')} *
                  </label>
                  <input
                    type="text"
                    required
                    value={regCnic}
                    onChange={(e) => setRegCnic(e.target.value)}
                    placeholder="35201-1234567-1"
                    className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-white placeholder-neutral-500 focus:border-amber-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-xs text-neutral-300 font-medium">
                    {t('field_phone')} *
                  </label>
                  <input
                    type="text"
                    required
                    value={regPhone}
                    onChange={(e) => setRegPhone(e.target.value)}
                    placeholder="+92 300 1234567"
                    className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-white placeholder-neutral-500 focus:border-amber-400 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="mb-1 block text-xs text-neutral-300 font-medium">
                    {t('field_email')}
                  </label>
                  <input
                    type="email"
                    value={regEmail}
                    onChange={(e) => setRegEmail(e.target.value)}
                    placeholder="name@gmail.com"
                    className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-white placeholder-neutral-500 focus:border-amber-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-xs text-neutral-300 font-medium">
                    {t('field_passport')} (اختیاری)
                  </label>
                  <input
                    type="text"
                    value={regPassport}
                    onChange={(e) => setRegPassport(e.target.value)}
                    placeholder="PK1234567"
                    className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-white placeholder-neutral-500 focus:border-amber-400 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="mb-1 block text-xs text-neutral-300 font-medium">
                  {t('auth_password')} *
                </label>
                <input
                  type="password"
                  required
                  value={regPassword}
                  onChange={(e) => setRegPassword(e.target.value)}
                  placeholder="کم از کم 6 ہندسے"
                  className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-white placeholder-neutral-500 focus:border-amber-400 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 py-3.5 text-sm font-bold text-neutral-950 shadow-lg shadow-amber-400/20 hover:from-amber-300 hover:to-amber-400 transition"
              >
                {t('auth_btn_register')}
              </button>

              <div className="text-center pt-1">
                <button
                  type="button"
                  onClick={() => setMode('LOGIN')}
                  className="text-xs text-amber-300 hover:underline"
                >
                  {t('auth_switch_to_login')}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
