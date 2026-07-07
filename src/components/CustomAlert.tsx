import React from 'react';
import { X, AlertTriangle, Info, MapPin, Star } from 'lucide-react';

interface CustomAlertProps {
  open: boolean;
  onClose: () => void;
  title: string;
  message: string;
  type?: 'info' | 'warning' | 'success';
  actionLabel?: string;
  onAction?: () => void;
}

export default function CustomAlert({ open, onClose, title, message, type = 'info', actionLabel, onAction }: CustomAlertProps) {
  if (!open) return null;

  const icons = {
    info: Info,
    warning: AlertTriangle,
    success: Star,
  };
  const Icon = icons[type];

  const colors = {
    info: { bg: 'bg-blue-50', border: 'border-blue-100', icon: 'text-blue-500', iconBg: 'bg-blue-100', btn: 'bg-blue-500 hover:bg-blue-600' },
    warning: { bg: 'bg-amber-50', border: 'border-amber-100', icon: 'text-amber-500', iconBg: 'bg-amber-100', btn: 'bg-amber-500 hover:bg-amber-600' },
    success: { bg: 'bg-emerald-50', border: 'border-emerald-100', icon: 'text-emerald-500', iconBg: 'bg-emerald-100', btn: 'bg-emerald-500 hover:bg-emerald-600' },
  };
  const c = colors[type];

  return (
    <div className="absolute inset-0 bg-black/40 backdrop-blur-sm flex items-end z-[60]" onClick={onClose}>
      <div className="w-full bg-white rounded-t-3xl p-5 pt-3 anim-scale-in" onClick={e => e.stopPropagation()}>
        <div className="flex justify-center mb-3">
          <div className="w-8 h-1 rounded-full bg-gray-300" />
        </div>
        <div className="flex items-start gap-3">
          <div className={`p-2.5 rounded-xl shrink-0 ${c.iconBg}`}>
            <Icon className={`w-5 h-5 ${c.icon}`} />
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="text-xs font-extrabold text-gray-800 font-display">{title}</h4>
            <p className="text-[10px] text-gray-500 mt-1 leading-relaxed">{message}</p>
          </div>
        </div>
        <div className="flex gap-2.5 mt-5">
          {actionLabel && onAction ? (
            <>
              <button onClick={onClose}
                className="flex-1 py-3 text-[10px] font-bold rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 transition-all cursor-pointer btn-press">
                Batal
              </button>
              <button onClick={() => { onAction(); onClose(); }}
                className={`flex-1 py-3 text-[10px] font-extrabold text-white rounded-xl transition-all cursor-pointer btn-press shadow-sm ${c.btn}`}>
                {actionLabel}
              </button>
            </>
          ) : (
            <button onClick={onClose}
              className={`flex-1 py-3 text-[10px] font-extrabold text-white rounded-xl transition-all cursor-pointer btn-press shadow-sm ${c.btn}`}>
              Tutup
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
