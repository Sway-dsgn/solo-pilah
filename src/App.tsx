import React, { useState, useEffect } from 'react';
import { getCity, generateProfiles, CITIES } from './cities';
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
import Edukasi from './components/Edukasi';

import {
  Home,
  Camera,
  User,
  Bell,
  Award,
  Scan as ScanIcon,
  X,
  MapPin
} from 'lucide-react';

export default function App() {
  const [isWireframe, setIsWireframe] = useState<boolean>(false);
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('onboarding');
  const [selectedRole, setSelectedRole] = useState<UserRole>('Masyarakat');
  const [selectedCityId, setSelectedCityId] = useState<string>('surakarta');

  const city = getCity(selectedCityId);
  const profiles = generateProfiles(city);
  const [profile, setProfile] = useState<UserProfile>(profiles['Masyarakat']);
  const [reports, setReports] = useState<WasteReport[]>(city.initialReports);
  const [showNotifications, setShowNotifications] = useState<boolean>(false);

  useEffect(() => {
    const p = generateProfiles(getCity(selectedCityId));
    setProfile(p[selectedRole]);
  }, [selectedRole, selectedCityId]);

  useEffect(() => {
    setReports(getCity(selectedCityId).initialReports);
  }, [selectedCityId]);

  const handleRestart = () => {
    setCurrentScreen('onboarding');
    setReports(getCity(selectedCityId).initialReports);
    setShowNotifications(false);
  };

  const handleLogin = (role: UserRole) => {
    setSelectedRole(role);
    setCurrentScreen('dashboard');
  };

  const handleLogout = () => {
    setCurrentScreen('login');
  };

  const mockNotifications = [
    {
      id: 1,
      title: `Truk Organik Tiba di ${city.districts[0]}`,
      desc: `Truk pengangkut sampah organik meluncur menuju ${city.districts[0]}. Persiapkan sampah terpilah Anda!`,
      time: "10 mnt lalu",
      category: "Jadwal"
    },
    {
      id: 2,
      title: `Laporan ${city.districts[1]} Terselesaikan`,
      desc: `Tumpukan sampah selesai dibersihkan oleh Petugas ${city.defaultProfiles.Petugas.name}. +150 pts ditambahkan!`,
      time: "2 jam lalu",
      category: "Laporan"
    },
    {
      id: 3,
      title: `Krisis ${city.tpaName} Siaga`,
      desc: `Imbauan ${city.wasteDeptAbbr}: Pilah sampah dapur organik untuk menekan pelepasan gas metana penyebab kebakaran sampah.`,
      time: "1 hari lalu",
      category: "Edukasi"
    }
  ];

  // Shared screen content
  const screenRoutes = (
    <>
      {showNotifications && (
        <div className="absolute inset-x-0 top-0 bottom-0 z-40 flex flex-col justify-start animate-in slide-in-from-top duration-200" onClick={() => setShowNotifications(false)}>
          <div className={`p-5 bg-white rounded-b-3xl border-b-2 max-h-[75%] overflow-y-auto phone-scroll space-y-4 shadow-card ${
            isWireframe ? 'border-black' : 'border-emerald-500'
          }`} onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className={`p-1.5 rounded-lg ${isWireframe ? 'bg-gray-100 border border-gray-300' : 'bg-emerald-50'}`}>
                  <Bell className={`w-4 h-4 ${isWireframe ? 'text-gray-800' : 'text-emerald-600'}`} />
                </div>
                <div>
                  <h4 className="text-xs font-extrabold font-display text-gray-800 leading-none">Notifikasi</h4>
                  <span className="text-[9px] text-gray-400">{mockNotifications.length} pesan baru</span>
                </div>
              </div>
              <button onClick={() => setShowNotifications(false)}
                className={`p-1.5 rounded-lg transition-all cursor-pointer hover:bg-gray-100 text-gray-400`}>
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2.5">
              {mockNotifications.map((n, idx) => {
                const catColors: Record<string, string> = {
                  Jadwal: 'border-l-emerald-400 bg-emerald-50/30',
                  Laporan: 'border-l-blue-400 bg-blue-50/30',
                  Edukasi: 'border-l-amber-400 bg-amber-50/30',
                };
                const catDot: Record<string, string> = {
                  Jadwal: 'bg-emerald-500',
                  Laporan: 'bg-blue-500',
                  Edukasi: 'bg-amber-500',
                };
                return (
                  <div key={n.id}
                    className={`p-3.5 rounded-xl border text-[10.5px] space-y-1.5 border-l-4 transition-all hover:translate-x-0.5 card-hover anim-fade-in-up ${
                      isWireframe ? 'border-gray-300 bg-white border-l-gray-500' : `${catColors[n.category] || 'bg-gray-50 border-gray-100 border-l-gray-300'}`
                    }`}
                    style={{ animationDelay: `${idx * 50}ms`, animationFillMode: 'backwards' }}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <span className={`w-1.5 h-1.5 rounded-full ${isWireframe ? 'bg-gray-500' : catDot[n.category] || 'bg-gray-400'}`} />
                        <span className={`text-[8px] font-bold ${isWireframe ? 'text-gray-600' : 'text-gray-500'}`}>{n.category}</span>
                      </div>
                      <span className="text-[8px] text-gray-400">{n.time}</span>
                    </div>
                    <h5 className="font-extrabold text-gray-800 font-display text-[11px]">{n.title}</h5>
                    <p className="text-[9.5px] text-gray-500 leading-relaxed">{n.desc}</p>
                  </div>
                );
              })}
            </div>

            <button onClick={() => { setShowNotifications(false); setCurrentScreen('schedule'); }}
              className={`w-full py-3 text-[10px] font-extrabold text-white rounded-xl transition-all text-center block cursor-pointer btn-press ${
                isWireframe ? 'bg-gray-900 border-2 border-black hover:bg-gray-800' : 'bg-emerald-500 hover:bg-emerald-600'
              }`}>
              Lihat Jadwal Pengangkutan
            </button>
          </div>
          <div className="flex-1" onClick={() => setShowNotifications(false)} />
        </div>
      )}

      {currentScreen === 'onboarding' && (
        <Onboarding
          onComplete={() => setCurrentScreen('login')}
          isWireframe={isWireframe}
          city={city}
          onCityChange={setSelectedCityId}
        />
      )}

      {currentScreen === 'login' && (
        <Login
          onLogin={handleLogin}
          isWireframe={isWireframe}
          selectedRole={selectedRole}
          setSelectedRole={setSelectedRole}
          city={city}
          onCityChange={setSelectedCityId}
        />
      )}

      {currentScreen === 'dashboard' && (
        <Dashboard
          profile={profile}
          setProfile={setProfile}
          isWireframe={isWireframe}
          onNavigate={setCurrentScreen}
          onOpenNotifications={() => setShowNotifications(true)}
          city={city}
        />
      )}

      {currentScreen === 'schedule' && (
        <Schedule isWireframe={isWireframe} city={city} />
      )}

      {currentScreen === 'map' && (
        <MapScreen isWireframe={isWireframe} city={city} />
      )}

      {currentScreen === 'guide' && (
        <Guide isWireframe={isWireframe} city={city} />
      )}

      {currentScreen === 'report' && (
        <Report
          isWireframe={isWireframe}
          reports={reports}
          setReports={setReports}
          userRole={selectedRole}
          city={city}
        />
      )}

      {currentScreen === 'scan' && (
        <Scan
          profile={profile}
          setProfile={setProfile}
          isWireframe={isWireframe}
          onNavigate={setCurrentScreen}
          city={city}
        />
      )}

      {currentScreen === 'rewards' && (
        <Rewards
          profile={profile}
          setProfile={setProfile}
          isWireframe={isWireframe}
          city={city}
        />
      )}

      {currentScreen === 'profile' && (
        <Profile
          profile={profile}
          setProfile={setProfile}
          isWireframe={isWireframe}
          onLogout={handleLogout}
          onNavigate={setCurrentScreen}
          city={city}
        />
      )}

      {currentScreen === 'edukasi' && (
        <Edukasi
          isWireframe={isWireframe}
          city={city}
          onClose={() => setCurrentScreen('dashboard')}
        />
      )}
    </>
  );

  const bottomNav = currentScreen !== 'onboarding' && currentScreen !== 'login' && (
    <div className={`fixed bottom-0 left-0 right-0 border-t flex justify-around items-center shrink-0 z-50 min-h-[58px] shadow-nav ${
      isWireframe ? 'bg-white border-gray-400' : 'glass bg-white/95 border-gray-100/80'
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
            className={`flex flex-col items-center justify-center py-1.5 px-3 rounded-lg cursor-pointer transition-all relative ${
              isTabActive ? '' : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            {isTabActive && (
              <span className={`absolute -top-0.5 left-1/2 -translate-x-1/2 w-6 h-0.5 rounded-full ${isWireframe ? 'bg-gray-800' : activeColor}`} />
            )}
            <Icon className={`w-[18px] h-[18px] transition-all ${isTabActive ? activeColor : 'text-gray-400'}`} />
            <span className={`text-[8px] mt-0.5 leading-none block font-bold transition-all ${
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
    <div className="flex flex-col h-screen bg-white font-sans">
      <div className={`flex-1 flex flex-col min-h-0 relative ${currentScreen !== 'onboarding' && currentScreen !== 'login' ? 'pb-[52px]' : ''}`}>
        {screenRoutes}
      </div>
      {bottomNav}
    </div>
  );
}
