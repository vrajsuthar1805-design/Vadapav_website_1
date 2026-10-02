"use client";

import React, { useState, useEffect } from "react";
import { StallInfo } from "@/lib/types";
import { Flame, Clock, Calendar, Menu, X, Sparkles, MapPin } from "lucide-react";

interface NavbarProps {
  stall: StallInfo;
}

export const Navbar: React.FC<NavbarProps> = ({ stall }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "🔥 Combos", href: "#combos" },
    { label: "📋 Full Menu", href: "#menu" },
    { label: "🎟️ 9 Din Stamp Card", href: "#rewards" },
    { label: "✨ Festive Offers", href: "#offers" },
    { label: "📍 Stall & Story", href: "#about" },
  ];

  return (
    <>
      {/* Top Festival Dates & Timings Ticker Ribbon */}
      <div className="festive-ribbon text-white text-xs sm:text-sm font-semibold py-1.5 px-3 text-center tracking-wide flex items-center justify-center gap-2 shadow-sm z-50 relative">
        <Sparkles className="w-3.5 h-3.5 text-amber-200 animate-spin" style={{ animationDuration: "6s" }} />
        <span>
          {stall.datesText} • {stall.timingsText}
        </span>
        <span className="hidden sm:inline-block bg-black/30 px-2 py-0.5 rounded text-[11px] font-bold text-amber-200 uppercase tracking-wider">
          Navratri Special
        </span>
      </div>

      {/* Main Sticky Navbar */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? "bg-[#140606]/95 backdrop-blur-md border-b border-amber-900/40 shadow-xl"
            : "bg-[#180808]/90 backdrop-blur-sm border-b border-amber-900/20"
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16 sm:h-18">
            {/* Logo & Stall Name */}
            <a href="#" className="flex items-center gap-2.5 group">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-amber-600 via-orange-600 to-red-600 flex items-center justify-center shadow-glow group-hover:scale-105 transition-transform">
                <Flame className="w-5 h-5 text-amber-100 fill-amber-200" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="text-lg sm:text-xl font-black tracking-tight text-white group-hover:text-amber-300 transition-colors">
                    {stall.name}
                  </span>
                  <span className="bg-red-800/80 text-amber-300 border border-amber-500/40 text-[10px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider">
                    {stall.edition}
                  </span>
                </div>
                <span className="text-[11px] text-amber-300/80 font-medium">
                  9 Din 9 Swaad • Vadapav Fest
                </span>
              </div>
            </a>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-1 lg:gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="px-3 py-1.5 text-sm font-medium text-amber-100/90 hover:text-amber-300 hover:bg-white/5 rounded-lg transition-all"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* Location CTA button for desktop */}
            <div className="hidden md:flex items-center gap-2">
              <a
                href={stall.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs font-semibold bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white px-3.5 py-2 rounded-full shadow-md transition-all hover:shadow-glow"
              >
                <MapPin className="w-3.5 h-3.5" />
                <span>Find Stall</span>
              </a>
            </div>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-amber-200 hover:text-white rounded-lg hover:bg-white/5 focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Navigation Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#180808]/98 border-b border-amber-900/50 px-4 pt-2 pb-5 space-y-2 animate-in slide-in-from-top-2">
            <div className="text-xs font-semibold text-amber-400/80 px-2 pt-1 pb-2 border-b border-white/5 flex items-center justify-between">
              <span>FESTIVAL DIRECTORY</span>
              <span className="text-[10px] text-amber-300/60">{stall.datesText}</span>
            </div>
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2.5 rounded-lg text-base font-medium text-amber-100 hover:text-amber-300 hover:bg-white/5 transition-colors"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-2 border-t border-white/5 flex gap-2">
              <a
                href={stall.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 text-sm font-semibold bg-gradient-to-r from-amber-600 to-orange-600 text-white py-2.5 rounded-xl shadow-md"
              >
                <MapPin className="w-4 h-4" />
                <span>Stall Directions</span>
              </a>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
