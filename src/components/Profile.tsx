import React from 'react';
import { UserProfile } from '../types';
import { User, Mail, Phone, MapPin, Award, LogOut, Shield, HelpCircle, FileText, ChevronRight, Leaf } from 'lucide-react';

interface ProfileProps {
  profile: UserProfile;
  isWireframe: boolean;
  onLogout: () => void;
}

export default function Profile({ profile, isWireframe, onLogout }: ProfileProps) {
  // Config setting rows
  const settingRows = [
    { label: "Verifikasi Identitas (NIK)", icon: Shield, color: "text-blue-500 bg-blue-50" },
    { label: "Pusat Bantuan & Syarat", icon: HelpCircle, color: "text-emerald-500 bg-emerald-50" },
    { label: "Kebijakan Privasi DLH", icon: FileText, color: "text-purple-500 bg-purple-50" }
  ];

  return (
    <div className={`flex-1 flex flex-col phone-scroll overflow-y-auto ${isWireframe ? 'bg-white text-gray-800' : 'bg-gray-50'}`}>
      {/* Header Profile Info Banner */}
      <div className={`p-6 text-center border-b flex flex-col items-center shrink-0 ${
        isWireframe ? 'bg-white border-gray-300' : 'bg-gradient-to-b from-emerald-50 to-white border-gray-100'
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
          isWireframe ? 'border-gray-300' : 'border-gray-100/50'
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
              <span className="font-semibold text-gray-700">{profile.role} (Solo)</span>
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
          isWireframe ? 'border-gray-300' : 'border-gray-100/50'
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
                onClick={() => alert(`Membuka menu ${row.label}...`)}
                className={`w-full p-3.5 bg-white hover:bg-gray-50 rounded-xl border flex items-center justify-between transition-all cursor-pointer ${
                  isWireframe ? 'border-gray-300' : 'border-gray-100/50'
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
