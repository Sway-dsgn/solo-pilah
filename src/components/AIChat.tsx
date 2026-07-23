import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, Loader2, Sparkles } from 'lucide-react';
import { CityData } from '../cities';

interface AIChatProps {
  isWireframe: boolean;
  city: CityData;
  userRole: string;
}

interface Message {
  role: 'user' | 'bot';
  text: string;
}

const SYSTEM_PROMPT = (city: CityData) => `Kamu adalah customer service AI bernama "Solo Bot" untuk aplikasi "${city.appName}" di Kota ${city.name}. 
Kamu membantu warga ${city.name} soal pengelolaan sampah, jadwal pengangkutan, bank sampah, dan poin reward.

ATURAN:
- Jawab dalam bahasa Indonesia yang santai tapi informatif
- Singkat (max 2-3 kalimat), langsung ke inti
- Kalau ditanya sesuatu di luar konteks sampah/lingkungan, arahkan kembali ke topik
- Gunakan data di bawah ini untuk menjawab

DATA APLIKASI:
- Nama Aplikasi: ${city.appName}
- Kota: ${city.name} (${city.shortName})
- Instansi: ${city.wasteDept} (${city.wasteDeptAbbr})
- TPA: ${city.tpaName}
- Sungai: ${city.riverName} (${city.riverFlow})

KECAMATAN: ${city.districts.join(', ')}

KATEGORI SAMPAH:
1. Organik (hijau) - sisa makanan, kulit buah, daun kering, ampas kopi. Bisa jadi kompos.
2. Anorganik (biru) - botol plastik, kertas, kardus, kaleng, botol kaca. Daur ulang di Bank Sampah.
3. B3 (merah) - baterai bekas, lampu neon, botol obat nyamuk. Jangan campur sampah biasa!
4. Elektronik (kuning) - HP bekas, kabel, komponen komputer. Setor ke Bank Sampah e-waste.

JADWAL PENGANGKUTAN: ${city.schedules.map(s => `${s.day}: ${s.kecamatan} (${s.wasteType}) ${s.time} - Petugas: ${s.officerName}`).join('; ')}

BANK SAMPAH: ${city.bankSampah.map(b => `${b.name} (${b.type}) - ${b.address}, Jam: ${b.hours}, Telp: ${b.phone}`).join('; ')}

REWARD:
${city.rewardItems.map(r => `- ${r.title}: ${r.pointsCost} poin (${r.category}) - ${r.description}`).join('\n')}

FAQ:
- Cara dapat poin: Scan sampah atau lapor sampah liar di aplikasi
- Cara tukar poin: Masuk menu Reward, pilih item, konfirmasi
- Jadwal pickup: Lihat menu Jadwal di aplikasi
- Lapor sampah: Menu Lapor → pilih jenis → foto → kirim
- Bank sampah terdekat: Menu Peta → lihat lokasi bank sampah`;

