import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { WORKSHOP_CONFIG } from '../data/carData';
import { openWhatsApp } from '../utils/whatsapp';

export const FloatingWhatsApp: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState(true);

  const handleClick = () => {
    const msg = `Hello ${WORKSHOP_CONFIG.name}, I would like to get an estimate for car denting / painting.`;
    openWhatsApp(WORKSHOP_CONFIG.whatsappNumber, msg);
  };

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-2">
      {/* Friendly floating badge/tooltip */}
      {showTooltip && (
        <div className="hidden sm:flex items-center gap-2 bg-white text-slate-800 text-xs px-3.5 py-2 rounded-xl shadow-lg border border-slate-200/90 animate-in fade-in slide-in-from-bottom-2 duration-300">
          <span className="w-2 h-2 rounded-full bg-[#25D366] animate-ping"></span>
          <span className="font-semibold">Need a quick estimate? Send photos on WhatsApp</span>
          <button
            onClick={() => setShowTooltip(false)}
            className="text-slate-400 hover:text-slate-600 p-0.5 rounded-full cursor-pointer ml-1"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Main Floating Button */}
      <button
        onClick={handleClick}
        className="group flex items-center gap-2.5 px-4 py-3 sm:px-5 sm:py-3.5 rounded-full bg-[#25D366] hover:bg-[#1ebd5a] text-white font-bold shadow-xl shadow-emerald-950/20 hover:shadow-2xl hover:scale-105 active:scale-95 transition-all cursor-pointer"
        aria-label="Chat with workshop on WhatsApp"
      >
        <MessageCircle className="w-6 h-6 fill-white text-white" />
        <span className="hidden sm:inline text-sm tracking-wide">Chat with us</span>
        <span className="sm:hidden text-xs tracking-wide">WhatsApp</span>
      </button>
    </div>
  );
};
