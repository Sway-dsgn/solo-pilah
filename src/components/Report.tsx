import React, { useState } from 'react';
import { WasteReport } from '../types';
import CustomAlert from './CustomAlert';
import { CityData } from '../cities';
import { Camera as CapCamera, CameraResultType, CameraSource } from '@capacitor/camera';

import {
  Camera,
  MapPin,
  Clock,
  CheckCircle2,
  History,
  PlusCircle,
  Truck,
  ArrowRight,
  ShieldCheck,
  X,
  Image as ImageIcon,
  Trash2,
  AlertTriangle,
  Building,
  Flame,
  RefreshCw,
  Upload,
  Weight,
  Package,
  UserCheck,
  Scale,
  ShoppingCart,
  ClipboardList,
  User,
  Search,
  ChevronRight,
} from 'lucide-react';

interface ReportProps {
  isWireframe: boolean;
  reports: WasteReport[];
  setReports: React.Dispatch<React.SetStateAction<WasteReport[]>>;
  userRole: string;
  city: CityData;
}

const REPORT_TYPES = [
  { id: 'menumpuk', label: 'Sampah Menumpuk', icon: Trash2, color: 'text-amber-600', bg: 'bg-amber-50' },
  { id: 'tps_penuh', label: 'TPS Penuh', icon: Building, color: 'text-blue-600', bg: 'bg-blue-50' },
  { id: 'liar', label: 'Sampah Liar', icon: AlertTriangle, color: 'text-red-600', bg: 'bg-red-50' },
  { id: 'bakar', label: 'Pembakaran Sampah', icon: Flame, color: 'text-orange-600', bg: 'bg-orange-50' },
];

const WASTE_TYPES = [
  { id: 'kardus', label: 'Kardus/Kertas', icon: Package, pts: '5.000/kg' },
  { id: 'plastik', label: 'Botol Plastik', icon: Package, pts: '3.000/kg' },
  { id: 'kaca', label: 'Botol Kaca', icon: Package, pts: '2.000/kg' },
  { id: 'logam', label: 'Logam/Kaleng', icon: Package, pts: '8.000/kg' },
  { id: 'elektronik', label: 'Elektronik', icon: Package, pts: '10.000/kg' },
];

