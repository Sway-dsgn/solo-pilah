import React, { useState } from 'react';
import {
  Bell,
  Award,
  TrendingUp,
  MapPin,
  Calendar,
  Camera,
  BookOpen,
  ArrowRight,
  Flame,
  CheckCircle2,
  Leaf,
  Layers,
  ChevronRight,
  TrendingDown,
  Info,
  QrCode,
  TreePine,
  Sparkles,
  CircleDollarSign,
  BarChart3,
  Zap
} from 'lucide-react';
import { UserProfile, ScreenType } from '../types';
import { BANK_SAMPAH_LOCATIONS } from '../data';

interface DashboardProps {
  profile: UserProfile;
  isWireframe: boolean;
  onNavigate: (screen: ScreenType) => void;
  onOpenNotifications: () => void;
}

export default function Dashboard({ profile, isWireframe, onNavigate, onOpenNotifications }: DashboardProps) {
  const [eduIndex, setEduIndex] = useState(0);

  // 3 educational banner contents for Surakarta waste management
  const EDU_SLIDES = [
    {
      id: 'slide-1',
      tag: 'PLTSa Putri Cempo',
      title: 'Pembangkit Listrik Tenaga Sampah',
      desc: 'Sampah plastik kering warga Solo kini dikonversi menjadi energi listrik bersih di Solo Utara via proses gasifikasi ramah lingkungan.',
      bg: 'from-emerald-500 to-teal-600',
      textColor: 'text-emerald-100',
      img: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=300'
    },
    {
      id: 'slide-2',
      tag: 'Pilah Dari Rumah',
      title: 'Solusi Atasi Overload TPA',
      desc: 'Pemisahan sampah organik & plastik dari dapur Anda menekan pembentukan gas metana pemicu kebakaran gunungan sampah di Mojosongo.',
      bg: 'from-amber-500 to-orange-600',
      textColor: 'text-amber-100',
      img: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&q=80&w=300'
    },
    {
      id: 'slide-3',
      tag: 'Batik Solo Trans (BST)',
      title: 'Voucher BST Menanti Anda!',
      desc: 'Kumpulkan CempoPoints Anda untuk ditukarkan dengan tiket transportasi umum BST gratis atau voucher belanja sembako murah.',
      bg: 'from-blue-500 to-indigo-600',
      textColor: 'text-blue-100',
      img: 'https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&q=80&w=300'
    }
  ];

  const nextEduSlide = () => {
    setEduIndex((prev) => (prev + 1) % EDU_SLIDES.length);
  };

  // Get nearest waste bank locations
  const nearestBanks = [...BANK_SAMPAH_LOCATIONS]
    .filter(b => b.type !== 'TPA')
    .slice(0, 2);

  return (
    <div className={`h-full flex flex-col phone-scroll overflow-y-auto ${isWireframe ? 'bg-white text-gray-800' : 'bg-gray-50'}`}>
      
      {/* 1. Mini App Bar / Header */}
      <div className={`p-4 flex items-center justify-between border-b ${
        isWireframe ? 'bg-white border-gray-300' : 'bg-white border-gray-100/50 shadow-sm'
      }`}>
        <div className="flex items-center gap-2">
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
          className={`p-2 rounded-xl relative transition-all cursor-pointer ${
            isWireframe ? 'border border-gray-300' : 'hover:bg-gray-100 bg-gray-50'
          }`}
        >
          <Bell className="w-4 h-4 text-gray-600" />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-red-500 rounded-full"></span>
        </button>
      </div>

      <div className="p-4 space-y-4 flex-1">
        
        {/* 2. Banner Edukasi (Interactive Carousel) */}
        <div className="space-y-1.5">
          <div className="flex justify-between items-center px-1">
            <h4 className="text-[9.5px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-1">
              <BookOpen className="w-3.5 h-3.5" /> Banner Edukasi
            </h4>
            <button 
              onClick={nextEduSlide}
              className="text-[9.5px] font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-0.5"
            >
              Slide Berikutnya <ChevronRight className="w-3 h-3" />
            </button>
          </div>

          <div 
            onClick={nextEduSlide}
            className={`p-3.5 rounded-2xl relative overflow-hidden cursor-pointer transition-all active:scale-[0.99] border ${
              isWireframe
                ? 'border-2 border-gray-800 bg-white text-gray-800'
                : `bg-gradient-to-br ${EDU_SLIDES[eduIndex].bg} text-white border-transparent shadow-sm`
            }`}
          >
            {/* Background image fade decoration */}
            {!isWireframe && (
              <div 
                className="absolute right-0 bottom-0 top-0 w-1/3 opacity-25 bg-cover bg-center mix-blend-overlay rounded-r-2xl"
                style={{ backgroundImage: `url(${EDU_SLIDES[eduIndex].img})` }}
              ></div>
            )}

            <div className="relative z-10 space-y-1 max-w-[85%]">
              <span className={`text-[8px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                isWireframe ? 'bg-gray-200 text-gray-800' : 'bg-white/25 text-white'
              }`}>
                {EDU_SLIDES[eduIndex].tag}
              </span>
              <h5 className="text-[12px] font-black font-display tracking-tight leading-tight pt-1">
                {EDU_SLIDES[eduIndex].title}
              </h5>
              <p className={`text-[9.5px] leading-relaxed line-clamp-2 ${
                isWireframe ? 'text-gray-500' : EDU_SLIDES[eduIndex].textColor
              }`}>
                {EDU_SLIDES[eduIndex].desc}
              </p>
            </div>
            
            {/* Indicator Dots */}
            <div className="absolute right-3.5 top-3.5 flex gap-1">
              {EDU_SLIDES.map((_, idx) => (
                <span 
                  key={idx}
                  className={`w-1.5 h-1.5 rounded-full transition-all ${
                    idx === eduIndex 
                      ? isWireframe ? 'bg-black' : 'bg-white w-3' 
                      : isWireframe ? 'bg-gray-300' : 'bg-white/40'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* 3. Poin Section (Saldo CempoPoints) */}
        <div className="space-y-1.5">
          <h4 className="text-[9.5px] font-black text-gray-400 uppercase tracking-widest px-1 flex items-center gap-1">
            <CircleDollarSign className="w-3.5 h-3.5" /> Saldo & Poin
          </h4>
          <div className={`p-4 rounded-2xl relative overflow-hidden ${
            isWireframe
              ? 'border-2 border-gray-800 bg-white text-gray-800'
              : 'bg-white border border-gray-100 shadow-sm'
          }`}>
            <div className="flex justify-between items-center">
              <div>
                <p className="text-[9px] text-gray-400 font-semibold uppercase tracking-wider">
                  CempoPoints Milik Anda
                </p>
                <div className="flex items-baseline gap-1 mt-1">
                  <h2 className="text-2xl font-black font-display tracking-tight text-gray-800">
                    {profile.points.toLocaleString()}
                  </h2>
                  <span className="text-[10px] font-bold text-gray-400 uppercase">pts</span>
                </div>
                <p className={`text-[9px] mt-1.5 flex items-center gap-1 text-emerald-600 font-medium`}>
                  <TrendingUp className="w-3.5 h-3.5" />
                  +120 poin berhasil didapat minggu ini
                </p>
              </div>

              <button
                onClick={() => onNavigate('rewards')}
                className={`px-3.5 py-2 rounded-xl text-[10px] font-black flex items-center gap-1 transition-all cursor-pointer ${
                  isWireframe
                    ? 'border border-gray-800 bg-gray-100'
                    : 'bg-emerald-500 text-white hover:bg-emerald-600 shadow-md shadow-emerald-100'
                }`}
              >
                Tukar Poin
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>

        {/* 4. Scan Cepat (Instant Camera Trigger) */}
        <div className="space-y-1.5">
          <h4 className="text-[9.5px] font-black text-gray-400 uppercase tracking-widest px-1 flex items-center gap-1">
            <Zap className="w-3.5 h-3.5" /> Scan Cepat
          </h4>
          <div 
            onClick={() => onNavigate('scan')}
            className={`p-3.5 rounded-2xl border flex items-center justify-between gap-3 cursor-pointer transition-all hover:scale-[1.01] active:scale-[0.99] group ${
              isWireframe
                ? 'border-gray-800 bg-white text-gray-800'
                : 'bg-gradient-to-r from-emerald-50/60 to-teal-50/20 border-emerald-100/60 hover:bg-emerald-50/80 shadow-sm'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className={`p-3 rounded-xl shrink-0 transition-transform group-hover:scale-110 ${
                isWireframe ? 'bg-gray-100 border border-gray-300' : 'bg-emerald-500 text-white shadow-md shadow-emerald-100'
              }`}>
                <QrCode className="w-5 h-5 animate-pulse" />
              </div>
              <div className="min-w-0">
                <h5 className="text-[11px] font-extrabold text-gray-800 font-display flex items-center gap-1">
                  Mulai Pindai Sampah
                  <Sparkles className="w-3 h-3 text-amber-500" />
                </h5>
                <p className="text-[9px] text-gray-400 mt-0.5 leading-snug">
                  Ambil foto sampah kering Anda untuk klaim poin instant!
                </p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-emerald-600 shrink-0 group-hover:translate-x-0.5 transition-transform" />
          </div>
        </div>

        {/* 5. Bank Sampah Terdekat (Nearest Depots) */}
        <div className="space-y-1.5">
          <div className="flex justify-between items-center px-1">
            <h4 className="text-[9.5px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5" /> Bank Sampah Terdekat (Solo)
            </h4>
            <button 
              onClick={() => onNavigate('map')}
              className="text-[9px] font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-0.5"
            >
              Lihat Peta <ChevronRight className="w-2.5 h-2.5" />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {nearestBanks.map((bank) => (
              <div 
                key={bank.id}
                className={`p-3 rounded-2xl border flex flex-col justify-between ${
                  isWireframe ? 'border-gray-300 bg-white' : 'bg-white border-gray-100/60 shadow-sm'
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
                  className={`w-full py-1.5 mt-2.5 rounded-lg text-[8px] font-black uppercase text-center block border ${
                    isWireframe 
                      ? 'border-gray-400 text-gray-700 hover:bg-gray-100' 
                      : 'border-emerald-100 text-emerald-600 hover:bg-emerald-50/40 bg-emerald-50/10'
                  }`}
                >
                  Rute Lokasi
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* 6. Dashboard Dampak (Impact Statistics) */}
        <div className="space-y-1.5">
          <h4 className="text-[9.5px] font-black text-gray-400 uppercase tracking-widest px-1 flex items-center gap-1">
            <BarChart3 className="w-3.5 h-3.5" /> Dashboard Dampak Lingkungan
          </h4>
          
          <div className={`p-4 rounded-2xl border space-y-3.5 ${
            isWireframe ? 'border-gray-300 bg-white' : 'bg-white border-gray-100/60 shadow-sm'
          }`}>
            {/* Impact stats grid */}
            <div className="grid grid-cols-3 gap-2.5">
              <div className="text-center p-1.5 bg-emerald-50/20 rounded-xl border border-emerald-100/10">
                <Leaf className="w-4 h-4 text-emerald-500 mx-auto mb-1" />
                <span className="text-[7.5px] text-gray-400 font-semibold block">Daur Ulang</span>
                <span className="text-[11px] font-black text-gray-800 block mt-0.5">
                  {profile.totalWasteSubmitted} Kg
                </span>
              </div>
              <div className="text-center p-1.5 bg-blue-50/20 rounded-xl border border-blue-100/10">
                <TrendingDown className="w-4 h-4 text-blue-500 mx-auto mb-1" />
                <span className="text-[7.5px] text-gray-400 font-semibold block">Gas CO2</span>
                <span className="text-[11px] font-black text-gray-800 block mt-0.5">
                  {Number((profile.totalWasteSubmitted * 0.72).toFixed(1))} Kg
                </span>
              </div>
              <div className="text-center p-1.5 bg-amber-50/20 rounded-xl border border-amber-100/10">
                <TreePine className="w-4 h-4 text-amber-500 mx-auto mb-1" />
                <span className="text-[7.5px] text-gray-400 font-semibold block">Pohon Selamat</span>
                <span className="text-[11px] font-black text-gray-800 block mt-0.5">
                  {Number((profile.totalWasteSubmitted * 0.03).toFixed(2))} Pohon
                </span>
              </div>
            </div>

            {/* Putri Cempo Landfill Load Status */}
            <div className={`p-2.5 rounded-xl border ${
              isWireframe ? 'border-gray-300' : 'border-amber-200/50 bg-amber-50/40'
            }`}>
              <div className="flex justify-between items-center mb-1.5">
                <span className="text-[9px] font-bold text-gray-700 flex items-center gap-1">
                  <Flame className="w-3.5 h-3.5 text-amber-500 animate-pulse" />
                  Kapasitas TPA Putri Cempo
                </span>
                <span className="text-[9px] font-black text-red-600">78% Beban</span>
              </div>
              
              <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-emerald-500 via-amber-500 to-red-500"
                  style={{ width: '78%' }}
                />
              </div>
              <p className="text-[8px] text-gray-500 mt-1 leading-snug">
                Kontribusi pemilahan Anda mencegah overload & bahaya kebakaran gas metana sampah di Mojosongo.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
