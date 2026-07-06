import React, { useState } from 'react';
import logo from '../../logo.png';
import { ArrowRight, Sparkles, Recycle, Trash2, Award } from 'lucide-react';

interface OnboardingProps {
  onComplete: () => void;
  isWireframe: boolean;
}

export default function Onboarding({ onComplete, isWireframe }: OnboardingProps) {
  const [step, setStep] = useState(0);

  const slides = [
    {
      title: "Krisis Sampah Putri Cempo Solo",
      description: "TPA Putri Cempo Surakarta kini kelebihan muatan. Solo Pilah hadir mengajak warga Solo memilah sampah demi kota yang bersih, sehat, dan bebas polusi metana.",
      illustration: (
        <div className={`w-full h-44 rounded-2xl flex items-center justify-center relative overflow-hidden ${
          isWireframe ? 'border-2 border-dashed border-gray-400 bg-gray-50' : 'bg-gradient-to-br from-emerald-500 to-teal-600 shadow-inner'
        }`}>
          {isWireframe ? (
            <div className="text-center p-4">
              <div className="w-12 h-12 border border-gray-400 mx-auto flex items-center justify-center mb-2">
                <Trash2 className="w-6 h-6 text-gray-400" />
              </div>
              <span className="text-[10px] font-mono text-gray-500 uppercase tracking-wider">[MOCK_IMAGE: KRISIS_CEMPO_ILLUSTRATION]</span>
            </div>
          ) : (
            <>
              {/* Abstract green hill represent waste pile and recycling circle */}
              <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-48 h-48 rounded-full bg-emerald-400/30 blur-2xl"></div>
              <div className="relative text-center p-6 text-white z-10">
                <div className="inline-block p-4 bg-white/20 rounded-full mb-3 backdrop-blur-sm">
                  <Trash2 className="w-10 h-10 text-emerald-100" />
                </div>
                <p className="text-xs font-semibold uppercase tracking-widest text-emerald-100">Krisis TPA Surakarta</p>
                <p className="text-lg font-bold mt-1 font-display leading-tight">Selamatkan Mojosongo & Bengawan Solo</p>
              </div>
            </>
          )}
        </div>
        )
      },
      {
        title: "Pilah Praktis & Raih Poin",
        description: "Pilah sampah organik, anorganik, B3, dan elektronik dari rumah. Setorkan ke Bank Sampah terdekat untuk meraih CempoPoints yang bisa ditukar voucher belanja.",
        illustration: (
          <div className={`w-full h-44 rounded-2xl flex items-center justify-center relative overflow-hidden ${
            isWireframe ? 'border-2 border-dashed border-gray-400 bg-gray-50' : 'bg-gradient-to-br from-emerald-500 via-emerald-600 to-emerald-700 shadow-inner'
          }`}>
            {isWireframe ? (
              <div className="text-center p-4">
                <div className="w-12 h-12 border border-gray-400 mx-auto flex items-center justify-center mb-2">
                  <Recycle className="w-6 h-6 text-gray-400" />
                </div>
                <span className="text-[10px] font-mono text-gray-500 uppercase tracking-wider">[MOCK_IMAGE: PILAH_SAMPAH_POIN]</span>
              </div>
            ) : (
              <>
                <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-emerald-400/30 blur-xl"></div>
                <div className="relative text-center p-6 text-white z-10">
                  <div className="inline-block p-4 bg-white/20 rounded-full mb-3 backdrop-blur-sm">
                    <Award className="w-10 h-10 text-emerald-100" />
                  </div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-emerald-100">CempoPoints Reward</p>
                  <p className="text-lg font-bold mt-1 font-display leading-tight">Konversi Botol Plastik Jadi Rupiah</p>
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
          <div className={`w-full h-44 rounded-2xl flex items-center justify-center relative overflow-hidden ${
            isWireframe ? 'border-2 border-dashed border-gray-400 bg-gray-50' : 'bg-gradient-to-br from-emerald-600 via-emerald-700 to-emerald-800 shadow-inner'
          }`}>
            {isWireframe ? (
              <div className="text-center p-4">
                <div className="w-12 h-12 border border-gray-400 mx-auto flex items-center justify-center mb-2">
                  <Leaf className="w-6 h-6 text-gray-400" />
                </div>
                <span className="text-[10px] font-mono text-gray-500 uppercase tracking-wider">[MOCK_IMAGE: LAPOR_SAMPAH_GPS]</span>
              </div>
            ) : (
              <>
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]"></div>
                <div className="relative text-center p-6 text-white z-10">
                  <div className="inline-block p-4 bg-white/20 rounded-full mb-3 backdrop-blur-sm">
                    <Sparkles className="w-10 h-10 text-emerald-100" />
                  </div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-emerald-100">Kolaborasi Sosial</p>
                  <p className="text-lg font-bold mt-1 font-display leading-tight">Bersama DLH Jaga Keasrian Solo</p>
                </div>
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
        <div className="flex justify-between items-center">
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
        <div className="my-auto space-y-6">
          {currentSlide.illustration}

          <div className="space-y-2.5">
            <h2 className={`text-xl font-bold font-display ${isWireframe ? 'text-gray-900 border-b border-gray-200 pb-1' : 'text-gray-800'}`}>
              {currentSlide.title}
            </h2>
            <p className={`text-xs leading-relaxed ${isWireframe ? 'text-gray-500' : 'text-gray-600'}`}>
              {currentSlide.description}
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="space-y-4">
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