export default function AIChat({ isWireframe, city, userRole }: AIChatProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'bot', text: `Halo! Saya Solo Bot, customer service ${city.appName}. Ada yang bisa saya bantu seputar sampah dan lingkungan di ${city.name}?` }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!scrollRef.current) return;
    const el = scrollRef.current;
    requestAnimationFrame(() => {
      el.scrollTop = el.scrollHeight;
    });
  }, [messages, isLoading]);

  useEffect(() => {
    if (isOpen) setTimeout(() => inputRef.current?.focus(), 100);
  }, [isOpen]);

  const callGemini = async (userMessage: string): Promise<string> => {
    const OR_KEY = import.meta.env.VITE_OPENROUTER_API_KEY;
    const GEMINI_KEY = import.meta.env.VITE_GEMINI_API_KEY;
    const models = [
      { provider: 'openrouter', model: 'google/gemini-2.0-flash-001' },
      { provider: 'openrouter', model: 'google/gemini-flash-lite-1.5-8b' },
      { provider: 'gemini', model: 'gemini-flash-latest' },
      { provider: 'gemini', model: 'gemini-flash-lite-latest' },
    ];

    for (const { provider, model } of models) {
      try {
        if (provider === 'openrouter') {
          const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${OR_KEY}`,
              'HTTP-Referer': 'https://solo-pilah.vercel.app',
              'X-Title': 'Solo Pilah',
            },
            body: JSON.stringify({
              model,
              messages: [
                { role: 'system', content: SYSTEM_PROMPT(city) },
                { role: 'user', content: userMessage },
              ],
              max_tokens: 1024,
              temperature: 0.7,
            }),
          });
          const data = await res.json();
          if (!res.ok) {
            const errMsg = data?.error?.message || `HTTP ${res.status}`;
            console.warn(`OpenRouter ${model} error:`, errMsg);
            continue;
          }
          return data.choices?.[0]?.message?.content || 'Maaf, saya tidak mengerti.';
        } else {
          const apiKey = GEMINI_KEY;
          if (!apiKey) continue;
          const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
          const res = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              system_instruction: { parts: [{ text: SYSTEM_PROMPT(city) }] },
              contents: [{ parts: [{ text: userMessage }] }],
              generationConfig: { temperature: 0.7, maxOutputTokens: 1024 },
            }),
          });
          const data = await res.json();
          if (!res.ok) {
            const errMsg = data?.error?.message || `HTTP ${res.status}`;
            console.warn(`Gemini ${model} error:`, errMsg);
            if (errMsg.includes('quota') || errMsg.includes('Quota')) continue;
            return `Error: ${errMsg}`;
          }
          return data.candidates?.[0]?.content?.parts?.[0]?.text || 'Maaf, saya tidak mengerti.';
        }
      } catch (err: any) {
        console.error(`${provider} ${model} fetch error:`, err);
        continue;
      }
    }
    return 'Semua model AI sedang limit. Coba lagi dalam beberapa menit.';
  };

  const handleSend = async () => {
    const msg = input.trim();
    if (!msg || isLoading) return;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: msg }]);
    setIsLoading(true);
    const reply = await callGemini(msg);
    setMessages(prev => [...prev, { role: 'bot', text: reply }]);
    setIsLoading(false);
  };

  const quickQuestions = [
    'Jadwal pickup minggu ini?',
    'Sampah plastik dibuang kemana?',
    'Cara tukar poin?'
  ];

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-20 right-4 z-[999] w-14 h-14 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg flex items-center justify-center transition-all btn-press animate-bounce"
        style={{ animationDuration: '2s' }}
      >
        <MessageCircle className="w-6 h-6" />
      </button>
    );
  }

  return (
    <div className="fixed inset-0 z-[999] flex flex-col bg-white" style={{ pointerEvents: 'auto' }}>
      {/* Header */}
      <div className="bg-emerald-500 text-white p-4 flex items-center gap-3 shrink-0 safe-top">
        <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-white/20 rounded-xl cursor-pointer">
          <X className="w-5 h-5" />
        </button>
        <div className="p-2 bg-white/20 rounded-xl">
          <Bot className="w-5 h-5" />
        </div>
        <div className="flex-1">
          <h3 className="text-sm font-extrabold font-display">Solo Bot</h3>
          <p className="text-[9px] text-emerald-100">Customer Service {city.appName}</p>
        </div>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] rounded-2xl px-4 py-3 ${
              m.role === 'user'
                ? 'bg-emerald-500 text-white rounded-br-md'
                : 'bg-white text-gray-700 border border-gray-200 shadow-sm rounded-bl-md'
            }`}>
              <p className="text-xs leading-relaxed whitespace-pre-wrap break-words" dangerouslySetInnerHTML={{ __html: m.text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white border border-gray-200 shadow-sm rounded-2xl rounded-bl-md px-4 py-3 flex items-center gap-2">
              <Loader2 className="w-4 h-4 text-emerald-500 animate-spin" />
              <span className="text-[11px] text-gray-400 font-bold">Solo Bot sedang mengetik...</span>
            </div>
          </div>
        )}
      </div>

      {/* Quick Questions */}
      {messages.length <= 1 && (
        <div className="px-4 py-2 flex gap-2 flex-wrap shrink-0 bg-white border-t border-gray-100">
          {quickQuestions.map((q) => (
            <button
              key={q}
              onClick={() => { setInput(q); inputRef.current?.focus(); }}
              className="text-[10px] font-bold text-emerald-600 bg-emerald-50 border border-emerald-100 px-3 py-2 rounded-full cursor-pointer hover:bg-emerald-100 transition-all"
            >
              <Sparkles className="w-3 h-3 inline mr-1" />{q}
            </button>
          ))}
        </div>
      )}

      {/* Input */}
      <div className="p-3 border-t border-gray-200 bg-white shrink-0 safe-bottom">
        <form
          onSubmit={(e) => { e.preventDefault(); handleSend(); }}
          className="flex gap-2"
        >
          <input
            ref={inputRef}
            type="text"
            inputMode="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Tanya seputar sampah..."
            disabled={isLoading}
            className="flex-1 text-sm px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 bg-gray-50 disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="p-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed transition-all btn-press"
          >
            <Send className="w-5 h-5" />
          </button>
        </form>
      </div>
    </div>
  );
}
