import React, { useState } from 'react';
import { REWARD_ITEMS } from '../data';
import { RewardItem, UserProfile } from '../types';
import { Award, ShoppingBag, Check, Gift, ArrowRight, Zap, RefreshCw, Smartphone, X } from 'lucide-react';

interface RewardsProps {
  profile: UserProfile;
  setProfile: React.Dispatch<React.SetStateAction<UserProfile>>;
  isWireframe: boolean;
}

export default function Rewards({ profile, setProfile, isWireframe }: RewardsProps) {
  const [activeCategory, setActiveCategory] = useState<'Semua' | 'Transportasi' | 'Voucher' | 'Kebutuhan' | 'Merchandise'>('Semua');
  const [selectedReward, setSelectedReward] = useState<RewardItem | null>(null);
  const [successRedeem, setSuccessRedeem] = useState<boolean>(false);

  const filteredRewards = REWARD_ITEMS.filter(
    (item) => activeCategory === 'Semua' || item.category === activeCategory
  );

  const handleRedeem = (reward: RewardItem) => {
    if (profile.points < reward.pointsCost) {
      alert("CempoPoints Anda tidak mencukupi untuk menukar reward ini!");
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

  // Mock weekly quests for citizen engagement
  const MOCK_QUESTS = [
    {
      id: 'q1',
      title: 'Pahlawan Plastik Solo',
      desc: 'Setor 5 Kg sampah botol plastik ke Bank Sampah Mojosongo.',
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
    <div className={`h-full flex flex-col phone-scroll overflow-y-auto ${isWireframe ? 'bg-white text-gray-800' : 'bg-gray-50'} relative`}>
      {/* Header */}
      <div className={`p-4 shrink-0 bg-white border-b ${isWireframe ? 'border-gray-300' : 'border-gray-100 shadow-sm'}`}>
        <h2 className="text-sm font-extrabold font-display text-gray-800 flex items-center gap-2">
          <Award className={`w-4 h-4 ${isWireframe ? 'text-gray-800' : 'text-emerald-500'}`} />
          Klaim Voucher & Merchandise
        </h2>
        <p className="text-[10px] text-gray-400 mt-0.5">Tukarkan poin hasil pemilahan dengan aneka voucher bermanfaat</p>
      </div>

      {/* Points Card */}
      <div className="p-4 shrink-0">
        <div className={`p-4 rounded-2xl relative overflow-hidden text-white ${
          isWireframe
            ? 'border-2 border-gray-800 bg-white text-gray-800'
            : 'bg-gradient-to-r from-emerald-500 via-teal-600 to-emerald-600 shadow-md shadow-emerald-100'
        }`}>
          <div className="flex justify-between items-center relative z-10">
            <div>
              <span className={`text-[9px] font-bold uppercase tracking-wider ${isWireframe ? 'text-gray-500' : 'text-emerald-100'}`}>
                CempoPoints Milik Anda
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
                className={`p-3 rounded-xl border bg-white ${
                  isWireframe ? 'border-gray-300' : 'border-gray-100/60 shadow-sm'
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
        {['Semua', 'Transportasi', 'Voucher', 'Kebutuhan', 'Merchandise'].map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat as any)}
            className={`px-3 py-1.5 rounded-xl text-[9px] font-bold transition-all shrink-0 cursor-pointer ${
              activeCategory === cat
                ? isWireframe
                  ? 'bg-gray-800 text-white border border-black'
                  : 'bg-emerald-500 text-white'
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
              className={`p-2.5 rounded-xl border bg-white flex flex-col justify-between text-left transition-all hover:scale-[1.02] active:scale-95 cursor-pointer shadow-sm ${
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
        <div className="absolute inset-0 bg-black/60 flex items-end z-50 p-4">
          <div className={`w-full bg-white rounded-t-3xl p-5 space-y-4 animate-in slide-in-from-bottom border-t-2 ${
            isWireframe ? 'border-black' : 'border-emerald-500'
          }`}>
            <div className="flex justify-between items-start">
              <div>
                <span className="text-[8px] font-bold text-gray-400 uppercase tracking-widest block">DETAIL PENUKARAN</span>
                <h3 className="text-xs font-bold font-display text-gray-800 leading-tight mt-0.5">
                  {selectedReward.title}
                </h3>
              </div>
              <button
                onClick={handleCloseModal}
                className="text-gray-400 hover:text-gray-600 p-1 font-bold text-sm"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {successRedeem ? (
              /* Success screen inside the popup */
              <div className="py-4 text-center space-y-3">
                <div className={`w-12 h-12 rounded-full mx-auto flex items-center justify-center text-white ${
                  isWireframe ? 'bg-black' : 'bg-emerald-500'
                }`}>
                  <Check className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-xs font-bold text-gray-800 font-display">Penukaran Poin Berhasil!</h4>
                  <p className="text-[9px] text-gray-500 leading-relaxed max-w-xs mx-auto">
                    Poin dipotong sebesar {selectedReward.pointsCost} pts. Berikut voucher barcode Anda untuk digunakan:
                  </p>
                </div>

                {/* Simulated barcode for Solo Batik Trans or Gopay */}
                <div className="bg-gray-50 p-3 rounded-xl border border-gray-100 max-w-xs mx-auto space-y-2">
                  <div className="h-10 w-full flex justify-center items-center font-mono text-[9px] text-gray-400 border-2 border-dashed border-gray-300 bg-white">
                    {/* Simulated vertical stripes of barcode */}
                    <div className="flex gap-0.5 items-stretch h-8 w-44">
                      <span className="w-1 bg-black"></span>
                      <span className="w-1.5 bg-black"></span>
                      <span className="w-0.5 bg-black"></span>
                      <span className="w-2 bg-black"></span>
                      <span className="w-0.5 bg-black"></span>
                      <span className="w-1 bg-black"></span>
                      <span className="w-2.5 bg-black"></span>
                      <span className="w-0.5 bg-black"></span>
                      <span className="w-1 bg-black"></span>
                      <span className="w-1.5 bg-black"></span>
                      <span className="w-0.5 bg-black"></span>
                      <span className="w-2 bg-black"></span>
                    </div>
                  </div>
                  <p className="text-[10px] font-mono font-bold tracking-widest text-gray-600">
                    EC-BST-9812A-SOLO
                  </p>
                </div>

                <button
                  onClick={handleCloseModal}
                  className={`w-full py-2.5 text-xs font-bold text-white rounded-xl cursor-pointer ${
                    isWireframe ? 'bg-gray-900 border-2 border-black' : 'bg-emerald-500 hover:bg-emerald-600'
                  }`}
                >
                  Simpan Voucher Ke Profil
                </button>
              </div>
            ) : (
              /* Confirmation Screen before deduction */
              <div className="space-y-3 text-xs text-gray-600">
                <p className="leading-relaxed text-[10px]">
                  {selectedReward.description}
                </p>

                <div className="bg-gray-50 p-3 rounded-xl flex justify-between items-center text-[10px] border border-gray-100">
                  <div className="space-y-0.5">
                    <span className="text-gray-400 font-medium">CempoPoints Anda:</span>
                    <p className="font-bold text-gray-800">{profile.points.toLocaleString()} pts</p>
                  </div>
                  <div className="space-y-0.5 text-right">
                    <span className="text-gray-400 font-medium">Poin Dibutuhkan:</span>
                    <p className="font-bold text-red-600">-{selectedReward.pointsCost} pts</p>
                  </div>
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    onClick={handleCloseModal}
                    className="flex-1 py-2.5 border border-gray-200 hover:bg-gray-50 text-gray-600 text-xs font-bold rounded-xl"
                  >
                    Batal
                  </button>
                  <button
                    onClick={() => handleRedeem(selectedReward)}
                    className={`flex-1 py-2.5 text-xs font-bold text-white rounded-xl cursor-pointer ${
                      isWireframe ? 'bg-gray-900 border-2 border-black' : 'bg-emerald-500 hover:bg-emerald-600'
                    }`}
                  >
                    Konfirmasi Tukar
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
