"use client";

import React, { useState } from "react";
import { MenuItem, MenuNotes } from "@/lib/types";
import { Sparkles, Package, AlertCircle, Coffee, CheckCircle } from "lucide-react";

interface FullMenuProps {
  items: MenuItem[];
  notes: MenuNotes;
}

export const FullMenu: React.FC<FullMenuProps> = ({ items, notes }) => {
  const [filter, setFilter] = useState<"all" | "vadapav" | "drinks">("all");

  const visibleItems = items.filter((i) => i.visible).sort((a, b) => a.order - b.order);
  const vadapavItems = visibleItems.filter((i) => i.category === "vadapav");
  const drinkItems = visibleItems.filter((i) => i.category === "drinks");

  const displayedItems =
    filter === "all" ? visibleItems : visibleItems.filter((i) => i.category === filter);

  return (
    <section id="menu" className="py-12 sm:py-16 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-950/70 border border-amber-500/40 text-amber-300 text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5 text-orange-400" />
            <span>A La Carte & In-Combo Pricing</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            Full Festival Menu
          </h2>
          <p className="text-sm sm:text-base text-amber-200/80 max-w-lg mx-auto mt-2">
            Every item freshly prepared on order. Save more by bundling in any combo scheme!
          </p>

          {/* Filter Tabs */}
          <div className="flex items-center justify-center gap-2 mt-6">
            <button
              onClick={() => setFilter("all")}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-bold transition-all ${
                filter === "all"
                  ? "bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-glow"
                  : "bg-[#250d0d] text-amber-200/80 hover:text-white border border-amber-900/40"
              }`}
            >
              All Items ({visibleItems.length})
            </button>
            <button
              onClick={() => setFilter("vadapav")}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-bold transition-all flex items-center gap-1.5 ${
                filter === "vadapav"
                  ? "bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-glow"
                  : "bg-[#250d0d] text-amber-200/80 hover:text-white border border-amber-900/40"
              }`}
            >
              <span>🔥 Vadapav Varieties</span>
              <span className="text-[10px] opacity-75">({vadapavItems.length})</span>
            </button>
            <button
              onClick={() => setFilter("drinks")}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-bold transition-all flex items-center gap-1.5 ${
                filter === "drinks"
                  ? "bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-glow"
                  : "bg-[#250d0d] text-amber-200/80 hover:text-white border border-amber-900/40"
              }`}
            >
              <span>🥤 Chilled Drinks</span>
              <span className="text-[10px] opacity-75">({drinkItems.length})</span>
            </button>
          </div>
        </div>

        {/* Pricing Table / Grid */}
        <div className="festive-card rounded-3xl overflow-hidden border border-amber-500/30 shadow-festiveCard mb-8">
          {/* Table Header Bar */}
          <div className="grid grid-cols-12 bg-[#250c0c] px-4 sm:px-6 py-3.5 border-b border-amber-500/20 text-xs sm:text-sm font-extrabold uppercase tracking-wider text-amber-300">
            <div className="col-span-7 sm:col-span-7 flex items-center gap-2">
              <span>Item & Preparation</span>
            </div>
            <div className="col-span-2 sm:col-span-2 text-center text-stone-200">
              <span className="hidden sm:inline">A La Carte</span>
              <span className="sm:hidden">Single</span>
            </div>
            <div className="col-span-3 sm:col-span-3 text-right sm:text-center text-emerald-400">
              <span className="hidden sm:inline">In-Combo Price</span>
              <span className="sm:hidden">Combo</span>
            </div>
          </div>

          {/* Table Rows */}
          <div className="divide-y divide-white/5">
            {displayedItems.map((item) => {
              const hasDiscountInCombo = item.inComboPrice < item.alacartePrice;
              const isCheeseBurst = item.name.toLowerCase().includes("burst");

              return (
                <div
                  key={item.id}
                  className={`grid grid-cols-12 px-4 sm:px-6 py-4 items-center transition-colors hover:bg-white/[0.03] ${
                    isCheeseBurst ? "bg-amber-950/20" : ""
                  }`}
                >
                  {/* Item Description */}
                  <div className="col-span-7 sm:col-span-7 pr-2">
                    <div className="flex items-center gap-2">
                      {/* Veg indicator dot */}
                      <span className="w-3.5 h-3.5 rounded-sm border border-emerald-500 p-0.5 flex items-center justify-center shrink-0">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      </span>
                      <h4 className="text-sm sm:text-base font-bold text-white leading-tight">
                        {item.name}
                      </h4>
                      {isCheeseBurst && (
                        <span className="hidden sm:inline-block bg-amber-500 text-black text-[10px] font-black px-2 py-0.5 rounded-full uppercase">
                          Star
                        </span>
                      )}
                    </div>
                    {item.description && (
                      <p className="text-xs text-stone-400 mt-1 line-clamp-2 pl-5">
                        {item.description}
                      </p>
                    )}
                  </div>

                  {/* A La Carte Price */}
                  <div className="col-span-2 sm:col-span-2 text-center">
                    <span className="text-base sm:text-lg font-bold text-amber-100">
                      ₹{item.alacartePrice}
                    </span>
                  </div>

                  {/* In-Combo Price */}
                  <div className="col-span-3 sm:col-span-3 text-right sm:text-center">
                    <div className="inline-flex flex-col items-end sm:items-center">
                      <span className="text-base sm:text-lg font-black text-emerald-400">
                        ₹{item.inComboPrice}
                      </span>
                      {hasDiscountInCombo && (
                        <span className="text-[10px] font-semibold text-emerald-300/80 bg-emerald-950/80 px-1.5 py-0.2 rounded border border-emerald-500/20">
                          Save ₹{item.alacartePrice - item.inComboPrice}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Menu Notes & Rules Callout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 sm:p-5 rounded-2xl bg-[#1e0a0a] border border-amber-500/20 flex items-start gap-3.5 shadow-md">
            <Package className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <h5 className="text-xs sm:text-sm font-bold text-amber-200 uppercase tracking-wider mb-1">
                Parcel & Packaging Charges
              </h5>
              <p className="text-xs text-stone-300 leading-relaxed">
                ₹{notes.parcelChargesStandard} per item packaging for standard items. ₹{notes.parcelChargesSpecial} for {notes.parcelChargesSpecialItems} (uses protective heat-seal containers to preserve melted cheese).
              </p>
            </div>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-[#1e0a0a] border border-amber-500/20 flex items-start gap-3.5 shadow-md">
            <AlertCircle className="w-5 h-5 text-orange-400 shrink-0 mt-0.5" />
            <div>
              <h5 className="text-xs sm:text-sm font-bold text-amber-200 uppercase tracking-wider mb-1">
                Combo Drinks Policy
              </h5>
              <p className="text-xs text-stone-300 leading-relaxed">
                {notes.drinkChangePolicy} All vadapavs are 100% vegetarian, served fresh & piping hot straight out of the kadai!
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
