"use client";

import React from "react";
import { StallInfo } from "@/lib/types";
import { Flame, Instagram, MessageCircle, Phone, MapPin, Heart } from "lucide-react";

interface FooterProps {
  stall: StallInfo;
}

export const Footer: React.FC<FooterProps> = ({ stall }) => {
  return (
    <footer className="bg-[#0b0303] border-t border-amber-900/40 text-stone-300 pt-12 pb-24 md:pb-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-white/5">
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-600 to-red-600 flex items-center justify-center">
                <Flame className="w-4 h-4 text-amber-200 fill-amber-200" />
              </div>
              <span className="text-xl font-black text-white">{stall.name}</span>
              <span className="text-xs bg-red-950 text-amber-400 border border-amber-500/30 px-2 py-0.5 rounded font-bold">
                {stall.edition}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-stone-400 max-w-sm">
              Navratri Special Vadapav Fest • &ldquo;9 Din 9 Swaad&rdquo;. Freshly fried, steaming hot Mumbai street vadapavs served with real Amul cheese and signature thecha.
            </p>
            <div className="text-xs text-amber-400/90 font-medium pt-1">
              {stall.datesText} • {stall.timingsText}
            </div>
          </div>

          {/* Location & Contact */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-amber-300">
              Stall Location & Hours
            </h4>
            <div className="flex items-start gap-2 text-xs text-stone-400">
              <MapPin className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
              <span>{stall.locationAddress}</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-stone-400">
              <Phone className="w-4 h-4 text-orange-400 shrink-0" />
              <a href={`tel:${stall.phone}`} className="hover:text-amber-300">
                {stall.phone}
              </a>
            </div>
          </div>

          {/* Quick Connect */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-amber-300">
              Connect With Us
            </h4>
            <div className="flex flex-col gap-2">
              <a
                href={stall.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs text-stone-300 hover:text-amber-300 transition-colors"
              >
                <Instagram className="w-4 h-4 text-pink-400" />
                <span>Instagram Profile</span>
              </a>
              <a
                href={`https://wa.me/${stall.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs text-stone-300 hover:text-amber-300 transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                <span>WhatsApp Stall Owner</span>
              </a>
              <a
                href={stall.googleReviewUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs text-stone-300 hover:text-amber-300 transition-colors"
              >
                <span>⭐ Leave Google Review</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom copyright & disclaimer */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-3">
          <p>© {new Date().getFullYear()} {stall.name} • Navratri Fest. All rights reserved.</p>
          <p className="flex items-center gap-1 text-[11px]">
            <span>Freshly crafted with love & cheese</span>
            <Heart className="w-3 h-3 text-red-500 fill-red-500" />
            <span>for Navratri Dandiya Lovers</span>
          </p>
        </div>
      </div>
    </footer>
  );
};
