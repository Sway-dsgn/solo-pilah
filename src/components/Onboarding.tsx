import React, { useState } from 'react';
import logo from '../../logo.png';
import { ArrowRight, Recycle, Trash2, Award, Camera, MapPin, Flame, AlertTriangle, CheckCircle, TrendingUp } from 'lucide-react';

interface OnboardingProps {
  onComplete: () => void;
  isWireframe: boolean;
}

export default function Onboarding({ onComplete, isWireframe }: OnboardingProps) {
  const [step, setStep] = useState(0);

  const slides = [
    {
      title: "Krisis Sampah Putri Cempo Solo",
      description: "TPA Putri Cempo Surakarta kelebihan muatan — 300 ton sampah per hari. Solo Pilah hadir mengajak warga Solo memilah sampah demi kota yang bersih dan bebas polusi metana.",
      illustration: (
        <div className={`w-full h-52 rounded-2xl flex items-center justify-center relative overflow-hidden ${
          isWireframe ? 'border-2 border-dashed border-gray-400 bg-gray-50' : 'bg-gradient-to-br from-red-600 via-orange-500 to-amber-400 shadow-inner'
        }`}>
          {isWireframe ? (
            <div className="text-center p-4">
              <div className="w-12 h-12 border border-gray-400 mx-auto flex items-center justify-center mb-2">
                <Trash2 className="w-6 h-6 text-gray-400" />
              </div>
              <span className="text-[10px] font-mono text-gray-500 uppercase tracking-wider">[MOCK_IMAGE: KRISIS_CEMPO]</span>
            </div>
          ) : (
            <>
              <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-56 h-56 rounded-full bg-orange-400/30 blur-3xl"></div>
              <div className="absolute -top-4 right-4 w-20 h-20 rounded-full bg-red-500/20 blur-xl"></div>

              {/* Fire icons */}
              <div className="absolute top-3 left-6 animate-bounce">
                <Flame className="w-6 h-6 text-amber-200" />
              </div>
              <div className="absolute top-6 right-8 animate-pulse">
                <Flame className="w-5 h-5 text-orange-200" />
              </div>
              <div className="absolute bottom-4 left-4 animate-pulse">
                <AlertTriangle className="w-5 h-5 text-amber-200/80" />
              </div>

              {/* Stats overlay */}
              <div className="relative z-10 flex gap-3">
                <div className="bg-black/30 backdrop-blur rounded-xl p-3 text-center text-white min-w-[90px]">
                  <span className="text-2xl font-black font-display block">300</span>
                  <span className="text-[8px] uppercase tracking-wider opacity-80">Ton / Hari</span>
                </div>
                <div className="bg-black/30 backdrop-blur rounded-xl p-3 text-center text-white min-w-[90px]">
                  <span className="text-2xl font-black font-display block">15m</span>
                  <span className="text-[8px] uppercase tracking-wider opacity-80">Gunungan Sampah</span>
                </div>
              </div>

              <p className="absolute bottom-3 text-[9px] text-white/70 font-semibold tracking-wider">
                KRISIS TPA PUTRI CEMPO
              </p>
            </>
          )}
        </div>
        )
      },
      {
        title: "Pilah Praktis & Raih Poin",
        description: "Pilah sampah organik, anorganik, B3, dan elektronik dari rumah. Setorkan ke Bank Sampah terdekat untuk meraih CempoPoints yang bisa ditukar voucher belanja.",
        illustration: (
          <div className={`w-full h-52 rounded-2xl flex items-center justify-center relative overflow-hidden ${
            isWireframe ? 'border-2 border-dashed border-gray-400 bg-gray-50' : 'bg-gradient-to-br from-emerald-500 via-emerald-600 to-teal-700 shadow-inner'
          }`}>
            {isWireframe ? (
              <div className="text-center p-4">
                <div className="w-12 h-12 border border-gray-400 mx-auto flex items-center justify-center mb-2">
                  <Recycle className="w-6 h-6 text-gray-400" />
                </div>
                <span className="text-[10px] font-mono text-gray-500 uppercase tracking-wider">[MOCK_IMAGE: PILAH_POIN]</span>
              </div>
            ) : (
              <>
                <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-emerald-300/20 blur-2xl"></div>
                <div className="absolute -bottom-8 -left-8 w-36 h-36 rounded-full bg-teal-300/20 blur-2xl"></div>

                {/* Sorting bins visual */}
                <div className="relative z-10 grid grid-cols-4 gap-2 px-4">
                  {[
                    { label: "Organik", color: "bg-emerald-500", icon: Recycle },
                    { label: "Anorganik", color: "bg-blue-500", icon: Recycle },
                    { label: "B3", color: "bg-red-500", icon: AlertTriangle },
                    { label: "E-Waste", color: "bg-yellow-500", icon: Trash2 },
                  ].map((bin, i) => {
                    const BinIcon = bin.icon;
                    return (
                      <div key={i} className="flex flex-col items-center gap-1">
                        <div className={`${bin.color} w-12 h-12 rounded-xl flex items-center justify-center shadow-lg shadow-black/20`}>
                          <BinIcon className="w-6 h-6 text-white" />
                        </div>
                        <span className="text-[7px] text-white font-bold uppercase tracking-wider">{bin.label}</span>
                      </div>
                    );
                  })}
                </div>

                <div className="absolute bottom-3 flex items-center gap-1.5 bg-white/20 backdrop-blur rounded-full px-3 py-1">
                  <TrendingUp className="w-3 h-3 text-emerald-200" />
                  <span className="text-[8px] text-white font-bold">Tukarkan Jadi Voucher & BST</span>
                </div>
              </>
            )}
          </div>
        )
      },
      {
        title: "Lapor Sampah Liar Seketika",
        description: "Temukan tumpukan sampah liar ilegal di jalanan Solo? Cukup foto dan kirim koordinat GPS. Petugas kebersihan DLH Solo akan segera meluncur membersihkan lokasi.",
        illustration: (
          <div className={`w-full h-52 rounded-2xl flex items-center justify-center relative overflow-hidden ${
            isWireframe ? 'border-2 border-dashed border-gray-400 bg-gray-50' : 'bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 shadow-inner'
          }`}>
            {isWireframe ? (
              <div className="text-center p-4">
                <div className="w-12 h-12 border border-gray-400 mx-auto flex items-center justify-center mb-2">
                  <Camera className="w-6 h-6 text-gray-400" />
                </div>
                <span className="text-[10px] font-mono text-gray-500 uppercase tracking-wider">[MOCK_IMAGE: LAPOR_GPS]</span>
              </div>
            ) : (
              <>
                <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:20px_20px]"></div>
                <div className="absolute -top-6 -right-6 w-32 h-32 rounded-full bg-blue-400/20 blur-2xl"></div>

                <div className="relative z-10 flex flex-col items-center gap-3">
                  {/* Camera + MapPin combo */}
                  <div className="flex items-center gap-4">
                    <div className="bg-white/20 backdrop-blur rounded-2xl p-4">
                      <Camera className="w-8 h-8 text-white" />
                    </div>
                    <div className="text-white text-2xl font-black animate-pulse">⟶</div>
                    <div className="bg-emerald-400/30 backdrop-blur rounded-2xl p-4 border border-emerald-300/30">
                      <MapPin className="w-8 h-8 text-emerald-200" />
                    </div>
                  </div>

                  {/* Flow steps */}
                  <div className="flex gap-2">
                    {["Foto", "GPS", "Kirim", "Bersih"].map((s, i) => (
                      <div key={i} className="flex items-center gap-1 bg-white/15 backdrop-blur rounded-full px-2.5 py-1">
                        <CheckCircle className="w-2.5 h-2.5 text-emerald-300" />
                        <span className="text-[8px] text-white font-bold">{s}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <p className="absolute bottom-3 text-[8px] text-blue-200/70 font-semibold tracking-wider">
                  KOLABORASI WARGA + DLH SURAKARTA
                </p>
              </>
            )}
          </div>
        )
      }
    ];

    const currentSlide = slides[step];

    return (
      <div className={`h-full flex flex-col justify-between p-6 ${isWireframe ? 'bg-white text-gray-800' : 'bg-white'}`}>
        {/* Skip button */}
        <div className="flex justify-between items-center shrink-0">
          <div className="flex items-center gap-1.5">
            <img src={logo} alt="Solo Pilah" className="w-5 h-5 object-contain" />
            <span className={`text-sm font-extrabold font-display ${isWireframe ? 'text-gray-800' : 'text-emerald-600'}`}>Solo Pilah</span>
          </div>
          <button
            onClick={onComplete}
            className={`text-xs font-bold px-3 py-1.5 rounded-lg transition-all ${
              isWireframe
                ? 'text-gray-600 border border-gray-300 hover:bg-gray-100'
                : 'text-emerald-600 hover:bg-emerald-50'
            }`}
          >
            Lewati
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col justify-center space-y-5 py-4">
          {currentSlide.illustration}

          <div className="space-y-2">
            <h2 className={`text-lg font-bold font-display leading-snug ${isWireframe ? 'text-gray-900 border-b border-gray-200 pb-1' : 'text-gray-800'}`}>
              {currentSlide.title}
            </h2>
            <p className={`text-[11px] leading-relaxed ${isWireframe ? 'text-gray-500' : 'text-gray-600'}`}>
              {currentSlide.description}
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="space-y-4 shrink-0">
          {/* Dot Indicators */}
          <div className="flex justify-center gap-2">
            {slides.map((_, i) => (
              <span
                key={i}
                className={`h-2 rounded-full transition-all duration-300 ${
                  step === i
                    ? isWireframe
                      ? 'w-6 bg-gray-800'
                      : 'w-6 bg-emerald-500'
                    : isWireframe
                    ? 'w-2 bg-gray-300'
                    : 'w-2 bg-emerald-100'
                }`}
              />
            ))}
          </div>

          {/* Nav Button */}
          <button
            onClick={() => {
              if (step < slides.length - 1) {
                setStep(step + 1);
              } else {
                onComplete();
              }
            }}
            className={`w-full py-3.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-sm cursor-pointer transition-all ${
              isWireframe
                ? 'bg-gray-900 text-white hover:bg-gray-800 border-2 border-black'
                : 'bg-emerald-500 text-white hover:bg-emerald-600 active:scale-95 shadow-emerald-200/50'
            }`}
          >
            {step === slides.length - 1 ? "Mulai Sekarang" : "Selanjutnya"}
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }
