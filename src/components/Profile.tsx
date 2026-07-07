import React, { useState } from 'react';
import { UserProfile } from '../types';
import { User, Mail, Phone, MapPin, Award, LogOut, History, Edit3, Settings, ChevronRight, X, Save } from 'lucide-react';

interface ProfileProps {
  profile: UserProfile;
  setProfile: React.Dispatch<React.SetStateAction<UserProfile>>;
  isWireframe: boolean;
  onLogout: () => void;
  onNavigate: (screen: any) => void;
  city: any;
}

export default function Profile({ profile, setProfile, isWireframe, onLogout, onNavigate, city }: ProfileProps) {
  const [editOpen, setEditOpen] = useState(false);
  const [editForm, setEditForm] = useState({
    name: profile.name,
    email: profile.email,
    phone: profile.phone,
    address: profile.address,
  });

  const handleEditSave = () => {
    setProfile(prev => ({ ...prev, ...editForm }));
    setEditOpen(false);
  };

  // Config setting rows
  const settingRows = [
    { label: "Riwayat Aktivitas", icon: History, color: "text-blue-500 bg-blue-50", action: () => onNavigate('report') },
    { label: "Edit Profil", icon: Edit3, color: "text-emerald-500 bg-emerald-50", action: () => setEditOpen(true) },
    { label: "Pengaturan Akun", icon: Settings, color: "text-gray-500 bg-gray-50", action: () => alert("Menu Pengaturan") }
  ];

  return (
    <div className={`flex-1 flex flex-col phone-scroll overflow-y-auto ${isWireframe ? 'bg-white text-gray-800' : 'bg-gray-50'}`}>
      {/* Header Profile Info Banner */}
      <div className={`p-6 text-center border-b flex flex-col items-center shrink-0 ${
        isWireframe ? 'bg-white border-gray-300' : 'bg-gradient-to-b from-emerald-400 via-emerald-50 to-white border-gray-100 shadow-soft'
      }`}>
        {/* Avatar with Ring */}
        <div className="relative mb-3">
          <img
            src={profile.avatar}
            alt="User Avatar"
            className={`w-18 h-18 rounded-full object-cover border-4 ${
              isWireframe ? 'border-gray-500' : 'border-emerald-500'
            }`}
          />
          <span className={`absolute bottom-0 right-0 p-1.5 rounded-full border-2 border-white text-white ${
            isWireframe ? 'bg-gray-800' : 'bg-emerald-500'
          }`}>
            <Award className="w-3.5 h-3.5" />
          </span>
        </div>

        <h3 className="text-sm font-extrabold font-display text-gray-800">{profile.name}</h3>
        <p className="text-[10px] text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded-full mt-1.5 border border-emerald-100">
          {profile.ecoRank}
        </p>
        <p className="text-[9px] text-gray-400 mt-1">{profile.email}</p>
      </div>

      {/* Account Info Details List */}
      <div className="p-4 space-y-4 shrink-0">
        <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Detail Akun</h4>

        <div className={`p-3.5 rounded-2xl bg-white border space-y-3 ${
          isWireframe ? 'border-gray-300' : 'border-gray-100/50 shadow-card'
        }`}>
          {/* Phone row */}
          <div className="flex items-center gap-3 text-[11px] text-gray-600">
            <Phone className="w-4 h-4 text-gray-400 shrink-0" />
            <div className="space-y-0.5">
              <span className="text-gray-400 font-medium block text-[8px] uppercase">Nomor Telepon</span>
              <span className="font-semibold text-gray-700">{profile.phone}</span>
            </div>
          </div>

          {/* Role Row */}
          <div className="flex items-center gap-3 text-[11px] text-gray-600 border-t border-gray-100 pt-3">
            <User className="w-4 h-4 text-gray-400 shrink-0" />
            <div className="space-y-0.5">
              <span className="text-gray-400 font-medium block text-[8px] uppercase">Peran / Hak Akses</span>
              <span className="font-semibold text-gray-700">{profile.role} ({city.shortName})</span>
            </div>
          </div>

          {/* Address Row */}
          <div className="flex items-center gap-3 text-[11px] text-gray-600 border-t border-gray-100 pt-3">
            <MapPin className="w-4 h-4 text-gray-400 shrink-0" />
            <div className="space-y-0.5">
              <span className="text-gray-400 font-medium block text-[8px] uppercase">Alamat Domisili</span>
              <span className="font-semibold text-gray-700 line-clamp-1">{profile.address}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Performance Summary Statistics */}
      <div className="px-4 shrink-0">
        <div className={`p-4 rounded-2xl bg-white border flex items-center justify-between ${
          isWireframe ? 'border-gray-300' : 'border-gray-100/50 shadow-card'
        }`}>
          <div className="space-y-1">
            <span className="text-[9px] text-gray-400 font-bold uppercase">Kontribusi Sampah</span>
            <div className="flex items-baseline gap-1">
              <span className="text-xl font-extrabold text-gray-800 font-display">
                {profile.totalWasteSubmitted.toLocaleString()}
              </span>
              <span className="text-xs text-gray-500 font-semibold">Kg</span>
            </div>
          </div>

          <div className="h-10 w-[1px] bg-gray-100"></div>

          <div className="space-y-1 text-right">
            <span className="text-[9px] text-gray-400 font-bold uppercase">Akumulasi Poin</span>
            <div className="flex items-baseline justify-end gap-1">
              <span className="text-xl font-extrabold text-emerald-600 font-display">
                {profile.points.toLocaleString()}
              </span>
              <span className="text-xs text-gray-500 font-semibold">pts</span>
            </div>
          </div>
        </div>
      </div>

      {/* App settings list */}
      <div className="p-4 space-y-2 flex-1">
        <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2.5">Keamanan & Layanan</h4>

        <div className="space-y-2">
          {settingRows.map((row) => {
            const Icon = row.icon;
            return (
              <button
                key={row.label}
                onClick={row.action}
                className={`w-full p-3.5 bg-white hover:bg-gray-50 rounded-xl border flex items-center justify-between transition-all cursor-pointer ${
                  isWireframe ? 'border-gray-300' : 'border-gray-100/50 card-hover'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${isWireframe ? 'bg-gray-100 border border-gray-300' : row.color}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-[11px] font-bold text-gray-700">{row.label}</span>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </button>
            );
          })}
        </div>
      </div>

      {/* Edit Profile Modal */}
      {editOpen && (
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent backdrop-blur-sm flex items-end z-50" onClick={() => setEditOpen(false)}>
          <div className={`w-full bg-white rounded-t-3xl p-5 pt-3 space-y-5 anim-scale-in ${
            isWireframe ? '' : ''
          }`} onClick={e => e.stopPropagation()}>
            {/* Drag Handle */}
            <div className="flex justify-center">
              <div className={`w-8 h-1 rounded-full ${isWireframe ? 'bg-gray-400' : 'bg-gray-300'}`} />
            </div>

            <div className="flex items-center justify-between">
              <h3 className="text-xs font-extrabold text-gray-800 font-display">Edit Profil</h3>
              <button onClick={() => setEditOpen(false)}
                className={`p-1.5 rounded-lg transition-all cursor-pointer ${
                  isWireframe ? 'hover:bg-gray-100 text-gray-500' : 'hover:bg-gray-100 text-gray-400'
                }`}>
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3.5">
              <div className="flex items-center gap-3">
                <User className={`w-4 h-4 shrink-0 ${isWireframe ? 'text-gray-500' : 'text-gray-400'}`} />
                <div className="flex-1">
                  <label className="block text-[8px] font-bold text-gray-400 uppercase tracking-wider mb-1">Nama Lengkap</label>
                  <input value={editForm.name} onChange={e => setEditForm(f => ({ ...f, name: e.target.value }))}
                    className={`w-full p-2.5 text-xs rounded-xl border focus:outline-none transition-all ${
                      isWireframe ? 'border-gray-400 focus:ring-2 focus:ring-gray-800' : 'border-gray-200 focus:ring-2 focus:ring-emerald-500/20 bg-gray-50 focus:bg-white'
                    }`} />
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Mail className={`w-4 h-4 shrink-0 ${isWireframe ? 'text-gray-500' : 'text-gray-400'}`} />
                <div className="flex-1">
                  <label className="block text-[8px] font-bold text-gray-400 uppercase tracking-wider mb-1">Email</label>
                  <input value={editForm.email} onChange={e => setEditForm(f => ({ ...f, email: e.target.value }))}
                    className={`w-full p-2.5 text-xs rounded-xl border focus:outline-none transition-all ${
                      isWireframe ? 'border-gray-400 focus:ring-2 focus:ring-gray-800' : 'border-gray-200 focus:ring-2 focus:ring-emerald-500/20 bg-gray-50 focus:bg-white'
                    }`} />
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className={`w-4 h-4 shrink-0 ${isWireframe ? 'text-gray-500' : 'text-gray-400'}`} />
                <div className="flex-1">
                  <label className="block text-[8px] font-bold text-gray-400 uppercase tracking-wider mb-1">No HP</label>
                  <input value={editForm.phone} onChange={e => setEditForm(f => ({ ...f, phone: e.target.value }))}
                    className={`w-full p-2.5 text-xs rounded-xl border focus:outline-none transition-all ${
                      isWireframe ? 'border-gray-400 focus:ring-2 focus:ring-gray-800' : 'border-gray-200 focus:ring-2 focus:ring-emerald-500/20 bg-gray-50 focus:bg-white'
                    }`} />
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className={`w-4 h-4 shrink-0 mt-2.5 ${isWireframe ? 'text-gray-500' : 'text-gray-400'}`} />
                <div className="flex-1">
                  <label className="block text-[8px] font-bold text-gray-400 uppercase tracking-wider mb-1">Alamat</label>
                  <textarea value={editForm.address} onChange={e => setEditForm(f => ({ ...f, address: e.target.value }))} rows={2}
                    className={`w-full p-2.5 text-xs rounded-xl border focus:outline-none transition-all resize-none ${
                      isWireframe ? 'border-gray-400 focus:ring-2 focus:ring-gray-800' : 'border-gray-200 focus:ring-2 focus:ring-emerald-500/20 bg-gray-50 focus:bg-white'
                    }`} />
                </div>
              </div>
            </div>

            <button onClick={handleEditSave}
              className={`w-full py-3 text-xs font-extrabold text-white rounded-xl flex items-center justify-center gap-1.5 cursor-pointer transition-all btn-press shadow-sm ${
                isWireframe ? 'bg-gray-900 hover:bg-gray-800' : 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-500/20'
              }`}>
              <Save className="w-4 h-4" /> Simpan Perubahan
            </button>
          </div>
        </div>
      )}

      {/* Logout Action Button */}
      <div className="p-4 shrink-0">
        <button
          onClick={onLogout}
          className={`w-full py-3.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
            isWireframe
              ? 'bg-red-50 text-red-600 border-2 border-red-600 hover:bg-red-100/50'
              : 'bg-red-50 hover:bg-red-100/70 text-red-600 border border-red-100'
          }`}
        >
          <LogOut className="w-4 h-4" />
          Keluar dari Akun Demo
        </button>
      </div>
    </div>
  );
}
