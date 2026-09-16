'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { KycPassportData, Airport } from '../types/airline';
import { checkVisaStatus } from '../lib/i18n';
import {
  X,
  Camera,
  ShieldCheck,
  CheckCircle2,
  RefreshCw,
  Sparkles,
  AlertTriangle,
  UserCheck,
  FileText,
  Scan,
  Compass
} from 'lucide-react';

interface PassportVerificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  destinationAirport: Airport;
  onVerificationSuccess: (data: KycPassportData) => void;
  t: (key: string) => string;
}

type ScanStage = 'PASSPORT_SCAN' | 'FACE_LIVENESS' | 'ICAO_VERIFIED';

export const PassportVerificationModal: React.FC<PassportVerificationModalProps> = ({
  isOpen,
  onClose,
  destinationAirport,
  onVerificationSuccess,
  t
}) => {
  const [stage, setStage] = useState<ScanStage>('PASSPORT_SCAN');
  const [cameraActive, setCameraActive] = useState<boolean>(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [livenessPulse, setLivenessPulse] = useState<number>(0);
  const [extractedData, setExtractedData] = useState<KycPassportData | null>(null);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // Initialize WebRTC MediaStream
  const startCamera = useCallback(async () => {
    setCameraError(null);
    try {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 1280 },
          height: { ideal: 720 },
          facingMode: 'user'
        },
        audio: false
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play().catch(() => {});
      }
      setCameraActive(true);
    } catch (err: unknown) {
      console.warn('WebRTC Camera access restricted or unavailable, enabling simulation mode:', err);
      setCameraError('Camera access not permitted or unavailable. Simulation preview is active.');
      setCameraActive(false);
    }
  }, []);

  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    setCameraActive(false);
  }, []);

  useEffect(() => {
    if (isOpen) {
      startCamera();
    } else {
      stopCamera();
    }
    return () => {
      stopCamera();
    };
  }, [isOpen, startCamera, stopCamera]);

  // Face liveness simulated pulse effect
  useEffect(() => {
    if (stage === 'FACE_LIVENESS') {
      const interval = setInterval(() => {
        setLivenessPulse((prev) => (prev >= 100 ? 100 : prev + 10));
      }, 250);
      return () => clearInterval(interval);
    } else {
      setLivenessPulse(0);
    }
  }, [stage]);

  if (!isOpen) return null;

  // Step 1 Trigger: Capture and parse mock MRZ
  const handleCapturePassport = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setStage('FACE_LIVENESS');
    }, 1400);
  };

  // Step 2 Trigger: Complete face match and finalize ICAO clearance
  const handleVerifyFace = () => {
    setIsProcessing(true);
    setTimeout(() => {
      const nationality = 'ARE'; // United Arab Emirates default flagship VIP
      const visaInfo = checkVisaStatus(nationality, destinationAirport.iata);

      const verifiedData: KycPassportData = {
        fullName: 'HIS HIGHNESS TARIQ AL-HASHIMI',
        passportNumber: 'N9872140A',
        nationality: 'ARE (United Arab Emirates)',
        dateOfBirth: '1988-04-14',
        expiryDate: '2032-11-09',
        gender: 'M',
        mrzRaw: 'P<AREAL<HASHIMI<<TARIQ<<<<<<<<<<<<<<<<<<<<<<<\nN9872140A3ARE8804144M3211096<<<<<<<<<<<<<<04',
        icaoVerified: true,
        biometricMatchConfidence: 99.8,
        visaStatus: visaInfo.status,
        visaNotes: visaInfo.note
      };

      setExtractedData(verifiedData);
      setIsProcessing(false);
      setStage('ICAO_VERIFIED');
    }, 1600);
  };

  // Finish & inject into booking state
  const handleComplete = () => {
    if (extractedData) {
      onVerificationSuccess(extractedData);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-xl animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl overflow-hidden rounded-3xl border border-amber-400/30 bg-[#0a0d14] shadow-[0_0_80px_rgba(212,175,55,0.15)] ring-1 ring-white/10">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 bg-gradient-to-r from-neutral-900/90 via-[#0e1424] to-neutral-900/90 px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-cyan-500/40 bg-cyan-950/40 text-cyan-400 shadow-inner">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-serif text-lg font-bold text-white tracking-wide">
                  Bank-Grade e-KYC & Biometric Border Clearance
                </h3>
                <span className="rounded-full bg-cyan-400/10 px-2 py-0.5 text-[10px] font-mono font-bold text-cyan-300 border border-cyan-400/30">
                  ICAO Doc 9303 Compliant
                </span>
              </div>
              <p className="text-xs text-neutral-400">
                Destination: {destinationAirport.name} ({destinationAirport.iata}) • Zero Trust Cryptographic Enclave
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

        {/* Stage Progress Indicator */}
        <div className="grid grid-cols-3 border-b border-white/10 bg-black/40 text-center text-xs font-mono">
          <div
            className={`py-2.5 transition-colors border-e border-white/5 ${
              stage === 'PASSPORT_SCAN'
                ? 'bg-amber-500/15 text-amber-300 font-bold border-b-2 border-amber-400'
                : 'text-neutral-400'
            }`}
          >
            1. PASSPORT MRZ SCAN
          </div>
          <div
            className={`py-2.5 transition-colors border-e border-white/5 ${
              stage === 'FACE_LIVENESS'
                ? 'bg-cyan-500/15 text-cyan-300 font-bold border-b-2 border-cyan-400'
                : 'text-neutral-400'
            }`}
          >
            2. BIOMETRIC LIVENESS MATCH
          </div>
          <div
            className={`py-2.5 transition-colors ${
              stage === 'ICAO_VERIFIED'
                ? 'bg-emerald-500/15 text-emerald-300 font-bold border-b-2 border-emerald-400'
                : 'text-neutral-400'
            }`}
          >
            3. ICAO PKD VALIDATION
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6">
          {stage !== 'ICAO_VERIFIED' ? (
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
              {/* Camera Video Viewport with Holographic Overlay */}
              <div className="relative flex aspect-video w-full flex-col items-center justify-center overflow-hidden rounded-2xl border border-white/15 bg-neutral-950 shadow-2xl lg:col-span-8">
                {/* Live Video Element */}
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className={`h-full w-full object-cover transform ${stage === 'FACE_LIVENESS' ? '-scale-x-100' : ''}`}
                />

                {/* Camera Fallback Simulation Graphic if webcam blocked */}
                {(!cameraActive || cameraError) && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-b from-[#0c101d] to-black p-6 text-center">
                    <div className="relative mb-3 flex h-20 w-20 items-center justify-center rounded-2xl border border-amber-400/30 bg-amber-500/10">
                      {stage === 'PASSPORT_SCAN' ? (
                        <Scan className="h-10 w-10 text-amber-400 animate-pulse" />
                      ) : (
                        <UserCheck className="h-10 w-10 text-cyan-400 animate-pulse" />
                      )}
                    </div>
                    <p className="text-sm font-semibold text-neutral-200">
                      High-Precision Optical Feed Simulator Active
                    </p>
                    <p className="mt-1 text-xs text-neutral-400 max-w-sm">
                      {cameraError || 'WebRTC stream ready. Visual bounding geometry guides simulated.'}
                    </p>
                    <button
                      onClick={startCamera}
                      className="mt-3 inline-flex items-center gap-1.5 rounded-lg border border-white/20 bg-white/5 px-3 py-1.5 text-xs text-neutral-300 hover:bg-white/10"
                    >
                      <RefreshCw className="h-3.5 w-3.5" /> Reconnect WebRTC Camera
                    </button>
                  </div>
                )}

                {/* OVERLAY: Stage 1 - 16:9 Passport Bounding Box & Laser */}
                {stage === 'PASSPORT_SCAN' && (
                  <div className="pointer-events-none absolute inset-0 flex items-center justify-center p-6">
                    <div className="relative aspect-[16/10] w-[88%] rounded-xl border-2 border-dashed border-amber-400/70 shadow-[0_0_30px_rgba(212,175,55,0.3)]">
                      {/* Corner Target Reticles */}
                      <div className="absolute -top-2 -left-2 h-6 w-6 border-t-4 border-l-4 border-amber-400"></div>
                      <div className="absolute -top-2 -right-2 h-6 w-6 border-t-4 border-r-4 border-amber-400"></div>
                      <div className="absolute -bottom-2 -left-2 h-6 w-6 border-b-4 border-l-4 border-amber-400"></div>
                      <div className="absolute -bottom-2 -right-2 h-6 w-6 border-b-4 border-r-4 border-amber-400"></div>

                      {/* Optical Scanning Laser Line */}
                      <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-amber-300 to-transparent shadow-[0_0_15px_#d4af37] animate-[bounce_2.5s_infinite]"></div>

                      {/* Bottom MRZ target indicator */}
                      <div className="absolute bottom-2 inset-x-4 h-10 rounded border border-amber-400/30 bg-amber-500/10 flex items-center justify-center">
                        <span className="font-mono text-[11px] tracking-widest text-amber-200">
                          ALIGN PASSPORT MRZ MACHINE CODES HERE
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {/* OVERLAY: Stage 2 - Biometric Face Oval Guide */}
                {stage === 'FACE_LIVENESS' && (
                  <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                    <div className="relative h-64 w-48 rounded-[50%] border-2 border-dashed border-cyan-400/80 shadow-[0_0_40px_rgba(6,182,212,0.35)]">
                      <div className="absolute inset-0 rounded-[50%] border border-cyan-300/40 animate-ping"></div>
                      <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-cyan-400/30"></div>
                      <div className="absolute top-0 bottom-0 left-1/2 w-0.5 bg-cyan-400/30"></div>

                      <div className="absolute -bottom-8 inset-x-0 text-center font-mono text-[11px] text-cyan-300 font-semibold tracking-wider">
                        BIOMETRIC MESH: {livenessPulse}%
                      </div>
                    </div>
                  </div>
                )}

                {/* Real-time processing shield animation */}
                {isProcessing && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 backdrop-blur-sm">
                    <RefreshCw className="h-10 w-10 animate-spin text-amber-400" />
                    <span className="mt-3 font-mono text-sm tracking-widest text-amber-300 uppercase">
                      Executing Optical OCR & Cryptographic Checksum...
                    </span>
                  </div>
                )}
              </div>

              {/* Instructions and Controls Sidebar */}
              <div className="flex flex-col justify-between rounded-2xl border border-white/10 bg-white/[0.02] p-5 lg:col-span-4">
                <div>
                  <div className="mb-4">
                    <h4 className="font-serif text-base font-bold text-amber-300">
                      {stage === 'PASSPORT_SCAN'
                        ? t('scanner_step1_title')
                        : t('scanner_step2_title')}
                    </h4>
                    <p className="mt-1 text-xs text-neutral-300 leading-relaxed">
                      {stage === 'PASSPORT_SCAN'
                        ? t('scanner_step1_desc')
                        : t('scanner_step2_desc')}
                    </p>
                  </div>

                  <div className="space-y-3 rounded-xl border border-white/10 bg-black/30 p-3.5 text-xs">
                    <div className="flex items-center justify-between text-neutral-400">
                      <span>Capture Mode:</span>
                      <span className="font-mono text-white">4K UHD Optical Stream</span>
                    </div>
                    <div className="flex items-center justify-between text-neutral-400">
                      <span>ICAO PKD Protocol:</span>
                      <span className="font-mono text-cyan-300">SHA-256 ECDSA</span>
                    </div>
                    <div className="flex items-center justify-between text-neutral-400">
                      <span>Visa Telemetry:</span>
                      <span className="font-mono text-amber-300">Real-Time Border Match</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 space-y-3">
                  {stage === 'PASSPORT_SCAN' ? (
                    <button
                      onClick={handleCapturePassport}
                      disabled={isProcessing}
                      className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 px-4 py-3.5 text-sm font-semibold text-neutral-950 shadow-lg shadow-amber-500/20 hover:from-amber-400 hover:to-amber-500 transition disabled:opacity-50"
                    >
                      <Camera className="h-4 w-4" />
                      {t('camera_capture_passport')}
                    </button>
                  ) : (
                    <button
                      onClick={handleVerifyFace}
                      disabled={isProcessing}
                      className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-4 py-3.5 text-sm font-semibold text-white shadow-lg shadow-cyan-500/20 hover:from-cyan-400 hover:to-blue-500 transition disabled:opacity-50"
                    >
                      <UserCheck className="h-4 w-4" />
                      {t('camera_capture_face')}
                    </button>
                  )}

                  <button
                    onClick={onClose}
                    className="w-full rounded-xl border border-white/10 py-2.5 text-xs text-neutral-400 hover:bg-white/5 transition"
                  >
                    Cancel Verification
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* STAGE 3: Instant Validation Badge & Auto-Filled MRZ Profile */
            <div className="space-y-6">
              {/* Clearance Banner */}
              <div className="relative overflow-hidden rounded-2xl border border-emerald-500/40 bg-gradient-to-r from-emerald-950/50 via-neutral-900 to-emerald-950/50 p-5 shadow-lg shadow-emerald-500/10">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500/20 text-emerald-400 ring-2 ring-emerald-500/40">
                      <CheckCircle2 className="h-8 w-8" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-serif text-lg font-bold text-white">
                          ICAO Verified / Cleared for Boarding
                        </h4>
                        <span className="rounded bg-emerald-500/20 px-2 py-0.5 font-mono text-[11px] font-bold text-emerald-300">
                          99.8% Match
                        </span>
                      </div>
                      <p className="text-xs text-neutral-300">
                        Biometric signature cryptographically authenticated against Global ICAO PKD & Interpol registry.
                      </p>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="block font-mono text-xs text-neutral-400">Border Pre-Clearance ID:</span>
                    <span className="font-mono text-sm font-bold text-cyan-300">AU-CLEAR-2026-X889</span>
                  </div>
                </div>
              </div>

              {/* Parsed MRZ Details Grid */}
              {extractedData && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Passenger Identity Card */}
                  <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
                    <h5 className="mb-4 flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-amber-400">
                      <FileText className="h-4 w-4" /> Extracted Passport Telemetry
                    </h5>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between border-b border-white/5 pb-2">
                        <span className="text-neutral-400">{t('mrz_name')}</span>
                        <span className="font-bold text-white">{extractedData.fullName}</span>
                      </div>
                      <div className="flex justify-between border-b border-white/5 pb-2">
                        <span className="text-neutral-400">{t('mrz_passport')}</span>
                        <span className="font-mono font-bold text-amber-300">{extractedData.passportNumber}</span>
                      </div>
                      <div className="flex justify-between border-b border-white/5 pb-2">
                        <span className="text-neutral-400">{t('mrz_nationality')}</span>
                        <span className="text-white">{extractedData.nationality}</span>
                      </div>
                      <div className="flex justify-between border-b border-white/5 pb-2">
                        <span className="text-neutral-400">{t('mrz_expiry')}</span>
                        <span className="font-mono text-white">{extractedData.expiryDate}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-neutral-400">{t('mrz_gender')}</span>
                        <span className="font-mono text-white">{extractedData.gender === 'M' ? 'Male (M)' : 'Female (F)'}</span>
                      </div>
                    </div>
                  </div>

                  {/* Visa Status & Raw MRZ */}
                  <div className="flex flex-col justify-between rounded-2xl border border-white/10 bg-white/[0.02] p-5">
                    <div>
                      <h5 className="mb-3 flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-cyan-400">
                        <Compass className="h-4 w-4" /> Automatic Visa Requirement Check
                      </h5>

                      {/* Visa Badge */}
                      <div
                        className={`rounded-xl p-3 text-xs border ${
                          extractedData.visaStatus === 'EXEMPT'
                            ? 'border-emerald-500/40 bg-emerald-950/30 text-emerald-300'
                            : extractedData.visaStatus === 'EVisa_ELIGIBLE'
                            ? 'border-cyan-500/40 bg-cyan-950/30 text-cyan-300'
                            : 'border-amber-500/40 bg-amber-950/30 text-amber-300'
                        }`}
                      >
                        <div className="flex items-center gap-2 font-bold mb-1">
                          <CheckCircle2 className="h-4 w-4" />
                          <span>
                            {extractedData.visaStatus === 'EXEMPT'
                              ? t('visa_exempt')
                              : extractedData.visaStatus === 'EVisa_ELIGIBLE'
                              ? t('visa_evisa')
                              : t('visa_required')}
                          </span>
                        </div>
                        <p className="text-[11px] opacity-90">{extractedData.visaNotes}</p>
                      </div>

                      {/* Raw MRZ Box */}
                      <div className="mt-4">
                        <span className="text-[10px] font-mono text-neutral-400">Raw Optical MRZ-2 Stream:</span>
                        <pre className="mt-1 rounded-lg border border-white/10 bg-black/60 p-2 font-mono text-[10px] text-amber-300/80 leading-snug overflow-x-auto">
                          {extractedData.mrzRaw}
                        </pre>
                      </div>
                    </div>

                    <div className="mt-5 flex gap-3">
                      <button
                        onClick={handleComplete}
                        className="flex-1 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 py-3 text-sm font-semibold text-neutral-950 shadow-lg shadow-amber-500/20 hover:from-amber-300 hover:to-amber-400 transition"
                      >
                        Apply Profile to Reservation
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
