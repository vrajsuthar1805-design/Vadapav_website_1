"use client";

import React from "react";
import { StampCardConfig, StallInfo } from "@/lib/types";
import { Sparkles, Gift, Crown, CheckCircle2, AlertTriangle, MessageCircle, HelpCircle } from "lucide-react";

interface StampCardProps {
  config: StampCardConfig;
  stall: StallInfo;
}

export const StampCard: React.FC<StampCardProps> = ({ config, stall }) => {
  const days = [
    { day: 1, title: "Day 1", desc: "First Taste" },
    { day: 2, title: "Day 2", desc: "Garba Night" },
    { day: 3, title: "Day 3", desc: "Crispy Delight" },
    { day: 4, title: "Day 4", desc: "Halfway Point" },
    { day: 5, title: "Day 5", desc: "REWARD 1", isMilestone5: true },
    { day: 6, title: "Day 6", desc: "Keep Dandiya Going" },
    { day: 7, title: "Day 7", desc: "Saptami Swaad" },
    { day: 8, title: "Day 8", desc: "Durga Ashtami" },
    { day: 9, title: "Day 9", desc: "GRAND REWARD", isMilestone9: true },
  ];

  const whatsappStampUrl = `https://wa.me/${stall.whatsappNumber}?text=STAMP%20-%20Please%20log%20my%20visit%20at%20Mumbai%20Spice%20Navratri%20Fest!`;

  return (
    <section id="rewards" className="py-12 sm:py-16 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-950/70 border border-amber-500/40 text-amber-300 text-xs font-bold uppercase tracking-wider mb-2">
            <Gift className="w-3.5 h-3.5 text-amber-400" />
            <span>Festival Loyalty Reward</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            &ldquo;9 DIN, 9 VADAPAV&rdquo; Stamp Card
          </h2>
          <p className="text-sm sm:text-base text-amber-200/80 max-w-lg mx-auto mt-2">
            Eat daily across all 9 Navratri nights and unlock mouth-watering free vadapavs!
          </p>
        </div>

        {/* The 3x3 Stamp Card Visual Container */}
        <div className="festive-card-highlight rounded-3xl p-6 sm:p-8 border-2 border-amber-500/50 shadow-glowRed relative overflow-hidden mb-8">
          {/* Decorative Corner Badges */}
          <div className="flex items-center justify-between border-b border-amber-500/20 pb-4 mb-6">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-widest text-amber-400">
                Official Navratri Passport
              </span>
              <h3 className="text-lg sm:text-xl font-black text-white">
                Collect 9 Stamps • Unlock 2 Big Freebies
              </h3>
            </div>
            <div className="hidden sm:flex items-center gap-1.5 bg-amber-500/20 text-amber-300 border border-amber-500/40 px-3 py-1 rounded-full text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Stall Counter Program</span>
            </div>
          </div>

          {/* 3x3 Grid of 9 Circles */}
          <div className="grid grid-cols-3 gap-3 sm:gap-6 max-w-md mx-auto my-4">
            {days.map((item) => {
              if (item.isMilestone5) {
                return (
                  <div
                    key={item.day}
                    className="relative aspect-square rounded-2xl sm:rounded-3xl p-2 sm:p-3 bg-gradient-to-br from-amber-600 via-orange-600 to-red-700 border-2 border-yellow-300 shadow-glow flex flex-col items-center justify-center text-center transform scale-105"
                  >
                    <div className="absolute -top-2.5 -right-2 bg-yellow-400 text-black text-[9px] sm:text-[10px] font-black px-1.5 py-0.5 rounded-full uppercase shadow">
                      FREE!
                    </div>
                    <Gift className="w-6 h-6 sm:w-8 h-8 text-yellow-200 mb-1" />
                    <span className="text-[11px] sm:text-xs font-black text-white">DAY 5</span>
                    <span className="text-[9px] sm:text-[10px] font-bold text-yellow-200 leading-tight">
                      Free Mumbai Vadapav
                    </span>
                  </div>
                );
              }

              if (item.isMilestone9) {
                return (
                  <div
                    key={item.day}
                    className="relative aspect-square rounded-2xl sm:rounded-3xl p-2 sm:p-3 bg-gradient-to-br from-yellow-500 via-amber-500 to-orange-600 border-2 border-amber-200 shadow-glow flex flex-col items-center justify-center text-center transform scale-105"
                  >
                    <div className="absolute -top-2.5 -right-2 bg-red-600 text-white text-[9px] sm:text-[10px] font-black px-1.5 py-0.5 rounded-full uppercase shadow border border-yellow-200">
                      GRAND!
                    </div>
                    <Crown className="w-6 h-6 sm:w-8 h-8 text-black mb-1" />
                    <span className="text-[11px] sm:text-xs font-black text-black">DAY 9</span>
                    <span className="text-[9px] sm:text-[10px] font-black text-black leading-tight">
                      Free Cheese Burst VP
                    </span>
                  </div>
                );
              }

              return (
                <div
                  key={item.day}
                  className="aspect-square rounded-2xl sm:rounded-3xl p-2 bg-[#2a0e0e]/80 border border-amber-500/30 flex flex-col items-center justify-center text-center hover:border-amber-400/50 transition-colors"
                >
                  <div className="w-7 h-7 sm:w-9 h-9 rounded-full bg-black/40 border border-amber-500/30 flex items-center justify-center text-amber-300 font-black text-xs sm:text-sm mb-1">
                    {item.day}
                  </div>
                  <span className="text-[10px] sm:text-xs font-bold text-stone-200">
                    Stamp {item.day}
                  </span>
                  <span className="text-[8px] sm:text-[9px] text-amber-300/60 hidden sm:inline">
                    {item.desc}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Milestone Explanations Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-6 pt-4 border-t border-amber-500/20">
            <div className="flex items-center gap-3 bg-black/40 p-3 rounded-2xl border border-amber-500/20">
              <div className="w-9 h-9 rounded-xl bg-orange-600/30 border border-orange-500 flex items-center justify-center shrink-0">
                <Gift className="w-5 h-5 text-amber-300" />
              </div>
              <div>
                <span className="text-[10px] text-amber-400 font-extrabold uppercase">Milestone 1 (Stamp 5)</span>
                <p className="text-xs sm:text-sm font-bold text-white">FREE Mumbai Style Vadapav</p>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-black/40 p-3 rounded-2xl border border-amber-500/20">
              <div className="w-9 h-9 rounded-xl bg-yellow-500/30 border border-yellow-400 flex items-center justify-center shrink-0">
                <Crown className="w-5 h-5 text-yellow-300" />
              </div>
              <div>
                <span className="text-[10px] text-yellow-400 font-extrabold uppercase">Grand Milestone 2 (Stamp 9)</span>
                <p className="text-xs sm:text-sm font-bold text-white">FREE Molten Cheese Burst Vadapav</p>
              </div>
            </div>
          </div>
        </div>

        {/* Counter Verification & Stamping Instructions Box */}
        <div className="festive-card rounded-2xl p-5 sm:p-6 border border-amber-500/30 space-y-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm sm:text-base font-extrabold text-white">
                How to Collect Your Stamps:
              </h4>
              <p className="text-xs text-amber-200/80 mt-0.5">
                Visitors cannot stamp themselves on this site. Stamps are officially verified and given at the stall counter!
              </p>
            </div>
          </div>

          <div className="space-y-2.5 text-xs sm:text-sm text-stone-200">
            {config.rulesText.map((rule, idx) => (
              <div key={idx} className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>{rule}</span>
              </div>
            ))}
          </div>

          {/* Quick WhatsApp Stamp Logging Link */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 bg-[#170606] p-3.5 rounded-xl border border-white/5">
            <span className="text-xs text-amber-200 font-medium">
              Want digital record? Send a quick WhatsApp from the stall:
            </span>
            <a
              href={whatsappStampUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-4 py-2 rounded-lg transition-colors shadow"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp &ldquo;STAMP&rdquo;</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