export default function Report({ isWireframe, reports, setReports, userRole, city }: ReportProps) {
  const [activeTab, setActiveTab] = useState<'create' | 'history'>('create');
  const [selectedReport, setSelectedReport] = useState<WasteReport | null>(null);
  const [reportType, setReportType] = useState<string>('');
  const [description, setDescription] = useState('');
  const [photo, setPhoto] = useState<{ url: string; label: string } | null>(null);
  const [isCapturing, setIsCapturing] = useState(false);
  const [gpsLocation, setGpsLocation] = useState<{ name: string; x: number; y: number } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [alertState, setAlertState] = useState<{ open: boolean; title: string; message: string; type?: 'info' | 'warning' | 'success' }>({ open: false, title: '', message: '' });

  // BankSampah state
  const [customerName, setCustomerName] = useState('');
  const [wasteType, setWasteType] = useState('');
  const [weight, setWeight] = useState('');
  const [weighSubmitted, setWeighSubmitted] = useState(false);
  const [showCustomerSearch, setShowCustomerSearch] = useState(false);

  const isMasyarakat = userRole === 'Masyarakat';
  const isPetugas = userRole === 'Petugas';
  const isBankSampah = userRole === 'BankSampah';

  const roleColor = isMasyarakat ? 'emerald' : isPetugas ? 'blue' : 'indigo';
  const roleColorText = roleColor === 'emerald' ? 'text-emerald-600' : roleColor === 'blue' ? 'text-blue-600' : 'text-indigo-600';
  const roleBgGradient = roleColor === 'emerald'
    ? 'from-emerald-500 to-emerald-600'
    : roleColor === 'blue'
    ? 'from-blue-500 to-blue-600'
    : 'from-indigo-500 to-indigo-600';

  const handleCapturePhoto = async () => {
    try {
      const result = await CapCamera.getPhoto({
        quality: 80,
        allowEditing: false,
        resultType: CameraResultType.DataUrl,
        source: CameraSource.Camera,
      });
      if (result.dataUrl) {
        setPhoto({ url: result.dataUrl, label: 'Foto Laporan' });
        setIsCapturing(false);
      }
    } catch (err: any) {
      if (err?.message?.includes('cancelled') || err?.message?.includes('User cancelled')) {
        setIsCapturing(false);
      }
    }
  };

  const handlePickGallery = async () => {
    try {
      const result = await CapCamera.getPhoto({
        quality: 80,
        allowEditing: false,
        resultType: CameraResultType.DataUrl,
        source: CameraSource.Photos,
      });
      if (result.dataUrl) {
        setPhoto({ url: result.dataUrl, label: 'Foto Laporan' });
        setIsCapturing(false);
      }
    } catch (err: any) {
      if (err?.message?.includes('cancelled') || err?.message?.includes('User cancelled')) {
        setIsCapturing(false);
      }
    }
  };

  const handleFetchGps = () => {
    const randomLoc = city.gpsLandmarks[Math.floor(Math.random() * city.gpsLandmarks.length)];
    setGpsLocation(randomLoc);
  };

  const handleSubmitReport = (e: React.FormEvent) => {
    e.preventDefault();
    if (!photo || !gpsLocation || !reportType) {
      setAlertState({ open: true, title: "Laporan Belum Lengkap", message: "Harap pilih jenis laporan, foto, dan lokasi GPS!", type: 'warning' });
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      const newReport: WasteReport = {
        id: `rep-${Date.now()}`,
        title: `${REPORT_TYPES.find(r => r.id === reportType)?.label} - ${gpsLocation.name.split(',')[0]}`,
        description: description || "Mohon segera ditindaklanjuti.",
        locationName: gpsLocation.name,
        coordinates: { x: gpsLocation.x, y: gpsLocation.y },
        imageUrl: photo.url,
        status: 'Menunggu',
        date: new Date().toISOString().split('T')[0],
        reportedBy: "Ahmad Fauzi",
        wasteType: 'Campuran',
        beforeImageUrl: photo.url,
      };
      setReports([newReport, ...reports]);
      setIsSubmitting(false);
      setSubmitted(true);
      setPhoto(null);
      setGpsLocation(null);
      setDescription('');
      setReportType('');
    }, 1500);
  };

  const handleAdvanceStatus = (reportId: string) => {
    setReports(prev => prev.map(rep => {
      if (rep.id !== reportId) return rep;
      if (rep.status === 'Menunggu') return { ...rep, status: 'Diverifikasi' };
      if (rep.status === 'Diverifikasi') return { ...rep, status: 'Diproses', officerName: 'Budi Santoso' };
      if (rep.status === 'Diproses') return { ...rep, status: 'Selesai', afterImageUrl: "https://images.unsplash.com/photo-1595275312706-e822003666d7?auto=format&fit=crop&q=80&w=300", pointsAwarded: 150 };
      return rep;
    }));
    setTimeout(() => {
      setSelectedReport(prev => {
        if (!prev) return prev;
        return reports.find(r => r.id === reportId) || prev;
      });
    }, 100);
  };

  const handleWeighIn = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !wasteType || !weight) {
      setAlertState({ open: true, title: "Data Belum Lengkap", message: "Harap isi nama nasabah, jenis sampah, dan berat!", type: 'warning' });
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setWeighSubmitted(true);
      setCustomerName('');
      setWasteType('');
      setWeight('');
    }, 1000);
  };

  // Success screen for Masyarakat report
  if (submitted && isMasyarakat) {
    return (
      <div className={`flex-1 flex flex-col items-center justify-center p-6 text-center space-y-6 anim-fade-in-up ${isWireframe ? 'bg-white' : 'bg-gray-50'}`}>
        <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center animate-bounce">
          <CheckCircle2 className="w-12 h-12" />
        </div>
        <div className="space-y-2">
          <h3 className="text-sm font-black text-gray-800 font-display">Laporan Terkirim!</h3>
          <p className="text-[11px] text-gray-500">Petugas akan segera meninjau laporan Anda.</p>
        </div>
        <button onClick={() => { setSubmitted(false); setActiveTab('history'); }}
          className={`w-full max-w-xs py-3 text-xs font-extrabold text-white rounded-xl cursor-pointer ${
            isWireframe ? 'bg-gray-800' : 'bg-emerald-600 hover:bg-emerald-700'
          }`}>
          Selesai
        </button>
      </div>
    );
  }

  // Success screen for BankSampah weigh-in
  if (weighSubmitted && isBankSampah) {
    return (
      <div className={`flex-1 flex flex-col items-center justify-center p-6 text-center space-y-6 anim-fade-in-up ${isWireframe ? 'bg-white' : 'bg-gray-50'}`}>
        <div className="w-20 h-20 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center animate-bounce">
          <Scale className="w-12 h-12" />
        </div>
        <div className="space-y-2">
          <h3 className="text-sm font-black text-gray-800 font-display">Setoran Tercatat!</h3>
          <p className="text-[11px] text-gray-500">Data setoran nasabah berhasil disimpan.</p>
        </div>
        <button onClick={() => { setWeighSubmitted(false); setActiveTab('history'); }}
          className={`w-full max-w-xs py-3 text-xs font-extrabold text-white rounded-xl cursor-pointer ${
            isWireframe ? 'bg-gray-800' : 'bg-indigo-600 hover:bg-indigo-700'
          }`}>
          Selesai
        </button>
      </div>
    );
  }

  return (
    <div className={`flex-1 flex flex-col phone-scroll overflow-y-auto ${isWireframe ? 'bg-white text-gray-800' : 'bg-gray-50'}`}>
      <div className={`p-4 shrink-0 bg-white border-b shadow-soft ${isWireframe ? 'border-gray-300' : 'border-gray-100'}`}>
        <h2 className="text-sm font-extrabold font-display text-gray-800 flex items-center gap-2">
          {isBankSampah ? (
            <Scale className={`w-4 h-4 ${isWireframe ? 'text-gray-800' : 'text-indigo-500'}`} />
          ) : isPetugas ? (
            <ClipboardList className={`w-4 h-4 ${isWireframe ? 'text-gray-800' : 'text-blue-500'}`} />
          ) : (
            <Camera className={`w-4 h-4 ${isWireframe ? 'text-gray-800' : 'text-emerald-500'}`} />
          )}
          {isMasyarakat ? 'Laporan' : isPetugas ? 'Verifikasi' : 'Timbang Setoran'}
        </h2>
      </div>

      <div className="flex border-b border-gray-200 shrink-0 bg-white">
        <button onClick={() => setActiveTab('create')}
          className={`flex-1 py-3 text-xs font-bold text-center border-b-2 flex items-center justify-center gap-1.5 cursor-pointer ${
            activeTab === 'create'
              ? isMasyarakat
                ? 'border-emerald-500 text-emerald-600 bg-emerald-50/30'
                : isPetugas
                ? 'border-blue-500 text-blue-600 bg-blue-50/30'
                : 'border-indigo-500 text-indigo-600 bg-indigo-50/30'
              : 'border-transparent text-gray-400 hover:text-gray-600'
          }`}>
          {isBankSampah ? <PlusCircle className="w-4 h-4" /> : isPetugas ? <Search className="w-4 h-4" /> : <PlusCircle className="w-4 h-4" />}
          {isMasyarakat ? 'Lapor Baru' : isPetugas ? 'Tugas Masuk' : 'Setoran Baru'}
        </button>
        <button onClick={() => setActiveTab('history')}
          className={`flex-1 py-3 text-xs font-bold text-center border-b-2 flex items-center justify-center gap-1.5 cursor-pointer ${
            activeTab === 'history'
              ? isMasyarakat
                ? 'border-emerald-500 text-emerald-600 bg-emerald-50/30'
                : isPetugas
                ? 'border-blue-500 text-blue-600 bg-blue-50/30'
                : 'border-indigo-500 text-indigo-600 bg-indigo-50/30'
              : 'border-transparent text-gray-400 hover:text-gray-600'
          }`}>
          <History className="w-4 h-4" /> {isMasyarakat ? `Riwayat (${reports.length})` : isPetugas ? 'Riwayat Tugas' : 'Riwayat Setoran'}
        </button>
      </div>

      <div className="p-4 flex-1">
        {/* === MASYARAKAT: CREATE REPORT === */}
        {activeTab === 'create' && isMasyarakat && (
          <form onSubmit={handleSubmitReport} className="space-y-4">
            <div className="space-y-1.5">
              <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider">Pilih Jenis Laporan</label>
              <div className="grid grid-cols-2 gap-2">
                {REPORT_TYPES.map((rt) => {
                  const Icon = rt.icon;
                  const isSelected = reportType === rt.id;
                  return (
                    <button key={rt.id} type="button" onClick={() => setReportType(rt.id)}
                      className={`p-3 rounded-xl border flex flex-col items-center gap-1 cursor-pointer transition-all shadow-card card-hover ${
                        isSelected
                          ? isWireframe ? 'border-2 border-black bg-gray-100 shadow-card' : `${rt.bg} border-2 ${rt.color} shadow-card`
                          : isWireframe ? 'border-gray-300 bg-white shadow-soft' : 'border-gray-100 bg-white shadow-soft hover:border-gray-200 hover:shadow-card'
                      }`}>
                      <Icon className={`w-5 h-5 ${isSelected ? rt.color : 'text-gray-400'}`} />
                      <span className={`text-[9px] font-bold ${isSelected ? 'text-gray-800' : 'text-gray-500'}`}>{rt.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider">Upload Foto</label>
              {isCapturing ? (
                <div className="flex gap-2">
                  <button type="button" onClick={handleCapturePhoto}
                    className="flex-1 p-4 rounded-xl border border-gray-200 bg-white flex flex-col items-center gap-2 cursor-pointer shadow-soft hover:shadow-card transition-all">
                    <div className="p-3 rounded-xl bg-emerald-500 text-white">
                      <Camera className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-bold text-gray-700">Kamera</span>
                  </button>
                  <button type="button" onClick={handlePickGallery}
                    className="flex-1 p-4 rounded-xl border border-gray-200 bg-white flex flex-col items-center gap-2 cursor-pointer shadow-soft hover:shadow-card transition-all">
                    <div className="p-3 rounded-xl bg-blue-500 text-white">
                      <ImageIcon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-bold text-gray-700">Galeri</span>
                  </button>
                </div>
              ) : photo ? (
                <div className="relative rounded-2xl overflow-hidden border border-gray-200 h-40 shadow-soft">
                  <img src={photo.url} alt={photo.label} className="w-full h-full object-cover" />
                  <button type="button" onClick={() => { setPhoto(null); setIsCapturing(true); }}
                    className="absolute top-2 right-2 bg-red-500/80 hover:bg-red-500 text-white rounded-full p-1.5 cursor-pointer">
                    <span className="flex items-center gap-1 text-[9px]"><RefreshCw className="w-3 h-3" /> Retake</span>
                  </button>
                </div>
              ) : (
                <button type="button" onClick={() => setIsCapturing(true)}
                  className={`w-full h-32 rounded-2xl border-2 border-dashed flex flex-col items-center justify-center gap-1.5 cursor-pointer card-hover ${
                    isWireframe ? 'border-gray-400 bg-white' : 'border-emerald-200 bg-emerald-50/20 hover:bg-emerald-50/50 hover:border-emerald-300 shadow-soft'
                  }`}>
                  <Camera className={`w-8 h-8 ${isWireframe ? 'text-gray-400' : 'text-emerald-500'}`} />
                  <span className="text-xs font-bold text-gray-700">Tap untuk Upload Foto</span>
                </button>
              )}
              {photo && !isCapturing && (
                <div className="flex items-center gap-1 text-[9px] text-emerald-600 font-bold">
                  <CheckCircle2 className="w-3 h-3" /> Foto berhasil ditambahkan
                </div>
              )}
            </div>

            <div className="space-y-1.5">
              <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider">Lokasi</label>
              <div className="flex gap-2">
                <div className={`flex-1 p-3 rounded-xl border flex items-center gap-2 min-h-[42px] shadow-soft ${
                  isWireframe ? 'border-gray-400 bg-white' : 'border-gray-200 bg-gray-50/30'
                }`}>
                  <MapPin className="w-4 h-4 text-red-500 shrink-0" />
                  <span className="text-[10px] text-gray-600 font-medium line-clamp-1">
                    {gpsLocation ? gpsLocation.name : "Belum diisi"}
                  </span>
                </div>
                <button type="button" onClick={handleFetchGps}
                  className={`px-3 py-2 text-xs font-bold rounded-xl border cursor-pointer ${
                    isWireframe ? 'border-gray-400 hover:bg-gray-100 text-gray-700' : 'bg-white hover:bg-gray-50 border-gray-200 text-emerald-600'
                  }`}>
                  GPS
                </button>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider">Deskripsi</label>
              <textarea placeholder="Tambah deskripsi lokasi..."
                rows={2} value={description}
                onChange={(e) => setDescription(e.target.value)}
                className={`w-full p-3 text-xs rounded-xl border focus:outline-none focus:ring-2 resize-none ${
                  isWireframe ? 'border-gray-400 focus:ring-gray-800' : 'border-gray-200 focus:ring-emerald-500/20 focus:border-emerald-500 bg-white'
                }`} />
            </div>

            <button type="submit" disabled={isSubmitting}
              className={`w-full py-3.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer ${
                isSubmitting ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : isWireframe ? 'bg-gray-900 text-white border-2 border-black' : 'bg-emerald-500 hover:bg-emerald-600 text-white'
              }`}>
              {isSubmitting ? "Mengirim..." : "Kirim Laporan"} <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}

        {/* === PETUGAS: VERIFICATION TASKS === */}
        {activeTab === 'create' && isPetugas && (
          <div className="space-y-3">
            <div className={`p-3 rounded-xl border ${isWireframe ? 'border-gray-300 bg-white' : 'bg-blue-50/50 border-blue-100'}`}>
              <div className="flex items-center gap-2 text-[10px] text-blue-800 font-bold mb-1">
                <ClipboardList className="w-4 h-4" />
                <span>Laporan Menunggu Verifikasi</span>
              </div>
              <p className="text-[9px] text-blue-600">Verifikasi laporan masuk dari masyarakat untuk ditindaklanjuti.</p>
            </div>

            {reports.filter(r => r.status === 'Menunggu' || r.status === 'Diverifikasi').length === 0 ? (
              <div className="text-center py-10 text-gray-400">
                <CheckCircle2 className="w-10 h-10 mx-auto mb-2 text-emerald-400" />
                <p className="text-xs font-bold">Semua laporan sudah diverifikasi</p>
              </div>
            ) : (
              reports.filter(r => r.status === 'Menunggu' || r.status === 'Diverifikasi').map((rep) => (
                <div key={rep.id}
                  className={`p-3 rounded-xl border transition-all ${
                    selectedReport?.id === rep.id
                      ? isWireframe ? 'border-2 border-black bg-gray-50' : 'border-blue-500 bg-blue-50/20'
                      : isWireframe ? 'border-gray-300 bg-white' : 'border-gray-100 bg-white hover:border-gray-200'
                  }`}>
                  <div onClick={() => setSelectedReport(selectedReport?.id === rep.id ? null : rep)} className="cursor-pointer">
                    <div className="flex gap-2.5">
                      <img src={rep.imageUrl} alt="" className="w-12 h-12 rounded-lg object-cover shrink-0" />
                      <div className="space-y-0.5 flex-1 min-w-0">
                        <div className="flex justify-between items-center gap-1.5">
                          <span className={`text-[8px] font-bold px-1.5 py-0.5 rounded-full ${
                            rep.status === 'Menunggu' ? 'bg-amber-100 text-amber-800' : 'bg-indigo-100 text-indigo-800'
                          }`}>{rep.status}</span>
                          <span className="text-[8px] font-mono text-gray-400">{rep.date}</span>
                        </div>
                        <h5 className="text-[11px] font-bold text-gray-800 font-display truncate">{rep.title}</h5>
                        <p className="text-[9px] text-gray-500 truncate flex items-center gap-1">
                          <MapPin className="w-2.5 h-2.5 text-red-400" /> {rep.locationName}
                        </p>
                      </div>
                    </div>
                  </div>

                  {selectedReport?.id === rep.id && (
                    <div className="mt-3 pt-3 border-t border-gray-200/60 space-y-3">
                      <p className="text-[9px] text-gray-600 leading-relaxed">{rep.description}</p>
                      <div className="flex gap-2">
                        <button onClick={(e) => { e.stopPropagation(); handleAdvanceStatus(rep.id); }}
                          className={`flex-1 py-2 text-[9px] font-bold text-white rounded-lg cursor-pointer ${
                            isWireframe ? 'bg-gray-900' : rep.status === 'Menunggu' ? 'bg-blue-500 hover:bg-blue-600' : 'bg-indigo-500 hover:bg-indigo-600'
                          }`}>
                          {rep.status === 'Menunggu' ? '✓ Verifikasi Laporan' : '→ Tugaskan Petugas'}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        )}

        {/* === BANK SAMPAH: WEIGH-IN FORM === */}
        {activeTab === 'create' && isBankSampah && (
          <form onSubmit={handleWeighIn} className="space-y-4">
            <div className={`p-3 rounded-xl border ${isWireframe ? 'border-gray-300 bg-white' : 'bg-indigo-50/50 border-indigo-100'}`}>
              <div className="flex items-center gap-2 text-[10px] text-indigo-800 font-bold mb-1">
                <Scale className="w-4 h-4" />
                <span>Form Timbang Setoran</span>
              </div>
              <p className="text-[9px] text-indigo-600">Catat data setoran sampah dari nasabah.</p>
            </div>

            <div className="space-y-1.5">
              <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider">Nama Nasabah</label>
              <div className="relative">
                <User className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                <input type="text" required
                  placeholder="Cari atau ketik nama nasabah"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className={`w-full pl-10 pr-3 py-2.5 text-xs rounded-xl border focus:outline-none focus:ring-2 ${
                    isWireframe ? 'border-gray-400 focus:ring-gray-800 bg-white' : 'border-gray-200 focus:ring-indigo-500/20 focus:border-indigo-500 bg-white'
                  }`} />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider">Jenis Sampah</label>
              <div className="grid grid-cols-2 gap-2">
                {WASTE_TYPES.map((wt) => {
                  const Icon = wt.icon;
                  const isSelected = wasteType === wt.id;
                  return (
                    <button key={wt.id} type="button" onClick={() => setWasteType(wt.id)}
                      className={`p-2.5 rounded-xl border flex items-center gap-2 cursor-pointer transition-all ${
                        isSelected
                          ? isWireframe ? 'border-2 border-black bg-gray-100' : 'border-indigo-500 bg-indigo-50'
                          : isWireframe ? 'border-gray-300 bg-white' : 'border-gray-100 bg-white hover:border-gray-200'
                      }`}>
                      <Icon className={`w-4 h-4 ${isSelected ? 'text-indigo-600' : 'text-gray-400'}`} />
                      <div className="text-left min-w-0">
                        <span className={`text-[9px] font-bold block ${isSelected ? 'text-gray-800' : 'text-gray-500'}`}>{wt.label}</span>
                        <span className="text-[7px] text-gray-400">{wt.pts}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider">Berat (kg)</label>
              <div className="relative">
                <Weight className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                <input type="number" required step="0.1" min="0"
                  placeholder="0.0"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  className={`w-full pl-10 pr-3 py-2.5 text-xs rounded-xl border focus:outline-none focus:ring-2 ${
                    isWireframe ? 'border-gray-400 focus:ring-gray-800 bg-white' : 'border-gray-200 focus:ring-indigo-500/20 focus:border-indigo-500 bg-white'
                  }`} />
              </div>
            </div>

            {weight && wasteType && (
              <div className={`p-3 rounded-xl border ${isWireframe ? 'border-gray-300 bg-white' : 'bg-emerald-50/50 border-emerald-100'}`}>
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-bold text-gray-600">Estimasi Poin</span>
                  <span className="text-sm font-black text-emerald-600">
                    {new Intl.NumberFormat('id-ID').format(Math.round(Number(weight) * (wasteType === 'kardus' ? 5000 : wasteType === 'plastik' ? 3000 : wasteType === 'kaca' ? 2000 : wasteType === 'logam' ? 8000 : 10000)))}
                    <span className="text-[9px] text-emerald-500"> pts</span>
                  </span>
                </div>
              </div>
            )}

            <button type="submit" disabled={isSubmitting}
              className={`w-full py-3.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer ${
                isSubmitting ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : isWireframe ? 'bg-gray-900 text-white border-2 border-black' : 'bg-indigo-500 hover:bg-indigo-600 text-white'
              }`}>
              {isSubmitting ? "Menyimpan..." : "Simpan Setoran"} <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}

        {/* === HISTORY (shared for all roles, different display) === */}
        {activeTab === 'history' && (
          <div className="space-y-3">
            <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
              {isMasyarakat ? 'Daftar Laporan' : isPetugas ? 'Riwayat Tugas' : 'Riwayat Setoran'}
            </h4>
            <div className="space-y-2.5">
              {isBankSampah ? (
                /* BankSampah: show weigh-in history */
                [
                  { name: 'Budi Santoso', type: 'Kardus & Plastik', weight: '3.2 kg', points: '+160', date: 'Hari ini' },
                  { name: 'Siti Rohmah', type: 'Botol Kaca', weight: '1.8 kg', points: '+90', date: 'Kemarin' },
                  { name: 'Agus Wijaya', type: 'Kertas & Buku', weight: '2.5 kg', points: '+125', date: '2 hari lalu' },
                  { name: 'Dewi Lestari', type: 'Logam Campur', weight: '0.8 kg', points: '+40', date: '3 hari lalu' },
                ].map((item, i) => (
                  <div key={i} className={`p-3 rounded-xl border ${isWireframe ? 'border-gray-300 bg-white' : 'bg-white border-gray-100'}`}>
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-lg bg-indigo-100 flex items-center justify-center shrink-0">
                        <UserCheck className="w-4 h-4 text-indigo-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-center">
                          <span className="text-[10px] font-bold text-gray-800">{item.name}</span>
                          <span className="text-[8px] font-bold text-emerald-600">{item.points}</span>
                        </div>
                        <p className="text-[8.5px] text-gray-500">{item.type} · {item.weight}</p>
                        <span className="text-[7px] text-gray-400">{item.date}</span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                reports.map((rep) => {
                  const isSelected = selectedReport?.id === rep.id;
                  return (
                    <div key={rep.id} onClick={() => setSelectedReport(rep)}
                      className={`p-3 rounded-xl border cursor-pointer transition-all ${
                        isSelected ? isWireframe ? 'border-2 border-black bg-gray-50' : isMasyarakat ? 'border-emerald-500 bg-emerald-50/20' : isPetugas ? 'border-blue-500 bg-blue-50/20' : 'border-indigo-500 bg-indigo-50/20'
                          : isWireframe ? 'border-gray-300 bg-white' : 'border-gray-100 bg-white hover:border-gray-200'
                      }`}>
                      <div className="flex gap-2.5">
                        <img src={rep.imageUrl} alt="" className="w-12 h-12 rounded-lg object-cover shrink-0" />
                        <div className="space-y-0.5 flex-1 min-w-0">
                          <div className="flex justify-between items-center gap-1.5">
                            <span className={`text-[8px] font-bold px-1.5 py-0.5 rounded-full ${
                              rep.status === 'Selesai' ? 'bg-emerald-100 text-emerald-800' : rep.status === 'Diproses' ? 'bg-blue-100 text-blue-800' : rep.status === 'Diverifikasi' ? 'bg-indigo-100 text-indigo-800' : 'bg-amber-100 text-amber-800'
                            }`}>{rep.status}</span>
                            <span className="text-[8px] font-mono text-gray-400">{rep.date}</span>
                          </div>
                          <h5 className="text-[11px] font-bold text-gray-800 font-display truncate">{rep.title}</h5>
                          <p className="text-[9px] text-gray-500 truncate">{rep.locationName}</p>
                        </div>
                      </div>

                      {isSelected && !isMasyarakat && (
                        <div className="mt-3 pt-3 border-t border-gray-200/60 space-y-3">
                          <div className="relative pl-5 space-y-2 before:absolute before:left-[5px] before:top-1.5 before:bottom-1 before:w-[1px] before:bg-gray-200 text-[10px]">
                            {['Dilaporkan', 'Diverifikasi', 'Diproses', 'Selesai'].map((step, i) => {
                              const statusMap = ['Menunggu', 'Diverifikasi', 'Diproses', 'Selesai'];
                              const isActive = statusMap.indexOf(rep.status) >= i;
                              return (
                                <div key={step} className="relative flex items-center gap-2">
                                  <span className={`absolute -left-[19px] w-2.5 h-2.5 rounded-full border-2 border-white ${isActive ? 'bg-emerald-500' : 'bg-gray-300'}`} />
                                  <span className={`font-semibold ${isActive ? 'text-gray-700' : 'text-gray-400'}`}>{step}</span>
                                </div>
                              );
                            })}
                          </div>

                          <div className={`p-2.5 rounded-xl ${isWireframe ? 'border border-gray-300' : 'bg-blue-50/50 border border-blue-100'}`}>
                            <div className="flex items-center gap-1.5 text-[9px] text-blue-800 font-bold mb-1">
                              <Truck className="w-3.5 h-3.5" />
                              <span>SIMULASI {city.wasteDeptAbbr.toUpperCase().split(' ')[0]}</span>
                            </div>
                            {rep.status !== 'Selesai' ? (
                              <button onClick={(e) => { e.stopPropagation(); handleAdvanceStatus(rep.id); }}
                                className={`w-full py-1.5 text-[10px] font-bold text-white rounded-lg cursor-pointer ${isWireframe ? 'bg-gray-900' : 'bg-blue-500 hover:bg-blue-600'}`}>
                                {rep.status === 'Menunggu' ? "Verifikasi Laporan" : rep.status === 'Diverifikasi' ? "Tugaskan Petugas" : "Selesaikan"}
                              </button>
                            ) : (
                              <div className="flex items-center gap-1 text-[9px] text-emerald-700 font-bold">
                                <ShieldCheck className="w-3.5 h-3.5" />
                                <span>Selesai! +150 Poin.</span>
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })
              )}
            </div>
          </div>
        )}
      </div>

      <CustomAlert
        open={alertState.open}
        onClose={() => setAlertState(a => ({ ...a, open: false }))}
        title={alertState.title}
        message={alertState.message}
        type={alertState.type}
      />
    </div>
  );
}
