import React, { useState } from 'react';

import { Calendar, Clock, MapPin, Truck, Bell, AlertCircle, ChevronDown, CheckCircle, ClipboardList, Route, User, Weight, ShoppingCart } from 'lucide-react';
import { CityData } from '../cities';

interface ScheduleProps {
  isWireframe: boolean;
  city: CityData;
  userRole: string;
}

export default function Schedule({ isWireframe, city, userRole }: ScheduleProps) {
  const [selectedKecamatan, setSelectedKecamatan] = useState<string>(city.districts[0]);
  const [reminders, setReminders] = useState<{ [key: string]: boolean }>({});

  const isMasyarakat = userRole === 'Masyarakat';
  const isPetugas = userRole === 'Petugas';
  const isBankSampah = userRole === 'BankSampah';

  const roleColor = isMasyarakat ? 'emerald' : isPetugas ? 'blue' : 'indigo';

  const kecamatanList = city.districts;
  const kelurahanList = selectedKecamatan ? city.subdistricts[selectedKecamatan] || [] : [];

  const filteredSchedules = city.schedules.filter(
    (s: any) => s.kecamatan.toLowerCase() === selectedKecamatan.toLowerCase()
  );

  const toggleReminder = (id: string) => {
    setReminders((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className={`flex-1 flex flex-col phone-scroll overflow-y-auto ${isWireframe ? 'bg-white text-gray-800' : 'bg-gray-50'}`}>
      {/* Header */}
      <div className={`p-4 ${isWireframe ? 'bg-white border-b border-gray-300' : isMasyarakat ? 'bg-gradient-to-r from-white via-emerald-50/30 to-white border-b border-emerald-100/60 shadow-soft' : isPetugas ? 'bg-gradient-to-r from-white via-blue-50/30 to-white border-b border-blue-100/60 shadow-soft' : 'bg-gradient-to-r from-white via-indigo-50/30 to-white border-b border-indigo-100/60 shadow-soft'}`}>
        <h2 className="text-sm font-extrabold font-display text-gray-900 flex items-center gap-2">
          {isPetugas ? (
            <Route className={`w-4 h-4 ${isWireframe ? 'text-gray-800' : 'text-blue-500'}`} />
          ) : isBankSampah ? (
            <ShoppingCart className={`w-4 h-4 ${isWireframe ? 'text-gray-800' : 'text-indigo-500'}`} />
          ) : (
            <Calendar className={`w-4 h-4 ${isWireframe ? 'text-gray-800' : 'text-emerald-500'}`} />
          )}
          {isMasyarakat ? 'Jadwal Pengangkutan' : isPetugas ? 'Rute & Jadwal Kerja' : 'Jadwal Setoran Nasabah'}
        </h2>
        <p className="text-[10px] text-gray-400 mt-0.5">
          {isMasyarakat ? `Pilih wilayah di ${city.shortName}` : isPetugas ? `Rute pengangkutan di ${city.shortName}` : `Jadwal setor nasabah ke ${city.shortName}`}
        </p>
      </div>

      {/* Kecamatan Selector Dropdown */}
      <div className="p-4 shrink-0">
        <div className="relative">
          <select
            value={selectedKecamatan}
            onChange={(e) => setSelectedKecamatan(e.target.value)}
            className={`w-full p-3.5 text-xs font-bold rounded-xl border focus:outline-none focus:ring-2 appearance-none cursor-pointer transition-shadow ${
              isWireframe
                ? 'border-gray-400 focus:ring-gray-800 bg-white'
                : isMasyarakat
        ? 'border-gray-200 focus:ring-emerald-500/20 focus:border-emerald-500 bg-gray-50/80 text-gray-700 shadow-soft hover:shadow-card'
        : isPetugas
        ? 'border-gray-200 focus:ring-blue-500/20 focus:border-blue-500 bg-gray-50/80 text-gray-700 shadow-soft hover:shadow-card'
        : 'border-gray-200 focus:ring-indigo-500/20 focus:border-indigo-500 bg-gray-50/80 text-gray-700 shadow-soft hover:shadow-card'
            }`}
          >
            {kecamatanList.map((k) => (
              <option key={k} value={k}>
                Kecamatan {k}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-3.5 top-3.5 w-4 h-4 text-gray-400 pointer-events-none" />
        </div>
      </div>

      {/* Kelurahan List - Only for Masyarakat */}
      {isMasyarakat && kelurahanList.length > 0 && (
        <div className="px-4 pb-2 shrink-0">
          <div className="flex flex-wrap gap-1.5">
            {kelurahanList.map((kel) => (
              <span key={kel}
                className={`px-2.5 py-1 rounded-full text-[8px] font-bold ${
                  isWireframe
                    ? 'bg-gray-100 border border-gray-300 text-gray-700'
                    : 'bg-emerald-50 border border-emerald-100 text-emerald-700'
                }`}>
                {kel}
              </span>
            ))}
          </div>
          <p className="text-[8px] text-gray-400 mt-1.5">{kelurahanList.length} kelurahan di Kecamatan {selectedKecamatan}</p>
        </div>
      )}

      {/* Petugas: My Route Card */}
      {isPetugas && (
        <div className="px-4 mb-1 shrink-0">
          <div className={`p-4 rounded-2xl relative overflow-hidden ${
            isWireframe
              ? 'border-2 border-gray-800 bg-white'
              : 'bg-gradient-to-br from-blue-50 via-blue-50/80 to-blue-100/50 border border-blue-200/60 shadow-card'
          }`}>
            <div className="flex items-start gap-3">
              <div className={`p-2 rounded-xl shrink-0 ${isWireframe ? 'border border-gray-300' : 'bg-blue-500 text-white'}`}>
                <Truck className="w-5 h-5" />
              </div>
              <div className="space-y-1 flex-1">
                <span className={`text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded ${
                  isWireframe ? 'bg-gray-200 text-gray-800' : 'bg-blue-100 text-blue-800'
                }`}>
                  Rute Saya
                </span>
                <h4 className="text-xs font-bold text-gray-800 font-display">Pengangkutan {selectedKecamatan}</h4>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  <div className="p-2 rounded-xl bg-white/70 border border-blue-100/50">
                    <span className="text-[16px] font-black text-blue-600 font-display block">3</span>
                    <span className="text-[7px] text-gray-500 font-bold">Rute Aktif</span>
                  </div>
                  <div className="p-2 rounded-xl bg-white/70 border border-blue-100/50">
                    <span className="text-[16px] font-black text-emerald-600 font-display block">5</span>
                    <span className="text-[7px] text-gray-500 font-bold">Titik Jemput</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* BankSampah: Today's Drop-off Summary */}
      {isBankSampah && (
        <div className="px-4 mb-1 shrink-0">
          <div className={`p-4 rounded-2xl relative overflow-hidden ${
            isWireframe
              ? 'border-2 border-gray-800 bg-white'
              : 'bg-gradient-to-br from-indigo-50 via-indigo-50/80 to-indigo-100/50 border border-indigo-200/60 shadow-card'
          }`}>
            <div className="flex items-start gap-3">
              <div className={`p-2 rounded-xl shrink-0 ${isWireframe ? 'border border-gray-300' : 'bg-indigo-500 text-white'}`}>
                <ShoppingCart className="w-5 h-5" />
              </div>
              <div className="space-y-1 flex-1">
                <span className={`text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded ${
                  isWireframe ? 'bg-gray-200 text-gray-800' : 'bg-indigo-100 text-indigo-800'
                }`}>
                  Setoran Hari Ini
                </span>
                <h4 className="text-xs font-bold text-gray-800 font-display">Jadwal Setor {selectedKecamatan}</h4>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  <div className="p-2 rounded-xl bg-white/70 border border-indigo-100/50">
                    <span className="text-[16px] font-black text-indigo-600 font-display block">8</span>
                    <span className="text-[7px] text-gray-500 font-bold">Nasabah Antre</span>
                  </div>
                  <div className="p-2 rounded-xl bg-white/70 border border-indigo-100/50">
                    <span className="text-[16px] font-black text-emerald-600 font-display block">4</span>
                    <span className="text-[7px] text-gray-500 font-bold">Sudah Dilayani</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Masyarakat: Real-time Tracking Countdown Box */}
      {isMasyarakat && (
        <div className="px-4 mb-1 shrink-0">
          <div className={`p-4 rounded-2xl relative overflow-hidden ${
            isWireframe
              ? 'border-2 border-gray-800 bg-white'
              : 'bg-gradient-to-br from-emerald-50 via-emerald-50/80 to-emerald-100/50 border border-emerald-200/60 shadow-card'
          }`}>
            <div className="flex items-start gap-3">
              <div className={`p-2 rounded-xl shrink-0 ${isWireframe ? 'border border-gray-300' : 'bg-emerald-500 text-white'}`}>
                <Truck className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <span className={`text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded ${
                  isWireframe ? 'bg-gray-200 text-gray-800' : 'bg-emerald-100 text-emerald-800'
                }`}>
                  Truk Terdekat Aktif
                </span>
                <h4 className="text-xs font-bold text-gray-800 font-display">Truk Organik Masuk {selectedKecamatan}</h4>
                <p className="text-[10px] text-gray-500 leading-normal">
                  Posisi: Jl. Raya {selectedKecamatan} menuju perumahan Anda.
                </p>
                <div className="flex items-center gap-1 mt-2">
                  <Clock className={`w-3.5 h-3.5 ${isWireframe ? 'text-gray-700' : 'text-emerald-600'}`} />
                  <span className={`text-[11px] font-bold ${isWireframe ? 'text-gray-800' : 'text-emerald-700 font-mono'}`}>
                    Estimasi Tiba: 24 Menit Lagi
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* List of schedules */}
      <div className="p-4 flex-1">
        <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2.5">
          {isMasyarakat ? 'Jadwal Pengambilan Minggu Ini' : isPetugas ? 'Daftar Rute Hari Ini' : 'Jadwal Setor Nasabah'}
        </h4>

        {filteredSchedules.length === 0 ? (
          <div className="text-center py-8 text-gray-400 space-y-1 anim-fade-in-up shadow-soft rounded-2xl">
            <AlertCircle className="w-8 h-8 mx-auto stroke-1" />
            <p className="text-xs font-semibold">Tidak ada jadwal</p>
            <p className="text-[10px]">Silakan pilih wilayah kecamatan lain</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredSchedules.map((schedule, index) => {
              const hasReminder = reminders[schedule.id];
              const isFinished = schedule.status === 'Selesai';

              return (
                <div
                  key={schedule.id}
                  style={{ animationDelay: `${index * 0.1}s` }}
                  className={`p-3.5 rounded-xl border flex justify-between items-center transition-all anim-fade-in-up ${
                    isWireframe
                      ? 'border-gray-300 bg-white'
                      : isFinished
                      ? 'border-gray-100 bg-gray-50/50 opacity-70 shadow-soft'
                      : 'border-gray-100 bg-white shadow-card card-hover'
                  }`}
                >
                  <div className="space-y-1.5 max-w-[75%]">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-lg ${
                        isWireframe
                          ? 'bg-gray-200 text-gray-800'
                          : schedule.wasteType.includes('Organik')
                          ? 'badge-emerald'
                          : schedule.wasteType.includes('Anorganik')
                          ? 'badge-blue'
                          : 'badge-red'
                      }`}>
                        {schedule.day} - {schedule.wasteType}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 text-[10px] text-gray-500">
                      <Clock className="w-3.5 h-3.5 text-gray-400" />
                      <span>{schedule.time}</span>
                    </div>

                    <div className="text-[9px] text-gray-400 space-y-0.5">
                      <p><strong>{isMasyarakat ? 'Petugas' : 'Tujuan'}:</strong> {schedule.officerName}</p>
                      <p><strong>Armada:</strong> {schedule.officerVehicle}</p>
                    </div>
                  </div>

                  {/* Action button per role */}
                  {isMasyarakat ? (
                    <button
                      disabled={isFinished}
                      onClick={() => toggleReminder(schedule.id)}
                      className={`p-2.5 rounded-xl border transition-all cursor-pointer ${
                        isFinished
                          ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed'
                          : hasReminder
                          ? isWireframe
                            ? 'bg-gray-800 text-white border-black'
                            : 'bg-emerald-500 text-white border-emerald-500 hover:bg-emerald-600 shadow-sm btn-press'
                          : isWireframe
                          ? 'border-gray-400 text-gray-600'
                          : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-gray-600 btn-press'
                      }`}
                    >
                      {isFinished ? <CheckCircle className="w-4 h-4" /> : <Bell className="w-4 h-4" />}
                    </button>
                  ) : (
                    <div className={`p-2 rounded-lg text-center ${isFinished ? 'bg-emerald-50' : isPetugas ? 'bg-blue-50' : 'bg-indigo-50'}`}>
                      <span className={`text-[8px] font-bold ${isFinished ? 'text-emerald-600' : isPetugas ? 'text-blue-600' : 'text-indigo-600'}`}>
                        {isFinished ? 'Selesai' : schedule.time}
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
