import React, { useState, useEffect, useRef } from 'react';
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
  const [streakPopup, setStreakPopup] = useState(false);
  const streakPopupShown = useRef(false);

  useEffect(() => {
    if (profile.role === 'Masyarakat' && !streakPopupShown.current) {
      streakPopupShown.current = true;
      setStreakPopup(true);
    }
  }, [profile.role]);

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
  const roleAccent400 = roleColor === 'emerald' ? 'bg-emerald-400' : roleColor === 'blue' ? 'bg-blue-400' : 'bg-indigo-400';

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
      <div className={`px-4 pt-4 pb-3 flex items-center justify-between ${
        isWireframe ? 'bg-white' : 'bg-transparent'
      }`}>
        <div className="flex items-center gap-2.5">
          <div className="relative">
            <img
              src={profile.avatar}
              alt="Avatar"
              className={`w-10 h-10 rounded-full object-cover ring-2 ring-offset-2 ${isWireframe ? 'ring-gray-500 ring-offset-white' : isMasyarakat ? 'ring-emerald-500 ring-offset-gray-50' : isPetugas ? 'ring-blue-500 ring-offset-gray-50' : 'ring-indigo-500 ring-offset-gray-50'}`}
            />
            <span className={`absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full border-2 border-white flex items-center justify-center text-[7px] text-white font-bold shadow-sm ${
              isWireframe ? 'bg-gray-800' : isMasyarakat ? 'bg-emerald-500' : isPetugas ? 'bg-blue-500' : 'bg-indigo-500'
            }`}>
              {profile.role[0]}
            </span>
          </div>
          <div>
            <h3 className={`text-sm font-black font-display leading-none ${isWireframe ? 'text-gray-800' : 'text-gray-900'}`}>{profile.name}</h3>
            <div className="flex items-center gap-1.5 mt-1">
              <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${
                isWireframe ? 'bg-gray-100 text-gray-600' : isMasyarakat ? 'bg-emerald-50 text-emerald-700' : isPetugas ? 'bg-blue-50 text-blue-700' : 'bg-indigo-50 text-indigo-700'
              }`}>{profile.ecoRank}</span>
            </div>
          </div>
        </div>

        <button
          onClick={onOpenNotifications}
          className={`p-2.5 rounded-xl relative transition-all cursor-pointer btn-press ${
            isWireframe ? 'border border-gray-300 bg-white' : 'bg-white border border-gray-100 shadow-soft hover:shadow-md'
          }`}
        >
          <Bell className="w-4 h-4 text-gray-600" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full map-pulse ring-2 ring-white"></span>
        </button>
      </div>

      <div className="px-4 pb-6 space-y-5 flex-1">
         
        {/* 2b. Petugas: Ringkasan Tugas Hari Ini */}
        {isPetugas && (
          <div className={`p-4 rounded-2xl border shadow-card ${
            isWireframe ? 'border-gray-300 bg-white' : 'bg-white border-gray-100/60'
          }`}>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-1.5">
                <div className={`w-4 h-0.5 rounded-full ${isWireframe ? 'bg-gray-400' : 'bg-blue-400'}`} />
                <h4 className="text-[9.5px] font-black text-gray-400 uppercase tracking-[0.15em]">Tugas Hari Ini</h4>
              </div>
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
            <div className="flex items-center gap-1.5 mb-3">
              <div className={`w-4 h-0.5 rounded-full ${isWireframe ? 'bg-gray-400' : 'bg-indigo-400'}`} />
              <h4 className="text-[9.5px] font-black text-gray-400 uppercase tracking-[0.15em]">Aktivitas Hari Ini</h4>
            </div>
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
            <div className="flex items-center gap-1.5 px-1 mb-2">
              <div className={`w-4 h-0.5 rounded-full ${isWireframe ? 'bg-gray-400' : 'bg-emerald-400'}`} />
              <h4 className="text-[9.5px] font-black text-gray-400 uppercase tracking-[0.15em]">Saldo & Poin</h4>
            </div>
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

        {/* 3a. Masyarakat: Aksi Cepat (Scan + Edukasi) */}
        {isMasyarakat && (
          <div className="grid grid-cols-2 gap-3">
            <button onClick={() => onNavigate('scan')}
              className={`flex flex-col items-center justify-center gap-2 py-4 rounded-2xl border transition-all btn-press group ${
                isWireframe
                  ? 'border-2 border-gray-800 bg-white text-gray-800'
                  : 'bg-gradient-to-br from-emerald-500 to-emerald-600 text-white border-transparent shadow-card'
              }`}>
              <div className={`p-2.5 rounded-xl transition-all group-hover:scale-110 group-hover:-rotate-6 ${
                isWireframe ? 'bg-gray-100 border border-gray-300' : 'bg-white/20'
              }`}>
                <QrCode className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-extrabold font-display">Pindai Sampah</span>
            </button>
            <button onClick={() => onNavigate('edukasi')}
              className={`flex flex-col items-center justify-center gap-2 py-4 rounded-2xl border transition-all btn-press group ${
                isWireframe ? 'border border-gray-300 bg-white text-gray-800' : 'bg-white border-gray-100/60 shadow-card text-gray-700'
              }`}>
              <div className={`p-2.5 rounded-xl transition-all group-hover:scale-110 ${
                isWireframe ? 'bg-gray-100 border border-gray-300' : 'bg-emerald-50'
              }`}>
                <BookOpen className={`w-5 h-5 ${isWireframe ? 'text-gray-700' : 'text-emerald-600'}`} />
              </div>
              <span className="text-[10px] font-extrabold font-display">Edukasi</span>
            </button>
          </div>
        )}

        {/* 3b. Petugas: Statistik Kinerja */}
        {isPetugas && (
          <div className="space-y-1.5">
            <div className="flex items-center gap-1.5 px-1 mb-2">
              <div className={`w-4 h-0.5 rounded-full ${isWireframe ? 'bg-gray-400' : 'bg-blue-400'}`} />
              <h4 className="text-[9.5px] font-black text-gray-400 uppercase tracking-[0.15em]">Kinerja Bulan Ini</h4>
            </div>
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
            <div className="flex items-center gap-1.5 px-1 mb-2">
              <div className={`w-4 h-0.5 rounded-full ${isWireframe ? 'bg-gray-400' : 'bg-indigo-400'}`} />
              <h4 className="text-[9.5px] font-black text-gray-400 uppercase tracking-[0.15em]">Volume Gudang</h4>
            </div>
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
          <div className={`p-4 rounded-2xl border ${
            isWireframe ? 'border-gray-300 bg-white' : 'bg-white border-gray-100/60 shadow-card'
          }`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                  isWireframe ? 'bg-gray-100 border border-gray-300' : 'bg-gradient-to-br from-orange-400 to-orange-600 shadow-sm'
                }`}>
                  <Flame className={`w-5 h-5 ${isWireframe ? 'text-gray-800' : 'text-white'}`} />
                </div>
                <div>
                  <div className="flex items-baseline gap-1">
                    <span className={`text-lg font-black font-display tracking-tight ${isWireframe ? 'text-gray-800' : 'text-orange-600'}`}>
                      {profile.streak}
                    </span>
                    <span className="text-[9px] text-gray-400 font-bold">hari streak</span>
                  </div>
                </div>
              </div>
              <button onClick={handleCheckin}
                className={`px-3.5 py-1.5 rounded-xl text-[9px] font-bold cursor-pointer transition-all btn-press ${
                  checkedIn || profile.lastActiveDate === new Date().toISOString().split('T')[0]
                    ? isWireframe ? 'bg-gray-300 text-gray-500 cursor-default' : 'bg-gray-100 text-gray-400 cursor-default'
                    : isWireframe ? 'bg-gray-800 text-white' : 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-sm hover:shadow-md'
                }`}>
                {checkedIn || profile.lastActiveDate === new Date().toISOString().split('T')[0] ? '✔ Check-in' : '+25 Check-in'}
              </button>
            </div>

            <div className="flex gap-1.5 justify-between mt-3.5">
              {['Sen','Sel','Rab','Kam','Jum','Sab','Min'].map((day, i) => {
                const isActive = i < profile.streak % 7 || (profile.streak > 0 && i === 0 && profile.streak >= 7);
                const isToday = i === new Date().getDay() - 1 || (new Date().getDay() === 0 && i === 6);
                const progress = profile.streak % 7 || 7;
                return (
                  <div key={day} className="flex flex-col items-center gap-1 flex-1">
                    <div className={`w-full h-1.5 rounded-full ${isWireframe ? 'bg-gray-200' : 'bg-gray-100'}`}>
                      <div className={`h-full rounded-full transition-all duration-500 ${
                        i < progress
                          ? isWireframe ? 'bg-gray-800' : 'bg-gradient-to-r from-orange-400 to-orange-500'
                          : ''
                      }`} style={{ width: i < progress ? '100%' : '0%' }} />
                    </div>
                    <span className={`text-[6px] font-bold uppercase tracking-wider transition-all ${
                      isActive
                        ? isWireframe ? 'text-gray-800' : 'text-orange-600'
                        : isToday
                        ? isWireframe ? 'text-gray-500' : 'text-orange-400'
                        : 'text-gray-300'
                    }`}>
                      {day}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* 4b/5b. Petugas: Aksi Cepat (Rute + Laporan) */}
        {isPetugas && (
          <div className="grid grid-cols-2 gap-3">
            <button onClick={() => onNavigate('schedule')}
              className={`flex flex-col items-center justify-center gap-2 py-4 rounded-2xl border transition-all btn-press group ${
                isWireframe ? 'border border-gray-300 bg-white text-gray-800' : 'bg-white border-blue-100/60 shadow-card text-gray-700'
              }`}>
              <div className={`p-2.5 rounded-xl transition-all group-hover:scale-110 ${
                isWireframe ? 'bg-gray-100 border border-gray-300' : 'bg-blue-50'
              }`}>
                <Truck className={`w-5 h-5 ${isWireframe ? 'text-gray-700' : 'text-blue-600'}`} />
              </div>
              <span className="text-[10px] font-extrabold font-display text-center leading-tight px-1">Rute & Jadwal</span>
            </button>
            <button onClick={() => onNavigate('report')}
              className={`flex flex-col items-center justify-center gap-2 py-4 rounded-2xl border transition-all btn-press group ${
                isWireframe ? 'border border-gray-300 bg-white text-gray-800' : 'bg-white border-blue-100/60 shadow-card text-gray-700'
              }`}>
              <div className={`p-2.5 rounded-xl transition-all group-hover:scale-110 ${
                isWireframe ? 'bg-gray-100 border border-gray-300' : 'bg-blue-50'
              }`}>
                <ClipboardList className={`w-5 h-5 ${isWireframe ? 'text-gray-700' : 'text-blue-600'}`} />
              </div>
              <span className="text-[10px] font-extrabold font-display text-center leading-tight px-1">Tinjau Laporan</span>
            </button>
          </div>
        )}

        {/* 4c. BankSampah: Setoran Terbaru */}
        {isBankSampah && (
          <div className="space-y-2">
            <div className="flex items-center gap-1.5 px-1">
              <div className={`w-4 h-0.5 rounded-full ${isWireframe ? 'bg-gray-400' : 'bg-indigo-400'}`} />
              <h4 className="text-[9.5px] font-black text-gray-400 uppercase tracking-[0.15em]">Setoran Terbaru</h4>
            </div>
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

        {/* 5c. BankSampah: Timbang Manual (primary action) */}
        {isBankSampah && (
          <button onClick={() => onNavigate('report')}
            className={`flex items-center gap-3 w-full p-4 rounded-2xl border text-left transition-all btn-press group ${
              isWireframe
                ? 'border-2 border-gray-800 bg-white text-gray-800'
                : 'bg-gradient-to-br from-indigo-500 to-indigo-600 text-white border-transparent shadow-card'
            }`}>
            <div className={`p-3 rounded-xl shrink-0 transition-all group-hover:scale-110 group-hover:-rotate-6 ${
              isWireframe ? 'bg-gray-100 border border-gray-300' : 'bg-white/20'
            }`}>
              <Weight className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <h5 className="text-[11px] font-extrabold font-display">Input Setoran Nasabah</h5>
              <p className={`text-[9px] mt-0.5 leading-snug ${isWireframe ? 'text-gray-500' : 'text-white/80'}`}>
                Catat berat & jenis sampah dari nasabah
              </p>
            </div>
            <div className={`p-1 rounded-lg transition-all group-hover:translate-x-1 ${isWireframe ? '' : 'bg-white/10'}`}>
              <ChevronRight className="w-4 h-4" />
            </div>
          </button>
        )}

        {/* 6. Bank Sampah Terdekat - Only for Masyarakat */}
        {isMasyarakat && (
          <div className="space-y-2">
            <div className="flex justify-between items-center px-1">
              <div className="flex items-center gap-1.5">
                <div className={`w-4 h-0.5 rounded-full ${isWireframe ? 'bg-gray-400' : 'bg-emerald-400'}`} />
                <h4 className="text-[9.5px] font-black text-gray-400 uppercase tracking-[0.15em]">
                  Bank Sampah Terdekat
                </h4>
              </div>
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
            <div className="flex items-center gap-1.5 px-1 mb-2">
              <div className={`w-4 h-0.5 rounded-full ${isWireframe ? 'bg-gray-400' : 'bg-indigo-400'}`} />
              <h4 className="text-[9.5px] font-black text-gray-400 uppercase tracking-[0.15em]">Harga Satuan</h4>
            </div>
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
        <div className="space-y-2">
          <div className="flex items-center gap-1.5 px-1">
            <div className={`w-4 h-0.5 rounded-full ${isWireframe ? 'bg-gray-400' : isMasyarakat ? 'bg-emerald-400' : isPetugas ? 'bg-blue-400' : 'bg-indigo-400'}`} />
            <h4 className="text-[9.5px] font-black text-gray-400 uppercase tracking-[0.15em]">
              <BarChart3 className="w-3 h-3 inline -mt-0.5 mr-1" /> 
              {isMasyarakat ? 'Dampak Lingkungan' : isPetugas ? 'Dampak Pengangkutan' : 'Statistik Bank Sampah'}
            </h4>
          </div>
          
          <div className={`p-4 sm:p-5 rounded-2xl border space-y-4 ${
            isWireframe ? 'border-gray-300 bg-white' : 'bg-white border-gray-100/60 shadow-card'
          }`}>
            {/* Impact stats grid */}
            <div className="grid grid-cols-3 gap-2">
              {isMasyarakat ? (
                <>
                  {[
                    { icon: Leaf, val: `${profile.totalWasteSubmitted} Kg`, label: 'Daur Ulang', borderCls: 'border-emerald-100/40 bg-gradient-to-b from-emerald-50/40', iconBg: 'bg-emerald-100', iconCls: 'text-emerald-600' },
                    { icon: TrendingDown, val: `${Number((profile.totalWasteSubmitted * 0.72).toFixed(1))} Kg`, label: 'Gas CO2', borderCls: 'border-blue-100/40 bg-gradient-to-b from-blue-50/40', iconBg: 'bg-blue-100', iconCls: 'text-blue-600' },
                    { icon: TreePine, val: `${Number((profile.totalWasteSubmitted * 0.03).toFixed(2))} Pohon`, label: 'Pohon Selamat', borderCls: 'border-amber-100/40 bg-gradient-to-b from-amber-50/40', iconBg: 'bg-amber-100', iconCls: 'text-amber-600' },
                  ].map((item, i) => {
                    const Icon = item.icon;
                    return (
                      <div key={i} className={`text-center p-2.5 sm:p-3 rounded-xl border transition-all duration-300 hover:-translate-y-0.5 ${
                        isWireframe ? 'border-gray-300 bg-white' : `${item.borderCls} to-white shadow-card`
                      }`}>
                        <div className={`w-8 h-8 mx-auto rounded-lg flex items-center justify-center mb-1.5 shadow-sm ${
                          isWireframe ? 'bg-gray-100' : item.iconBg
                        }`}>
                          <Icon className={`w-4 h-4 ${isWireframe ? 'text-gray-700' : item.iconCls}`} />
                        </div>
                        <span className="text-[7.5px] text-gray-400 font-semibold block leading-tight">{item.label}</span>
                        <span className="text-[11px] font-black block mt-0.5 leading-tight text-gray-800">
                          {item.val.split(' ')[0]}
                        </span>
                        <span className="text-[7px] text-gray-400 font-medium">{item.val.split(' ').slice(1).join(' ')}</span>
                      </div>
                    );
                  })}
                </>
              ) : isPetugas ? (
                <>
                  {[
                    { icon: Truck, val: '87 Rute', label: 'Rute Selesai', borderCls: 'border-blue-100/40 bg-gradient-to-b from-blue-50/40', iconBg: 'bg-blue-100', iconCls: 'text-blue-600' },
                    { icon: Weight, val: '1.450 Kg', label: 'Total Angkut', borderCls: 'border-emerald-100/40 bg-gradient-to-b from-emerald-50/40', iconBg: 'bg-emerald-100', iconCls: 'text-emerald-600' },
                    { icon: CheckCircle2, val: `${city.initialReports.length} Laporan`, label: 'Laporan Ditangani', borderCls: 'border-amber-100/40 bg-gradient-to-b from-amber-50/40', iconBg: 'bg-amber-100', iconCls: 'text-amber-600' },
                  ].map((item, i) => {
                    const Icon = item.icon;
                    return (
                      <div key={i} className={`text-center p-2.5 sm:p-3 rounded-xl border transition-all duration-300 hover:-translate-y-0.5 ${
                        isWireframe ? 'border-gray-300 bg-white' : `${item.borderCls} to-white shadow-card`
                      }`}>
                        <div className={`w-8 h-8 mx-auto rounded-lg flex items-center justify-center mb-1.5 shadow-sm ${
                          isWireframe ? 'bg-gray-100' : item.iconBg
                        }`}>
                          <Icon className={`w-4 h-4 ${isWireframe ? 'text-gray-700' : item.iconCls}`} />
                        </div>
                        <span className="text-[7.5px] text-gray-400 font-semibold block leading-tight">{item.label}</span>
                        <span className="text-[11px] font-black block mt-0.5 leading-tight text-gray-800">
                          {item.val.split(' ')[0]}
                        </span>
                        <span className="text-[7px] text-gray-400 font-medium">{item.val.split(' ').slice(1).join(' ')}</span>
                      </div>
                    );
                  })}
                </>
              ) : (
                <>
                  {[
                    { icon: Warehouse, val: '3.240 Kg', label: 'Volume Gudang', borderCls: 'border-indigo-100/40 bg-gradient-to-b from-indigo-50/40', iconBg: 'bg-indigo-100', iconCls: 'text-indigo-600' },
                    { icon: Users, val: '45 Orang', label: 'Nasabah Aktif', borderCls: 'border-emerald-100/40 bg-gradient-to-b from-emerald-50/40', iconBg: 'bg-emerald-100', iconCls: 'text-emerald-600' },
                    { icon: Award, val: '12.450 Pts', label: 'Poin Diterbitkan', borderCls: 'border-amber-100/40 bg-gradient-to-b from-amber-50/40', iconBg: 'bg-amber-100', iconCls: 'text-amber-600' },
                  ].map((item, i) => {
                    const Icon = item.icon;
                    return (
                      <div key={i} className={`text-center p-2.5 sm:p-3 rounded-xl border transition-all duration-300 hover:-translate-y-0.5 ${
                        isWireframe ? 'border-gray-300 bg-white' : `${item.borderCls} to-white shadow-card`
                      }`}>
                        <div className={`w-8 h-8 mx-auto rounded-lg flex items-center justify-center mb-1.5 shadow-sm ${
                          isWireframe ? 'bg-gray-100' : item.iconBg
                        }`}>
                          <Icon className={`w-4 h-4 ${isWireframe ? 'text-gray-700' : item.iconCls}`} />
                        </div>
                        <span className="text-[7.5px] text-gray-400 font-semibold block leading-tight">{item.label}</span>
                        <span className="text-[11px] font-black block mt-0.5 leading-tight text-gray-800">
                          {item.val.split(' ')[0]}
                        </span>
                        <span className="text-[7px] text-gray-400 font-medium">{item.val.split(' ').slice(1).join(' ')}</span>
                      </div>
                    );
                  })}
                </>
              )}
            </div>

            <div className={`p-4 rounded-2xl border ${
              isWireframe ? 'border-gray-300 bg-white' : 'border-amber-200/40 bg-gradient-to-br from-amber-50/60 to-white shadow-card'
            }`}>
              <div className="flex items-center justify-between mb-2.5">
                <div className="flex items-center gap-2">
                  <div className={`p-1.5 rounded-lg ${isWireframe ? 'bg-gray-100' : 'bg-amber-100'}`}>
                    <Flame className={`w-3.5 h-3.5 ${isWireframe ? 'text-gray-700' : 'text-amber-500 map-pulse'}`} />
                  </div>
                  <div>
                    <span className={`text-[9px] font-bold leading-none block ${isWireframe ? 'text-gray-700' : 'text-gray-700'}`}>
                      Kapasitas {city.tpaName}
                    </span>
                    <span className="text-[7px] text-gray-400 mt-0.5 inline-block">Ambang batas siaga</span>
                  </div>
                </div>
                <span className={`text-[9px] font-extrabold px-3 py-1 rounded-full border ${
                  isWireframe ? 'text-gray-700 bg-gray-100 border-gray-300' : 'text-red-700 bg-red-50 border-red-200/60'
                }`}>78%</span>
              </div>
              
              <div className={`h-2.5 w-full rounded-full overflow-hidden ${isWireframe ? 'bg-gray-200' : 'bg-gray-100'}`}>
                <div 
                  className={`h-full rounded-full transition-all duration-1000 ease-out ${
                    isWireframe ? 'bg-gray-800' : 'bg-gradient-to-r from-emerald-400 via-amber-400 to-red-500'
                  }`}
                  style={{ width: '78%' }}
                />
              </div>
              <p className="text-[8px] text-gray-500 mt-2.5 leading-relaxed">
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

      {/* Streak Popup — centered + misi harian */}
      {streakPopup && (
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-[65] p-5" onClick={() => setStreakPopup(false)}>
          <div className="relative w-full max-w-sm bg-white rounded-3xl overflow-hidden anim-scale-in shadow-2xl" onClick={e => e.stopPropagation()}>
            {/* decorative bg orbs */}
            <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full bg-orange-100/40 blur-3xl pointer-events-none" />
            <div className="absolute -bottom-10 -left-20 w-40 h-40 rounded-full bg-emerald-100/30 blur-3xl pointer-events-none" />

            <div className="p-5 relative">
              {/* flame icon + streak */}
              <div className="flex items-center gap-3 mb-4">
                <div className={`relative w-14 h-14 shrink-0 ${isWireframe ? '' : 'anim-flame-glow'} rounded-xl flex items-center justify-center ${
                  isWireframe ? 'bg-gray-100 border border-gray-300' : 'bg-gradient-to-br from-orange-400 via-orange-500 to-red-500'
                }`}>
                  <div className={`${isWireframe ? '' : 'anim-flame-flicker'}`}>
                    <Flame className={`w-7 h-7 ${isWireframe ? 'text-gray-800' : 'text-white drop-shadow-lg'}`} />
                  </div>
                  {/* sparkle particles */}
                  <div className={`absolute inset-0 ${isWireframe ? 'hidden' : ''}`}>
                    <div className="absolute top-0 left-1 w-1 h-1 rounded-full bg-yellow-200 anim-particle" />
                    <div className="absolute top-0 right-1 w-1 h-1 rounded-full bg-yellow-100 anim-particle" />
                    <div className="absolute bottom-1 left-0 w-1 h-1 rounded-full bg-orange-200 anim-particle" />
                    <div className="absolute bottom-0 right-1 w-1 h-1 rounded-full bg-yellow-300 anim-particle" />
                  </div>
                </div>
                <div>
                  <div className="anim-bounce-in inline-flex items-baseline gap-1">
                    <span className={`text-2xl font-black font-display tracking-tight ${isWireframe ? 'text-gray-800' : 'text-orange-600'}`}>
                      {profile.streak}
                    </span>
                    <span className="text-[9px] font-bold text-gray-400">hari streak</span>
                  </div>
                  <p className={`text-[9px] mt-0.5 font-medium ${
                    profile.streak >= 30 ? 'text-orange-600' : profile.streak >= 7 ? 'text-amber-600' : 'text-gray-500'
                  }`}>
                    {profile.streak >= 30
                      ? 'Legenda! 30 hari berturut-turut! 🏆'
                      : profile.streak >= 14
                      ? 'Keren! 2 minggu penuh! 🔥'
                      : profile.streak >= 7
                      ? 'Mantap! Seminggu konsisten! ⭐'
                      : profile.streak >= 3
                      ? 'Bagus! 3 hari berturut-turut! 💪'
                      : 'Awal yang hebat! Lanjutkan! 🌱'
                    }
                  </p>
                </div>
              </div>

              {/* milestone bar compact */}
              <div className={`mb-4 anim-stagger-1 ${isWireframe ? '' : ''}`}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[7px] font-bold text-gray-400 uppercase tracking-wider">
                    {profile.streak < 7 ? 'Target: 7 Hari' : profile.streak < 14 ? 'Target: 14 Hari' : profile.streak < 30 ? 'Target: 30 Hari' : 'Target: 60 Hari'}
                  </span>
                  <span className="text-[7px] font-bold text-orange-500">
                    {profile.streak < 7 ? `${Math.round((profile.streak/7)*100)}%` : profile.streak < 14 ? `${Math.round(((profile.streak-7)/7)*100)}%` : profile.streak < 30 ? `${Math.round(((profile.streak-14)/16)*100)}%` : `${Math.min(Math.round(((profile.streak-30)/30)*100), 100)}%`}
                  </span>
                </div>
                <div className={`h-1.5 w-full rounded-full overflow-hidden ${isWireframe ? 'bg-gray-200' : 'bg-gray-100'}`}>
                  <div
                    className={`h-full rounded-full transition-all duration-1000 ease-out ${
                      isWireframe ? 'bg-gray-800' : profile.streak >= 30 ? 'bg-gradient-to-r from-orange-400 to-red-500' : profile.streak >= 7 ? 'bg-gradient-to-r from-amber-400 to-orange-500' : 'bg-gradient-to-r from-orange-300 to-orange-500'
                    }`}
                    style={{
                      width: profile.streak < 7 ? `${Math.round((profile.streak/7)*100)}%`
                        : profile.streak < 14 ? `${Math.round(((profile.streak-7)/7)*100)}%`
                        : profile.streak < 30 ? `${Math.round(((profile.streak-14)/16)*100)}%`
                        : `${Math.min(Math.round(((profile.streak-30)/30)*100), 100)}%`
                    }}
                  />
                </div>
              </div>

              {/* Misi Harian */}
              <div className={`p-3 rounded-2xl border ${isWireframe ? 'border-gray-300 bg-white' : 'bg-gray-50/60 border-gray-100/60'} anim-stagger-2`}>
                <div className="flex items-center gap-1.5 mb-2.5">
                  <div className={`w-3 h-0.5 rounded-full ${isWireframe ? 'bg-gray-400' : 'bg-emerald-400'}`} />
                  <h4 className="text-[8px] font-black text-gray-400 uppercase tracking-[0.15em]">Misi Harian</h4>
                </div>
                <div className="space-y-2">
                  {[
                    { icon: Flame, label: 'Check-in hari ini', done: checkedIn || profile.lastActiveDate === new Date().toISOString().split('T')[0], pts: 25 },
                    { icon: QrCode, label: 'Scan 1 sampah', done: false, pts: 50 },
                    { icon: BookOpen, label: 'Baca artikel edukasi', done: false, pts: 15 },
                  ].map((mission, i) => {
                    const Icon = mission.icon;
                    return (
                      <div key={i} className={`flex items-center gap-2 p-2 rounded-xl border ${
                        mission.done
                          ? isWireframe ? 'bg-gray-100 border-gray-300' : 'bg-emerald-50/60 border-emerald-200/60'
                          : isWireframe ? 'bg-white border-gray-300' : 'bg-white border-gray-100/60'
                      }`}>
                        <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                          mission.done
                            ? isWireframe ? 'bg-gray-200' : 'bg-emerald-100'
                            : isWireframe ? 'bg-gray-100' : 'bg-gray-100'
                        }`}>
                          {mission.done ? (
                            <CheckCircle2 className={`w-3.5 h-3.5 ${isWireframe ? 'text-gray-700' : 'text-emerald-500'}`} />
                          ) : (
                            <Icon className={`w-3.5 h-3.5 ${isWireframe ? 'text-gray-500' : 'text-gray-400'}`} />
                          )}
                        </div>
                        <span className={`flex-1 text-[9px] font-bold ${mission.done ? 'text-gray-400 line-through' : 'text-gray-700'}`}>
                          {mission.label}
                        </span>
                        <span className={`text-[7px] font-extrabold px-1.5 py-0.5 rounded-full ${
                          mission.done
                            ? isWireframe ? 'bg-gray-200 text-gray-500' : 'bg-emerald-100 text-emerald-600'
                            : isWireframe ? 'bg-gray-100 text-gray-500' : 'bg-orange-50 text-orange-500'
                        }`}>
                          +{mission.pts}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* stats row mini */}
              <div className="flex items-center justify-center gap-3 mt-4 anim-stagger-3">
                <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg ${
                  isWireframe ? 'bg-gray-100 border border-gray-300' : 'bg-emerald-50 border border-emerald-200/60'
                }`}>
                  <Award className={`w-3 h-3 ${isWireframe ? 'text-gray-700' : 'text-emerald-500'}`} />
                  <span className={`text-[10px] font-black ${isWireframe ? 'text-gray-800' : 'text-emerald-600'}`}>{profile.points.toLocaleString()}</span>
                  <span className="text-[6px] font-bold text-gray-400 uppercase">pts</span>
                </div>
              </div>

              {/* CTA */}
              <button onClick={() => { setStreakPopup(false); onNavigate('scan'); }}
                className={`mt-4 w-full py-3 rounded-xl text-[10px] font-extrabold tracking-wide transition-all cursor-pointer btn-press anim-stagger-4 flex items-center justify-center gap-2 ${
                  isWireframe ? 'bg-gray-800 text-white' : 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-md hover:shadow-lg'
                }`}>
                <QrCode className="w-4 h-4" />
                Mulai Misi
              </button>
              <button onClick={() => setStreakPopup(false)}
                className="mt-1.5 w-full py-2 text-[8px] font-bold text-gray-400 hover:text-gray-600 transition-all cursor-pointer anim-stagger-5">
                Nanti Saja
              </button>
            </div>
          </div>
        </div>
      )}

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
