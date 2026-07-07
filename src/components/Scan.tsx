import React, { useState } from 'react';
import {
  Camera,
  Scan as ScanIcon,
  CheckCircle2,
  Image,
  Upload,
  Award,
  X,
  RefreshCw,
} from 'lucide-react';
import { UserProfile, ScreenType } from '../types';
import { CityData } from '../cities';

interface ScanProps {
  profile: UserProfile;
  setProfile: React.Dispatch<React.SetStateAction<UserProfile>>;
  isWireframe: boolean;
  onNavigate: (screen: ScreenType) => void;
  city: CityData;
}

const MOCK_PHOTOS = [
  {
    url: "https://images.unsplash.com/photo-1618477388954-7852f32655ec?auto=format&fit=crop&q=80&w=300",
    label: "Botol Plastik"
  },
  {
    url: "https://images.unsplash.com/photo-1595079676339-1534801ad6cf?auto=format&fit=crop&q=80&w=300",
    label: "Kardus Bekas"
  },
  {
    url: "https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?auto=format&fit=crop&q=80&w=300",
    label: "Sisa Makanan"
  },
  {
    url: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=300",
    label: "Baterai Bekas"
  },
];

export default function Scan({ profile, setProfile, isWireframe, onNavigate, city }: ScanProps) {
  const [step, setStep] = useState<'choose' | 'capture' | 'preview' | 'saving' | 'done'>('choose');
  const [photo, setPhoto] = useState<{ url: string; label: string } | null>(null);
  const [source, setSource] = useState<'camera' | 'gallery' | null>(null);
  const [points, setPoints] = useState(0);

  const handlePickSource = (src: 'camera' | 'gallery') => {
    setSource(src);
    setStep('capture');
  };

  const handleTakePhoto = (p: { url: string; label: string }) => {
    setPhoto(p);
    setPoints(Math.floor(Math.random() * 100) + 50);
    setStep('preview');
  };

  const handleRetake = () => {
    setPhoto(null);
    setStep('capture');
  };

  const handleSave = () => {
    setStep('saving');
    setTimeout(() => {
      setProfile((prev) => ({
        ...prev,
        points: prev.points + points,
        totalWasteSubmitted: Number((prev.totalWasteSubmitted + 0.3).toFixed(2)),
      }));
      setStep('done');
    }, 1500);
  };

  const handleReset = () => {
    setStep('choose');
    setPhoto(null);
    setSource(null);
    setPoints(0);
  };

  return (
    <div className={`flex-1 flex flex-col phone-scroll overflow-y-auto ${isWireframe ? 'bg-white text-gray-800' : 'bg-gray-50'}`}>
      <div className={`p-4 shrink-0 bg-white border-b shadow-soft flex items-center justify-between ${isWireframe ? 'border-gray-300' : 'border-gray-100'}`}>
        <div>
          <h2 className="text-sm font-extrabold font-display text-gray-800 flex items-center gap-2">
            <ScanIcon className={`w-4 h-4 ${isWireframe ? 'text-gray-800' : 'text-emerald-500'}`} />
            Scan Sampah
          </h2>
          <p className="text-[10px] text-gray-400 mt-0.5">Ambil foto sampah untuk klaim EcoPoint</p>
        </div>
        <div className={`px-2.5 py-1 rounded-full text-[9px] font-bold shadow-sm ${
          isWireframe ? 'bg-gray-100 border border-gray-300' : 'bg-emerald-50 text-emerald-600 border border-emerald-100'
        }`}>
          {profile.points} pts
        </div>
      </div>

      {step === 'choose' && (
        <div className="flex-1 p-4 flex flex-col justify-center items-center gap-6">
          <div className={`p-6 rounded-2xl border text-center max-w-xs shadow-card anim-scale-in ${isWireframe ? 'bg-white border-gray-300' : 'bg-white border-gray-100/60'}`}>
            <div className="w-16 h-16 mx-auto rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center mb-3">
              <Camera className="w-8 h-8" />
            </div>
            <h3 className="text-xs font-extrabold text-gray-800 font-display mb-1">Lakukan Scan?</h3>
            <p className="text-[10px] text-gray-500">Ambil gambar sampah Anda untuk mendapatkan EcoPoint</p>
          </div>

          <div className="w-full max-w-xs space-y-3">
            <button onClick={() => handlePickSource('camera')}
              className={`w-full p-4 rounded-2xl border flex items-center gap-4 cursor-pointer transition-all btn-press card-hover ${
                isWireframe ? 'bg-white border-gray-300' : 'bg-white border-gray-100/60 shadow-soft hover:shadow-card'
              }`}>
              <div className={`p-3 rounded-xl ${isWireframe ? 'bg-gray-100 border border-gray-300' : 'bg-emerald-500 text-white shadow-sm'}`}>
                <Camera className="w-6 h-6" />
              </div>
              <div className="text-left">
                <h4 className="text-[11px] font-extrabold text-gray-800 font-display">Ambil Foto</h4>
                <p className="text-[9px] text-gray-400">Gunakan kamera HP</p>
              </div>
            </button>

            <button onClick={() => handlePickSource('gallery')}
              className={`w-full p-4 rounded-2xl border flex items-center gap-4 cursor-pointer transition-all btn-press card-hover ${
                isWireframe ? 'bg-white border-gray-300' : 'bg-white border-gray-100/60 shadow-soft hover:shadow-card'
              }`}>
              <div className={`p-3 rounded-xl ${isWireframe ? 'bg-gray-100 border border-gray-300' : 'bg-blue-500 text-white shadow-sm'}`}>
                <Image className="w-6 h-6" />
              </div>
              <div className="text-left">
                <h4 className="text-[11px] font-extrabold text-gray-800 font-display">Upload dari Galeri</h4>
                <p className="text-[9px] text-gray-400">Pilih dari penyimpanan</p>
              </div>
            </button>
          </div>
        </div>
      )}

      {step === 'capture' && (
        <div className="flex-1 p-4 flex flex-col">
          <div className={`p-3 rounded-xl border mb-3 text-center shadow-soft ${isWireframe ? 'bg-white border-gray-300' : 'bg-white border-gray-100/60'}`}>
            <span className="text-[9px] font-bold text-gray-400 uppercase tracking-wider">
              {source === 'camera' ? 'Buka Kamera' : 'Pilih dari Galeri'}
            </span>
          </div>
          <div className="grid grid-cols-2 gap-3 flex-1">
            {MOCK_PHOTOS.map((p) => (
              <button key={p.label} onClick={() => handleTakePhoto(p)}
                className={`rounded-2xl overflow-hidden border relative group cursor-pointer transition-all btn-press ${
                  isWireframe ? 'border-gray-300' : 'border-gray-100 shadow-soft hover:shadow-card'
                }`}>
                <img src={p.url} alt={p.label} className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all flex items-center justify-center">
                  <span className="text-white text-[8px] font-bold bg-black/70 px-3 py-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-all backdrop-blur-sm">
                    {source === 'camera' ? 'Ambil' : 'Pilih'}
                  </span>
                </div>
                <span className="absolute bottom-1.5 left-1.5 text-[7px] font-bold text-white bg-black/60 backdrop-blur-sm px-2 py-0.5 rounded">
                  {p.label}
                </span>
              </button>
            ))}
          </div>
          <button onClick={handleReset}
            className="mt-3 py-2.5 text-xs font-bold text-gray-500 rounded-xl border border-gray-200 hover:bg-gray-100 cursor-pointer btn-press">
            Batal
          </button>
        </div>
      )}

      {step === 'preview' && photo && (
        <div className="flex-1 p-4 flex flex-col">
          <div className="relative rounded-2xl overflow-hidden border border-gray-200 h-48 mb-4 shadow-soft">
            <img src={photo.url} alt={photo.label} className="w-full h-full object-cover" />
            <span className="absolute top-2 left-2 text-[8px] font-bold text-white bg-black/60 backdrop-blur-sm px-2.5 py-1 rounded-full">
              {photo.label}
            </span>
          </div>

          <div className={`p-4 rounded-2xl border space-y-3 mb-4 shadow-card ${isWireframe ? 'bg-white border-gray-300' : 'bg-white border-gray-100/60'}`}>
            <div className="flex justify-between items-center">
              <span className="text-[9px] text-gray-400 font-bold">EcoPoint</span>
              <span className="text-xs font-black text-emerald-600">+{points} pts</span>
            </div>
            <div className="border-t border-gray-100 pt-3 flex justify-between items-center">
              <span className="text-[9px] text-gray-400 font-bold">Berat Estimasi</span>
              <span className="text-xs font-bold text-gray-700">0.3 Kg</span>
            </div>
          </div>

          <div className="flex gap-2 mt-auto">
            <button onClick={handleRetake}
              className={`flex-1 py-3 text-xs font-bold rounded-xl border cursor-pointer btn-press ${
                isWireframe ? 'border-gray-400 text-gray-700' : 'border-gray-200 text-gray-600 hover:bg-gray-50 hover:border-gray-300'
              }`}>
              <span className="flex items-center justify-center gap-1"><RefreshCw className="w-3.5 h-3.5" /> Retake</span>
            </button>
            <button onClick={handleSave}
              className={`flex-1 py-3 text-xs font-bold text-white rounded-xl cursor-pointer btn-press shadow-sm ${
                isWireframe ? 'bg-gray-900 border border-black' : 'bg-emerald-500 hover:bg-emerald-600'
              }`}>
              <span className="flex items-center justify-center gap-1"><Upload className="w-3.5 h-3.5" /> Simpan Aktivitas</span>
            </button>
          </div>
        </div>
      )}

      {step === 'saving' && (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center space-y-3">
            <div className="w-14 h-14 mx-auto rounded-full bg-emerald-100 text-emerald-500 flex items-center justify-center animate-pulse">
              <Upload className="w-7 h-7" />
            </div>
            <p className="text-xs font-bold text-gray-600">Menyimpan Aktivitas...</p>
          </div>
        </div>
      )}

      {step === 'done' && (
        <div className="flex-1 p-4 flex flex-col justify-center items-center text-center space-y-6 anim-fade-in-up">
          <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-12 h-12" />
          </div>
          <div className="space-y-2 max-w-xs">
            <h3 className="text-sm font-black text-gray-800 font-display">Foto Berhasil Diupload!</h3>
            <p className="text-[11px] text-gray-500 leading-relaxed">
              <strong>+{points} EcoPoint</strong> berhasil ditambahkan ke akun Anda!
            </p>
          </div>
          <button onClick={() => onNavigate('dashboard')}
            className={`w-full max-w-xs py-3 text-xs font-extrabold text-white rounded-xl cursor-pointer btn-press shadow-sm ${
              isWireframe ? 'bg-gray-800' : 'bg-emerald-600 hover:bg-emerald-700'
            }`}>
            Selesai
          </button>
          <button onClick={handleReset}
            className="text-[10px] font-bold text-emerald-600 hover:text-emerald-700 hover:underline cursor-pointer transition-all">
            Scan Sampah Lainnya
          </button>
        </div>
      )}
    </div>
  );
}
