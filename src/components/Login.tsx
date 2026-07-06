import React, { useState } from 'react';
import logo from '../../logo.png';
import { Lock, Mail, UserCheck, Shield, HelpCircle, ArrowRight } from 'lucide-react';
import { UserRole } from '../types';

interface LoginProps {
  onLogin: (role: UserRole) => void;
  isWireframe: boolean;
  selectedRole: UserRole;
  setSelectedRole: (role: UserRole) => void;
}

export default function Login({ onLogin, isWireframe, selectedRole, setSelectedRole }: LoginProps) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate login
    onLogin(selectedRole);
  };

  const rolesList: { id: UserRole; label: string; desc: string; icon: any }[] = [
    {
      id: 'Masyarakat',
      label: 'Masyarakat',
      desc: 'Warga Solo pelapor & pemilah sampah',
      icon: UserCheck
    },
    {
      id: 'Petugas',
      label: 'Petugas DLH',
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
    <div className={`flex-1 grid grid-rows-[auto_auto_1fr_auto] p-6 overflow-y-auto ${isWireframe ? 'bg-white text-gray-800' : 'bg-white'}`}>
      {/* Branding */}
      <div className="text-center py-4">
        <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-emerald-50 mb-3 border border-emerald-100">
          <img src={logo} alt="Solo Pilah" className="w-10 h-10 object-contain" />
        </div>
        <h1 className="text-xl font-extrabold font-display tracking-tight text-gray-900">Solo Pilah</h1>
        <p className="text-xs text-gray-500 mt-1">Platform Kolaboratif Pengelolaan Sampah Kota</p>
      </div>

      {/* Role Selector */}
      <div className="mb-4">
        <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2.5">
          Pilih Peran Simulasi Anda:
        </label>
        <div className="grid grid-cols-3 gap-2">
          {rolesList.map((r) => {
            const Icon = r.icon;
            const isSelected = selectedRole === r.id;
            return (
              <button
                key={r.id}
                type="button"
                onClick={() => setSelectedRole(r.id)}
                className={`p-2.5 rounded-xl border flex flex-col items-center justify-center text-center cursor-pointer transition-all ${
                  isSelected
                    ? isWireframe
                      ? 'border-2 border-black bg-gray-100 font-bold'
                      : 'border-emerald-500 bg-emerald-50/50 text-emerald-700 ring-2 ring-emerald-500/10'
                    : 'border-gray-100 bg-white text-gray-500 hover:border-gray-200'
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
      <form onSubmit={handleSubmit} className="space-y-4 flex flex-col justify-center min-h-0">
        {isSignUp && (
          <div className="space-y-1.5">
            <label className="block text-[10px] font-bold text-gray-500 uppercase">Nama Lengkap</label>
            <div className="relative">
              <input
                type="text"
                required
                placeholder="Ahmad Fauzi"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className={`w-full py-2.5 pl-3 pr-3 text-xs rounded-xl border focus:outline-none focus:ring-2 ${
                  isWireframe
                    ? 'border-gray-400 focus:ring-gray-800'
                    : 'border-gray-200 focus:ring-emerald-500/20 focus:border-emerald-500 bg-gray-50/30'
                }`}
              />
            </div>
          </div>
        )}

        <div className="space-y-1.5">
          <label className="block text-[10px] font-bold text-gray-500 uppercase">Email</label>
          <div className="relative">
            <Mail className="absolute left-3.5 top-3 w-4 h-4 text-gray-400" />
            <input
              type="email"
              required
              placeholder="nama@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full py-2.5 pl-10 pr-3 text-xs rounded-xl border focus:outline-none focus:ring-2 ${
                isWireframe
                  ? 'border-gray-400 focus:ring-gray-800'
                  : 'border-gray-200 focus:ring-emerald-500/20 focus:border-emerald-500 bg-gray-50/30'
              }`}
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <div className="flex justify-between items-center">
            <label className="block text-[10px] font-bold text-gray-500 uppercase">Password</label>
            {!isSignUp && (
              <a href="#forgot" className="text-[10px] text-emerald-600 hover:underline font-bold">Lupa?</a>
            )}
          </div>
          <div className="relative">
            <Lock className="absolute left-3.5 top-3 w-4 h-4 text-gray-400" />
            <input
              type="password"
              required
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full py-2.5 pl-10 pr-3 text-xs rounded-xl border focus:outline-none focus:ring-2 ${
                isWireframe
                  ? 'border-gray-400 focus:ring-gray-800'
                  : 'border-gray-200 focus:ring-emerald-500/20 focus:border-emerald-500 bg-gray-50/30'
              }`}
            />
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className={`w-full py-3.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm transition-all cursor-pointer ${
            isWireframe
              ? 'bg-gray-900 text-white hover:bg-gray-800 border-2 border-black'
              : 'bg-emerald-500 hover:bg-emerald-600 text-white shadow-emerald-100/50'
          }`}
        >
          {isSignUp ? "Daftar Akun Baru" : `Masuk Sebagai ${selectedRole}`}
          <ArrowRight className="w-4 h-4" />
        </button>
      </form>

      {/* Switch Sign In / Sign Up */}
      <div className="pt-4 pb-2 border-t border-gray-100 text-center">
        <button
          onClick={() => setIsSignUp(!isSignUp)}
          className={`text-[11px] font-bold transition-all ${
            isWireframe ? 'text-gray-900 hover:underline' : 'text-emerald-600 hover:text-emerald-700'
          }`}
        >
          {isSignUp ? "Sudah punya akun? Masuk" : "Belum punya akun? Registrasi Sekarang"}
        </button>
      </div>
    </div>
  );
}
