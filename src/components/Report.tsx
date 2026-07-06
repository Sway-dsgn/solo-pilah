import React, { useState } from 'react';
import { WasteReport } from '../types';
import { INITIAL_REPORTS } from '../data';
import {
  Camera,
  MapPin,
  FileText,
  Clock,
  CheckCircle2,
  AlertTriangle,
  History,
  PlusCircle,
  Truck,
  Image as ImageIcon,
  User,
  ArrowRight,
  ShieldCheck,
  Copy,
  X
} from 'lucide-react';

interface ReportProps {
  isWireframe: boolean;
  reports: WasteReport[];
  setReports: React.Dispatch<React.SetStateAction<WasteReport[]>>;
  userRole: string;
}

export default function Report({ isWireframe, reports, setReports, userRole }: ReportProps) {
  const [activeTab, setActiveTab] = useState<'create' | 'history'>('create');
  const [selectedReport, setSelectedReport] = useState<WasteReport | null>(reports[1]); // Default to UNS report for details

  // Form states
  const [description, setDescription] = useState('');
  const [wasteType, setWasteType] = useState('Anorganik');
  const [chosenPhoto, setChosenPhoto] = useState<string | null>(null);
  const [gpsLocation, setGpsLocation] = useState<{ name: string; x: number; y: number } | null>(null);
  const [isCapturing, setIsCapturing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    }).catch(err => {
      console.error('Failed to copy: ', err);
    });
  };

  // Mock garbage piles photos to select from
  const MOCK_PILE_PHOTOS = [
    {
      url: "https://images.unsplash.com/photo-1611284446314-60a58ac0deb9?auto=format&fit=crop&q=80&w=300",
      label: "Sampah Plastik Parit"
    },
    {
      url: "https://images.unsplash.com/photo-1530587191325-3db32d826c18?auto=format&fit=crop&q=80&w=300",
      label: "Sampah Sayur Pasar"
    },
    {
      url: "https://images.unsplash.com/photo-1504438612444-b2d1ec5b9bb4?auto=format&fit=crop&q=80&w=300",
      label: "Sampah Kasur Sungai"
    }
  ];

  // Simulated GPS Landmarks in Solo
  const MOCK_GPS_LOCATIONS = [
    { name: "Jl. Ki Hajar Dewantara, Jebres, Surakarta", x: 74, y: 32 },
    { name: "Jl. Slamet Riyadi No. 120, Samping Solo Grand Mall", x: 28, y: 58 },
    { name: "Bantaran Kali Pepe, Sudiroprajan, Jebres", x: 54, y: 48 },
    { name: "Sekitar Stadion Manahan, Banjarsari", x: 30, y: 32 }
  ];

  const handleCapturePhoto = (photoUrl: string) => {
    setChosenPhoto(photoUrl);
    setIsCapturing(false);
  };

  const handleFetchGps = () => {
    // Pick a random Solo location
    const randomLoc = MOCK_GPS_LOCATIONS[Math.floor(Math.random() * MOCK_GPS_LOCATIONS.length)];
    setGpsLocation(randomLoc);
  };

  const handleSubmitReport = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chosenPhoto || !gpsLocation) {
      alert("Harap pilih foto tumpukan sampah dan dapatkan lokasi GPS!");
      return;
    }

    setIsSubmitting(true);

    // Simulate server response delay
    setTimeout(() => {
      const newReport: WasteReport = {
        id: `rep-${Date.now()}`,
        title: `Laporan Sampah ${wasteType} - ${gpsLocation.name.split(',')[0]}`,
        description: description || "Tumpukan sampah merusak pemandangan, mohon segera ditindaklanjuti.",
        locationName: gpsLocation.name,
        coordinates: { x: gpsLocation.x, y: gpsLocation.y },
        imageUrl: chosenPhoto,
        status: 'Menunggu',
        date: new Date().toISOString().split('T')[0],
        reportedBy: "Ahmad Fauzi",
        wasteType: wasteType,
        beforeImageUrl: chosenPhoto
      };

      setReports([newReport, ...reports]);
      setIsSubmitting(false);

      // Reset form
      setChosenPhoto(null);
      setGpsLocation(null);
      setDescription('');

      // Redirect to history tab
      setActiveTab('history');
      setSelectedReport(newReport);
    }, 1500);
  };

  // Allow Petugas (Officer) to advance status for demo purpose
  const handleAdvanceStatus = (reportId: string) => {
    setReports(prev => prev.map(rep => {
      if (rep.id === reportId) {
        if (rep.status === 'Menunggu') return { ...rep, status: 'Diverifikasi' };
        if (rep.status === 'Diverifikasi') return { ...rep, status: 'Diproses', officerName: 'Budi Santoso' };
        if (rep.status === 'Diproses') {
          return {
            ...rep,
            status: 'Selesai',
            afterImageUrl: "https://images.unsplash.com/photo-1595275312706-e822003666d7?auto=format&fit=crop&q=80&w=300",
            pointsAwarded: 150
          };
        }
      }
      return rep;
    }));

    // Update details panel in-place
    setTimeout(() => {
      setSelectedReport(prev => {
        if (!prev || prev.id !== reportId) return prev;
        const updated = reports.find(r => r.id === reportId);
        return updated || null;
      });
    }, 100);
  };

  return (
    <div className={`flex-1 flex flex-col phone-scroll overflow-y-auto ${isWireframe ? 'bg-white text-gray-800' : 'bg-gray-50'}`}>
      {/* Header */}
      <div className={`p-4 shrink-0 bg-white border-b ${isWireframe ? 'border-gray-300' : 'border-gray-100'}`}>
        <div className="flex justify-between items-center">
          <h2 className="text-sm font-extrabold font-display text-gray-800 flex items-center gap-2">
            <Camera className={`w-4 h-4 ${isWireframe ? 'text-gray-800' : 'text-emerald-500'}`} />
            Laporan Sampah Liar
          </h2>
          <span className="text-[9px] font-bold bg-amber-100 text-amber-800 px-2 py-0.5 rounded">DLH Surakarta</span>
        </div>
      </div>

      {/* Tabs Menu */}
      <div className="flex border-b border-gray-200 shrink-0 bg-white">
        <button
          onClick={() => setActiveTab('create')}
          className={`flex-1 py-3 text-xs font-bold text-center border-b-2 flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
            activeTab === 'create'
              ? 'border-emerald-500 text-emerald-600'
              : 'border-transparent text-gray-400 hover:text-gray-600'
          }`}
        >
          <PlusCircle className="w-4 h-4" />
          Lapor Baru
        </button>
        <button
          onClick={() => setActiveTab('history')}
          className={`flex-1 py-3 text-xs font-bold text-center border-b-2 flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
            activeTab === 'history'
              ? 'border-emerald-500 text-emerald-600'
              : 'border-transparent text-gray-400 hover:text-gray-600'
          }`}
        >
          <History className="w-4 h-4" />
          Riwayat Lapor ({reports.length})
        </button>
      </div>

      {/* Content tabs */}
      <div className="p-4 flex-1">
        {/* CREATE TAB */}
        {activeTab === 'create' && (
          <form onSubmit={handleSubmitReport} className="space-y-4">
            {/* Photo upload simulator */}
            <div className="space-y-1.5">
              <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                Ambil Foto Bukti Tumpukan Sampah:
              </label>

              {isCapturing ? (
                /* Simulated Camera view */
                <div className="border-2 border-red-500 rounded-2xl bg-black h-48 relative overflow-hidden flex flex-col justify-between p-3">
                  <div className="flex justify-between items-center text-white text-[9px] z-10 bg-black/40 p-1.5 rounded-lg font-mono">
                    <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span> REC CAMERA</span>
                    <span>AI AUTO_DETECT ON</span>
                  </div>

                  {/* Bounding box illustration to show AI capability */}
                  <div className="absolute inset-10 border-2 border-emerald-500 rounded-lg flex items-center justify-center pointer-events-none">
                    <div className="bg-emerald-500 text-white text-[8px] font-bold px-1.5 py-0.5 rounded -mt-24">
                      Deteksi Tumpukan Sampah: 94%
                    </div>
                  </div>

                  {/* Shutter photo pick lists */}
                  <div className="z-10 space-y-1.5 w-full bg-black/60 p-2 rounded-xl">
                    <p className="text-[9px] text-gray-300 font-semibold text-center mb-1">
                      Tap salah satu di bawah untuk mensimulasikan jepretan kamera:
                    </p>
                    <div className="grid grid-cols-3 gap-1.5">
                      {MOCK_PILE_PHOTOS.map((p) => (
                        <button
                          key={p.label}
                          type="button"
                          onClick={() => handleCapturePhoto(p.url)}
                          className="p-1 border border-white/20 bg-white/10 hover:bg-white/20 text-white rounded text-[8px] truncate block"
                        >
                          {p.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              ) : chosenPhoto ? (
                <div className="relative rounded-2xl overflow-hidden border border-gray-200 h-40 group">
                  <img src={chosenPhoto} alt="Bukti Sampah" className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={() => setChosenPhoto(null)}
                    className="absolute top-2 right-2 bg-red-500/80 hover:bg-red-500 text-white rounded-full p-1.5 text-xs transition-colors cursor-pointer"
                  >
                    <span className="flex items-center gap-1">Ganti Foto <X className="w-3 h-3" /></span>
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => setIsCapturing(true)}
                  className={`w-full h-40 rounded-2xl border-2 border-dashed flex flex-col items-center justify-center gap-1.5 cursor-pointer transition-all ${
                    isWireframe
                      ? 'border-gray-400 bg-white hover:bg-gray-50'
                      : 'border-emerald-200 bg-emerald-50/20 hover:bg-emerald-50/50 hover:border-emerald-300'
                  }`}
                >
                  <Camera className={`w-8 h-8 ${isWireframe ? 'text-gray-400' : 'text-emerald-500'}`} />
                  <span className="text-xs font-bold text-gray-700">Ambil Foto Sampah (Simulasi AI)</span>
                  <span className="text-[9px] text-gray-400">Gunakan kamera HP untuk jepret otomatis</span>
                </button>
              )}
            </div>

            {/* GPS Fetching Box */}
            <div className="space-y-1.5">
              <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                Lokasi GPS (Surakarta):
              </label>
              <div className="flex gap-2">
                <div className={`flex-1 p-3 rounded-xl border flex items-center gap-2 min-h-[42px] ${
                  isWireframe ? 'border-gray-400 bg-white' : 'border-gray-200 bg-gray-50/30'
                }`}>
                  <MapPin className="w-4 h-4 text-red-500 shrink-0" />
                  <span className="text-[10px] text-gray-600 font-medium line-clamp-1">
                    {gpsLocation ? gpsLocation.name : "Belum mendapatkan lokasi GPS..."}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={handleFetchGps}
                  className={`px-3 py-2 text-xs font-bold rounded-xl border flex items-center justify-center cursor-pointer transition-all ${
                    isWireframe
                      ? 'border-gray-400 hover:bg-gray-100 text-gray-700'
                      : 'bg-white hover:bg-gray-50 border-gray-200 text-emerald-600'
                  }`}
                >
                  GPS
                </button>
              </div>
            </div>

            {/* Waste type category dropdown */}
            <div className="space-y-1.5">
              <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                Estimasi Kategori Sampah:
              </label>
              <select
                value={wasteType}
                onChange={(e) => setWasteType(e.target.value)}
                className={`w-full p-3 text-xs rounded-xl border focus:outline-none focus:ring-2 ${
                  isWireframe ? 'border-gray-400 focus:ring-gray-800' : 'border-gray-200 focus:ring-emerald-500/20 focus:border-emerald-500 bg-white'
                }`}
              >
                <option value="Organik">Organik (Sayur, sisa makanan, busuk)</option>
                <option value="Anorganik">Anorganik (Plastik, kertas, botol, kaca)</option>
                <option value="B3">Limbah Berbahaya (Baterai, oli, neon)</option>
                <option value="Campuran">Campuran / Tumpukan Liar Umum</option>
              </select>
            </div>

            {/* Description field */}
            <div className="space-y-1.5">
              <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                Deskripsi Tambahan (Opsional):
              </label>
              <textarea
                placeholder="Tulis ciri-ciri lokasi atau kendala (misal: di pojokan dekat tiang listrik, menimbulkan bau busuk)..."
                rows={2}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className={`w-full p-3 text-xs rounded-xl border focus:outline-none focus:ring-2 resize-none ${
                  isWireframe ? 'border-gray-400 focus:ring-gray-800' : 'border-gray-200 focus:ring-emerald-500/20 focus:border-emerald-500 bg-white'
                }`}
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-3.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                isSubmitting
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : isWireframe
                  ? 'bg-gray-900 text-white border-2 border-black'
                    : 'bg-emerald-500 hover:bg-emerald-600 text-white'
              }`}
            >
              {isSubmitting ? "Mengirim Laporan..." : "Kirim Laporan Sampah"}
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}

        {/* HISTORY TAB */}
        {activeTab === 'history' && (
          <div className="space-y-3.5">
            <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Daftar Pengawasan Sampah Liar</h4>

            <div className="space-y-2.5">
              {reports.map((rep) => {
                const isSelected = selectedReport?.id === rep.id;

                return (
                  <div
                    key={rep.id}
                    onClick={() => setSelectedReport(rep)}
                    className={`p-3 rounded-xl border cursor-pointer transition-all ${
                      isSelected
                        ? isWireframe
                          ? 'border-2 border-black bg-gray-50'
                          : 'border-emerald-500 bg-emerald-50/20'
                        : isWireframe
                        ? 'border-gray-300 bg-white'
                        : 'border-gray-100 bg-white hover:border-gray-200'
                    }`}
                  >
                    <div className="flex gap-2.5">
                      <img src={rep.imageUrl} alt="Thumbnail" className="w-12 h-12 rounded-lg object-cover shrink-0" />
                      <div className="space-y-0.5 flex-1 min-w-0">
                        <div className="flex justify-between items-center gap-1.5">
                          <span className={`text-[8px] font-bold px-1.5 py-0.5 rounded-full ${
                            rep.status === 'Selesai'
                              ? 'bg-emerald-100 text-emerald-800'
                              : rep.status === 'Diproses'
                              ? 'bg-blue-100 text-blue-800'
                              : rep.status === 'Diverifikasi'
                              ? 'bg-indigo-100 text-indigo-800'
                              : 'bg-amber-100 text-amber-800'
                          }`}>
                            {rep.status}
                          </span>
                          <span className="text-[8px] font-mono text-gray-400 shrink-0">{rep.date}</span>
                        </div>
                        <h5 className="text-[11px] font-bold text-gray-800 font-display truncate leading-tight">{rep.title}</h5>
                        <p className="text-[9px] text-gray-500 truncate leading-snug">{rep.locationName}</p>
                      </div>
                    </div>

                    {/* Expandable Demo controls if userRole is DLH Officer or in demo */}
                    {isSelected && (
                      <div className="mt-3 pt-3 border-t border-gray-200/60 space-y-3 text-xs text-gray-600">
                        {/* Status timeline visualization */}
                        <div className="relative pl-5 space-y-2.5 before:absolute before:left-[5px] before:top-1.5 before:bottom-1 before:w-[1.5px] before:bg-gray-200 text-[10px]">
                          <div className="relative flex items-center justify-between">
                            <span className="absolute -left-[19px] w-2.5 h-2.5 rounded-full bg-amber-500 border-2 border-white"></span>
                            <span className="font-semibold text-gray-700">Dilaporkan oleh {rep.reportedBy}</span>
                            <span className="text-[8px] text-gray-400">10:12</span>
                          </div>
                          <div className="relative flex items-center justify-between">
                            <span className={`absolute -left-[19px] w-2.5 h-2.5 rounded-full border-2 border-white ${
                              ['Diverifikasi', 'Diproses', 'Selesai'].includes(rep.status) ? 'bg-indigo-500' : 'bg-gray-300'
                            }`}></span>
                            <span className={`font-semibold ${['Diverifikasi', 'Diproses', 'Selesai'].includes(rep.status) ? 'text-gray-700' : 'text-gray-400'}`}>
                              Verifikasi Admin DLH Surakarta
                            </span>
                            <span className="text-[8px] text-gray-400">11:30</span>
                          </div>
                          <div className="relative flex items-center justify-between">
                            <span className={`absolute -left-[19px] w-2.5 h-2.5 rounded-full border-2 border-white ${
                              ['Diproses', 'Selesai'].includes(rep.status) ? 'bg-blue-500' : 'bg-gray-300'
                            }`}></span>
                            <span className={`font-semibold ${['Diproses', 'Selesai'].includes(rep.status) ? 'text-gray-700' : 'text-gray-400'}`}>
                              Petugas Ditugaskan {rep.officerName ? `(${rep.officerName})` : ''}
                            </span>
                            <span className="text-[8px] text-gray-400">12:15</span>
                          </div>
                          <div className="relative flex items-center justify-between">
                            <span className={`absolute -left-[19px] w-2.5 h-2.5 rounded-full border-2 border-white ${
                              rep.status === 'Selesai' ? 'bg-emerald-500' : 'bg-gray-300'
                            }`}></span>
                            <span className={`font-semibold ${rep.status === 'Selesai' ? 'text-emerald-700' : 'text-gray-400'}`}>
                              Pembersihan Selesai & Rilis Poin
                            </span>
                            <span className="text-[8px] text-gray-400">14:00</span>
                          </div>
                        </div>

                        {/* Side-by-side Before & After Photos for Completed ones */}
                        {rep.status === 'Selesai' && rep.afterImageUrl && (
                          <div className="grid grid-cols-2 gap-2 mt-2 pt-2 border-t border-gray-100">
                            <div className="space-y-1">
                              <span className="text-[8px] uppercase tracking-wider text-gray-400 font-bold block text-center">Sebelum (Before)</span>
                              <img src={rep.beforeImageUrl} alt="Sebelum" className="w-full h-20 rounded-lg object-cover border" />
                            </div>
                            <div className="space-y-1">
                              <span className="text-[8px] uppercase tracking-wider text-emerald-600 font-bold block text-center">Sesudah (Cleaned)</span>
                              <img src={rep.afterImageUrl} alt="Sesudah" className="w-full h-20 rounded-lg object-cover border border-emerald-200" />
                            </div>
                          </div>
                        )}

                        {/* Simulation controls to let user experience role transition */}
                        <div className={`p-2.5 rounded-xl mt-3 space-y-1.5 ${
                          isWireframe ? 'border border-gray-300' : 'bg-blue-50/50 border border-blue-100'
                        }`}>
                          <div className="flex items-center gap-1.5 text-[9px] text-blue-800 font-bold">
                            <Truck className="w-3.5 h-3.5 text-blue-600" />
                            <span>KOTAK SIMULASI PENANGANAN (PETUGAS DLH)</span>
                          </div>
                          <p className="text-[9px] text-gray-500">
                            Sebagai Petugas atau Admin Demo, Anda bisa memproses laporan ini lebih lanjut:
                          </p>
                          {rep.status !== 'Selesai' ? (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleAdvanceStatus(rep.id);
                              }}
                              className={`w-full py-1.5 text-[10px] font-bold text-white rounded-lg transition-all ${
                                isWireframe
                                  ? 'bg-gray-900 border border-black'
                                  : 'bg-blue-500 hover:bg-blue-600'
                              }`}
                            >
                              {rep.status === 'Menunggu' ? "Verifikasi Laporan" : rep.status === 'Diverifikasi' ? "Tugaskan Petugas" : "Selesaikan Pembersihan (Unggah Foto Sesudah)"}
                            </button>
                          ) : (
                            <div className="flex items-center gap-1 text-[9px] text-emerald-700 font-bold">
                              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                              <span>Sampah Selesai Dibersihkan! Pelapor mendapatkan +150 Poin.</span>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
