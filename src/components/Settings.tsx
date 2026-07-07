import React from 'react';
import { UserProfile } from '../types';
import { Shield, Bell, Globe, Info, ChevronRight, ArrowLeft, Lock, Trash2 } from 'lucide-react';

interface SettingsProps {
  isWireframe: boolean;
  onClose: () => void;
  profile: UserProfile;
}

export default function Settings({ isWireframe, onClose, profile }: SettingsProps) {
  const sections = [
    {
      label: "Keamanan",
      items: [
        { label: "Ganti Kata Sandi", icon: Lock, desc: "Terakhir diubah 3 bulan lalu" },
        { label: "Verifikasi Dua Langkah", icon: Shield, desc: "Nonaktif" },
      ]
    },
    {
      label: "Preferensi",
      items: [
        { label: "Notifikasi", icon: Bell, desc: "Push & Email" },
        { label: "Bahasa", icon: Globe, desc: "Indonesia" },
      ]
    },
    {
      label: "Lainnya",
      items: [
        { label: "Tentang Aplikasi", icon: Info, desc: `v1.0.0 - ${profile.ecoRank}` },
        { label: "Hapus Akun", icon: Trash2, desc: "Semua data akan dihapus permanen" },
      ]
    }
  ];

  return (
    <div className={`flex-1 flex flex-col phone-scroll overflow-y-auto ${isWireframe ? 'bg-white' : 'bg-gray-50'}`}>
      {/* Header */}
      <div className={`p-4 bg-white border-b flex items-center gap-3 shrink-0 ${isWireframe ? 'border-gray-300' : 'border-gray-100 shadow-soft'}`}>
        <button onClick={onClose}
          className={`p-1.5 rounded-lg transition-all cursor-pointer btn-press ${
            isWireframe ? 'hover:bg-gray-100' : 'hover:bg-gray-50'
          }`}>
          <ArrowLeft className="w-4 h-4 text-gray-600" />
        </button>
        <h2 className="text-sm font-extrabold font-display text-gray-800">Pengaturan Akun</h2>
      </div>

      {/* Settings Sections */}
      <div className="p-4 space-y-5">
        {sections.map((section) => (
          <div key={section.label}>
            <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2.5 px-1">
              {section.label}
            </h4>
            <div className={`rounded-2xl bg-white border divide-y ${
              isWireframe ? 'border-gray-300 divide-gray-200' : 'border-gray-100/60 shadow-card divide-gray-100/60'
            }`}>
              {section.items.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.label}
                    className={`w-full p-3.5 flex items-center justify-between transition-all cursor-pointer btn-press ${
                      isWireframe ? 'hover:bg-gray-50' : 'hover:bg-gray-50/50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${isWireframe ? 'bg-gray-100 border border-gray-300' : 'bg-gray-50 border border-gray-100'}`}>
                        <Icon className="w-4 h-4 text-gray-500" />
                      </div>
                      <div className="text-left">
                        <span className="text-[11px] font-bold text-gray-700 block">{item.label}</span>
                        <span className="text-[8px] text-gray-400 mt-0.5 block">{item.desc}</span>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-300 shrink-0" />
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
