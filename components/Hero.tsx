"use client";

import React from "react";
import { StallInfo } from "@/lib/types";
import { Flame, Clock, Calendar, Sparkles, MapPin, ChevronDown, CheckCircle2 } from "lucide-react";

interface HeroProps {
  stall: StallInfo;
}

export const Hero: React.FC<HeroProps> = ({ stall }) => {
  return (
    <section className="relative overflow-hidden pt-6 pb-12 sm:pt-10 sm:pb-16">
      {/* Decorative background glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-96 bg-gradient-to-b from-orange-600/20 via-red-600/15 to-transparent blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-1/3 -right-20 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col items-center text-center">
          {/* Festive Garland Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-950/80 border border-amber-500/40 shadow-glow mb-5 animate-pulse-slow">
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span className="text-xs sm:text-sm font-bold text-amber-200 tracking-wide uppercase">
              Navratri Special Vadapav Fest • 9 Din 9 Swaad
            </span>
            <Sparkles className="w-4 h-4 text-amber-300" />
          </div>

          {/* Main Title */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-white mb-3">
            <span className="text-white drop-shadow-md">{stall.name}</span>
            <span className="block text-2xl sm:text-4xl md:text-5xl mt-1 text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-orange-400 to-red-400 font-extrabold">
              {stall.edition}
            </span>
          </h1>

          {/* Tagline */}
          <p className="text-base sm:text-xl text-amber-100/90 max-w-2xl font-medium mb-6">
            &ldquo;Fresh banta hai, garam milta hai.&rdquo; Experience Mumbai&apos;s crispiest, cheesiest street delight under the festive Garba lights!
          </p>

          {/* Dates & Timings Pill Bar */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 py-2.5 px-5 rounded-2xl bg-[#200c0c]/90 border border-amber-500/30 shadow-festiveCard mb-8">
            <div className="flex items-center gap-2 text-sm sm:text-base font-semibold text-amber-200">
              <Calendar className="w-4 h-4 text-orange-400" />
              <span>{stall.datesText}</span>
            </div>
            <div className="hidden sm:block w-1.5 h-1.5 rounded-full bg-amber-500/50" />
            <div className="flex items-center gap-2 text-sm sm:text-base font-semibold text-amber-200">
              <Clock className="w-4 h-4 text-amber-400" />
              <span>{stall.timingsText}</span>
            </div>
            <div className="hidden sm:block w-1.5 h-1.5 rounded-full bg-amber-500/50" />
            <div className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-emerald-400 bg-emerald-950/60 px-2.5 py-0.5 rounded-full border border-emerald-500/30">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
              <span>Stall Live</span>
            </div>
          </div>

          {/* Steaming Cheese-Burst Hero Card / Image Visual */}
          <div className="relative w-full max-w-lg mb-8 group">
            <div className="relative rounded-3xl overflow-hidden border-2 border-amber-500/40 shadow-glowRed bg-gradient-to-b from-[#250d0d] to-[#140606] p-2 sm:p-3">
              <div className="relative h-64 sm:h-80 w-full rounded-2xl overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={stall.heroImage}
                  alt="Steaming Cheese Burst Vadapav - Mumbai Spice Navratri Fest"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                
                {/* Subtle dark gradient overlay on image */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

                {/* Steam animation overlays */}
                <div className="absolute top-4 left-1/2 -translate-x-1/2 flex items-center gap-1 pointer-events-none opacity-80">
                  <span className="text-white/60 text-lg font-light animate-steam">~</span>
                  <span className="text-white/80 text-xl font-light animate-steam" style={{ animationDelay: "0.5s" }}>~</span>
                  <span className="text-white/60 text-lg font-light animate-steam" style={{ animationDelay: "1s" }}>~</span>
                </div>

                {/* Floating Tags on Hero Image */}
                <div className="absolute top-3 left-3 bg-red-900/90 text-amber-200 border border-amber-400/50 text-[11px] sm:text-xs font-bold px-3 py-1 rounded-full shadow-lg flex items-center gap-1.5 backdrop-blur-sm">
                  <Flame className="w-3.5 h-3.5 text-orange-400 fill-orange-400" />
                  <span>Steaming Cheese Burst</span>
                </div>

                <div className="absolute top-3 right-3 bg-amber-500 text-black text-[11px] sm:text-xs font-black px-3 py-1 rounded-full shadow-lg">
                  100% AMUL CHEESE
                </div>

                {/* Bottom Caption on Hero Image */}
                <div className="absolute bottom-3 inset-x-3 text-left">
                  <div className="text-xs text-amber-300 font-semibold uppercase tracking-wider flex items-center gap-1">
                    <span>👑 Festival Star Attraction</span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-black text-white leading-tight">
                    Double Cheese Burst Vadapav
                  </h3>
                  <p className="text-xs text-stone-300 line-clamp-1">
                    Crispy spicy batata vada with an explosive molten cheese core inside freshly baked pav.
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Guarantees Below Image */}
            <div className="flex items-center justify-around mt-3 text-[11px] sm:text-xs text-amber-200/90 font-medium">
              <span className="flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                Pure Veg & Fresh Oil
              </span>
              <span className="flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                Teekha Thecha & Chutney
              </span>
              <span className="flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                Counter Service
              </span>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
            <a
              href="#combos"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 via-orange-500 to-red-600 hover:from-amber-400 hover:to-red-500 text-white font-extrabold text-base sm:text-lg px-8 py-3.5 rounded-2xl shadow-glow hover:shadow-glowRed transition-all transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <Flame className="w-5 h-5 text-amber-100 fill-amber-200" />
              <span>See Combos & Schemes</span>
            </a>
            
            <a
              href="#about"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#260f0f] hover:bg-[#351515] border border-amber-500/30 text-amber-200 font-bold text-base px-6 py-3.5 rounded-2xl transition-all"
            >
              <MapPin className="w-4 h-4 text-orange-400" />
              <span>Stall Location & Timings</span>
            </a>
          </div>

          {/* View Only Counter Notice */}
          <p className="text-xs text-amber-300/70 mt-4 max-w-md">
            ℹ️ View-only website for festive visitors. Come to our stall counter directly to enjoy hot, freshly prepared vadapavs!
          </p>
        </div>
      </div>
    </section>
  );
};
