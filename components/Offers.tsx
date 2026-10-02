"use client";

import React from "react";
import { OfferItem, StallInfo } from "@/lib/types";
import { Sparkles, Instagram, Star, Moon, Users, ArrowUpRight, Phone, MessageCircle } from "lucide-react";

interface OffersProps {
  offers: OfferItem[];
  stall: StallInfo;
}

export const Offers: React.FC<OffersProps> = ({ offers, stall }) => {
  const visibleOffers = offers.filter((o) => o.visible).sort((a, b) => a.order - b.order);

  const getOfferIcon = (type: string, title: string) => {
    if (type === "instagram" || title.toLowerCase().includes("instagram")) {
      return <Instagram className="w-5 h-5 text-pink-400" />;
    }
    if (type === "google_review" || title.toLowerCase().includes("review")) {
      return <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />;
    }
    if (title.toLowerCase().includes("hours") || title.toLowerCase().includes("night")) {
      return <Moon className="w-5 h-5 text-indigo-300" />;
    }
    return <Users className="w-5 h-5 text-amber-400" />;
  };

  return (
    <section id="offers" className="py-12 sm:py-16 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-950/70 border border-amber-500/40 text-amber-300 text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5 text-orange-400" />
            <span>Extra Bachat & Freebies</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            Special Navratri Offers
          </h2>
          <p className="text-sm sm:text-base text-amber-200/80 max-w-lg mx-auto mt-2">
            Follow, review, party late, or bring your Garba group to unlock instant discounts!
          </p>
        </div>

        {/* 4 Offers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {visibleOffers.map((offer) => {
            const isInstagram = offer.actionType === "instagram";
            const isReview = offer.actionType === "google_review";
            const isBulk = offer.actionType === "whatsapp" || offer.title.toLowerCase().includes("bulk");
            const isAfterHours = offer.title.toLowerCase().includes("after hours");

            return (
              <div
                key={offer.id}
                className="festive-card rounded-3xl p-6 sm:p-7 border border-amber-500/30 flex flex-col justify-between hover:border-amber-400/50 transition-all shadow-festiveCard"
              >
                <div>
                  {/* Top Bar with Icon & Badge */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <div className="w-10 h-10 rounded-2xl bg-black/40 border border-amber-500/20 flex items-center justify-center shrink-0">
                      {getOfferIcon(offer.actionType, offer.title)}
                    </div>
                    <span className="text-[10px] font-black tracking-widest text-amber-300 uppercase bg-amber-950/80 border border-amber-500/30 px-3 py-1 rounded-full">
                      {offer.badge}
                    </span>
                  </div>

                  {/* Title & Tagline */}
                  <h3 className="text-xl sm:text-2xl font-black text-white mb-1">
                    {offer.title}
                  </h3>
                  <div className="text-sm font-bold text-amber-300 mb-3">
                    {offer.tagline}
                  </div>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-stone-300 leading-relaxed mb-6">
                    {offer.description}
                  </p>
                </div>

                {/* Interactive Action Buttons */}
                <div className="pt-2 border-t border-white/5">
                  {isInstagram && (
                    <a
                      href={stall.instagramUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold text-sm py-3 px-4 rounded-xl shadow transition-all"
                    >
                      <Instagram className="w-4 h-4" />
                      <span>{offer.actionText || "Open Instagram & Tag Us"}</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </a>
                  )}

                  {isReview && (
                    <a
                      href={stall.googleReviewUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white font-bold text-sm py-3 px-4 rounded-xl shadow transition-all"
                    >
                      <Star className="w-4 h-4 fill-white" />
                      <span>{offer.actionText || "Write Google Review"}</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </a>
                  )}

                  {isAfterHours && (
                    <div className="w-full py-3 px-4 rounded-xl bg-indigo-950/60 border border-indigo-500/30 text-center text-xs sm:text-sm font-bold text-indigo-200 flex items-center justify-center gap-2">
                      <Moon className="w-4 h-4 text-indigo-400" />
                      <span>Available at Counter (Post 10:00 PM)</span>
                    </div>
                  )}

                  {isBulk && (
                    <div className="flex flex-col sm:flex-row gap-2">
                      <a
                        href={`https://wa.me/${stall.whatsappNumber}?text=Hi%2C%20we%20want%20to%20place%20a%20bulk%20order%20for%20our%20Garba%20group`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm py-3 px-3 rounded-xl transition-all shadow"
                      >
                        <MessageCircle className="w-4 h-4" />
                        <span>WhatsApp Booking</span>
                      </a>
                      <a
                        href={`tel:${stall.phone}`}
                        className="inline-flex items-center justify-center gap-1.5 bg-[#2b1010] hover:bg-[#3d1616] text-amber-200 border border-amber-500/30 font-bold text-xs sm:text-sm py-3 px-4 rounded-xl transition-all"
                      >
                        <Phone className="w-4 h-4 text-orange-400" />
                        <span>Call Stall</span>
                      </a>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
