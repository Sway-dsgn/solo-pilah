import React, { useState, useEffect } from 'react';
import { 
  Camera, 
  Scan as ScanIcon, 
  CheckCircle2, 
  AlertTriangle, 
  Leaf, 
  Layers, 
  Trash2, 
  Award,
  ChevronRight,
  Info,
  RefreshCw,
  QrCode,
  Lightbulb
} from 'lucide-react';
import { UserProfile } from '../types';

interface ScanProps {
  profile: UserProfile;
  setProfile: React.Dispatch<React.SetStateAction<UserProfile>>;
  isWireframe: boolean;
  onNavigate: (screen: any) => void;
}

interface ScanMockItem {
  id: string;
  name: string;
  category: 'Organik' | 'Anorganik' | 'B3' | 'Elektronik';
  points: number;
  weight: number; // in kg
  co2Saved: number; // in kg
  tip: string;
  imageUrl: string;
}

const MOCK_SCAN_ITEMS: ScanMockItem[] = [
  {
    id: 'scan-1',
    name: 'Botol Plastik PET (Aqua 600ml)',
    category: 'Anorganik',
    points: 75,
    weight: 0.25,
    co2Saved: 0.18,
    tip: 'Bilas sisa minuman, remas botol untuk menghemat ruang, lalu kumpulkan dalam satu wadah sebelum disetor.',
    imageUrl: 'https://images.unsplash.com/photo-1618477388954-7852f32655ec?auto=format&fit=crop&q=80&w=150'
  },
  {
    id: 'scan-2',
    name: 'Kardus Bekas Box Indomie',
    category: 'Anorganik',
    points: 120,
    weight: 0.8,
    co2Saved: 0.45,
    tip: 'Lipat atau pipihkan kardus hingga rata, ikat rapi agar tidak berserakan dan terlindung dari basah air hujan.',
    imageUrl: 'https://images.unsplash.com/photo-1595079676339-1534801ad6cf?auto=format&fit=crop&q=80&w=150'
  },
  {
    id: 'scan-3',
    name: 'Sisa Kulit Buah & Potongan Sayur',
    category: 'Organik',
    points: 50,
    weight: 0.5,
    co2Saved: 0.12,
    tip: 'Tiriskan kandungan airnya, pisahkan dari plastik pembungkus. Sangat ideal diolah sebagai kompos mini.',
    imageUrl: 'https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?auto=format&fit=crop&q=80&w=150'
  },
  {
    id: 'scan-4',
    name: 'Baterai Bekas AA Alkaline',
    category: 'B3',
    points: 150,
    weight: 0.1,
    co2Saved: 0.05,
    tip: 'Zat kimia baterai beracun! Simpan di wadah kering, laporkan via fitur Lapor, atau antar langsung ke TPS khusus B3.',
    imageUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=150'
  }
];

