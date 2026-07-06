import React, { useState } from 'react';
import {
  Sparkles,
  Layers,
  Award,
  Users,
  Route,
  Info,
  Trash2,
  CheckCircle2,
  BookOpen,
  Leaf
} from 'lucide-react';

interface DesignSystemProps {
  onSelectPersona: (role: 'Masyarakat' | 'Petugas' | 'BankSampah') => void;
  activePersona: string;
}

export default function DesignSystem({ onSelectPersona, activePersona }: DesignSystemProps) {
  const [activeTab, setActiveTab] = useState<'colors' | 'typography' | 'personas' | 'flows' | 'tpa_info'>('personas');

  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden h-full flex flex-col">
      {/* Header */}
      <div className="p-6 bg-gradient-to-r from-emerald-600 via-emerald-700 to-emerald-600 text-white">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-white/10 rounded-lg">
            <Leaf className="w-6 h-6 text-emerald-100" />
          </div>
          <h1 className="text-2xl font-bold font-display tracking-tight">Solo Pilah Design System</h1>
        </div>
        <p className="text-sm text-emerald-100 max-w-lg">
          Panduan gaya, persona, user flow, dan solusi penanggulangan timbulan sampah di TPA Putri Cempo Surakarta.
        </p>
      </div>

      {/* Tabs Menu */}
      <div className="flex border-b border-gray-100 overflow-x-auto phone-scroll bg-gray-50/50">
        {[
          { id: 'personas', label: 'User Personas', icon: Users },
          { id: 'flows', label: 'User Flows', icon: Route },
          { id: 'colors', label: 'Warna & UI', icon: Layers },
          { id: 'typography', label: 'Tipografi', icon: Sparkles },
          { id: 'tpa_info', label: 'Krisis Putri Cempo', icon: Info },
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-5 py-3.5 text-xs font-semibold border-b-2 transition-all shrink-0 whitespace-nowrap ${
                activeTab === tab.id
                  ? 'border-emerald-500 text-emerald-600 bg-white'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-100/50'
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Scrollable Content Container */}
      <div className="flex-1 overflow-y-auto p-6 phone-scroll">
        {/* TAB 1: USER PERSONAS */}
        {activeTab === 'personas' && (
          <div className="space-y-6">
            <div className="bg-emerald-50/60 p-4 rounded-xl border border-emerald-100/50">
              <h3 className="text-sm font-bold text-emerald-800 font-display flex items-center gap-2 mb-1.5">
                <Users className="w-4 h-4" />
                Target Pengguna & Role Simulation
              </h3>
              <p className="text-xs text-emerald-700 leading-relaxed">
                Solo Pilah memiliki 3 role utama. Klik salah satu kartu di bawah ini untuk mensimulasikan role tersebut di smartphone sebelah kanan!
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Persona 1: Masyarakat */}
              <button
                onClick={() => onSelectPersona('Masyarakat')}
                className={`text-left p-4 rounded-xl border transition-all duration-200 cursor-pointer ${
                  activePersona === 'Masyarakat'
                    ? 'border-emerald-500 bg-emerald-50/30 ring-2 ring-emerald-500/20'
                    : 'border-gray-100 hover:border-gray-200 hover:shadow-sm bg-white'
                }`}
              >
                <div className="flex items-center gap-3 mb-3">
                  <img
                    src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=60"
                    alt="Ahmad Fauzi"
                    className="w-10 h-10 rounded-full border-2 border-emerald-500 object-cover"
                  />
                  <div>
                    <h4 className="text-xs font-bold text-gray-800 font-display">Ahmad Fauzi (28)</h4>
                    <span className="inline-block px-2 py-0.5 text-[9px] font-bold bg-emerald-100 text-emerald-800 rounded-full mt-0.5">
                      Masyarakat / Warga
                    </span>
                  </div>
                </div>
                <div className="space-y-2 text-[11px] text-gray-600">
                  <p><strong>Goal:</strong> Memilah sampah praktis, tahu kapan truk sampah datang, dan ingin menukarkan sampah anorganik jadi poin saldo BST.</p>
                  <p className="line-clamp-2"><strong>Pain Point:</strong> Sering tertinggal truk pengangkut sampah, bingung memilah jenis B3, melihat banyak sampah liar.</p>
                </div>
                <div className="mt-3 pt-3 border-t border-gray-100 flex justify-between items-center text-[10px]">
                  <span className="text-emerald-600 font-bold">Simulasikan Role</span>
                  {activePersona === 'Masyarakat' && (
                    <span className="px-1.5 py-0.5 bg-emerald-500 text-white rounded font-bold">Aktif</span>
                  )}
                </div>
              </button>

              {/* Persona 2: Petugas Kebersihan */}
              <button
                onClick={() => onSelectPersona('Petugas')}
                className={`text-left p-4 rounded-xl border transition-all duration-200 cursor-pointer ${
                  activePersona === 'Petugas'
                    ? 'border-blue-500 bg-blue-50/30 ring-2 ring-blue-500/20'
                    : 'border-gray-100 hover:border-gray-200 hover:shadow-sm bg-white'
                }`}
              >
                <div className="flex items-center gap-3 mb-3">
                  <img
                    src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=60"
                    alt="Budi Santoso"
                    className="w-10 h-10 rounded-full border-2 border-blue-500 object-cover"
                  />
                  <div>
                    <h4 className="text-xs font-bold text-gray-800 font-display">Budi Santoso (35)</h4>
                    <span className="inline-block px-2 py-0.5 text-[9px] font-bold bg-blue-100 text-blue-800 rounded-full mt-0.5">
                      Petugas DLH Solo
                    </span>
                  </div>
                </div>
                <div className="space-y-2 text-[11px] text-gray-600">
                  <p><strong>Goal:</strong> Mendapat peta laporan tumpukan sampah liar dengan koordinat GPS presisi, dan memperbarui status pembersihan.</p>
                  <p className="line-clamp-2"><strong>Pain Point:</strong> Sulit melacak lokasi laporan sampah warga karena deskripsi jalan yang tidak jelas.</p>
                </div>
                <div className="mt-3 pt-3 border-t border-gray-100 flex justify-between items-center text-[10px]">
                  <span className="text-blue-600 font-bold">Simulasikan Role</span>
                  {activePersona === 'Petugas' && (
                    <span className="px-1.5 py-0.5 bg-blue-500 text-white rounded font-bold">Aktif</span>
                  )}
                </div>
              </button>

              {/* Persona 3: Pengelola Bank Sampah */}
              <button
                onClick={() => onSelectPersona('BankSampah')}
                className={`text-left p-4 rounded-xl border transition-all duration-200 cursor-pointer ${
                  activePersona === 'BankSampah'
                    ? 'border-indigo-500 bg-indigo-50/30 ring-2 ring-indigo-500/20'
                    : 'border-gray-100 hover:border-gray-200 hover:shadow-sm bg-white'
                }`}
              >
                <div className="flex items-center gap-3 mb-3">
                  <img
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=60"
                    alt="Siti Rahma"
                    className="w-10 h-10 rounded-full border-2 border-indigo-500 object-cover"
                  />
                  <div>
                    <h4 className="text-xs font-bold text-gray-800 font-display">Siti Rahmawati (41)</h4>
                    <span className="inline-block px-2 py-0.5 text-[9px] font-bold bg-indigo-100 text-indigo-800 rounded-full mt-0.5">
                      Pengelola Bank Sampah
                    </span>
                  </div>
                </div>
                <div className="space-y-2 text-[11px] text-gray-600">
                  <p><strong>Goal:</strong> Menerima setoran sampah warga yang sudah terpilah, melakukan pencatatan timbangan digital, dan membagikan poin.</p>
                  <p className="line-clamp-2"><strong>Pain Point:</strong> Pencatatan buku manual rawan hilang dan warga malas menyetor karena tidak ada insentif cepat.</p>
                </div>
                <div className="mt-3 pt-3 border-t border-gray-100 flex justify-between items-center text-[10px]">
                  <span className="text-indigo-600 font-bold">Simulasikan Role</span>
                  {activePersona === 'BankSampah' && (
                    <span className="px-1.5 py-0.5 bg-indigo-500 text-white rounded font-bold">Aktif</span>
                  )}
                </div>
              </button>
            </div>

            <div className="border-t border-gray-100 pt-6">
              <h3 className="text-sm font-bold text-gray-800 font-display mb-3">Matriks Perbandingan Fitur Berdasarkan Role</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-gray-200 bg-gray-50/80">
                      <th className="p-3 font-bold text-gray-700">Fitur Utama App</th>
                      <th className="p-3 font-bold text-emerald-700">Masyarakat</th>
                      <th className="p-3 font-bold text-blue-700">Petugas</th>
                      <th className="p-3 font-bold text-indigo-700">Bank Sampah</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-100">
                      <td className="p-3 font-semibold text-gray-800">Dashboard & Statistik</td>
                      <td className="p-3 text-gray-600">Poin pribadi, riwayat setor, status TPA</td>
                      <td className="p-3 text-gray-600">Total sampah dibersihkan, rute aktif</td>
                      <td className="p-3 text-gray-600">Volume gudang, total nasabah aktif</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="p-3 font-semibold text-gray-800">Lapor Tumpukan Sampah</td>
                      <td className="p-3 text-gray-600">Lapor foto + GPS, raih poin verifikasi</td>
                      <td className="p-3 text-gray-600">Menerima tiket kerja, foto before-after</td>
                      <td className="p-3 text-gray-500">Melihat area tumpukan sekitar depo</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="p-3 font-semibold text-gray-800">Pencatatan Setoran</td>
                      <td className="p-3 text-gray-500">Scan QR Code saat menyetor</td>
                      <td className="p-3 text-gray-500">-</td>
                      <td className="p-3 text-gray-600">Input Kg sampah warga, otomatis rilis poin</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="p-3 font-semibold text-gray-800">Tukar Poin / Reward</td>
                      <td className="p-3 text-gray-600">Redeem tiket BST, voucher e-wallet, kompos</td>
                      <td className="p-3 text-gray-600">Bonus insentif dari dinas</td>
                      <td className="p-3 text-gray-500">Kelola suplai kompos & merchandise</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: USER FLOW */}
        {activeTab === 'flows' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-bold text-gray-800 font-display mb-2 flex items-center gap-2">
                <Route className="w-4 h-4 text-emerald-500" />
                User Flow 1: Lapor Tumpukan Sampah Liar (Masyarakat & Petugas)
              </h3>
              <p className="text-xs text-gray-500 mb-4 leading-relaxed">
                Alur kolaboratif warga melaporkan sampah liar hingga dibersihkan oleh petugas kebersihan Dinas Lingkungan Hidup Kota Surakarta.
              </p>
              <div className="space-y-3 relative before:absolute before:left-3 before:top-2 before:bottom-2 before:w-[2px] before:bg-emerald-100">
                <div className="relative pl-8">
                  <div className="absolute left-1.5 top-1 w-3.5 h-3.5 rounded-full border-2 border-emerald-500 bg-white flex items-center justify-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  </div>
                  <h4 className="text-xs font-bold text-gray-800 font-display">1. Temukan & Foto Sampah Liar</h4>
                  <p className="text-[11px] text-gray-600 mt-0.5">Warga melihat tumpukan sampah tak resmi, membuka menu <strong>Lapor</strong>, mengambil foto serta mendeskripsikan kondisi sampah.</p>
                </div>
                <div className="relative pl-8">
                  <div className="absolute left-1.5 top-1 w-3.5 h-3.5 rounded-full border-2 border-emerald-500 bg-white flex items-center justify-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  </div>
                  <h4 className="text-xs font-bold text-gray-800 font-display">2. Deteksi GPS Otomatis</h4>
                  <p className="text-[11px] text-gray-600 mt-0.5">Sistem mendeteksi koordinat GPS (Surakarta) untuk memudahkan tim DLH menuju lokasi secara instan tanpa tersesat.</p>
                </div>
                <div className="relative pl-8">
                  <div className="absolute left-1.5 top-1 w-3.5 h-3.5 rounded-full border-2 border-blue-500 bg-white flex items-center justify-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                  </div>
                  <h4 className="text-xs font-bold text-gray-800 font-display">3. Notifikasi Pekerjaan Petugas</h4>
                  <p className="text-[11px] text-gray-600 mt-0.5">Laporan masuk ke server DLH. Petugas terdekat (misal: Pak Budi) mendapat notifikasi peta, menekan tombol <strong>Mulai Bersihkan</strong>.</p>
                </div>
                <div className="relative pl-8">
                  <div className="absolute left-1.5 top-1 w-3.5 h-3.5 rounded-full border-2 border-emerald-500 bg-white flex items-center justify-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  </div>
                  <h4 className="text-xs font-bold text-gray-800 font-display">4. Verifikasi Selesai & Rilis Poin</h4>
                  <p className="text-[11px] text-gray-600 mt-0.5">Petugas mengunggah foto "After" pembersihan. Status berubah menjadi <strong>Selesai</strong>, warga pelapor menerima notifikasi dan instan mendapat 150 CempoPoints.</p>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-100 pt-6">
              <h3 className="text-sm font-bold text-gray-800 font-display mb-2 flex items-center gap-2">
                <Route className="w-4 h-4 text-emerald-500" />
                User Flow 2: Setor Sampah Daur Ulang & Tukar Reward (Masyarakat & Bank Sampah)
              </h3>
              <p className="text-xs text-gray-500 mb-4 leading-relaxed">
                Cara masyarakat menyetor plastik, kertas, minyak jelantah atau e-waste dan mengubahnya menjadi voucher perjalanan atau belanja.
              </p>
              <div className="space-y-3 relative before:absolute before:left-3 before:top-2 before:bottom-2 before:w-[2px] before:bg-indigo-100">
                <div className="relative pl-8">
                  <div className="absolute left-1.5 top-1 w-3.5 h-3.5 rounded-full border-2 border-indigo-500 bg-white flex items-center justify-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>
                  </div>
                  <h4 className="text-xs font-bold text-gray-800 font-display">1. Pilah & Kemas Sampah</h4>
                  <p className="text-[11px] text-gray-600 mt-0.5">Warga memilah sampah anorganik sesuai panduan visual di menu <strong>Panduan</strong> (misal botol PET & kardus kosong).</p>
                </div>
                <div className="relative pl-8">
                  <div className="absolute left-1.5 top-1 w-3.5 h-3.5 rounded-full border-2 border-indigo-500 bg-white flex items-center justify-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>
                  </div>
                  <h4 className="text-xs font-bold text-gray-800 font-display">2. Setor ke Bank Sampah</h4>
                  <p className="text-[11px] text-gray-600 mt-0.5">Warga membawa sampah terpilah ke Bank Sampah terdekat yang ditemukan lewat <strong>Peta Lokasi</strong>.</p>
                </div>
                <div className="relative pl-8">
                  <div className="absolute left-1.5 top-1 w-3.5 h-3.5 rounded-full border-2 border-indigo-500 bg-white flex items-center justify-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>
                  </div>
                  <h4 className="text-xs font-bold text-gray-800 font-display">3. Timbang & Scan QR Code</h4>
                  <p className="text-[11px] text-gray-600 mt-0.5">Pengelola Bank Sampah menimbang sampah dan menginputnya ke sistem Solo Pilah. Nasabah menunjukkan QR Code profilnya untuk divalidasi.</p>
                </div>
                <div className="relative pl-8">
                  <div className="absolute left-1.5 top-1 w-3.5 h-3.5 rounded-full border-2 border-emerald-500 bg-white flex items-center justify-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  </div>
                  <h4 className="text-xs font-bold text-gray-800 font-display">4. Klaim Voucher Gratis</h4>
                  <p className="text-[11px] text-gray-600 mt-0.5">Poin masuk ke dompet warga. Poin diakumulasikan dan bisa langsung ditukarkan dengan tiket gratis Bus Batik Solo Trans di menu <strong>Tukar Poin</strong>.</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: COLORS & COMPONENT SYSTEM */}
        {activeTab === 'colors' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-bold text-gray-800 font-display mb-3">Solo Pilah Palette (Clean Minimalism)</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3 rounded-xl bg-emerald-500 text-white">
                  <div className="text-xs font-bold font-display">Primary Green</div>
                  <div className="text-[10px] font-mono mt-1">#2D6A4F</div>
                  <div className="text-[9px] mt-2 opacity-90">Simbol alam, kebersihan, & kelestarian</div>
                </div>
                <div className="p-3 rounded-xl bg-emerald-600 text-white">
                  <div className="text-xs font-bold font-display">Deep Forest</div>
                  <div className="text-[10px] font-mono mt-1">#1B4332</div>
                  <div className="text-[9px] mt-2 opacity-90">Keasrian, kedalaman, & kontras kokoh</div>
                </div>
                <div className="p-3 rounded-xl bg-gray-900 text-white">
                  <div className="text-xs font-bold font-display">Charcoal Gray</div>
                  <div className="text-[10px] font-mono mt-1">#111827</div>
                  <div className="text-[9px] mt-2 opacity-90">Teks kontras tinggi & elemen gelap</div>
                </div>
                <div className="p-3 rounded-xl bg-[#F2F7F2] border border-emerald-100 text-emerald-800">
                  <div className="text-xs font-bold font-display">Light Sage</div>
                  <div className="text-[10px] font-mono mt-1">#F2F7F2</div>
                  <div className="text-[9px] mt-2 opacity-90">Warna background modul & card</div>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-100 pt-6">
              <h3 className="text-sm font-bold text-gray-800 font-display mb-3">Elemen Antarmuka (Material Design Inspired)</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2">Tombol (Button) State</h4>
                  <div className="flex flex-wrap gap-2.5">
                    <button className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold rounded-xl transition-all">
                      Primary Button
                    </button>
                    <button className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white text-xs font-bold rounded-xl transition-all">
                      Secondary Button
                    </button>
                    <button className="px-4 py-2 border border-gray-200 hover:border-gray-300 text-gray-700 text-xs font-bold rounded-xl transition-all">
                      Outline Button
                    </button>
                    <button className="px-4 py-2 bg-gray-100 text-gray-400 text-xs font-bold rounded-xl cursor-not-allowed" disabled>
                      Disabled Button
                    </button>
                  </div>
                </div>

                <div>
                  <h4 className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2">Status Badges</h4>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-2.5 py-1 text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200 rounded-full">
                      Menunggu Verifikasi
                    </span>
                    <span className="px-2.5 py-1 text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-200 rounded-full">
                      Diproses Petugas
                    </span>
                    <span className="px-2.5 py-1 text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full">
                      Selesai Dibersihkan
                    </span>
                  </div>
                </div>

                <div>
                  <h4 className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2">Shadows & Card Borders</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="p-4 rounded-xl border border-gray-100 bg-white text-xs">
                      <strong>Card Border Ringan:</strong> Cocok untuk visualisasi berulang dalam grid dengan kontras elegan.
                    </div>
                    <div className="p-4 rounded-xl bg-white text-xs">
                      <strong>Card Shadow Sedang:</strong> Menandakan elemen interaktif melayang yang bisa ditekan (clickable).
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: TYPOGRAPHY */}
        {activeTab === 'typography' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-bold text-gray-800 font-display mb-3">Hierarki Tipografi</h3>
              <p className="text-xs text-gray-500 mb-4">
                Menggunakan perpaduan <strong>Plus Jakarta Sans</strong> untuk judul dan display demi ekspresi modern, ramah, dan bersahabat, serta <strong>Inter</strong> untuk keterbacaan teks utama yang solid.
              </p>

              <div className="space-y-5 border border-gray-100 rounded-xl p-5 bg-gray-50/50">
                <div className="border-b border-gray-200/50 pb-3">
                  <div className="text-[10px] font-mono text-gray-400 mb-1">Heading 1 - Plus Jakarta Sans Bold</div>
                  <div className="text-2xl font-bold text-gray-900 font-display tracking-tight">Krisis TPA Putri Cempo</div>
                </div>
                <div className="border-b border-gray-200/50 pb-3">
                  <div className="text-[10px] font-mono text-gray-400 mb-1">Heading 2 - Plus Jakarta Sans Semibold</div>
                  <div className="text-lg font-bold text-gray-800 font-display">Tukar Poin CempoPoints</div>
                </div>
                <div className="border-b border-gray-200/50 pb-3">
                  <div className="text-[10px] font-mono text-gray-400 mb-1">Body Text - Inter Regular</div>
                  <div className="text-xs text-gray-600 leading-relaxed">
                    Setorkan sampah anorganik yang telah dibilas dan dikelompokkan ke bank sampah terdekat untuk diakumulasikan menjadi poin.
                  </div>
                </div>
                <div>
                  <div className="text-[10px] font-mono text-gray-400 mb-1">Metadata/Mono - JetBrains Mono Medium</div>
                  <div className="text-[11px] font-mono text-emerald-600 font-medium">AD 9102 UA â€¢ GPS: -7.5361, 110.8549</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: TPA CRISIS INFO */}
        {activeTab === 'tpa_info' && (
          <div className="space-y-4">
            <div className="bg-amber-50 border border-amber-200/80 p-4 rounded-xl text-amber-900 text-xs">
              <h3 className="font-bold flex items-center gap-1.5 mb-1 text-sm text-amber-800">
                <Trash2 className="w-4 h-4" />
                Masalah Utama: Gunung Sampah Mojosongo
              </h3>
              <p className="leading-relaxed">
                TPA Putri Cempo mengalami penumpukan sampah parah akibat manajemen pemisahan yang tidak optimal dari level rumah tangga. Mengakibatkan kebakaran gas metana dan pencemaran air sungai Bengawan Solo.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 text-center">
              <div className="p-3 bg-red-50 rounded-xl border border-red-100">
                <div className="text-lg font-bold font-display text-red-600">300 Ton</div>
                <div className="text-[10px] text-red-800 font-semibold mt-0.5">Timbulan Sampah / Hari</div>
              </div>
              <div className="p-3 bg-amber-50 rounded-xl border border-amber-100">
                <div className="text-lg font-bold font-display text-amber-600">17 Hektar</div>
                <div className="text-[10px] text-amber-800 font-semibold mt-0.5">Luas Lahan (Overload!)</div>
              </div>
            </div>

            <div className="space-y-2 text-xs text-gray-600 leading-relaxed">
              <h4 className="font-bold text-gray-800 font-display">Bagaimana Solo Pilah Membantu?</h4>
              <p>
                <strong>1. Pengurangan dari Hulu:</strong> Memotivasi warga memilah sampah organik dan menyetor sampah anorganik ke Bank Sampah lokal sehingga tidak semuanya berakhir di Putri Cempo.
              </p>
              <p>
                <strong>2. Penanganan Sampah Liar Lebih Cepat:</strong> Dengan koordinat GPS presisi dan foto, masyarakat ikut mengawasi TPS liar ilegal yang merusak tata kota Surakarta.
              </p>
              <p>
                <strong>3. Pengolahan Kompos PLTSa:</strong> Menyuplai sampah terpilah kering berkalor tinggi untuk menyokong kebutuhan pembakaran PLTSa Putri Cempo yang bebas gas beracun.
              </p>
            </div>

            <div className="mt-4 p-3 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-xl text-white flex items-center justify-between">
              <div className="text-[11px]">
                <div className="font-bold">Misi Surakarta Bebas Sampah</div>
                <div className="opacity-90">Kota Solo Resik & Bebas Gunung Sampah</div>
              </div>
              <BookOpen className="w-8 h-8 opacity-20" />
            </div>
          </div>
        )}
      </div>

      {/* Footer info */}
      <div className="p-4 bg-gray-50 border-t border-gray-100 text-[10px] text-gray-400 flex justify-between">
        <span>Solo Pilah Mobile UI/UX Prototype â€¢ Surakarta</span>
        <span>Version 1.0.0</span>
      </div>
    </div>
  );
}
