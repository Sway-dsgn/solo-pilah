import React, { useState } from 'react';
import CustomAlert from './CustomAlert';
import {
  Bell,
  Award,
  TrendingUp,
  MapPin,
  BookOpen,
  ArrowRight,
  Flame,
  Leaf,
  ChevronRight,
  TrendingDown,
  QrCode,
  TreePine,
  Sparkles,
  CircleDollarSign,
  BarChart3,
  Zap,
  Truck,
  ClipboardList,
  Users,
  Weight,
  Package,
  Clock,
  CheckCircle2,
  Route,
  AlertCircle,
  Warehouse,
  ShoppingCart,
  Droplets
} from 'lucide-react';
import { UserProfile, ScreenType } from '../types';
import { CityData } from '../cities';

interface DashboardProps {
  profile: UserProfile;
  setProfile: React.Dispatch<React.SetStateAction<UserProfile>>;
  isWireframe: boolean;
  onNavigate: (screen: ScreenType) => void;
  onOpenNotifications: () => void;
  city: CityData;
}

export default function Dashboard({ profile, setProfile, isWireframe, onNavigate, onOpenNotifications, city }: DashboardProps) {
  const [checkedIn, setCheckedIn] = useState(false);
  const [alertState, setAlertState] = useState<{ open: boolean; title: string; message: string; type?: 'info' | 'warning' | 'success' }>({ open: false, title: '', message: '' });

  const roleColor = profile.role === 'Masyarakat' ? 'emerald' : profile.role === 'Petugas' ? 'blue' : 'indigo';
  const roleColorHex = roleColor === 'emerald' ? '#059669' : roleColor === 'blue' ? '#3b82f6' : '#6366f1';
  const roleBgGradient = roleColor === 'emerald'
    ? 'from-emerald-500 to-emerald-600'
    : roleColor === 'blue'
    ? 'from-blue-500 to-blue-600'
    : 'from-indigo-500 to-indigo-600';
  const roleLightBg = roleColor === 'emerald' ? 'bg-emerald-50' : roleColor === 'blue' ? 'bg-blue-50' : 'bg-indigo-50';
  const roleLightBorder = roleColor === 'emerald' ? 'border-emerald-100' : roleColor === 'blue' ? 'border-blue-100' : 'border-indigo-100';
  const roleText = roleColor === 'emerald' ? 'text-emerald-600' : roleColor === 'blue' ? 'text-blue-600' : 'text-indigo-600';

  const handleCheckin = () => {
    const today = new Date().toISOString().split('T')[0];
    if (profile.lastActiveDate === today) {
      setAlertState({ open: true, title: "Sudah Check-in", message: "Anda sudah check-in hari ini! Streak akan tetap terjaga.", type: 'info' });
      return;
    }
    const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
    const newStreak = profile.lastActiveDate === yesterday ? profile.streak + 1 : 1;
    setProfile(prev => ({
      ...prev,
      streak: newStreak,
      lastActiveDate: today,
      points: prev.points + 25,
    }));
    setCheckedIn(true);
  };

  const nearestBanks = [...city.bankSampah]
    .filter((b: any) => b.type !== 'TPA')
    .slice(0, 2);

  const isMasyarakat = profile.role === 'Masyarakat';
  const isPetugas = profile.role === 'Petugas';
  const isBankSampah = profile.role === 'BankSampah';

  return (
    <div className={`flex-1 flex flex-col phone-scroll overflow-y-auto ${isWireframe ? 'bg-white text-gray-800' : 'bg-gray-50/80'}`}>
      
      {/* 1. Mini App Bar / Header */}
      <div className={`p-4 flex items-center justify-between border-b shadow-soft ${
        isWireframe ? 'bg-white border-gray-300' : 'glass bg-white/90 border-gray-100/50'
      }`}>
        <div className="flex items-center gap-2.5">
          <div className="relative">
            <img
              src={profile.avatar}
              alt="Avatar"
              className={`w-9 h-9 rounded-full object-cover border-2 ${isWireframe ? 'border-gray-500' : isMasyarakat ? 'border-emerald-500' : isPetugas ? 'border-blue-500' : 'border-indigo-500'}`}
            />
            <span className={`absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full border-2 border-white flex items-center justify-center text-[7px] text-white font-bold ${
              isWireframe ? 'bg-gray-800' : isMasyarakat ? 'bg-emerald-500' : isPetugas ? 'bg-blue-500' : 'bg-indigo-500'
            }`}>
              {profile.role[0]}
            </span>
          </div>
          <div>
            <h3 className="text-xs font-bold text-gray-800 leading-none font-display">{profile.name}</h3>
            <span className="text-[9px] text-gray-400 mt-0.5 inline-block">{profile.ecoRank}</span>
          </div>
        </div>

        <button
          onClick={onOpenNotifications}
          className={`p-2 rounded-xl relative transition-all cursor-pointer btn-press ${
            isWireframe ? 'border border-gray-300' : 'hover:bg-gray-100 bg-gray-50 border border-gray-100/50'
          }`}
        >
          <Bell className="w-4 h-4 text-gray-600" />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-red-500 rounded-full map-pulse"></span>
        </button>
      </div>

      <div className="p-4 space-y-4 flex-1">
        
        {/* 2. Edukasi Link Card - Only for Masyarakat */}
        {isMasyarakat && (
          <div onClick={() => onNavigate('edukasi')}
            className={`p-4 rounded-2xl border flex items-center gap-3 cursor-pointer transition-all btn-press group gradient-card ${
              isWireframe
                ? 'border-2 border-gray-800 bg-white text-gray-800'
                : 'bg-gradient-to-br from-emerald-500 to-emerald-600 text-white border-transparent shadow-card'
            }`}>
            <div className={`p-2.5 rounded-xl shrink-0 transition-all group-hover:scale-110 group-hover:-rotate-6 ${
              isWireframe ? 'bg-gray-100 border border-gray-300' : 'bg-white/20'
            }`}>
              <BookOpen className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <h5 className="text-[11px] font-extrabold font-display">Edukasi Lingkungan</h5>
              <p className={`text-[9px] leading-snug mt-0.5 line-clamp-1 ${
                isWireframe ? 'text-gray-500' : 'text-white/80'
              }`}>
                Pelajari cara pilah sampah, daur ulang, dan dampak lingkungan
              </p>
            </div>
            <div className={`p-1 rounded-lg transition-all group-hover:translate-x-1 ${isWireframe ? '' : 'bg-white/10'}`}>
              <ChevronRight className="w-4 h-4" />
            </div>
          </div>
        )}

        {/* 2b. Petugas: Ringkasan Tugas Hari Ini */}
        {isPetugas && (
          <div className={`p-4 rounded-2xl border shadow-card ${
            isWireframe ? 'border-gray-300 bg-white' : 'bg-white border-gray-100/60'
          }`}>
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-[9.5px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-1">
                <ClipboardList className="w-3.5 h-3.5 text-blue-500" /> Tugas Hari Ini
              </h4>
              <span className={`text-[9px] font-black px-2 py-0.5 rounded-full ${
                isWireframe ? 'bg-gray-200 text-gray-700' : 'bg-blue-100 text-blue-700'
              }`}>3 Tersisa</span>
            </div>
            <div className="space-y-2">
              {[
                { route: `${city.districts[0]} - ${city.districts[1]}`, time: '08:00 - 10:00', status: 'Selesai' },
                { route: `${city.districts[2]} - ${city.districts[0]}`, time: '10:30 - 12:00', status: 'Selesai' },
                { route: `${city.districts[1]} - ${city.districts[2]}`, time: '13:00 - 15:00', status: 'Aktif' },
              ].map((task, i) => (
                <div key={i} className={`flex items-center gap-2.5 p-2 rounded-xl border ${
                  isWireframe ? 'border-gray-200 bg-white' : 'border-gray-100 bg-gray-50/30'
                }`}>
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                    task.status === 'Selesai' ? 'bg-emerald-100 text-emerald-600' : task.status === 'Aktif' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-400'
                  }`}>
                    {task.status === 'Selesai' ? <CheckCircle2 className="w-4 h-4" /> : <Truck className="w-4 h-4" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className={`text-[9px] font-bold text-gray-800`}>{task.route}</span>
                      <span className={`text-[7px] font-bold px-1.5 py-0.5 rounded-full ${
                        task.status === 'Selesai' ? 'bg-emerald-100 text-emerald-700' : task.status === 'Aktif' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-500'
                      }`}>{task.status}</span>
                    </div>
                    <p className="text-[8px] text-gray-400 mt-0.5 flex items-center gap-1">
                      <Clock className="w-2.5 h-2.5" /> {task.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 2c. BankSampah: Ringkasan Hari Ini */}
        {isBankSampah && (
          <div className={`p-4 rounded-2xl border shadow-card ${
            isWireframe ? 'border-gray-300 bg-white' : 'bg-white border-gray-100/60'
          }`}>
            <h4 className="text-[9.5px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-1 mb-3">
              <Warehouse className="w-3.5 h-3.5 text-indigo-500" /> Aktivitas Hari Ini
            </h4>
            <div className="grid grid-cols-3 gap-2">
              {[
                { label: 'Setoran Masuk', value: '12', unit: 'kg', icon: Package, color: 'text-indigo-600', bg: 'bg-indigo-100' },
                { label: 'Nasabah', value: '8', unit: 'org', icon: Users, color: 'text-blue-600', bg: 'bg-blue-100' },
                { label: 'Poin Diterbitkan', value: '340', unit: 'pts', icon: Award, color: 'text-emerald-600', bg: 'bg-emerald-100' },
              ].map((item, i) => {
                const Icon = item.icon;
                return (
                  <div key={i} className="text-center p-2.5 rounded-xl border border-gray-100 bg-gray-50/30">
                    <div className={`w-7 h-7 mx-auto rounded-lg ${item.bg} flex items-center justify-center mb-1`}>
                      <Icon className={`w-3.5 h-3.5 ${item.color}`} />
                    </div>
                    <span className="text-xs font-black text-gray-800 block">{item.value}</span>
                    <span className="text-[7px] text-gray-400 font-semibold">{item.unit}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* 3. Poin Section - Always show for Masyarakat, different for Petugas/BankSampah */}
        {isMasyarakat && (
          <div className="space-y-1.5">
            <h4 className="text-[9.5px] font-black text-gray-400 uppercase tracking-widest px-1 flex items-center gap-1">
              <CircleDollarSign className="w-3.5 h-3.5" /> Saldo & Poin
            </h4>
            <div className={`p-5 rounded-2xl relative overflow-hidden shadow-card ${
              isWireframe
                ? 'border-2 border-gray-800 bg-white text-gray-800'
                : 'bg-gradient-to-br from-emerald-500 to-emerald-600 text-white'
            }`}>
              {!isWireframe && (
                <>
                  <div className="absolute -top-8 -right-8 w-40 h-40 rounded-full bg-white/5 blur-2xl" />
                  <div className="absolute -bottom-8 -left-8 w-32 h-32 rounded-full bg-emerald-400/10 blur-2xl" />
                </>
              )}
              <div className="flex justify-between items-center relative">
                <div>
                  <p className={`text-[9px] font-semibold uppercase tracking-wider ${isWireframe ? 'text-gray-500' : 'text-emerald-100'}`}>
                    CempoPoints Milik Anda
                  </p>
                  <div className="flex items-baseline gap-1 mt-1">
                    <h2 className={`text-3xl font-black font-display tracking-tight ${isWireframe ? 'text-gray-800' : 'text-white'}`}>
                      {profile.points.toLocaleString()}
                    </h2>
                    <span className={`text-[10px] font-bold uppercase ${isWireframe ? 'text-gray-400' : 'text-emerald-200'}`}>pts</span>
                  </div>
                  <p className={`text-[9px] mt-1.5 flex items-center gap-1 font-medium ${isWireframe ? 'text-emerald-600' : 'text-emerald-100'}`}>
                    <TrendingUp className="w-3.5 h-3.5" />
                    +120 poin minggu ini
                  </p>
                </div>
                <button
                  onClick={() => onNavigate('rewards')}
                  className={`px-3.5 py-2 rounded-xl text-[10px] font-black flex items-center gap-1 transition-all cursor-pointer btn-press ${
                    isWireframe
                      ? 'border border-gray-800 bg-gray-100'
                        : 'bg-white text-emerald-600 hover:bg-emerald-50 shadow-sm'
                    }`}
                >
                  Tukar Poin
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 3b. Petugas: Statistik Kinerja */}
        {isPetugas && (
          <div className="space-y-1.5">
            <h4 className="text-[9.5px] font-black text-gray-400 uppercase tracking-widest px-1 flex items-center gap-1">
              <BarChart3 className="w-3.5 h-3.5 text-blue-500" /> Kinerja Bulan Ini
            </h4>
            <div className={`p-5 rounded-2xl shadow-card ${
              isWireframe ? 'border-2 border-gray-800 bg-white' : 'bg-gradient-to-br from-blue-500 to-blue-600 text-white'
            }`}>
              <div className="flex justify-between items-center">
                <div>
                  <p className={`text-[9px] font-semibold uppercase tracking-wider ${isWireframe ? 'text-gray-500' : 'text-blue-100'}`}>
                    Sampah Terangkut
                  </p>
                  <div className="flex items-baseline gap-1 mt-1">
                    <h2 className={`text-3xl font-black font-display tracking-tight ${isWireframe ? 'text-gray-800' : 'text-white'}`}>
                      1.450
                    </h2>
                    <span className={`text-[10px] font-bold uppercase ${isWireframe ? 'text-gray-400' : 'text-blue-200'}`}>kg</span>
                  </div>
                  <p className={`text-[9px] mt-1.5 flex items-center gap-1 font-medium ${isWireframe ? 'text-blue-600' : 'text-blue-100'}`}>
                    <TrendingUp className="w-3.5 h-3.5" />
                    +12% dari bulan lalu
                  </p>
                </div>
                <div className="text-center">
                  <div className={`w-16 h-16 rounded-full border-4 flex items-center justify-center ${
                    isWireframe ? 'border-gray-800' : 'border-white/30'
                  }`}>
                    <span className={`text-xl font-black font-display ${isWireframe ? 'text-gray-800' : 'text-white'}`}>87</span>
                  </div>
                  <p className={`text-[7px] font-bold mt-1 uppercase tracking-wider ${isWireframe ? 'text-gray-500' : 'text-blue-200'}`}>Rute</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 3c. BankSampah: Volume Gudang */}
        {isBankSampah && (
          <div className="space-y-1.5">
            <h4 className="text-[9.5px] font-black text-gray-400 uppercase tracking-widest px-1 flex items-center gap-1">
              <Warehouse className="w-3.5 h-3.5 text-indigo-500" /> Volume Gudang
            </h4>
            <div className={`p-5 rounded-2xl shadow-card ${
              isWireframe ? 'border-2 border-gray-800 bg-white' : 'bg-gradient-to-br from-indigo-500 to-indigo-600 text-white'
            }`}>
              <div className="flex justify-between items-center">
                <div>
                  <p className={`text-[9px] font-semibold uppercase tracking-wider ${isWireframe ? 'text-gray-500' : 'text-indigo-100'}`}>
                    Total Tersimpan
                  </p>
                  <div className="flex items-baseline gap-1 mt-1">
                    <h2 className={`text-3xl font-black font-display tracking-tight ${isWireframe ? 'text-gray-800' : 'text-white'}`}>
                      3.240
                    </h2>
                    <span className={`text-[10px] font-bold uppercase ${isWireframe ? 'text-gray-400' : 'text-indigo-200'}`}>kg</span>
                  </div>
                  <p className={`text-[9px] mt-1.5 flex items-center gap-1 font-medium ${isWireframe ? 'text-indigo-600' : 'text-indigo-100'}`}>
                    <TrendingUp className="w-3.5 h-3.5" />
                    Kapasitas 65% terpakai
                  </p>
                </div>
                <div className="text-center">
                  <div className={`w-16 h-16 rounded-full border-4 flex items-center justify-center ${
                    isWireframe ? 'border-gray-800' : 'border-white/30'
                  }`}>
                    <span className={`text-xl font-black font-display ${isWireframe ? 'text-gray-800' : 'text-white'}`}>45</span>
                  </div>
                  <p className={`text-[7px] font-bold mt-1 uppercase tracking-wider ${isWireframe ? 'text-gray-500' : 'text-indigo-200'}`}>Nasabah</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 4. Streak Harian - Only for Masyarakat */}
        {isMasyarakat && (
          <div className="space-y-1.5">
            <h4 className="text-[9.5px] font-black text-gray-400 uppercase tracking-widest px-1 flex items-center gap-1">
              <Flame className="w-3.5 h-3.5 text-orange-500" /> Streak Aktif
            </h4>
            <div className={`p-4 rounded-2xl border shadow-card ${
              isWireframe ? 'border-gray-300 bg-white' : 'bg-white border-gray-100/60'
            }`}>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2.5">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    isWireframe ? 'bg-gray-100 border border-gray-300' : 'bg-gradient-to-br from-orange-400 to-orange-600 shadow-sm'
                  }`}>
                    <Flame className={`w-5 h-5 ${isWireframe ? 'text-gray-800' : 'text-white'}`} />
                  </div>
                  <div>
                    <span className={`text-xl font-black font-display tracking-tight ${isWireframe ? 'text-gray-800' : 'text-orange-600'}`}>
                      {profile.streak}
                    </span>
                    <span className="text-[9px] text-gray-500 font-bold ml-0.5">hari</span>
                    <p className="text-[8px] text-gray-400 leading-none mt-0.5">berturut-turut aktif</p>
                  </div>
                </div>
                <button onClick={handleCheckin}
                  className={`px-3.5 py-2 rounded-xl text-[9px] font-bold cursor-pointer transition-all btn-press ${
                    checkedIn || profile.lastActiveDate === new Date().toISOString().split('T')[0]
                      ? isWireframe ? 'bg-gray-300 text-gray-500 cursor-default' : 'bg-gray-100 text-gray-400 cursor-default border border-gray-200'
                      : isWireframe ? 'bg-gray-800 text-white' : 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-sm hover:shadow-md'
                  }`}>
                  {checkedIn || profile.lastActiveDate === new Date().toISOString().split('T')[0] ? '✔ Check-in' : '+25 Check-in'}
                </button>
              </div>

              <div className="flex gap-1.5 justify-center mb-3">
                {['Sen','Sel','Rab','Kam','Jum','Sab','Min'].map((day, i) => {
                  const isActive = i < profile.streak % 7 || (profile.streak > 0 && i === 0 && profile.streak >= 7);
                  const isToday = i === new Date().getDay() - 1 || (new Date().getDay() === 0 && i === 6);
                  const progress = profile.streak % 7 || 7;
                  return (
                    <div key={day} className="flex flex-col items-center gap-1 flex-1">
                      <span className="text-[6px] font-bold text-gray-400 uppercase tracking-wider">{day}</span>
                      <div className={`w-full h-1 rounded-full ${isWireframe ? 'bg-gray-200' : 'bg-gray-100'}`}>
                        <div className={`h-full rounded-full transition-all duration-500 ${
                          i < progress
                            ? isWireframe ? 'bg-gray-800' : 'bg-gradient-to-r from-orange-400 to-orange-500'
                            : ''
                        }`} style={{ width: i < progress ? '100%' : '0%' }} />
                      </div>
                      <span className={`text-[8px] font-bold transition-all ${
                        isActive
                          ? isWireframe ? 'text-gray-800' : 'text-orange-600'
                          : isToday
                          ? isWireframe ? 'text-gray-500' : 'text-orange-400'
                          : 'text-gray-300'
                      }`}>
                        {dayNum}
                      </span>
                    </div>
                  );
                })}
              </div>

              <p className="text-[8px] text-gray-400 text-center leading-snug">
                Scan atau lapor setiap hari untuk menjaga streak dan dapatkan bonus poin!
              </p>
            </div>
          </div>
        )}

        {/* 4b. Petugas: Rute Aktif & Status */}
        {isPetugas && (
          <div className="space-y-1.5">
            <h4 className="text-[9.5px] font-black text-gray-400 uppercase tracking-widest px-1 flex items-center gap-1">
              <Route className="w-3.5 h-3.5 text-blue-500" /> Rute & Jadwal
            </h4>
            <div onClick={() => onNavigate('schedule')}
              className={`p-4 rounded-2xl border flex items-center justify-between gap-3 cursor-pointer transition-all btn-press group ${
                isWireframe
                  ? 'border-gray-800 bg-white'
                  : 'bg-white border-blue-100/60 shadow-card hover:shadow-card-hover'
              }`}>
              <div className="flex items-center gap-3">
                <div className={`p-3 rounded-xl shrink-0 transition-all group-hover:scale-110 ${
                  isWireframe ? 'bg-gray-100 border border-gray-300' : 'bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-sm'
                }`}>
                  <Truck className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <h5 className="text-[11px] font-extrabold text-gray-800 font-display">Jadwal Rute Hari Ini</h5>
                  <p className="text-[9px] text-gray-400 mt-0.5 leading-snug">
                    {city.districts.length} kecamatan · {city.schedules.length} jadwal aktif
                  </p>
                </div>
              </div>
              <div className="p-1 rounded-lg bg-blue-50 text-blue-500 group-hover:bg-blue-100 transition-all">
                <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </div>
          </div>
        )}

        {/* 4c. BankSampah: Setoran Terbaru */}
        {isBankSampah && (
          <div className="space-y-1.5">
            <h4 className="text-[9.5px] font-black text-gray-400 uppercase tracking-widest px-1 flex items-center gap-1">
              <ShoppingCart className="w-3.5 h-3.5 text-indigo-500" /> Setoran Terbaru
            </h4>
            <div className="space-y-2">
              {[
                { name: 'Budi Santoso', waste: 'Kardus & Plastik', weight: '3.2 kg', points: '+160', time: '10 menit lalu' },
                { name: 'Siti Rohmah', waste: 'Botol Kaca', weight: '1.8 kg', points: '+90', time: '1 jam lalu' },
                { name: 'Agus Wijaya', waste: 'Kertas & Buku', weight: '2.5 kg', points: '+125', time: '2 jam lalu' },
              ].map((item, i) => (
                <div key={i} className={`p-3 rounded-xl border flex items-center gap-2.5 ${
                  isWireframe ? 'border-gray-300 bg-white' : 'bg-white border-gray-100/60 shadow-soft'
                }`}>
                  <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${roleLightBg}`}>
                    <Weight className={`w-4 h-4 ${roleText}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold text-gray-800">{item.name}</span>
                      <span className="text-[8px] font-bold text-emerald-600">{item.points}</span>
                    </div>
                    <p className="text-[8px] text-gray-500">{item.waste} · {item.weight}</p>
                    <p className="text-[7px] text-gray-400 mt-0.5">{item.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 5. Scan Cepat - Only for Masyarakat */}
        {isMasyarakat && (
          <div className="space-y-1.5">
            <h4 className="text-[9.5px] font-black text-gray-400 uppercase tracking-widest px-1 flex items-center gap-1">
              <Zap className="w-3.5 h-3.5" /> Scan Cepat
            </h4>
            <div 
              onClick={() => onNavigate('scan')}
              className={`p-4 rounded-2xl border flex items-center justify-between gap-3 cursor-pointer transition-all btn-press group ${
                isWireframe
                  ? 'border-gray-800 bg-white text-gray-800'
                  : 'bg-white border-emerald-100/60 shadow-card hover:shadow-card-hover'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`p-3 rounded-xl shrink-0 transition-all group-hover:scale-110 group-hover:-rotate-6 ${
                    isWireframe ? 'bg-gray-100 border border-gray-300' : 'bg-gradient-to-br from-emerald-500 to-emerald-600 text-white shadow-sm'
                }`}>
                  <QrCode className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <h5 className="text-[11px] font-extrabold text-gray-800 font-display flex items-center gap-1">
                    Mulai Pindai Sampah
                    <Sparkles className="w-3 h-3 text-amber-500 anim-float" />
                  </h5>
                  <p className="text-[9px] text-gray-400 mt-0.5 leading-snug">
                    Ambil foto sampah kering Anda untuk klaim poin instant!
                  </p>
                </div>
              </div>
              <div className="p-1 rounded-lg bg-emerald-50 text-emerald-500 group-hover:bg-emerald-100 transition-all">
                <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </div>
          </div>
        )}

        {/* 5b. Petugas: Laporan Perlu Ditindak */}
        {isPetugas && (
          <div className="space-y-1.5">
            <h4 className="text-[9.5px] font-black text-gray-400 uppercase tracking-widest px-1 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5 text-blue-500" /> Laporan Perlu Ditindak
            </h4>
            <div onClick={() => onNavigate('report')}
              className={`p-4 rounded-2xl border flex items-center justify-between gap-3 cursor-pointer transition-all btn-press group ${
                isWireframe
                  ? 'border-gray-800 bg-white'
                  : 'bg-white border-blue-100/60 shadow-card hover:shadow-card-hover'
              }`}>
              <div className="flex items-center gap-3">
                <div className={`p-3 rounded-xl shrink-0 transition-all group-hover:scale-110 ${
                  isWireframe ? 'bg-gray-100 border border-gray-300' : 'bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-sm'
                }`}>
                  <ClipboardList className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <h5 className="text-[11px] font-extrabold text-gray-800 font-display flex items-center gap-1">
                    Tinjau Laporan Masuk
                  </h5>
                  <p className="text-[9px] text-gray-400 mt-0.5 leading-snug">
                    {city.initialReports.length} laporan menunggu verifikasi
                  </p>
                </div>
              </div>
              <div className="p-1 rounded-lg bg-blue-50 text-blue-500 group-hover:bg-blue-100 transition-all">
                <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </div>
          </div>
        )}

        {/* 5c. BankSampah: Timbang Manual */}
        {isBankSampah && (
          <div className="space-y-1.5">
            <h4 className="text-[9.5px] font-black text-gray-400 uppercase tracking-widest px-1 flex items-center gap-1">
              <Weight className="w-3.5 h-3.5 text-indigo-500" /> Timbang Setoran
            </h4>
            <div onClick={() => onNavigate('report')}
              className={`p-4 rounded-2xl border flex items-center justify-between gap-3 cursor-pointer transition-all btn-press group ${
                isWireframe
                  ? 'border-gray-800 bg-white'
                  : 'bg-white border-indigo-100/60 shadow-card hover:shadow-card-hover'
              }`}>
              <div className="flex items-center gap-3">
                <div className={`p-3 rounded-xl shrink-0 transition-all group-hover:scale-110 group-hover:-rotate-6 ${
                  isWireframe ? 'bg-gray-100 border border-gray-300' : 'bg-gradient-to-br from-indigo-500 to-indigo-600 text-white shadow-sm'
                }`}>
                  <Weight className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <h5 className="text-[11px] font-extrabold text-gray-800 font-display">Input Setoran Nasabah</h5>
                  <p className="text-[9px] text-gray-400 mt-0.5 leading-snug">
                    Catat berat & jenis sampah dari nasabah
                  </p>
                </div>
              </div>
              <div className="p-1 rounded-lg bg-indigo-50 text-indigo-500 group-hover:bg-indigo-100 transition-all">
                <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </div>
          </div>
        )}

        {/* 6. Bank Sampah Terdekat - Only for Masyarakat */}
        {isMasyarakat && (
          <div className="space-y-1.5">
            <div className="flex justify-between items-center px-1">
              <h4 className="text-[9.5px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5" /> Bank Sampah Terdekat ({city.shortName})
              </h4>
              <button 
                onClick={() => onNavigate('map')}
                className="text-[9px] font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-0.5 transition-all"
              >
                Lihat Peta <ChevronRight className="w-2.5 h-2.5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              {nearestBanks.map((bank) => (
                <div 
                  key={bank.id}
                  className={`p-3 rounded-2xl border flex flex-col justify-between card-hover ${
                    isWireframe ? 'border-gray-300 bg-white' : 'bg-white border-gray-100/60 shadow-soft'
                  }`}
                >
                  <div>
                    <div className="flex items-center gap-1">
                      <span className={`text-[7.5px] font-black px-1.5 py-0.5 rounded uppercase leading-none ${
                        isWireframe ? 'bg-gray-200' : 'bg-blue-50 text-blue-700'
                      }`}>
                        {bank.distance}
                      </span>
                    </div>
                    <h5 className="text-[10px] font-extrabold text-gray-800 font-display mt-1.5 line-clamp-2 leading-snug min-h-[30px]">
                      {bank.name}
                    </h5>
                    <p className="text-[8.5px] text-gray-400 line-clamp-1 mt-1 flex items-center gap-0.5">
                      <MapPin className="w-2.5 h-2.5 text-red-500 shrink-0" />
                      {bank.address.split(',')[1] || bank.address}
                    </p>
                  </div>

                  <button
                    onClick={() => onNavigate('map')}
                    className={`w-full py-1.5 mt-2.5 rounded-lg text-[8px] font-black uppercase text-center block border transition-all btn-press ${
                      isWireframe 
                        ? 'border-gray-400 text-gray-700 hover:bg-gray-100' 
                        : 'border-emerald-100 text-emerald-600 hover:bg-emerald-50/40 bg-emerald-50/10 hover:border-emerald-200'
                    }`}
                  >
                    Rute Lokasi
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 6b. Petugas: Info Penting */}
        {isPetugas && (
          <div className={`p-4 rounded-2xl border ${
            isWireframe ? 'border-gray-300 bg-white' : 'bg-amber-50/60 border-amber-200/50'
          }`}>
            <div className="flex items-center gap-2 mb-2">
              <div className={`p-1.5 rounded-lg ${isWireframe ? 'bg-gray-200' : 'bg-amber-100'}`}>
                <AlertCircle className={`w-4 h-4 ${isWireframe ? 'text-gray-700' : 'text-amber-600'}`} />
              </div>
              <div>
                <h5 className="text-[10px] font-extrabold text-gray-800 font-display">Pengumuman</h5>
                <p className="text-[8px] text-gray-500">{city.tpaName} kapasitas 78% — percepat pengangkutan!</p>
              </div>
            </div>
          </div>
        )}

        {/* 6c. BankSampah: Daftar Harga */}
        {isBankSampah && (
          <div className="space-y-1.5">
            <h4 className="text-[9.5px] font-black text-gray-400 uppercase tracking-widest px-1 flex items-center gap-1">
              <CircleDollarSign className="w-3.5 h-3.5 text-indigo-500" /> Harga Satuan
            </h4>
            <div className={`p-3 rounded-2xl border ${
              isWireframe ? 'border-gray-300 bg-white' : 'bg-white border-gray-100/60 shadow-soft'
            }`}>
              <div className="space-y-2">
                {[
                  { type: 'Kardus / Kertas', price: 'Rp 5.000', icon: Package },
                  { type: 'Botol Plastik', price: 'Rp 3.000', icon: Droplets },
                  { type: 'Botol Kaca', price: 'Rp 2.000', icon: Droplets },
                  { type: 'Logam / Kaleng', price: 'Rp 8.000', icon: Package },
                ].map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <div key={i} className="flex items-center justify-between py-1.5 border-b border-gray-100 last:border-0">
                      <div className="flex items-center gap-2">
                        <Icon className="w-3.5 h-3.5 text-gray-400" />
                        <span className="text-[10px] font-bold text-gray-700">{item.type}</span>
                      </div>
                      <span className="text-[10px] font-black text-emerald-600">{item.price}/kg</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* 7. Dashboard Dampak / Statistik Lingkungan */}
        <div className="space-y-1.5">
          <h4 className="text-[9.5px] font-black text-gray-400 uppercase tracking-widest px-1 flex items-center gap-1">
            <BarChart3 className="w-3.5 h-3.5" /> {isMasyarakat ? 'Dashboard Dampak Lingkungan' : isPetugas ? 'Dampak Pengangkutan' : 'Statistik Bank Sampah'}
          </h4>
          
          <div className={`p-5 rounded-2xl border space-y-4 shadow-card ${
            isWireframe ? 'border-gray-300 bg-white' : 'bg-white border-gray-100/60'
          }`}>
            {/* Impact stats grid */}
            <div className="grid grid-cols-3 gap-2.5">
              {isMasyarakat ? (
                <>
                  <div className="text-center p-3 bg-gradient-to-b from-emerald-50/60 to-transparent rounded-xl border border-emerald-100/30">
                    <div className="w-8 h-8 mx-auto rounded-lg bg-emerald-100 flex items-center justify-center mb-1.5">
                      <Leaf className="w-4 h-4 text-emerald-600" />
                    </div>
                    <span className="text-[7.5px] text-gray-400 font-semibold block">Daur Ulang</span>
                    <span className="text-xs font-black text-gray-800 block mt-0.5">
                      {profile.totalWasteSubmitted} Kg
                    </span>
                  </div>
                  <div className="text-center p-3 bg-gradient-to-b from-blue-50/60 to-transparent rounded-xl border border-blue-100/30">
                    <div className="w-8 h-8 mx-auto rounded-lg bg-blue-100 flex items-center justify-center mb-1.5">
                      <TrendingDown className="w-4 h-4 text-blue-600" />
                    </div>
                    <span className="text-[7.5px] text-gray-400 font-semibold block">Gas CO2</span>
                    <span className="text-xs font-black text-gray-800 block mt-0.5">
                      {Number((profile.totalWasteSubmitted * 0.72).toFixed(1))} Kg
                    </span>
                  </div>
                  <div className="text-center p-3 bg-gradient-to-b from-amber-50/60 to-transparent rounded-xl border border-amber-100/30">
                    <div className="w-8 h-8 mx-auto rounded-lg bg-amber-100 flex items-center justify-center mb-1.5">
                      <TreePine className="w-4 h-4 text-amber-600" />
                    </div>
                    <span className="text-[7.5px] text-gray-400 font-semibold block">Pohon Selamat</span>
                    <span className="text-xs font-black text-gray-800 block mt-0.5">
                      {Number((profile.totalWasteSubmitted * 0.03).toFixed(2))} Pohon
                    </span>
                  </div>
                </>
              ) : isPetugas ? (
                <>
                  <div className="text-center p-3 bg-gradient-to-b from-blue-50/60 to-transparent rounded-xl border border-blue-100/30">
                    <div className="w-8 h-8 mx-auto rounded-lg bg-blue-100 flex items-center justify-center mb-1.5">
                      <Truck className="w-4 h-4 text-blue-600" />
                    </div>
                    <span className="text-[7.5px] text-gray-400 font-semibold block">Rute Selesai</span>
                    <span className="text-xs font-black text-gray-800 block mt-0.5">87 Rute</span>
                  </div>
                  <div className="text-center p-3 bg-gradient-to-b from-emerald-50/60 to-transparent rounded-xl border border-emerald-100/30">
                    <div className="w-8 h-8 mx-auto rounded-lg bg-emerald-100 flex items-center justify-center mb-1.5">
                      <Weight className="w-4 h-4 text-emerald-600" />
                    </div>
                    <span className="text-[7.5px] text-gray-400 font-semibold block">Total Angkut</span>
                    <span className="text-xs font-black text-gray-800 block mt-0.5">1.450 Kg</span>
                  </div>
                  <div className="text-center p-3 bg-gradient-to-b from-amber-50/60 to-transparent rounded-xl border border-amber-100/30">
                    <div className="w-8 h-8 mx-auto rounded-lg bg-amber-100 flex items-center justify-center mb-1.5">
                      <CheckCircle2 className="w-4 h-4 text-amber-600" />
                    </div>
                    <span className="text-[7.5px] text-gray-400 font-semibold block">Laporan Ditangani</span>
                    <span className="text-xs font-black text-gray-800 block mt-0.5">{city.initialReports.length} Laporan</span>
                  </div>
                </>
              ) : (
                <>
                  <div className="text-center p-3 bg-gradient-to-b from-indigo-50/60 to-transparent rounded-xl border border-indigo-100/30">
                    <div className="w-8 h-8 mx-auto rounded-lg bg-indigo-100 flex items-center justify-center mb-1.5">
                      <Warehouse className="w-4 h-4 text-indigo-600" />
                    </div>
                    <span className="text-[7.5px] text-gray-400 font-semibold block">Volume Gudang</span>
                    <span className="text-xs font-black text-gray-800 block mt-0.5">3.240 Kg</span>
                  </div>
                  <div className="text-center p-3 bg-gradient-to-b from-emerald-50/60 to-transparent rounded-xl border border-emerald-100/30">
                    <div className="w-8 h-8 mx-auto rounded-lg bg-emerald-100 flex items-center justify-center mb-1.5">
                      <Users className="w-4 h-4 text-emerald-600" />
                    </div>
                    <span className="text-[7.5px] text-gray-400 font-semibold block">Nasabah Aktif</span>
                    <span className="text-xs font-black text-gray-800 block mt-0.5">45 Orang</span>
                  </div>
                  <div className="text-center p-3 bg-gradient-to-b from-amber-50/60 to-transparent rounded-xl border border-amber-100/30">
                    <div className="w-8 h-8 mx-auto rounded-lg bg-amber-100 flex items-center justify-center mb-1.5">
                      <Award className="w-4 h-4 text-amber-600" />
                    </div>
                    <span className="text-[7.5px] text-gray-400 font-semibold block">Poin Diterbitkan</span>
                    <span className="text-xs font-black text-gray-800 block mt-0.5">12.450 Pts</span>
                  </div>
                </>
              )}
            </div>

            <div className={`p-4 rounded-2xl border ${
              isWireframe ? 'border-gray-300' : 'border-amber-200/50 bg-gradient-to-br from-amber-50/60 to-amber-50/20'
            }`}>
              <div className="flex justify-between items-center mb-2">
                <span className="text-[9px] font-bold text-gray-700 flex items-center gap-1">
                  <Flame className="w-3.5 h-3.5 text-amber-500 map-pulse" />
                  Kapasitas {city.tpaName}
                </span>
                <span className="text-[10px] font-extrabold text-red-700 bg-red-50 border border-red-200 px-3 py-1 rounded-[24px]">78% Beban</span>
              </div>
              
              <div className="h-2.5 w-full bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-emerald-500 via-amber-500 to-red-500 rounded-full transition-all duration-1000"
                  style={{ width: '78%' }}
                />
              </div>
              <p className="text-[8px] text-gray-500 mt-2 leading-snug">
                {isMasyarakat
                  ? `Kontribusi pemilahan Anda mencegah overload & bahaya kebakaran gas metana di ${city.shortName}.`
                  : isPetugas
                  ? `Pengangkutan tepat waktu membantu mengurangi beban ${city.tpaName} dan mencegah kebakaran.`
                  : `Setiap kg setoran nasabah membantu memperpanjang usia ${city.tpaName}.`
                }
              </p>
            </div>
          </div>
        </div>

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