export default function Scan({ profile, setProfile, isWireframe, onNavigate }: ScanProps) {
  const [scanState, setScanState] = useState<'idle' | 'scanning' | 'success' | 'claimed'>('idle');
  const [selectedItem, setSelectedItem] = useState<ScanMockItem | null>(null);
  const [scanProgress, setScanProgress] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (scanState === 'scanning') {
      setScanProgress(0);
      interval = setInterval(() => {
        setScanProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setScanState('success');
            return 100;
          }
          return prev + 10;
        });
      }, 200);
    }
    return () => clearInterval(interval);
  }, [scanState]);

  const handleStartScan = (item: ScanMockItem) => {
    setSelectedItem(item);
    setScanState('scanning');
  };

  const handleClaimPoints = () => {
    if (!selectedItem) return;

    // Update real user profile points and total waste submitted
    setProfile((prev) => ({
      ...prev,
      points: prev.points + selectedItem.points,
      totalWasteSubmitted: Number((prev.totalWasteSubmitted + selectedItem.weight).toFixed(2))
    }));

    setScanState('claimed');
  };

  const handleReset = () => {
    setScanState('idle');
    setSelectedItem(null);
    setScanProgress(0);
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Organik':
        return isWireframe ? 'bg-gray-100 text-gray-800 border-gray-400' : 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Anorganik':
        return isWireframe ? 'bg-gray-100 text-gray-800 border-gray-400' : 'bg-blue-50 text-blue-700 border-blue-200';
      case 'B3':
        return isWireframe ? 'bg-gray-100 text-gray-800 border-gray-400' : 'bg-red-50 text-red-700 border-red-200';
      case 'Elektronik':
        return isWireframe ? 'bg-gray-100 text-gray-800 border-gray-400' : 'bg-yellow-50 text-yellow-700 border-yellow-200';
      default:
        return 'bg-gray-50 text-gray-600 border-gray-200';
    }
  };

  return (
    <div className={`h-full flex flex-col phone-scroll overflow-y-auto ${isWireframe ? 'bg-white text-gray-800' : 'bg-gray-50'}`}>
      {/* App Bar */}
      <div className={`p-4 shrink-0 bg-white border-b flex items-center justify-between ${
        isWireframe ? 'border-gray-300' : 'border-gray-100 shadow-sm'
      }`}>
        <div>
          <h2 className="text-sm font-extrabold font-display text-gray-800 flex items-center gap-2">
            <ScanIcon className={`w-4 h-4 ${isWireframe ? 'text-gray-800' : 'text-emerald-500'}`} />
            Scan Cepat Sampah
          </h2>
          <p className="text-[10px] text-gray-400 mt-0.5 font-sans">
            Pindai barcode/jenis sampah untuk info pilah & peroleh points
          </p>
        </div>
        <div className="flex items-center gap-1">
          <div className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${
            isWireframe ? 'bg-gray-100 border border-gray-300' : 'bg-emerald-50 text-emerald-600 border border-emerald-100'
          }`}>
            {profile.points} pts
          </div>
        </div>
      </div>

      {scanState === 'idle' && (
        <div className="flex-1 p-4 flex flex-col justify-between">
          {/* Instructions and Camera Preview Box Mock */}
          <div className="space-y-4">
            <div className={`p-4 rounded-2xl border text-center relative overflow-hidden ${
              isWireframe ? 'border-gray-300 bg-white' : 'bg-white border-gray-100/60 shadow-sm'
            }`}>
              <div className="w-16 h-16 mx-auto rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center mb-2.5">
                <Camera className="w-8 h-8" />
              </div>
              <h3 className="text-xs font-extrabold text-gray-800 font-display">Simulasi Pemindaian Kamera</h3>
              <p className="text-[10px] text-gray-500 leading-relaxed mt-1.5 max-w-xs mx-auto">
                Pilih salah satu item di bawah ini seolah-olah Anda mengarahkan kamera ponsel ke barcode sampah kering Anda.
              </p>
            </div>

            {/* List of Mock Items to Scan */}
            <div>
              <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">
                Pilih Sampah untuk Di-Scan:
              </h4>
              <div className="space-y-2">
                {MOCK_SCAN_ITEMS.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleStartScan(item)}
                    className={`w-full p-3 rounded-xl border flex items-center gap-3 text-left transition-all hover:scale-[1.01] active:scale-[0.99] cursor-pointer ${
                      isWireframe 
                        ? 'border-gray-300 bg-white hover:bg-gray-50' 
                        : 'bg-white hover:bg-emerald-50/20 border-gray-100/50 shadow-sm'
                    }`}
                  >
                    <img 
                      src={item.imageUrl} 
                      alt={item.name} 
                      className="w-11 h-11 rounded-lg object-cover shrink-0 border border-gray-100" 
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="text-[11px] font-bold text-gray-800 truncate font-display leading-tight">
                          {item.name}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <span className={`text-[8px] font-black px-1.5 py-0.5 rounded border ${getCategoryColor(item.category)}`}>
                          {item.category}
                        </span>
                        <span className="text-[9px] text-gray-400 font-medium">
                          {item.weight} Kg • +{item.points} pts
                        </span>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-300 shrink-0" />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Informational note */}
          <div className={`p-3 rounded-xl border flex gap-2 mt-4 ${
            isWireframe ? 'border-gray-300' : 'bg-gray-50 border-gray-100/50'
          }`}>
            <Info className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
            <p className="text-[9px] text-gray-500 leading-normal">
              <strong>Info:</strong> Mengapa memilah sampah mendapat poin? Setiap gram sampah plastik, logam, dan kertas bernilai ekonomi tinggi saat masuk ke rantai daur ulang di Surakarta.
            </p>
          </div>
        </div>
      )}

      {scanState === 'scanning' && selectedItem && (
        <div className="flex-1 p-4 flex flex-col justify-between bg-black relative">
          {/* Camerashot Frame / Overlay Simulation */}
          <div className="absolute inset-0 z-0 opacity-40 bg-cover bg-center" style={{ backgroundImage: `url(${selectedItem.imageUrl})` }}></div>
          
          <div className="relative z-10 w-full h-full flex flex-col justify-between text-white">
            <div className="text-center pt-8">
              <span className="bg-black/60 px-3 py-1.5 rounded-full text-[10px] font-bold border border-white/10 tracking-wider uppercase">
                Menyinkronkan Kamera...
              </span>
            </div>

            {/* Target Area Box with Laser Effect */}
            <div className="w-64 h-64 mx-auto border-2 border-dashed border-emerald-400 rounded-3xl relative flex items-center justify-center overflow-hidden my-4">
              <div className="absolute top-0 inset-x-0 h-0.5 bg-emerald-400 animate-[bounce_2s_infinite] shadow-[0_0_15px_#10b981]"></div>
              
              <div className="p-4 bg-black/70 rounded-2xl text-center max-w-[80%] border border-white/15">
                <QrCode className="w-12 h-12 text-emerald-400 mx-auto animate-pulse mb-2" />
                <span className="text-[10px] font-mono block text-emerald-300">
                  PINDAI BARCODE/GAMBAR
                </span>
                <span className="text-[9px] text-gray-400 block mt-1">
                  Mendeteksi {selectedItem.name}
                </span>
              </div>
            </div>

            {/* Bottom Progress */}
            <div className="space-y-2.5 pb-6">
              <div className="flex justify-between text-[10px] px-2 text-gray-300 font-mono">
                <span>MEMASING KATEGORI...</span>
                <span>{scanProgress}%</span>
              </div>
              <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-emerald-400 transition-all duration-200"
                  style={{ width: `${scanProgress}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      )}

      {scanState === 'success' && selectedItem && (
        <div className="flex-1 p-4 flex flex-col justify-between">
          <div className="space-y-4">
            {/* Visual Success Header */}
            <div className={`p-4 rounded-2xl text-center border ${
              isWireframe ? 'border-gray-300 bg-white' : 'bg-emerald-500/5 border-emerald-100 shadow-sm'
            }`}>
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-2">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <h3 className="text-xs font-black text-gray-800 font-display">Identifikasi Berhasil!</h3>
              <p className="text-[10px] text-gray-500 mt-1">Sistem Cempo AI mendeteksi sampah Anda dengan akurat.</p>
            </div>

            {/* Item Details Card */}
            <div className={`p-3.5 rounded-2xl border space-y-3.5 ${
              isWireframe ? 'border-gray-300 bg-white' : 'bg-white border-gray-100/50 shadow-sm'
            }`}>
              <div className="flex gap-3">
                <img 
                  src={selectedItem.imageUrl} 
                  alt={selectedItem.name} 
                  className="w-16 h-16 rounded-xl object-cover shrink-0 border" 
                />
                <div className="space-y-1.5 min-w-0 flex-1">
                  <span className={`text-[8px] font-black px-2 py-0.5 rounded border ${getCategoryColor(selectedItem.category)}`}>
                    {selectedItem.category}
                  </span>
                  <h4 className="text-xs font-extrabold text-gray-800 font-display leading-tight block">
                    {selectedItem.name}
                  </h4>
                  <p className="text-[9px] text-gray-400 font-medium">
                    Estimasi Berat: <span className="text-gray-700 font-bold">{selectedItem.weight} Kg</span>
                  </p>
                </div>
              </div>

              {/* Carbon vs Points metrics */}
              <div className="grid grid-cols-2 gap-2">
                <div className="p-2 bg-emerald-50/50 rounded-xl border border-emerald-100/40 text-center">
                  <span className="text-[8px] text-gray-400 block font-medium">Reward Poin</span>
                  <span className="text-xs font-black text-emerald-600 mt-0.5 block flex items-center justify-center gap-1">
                    <Award className="w-3.5 h-3.5" />
                    +{selectedItem.points} pts
                  </span>
                </div>
                <div className="p-2 bg-blue-50/50 rounded-xl border border-blue-100/40 text-center">
                  <span className="text-[8px] text-gray-400 block font-medium">Reduksi CO2</span>
                  <span className="text-xs font-black text-blue-600 mt-0.5 block">
                    {selectedItem.co2Saved} Kg
                  </span>
                </div>
              </div>

              {/* Sorting Guide Tips */}
              <div className="p-2.5 rounded-xl bg-amber-50/40 border border-amber-100/30 text-[9.5px] leading-relaxed text-gray-600">
                <p>
                  <strong className="flex items-center gap-1"><Lightbulb className="w-3.5 h-3.5 text-amber-500" /> Tips Pengelolaan:</strong> {selectedItem.tip}
                </p>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="space-y-2 mt-4">
            <button
              onClick={handleClaimPoints}
              className={`w-full py-3 text-xs font-extrabold text-white rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-md ${
                isWireframe ? 'bg-gray-800' : 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-100'
              }`}
            >
              <Award className="w-4 h-4" />
              Klaim +{selectedItem.points} CempoPoints!
            </button>
            <button
              onClick={handleReset}
              className={`w-full py-2.5 text-xs font-bold text-gray-500 rounded-xl transition-all cursor-pointer hover:bg-gray-100 text-center block border border-gray-200`}
            >
              Batal & Scan Ulang
            </button>
          </div>
        </div>
      )}

      {scanState === 'claimed' && selectedItem && (
        <div className="flex-1 p-4 flex flex-col justify-center items-center text-center space-y-6">
          <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto animate-bounce shadow-md">
            <CheckCircle2 className="w-12 h-12" />
          </div>

          <div className="space-y-2 max-w-xs">
            <h3 className="text-sm font-black text-gray-800 font-display">CempoPoints Berhasil Diklaim!</h3>
            <p className="text-[11px] text-gray-500 leading-relaxed">
              Selamat! <strong>+{selectedItem.points} CempoPoints</strong> telah berhasil ditambahkan ke saldo utama Anda.
            </p>
            <p className="text-[10px] text-gray-400 leading-normal bg-gray-50 p-2.5 rounded-xl border border-gray-100/60 font-medium">
              Serta Anda telah mengamankan <strong>{selectedItem.weight} Kg</strong> sampah agar tidak berakhir mencemari TPA Putri Cempo Mojosongo!
            </p>
          </div>

          <div className="w-full space-y-2 pt-4">
            <button
              onClick={() => onNavigate('dashboard')}
              className={`w-full py-3 text-xs font-extrabold text-white rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                isWireframe ? 'bg-gray-800' : 'bg-emerald-600 hover:bg-emerald-700'
              }`}
            >
              Kembali ke Beranda
            </button>
            <button
              onClick={handleReset}
              className="w-full py-2.5 text-xs font-bold text-gray-500 rounded-xl transition-all cursor-pointer hover:bg-gray-100 border border-gray-200"
            >
              Scan Sampah Lainnya
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
