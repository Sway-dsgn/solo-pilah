import React, { useState } from 'react';
import logo from '../../logo.png';
import { Lock, Mail, UserCheck, Shield, HelpCircle, ArrowRight, ChevronDown, MapPin } from 'lucide-react';
import { UserRole } from '../types';
import { CITIES } from '../cities';

interface LoginProps {
  onLogin: (role: UserRole) => void;
  isWireframe: boolean;
  selectedRole: UserRole;
  setSelectedRole: (role: UserRole) => void;
  city: any;
  onCityChange: (id: string) => void;
}

export default function Login({ onLogin, isWireframe, selectedRole, setSelectedRole, city, onCityChange }: LoginProps) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [fullName, setFullName] = useState('');
  const [registered, setRegistered] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isSignUp) {
      setRegistered(true);
      setIsSignUp(false);
      return;
    }
    onLogin(selectedRole);
  };

  const rolesList: { id: UserRole; label: string; desc: string; icon: any }[] = [
    {
      id: 'Masyarakat',
      label: 'Masyarakat',
      desc: `Warga ${city.shortName} pelapor & pemilah sampah`,
      icon: UserCheck
    },
    {
      id: 'Petugas',
      label: `Petugas ${city.wasteDeptAbbr.split(' ')[0]}`,
      desc: 'Tim pengangkut & pembersih sampah',
      icon: Shield
    },
    {
      id: 'BankSampah',
      label: 'Pengelola Bank',
      desc: 'Admin depo penampung & juri poin',
      icon: HelpCircle
    }
  ];

  return (
    <div className={`flex-1 flex flex-col p-6 overflow-y-auto ${isWireframe ? 'bg-white text-gray-800' : 'bg-white'}`}>
      {/* Branding */}
      <div className="text-center my-6">
        <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-emerald-50 mb-3 border border-emerald-100">
          <img src={logo} alt="Solo Pilah" className="w-10 h-10 object-contain" />
        </div>
        <h1 className="text-xl font-extrabold font-display tracking-tight text-gray-900">{city.appName}</h1>
        <p className="text-xs text-gray-500 mt-1">{city.description}</p>
      </div>

      {/* City Selector */}
      <div className="mb-4 shadow-soft rounded-xl p-3 bg-white">
        <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2.5">
          Pilih Daerah:
        </label>
        <select
          onChange={(e) => onCityChange(e.target.value)}
          value={city.id}
          className={`w-full p-3 text-xs font-bold rounded-xl border focus:outline-none focus:ring-2 appearance-none cursor-pointer bg-white shadow-soft ${
            isWireframe
              ? 'border-gray-400 focus:ring-gray-800'
              : 'border-gray-200 focus:ring-emerald-500/30 focus:border-emerald-500 text-gray-700'
          }`}
        >
          {CITIES.map((c: any) => (
            <option key={c.id} value={c.id}>
              {c.name} ({c.shortName})
            </option>
          ))}
        </select>
      </div>

      {/* Role Selector */}
      <div className="mb-6 shadow-soft rounded-xl p-3 bg-white">
        <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2.5">
          Pilih Peran Simulasi Anda:
        </label>
        <div className="grid grid-cols-3 gap-3">
          {rolesList.map((r) => {
            const Icon = r.icon;
            const isSelected = selectedRole === r.id;
            return (
              <button
                key={r.id}
                type="button"
                onClick={() => setSelectedRole(r.id)}
                className={`card-hover p-2.5 rounded-xl border flex flex-col items-center justify-center text-center cursor-pointer transition-all ${
                  isSelected
                    ? isWireframe
                      ? 'border-2 border-black bg-gray-100 font-bold'
                      : 'border-emerald-500 bg-emerald-50 text-emerald-700 ring-2 ring-emerald-500/20 shadow-sm'
                    : 'border-gray-100 bg-white text-gray-500 hover:border-gray-200 hover:shadow-sm'
                }`}
              >
                <Icon className={`w-4 h-4 mb-1.5 ${isSelected && !isWireframe ? 'text-emerald-600' : 'text-gray-400'}`} />
                <span className="text-[10px] font-bold block truncate w-full">{r.label}</span>
              </button>
            );
          })}
        </div>
        <p className="text-[10px] text-gray-400 mt-2 text-center italic">
          *Dashboard & menu akan otomatis menyesuaikan peran terpilih.
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4 flex-1">
        {isSignUp && (
          <div className="space-y-1.5">
            <label className="block text-[10px] font-bold text-gray-500 uppercase">Nama Lengkap</label>
            <input
              type="text" required placeholder="Ahmad Fauzi"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className={`w-full py-2.5 px-3 text-xs rounded-xl border focus:outline-none focus:ring-2 ${
                isWireframe ? 'border-gray-400 focus:ring-gray-800' : 'border-gray-200 focus:ring-emerald-500/20 focus:border-emerald-500 bg-gray-50/30'
              }`}
            />
          </div>
        )}

        <div className="space-y-1.5">
          <label className="block text-[10px] font-bold text-gray-500 uppercase">Email / Nomor HP</label>
          <div className="relative">
            <Mail className="absolute left-3.5 top-3 w-4 h-4 text-gray-400" />
            <input
              type="text" required
              placeholder="nama@email.com / 0812xxxx"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full py-2.5 pl-10 pr-3 text-xs rounded-xl border focus:outline-none focus:ring-2 ${
                isWireframe ? 'border-gray-400 focus:ring-gray-800' : 'border-gray-200 focus:ring-emerald-500/20 focus:border-emerald-500 bg-gray-50/30'
              }`}
            />
          </div>
        </div>

        {isSignUp && (
          <div className="space-y-1.5">
            <label className="block text-[10px] font-bold text-gray-500 uppercase">Nomor HP</label>
            <div className="relative">
              <input
                type="tel" required
                placeholder="0812-3456-7890"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className={`w-full py-2.5 px-3 text-xs rounded-xl border focus:outline-none focus:ring-2 ${
                  isWireframe ? 'border-gray-400 focus:ring-gray-800' : 'border-gray-200 focus:ring-emerald-500/20 focus:border-emerald-500 bg-gray-50/30'
                }`}
              />
            </div>
          </div>
        )}

        <div className="space-y-1.5">
          <div className="flex justify-between items-center">
            <label className="block text-[10px] font-bold text-gray-500 uppercase">Password</label>
            {!isSignUp && (
              <button type="button" className="text-[10px] text-emerald-600 hover:underline font-bold">Lupa?</button>
            )}
          </div>
          <div className="relative">
            <Lock className="absolute left-3.5 top-3 w-4 h-4 text-gray-400" />
            <input
              type="password" required
              placeholder="Masukkan password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full py-2.5 pl-10 pr-3 text-xs rounded-xl border focus:outline-none focus:ring-2 ${
                isWireframe ? 'border-gray-400 focus:ring-gray-800' : 'border-gray-200 focus:ring-emerald-500/20 focus:border-emerald-500 bg-gray-50/30'
              }`}
            />
          </div>
        </div>

        <button type="submit"
          className={`w-full py-3.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
            isWireframe ? 'bg-gray-900 text-white hover:bg-gray-800 border-2 border-black' : 'bg-emerald-500 hover:bg-emerald-600 text-white'
          }`}
        >
          {isSignUp ? "Daftar" : "Masuk"}
          <ArrowRight className="w-4 h-4" />
        </button>
      </form>

      {registered && (
        <div className="mt-4 text-center text-[10px] text-emerald-600 font-bold bg-emerald-50 p-2 rounded-xl border border-emerald-100">
          Akun berhasil dibuat! Silakan masuk.
        </div>
      )}

      <div className="mt-6 pt-4 border-t border-gray-100 text-center">
        <p className="text-[10px] text-gray-500 mb-2">Punya Akun?</p>
        <button onClick={() => { setIsSignUp(!isSignUp); setRegistered(false); }}
          className={`text-[11px] font-bold transition-all ${
            isWireframe ? 'text-gray-900 hover:underline' : 'text-emerald-600 hover:text-emerald-700'
          }`}
        >
          {isSignUp ? "Ya, Masuk" : "Tidak, Daftar Sekarang"}
        </button>
      </div>
    </div>
  );
}
