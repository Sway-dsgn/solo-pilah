import React, { useState, useEffect } from 'react';
import { DEFAULT_PROFILES } from './data';
import { UserRole, ScreenType, WasteReport, UserProfile } from './types';
import Onboarding from './components/Onboarding';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Scan from './components/Scan';
import Schedule from './components/Schedule';
import MapScreen from './components/Map';
import Guide from './components/Guide';
import Report from './components/Report';
import Rewards from './components/Rewards';
import Profile from './components/Profile';
import DesignSystem from './components/DesignSystem';
import { INITIAL_REPORTS } from './data';

import {
  Smartphone,
  Eye,
  RefreshCw,
  Home,
  Calendar,
  Camera,
  MapPin,
  User,
  Wifi,
  Battery,
  Bell,
  Sparkles,
  ArrowRight,
  Compass,
  CheckCircle,
  Award,
  BookOpen,
  Info,
  Layers,
  Leaf,
  Scan as ScanIcon,
  ClipboardList,
  X
} from 'lucide-react';

export default function App() {
  const [isWireframe, setIsWireframe] = useState<boolean>(false);
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('onboarding');
  const [selectedRole, setSelectedRole] = useState<UserRole>('Masyarakat');
  const [profile, setProfile] = useState<UserProfile>(DEFAULT_PROFILES['Masyarakat']);
  const [reports, setReports] = useState<WasteReport[]>(INITIAL_REPORTS);
  const [showNotifications, setShowNotifications] = useState<boolean>(false);

  // Synchronize profile state when role changes from desktop sidebar or login role selection
  useEffect(() => {
    setProfile(DEFAULT_PROFILES[selectedRole]);
  }, [selectedRole]);

  // Restart the prototype flow
  const handleRestart = () => {
    setCurrentScreen('onboarding');
    setReports(INITIAL_REPORTS);
    setShowNotifications(false);
  };

  const handleLogin = (role: UserRole) => {
    setSelectedRole(role);
    setCurrentScreen('dashboard');
  };

  const handleLogout = () => {
    setCurrentScreen('login');
  };

  // Mock notifications to display in sheet
  const mockNotifications = [
    {
      id: 1,
      title: "Truk Organik Segera Tiba",
      desc: "Truk pengangkut sampah organik meluncur menuju Jebres Utara. Persiapkan sampah terpilah Anda!",
      time: "10 mnt lalu",
      category: "Jadwal"
    },
    {
      id: 2,
      title: "Laporan UNS Terselesaikan",
      desc: "Tumpukan sampah plastik parit di belakang UNS selesai dibersihkan oleh Petugas Budi Santoso. +150 pts ditambahkan!",
      time: "2 jam lalu",
      category: "Laporan"
    },
    {
      id: 3,
      title: "Krisis Putri Cempo Siaga",
      desc: "Imbauan DLH Surakarta: Pilah sampah dapur organik untuk menekan pelepasan gas metana penyebab kebakaran sampah.",
      time: "1 hari lalu",
      category: "Edukasi"
    }
  ];

  // Shared screen content
  const screenRoutes = (
    <>
      {showNotifications && (
        <div className="absolute inset-x-0 top-0 bottom-14 bg-black/50 z-50 flex flex-col justify-start">
          <div className={`p-4 bg-white rounded-b-3xl border-b-2 shadow-2xl max-h-[75%] overflow-y-auto phone-scroll space-y-3.5 animate-in slide-in-from-top duration-300 ${
            isWireframe ? 'border-black' : 'border-emerald-500'
          }`}>
            <div className="flex justify-between items-center">
              <h4 className="text-xs font-black font-display text-gray-800 flex items-center gap-1.5">
                <Bell className="w-4 h-4 text-emerald-500" />
                Kotak Masuk Notifikasi ({mockNotifications.length})
              </h4>
              <button
                onClick={() => setShowNotifications(false)}
                className="text-gray-400 hover:text-gray-600 font-bold text-xs p-1"
              >
                Tutup <X className="w-3 h-3" />
              </button>
            </div>

            <div className="space-y-2.5">
              {mockNotifications.map((n) => (
                <div
                  key={n.id}
                  className={`p-3 rounded-xl border text-[10.5px] space-y-1 ${
                    isWireframe ? 'border-gray-300 bg-white' : 'bg-gray-50 border-gray-100'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <span className={`text-[8px] font-bold px-1.5 py-0.5 rounded ${
                      isWireframe
                        ? 'bg-gray-200'
                        : n.category === 'Jadwal'
                        ? 'bg-emerald-100 text-emerald-800'
                        : n.category === 'Laporan'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}>
                      {n.category}
                    </span>
                    <span className="text-[8px] text-gray-400">{n.time}</span>
                  </div>
                  <h5 className="font-bold text-gray-800 font-display">{n.title}</h5>
                  <p className="text-[9.5px] text-gray-500 leading-normal">{n.desc}</p>
                </div>
              ))}
            </div>

            <button
              onClick={() => {
                setShowNotifications(false);
                setCurrentScreen('schedule');
              }}
              className={`w-full py-2.5 text-[10px] font-bold text-white rounded-lg transition-all text-center block ${
                isWireframe ? 'bg-gray-900 border border-black' : 'bg-emerald-500 hover:bg-emerald-600'
              }`}
            >
              Buka Rencana Pengangkutan
            </button>
          </div>
        </div>
      )}

      {currentScreen === 'onboarding' && (
        <Onboarding onComplete={() => setCurrentScreen('login')} isWireframe={isWireframe} />
      )}

      {currentScreen === 'login' && (
        <Login
          onLogin={handleLogin}
          isWireframe={isWireframe}
          selectedRole={selectedRole}
          setSelectedRole={setSelectedRole}
        />
      )}

      {currentScreen === 'dashboard' && (
        <Dashboard
          profile={profile}
          isWireframe={isWireframe}
          onNavigate={setCurrentScreen}
          onOpenNotifications={() => setShowNotifications(true)}
        />
      )}

      {currentScreen === 'schedule' && (
        <Schedule isWireframe={isWireframe} />
      )}

      {currentScreen === 'map' && (
        <MapScreen isWireframe={isWireframe} />
      )}

      {currentScreen === 'guide' && (
        <Guide isWireframe={isWireframe} />
      )}

      {currentScreen === 'report' && (
        <Report
          isWireframe={isWireframe}
          reports={reports}
          setReports={setReports}
          userRole={selectedRole}
        />
      )}

      {currentScreen === 'scan' && (
        <Scan
          profile={profile}
          setProfile={setProfile}
          isWireframe={isWireframe}
          onNavigate={setCurrentScreen}
        />
      )}

      {currentScreen === 'rewards' && (
        <Rewards profile={profile} setProfile={setProfile} isWireframe={isWireframe} />
      )}

      {currentScreen === 'profile' && (
        <Profile profile={profile} isWireframe={isWireframe} onLogout={handleLogout} />
      )}
    </>
  );

  const bottomNav = currentScreen !== 'onboarding' && currentScreen !== 'login' && (
    <div className={`h-16 border-t flex justify-around items-center px-2 pb-2 shrink-0 z-40 ${
      isWireframe ? 'bg-white border-gray-400' : 'bg-white border-gray-100 shadow-xl'
    }`}>
      {[
        { id: 'dashboard', label: 'Beranda', icon: Home },
        { id: 'scan', label: 'Scan', icon: ScanIcon },
        { id: 'rewards', label: 'Reward', icon: Award },
        { id: 'report', label: 'Lapor', icon: Camera },
        { id: 'profile', label: 'Profil', icon: User },
      ].map((tab) => {
        const Icon = tab.icon;
        const isTabActive = currentScreen === tab.id || (tab.id === 'report' && currentScreen === 'history');
        const activeColor = isWireframe
          ? 'text-black'
          : tab.id === 'report'
          ? 'text-red-500'
          : tab.id === 'scan'
          ? 'text-amber-500'
          : tab.id === 'rewards'
          ? 'text-teal-600'
          : selectedRole === 'Masyarakat'
          ? 'text-emerald-600'
          : selectedRole === 'Petugas'
          ? 'text-blue-600'
          : 'text-indigo-600';

        return (
          <button
            key={tab.id}
            onClick={() => {
              setCurrentScreen(tab.id as ScreenType);
              setShowNotifications(false);
            }}
            className={`flex flex-col items-center justify-center py-1.5 px-3 rounded-lg cursor-pointer transition-all ${
              isTabActive ? 'scale-110 font-bold' : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            <Icon className={`w-5 h-5 ${isTabActive ? activeColor : 'text-gray-400'}`} />
            <span className={`text-[9px] mt-0.5 leading-none block ${
              isTabActive ? isWireframe ? 'text-black' : 'text-gray-800' : 'text-gray-400'
            }`}>
              {tab.label}
            </span>
          </button>
        );
      })}
    </div>
  );

  return (
    <>
      {/* DESKTOP: smartphone mockup */}
      <div className="hidden lg:flex min-h-screen bg-black flex-col items-center justify-center p-6 font-sans">
        <div className="w-full max-w-md flex flex-col items-center justify-center shrink-0">
          <div className="w-[370px] h-[760px] bg-slate-900 rounded-[50px] p-4 shadow-2xl relative border-4 border-slate-800 flex flex-col select-none ring-12 ring-slate-950/20">
            <div className="absolute left-[-6px] top-32 w-1.5 h-12 bg-slate-800 rounded-l-md"></div>
            <div className="absolute left-[-6px] top-48 w-1.5 h-12 bg-slate-800 rounded-l-md"></div>
            <div className="absolute right-[-6px] top-40 w-1.5 h-16 bg-slate-800 rounded-r-md"></div>

            <div className="w-full h-full bg-white rounded-[38px] overflow-hidden flex flex-col relative border border-slate-950">
              <div className={`h-11 px-6 pt-3 flex justify-between items-center text-[10px] font-bold z-50 shrink-0 ${
                isWireframe ? 'bg-white text-gray-900 border-b border-gray-200' : 'bg-white text-gray-800'
              }`}>
                <span>09:41</span>
                <div className="w-24 h-4.5 bg-black rounded-full absolute left-1/2 -translate-x-1/2 top-2.5 flex items-center justify-end px-2.5">
                  <span className="w-1.5 h-1.5 bg-slate-800 rounded-full"></span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Wifi className="w-3 h-3 text-current" />
                  <span className="text-[8px] leading-none">4G</span>
                  <Battery className="w-4 h-4 text-current" />
                </div>
              </div>
              <div className="flex-1 overflow-hidden relative flex flex-col">
                {screenRoutes}
              </div>
              {bottomNav}
            </div>
          </div>
        </div>

        <div className="hidden lg:block mt-6 w-[370px] bg-neutral-900 border border-neutral-800 rounded-2xl p-4 shadow-xl text-neutral-300">
          <h4 className="text-[10px] font-extrabold text-neutral-400 uppercase tracking-widest mb-3 flex items-center gap-1.5">
            <ClipboardList className="w-3.5 h-3.5" /><span>Teks & Alamat untuk Disalin (Selectable)</span>
          </h4>
          <div className="space-y-3.5 text-xs">
            <div>
              <span className="text-[9px] text-neutral-500 font-bold block mb-1">Alamat Laporan 1</span>
              <p className="bg-black p-2 rounded-lg border border-neutral-800 font-mono text-[10.5px] select-all cursor-text leading-relaxed text-emerald-400">
                Jl. Ki Hajar Dewantara, Jebres, Surakarta
              </p>
            </div>
            <div>
              <span className="text-[9px] text-neutral-500 font-bold block mb-1">Alamat Laporan 2</span>
              <p className="bg-black p-2 rounded-lg border border-neutral-800 font-mono text-[10.5px] select-all cursor-text leading-relaxed text-emerald-400">
                Jl. Urip Sumoharjo (Samping Pasar Gede), Jebres
              </p>
            </div>
            <div>
              <span className="text-[9px] text-neutral-500 font-bold block mb-1">Alamat Laporan 3</span>
              <p className="bg-black p-2 rounded-lg border border-neutral-800 font-mono text-[10.5px] select-all cursor-text leading-relaxed text-emerald-400">
                Bantaran Kali Pepe, Sudiroprajan, Jebres
              </p>
            </div>
            <div>
              <span className="text-[9px] text-neutral-500 font-bold block mb-1">Alamat Landmark GPS Lainnya</span>
              <div className="space-y-1.5">
                <p className="bg-black p-2 rounded-lg border border-neutral-800 font-mono text-[10.5px] select-all cursor-text leading-relaxed text-neutral-400">
                  Jl. Slamet Riyadi No. 120, Samping Solo Grand Mall
                </p>
                <p className="bg-black p-2 rounded-lg border border-neutral-800 font-mono text-[10.5px] select-all cursor-text leading-relaxed text-neutral-400">
                  Sekitar Stadion Manahan, Banjarsari
                </p>
              </div>
            </div>
            <div className="border-t border-neutral-800 pt-3">
              <span className="text-[9px] text-neutral-500 font-bold block mb-1 font-mono">Development App URL</span>
              <p className="bg-black p-2 rounded-lg border border-neutral-800 font-mono text-[10px] select-all cursor-text leading-relaxed text-amber-500 break-all">
                https://ais-dev-epca6okqu5j47s4y4mmakb-341368147403.asia-southeast1.run.app
              </p>
            </div>
            <div>
              <span className="text-[9px] text-neutral-500 font-bold block mb-1 font-mono">Shared App URL</span>
              <p className="bg-black p-2 rounded-lg border border-neutral-800 font-mono text-[10px] select-all cursor-text leading-relaxed text-amber-500 break-all">
                https://ais-pre-epca6okqu5j47s4y4mmakb-341368147403.asia-southeast1.run.app
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* MOBILE: fullscreen app */}
      <div className="lg:hidden flex flex-col min-h-screen bg-white font-sans">
        <div className="flex-1 overflow-hidden relative flex flex-col">
          {screenRoutes}
        </div>
        {bottomNav}
      </div>
    </>
  );
}
