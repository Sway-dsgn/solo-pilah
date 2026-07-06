import React, { useState } from 'react';
import { PICKUP_SCHEDULES } from '../data';
import { Calendar, Clock, MapPin, Truck, Bell, AlertCircle, ChevronDown, CheckCircle } from 'lucide-react';

interface ScheduleProps {
  isWireframe: boolean;
}

export default function Schedule({ isWireframe }: ScheduleProps) {
  const [selectedKecamatan, setSelectedKecamatan] = useState<string>('Jebres');
  const [reminders, setReminders] = useState<{ [key: string]: boolean }>({ 'sch-2': true });

  const kecamatanList = ['Jebres', 'Banjarsari', 'Laweyan', 'Serengan', 'Pasar Kliwon'];

  const filteredSchedules = PICKUP_SCHEDULES.filter(
    (s) => s.kecamatan.toLowerCase() === selectedKecamatan.toLowerCase()
  );

  const toggleReminder = (id: string) => {
    setReminders((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className={`flex-1 flex flex-col phone-scroll overflow-y-auto ${isWireframe ? 'bg-white text-gray-800' : 'bg-gray-50'}`}>
      {/* Header */}
      <div className={`p-4 ${isWireframe ? 'bg-white border-b border-gray-300' : 'bg-white border-b border-gray-100'}`}>
        <h2 className="text-sm font-extrabold font-display text-gray-800 flex items-center gap-2">
          <Calendar className={`w-4 h-4 ${isWireframe ? 'text-gray-800' : 'text-emerald-500'}`} />
          Jadwal Pengangkutan Sampah
        </h2>
        <p className="text-[10px] text-gray-400 mt-0.5">Pilih wilayah kelurahan/kecamatan Anda di Solo</p>
      </div>

      {/* Kecamatan Selector Dropdown */}
      <div className="p-4 shrink-0">
        <div className="relative">
          <select
            value={selectedKecamatan}
            onChange={(e) => setSelectedKecamatan(e.target.value)}
            className={`w-full p-3 text-xs font-bold rounded-xl border focus:outline-none focus:ring-2 appearance-none cursor-pointer ${
              isWireframe
                ? 'border-gray-400 focus:ring-gray-800 bg-white'
                : 'border-gray-200 focus:ring-emerald-500/20 focus:border-emerald-500 bg-white text-gray-700'
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

      {/* Real-time Tracking Countdown Box */}
      <div className="px-4 mb-1 shrink-0">
        <div className={`p-4 rounded-2xl relative overflow-hidden ${
          isWireframe
            ? 'border-2 border-gray-800 bg-white'
            : 'bg-gradient-to-r from-emerald-50 to-emerald-100/50 border border-emerald-200/50'
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
              <h4 className="text-xs font-bold text-gray-800 font-display">Truk Organik Masuk Jebres</h4>
              <p className="text-[10px] text-gray-500 leading-normal">
                Posisi: Jl. Ir. Sutami (Sekitar UNS Jebres) menuju perumahan Anda.
              </p>
              {/* ETA countdown */}
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

      {/* List of schedules */}
      <div className="p-4 flex-1">
        <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2.5">
          Jadwal Pengambilan Minggu Ini
        </h4>

        {filteredSchedules.length === 0 ? (
          <div className="text-center py-8 text-gray-400 space-y-1">
            <AlertCircle className="w-8 h-8 mx-auto stroke-1" />
            <p className="text-xs font-semibold">Tidak ada jadwal pengangkutan</p>
            <p className="text-[10px]">Silakan pilih wilayah kecamatan lain</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredSchedules.map((schedule) => {
              const hasReminder = reminders[schedule.id];
              const isFinished = schedule.status === 'Selesai';

              return (
                <div
                  key={schedule.id}
                  className={`p-3.5 rounded-xl border flex justify-between items-center transition-all ${
                    isWireframe
                      ? 'border-gray-300 bg-white'
                      : isFinished
                      ? 'border-gray-100 bg-gray-50/50 opacity-70'
                      : 'border-gray-100 bg-white'
                  }`}
                >
                  <div className="space-y-1.5 max-w-[75%]">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-lg ${
                        isWireframe
                          ? 'bg-gray-200 text-gray-800'
                          : schedule.wasteType.includes('Organik')
                          ? 'bg-emerald-50 text-emerald-700'
                          : schedule.wasteType.includes('Anorganik')
                          ? 'bg-blue-50 text-blue-700'
                          : 'bg-red-50 text-red-700'
                      }`}>
                        {schedule.day} â€¢ {schedule.wasteType}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 text-[10px] text-gray-500">
                      <Clock className="w-3.5 h-3.5 text-gray-400" />
                      <span>{schedule.time}</span>
                    </div>

                    <div className="text-[9px] text-gray-400 space-y-0.5">
                      <p><strong>Petugas:</strong> {schedule.officerName}</p>
                      <p><strong>Armada:</strong> {schedule.officerVehicle}</p>
                    </div>
                  </div>

                  {/* Notification Toggle Button */}
                  <button
                    disabled={isFinished}
                    onClick={() => toggleReminder(schedule.id)}
                    className={`p-2.5 rounded-xl border transition-all cursor-pointer ${
                      isFinished
                        ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed'
                        : hasReminder
                        ? isWireframe
                          ? 'bg-gray-800 text-white border-black'
                          : 'bg-emerald-500 text-white border-emerald-500 hover:bg-emerald-600'
                        : isWireframe
                        ? 'border-gray-400 text-gray-600'
                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-gray-600'
                    }`}
                  >
                    {isFinished ? (
                      <CheckCircle className="w-4 h-4" />
                    ) : (
                      <Bell className="w-4 h-4" />
                    )}
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
