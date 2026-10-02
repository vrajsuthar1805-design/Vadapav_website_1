"use client";

import React from "react";
import { StallInfo } from "@/lib/types";
import { MapPin, Clock, Calendar, Sparkles, Navigation, Phone, MessageCircle, Heart } from "lucide-react";

interface AboutUsProps {
  stall: StallInfo;
}

export const AboutUs: React.FC<AboutUsProps> = ({ stall }) => {
  return (
    <section id="about" className="py-12 sm:py-16 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="festive-card rounded-3xl p-6 sm:p-10 border border-amber-500/30 relative overflow-hidden shadow-festiveCard">
          {/* Decorative background glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-orange-600/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Story & Philosophy */}
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-950/70 border border-orange-500/40 text-orange-300 text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Our Vadapav Story</span>
              </div>

              <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
                Fresh Banta Hai, <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-orange-400 to-red-400">
                  Garam Milta Hai.
                </span>
              </h2>

              <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
                {stall.story}
              </p>

              <div className="pt-2 flex flex-wrap gap-3">
                <span className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-200 bg-black/40 px-3 py-1.5 rounded-xl border border-amber-500/20">
                  ⚡ Always Freshly Fried
                </span>
                <span className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-200 bg-black/40 px-3 py-1.5 rounded-xl border border-amber-500/20">
                  🧀 Real Amul Cheese
                </span>
                <span className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-200 bg-black/40 px-3 py-1.5 rounded-xl border border-amber-500/20">
                  🌶️ Authentic Lehsun & Thecha
                </span>
              </div>
            </div>

            {/* Location & Timings Card */}
            <div className="lg:col-span-5 bg-[#170505] rounded-2xl p-5 sm:p-6 border border-amber-500/25 space-y-5">
              <div className="border-b border-white/10 pb-3">
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-amber-400">
                  STALL COORDINATES
                </span>
                <h3 className="text-lg font-black text-white mt-0.5">
                  Visit Us Tonight
                </h3>
              </div>

              {/* Location Address */}
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-extrabold text-amber-300 uppercase">Stall Location</h4>
                  <p className="text-xs sm:text-sm text-stone-200 mt-0.5 leading-snug">
                    {stall.locationAddress}
                  </p>
                </div>
              </div>

              {/* Dates & Timings */}
              <div className="flex items-start gap-3">
                <Calendar className="w-5 h-5 text-orange-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-extrabold text-amber-300 uppercase">Festival Dates</h4>
                  <p className="text-xs sm:text-sm text-stone-200 mt-0.5">
                    {stall.datesText}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-extrabold text-amber-300 uppercase">Serving Hours</h4>
                  <p className="text-xs sm:text-sm text-stone-200 mt-0.5">
                    {stall.timingsText}
                  </p>
                </div>
              </div>

              {/* Google Maps Button */}
              <div className="pt-2">
                <a
                  href={stall.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 hover:from-amber-500 hover:to-orange-500 text-white font-bold text-sm py-3 px-4 rounded-xl shadow-md transition-all hover:shadow-glow"
                >
                  <Navigation className="w-4 h-4" />
                  <span>Open in Google Maps</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
