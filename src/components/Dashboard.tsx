import React, { useState } from 'react';
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
  Zap
} from 'lucide-react';
import { UserProfile, ScreenType } from '../types';


interface DashboardProps {
  profile: UserProfile;
  setProfile: React.Dispatch<React.SetStateAction<UserProfile>>;
  isWireframe: boolean;
  onNavigate: (screen: ScreenType) => void;
  onOpenNotifications: () => void;
  city: any;
}

export default function Dashboard({ profile, setProfile, isWireframe, onNavigate, onOpenNotifications, city }: DashboardProps) {
  const [checkedIn, setCheckedIn] = useState(false);

  const handleCheckin = () => {
    const today = new Date().toISOString().split('T')[0];
    if (profile.lastActiveDate === today) {
      alert("Anda sudah check-in hari ini!");
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

  // Get nearest waste bank locations
  const nearestBanks = [...city.bankSampah]
    .filter((b: any) => b.type !== 'TPA')
    .slice(0, 2);

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
              className={`w-9 h-9 rounded-full object-cover border-2 ${isWireframe ? 'border-gray-500' : 'border-emerald-500'}`}
            />
            <span className={`absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full border-2 border-white flex items-center justify-center text-[7px] text-white font-bold ${
              isWireframe ? 'bg-gray-800' : profile.role === 'Masyarakat' ? 'bg-emerald-500' : profile.role === 'Petugas' ? 'bg-blue-500' : 'bg-indigo-500'
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
        
        {/* 2. Edukasi Link Card */}
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

        {/* 3. Poin Section (Saldo CempoPoints) */}
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
                <div className="absolute top-1/2 right-4 w-2 h-2 rounded-full bg-white/20" />
                <div className="absolute top-3 right-12 w-1 h-1 rounded-full bg-white/10" />
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

        {/* 4. Streak Harian (Gamifikasi) */}
        <div className="space-y-1.5">
          <h4 className="text-[9.5px] font-black text-gray-400 uppercase tracking-widest px-1 flex items-center gap-1">
            <Flame className="w-3.5 h-3.5 text-orange-500" /> Streak Aktif
          </h4>
          <div className={`p-4 rounded-2xl border shadow-card ${
            isWireframe ? 'border-gray-300 bg-white' : 'bg-white border-gray-100/60'
          }`}>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className={`p-2 rounded-xl ${isWireframe ? 'bg-gray-100 border border-gray-300' : 'bg-orange-50 border border-orange-100'}`}>
                  <Flame className={`w-5 h-5 ${isWireframe ? 'text-gray-800' : 'text-orange-500'}`} />
                </div>
                <div>
                  <span className={`text-lg font-black font-display ${isWireframe ? 'text-gray-800' : 'text-orange-600'}`}>
                    {profile.streak}
                  </span>
                  <span className="text-[9px] text-gray-500 font-bold ml-1">hari</span>
                  <p className="text-[8px] text-gray-400">berturut-turut aktif</p>
                </div>
              </div>
              <button onClick={handleCheckin}
                className={`px-3 py-1.5 rounded-xl text-[9px] font-bold cursor-pointer transition-all btn-press ${
                  checkedIn || profile.lastActiveDate === new Date().toISOString().split('T')[0]
                    ? isWireframe ? 'bg-gray-300 text-gray-500 cursor-default' : 'bg-gray-200 text-gray-500 cursor-default border border-gray-200'
                    : isWireframe ? 'bg-gray-800 text-white' : 'bg-orange-500 text-white hover:bg-orange-600 shadow-sm'
                }`}>
                {checkedIn || profile.lastActiveDate === new Date().toISOString().split('T')[0] ? '✔ Check-in' : '+25 Check-in'}
              </button>
            </div>

            {/* 7-day mini calendar */}
            <div className="flex gap-1.5 justify-center mb-3">
              {['Sen','Sel','Rab','Kam','Jum','Sab','Min'].map((day, i) => {
                const isActive = i < profile.streak % 7 || (profile.streak > 0 && i === 0 && profile.streak >= 7);
                const isToday = i === new Date().getDay() - 1 || (new Date().getDay() === 0 && i === 6);
                return (
                  <div key={day} className="flex flex-col items-center gap-1">
                    <span className="text-[7px] font-bold text-gray-400 uppercase">{day}</span>
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[8px] font-bold transition-all ${
                      isActive
                        ? isWireframe ? 'bg-gray-800 text-white' : 'bg-orange-500 text-white shadow-sm'
                        : isToday
                        ? isWireframe ? 'border border-gray-400' : 'border-2 border-orange-200 bg-orange-50 text-orange-500'
                        : 'bg-gray-100 text-gray-400'
                    }`}>
                      {i + 1}
                    </div>
                  </div>
                );
              })}
            </div>

            <p className="text-[8px] text-gray-400 text-center leading-snug">
              Scan atau lapor setiap hari untuk menjaga streak dan dapatkan bonus poin!
            </p>
          </div>
        </div>

        {/* 5. Scan Cepat (Instant Camera Trigger) */}
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

        {/* 6. Bank Sampah Terdekat (Nearest Depots) */}
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

        {/* 7. Dashboard Dampak (Impact Statistics) */}
        <div className="space-y-1.5">
          <h4 className="text-[9.5px] font-black text-gray-400 uppercase tracking-widest px-1 flex items-center gap-1">
            <BarChart3 className="w-3.5 h-3.5" /> Dashboard Dampak Lingkungan
          </h4>
          
          <div className={`p-5 rounded-2xl border space-y-4 shadow-card ${
            isWireframe ? 'border-gray-300 bg-white' : 'bg-white border-gray-100/60'
          }`}>
            {/* Impact stats grid */}
            <div className="grid grid-cols-3 gap-2.5">
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
            </div>

            <div className={`p-4 rounded-2xl border ${
              isWireframe ? 'border-gray-300' : 'border-amber-200/50 bg-gradient-to-br from-amber-50/60 to-amber-50/20'
            }`}>
              <div className="flex justify-between items-center mb-2">
                <span className="text-[9px] font-bold text-gray-700 flex items-center gap-1">
                  <Flame className="w-3.5 h-3.5 text-amber-500 map-pulse" />
                  Kapasitas {city.tpaName}
                </span>
                <span className="badge-red"><span className="text-[9px]">78</span>% Beban</span>
              </div>
              
              <div className="h-2.5 w-full bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-emerald-500 via-amber-500 to-red-500 rounded-full transition-all duration-1000"
                  style={{ width: '78%' }}
                />
              </div>
              <p className="text-[8px] text-gray-500 mt-2 leading-snug">
                Kontribusi pemilahan Anda mencegah overload & bahaya kebakaran gas metana di {city.shortName}.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
