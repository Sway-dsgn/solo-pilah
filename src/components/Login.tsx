import React, { useState, useRef, useEffect } from 'react';
import logo from '../../logo.png';
import { Lock, Mail, UserCheck, Shield, HelpCircle, ArrowRight, ChevronDown, MapPin, X, Search, Check, ChevronRight } from 'lucide-react';
import { UserRole } from '../types';
import { CityData } from '../cities';

interface LoginProps {
  onLogin: (role: UserRole) => void;
  isWireframe: boolean;
  selectedRole: UserRole;
  setSelectedRole: (role: UserRole) => void;
  city: CityData;
}

export default function Login({ onLogin, isWireframe, selectedRole, setSelectedRole, city }: LoginProps) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [fullName, setFullName] = useState('');
  const [registered, setRegistered] = useState(false);
  const [selectedKec, setSelectedKec] = useState(city.districts[0] || '');
  const [selectedKel, setSelectedKel] = useState('');
  const [showPicker, setShowPicker] = useState(false);
  const [pickerStep, setPickerStep] = useState<'kec' | 'kel'>('kec');
  const [searchKec, setSearchKec] = useState('');
  const [searchKel, setSearchKel] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (isSignUp) {
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      if (users.find((u: any) => u.email === email)) {
        setError('Email sudah terdaftar!');
        return;
      }
      users.push({ email, password, name: fullName, phone, role: selectedRole, kecamatan: selectedKec, kelurahan: selectedKel });
      localStorage.setItem('users', JSON.stringify(users));
      setRegistered(true);
      setIsSignUp(false);
      setEmail('');
      setPassword('');
      return;
    }
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find((u: any) => u.email === email && u.password === password);
    if (!user) {
      setError('Akun tidak ditemukan! Silakan daftar terlebih dahulu.');
      return;
    }
    onLogin(selectedRole);
  };

  const rolesList: { id: UserRole; label: string; desc: string; icon: any }[] = [
    {
      id: 'Masyarakat',
      label: 'Warga',
      desc: 'Lapor sampah & kumpulin poin',
      icon: UserCheck
    },
    {
      id: 'Petugas',
      label: 'Petugas Lapangan',
      desc: 'Bersihin & angkut sampah',
      icon: Shield
    },
    {
      id: 'BankSampah',
      label: 'Bank Sampah',
      desc: 'Terima setoran & urus poin',
      icon: HelpCircle
    }
  ];

  return (
    <div className={`flex-1 flex flex-col p-6 overflow-y-auto ${isWireframe ? 'bg-white text-gray-800' : 'bg-gradient-to-b from-emerald-50/60 via-white to-white shadow-card'}`}>
      {/* Branding */}
      <div className="text-center my-6 anim-fade-in-up">
        <img src={logo} alt="Solo Pilah" className="w-14 h-14 object-contain mx-auto mb-3" />
        <h1 className="text-xl font-extrabold font-display tracking-tight text-gray-900">{city.appName}</h1>
        <p className="text-xs text-gray-500 mt-1">{city.description}</p>
      </div>

      {/* Wilayah Picker - Custom Popup */}
      <div className={`mb-4 rounded-xl p-3 anim-fade-in-up ${isWireframe ? 'shadow-soft bg-white' : 'shadow-card bg-white'}`}>
        <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2.5">
          Pilih Wilayah:
        </label>
        <button
          onClick={() => { setShowPicker(true); setPickerStep('kec'); setSearchKec(''); }}
          className={`w-full p-3 text-xs font-bold rounded-xl border flex items-center gap-2.5 cursor-pointer transition-all ${
            isWireframe
              ? 'border-gray-400 bg-white text-gray-700 shadow-soft hover:bg-gray-50'
              : 'border-gray-200 bg-white text-gray-700 shadow-soft hover:border-gray-300 hover:shadow-card'
          }`}
        >
          <MapPin className={`w-4 h-4 shrink-0 ${isWireframe ? 'text-gray-500' : 'text-emerald-500'}`} />
          <div className="flex-1 text-left min-w-0">
            <span className="block truncate">
              {selectedKel ? `Kel. ${selectedKel}` : `Kec. ${selectedKec}`}
            </span>
            {selectedKel && (
              <span className="block text-[9px] text-gray-400 font-medium mt-0.5">Kec. {selectedKec}</span>
            )}
          </div>
          <ChevronDown className={`w-4 h-4 shrink-0 transition-transform ${isWireframe ? 'text-gray-500' : 'text-gray-400'}`} />
        </button>
      </div>

      {/* Wilayah Bottom Sheet Picker Modal */}
      {showPicker && (
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent backdrop-blur-sm flex items-end z-50" onClick={() => setShowPicker(false)}>
          <div className={`w-full bg-white rounded-t-3xl flex flex-col max-h-[70vh] overflow-hidden anim-scale-in ${
            isWireframe ? '' : 'shadow-2xl'
          }`} onClick={e => e.stopPropagation()}>
            {/* Drag Handle */}
            <div className="flex justify-center pt-3 pb-1 shrink-0">
              <div className={`w-8 h-1 rounded-full ${isWireframe ? 'bg-gray-400' : 'bg-gray-300'}`} />
            </div>

            {/* Header */}
            <div className="px-5 pb-3 border-b border-gray-100 shrink-0">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xs font-extrabold font-display text-gray-800">
                  {pickerStep === 'kec' ? 'Pilih Kecamatan' : 'Pilih Kelurahan'}
                </h3>
                <button onClick={() => setShowPicker(false)} className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 cursor-pointer">
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="relative">
                <Search className="absolute left-3 top-2.5 w-3.5 h-3.5 text-gray-400" />
                <input
                  type="text"
                  placeholder={pickerStep === 'kec' ? "Cari kecamatan..." : "Cari kelurahan..."}
                  value={pickerStep === 'kec' ? searchKec : searchKel}
                  onChange={(e) => pickerStep === 'kec' ? setSearchKec(e.target.value) : setSearchKel(e.target.value)}
                  className={`w-full pl-9 pr-3 py-2 text-[11px] rounded-xl border focus:outline-none focus:ring-2 ${
                    isWireframe ? 'border-gray-400 focus:ring-gray-800 bg-gray-50' : 'border-gray-200 focus:ring-emerald-500/20 focus:border-emerald-500 bg-gray-50/50'
                  }`}
                  autoFocus
                />
              </div>
            </div>

            {/* Options List */}
            <div className="flex-1 overflow-y-auto phone-scroll">
              <div className="p-2 space-y-0.5">
                {pickerStep === 'kec' ? (
                  <>
                    <button
                      onClick={() => { setSelectedKec(''); setSelectedKel(''); setPickerStep('kel'); }}
                      className={`w-full p-3 rounded-xl text-xs font-bold text-left flex items-center gap-2.5 transition-all cursor-pointer ${
                        !selectedKec
                          ? isWireframe ? 'bg-gray-100 border border-gray-400' : 'bg-emerald-50 border border-emerald-200 text-emerald-700'
                          : isWireframe ? 'hover:bg-gray-50 text-gray-600' : 'hover:bg-gray-50 text-gray-600'
                      }`}
                    >
                      <MapPin className="w-4 h-4 shrink-0" />
                      <span>Semua Kecamatan</span>
                    </button>
                    {city.districts
                      .filter(k => k.toLowerCase().includes(searchKec.toLowerCase()))
                      .map((k) => (
                        <button
                          key={k}
                          onClick={() => { setSelectedKec(k); setSelectedKel(''); setPickerStep('kel'); }}
                          className={`w-full p-3 rounded-xl text-xs font-bold text-left flex items-center gap-2.5 transition-all cursor-pointer ${
                            selectedKec === k
                              ? isWireframe ? 'bg-gray-100 border border-gray-400' : 'bg-emerald-50 border border-emerald-200 text-emerald-700'
                              : isWireframe ? 'hover:bg-gray-50 text-gray-600' : 'hover:bg-gray-50 text-gray-600'
                          }`}
                        >
                          <MapPin className={`w-4 h-4 shrink-0 ${selectedKec === k ? 'text-emerald-500' : 'text-gray-400'}`} />
                          <span className="flex-1">Kec. {k}</span>
                          {selectedKec === k && <Check className="w-4 h-4 text-emerald-500" />}
                          <ChevronRight className="w-3.5 h-3.5 text-gray-300" />
                        </button>
                      ))}
                  </>
                ) : (
                  <>
                    {selectedKec && (
                      <div className="px-3 py-2 mb-1">
                        <span className="text-[9px] text-gray-400 font-bold uppercase tracking-wider">Kec. {selectedKec}</span>
                      </div>
                    )}
                    <button
                      onClick={() => setPickerStep('kec')}
                      className={`w-full p-3 rounded-xl text-xs font-bold text-left flex items-center gap-2.5 transition-all cursor-pointer ${
                        isWireframe ? 'hover:bg-gray-50 text-gray-500' : 'hover:bg-gray-50 text-gray-500'
                      }`}
                    >
                      <ChevronDown className="w-4 h-4 rotate-90 shrink-0" />
                      <span>Kembali pilih kecamatan</span>
                    </button>
                    <div className="h-px bg-gray-100 my-1" />
                    {(city.subdistricts[selectedKec] || [])
                      .filter(kel => kel.toLowerCase().includes(searchKel.toLowerCase()))
                      .map((kel) => (
                        <button
                          key={kel}
                          onClick={() => { setSelectedKel(kel); setShowPicker(false); }}
                          className={`w-full p-3 rounded-xl text-xs font-bold text-left flex items-center gap-2.5 transition-all cursor-pointer ${
                            selectedKel === kel
                              ? isWireframe ? 'bg-gray-100 border border-gray-400' : 'bg-emerald-50 border border-emerald-200 text-emerald-700'
                              : isWireframe ? 'hover:bg-gray-50 text-gray-600' : 'hover:bg-gray-50 text-gray-600'
                          }`}
                        >
                          <MapPin className={`w-4 h-4 shrink-0 ${selectedKel === kel ? 'text-emerald-500' : 'text-gray-400'}`} />
                          <span className="flex-1">Kel. {kel}</span>
                          {selectedKel === kel && <Check className="w-4 h-4 text-emerald-500" />}
                        </button>
                      ))}
                  </>
                )}
              </div>
            </div>

            {/* Bottom Action */}
            <div className="p-4 border-t border-gray-100 shrink-0">
              <button
                onClick={() => setShowPicker(false)}
                className={`w-full py-3 text-xs font-bold rounded-xl cursor-pointer transition-all ${
                  isWireframe
                    ? 'bg-gray-900 text-white'
                    : 'bg-emerald-500 hover:bg-emerald-600 text-white'
                }`}
              >
                {selectedKel ? `Konfirmasi (Kel. ${selectedKel})` : selectedKec ? `Konfirmasi (Kec. ${selectedKec})` : 'Lewati'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Role Selector */}
      <div className={`mb-6 rounded-xl p-3 anim-fade-in-up ${isWireframe ? 'shadow-soft bg-white' : 'shadow-card bg-white'}`}>
        <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-3">
          Masuk Sebagai:
        </label>
        <div className="space-y-2">
          {rolesList.map((r) => {
            const Icon = r.icon;
            const isSelected = selectedRole === r.id;
            return (
              <button
                key={r.id}
                type="button"
                onClick={() => setSelectedRole(r.id)}
                className={`card-hover btn-press w-full p-3 rounded-xl border flex items-center gap-3 text-left cursor-pointer transition-all ${
                  isSelected
                    ? isWireframe
                      ? 'border-2 border-black bg-gray-100'
                      : 'border-emerald-500 bg-emerald-50 shadow-sm'
                    : isWireframe
                      ? 'border-gray-400 bg-white hover:bg-gray-50'
                      : 'border-gray-200/70 bg-white hover:border-emerald-200 hover:bg-emerald-50/30'
                }`}
              >
                <div className={`p-2 rounded-lg shrink-0 ${
                  isSelected
                    ? isWireframe ? 'bg-gray-200' : 'bg-emerald-100'
                    : isWireframe ? 'bg-gray-100' : 'bg-gray-100'
                }`}>
                  <Icon className={`w-5 h-5 ${
                    isSelected
                      ? isWireframe ? 'text-gray-800' : 'text-emerald-600'
                      : isWireframe ? 'text-gray-500' : 'text-gray-400'
                  }`} />
                </div>
                <div className="flex-1 min-w-0">
                  <span className={`text-[11px] font-bold block ${
                    isSelected
                      ? isWireframe ? 'text-gray-900' : 'text-emerald-700'
                      : isWireframe ? 'text-gray-700' : 'text-gray-700'
                  }`}>{r.label}</span>
                  <span className="text-[9px] text-gray-400 block mt-0.5">{r.desc}</span>
                </div>
                <div className={`w-4 h-4 rounded-full border-2 shrink-0 flex items-center justify-center ${
                  isSelected
                    ? isWireframe ? 'border-gray-800 bg-gray-800' : 'border-emerald-500 bg-emerald-500'
                    : 'border-gray-300'
                }`}>
                  {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                </div>
              </button>
            );
          })}
        </div>

      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4 flex-1 anim-fade-in-up">
        {isSignUp && (
          <div className="space-y-1.5">
            <label className="block text-[10px] font-bold text-gray-500 uppercase">Nama Lengkap</label>
            <input
              type="text" required placeholder="Ahmad Fauzi"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className={`w-full py-2.5 px-3 text-xs rounded-xl border focus:outline-none focus:ring-2 ${
                isWireframe ? 'border-gray-400 focus:ring-gray-800 shadow-soft' : 'border-gray-200 focus:ring-emerald-500/30 focus:border-emerald-500 bg-gray-50/30 shadow-inner hover:border-gray-300 transition-all'
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
                isWireframe ? 'border-gray-400 focus:ring-gray-800' : 'border-gray-200 focus:ring-emerald-500/30 focus:border-emerald-500 bg-gray-50/30 shadow-inner hover:border-gray-300 transition-all'
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
                  isWireframe ? 'border-gray-400 focus:ring-gray-800 shadow-soft' : 'border-gray-200 focus:ring-emerald-500/30 focus:border-emerald-500 bg-gray-50/30 shadow-inner hover:border-gray-300 transition-all'
                }`}
              />
            </div>
          </div>
        )}

        <div className="space-y-1.5">
          <div className="flex justify-between items-center">
            <label className="block text-[10px] font-bold text-gray-500 uppercase">Password</label>
            {!isSignUp && (
              <button type="button" className="text-[10px] text-emerald-600 hover:underline font-bold btn-press">Lupa?</button>
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
                isWireframe ? 'border-gray-400 focus:ring-gray-800 shadow-soft' : 'border-gray-200 focus:ring-emerald-500/30 focus:border-emerald-500 bg-gray-50/30 shadow-inner hover:border-gray-300 transition-all'
              }`}
            />
          </div>
        </div>

        <button type="submit"
          className={`w-full py-3.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer btn-press ${
            isWireframe ? 'bg-gray-900 text-white hover:bg-gray-800 border-2 border-black shadow-sm' : 'bg-emerald-500 hover:bg-emerald-600 text-white shadow-sm'
          }`}
        >
          {isSignUp ? "Daftar" : "Masuk"}
          <ArrowRight className="w-4 h-4" />
        </button>

        {error && (
          <div className="text-center text-[10px] text-red-600 font-bold bg-red-50 p-2 rounded-xl border border-red-100 anim-fade-in-up">
            {error}
          </div>
        )}
      </form>

      {registered && (
        <div className="mt-4 text-center text-[10px] text-emerald-600 font-bold bg-emerald-50 p-2 rounded-xl border border-emerald-100 anim-fade-in-up">
          Akun berhasil dibuat! Silakan masuk.
        </div>
      )}

      <div className="mt-6 pt-4 border-t border-gray-100 text-center">
        <p className="text-[10px] text-gray-500 mb-2">Punya Akun?</p>
        <button onClick={() => { setIsSignUp(!isSignUp); setRegistered(false); }}
          className={`text-[11px] font-bold transition-all btn-press ${
            isWireframe ? 'text-gray-900 hover:underline' : 'text-emerald-600 hover:text-emerald-700'
          }`}
        >
          {isSignUp ? "Ya, Masuk" : "Tidak, Daftar Sekarang"}
        </button>
      </div>
    </div>
  );
}
