import React, { useState } from 'react';
import CustomAlert from './CustomAlert';

import { RewardItem, UserProfile } from '../types';
import { Award, ShoppingBag, Check, Gift, ArrowRight, Zap, RefreshCw, Smartphone, X } from 'lucide-react';

interface RewardsProps {
  profile: UserProfile;
  setProfile: React.Dispatch<React.SetStateAction<UserProfile>>;
  isWireframe: boolean;
  city: any;
}

export default function Rewards({ profile, setProfile, isWireframe, city }: RewardsProps) {
  const [activeCategory, setActiveCategory] = useState<'Semua' | 'Transportasi' | 'Voucher' | 'Voucher UMKM' | 'Kebutuhan' | 'Merchandise'>('Semua');
  const [selectedReward, setSelectedReward] = useState<RewardItem | null>(null);
  const [successRedeem, setSuccessRedeem] = useState<boolean>(false);
  const [alertState, setAlertState] = useState<{ open: boolean; title: string; message: string; type?: 'info' | 'warning' | 'success' }>({ open: false, title: '', message: '' });

  const filteredRewards = city.rewardItems.filter(
    (item: RewardItem) => activeCategory === 'Semua' || item.category === activeCategory
  );

  const handleRedeem = (reward: RewardItem) => {
    if (profile.points < reward.pointsCost) {
      setAlertState({ open: true, title: "Poin Tidak Cukup", message: "EcoPoint Anda tidak mencukupi untuk menukar reward ini!", type: 'warning' });
      return;
    }

    // Deduct points from profile
    setProfile((prev) => ({
      ...prev,
      points: prev.points - reward.pointsCost,
    }));

    setSuccessRedeem(true);
  };

  const handleCloseModal = () => {
    setSelectedReward(null);
    setSuccessRedeem(false);
  };

  const MOCK_QUESTS = [
    {
      id: 'q1',
      title: `Pahlawan Plastik ${city.shortName}`,
      desc: `Setor 5 Kg sampah botol plastik ke Bank Sampah terdekat.`,
      progress: 3,
      target: 5,
      unit: 'Kg',
      reward: 200,
      completed: false
    },
    {
      id: 'q2',
      title: 'Patroli Kebersihan',
      desc: 'Laporkan tumpukan sampah liar menggunakan GPS & Kamera.',
      progress: 1,
      target: 1,
      unit: 'Laporan',
      reward: 150,
      completed: true
    }
  ];

  return (
    <div className={`flex-1 flex flex-col phone-scroll overflow-y-auto ${isWireframe ? 'bg-white text-gray-800' : 'bg-gray-50'} relative`}>
      {/* Header */}
      <div className={`p-4 shrink-0 bg-white border-b shadow-soft ${isWireframe ? 'border-gray-300' : 'border-gray-100'}`}>
        <h2 className="text-sm font-extrabold font-display text-gray-800 flex items-center gap-2">
          <Award className={`w-4 h-4 ${isWireframe ? 'text-gray-800' : 'text-emerald-500'}`} />
          Klaim Voucher & Merchandise
        </h2>
        <p className="text-[10px] text-gray-400 mt-0.5">Tukarkan poin hasil pemilahan dengan aneka voucher bermanfaat</p>
      </div>

      {/* Points Card */}
      <div className="p-4 shrink-0">
        <div className={`p-4 rounded-2xl relative overflow-hidden text-white shadow-card ${
          isWireframe
            ? 'border-2 border-gray-800 bg-white text-gray-800'
              : 'bg-gradient-to-r from-emerald-500 via-teal-600 to-emerald-600'
        }`}>
          <div className="flex justify-between items-center relative z-10">
            <div>
              <span className={`text-[9px] font-bold uppercase tracking-wider ${isWireframe ? 'text-gray-500' : 'text-emerald-100'}`}>
                EcoPoint Milik Anda
              </span>
              <h3 className="text-xl font-black font-display tracking-tight mt-0.5">
                {profile.points.toLocaleString()} <span className="text-xs font-semibold">pts</span>
              </h3>
            </div>
            <Gift className={`w-10 h-10 ${isWireframe ? 'text-gray-300' : 'text-white/20'}`} />
          </div>
        </div>
      </div>

      {/* Quests Challenges Section */}
      <div className="px-4 pb-2 shrink-0">
        <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2.5 flex items-center gap-1">
          <Zap className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
          Misi Mingguan Aktif (Inisiatif Warga)
        </h4>

        <div className="space-y-2.5">
          {MOCK_QUESTS.map((q) => {
            const pct = Math.min((q.progress / q.target) * 100, 100);

            return (
              <div
                key={q.id}
                className={`p-3 rounded-xl border bg-white shadow-card ${
                  isWireframe ? 'border-gray-300' : 'border-gray-100/60'
                }`}
              >
                <div className="flex justify-between items-start gap-1">
                  <div>
                    <h5 className="text-[11px] font-bold text-gray-800 font-display flex items-center gap-1">
                      {q.completed && <Check className="w-3.5 h-3.5 text-emerald-500" />}
                      {q.title}
                    </h5>
                    <p className="text-[9px] text-gray-500 leading-normal mt-0.5">{q.desc}</p>
                  </div>
                  <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded shrink-0 ${
                    isWireframe ? 'bg-gray-100' : 'bg-amber-50 text-amber-700 border border-amber-200'
                  }`}>
                    +{q.reward} pts
                  </span>
                </div>

                {/* Quest progress bar */}
                <div className="space-y-1 mt-2">
                  <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${
                        isWireframe ? 'bg-gray-700' : q.completed ? 'bg-emerald-500' : 'bg-blue-500'
                      }`}
                      style={{ width: `${pct}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-[8px] text-gray-400">
                    <span>Progress: {q.progress}/{q.target} {q.unit}</span>
                    <span>{pct === 100 ? "Selesai" : `${Math.round(pct)}%`}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Rewards Categories */}
      <div className="px-4 py-2 shrink-0 bg-white border-t border-b border-gray-100 flex gap-1.5 overflow-x-auto phone-scroll mt-2">
        {['Semua', 'Transportasi', 'Voucher', 'Voucher UMKM', 'Kebutuhan', 'Merchandise'].map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat as any)}
              className={`px-3 py-1.5 rounded-xl text-[9px] font-bold transition-all shrink-0 cursor-pointer ${
                activeCategory === cat
                  ? isWireframe
                    ? 'bg-gray-800 text-white border border-black shadow-sm'
                    : 'bg-emerald-500 text-white shadow-sm shadow-emerald-200'
                  : isWireframe
                  ? 'border border-gray-300 bg-white text-gray-600'
                  : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
              }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Rewards Items List Grid */}
      <div className="p-4 flex-1">
        <div className="grid grid-cols-2 gap-3">
          {filteredRewards.map((reward) => (
            <button
              key={reward.id}
              onClick={() => setSelectedReward(reward)}
              className={`p-2.5 rounded-xl border bg-white flex flex-col justify-between text-left transition-all card-hover cursor-pointer ${
                isWireframe ? 'border-gray-300' : 'border-gray-100/50 hover:border-gray-200'
              }`}
            >
              <div className="space-y-1.5 w-full">
                {isWireframe ? (
                  <div className="w-full h-20 border border-dashed border-gray-300 flex items-center justify-center shrink-0 mb-1.5">
                    <span className="text-[8px] text-gray-400 font-mono uppercase">[IMAGE]</span>
                  </div>
                ) : (
                  <img
                    src={reward.imageUrl}
                    alt={reward.title}
                    className="w-full h-20 rounded-lg object-cover mb-1.5"
                  />
                )}
                <span className="text-[8px] font-bold text-gray-400 block uppercase leading-none">{reward.partner}</span>
                <h5 className="text-[10px] font-bold text-gray-800 font-display line-clamp-2 leading-tight">
                  {reward.title}
                </h5>
              </div>

              <div className="mt-2 pt-2 border-t border-gray-100 w-full flex items-center justify-between">
                <span className={`text-[10px] font-extrabold font-mono ${isWireframe ? 'text-gray-900' : 'text-emerald-600'}`}>
                  {reward.pointsCost} pts
                </span>
                <span className={`text-[8px] font-bold px-1.5 py-0.5 rounded ${
                  isWireframe ? 'bg-gray-200 text-gray-700' : 'bg-emerald-50 text-emerald-800'
                }`}>
                  Tukar
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Redemptions Modal Overlay (Simulated popup) */}
      {selectedReward && (
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent backdrop-blur-sm flex items-end z-50" onClick={handleCloseModal}>
          <div className={`w-full bg-white rounded-t-3xl p-5 pt-3 space-y-5 max-h-[85%] overflow-y-auto anim-scale-in`} onClick={e => e.stopPropagation()}>
            {/* Drag Handle */}
            <div className="flex justify-center">
              <div className={`w-8 h-1 rounded-full ${isWireframe ? 'bg-gray-400' : 'bg-gray-300'}`} />
            </div>

            {successRedeem ? (
              /* Success screen inside the popup */
              <div className="py-2 text-center space-y-5">
                <div className={`w-14 h-14 rounded-2xl mx-auto flex items-center justify-center text-white rotate-12 ${
                  isWireframe ? 'bg-gray-900' : 'bg-emerald-500'
                }`}>
                  <Check className="w-7 h-7 -rotate-12" />
                </div>
                <div className="space-y-1.5">
                  <h4 className="text-sm font-extrabold text-gray-800 font-display">Penukaran Berhasil!</h4>
                  <p className="text-[10px] text-gray-500 leading-relaxed max-w-xs mx-auto">
                    Selamat! Kamu telah menukarkan {selectedReward.title} sebesar {selectedReward.pointsCost} pts.
                  </p>
                </div>

                {/* Simulated barcode */}
                <div className={`p-4 rounded-2xl space-y-3 ${
                  isWireframe ? 'bg-gray-50 border border-gray-300' : 'bg-gray-50 border border-gray-100'
                }`}>
                  <div className="flex items-center justify-between">
                    <span className="text-[8px] font-bold text-gray-400 uppercase tracking-wider">Kode Voucher</span>
                    <span className={`text-[8px] font-bold px-2 py-0.5 rounded-full ${
                      isWireframe ? 'bg-gray-200 text-gray-700' : 'bg-emerald-100 text-emerald-700'
                    }`}>Aktif</span>
                  </div>
                  <div className="h-12 w-full flex justify-center items-center gap-1 bg-white rounded-xl">
                    {Array.from({ length: 20 }).map((_, i) => (
                      <span key={i}
                        className="bg-black"
                        style={{ width: `${[1,2,0.5,3,1,2.5,0.5,1.5,3,0.5,2,1,2.5,0.5,1,2,3,0.5,1.5,2][i]}px`, height: `${24 + Math.random() * 16}px` }}
                      />
                    ))}
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-mono font-bold tracking-widest text-gray-600">
                      EC-{city.id.toUpperCase().slice(0, 3)}-9812A
                    </span>
                    <Smartphone className="w-4 h-4 text-gray-400" />
                  </div>
                </div>

                <button onClick={handleCloseModal}
                  className={`w-full py-3 text-xs font-extrabold text-white rounded-xl cursor-pointer transition-all btn-press shadow-sm ${
                    isWireframe ? 'bg-gray-900 border-2 border-black hover:bg-gray-800' : 'bg-emerald-500 hover:bg-emerald-600'
                  }`}>
                  <Check className="w-4 h-4 inline mr-1.5" />
                  Simpan ke Profil
                </button>
              </div>
            ) : (
              /* Confirmation Screen before deduction */
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <span className={`text-[8px] font-bold uppercase tracking-widest block ${isWireframe ? 'text-gray-500' : 'text-gray-400'}`}>Konfirmasi Penukaran</span>
                    <h3 className="text-sm font-extrabold font-display text-gray-800 leading-tight mt-0.5">{selectedReward.title}</h3>
                  </div>
                  <button onClick={handleCloseModal}
                    className={`p-1.5 rounded-lg transition-all cursor-pointer ${
                      isWireframe ? 'hover:bg-gray-100 text-gray-500' : 'hover:bg-gray-100 text-gray-400'
                    }`}>
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {selectedReward.imageUrl && !isWireframe && (
                  <img src={selectedReward.imageUrl} alt={selectedReward.title}
                    className="w-full h-28 rounded-xl object-cover" />
                )}

                <p className="text-[10px] text-gray-500 leading-relaxed">
                  {selectedReward.description}
                </p>

                <div className={`p-3.5 rounded-2xl flex items-center justify-between text-[10px] ${
                  isWireframe ? 'bg-gray-50 border border-gray-300' : 'bg-gray-50 border border-gray-100'
                }`}>
                  <div className="space-y-0.5">
                    <span className="text-gray-400 font-medium text-[9px]">EcoPoint Saat Ini</span>
                    <p className="text-sm font-extrabold text-gray-800 font-display">{profile.points.toLocaleString()} pts</p>
                  </div>
                  <ArrowRight className={`w-5 h-5 ${isWireframe ? 'text-gray-400' : 'text-gray-300'}`} />
                  <div className="space-y-0.5 text-right">
                    <span className="text-gray-400 font-medium text-[9px]">Setelah Ditukar</span>
                    <p className="text-sm font-extrabold text-emerald-600 font-display">{(profile.points - selectedReward.pointsCost).toLocaleString()} pts</p>
                  </div>
                </div>

                <div className={`p-3 rounded-xl flex items-center gap-2.5 text-[10px] ${
                  isWireframe ? 'bg-red-50 border border-red-200 text-red-700' : 'bg-red-50 border border-red-100 text-red-600'
                }`}>
                  <Award className="w-4 h-4 shrink-0" />
                  <span className="font-bold">Potongan <span className="font-mono">{selectedReward.pointsCost.toLocaleString()} pts</span> akan langsung dikurangi dari saldo.</span>
                </div>

                <div className="flex gap-2.5 pt-1">
                  <button onClick={handleCloseModal}
                    className={`flex-1 py-3 border rounded-xl text-xs font-bold transition-all cursor-pointer btn-press ${
                      isWireframe ? 'border-gray-400 hover:bg-gray-100 text-gray-700' : 'border-gray-200 hover:bg-gray-50 text-gray-600'
                    }`}>
                    Batal
                  </button>
                  <button onClick={() => handleRedeem(selectedReward)}
                    className={`flex-1 py-3 text-xs font-extrabold text-white rounded-xl cursor-pointer transition-all btn-press shadow-sm ${
                      isWireframe ? 'bg-gray-900 border-2 border-black hover:bg-gray-800' : 'bg-emerald-500 hover:bg-emerald-600'
                    }`}>
                    <ShoppingBag className="w-4 h-4 inline mr-1.5" />
                    Tukar Sekarang
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      <CustomAlert
        open={alertState.open}
        onClose={() => setAlertState(a => ({ ...a, open: false }))}
        title={alertState.title}
        message={alertState.message}
        type={alertState.type}
      />
    </div>
  );
}
