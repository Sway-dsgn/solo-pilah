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
    <div className={`flex-1 flex flex-col p-6 overflow-y-auto ${isWireframe ? 'bg-white text-gray-800' : 'bg-white'}`}>
      {/* Branding */}
      <div className="text-center my-8">
        <div className="inline-flex items-center justify-center p-4 rounded-2xl bg-emerald-50 mb-4 border border-emerald-100">
          <img src={logo} alt="Solo Pilah" className="w-14 h-14 object-contain" />
        </div>
        <h1 className="text-2xl font-extrabold font-display tracking-tight text-gray-900">Solo Pilah</h1>
        <p className="text-sm text-gray-500 mt-1">Platform Kolaboratif Pengelolaan Sampah Kota</p>
      </div>

      {/* Role Selector */}
      <div className="mb-8">
        <label className="block text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">
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
                className={`p-4 rounded-xl border flex flex-col items-center justify-center text-center cursor-pointer transition-all ${
                  isSelected
                    ? isWireframe
                      ? 'border-2 border-black bg-gray-100 font-bold'
                      : 'border-emerald-500 bg-emerald-50/50 text-emerald-700 ring-2 ring-emerald-500/10'
                    : 'border-gray-100 bg-white text-gray-500 hover:border-gray-200'
                }`}
              >
                <Icon className={`w-5 h-5 mb-2 ${isSelected && !isWireframe ? 'text-emerald-600' : 'text-gray-400'}`} />
                <span className="text-xs font-bold block truncate w-full">{r.label}</span>
              </button>
            );
          })}
        </div>
        <p className="text-xs text-gray-400 mt-3 text-center italic">
          *Dashboard & menu akan otomatis menyesuaikan peran terpilih.
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-5 flex-1">
        {isSignUp && (
          <div className="space-y-2">
            <label className="block text-xs font-bold text-gray-500 uppercase">Nama Lengkap</label>
            <div className="relative">
              <input
                type="text"
                required
                placeholder="Ahmad Fauzi"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className={`w-full py-3.5 pl-4 pr-4 text-sm rounded-xl border focus:outline-none focus:ring-2 ${
                  isWireframe
                    ? 'border-gray-400 focus:ring-gray-800'
                    : 'border-gray-200 focus:ring-emerald-500/20 focus:border-emerald-500 bg-gray-50/30'
                }`}
              />
            </div>
          </div>
        )}

        <div className="space-y-2">
          <label className="block text-xs font-bold text-gray-500 uppercase">Email</label>
          <div className="relative">
            <Mail className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
            <input
              type="email"
              required
              placeholder="nama@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full py-3.5 pl-12 pr-4 text-sm rounded-xl border focus:outline-none focus:ring-2 ${
                isWireframe
                  ? 'border-gray-400 focus:ring-gray-800'
                  : 'border-gray-200 focus:ring-emerald-500/20 focus:border-emerald-500 bg-gray-50/30'
              }`}
            />
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <label className="block text-xs font-bold text-gray-500 uppercase">Password</label>
            {!isSignUp && (
              <a href="#forgot" className="text-xs text-emerald-600 hover:underline font-bold">Lupa?</a>
            )}
          </div>
          <div className="relative">
            <Lock className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
            <input
              type="password"
              required
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full py-3.5 pl-12 pr-4 text-sm rounded-xl border focus:outline-none focus:ring-2 ${
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
          className={`w-full py-4 rounded-xl text-sm font-bold flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer ${
            isWireframe
              ? 'bg-gray-900 text-white hover:bg-gray-800 border-2 border-black'
              : 'bg-emerald-500 hover:bg-emerald-600 text-white shadow-emerald-100/50'
          }`}
        >
          {isSignUp ? "Daftar Akun Baru" : `Masuk Sebagai ${selectedRole}`}
          <ArrowRight className="w-5 h-5" />
        </button>
      </form>

      {/* Switch Sign In / Sign Up */}
      <div className="mt-8 pt-4 border-t border-gray-100 text-center">
        <button
          onClick={() => setIsSignUp(!isSignUp)}
          className={`text-sm font-bold transition-all ${
            isWireframe ? 'text-gray-900 hover:underline' : 'text-emerald-600 hover:text-emerald-700'
          }`}
        >
          {isSignUp ? "Sudah punya akun? Masuk" : "Belum punya akun? Registrasi Sekarang"}
        </button>
      </div>
    </div>
  );
}
