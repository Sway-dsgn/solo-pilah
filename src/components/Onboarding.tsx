import React, { useState } from 'react';
import logo from '../../logo.png';
import { ArrowRight, Recycle, Trash2, Award, Camera, MapPin, Flame, AlertTriangle, CheckCircle, TrendingUp, ChevronDown, X, Check } from 'lucide-react';
import { CityData } from '../cities';

interface OnboardingProps {
  onComplete: () => void;
  isWireframe: boolean;
  city: CityData;
}

export default function Onboarding({ onComplete, isWireframe, city }: OnboardingProps) {
  const [step, setStep] = useState(0);
  const [showWilayahPicker, setShowWilayahPicker] = useState(false);
  const [selectedKec, setSelectedKec] = useState(city.districts[0] || '');
  const [selectedKel, setSelectedKel] = useState('');

  const slides = [
    {
      title: "Krisis Sampah Putri Cempo Solo",
      description: "TPA Putri Cempo Surakarta kelebihan muatan - 300 ton sampah per hari. Solo Pilah hadir mengajak warga Solo memilah sampah demi kota yang bersih dan bebas polusi metana.",
      illustration: (
        <div className={`w-full h-52 rounded-2xl flex items-center justify-center relative overflow-hidden ${
          isWireframe ? 'border-2 border-dashed border-gray-400 bg-gray-50' : 'bg-gradient-to-br from-red-600 via-orange-500 to-amber-400'
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
            isWireframe ? 'border-2 border-dashed border-gray-400 bg-gray-50' : 'bg-gradient-to-br from-emerald-500 via-emerald-600 to-teal-700'
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
                        <div className={`${bin.color} w-12 h-12 rounded-xl flex items-center justify-center`}>
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
            isWireframe ? 'border-2 border-dashed border-gray-400 bg-gray-50' : 'bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800'
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
                    <div className="text-white text-2xl font-black animate-pulse">→</div>
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
      <div className={`flex-1 flex flex-col p-6 overflow-y-auto ${isWireframe ? 'bg-white text-gray-800' : 'bg-white'}`}>
        {/* Skip button */}
        <div className="flex justify-between items-center shrink-0">
          <div className="flex items-center gap-1.5">
            <img src={logo} alt="Solo Pilah" className="w-5 h-5 object-contain" />
            <span className={`text-sm font-extrabold font-display ${isWireframe ? 'text-gray-800' : 'text-emerald-600'}`}>{city.appName}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative">
              <button
                onClick={() => setShowWilayahPicker(!showWilayahPicker)}
                className={`text-[9px] font-bold px-2 py-1 rounded-lg flex items-center gap-1 cursor-pointer ${
                  isWireframe
                    ? 'text-gray-600 border border-gray-300 hover:bg-gray-100'
                    : 'text-emerald-600 hover:bg-emerald-50 hover:shadow-sm hover:-translate-y-0.5 border border-emerald-100 transition-all'
                }`}
              >
                <MapPin className="w-3 h-3" />
                {selectedKel || selectedKec}
              </button>
              {showWilayahPicker && (
                <div className={`fixed inset-0 z-50 flex items-end bg-gradient-to-t from-black/60 via-black/20 to-transparent backdrop-blur-sm`} onClick={() => setShowWilayahPicker(false)}>
                  <div className={`w-full bg-white rounded-t-3xl flex flex-col max-h-[70vh] overflow-hidden anim-scale-in ${
                    isWireframe ? '' : 'shadow-2xl'
                  }`} onClick={e => e.stopPropagation()}>
                    <div className="flex justify-center pt-3 pb-1 shrink-0">
                      <div className={`w-8 h-1 rounded-full ${isWireframe ? 'bg-gray-400' : 'bg-gray-300'}`} />
                    </div>

                    <div className="px-5 pb-3 border-b border-gray-100 shrink-0">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-xs font-extrabold font-display text-gray-800">Pilih Wilayah</h3>
                        <button onClick={() => setShowWilayahPicker(false)} className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 cursor-pointer">
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div className="p-3 space-y-3 overflow-y-auto phone-scroll">
                      <div className="space-y-1">
                        <label className="block text-[9px] font-bold text-gray-400 uppercase tracking-wider px-1">Kecamatan</label>
                        <div className="space-y-0.5">
                          {city.districts.map((k) => (
                            <button key={k}
                              onClick={() => { setSelectedKec(k); setSelectedKel(''); }}
                              className={`w-full p-3 rounded-xl text-xs font-bold text-left flex items-center gap-2.5 transition-all cursor-pointer ${
                                selectedKec === k
                                  ? isWireframe ? 'bg-gray-100 border border-gray-400' : 'bg-emerald-50 border border-emerald-200 text-emerald-700'
                                  : isWireframe ? 'hover:bg-gray-50 text-gray-600 border border-transparent' : 'hover:bg-gray-50 text-gray-600 border border-transparent'
                              }`}
                            >
                              <MapPin className={`w-4 h-4 shrink-0 ${selectedKec === k ? 'text-emerald-500' : 'text-gray-400'}`} />
                              <span className="flex-1">Kec. {k}</span>
                              {selectedKec === k && <Check className="w-4 h-4 text-emerald-500" />}
                            </button>
                          ))}
                        </div>
                      </div>

                      {selectedKec && (
                        <div className="space-y-1">
                          <label className="block text-[9px] font-bold text-gray-400 uppercase tracking-wider px-1">Kelurahan ({selectedKec})</label>
                          <div className="space-y-0.5">
                            {(city.subdistricts[selectedKec] || []).map((kel) => (
                              <button key={kel}
                                onClick={() => { setSelectedKel(kel); setShowWilayahPicker(false); }}
                                className={`w-full p-3 rounded-xl text-xs font-bold text-left flex items-center gap-2.5 transition-all cursor-pointer ${
                                  selectedKel === kel
                                    ? isWireframe ? 'bg-gray-100 border border-gray-400' : 'bg-emerald-50 border border-emerald-200 text-emerald-700'
                                    : isWireframe ? 'hover:bg-gray-50 text-gray-600 border border-transparent' : 'hover:bg-gray-50 text-gray-600 border border-transparent'
                                }`}
                              >
                                <MapPin className={`w-4 h-4 shrink-0 ${selectedKel === kel ? 'text-emerald-500' : 'text-gray-400'}`} />
                                <span className="flex-1">Kel. {kel}</span>
                                {selectedKel === kel && <Check className="w-4 h-4 text-emerald-500" />}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="p-4 border-t border-gray-100 shrink-0">
                      <button
                        onClick={() => setShowWilayahPicker(false)}
                        className={`w-full py-3 text-[10px] font-bold rounded-xl cursor-pointer transition-all ${
                          isWireframe ? 'bg-gray-900 text-white' : 'bg-emerald-500 hover:bg-emerald-600 text-white'
                        }`}
                      >
                        {selectedKel ? `Konfirmasi (Kel. ${selectedKel})` : selectedKec ? `Pilih Kelurahan` : 'Lewati'}
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <button
              onClick={onComplete}
              className={`text-xs font-bold px-3 py-1.5 rounded-lg transition-all ${
                isWireframe
                  ? 'text-gray-600 border border-gray-300 hover:bg-gray-100'
                  : 'text-emerald-600 hover:bg-emerald-50 hover:shadow-sm hover:-translate-y-0.5'
              }`}
            >
              Lewati
            </button>
          </div>
        </div>

        {/* Content */}
          <div key={step} className="flex-1 flex flex-col justify-center space-y-5 py-4 min-h-0 transition-all duration-500 ease-in-out">
            <div className="transition-all duration-500 ease-in-out">
              {currentSlide.illustration}
            </div>

            <div className="space-y-2 transition-all duration-500 ease-in-out">
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
            className={`w-full py-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 cursor-pointer transition-all ${
              isWireframe
                ? 'bg-gray-900 text-white hover:bg-gray-800 border-2 border-black'
                    : 'bg-emerald-500 text-white hover:bg-emerald-600 active:scale-95 shadow-sm btn-press'
            }`}
          >
            {step === slides.length - 1 ? "Mulai Sekarang" : "Selanjutnya"}
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }
