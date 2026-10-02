"use client";

import React, { useState, useEffect } from "react";
import { SiteData } from "@/lib/types";
import { defaultSiteData } from "@/lib/defaultData";
import { subscribeToSiteData } from "@/lib/dataService";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Combos } from "@/components/Combos";
import { FullMenu } from "@/components/FullMenu";
import { StampCard } from "@/components/StampCard";
import { Offers } from "@/components/Offers";
import { AboutUs } from "@/components/AboutUs";
import { Footer } from "@/components/Footer";
import { FloatingActionBar } from "@/components/FloatingActionBar";

export default function HomePage() {
  const [data, setData] = useState<SiteData>(defaultSiteData);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const unsubscribe = subscribeToSiteData((updatedData) => {
      setData(updatedData);
    });
    return () => unsubscribe();
  }, []);

  const { stall, combos, menuItems, offers, stampCard, menuNotes, sections } = data;

  return (
    <main className="min-h-screen flex flex-col relative selection:bg-amber-500 selection:text-black">
      {/* Festive ambient background pattern overlay */}
      <div className="fixed inset-0 festive-pattern pointer-events-none z-0" />

      <div className="relative z-10 flex-1 flex flex-col">
        {/* Navigation */}
        <Navbar stall={stall} />

        {/* Hero Section */}
        {sections.hero && <Hero stall={stall} />}

        {/* Combos & Schemes Section (Top priority) */}
        {sections.combos && <Combos combos={combos} />}

        {/* Full Menu Section */}
        {sections.menu && <FullMenu items={menuItems} notes={menuNotes} />}

        {/* Rewards / Stamp Card Section */}
        {sections.rewards && stampCard.visible && (
          <StampCard config={stampCard} stall={stall} />
        )}

        {/* Festive Offers Section */}
        {sections.offers && <Offers offers={offers} stall={stall} />}

        {/* About Stall, Story & Location Section */}
        {sections.about && <AboutUs stall={stall} />}

        {/* Public Footer (no public admin link) */}
        <Footer stall={stall} />

        {/* Mobile-first Floating Action Bar */}
        {sections.floatingActions && <FloatingActionBar stall={stall} />}
      </div>
    </main>
  );
}
