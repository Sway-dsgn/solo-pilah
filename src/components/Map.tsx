import React, { useState } from 'react';
import CustomAlert from './CustomAlert';

import { BankSampahLocation } from '../types';
import { CityData } from '../cities';
import { Map, MapPin, Search, Compass, Info, Phone, Clock, Award, X } from 'lucide-react';

interface MapProps {
  isWireframe: boolean;
  city: CityData;
}

export default function MapScreen({ isWireframe, city }: MapProps) {
  const [selectedLoc, setSelectedLoc] = useState<BankSampahLocation | null>(city.bankSampah[1]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<'Semua' | 'Bank Sampah' | 'TPS' | 'TPA'>('Semua');
  const [alertState, setAlertState] = useState<{ open: boolean; title: string; message: string; type?: 'info' | 'warning' | 'success'; actionLabel?: string; onAction?: () => void }>({ open: false, title: '', message: '' });

  const filteredLocations = city.bankSampah.filter((loc: BankSampahLocation) => {
    const matchesSearch = loc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          loc.address.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterType === 'Semua' || loc.type === filterType;
    return matchesSearch && matchesFilter;
  });

  return (
    <>
    <div className={`flex-1 flex flex-col phone-scroll overflow-y-auto relative ${isWireframe ? 'bg-white text-gray-800' : 'bg-gray-50'}`}>
      {/* Header */}
      <div className={`p-4 shrink-0 bg-white border-b ${isWireframe ? 'border-gray-300' : 'border-gray-100 shadow-soft'}`}>
        <h2 className="text-sm font-extrabold font-display text-gray-800 flex items-center gap-2">
          <Map className={`w-4 h-4 ${isWireframe ? 'text-gray-800' : 'text-emerald-500'}`} />
          Peta Bank Sampah & TPS {city.shortName}
        </h2>
        <p className="text-[10px] text-gray-400 mt-0.5">Cari tempat penukaran dan pembuangan terdekat</p>
      </div>

      {/* Search and Filters */}
      <div className="p-3 bg-white border-b border-gray-100 space-y-2 shrink-0">
        <div className="relative">
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Cari Kelurahan, Bank Sampah, TPS..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`w-full py-2 pl-9 pr-3 text-xs rounded-xl border focus:outline-none focus:ring-2 ${
              isWireframe
                ? 'border-gray-400 focus:ring-gray-800 bg-white'
                : 'border-gray-200 focus:ring-emerald-500/20 focus:border-emerald-500 bg-gray-50/50'
            }`}
          />
        </div>

        {/* Filter Badges */}
        <div className="flex gap-1.5 overflow-x-auto phone-scroll pb-1">
          {['Semua', 'Bank Sampah', 'TPS', 'TPA'].map((type) => (
            <button
              key={type}
              onClick={() => setFilterType(type as any)}
              className={`px-3 py-1 rounded-full text-[9px] font-bold transition-all shrink-0 cursor-pointer ${
                filterType === type
                  ? isWireframe
                    ? 'bg-gray-800 text-white border border-black'
                    : 'bg-emerald-500 text-white shadow-sm'
                  : isWireframe
                  ? 'border border-gray-300 bg-white text-gray-600'
                  : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 min-h-[220px] bg-slate-100 relative overflow-hidden">
        {isWireframe ? (
          <div className="absolute inset-0 grid-bg opacity-30 flex items-center justify-center pointer-events-none">
            <div className="border border-gray-400 p-2 bg-white/80 rounded font-mono text-[9px] text-gray-400">
              [WIREFRAME_MAP_GRID: {city.adminName.toUpperCase()}_BOUNDS]
            </div>
          </div>
        ) : (
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path
              d="M 85,0 Q 88,25 78,50 T 92,100"
              fill="none"
              stroke="#93c5fd"
              strokeWidth="6"
              strokeLinecap="round"
              opacity="0.6"
            />
            <path
              d="M 0,35 Q 35,45 55,48 T 80,48"
              fill="none"
              stroke="#93c5fd"
              strokeWidth="3"
              strokeLinecap="round"
              opacity="0.5"
            />
            <line x1="0" y1="60" x2="100" y2="60" stroke="#e2e8f0" strokeWidth="2.5" />
            <line x1="0" y1="60" x2="100" y2="60" stroke="#cbd5e1" strokeWidth="1" strokeDasharray="3,3" />
            <line x1="58" y1="60" x2="58" y2="10" stroke="#e2e8f0" strokeWidth="2" />
          </svg>
        )}

        {!isWireframe && (
          <>
            {city.mapLandmarks.map((lm: any) => (
              <div
                key={lm.name}
                className="absolute text-[8px] font-bold text-blue-500 select-none bg-blue-50 px-1.5 py-0.5 rounded border border-blue-100"
                style={{ left: `${lm.x}%`, top: `${lm.y}%`, transform: 'translate(-50%, -50%)' }}
              >
                {lm.label}
              </div>
            ))}
            <div className="absolute right-3 bottom-[10%] text-[8px] font-semibold text-sky-500 select-none tracking-widest uppercase rotate-90">
              {city.riverName}
            </div>
          </>
        )}

        {filteredLocations.map((loc) => {
          const isSelected = selectedLoc?.id === loc.id;
          const pinColor = isWireframe
            ? isSelected ? 'text-black' : 'text-gray-400'
            : loc.type === 'Bank Sampah'
            ? isSelected ? 'text-indigo-600 scale-125' : 'text-indigo-400'
            : loc.type === 'TPA'
            ? isSelected ? 'text-red-600 scale-125' : 'text-red-500'
            : isSelected ? 'text-emerald-600 scale-125' : 'text-emerald-400';

          return (
            <button
              key={loc.id}
              onClick={() => setSelectedLoc(loc)}
              style={{ left: `${loc.coordinates.x}%`, top: `${loc.coordinates.y}%` }}
              className="absolute -translate-x-1/2 -translate-y-1/2 p-1.5 cursor-pointer transition-all duration-300 hover:scale-125 group z-20 card-hover"
            >
              <div className="relative">
                <MapPin className={`w-7 h-7 filter ${pinColor}`} />
                {/* Visual ripple effect for TPA or active selection */}
                {isSelected && !isWireframe && (
                  <span className="absolute -inset-0.5 bg-current opacity-20 rounded-full animate-ping pointer-events-none"></span>
                )}
                {/* Mini icon on pin */}
                <span className="absolute left-1/2 top-1.5 -translate-x-1/2 text-[7px] font-extrabold text-white font-mono uppercase">
                  {loc.type[0]}
                </span>
              </div>

              {/* Tooltip on hover */}
              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 scale-0 group-hover:scale-100 transition-all bg-gray-900 text-white text-[9px] font-bold px-2 py-1 rounded whitespace-nowrap z-50 pointer-events-none">
                {loc.name}
              </div>
            </button>
          );
        })}
      </div>

      {/* Selected Location Details Panel */}
      {selectedLoc ? (
        <div className={`p-4 pt-3 bg-white border-t rounded-t-3xl shrink-0 space-y-3.5 relative z-30 ${
            isWireframe ? 'border-gray-800' : 'border-gray-100 shadow-card anim-fade-in-up'
        }`}>
          {/* Drag Handle */}
          <div className="flex justify-center -mt-1 mb-1">
            <div className={`w-8 h-1 rounded-full ${isWireframe ? 'bg-gray-400' : 'bg-gray-300'}`} />
          </div>

          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className={`inline-block px-2.5 py-0.5 text-[8px] font-bold uppercase rounded-full ${
                  isWireframe
                    ? 'bg-gray-200 text-gray-800'
                    : selectedLoc.type === 'Bank Sampah'
                    ? 'bg-indigo-50 text-indigo-700 border border-indigo-100'
                    : selectedLoc.type === 'TPA'
                    ? 'bg-red-50 text-red-700 border border-red-100'
                    : 'bg-emerald-50 text-emerald-700 border border-emerald-100'
                }`}>
                  {selectedLoc.type}
                </span>
                <span className="text-[8px] text-gray-400 font-medium">{selectedLoc.distance} terdekat</span>
              </div>
              <h3 className="text-sm font-extrabold font-display text-gray-800 leading-tight">{selectedLoc.name}</h3>
              <p className="text-[9.5px] text-gray-500 leading-relaxed">{selectedLoc.address}</p>
            </div>

            <button onClick={() => setSelectedLoc(null)}
              className={`p-1.5 rounded-lg transition-all shrink-0 cursor-pointer btn-press ${
                isWireframe ? 'hover:bg-gray-100 text-gray-500' : 'hover:bg-gray-100 text-gray-400'
              }`}>
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className={`grid grid-cols-2 gap-2.5 text-[10px] p-3 rounded-xl ${
            isWireframe ? 'bg-gray-50 border border-gray-300' : 'bg-gray-50 border border-gray-100'
          }`}>
            <div className="flex items-center gap-2 text-gray-600">
              <div className={`p-1 rounded-md ${isWireframe ? 'bg-gray-200' : 'bg-white'}`}>
                <Clock className="w-3.5 h-3.5 text-gray-400" />
              </div>
              <div className="space-y-0.5">
                <span className="text-[7px] font-bold text-gray-400 uppercase block">Jam Operasi</span>
                <span className="font-semibold text-gray-700">{selectedLoc.hours}</span>
              </div>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <div className={`p-1 rounded-md ${isWireframe ? 'bg-gray-200' : 'bg-white'}`}>
                <Phone className="w-3.5 h-3.5 text-gray-400" />
              </div>
              <div className="space-y-0.5">
                <span className="text-[7px] font-bold text-gray-400 uppercase block">Kontak</span>
                <span className="font-semibold text-gray-700">{selectedLoc.phone}</span>
              </div>
            </div>
          </div>

          {/* Pricing Rates or Acceptable categories */}
          <div className="space-y-2">
            <h4 className="text-[9px] font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
              <Info className="w-3 h-3" />
              {selectedLoc.type === 'Bank Sampah' ? 'Tarif Tukar Poin (per Kg)' : 'Jenis Sampah Diterima'}
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {selectedLoc.type === 'Bank Sampah' ? (
                Object.entries(selectedLoc.rates).map(([item, rate]) => (
                  <div key={item}
                    className={`flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-[9px] font-bold ${
                      isWireframe
                        ? 'border border-gray-300 bg-white'
                        : 'bg-emerald-50/50 border border-emerald-100 text-emerald-800'
                    }`}>
                    <Award className="w-3 h-3 text-emerald-600" />
                    <span className="capitalize">{item}</span>
                    <span className={`ml-0.5 ${isWireframe ? 'text-gray-500' : 'text-emerald-500'}`}>{rate} pts/kg</span>
                  </div>
                ))
              ) : (
                selectedLoc.acceptedTypes.map((type) => (
                  <span key={type}
                    className={`px-2.5 py-1.5 rounded-xl text-[9px] font-medium ${
                      isWireframe
                        ? 'bg-gray-100 border border-gray-300 text-gray-700'
                        : 'bg-gray-100 border border-gray-50 text-gray-600'
                    }`}>
                    {type}
                  </span>
                ))
              )}
            </div>
          </div>

          {/* Call to Action buttons */}
          <div className="flex gap-2 pt-1">
            <button onClick={() => setAlertState({ open: true, title: "Navigasi Rute", message: `Navigasi rute tercepat menuju ${selectedLoc.name} akan segera tersedia!`, type: 'info' })}
              className={`flex-1 py-2.5 text-xs font-bold text-white rounded-xl flex items-center justify-center gap-1.5 cursor-pointer transition-all btn-press active:scale-[0.98] ${
                isWireframe ? 'bg-gray-900 border-2 border-black hover:bg-gray-800 shadow-none' : 'bg-emerald-500 hover:bg-emerald-600 shadow-sm'
              }`}>
              <Compass className="w-4 h-4" />
              Petunjuk Rute
            </button>
            <a href={`tel:${selectedLoc.phone}`}
              className={`px-4 py-2.5 text-xs font-bold rounded-xl flex items-center justify-center border transition-all btn-press ${
                isWireframe ? 'border-gray-400 text-gray-800 hover:bg-gray-100' : 'border-gray-200 hover:bg-gray-50 hover:border-gray-300 text-gray-600'
              }`}>
              <Phone className="w-4 h-4" />
            </a>
          </div>
        </div>
      ) : (
        <div className="p-4 bg-white text-center text-xs text-gray-400 border-t border-gray-100 flex items-center justify-center gap-1.5">
          <MapPin className="w-3.5 h-3.5 text-gray-300" />
          Ketuk pin marker untuk lihat detail
        </div>
      )}
        </div>

        <CustomAlert
          open={alertState.open}
          onClose={() => setAlertState(a => ({ ...a, open: false }))}
          title={alertState.title}
          message={alertState.message}
          type={alertState.type as any}
          actionLabel={alertState.actionLabel}
          onAction={alertState.onAction}
        />
      </>
    );
  }
