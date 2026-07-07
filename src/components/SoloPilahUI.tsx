import { useState, useEffect } from 'react';
import {
  Bell, Leaf, Calendar, Flag, MapPin, BookOpen,
  Home, BarChart3, History, User, Camera,
  ChevronLeft, ChevronRight, TrendingUp, Award, Sparkles,
  Recycle, Droplets, Trash2
} from 'lucide-react';

type ScreenType = 'splash' | 'home' | 'stats';

export default function SoloPilahUI() {
  const [screen, setScreen] = useState<ScreenType>('splash');

  useEffect(() => {
    if (screen === 'splash') {
      const t = setTimeout(() => setScreen('home'), 2500);
      return () => clearTimeout(t);
    }
  }, [screen]);

  const quickActions = [
    { icon: Calendar, label: 'Jadwal', color: 'bg-emerald-50 text-emerald-600' },
    { icon: Flag, label: 'Lapor', color: 'bg-amber-50 text-amber-600' },
    { icon: MapPin, label: 'Lokasi', color: 'bg-blue-50 text-blue-600' },
    { icon: BookOpen, label: 'Panduan', color: 'bg-violet-50 text-violet-600' },
  ];

  const navItems = [
    { id: 'home' as ScreenType, icon: Home, label: 'Beranda' },
    { id: 'stats' as ScreenType, icon: BarChart3, label: 'Statistik' },
    { id: null, icon: Camera, label: 'Scan', isFab: true },
    { id: null, icon: History, label: 'Riwayat' },
    { id: null, icon: User, label: 'Profil' },
  ];

  const barData = [
    { day: 'Sen', value: 2.1 },
    { day: 'Sel', value: 1.8 },
    { day: 'Rab', value: 2.5 },
    { day: 'Kam', value: 1.2 },
    { day: 'Jum', value: 3.0 },
    { day: 'Sab', value: 2.8 },
    { day: 'Min', value: 1.5 },
  ];

  const maxValue = Math.max(...barData.map(d => d.value));
  const radius = 36;
  const circumference = 2 * Math.PI * radius;
  const donutPercent = 78;
  const dashOffset = circumference * 0.25;
  const dashLength = circumference * (donutPercent / 100);

  return (
    <div className="min-h-screen flex items-center justify-center p-6" style={{ backgroundColor: '#e8f0e8' }}>
      <div className="absolute -right-[3px] top-[120px] w-[3px] h-[60px] bg-gray-300 rounded-r-sm" />
      <div className="absolute -right-[3px] top-[200px] w-[3px] h-[40px] bg-gray-300 rounded-r-sm" />
      <div className="absolute -left-[3px] top-[140px] w-[3px] h-[30px] bg-gray-300 rounded-l-sm" />
      <div className="absolute -left-[3px] top-[180px] w-[3px] h-[50px] bg-gray-300 rounded-l-sm" />
      <div className="absolute -left-[3px] top-[240px] w-[3px] h-[50px] bg-gray-300 rounded-l-sm" />

      <div className="relative w-[390px] h-[844px] rounded-[44px] bg-black p-[3px] shadow-2xl flex-shrink-0"
        style={{ boxShadow: '0 30px 80px rgba(30, 86, 49, 0.15), 0 10px 30px rgba(0,0,0,0.08)' }}>
        <div className="w-full h-full rounded-[41px] bg-white overflow-hidden relative">

          {/* Dynamic Island */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 z-50">
            <div className="bg-black h-[30px] w-[120px] rounded-b-2xl flex items-center justify-center gap-2">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-emerald-500" />
                <span className="text-[8px] font-mono text-white font-medium">09:41</span>
              </div>
            </div>
          </div>

          {/* Status Bar Icons */}
          <div className="absolute top-1.5 left-6 right-6 flex justify-between items-center z-40 text-[10px] font-semibold">
            <span className={screen === 'splash' ? 'text-white/80' : 'text-gray-500'}>09:41</span>
            <div className="flex items-center gap-1">
              <div className={`w-3.5 h-2 rounded-sm border ${screen === 'splash' ? 'border-white/60' : 'border-gray-400'} relative overflow-hidden`}>
                <div className={`absolute inset-0 ${screen === 'splash' ? 'bg-white/80' : 'bg-gray-600'}`} style={{ width: '80%' }} />
              </div>
            </div>
          </div>

          {/* Screen Content */}
          <div className="h-full w-full relative">

            {/* =============== SPLASH =============== */}
            {screen === 'splash' && (
              <div className="absolute inset-0 flex flex-col items-center justify-center"
                style={{ background: 'linear-gradient(145deg, #1E5631 0%, #3B6D11 100%)' }}>
                <div className="relative mb-6">
                  <div className="w-24 h-24 bg-white/15 backdrop-blur-sm rounded-3xl flex items-center justify-center">
                    <Leaf className="w-12 h-12 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-amber-400 rounded-full flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-white" />
                  </div>
                </div>
                <h1 className="text-3xl font-extrabold text-white tracking-tight mb-2">SoloPilah</h1>
                <p className="text-white/70 text-sm font-medium tracking-wide">Pilah Sampah, Raih Manfaat</p>
                <div className="absolute bottom-16">
                  <div className="flex gap-2">
                    <div className="w-2 h-2 rounded-full bg-white/40 animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-2 h-2 rounded-full bg-white/60 animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-2 h-2 rounded-full bg-white/80 animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}

            {/* =============== HOME =============== */}
            {screen === 'home' && (
              <div className="absolute inset-0 bg-white overflow-y-auto" style={{ scrollbarWidth: 'none' }}>
                <div className="px-5 pt-12 pb-24 space-y-5">

                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xs text-gray-400 font-medium">Halo,</span>
                      <h2 className="text-lg font-bold text-gray-900 -mt-0.5">Andi Pratama</h2>
                    </div>
                    <button className="relative p-2.5 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors">
                      <Bell className="w-5 h-5 text-gray-600" />
                      <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white" />
                    </button>
                  </div>

                  <div className="rounded-2xl p-5 text-white relative overflow-hidden"
                    style={{ background: 'linear-gradient(135deg, #1E5631 0%, #3B6D11 100%)' }}>
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/4" />
                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/4" />
                    <div className="relative z-10">
                      <div className="flex items-center gap-2 mb-3">
                        <Award className="w-4 h-4 text-amber-300" />
                        <span className="text-xs font-medium text-white/80">Poin Anda</span>
                      </div>
                      <div className="flex items-baseline gap-1.5 mb-1">
                        <span className="text-4xl font-black tracking-tight">2.300</span>
                        <span className="text-sm font-semibold text-white/70">Poin</span>
                      </div>
                      <div className="flex items-center gap-1.5 mt-3">
                        <TrendingUp className="w-3.5 h-3.5 text-emerald-200" />
                        <span className="text-xs text-white/70">+150 poin minggu ini</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 px-1">Layanan Cepat</h3>
                    <div className="grid grid-cols-4 gap-3">
                      {quickActions.map((action) => {
                        const Icon = action.icon;
                        return (
                          <button key={action.label}
                            className="flex flex-col items-center gap-2 p-3 rounded-xl bg-white border border-gray-100 hover:border-gray-200 hover:shadow-sm transition-all active:scale-95 cursor-pointer">
                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${action.color}`}>
                              <Icon className="w-5 h-5" />
                            </div>
                            <span className="text-[10px] font-semibold text-gray-600">{action.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="rounded-2xl p-5 bg-white border border-gray-100 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Total Sampah</h3>
                        <div className="flex items-baseline gap-1 mt-1">
                          <span className="text-3xl font-black text-gray-900">15</span>
                          <span className="text-sm font-semibold text-gray-400">kg</span>
                        </div>
                        <p className="text-[11px] text-emerald-600 font-medium mt-1 flex items-center gap-1">
                          <TrendingUp className="w-3.5 h-3.5" />Naik 12% dari bulan lalu
                        </p>
                      </div>
                      <div className="relative w-20 h-20">
                        <svg className="w-20 h-20 -rotate-90" viewBox="0 0 80 80">
                          <circle cx="40" cy="40" r={radius} fill="none" stroke="#f0f5f0" strokeWidth="8" />
                          <circle cx="40" cy="40" r={radius} fill="none" stroke="#3B6D11" strokeWidth="8"
                            strokeDasharray={`${dashLength} ${circumference - dashLength}`}
                            strokeDashoffset={dashOffset} strokeLinecap="round" />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-sm font-black text-gray-800">{donutPercent}%</span>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <div className="flex justify-between items-center">
                        <span className="text-[11px] font-medium text-gray-500">Target Bulanan</span>
                        <span className="text-[11px] font-bold text-emerald-700">15/20 kg</span>
                      </div>
                      <div className="h-2.5 bg-emerald-50 rounded-full overflow-hidden">
                        <div className="h-full rounded-full transition-all duration-1000"
                          style={{ width: '75%', background: 'linear-gradient(90deg, #3B6D11, #1E5631)' }} />
                      </div>
                    </div>
                  </div>

                  <div className="rounded-2xl p-4 relative overflow-hidden cursor-pointer group"
                    style={{ background: 'linear-gradient(135deg, #f0f5f0 0%, #e8f0e5 100%)' }}>
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shrink-0 shadow-sm">
                        <Recycle className="w-5 h-5 text-emerald-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-bold text-emerald-800">Tips Hari Ini</h4>
                        <p className="text-xs text-emerald-700/70 mt-0.5 leading-relaxed">
                          Pisahkan botol plastik dan kardus bekas. Bilas bersih sebelum disetor ke Bank Sampah terdekat!
                        </p>
                      </div>
                      <ChevronRight className="w-4 h-4 text-emerald-400 mt-1 shrink-0 group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </div>

                </div>

                {/* Bottom Nav */}
                <div className="absolute bottom-0 left-0 right-0 bg-white/90 backdrop-blur-lg border-t border-gray-100 px-3 pb-6 pt-2">
                  <div className="flex items-center justify-around relative">
                    {navItems.map((item, idx) => {
                      if (item.isFab) {
                        return (
                          <div key={idx} className="relative -mt-8">
                            <button className="w-14 h-14 rounded-full flex items-center justify-center shadow-lg text-white transition-transform hover:scale-105 active:scale-95 cursor-pointer"
                              style={{ background: 'linear-gradient(135deg, #1E5631, #3B6D11)' }}>
                              <Camera className="w-6 h-6" />
                            </button>
                          </div>
                        );
                      }
                      if (!item.id) {
                        const Icon = item.icon;
                        return (
                          <button key={idx} className="flex flex-col items-center gap-0.5 py-1 px-3 cursor-pointer group">
                            <Icon className="w-5 h-5 text-gray-400 group-hover:text-gray-600 transition-colors" />
                            <span className="text-[9px] font-medium text-gray-400 group-hover:text-gray-600 transition-colors">{item.label}</span>
                          </button>
                        );
                      }
                      const Icon = item.icon;
                      const isActive = screen === item.id;
                      return (
                        <button key={idx} onClick={() => setScreen(item.id)}
                          className="flex flex-col items-center gap-0.5 py-1 px-3 cursor-pointer group">
                          <Icon className={`w-5 h-5 transition-colors ${isActive ? 'text-emerald-600' : 'text-gray-400 group-hover:text-gray-600'}`} />
                          <span className={`text-[9px] font-medium transition-colors ${isActive ? 'text-emerald-600 font-bold' : 'text-gray-400 group-hover:text-gray-600'}`}>
                            {item.label}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* =============== STATS =============== */}
            {screen === 'stats' && (
              <div className="absolute inset-0 bg-white overflow-y-auto" style={{ scrollbarWidth: 'none' }}>
                <div className="px-5 pt-12 pb-24 space-y-5">

                  <div className="flex items-center gap-3">
                    <button onClick={() => setScreen('home')}
                      className="p-1.5 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer">
                      <ChevronLeft className="w-5 h-5 text-gray-600" />
                    </button>
                    <div>
                      <h2 className="text-lg font-bold text-gray-900">Statistik</h2>
                      <span className="text-xs text-gray-400">Laporan sampah Anda</span>
                    </div>
                  </div>

                  <div className="rounded-2xl p-5 text-white relative overflow-hidden"
                    style={{ background: 'linear-gradient(135deg, #1E5631 0%, #3B6D11 100%)' }}>
                    <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/3" />
                    <div className="relative z-10">
                      <div className="flex items-center gap-2 mb-2">
                        <Trash2 className="w-4 h-4 text-white/70" />
                        <span className="text-xs font-medium text-white/70">Total Sampah Terkumpul</span>
                      </div>
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-4xl font-black tracking-tight">15</span>
                        <span className="text-lg font-semibold text-white/70">kg</span>
                      </div>
                      <p className="text-xs text-white/60 mt-2">Sepanjang bulan Juli 2026</p>
                    </div>
                  </div>

                  <div className="rounded-2xl p-5 bg-white border border-gray-100 shadow-sm">
                    <div className="flex items-center justify-between mb-5">
                      <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Minggu Ini</h3>
                      <span className="text-[10px] font-medium text-emerald-600 flex items-center gap-1">
                        +0.8 kg <TrendingUp className="w-3 h-3" />
                      </span>
                    </div>
                    <div className="flex items-end justify-between gap-2" style={{ height: '120px' }}>
                      {barData.map((d) => {
                        const h = (d.value / maxValue) * 100;
                        return (
                          <div key={d.day} className="flex flex-col items-center gap-1.5 flex-1">
                            <span className="text-[9px] font-semibold text-gray-500">{d.value}kg</span>
                            <div className="w-full rounded-lg relative overflow-hidden" style={{ height: '80px', background: 'linear-gradient(to top, transparent, #f0f5f0)', borderRadius: '6px' }}>
                              <div className="absolute bottom-0 left-0 right-0 rounded-lg transition-all duration-700"
                                style={{ height: `${h}%`, background: `linear-gradient(to top, ${h > 70 ? '#1E5631' : '#3B6D11'}, ${h > 50 ? '#3B6D11' : '#6BA04A'})`, borderRadius: '6px 6px 0 0' }} />
                            </div>
                            <span className="text-[9px] font-medium text-gray-400">{d.day}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 px-1">Rincian Sampah</h3>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="rounded-2xl p-4 bg-emerald-50 border border-emerald-100">
                        <div className="w-8 h-8 rounded-lg bg-emerald-200 flex items-center justify-center mb-3">
                          <Droplets className="w-4 h-4 text-emerald-700" />
                        </div>
                        <span className="text-xs font-medium text-emerald-700">Organik</span>
                        <div className="flex items-baseline gap-1 mt-1">
                          <span className="text-2xl font-black text-emerald-800">10</span>
                          <span className="text-xs font-semibold text-emerald-600">kg</span>
                        </div>
                        <p className="text-[10px] text-emerald-600/70 mt-1">Sisa makanan, daun</p>
                      </div>
                      <div className="rounded-2xl p-4 bg-blue-50 border border-blue-100">
                        <div className="w-8 h-8 rounded-lg bg-blue-200 flex items-center justify-center mb-3">
                          <Recycle className="w-4 h-4 text-blue-700" />
                        </div>
                        <span className="text-xs font-medium text-blue-700">Anorganik</span>
                        <div className="flex items-baseline gap-1 mt-1">
                          <span className="text-2xl font-black text-blue-800">5</span>
                          <span className="text-xs font-semibold text-blue-600">kg</span>
                        </div>
                        <p className="text-[10px] text-blue-600/70 mt-1">Plastik, kardus, kaca</p>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <div className="rounded-xl p-3 bg-white border border-gray-100 text-center">
                      <span className="text-lg font-black text-gray-800">12</span>
                      <p className="text-[9px] text-gray-400 font-medium mt-0.5">Laporan</p>
                    </div>
                    <div className="rounded-xl p-3 bg-white border border-gray-100 text-center">
                      <span className="text-lg font-black text-gray-800">8</span>
                      <p className="text-[9px] text-gray-400 font-medium mt-0.5">Setoran</p>
                    </div>
                    <div className="rounded-xl p-3 bg-white border border-gray-100 text-center">
                      <span className="text-lg font-black text-amber-600">3</span>
                      <p className="text-[9px] text-gray-400 font-medium mt-0.5">Reward</p>
                    </div>
                  </div>

                </div>

                {/* Bottom Nav */}
                <div className="absolute bottom-0 left-0 right-0 bg-white/90 backdrop-blur-lg border-t border-gray-100 px-3 pb-6 pt-2">
                  <div className="flex items-center justify-around relative">
                    {navItems.map((item, idx) => {
                      if (item.isFab) {
                        return (
                          <div key={idx} className="relative -mt-8">
                            <button className="w-14 h-14 rounded-full flex items-center justify-center shadow-lg text-white transition-transform hover:scale-105 active:scale-95 cursor-pointer"
                              style={{ background: 'linear-gradient(135deg, #1E5631, #3B6D11)' }}>
                              <Camera className="w-6 h-6" />
                            </button>
                          </div>
                        );
                      }
                      if (!item.id) {
                        const Icon = item.icon;
                        return (
                          <button key={idx} className="flex flex-col items-center gap-0.5 py-1 px-3 cursor-pointer group">
                            <Icon className="w-5 h-5 text-gray-400 group-hover:text-gray-600 transition-colors" />
                            <span className="text-[9px] font-medium text-gray-400 group-hover:text-gray-600 transition-colors">{item.label}</span>
                          </button>
                        );
                      }
                      const Icon = item.icon;
                      const isActive = screen === item.id;
                      return (
                        <button key={idx} onClick={() => setScreen(item.id)}
                          className="flex flex-col items-center gap-0.5 py-1 px-3 cursor-pointer group">
                          <Icon className={`w-5 h-5 transition-colors ${isActive ? 'text-emerald-600' : 'text-gray-400 group-hover:text-gray-600'}`} />
                          <span className={`text-[9px] font-medium transition-colors ${isActive ? 'text-emerald-600 font-bold' : 'text-gray-400 group-hover:text-gray-600'}`}>
                            {item.label}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

          </div>

          {/* Home Indicator */}
          {screen !== 'splash' && (
            <div className="absolute bottom-1 left-1/2 -translate-x-1/2 z-50">
              <div className="w-[134px] h-[5px] bg-gray-300 rounded-full" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}