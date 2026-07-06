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
        <div className="absolute inset-x-0 top-0 bottom-0 bg-black/50 z-40 flex flex-col justify-start">
          <div className={`p-4 bg-white rounded-b-3xl border-b-2 max-h-[75%] overflow-y-auto phone-scroll space-y-3.5 animate-in slide-in-from-top duration-300 ${
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
          isWireframe={isWireframe}
          onLogout={handleLogout}
          city={city}
        />
      )}
    </>
  );

  const bottomNav = currentScreen !== 'onboarding' && currentScreen !== 'login' && (
    <div className={`fixed bottom-0 left-0 right-0 border-t flex justify-around items-center shrink-0 z-50 min-h-[52px] ${
      isWireframe ? 'bg-white border-gray-400' : 'bg-white border-gray-100'
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
            className={`flex flex-col items-center justify-center py-1 px-2 rounded-lg cursor-pointer transition-all ${
              isTabActive ? 'scale-110 font-bold' : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            <Icon className={`w-[18px] h-[18px] ${isTabActive ? activeColor : 'text-gray-400'}`} />
            <span className={`text-[8px] mt-0.5 leading-none block ${
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
