"use client";

import React, { useState } from "react";
import { ComboItem } from "@/lib/types";
import { Flame, Sparkles, Check, Heart, Users, Star, Percent } from "lucide-react";

interface CombosProps {
  combos: ComboItem[];
}

export const Combos: React.FC<CombosProps> = ({ combos }) => {
  const [selectedCategory, setSelectedCategory] = useState<"ALL" | "CHEEZY DELIGHTS" | "SAVER PACKS">("ALL");

  const visibleCombos = combos
    .filter((c) => c.visible)
    .sort((a, b) => a.order - b.order);

  const displayedCombos =
    selectedCategory === "ALL"
      ? visibleCombos
      : visibleCombos.filter((c) => c.category === selectedCategory);

  const cheezyCount = visibleCombos.filter((c) => c.category === "CHEEZY DELIGHTS").length;
  const saverCount = visibleCombos.filter((c) => c.category === "SAVER PACKS").length;

  return (
    <section id="combos" className="py-12 sm:py-16 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-950/70 border border-orange-500/40 text-orange-300 text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Top Value Deals • Sabse Badi Bachat</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            Combos & Special Schemes
          </h2>
          <p className="text-sm sm:text-base text-amber-200/80 max-w-xl mx-auto mt-2">
            Specially curated for Navratri foodies and Garba troupes. Cheaper, faster, and mega delicious!
          </p>

          {/* Category Filter Pills */}
          <div className="flex items-center justify-center gap-2 mt-6">
            <button
              onClick={() => setSelectedCategory("ALL")}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-bold transition-all ${
                selectedCategory === "ALL"
                  ? "bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-glow"
                  : "bg-[#250d0d] text-amber-200/80 hover:text-white border border-amber-900/40"
              }`}
            >
              All Combos ({visibleCombos.length})
            </button>
            <button
              onClick={() => setSelectedCategory("CHEEZY DELIGHTS")}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-bold transition-all flex items-center gap-1.5 ${
                selectedCategory === "CHEEZY DELIGHTS"
                  ? "bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-glow"
                  : "bg-[#250d0d] text-amber-200/80 hover:text-white border border-amber-900/40"
              }`}
            >
              <span>🧀 Cheezy Delights</span>
              <span className="text-[10px] opacity-75">({cheezyCount})</span>
            </button>
            <button
              onClick={() => setSelectedCategory("SAVER PACKS")}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-bold transition-all flex items-center gap-1.5 ${
                selectedCategory === "SAVER PACKS"
                  ? "bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-glow"
                  : "bg-[#250d0d] text-amber-200/80 hover:text-white border border-amber-900/40"
              }`}
            >
              <span>🎉 Saver Packs</span>
              <span className="text-[10px] opacity-75">({saverCount})</span>
            </button>
          </div>
        </div>

        {/* Combo Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedCombos.map((combo) => {
            const isBestSeller = combo.tag?.toLowerCase().includes("best seller");
            const isSabseZyadaPasand = combo.tag?.toLowerCase().includes("pasand");
            const isGroup = combo.tag?.toLowerCase().includes("group");

            return (
              <div
                key={combo.id}
                className={`relative rounded-3xl p-6 transition-all duration-300 flex flex-col justify-between ${
                  isBestSeller || isSabseZyadaPasand
                    ? "festive-card-highlight border-amber-500/50"
                    : "festive-card hover:border-amber-500/40"
                }`}
              >
                {/* Top Badge */}
                {combo.tag && (
                  <div className="absolute -top-3 left-6">
                    <span
                      className={`text-[11px] font-black tracking-wider px-3 py-1 rounded-full uppercase shadow-md flex items-center gap-1 ${
                        isBestSeller
                          ? "bg-gradient-to-r from-red-600 to-orange-600 text-white border border-amber-400/60"
                          : isSabseZyadaPasand
                          ? "bg-gradient-to-r from-amber-500 to-yellow-500 text-black border border-yellow-200"
                          : "bg-red-900 text-amber-200 border border-amber-500/40"
                      }`}
                    >
                      {isBestSeller && <Flame className="w-3 h-3 fill-white" />}
                      {isSabseZyadaPasand && <Star className="w-3 h-3 fill-black" />}
                      {isGroup && <Users className="w-3 h-3" />}
                      <span>{combo.tag}</span>
                    </span>
                  </div>
                )}

                <div>
                  {/* Category Pill & Savings */}
                  <div className="flex items-center justify-between mb-3 mt-1">
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-amber-400/90">
                      {combo.category}
                    </span>
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-400 bg-emerald-950/70 border border-emerald-500/30 px-2.5 py-0.5 rounded-full">
                      <Percent className="w-3 h-3" />
                      {combo.savingsText}
                    </span>
                  </div>

                  {/* Combo Name */}
                  <h3 className="text-xl sm:text-2xl font-black text-white mb-2 leading-tight">
                    {combo.name}
                  </h3>

                  {/* Price Tag */}
                  <div className="flex items-baseline gap-2 mb-4 pb-4 border-b border-white/10">
                    <span className="text-3xl sm:text-4xl font-black text-amber-300">
                      ₹{combo.price}
                    </span>
                    <span className="text-xs text-amber-200/60 font-medium">
                      (Festival Special Price)
                    </span>
                  </div>

                  {/* Included Items Checklist */}
                  <div className="space-y-2 mb-6">
                    <div className="text-xs font-bold text-amber-300/80 uppercase tracking-wider">
                      Includes:
                    </div>
                    {combo.items.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-sm text-stone-200 font-medium">
                        <div className="w-4 h-4 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 mt-0.5 border border-amber-500/30">
                          <Check className="w-2.5 h-2.5" />
                        </div>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Action Hint */}
                <div className="pt-2">
                  <div className="w-full py-2.5 px-4 rounded-xl bg-black/40 border border-amber-500/20 text-center text-xs font-semibold text-amber-200/90 flex items-center justify-center gap-2">
                    <Flame className="w-3.5 h-3.5 text-orange-400" />
                    <span>Ask for &ldquo;{combo.name}&rdquo; at Counter</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Combo Note */}
        <div className="mt-8 p-4 rounded-2xl bg-[#1e0a0a]/80 border border-amber-900/40 text-center text-xs text-amber-200/80 max-w-2xl mx-auto">
          💡 <strong className="text-amber-300">Stall Tip:</strong> Drink selection in combos can be customized (subject to standard item price difference). Mention your preference when placing your counter order!
        </div>
      </div>
    </section>
  );
};
