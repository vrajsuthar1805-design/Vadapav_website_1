"use client";

import React from "react";
import { StallInfo } from "@/lib/types";
import { Phone, MessageCircle, Navigation, Flame } from "lucide-react";

interface FloatingActionBarProps {
  stall: StallInfo;
}

export const FloatingActionBar: React.FC<FloatingActionBarProps> = ({ stall }) => {
  return (
    <div className="fixed bottom-0 inset-x-0 z-40 md:hidden p-3 bg-gradient-to-t from-black via-black/90 to-transparent pointer-events-none">
      <div className="max-w-md mx-auto pointer-events-auto bg-[#1a0808]/95 backdrop-blur-md border border-amber-500/40 rounded-2xl p-2 shadow-glow flex items-center justify-around gap-1">
        {/* Combos quick jump */}
        <a
          href="#combos"
          className="flex-1 flex flex-col items-center justify-center py-1.5 px-2 rounded-xl text-amber-200 hover:bg-white/5 active:bg-white/10 transition-colors"
        >
          <Flame className="w-5 h-5 text-orange-400 fill-orange-400" />
          <span className="text-[10px] font-bold mt-0.5">Combos</span>
        </a>

        {/* WhatsApp Chat */}
        <a
          href={`https://wa.me/${stall.whatsappNumber}?text=Hi%20Mumbai%20Spice!%20Visiting%20your%20stall%20tonight.`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex flex-col items-center justify-center py-1.5 px-2 rounded-xl text-emerald-400 hover:bg-white/5 active:bg-white/10 transition-colors"
        >
          <MessageCircle className="w-5 h-5" />
          <span className="text-[10px] font-bold mt-0.5">WhatsApp</span>
        </a>

        {/* Call Stall */}
        <a
          href={`tel:${stall.phone}`}
          className="flex-1 flex flex-col items-center justify-center py-1.5 px-2 rounded-xl text-amber-300 hover:bg-white/5 active:bg-white/10 transition-colors"
        >
          <Phone className="w-5 h-5" />
          <span className="text-[10px] font-bold mt-0.5">Call</span>
        </a>

        {/* Directions */}
        <a
          href={stall.googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex flex-col items-center justify-center py-1.5 px-2 rounded-xl bg-gradient-to-r from-amber-600 to-red-600 text-white shadow-sm"
        >
          <Navigation className="w-5 h-5" />
          <span className="text-[10px] font-extrabold mt-0.5">Directions</span>
        </a>
      </div>
    </div>
  );
};
