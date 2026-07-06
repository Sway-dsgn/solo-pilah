import React, { useState } from 'react';
import { WASTE_CATEGORIES } from '../data';
import { BookOpen, Search, Leaf, Layers, Skull, Cpu, ArrowRight, HelpCircle, AlertCircle, X, Star } from 'lucide-react';

interface GuideProps {
  isWireframe: boolean;
  city: any;
}

export default function Guide({ isWireframe, city }: GuideProps) {
  const [activeCategory, setActiveCategory] = useState<string>('organik');
  const [searchQuery, setSearchQuery] = useState('');

  // Icon mapping helper
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Leaf':
        return Leaf;
      case 'Layers':
        return Layers;
      case 'Skull':
        return Skull;
      case 'Cpu':
        return Cpu;
      default:
        return HelpCircle;
    }
  };

  // List of searchable keywords and their correct category
  const itemKeywords = [
    { name: 'Nasi Bekas', category: 'organik' },
    { name: 'Kulit Pisang', category: 'organik' },
    { name: 'Daun Kering', category: 'organik' },
    { name: 'Sayur Busuk', category: 'organik' },
    { name: 'Cangkang Telur', category: 'organik' },
    { name: 'Botol Plastik Aqua', category: 'anorganik' },
    { name: 'Kardus Box Paket', category: 'anorganik' },
    { name: 'Kaleng Sprite / Coca-cola', category: 'anorganik' },
    { name: 'Gelas Kaca Beling', category: 'anorganik' },
    { name: 'Kertas HVS Bekas', category: 'anorganik' },
    { name: 'Baterai Jam AA / AAA', category: 'b3' },
    { name: 'Lampu Neon Fluorescent', category: 'b3' },
    { name: 'Spray Baygon Obat Nyamuk', category: 'b3' },
    { name: 'Botol Deterjen Pembersih', category: 'b3' },
    { name: 'Termometer Raksa Pecah', category: 'b3' },
    { name: 'Handphone Rusak Bekas', category: 'elektronik' },
    { name: 'Kabel Charger Handphone', category: 'elektronik' },
    { name: 'Motherboard Laptop', category: 'elektronik' },
    { name: 'Kipas Angin Rusak', category: 'elektronik' },
    { name: 'Remote TV Rusak', category: 'elektronik' },
  ];

  // Search filter
  const searchResults = searchQuery
    ? itemKeywords.filter((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const selectedCategoryData = WASTE_CATEGORIES.find((cat) => cat.id === activeCategory)!;
  const CategoryIcon = getIcon(selectedCategoryData.icon);

  return (
    <div className={`flex-1 flex flex-col phone-scroll overflow-y-auto ${isWireframe ? 'bg-white text-gray-800' : 'bg-gray-50'}`}>
      {/* Header */}
      <div className={`p-4 shrink-0 bg-white border-b ${isWireframe ? 'border-gray-300' : 'border-gray-100'}`}>
        <h2 className="text-sm font-extrabold font-display text-gray-800 flex items-center gap-2">
          <BookOpen className={`w-4 h-4 ${isWireframe ? 'text-gray-800' : 'text-emerald-500'}`} />
          Panduan Pemilahan Sampah
        </h2>
        <p className="text-[10px] text-gray-400 mt-0.5">Pilahlah dengan benar untuk mendukung daur ulang {city.shortName}</p>
      </div>

      {/* Smart Search Bar */}
      <div className="p-3 bg-white border-b border-gray-100 space-y-1.5 shrink-0">
        <div className="relative">
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Cari nama barang (misal: botol, baterai, daun)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`w-full py-2 pl-9 pr-8 text-xs rounded-xl border focus:outline-none focus:ring-2 ${
              isWireframe
                ? 'border-gray-400 focus:ring-gray-800 bg-white'
                : 'border-gray-200 focus:ring-emerald-500/20 focus:border-emerald-500 bg-gray-50/50'
            }`}
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-2 text-gray-400 hover:text-gray-600 font-bold text-xs"
            >
              <X className="w-3 h-3" />
            </button>
          )}
        </div>

        {/* Real-time search suggestions dropdown */}
        {searchQuery && (
          <div className={`border rounded-xl max-h-32 overflow-y-auto phone-scroll bg-white p-2 space-y-1 z-30 absolute left-3 right-3 ${
            isWireframe ? 'border-gray-800' : 'border-gray-100'
          }`}>
            {searchResults.length === 0 ? (
              <div className="p-2 text-center text-[10px] text-gray-400 flex items-center justify-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                Barang tidak ditemukan. Pilah secara umum.
              </div>
            ) : (
              searchResults.map((res) => (
                <button
                  key={res.name}
                  onClick={() => {
                    setActiveCategory(res.category);
                    setSearchQuery('');
                  }}
                  className="w-full text-left p-1.5 hover:bg-gray-50 rounded-lg text-[10px] flex justify-between items-center cursor-pointer font-medium"
                >
                  <span className="text-gray-700 font-semibold">{res.name}</span>
                  <span className={`px-2 py-0.5 text-[8px] font-bold rounded-full uppercase ${
                    res.category === 'organik'
                      ? 'bg-emerald-50 text-emerald-700'
                      : res.category === 'anorganik'
                      ? 'bg-blue-50 text-blue-700'
                      : res.category === 'b3'
                      ? 'bg-red-50 text-red-700'
                      : 'bg-yellow-50 text-yellow-700'
                  }`}>
                    {res.category}
                  </span>
                </button>
              ))
            )}
          </div>
        )}
      </div>

      {/* Category Selection Tabs Grid */}
      <div className="p-3 shrink-0">
        <div className="grid grid-cols-4 gap-1.5">
          {WASTE_CATEGORIES.map((cat) => {
            const Icon = getIcon(cat.icon);
            const isSelected = activeCategory === cat.id;

            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`p-2 rounded-xl border flex flex-col items-center text-center cursor-pointer transition-all ${
                  isSelected
                    ? isWireframe
                      ? 'border-2 border-black bg-gray-100 font-extrabold'
                      : `border-[1.5px] ring-2`
                    : 'border-gray-100 bg-white text-gray-500'
                }`}
                style={{
                  borderColor: isSelected && !isWireframe ? cat.color : undefined,
                  boxShadow: isSelected && !isWireframe ? `${cat.color}15 0px 4px 12px` : undefined,
                  color: isSelected && !isWireframe ? cat.color : undefined,
                }}
              >
                <Icon className="w-4 h-4 mb-1" />
                <span className="text-[9px] font-bold block leading-none">{cat.indonesianName.split(' ')[0]}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Category Content Details */}
      <div className="px-3 pb-4 flex-1">
        <div className={`p-4 rounded-2xl border bg-white ${
          isWireframe ? 'border-gray-300' : 'border-gray-100/60'
        }`}>
          {/* Header section */}
          <div className="flex items-start gap-3 mb-3 border-b border-gray-100 pb-3">
            <div
              className={`p-2.5 rounded-xl shrink-0 ${
                isWireframe ? 'border border-gray-400' : ''
              }`}
              style={{
                backgroundColor: !isWireframe ? `${selectedCategoryData.color}12` : undefined,
                color: !isWireframe ? selectedCategoryData.color : undefined
              }}
            >
              <CategoryIcon className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[9px] font-bold uppercase tracking-wider text-gray-400">Klasifikasi Sampah</span>
              <h3 className="text-xs font-bold font-display text-gray-800">
                Sampah {selectedCategoryData.indonesianName}
              </h3>
            </div>
          </div>

          <p className="text-[10px] text-gray-600 leading-relaxed mb-4">
            {selectedCategoryData.description}
          </p>

          {/* Examples section */}
          <div className="space-y-2 mb-4">
            <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Contoh Barang:</h4>
            <div className="grid grid-cols-2 gap-1.5">
              {selectedCategoryData.examples.map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-1.5 text-[10px] text-gray-600 font-medium"
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${isWireframe ? 'bg-gray-400' : ''}`} style={{ backgroundColor: !isWireframe ? selectedCategoryData.color : undefined }} />
                  <span className="truncate">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Golden Recycling Tips */}
          <div className={`p-3 rounded-xl ${isWireframe ? 'border border-gray-300 bg-gray-50' : 'bg-gray-50/50'}`}>
            <h4 className="text-[9px] font-bold text-gray-800 uppercase tracking-wider mb-2 flex items-center gap-1">
              <Star className="w-3 h-3 text-amber-500 fill-amber-500" /> Tips Pengelolaan Cerdas
            </h4>
            <ul className="space-y-1.5 list-none">
              {selectedCategoryData.tips.map((tip, idx) => (
                <li key={idx} className="text-[9px] text-gray-500 leading-relaxed flex items-start gap-1">
                  <span className="text-emerald-500 font-bold select-none">â€¢</span>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
