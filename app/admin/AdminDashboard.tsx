"use client";

import React, { useState } from "react";
import { SiteData, ComboItem, MenuItem, OfferItem } from "@/lib/types";
import { saveSiteData, seedDefaultData } from "@/lib/dataService";
import { isFirebaseConfigured } from "@/lib/firebase";
import { Toast } from "@/components/Toast";
import {
  Flame,
  Save,
  RotateCcw,
  ExternalLink,
  LogOut,
  Plus,
  Trash2,
  Edit2,
  ArrowUp,
  ArrowDown,
  Eye,
  EyeOff,
  Store,
  UtensilsCrossed,
  Gift,
  Sparkles,
  Sliders,
  Check,
  Cloud,
  CheckCircle2,
  AlertCircle
} from "lucide-react";

interface AdminDashboardProps {
  initialData: SiteData;
  adminEmail: string;
  onLogout: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  initialData,
  adminEmail,
  onLogout,
}) => {
  const [data, setData] = useState<SiteData>(initialData);
  const [activeTab, setActiveTab] = useState<
    "stall" | "combos" | "menu" | "stamps" | "offers" | "sections"
  >("stall");
  const [isSaving, setIsSaving] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" | "info" } | null>(null);

  // Modal states for editing
  const [editingCombo, setEditingCombo] = useState<ComboItem | null>(null);
  const [isAddingCombo, setIsAddingCombo] = useState(false);

  const [editingMenuItem, setEditingMenuItem] = useState<MenuItem | null>(null);
  const [isAddingMenuItem, setIsAddingMenuItem] = useState(false);

  const [editingOffer, setEditingOffer] = useState<OfferItem | null>(null);
  const [isAddingOffer, setIsAddingOffer] = useState(false);

  const firebaseReady = isFirebaseConfigured();

  const handleSaveAll = async () => {
    setIsSaving(true);
    try {
      const result = await saveSiteData(data);
      if (result.success) {
        if (result.firestoreSaved) {
          setToast({
            message: "🎉 Changes saved live to Cloud Firestore! Public site is updated.",
            type: "success",
          });
        } else {
          setToast({
            message: "✅ Changes saved to local storage! (Connect Firebase to sync globally)",
            type: "info",
          });
        }
      } else {
        setToast({
          message: `❌ Error saving: ${result.error}`,
          type: "error",
        });
      }
    } catch (e: any) {
      setToast({ message: `❌ Save failed: ${e?.message}`, type: "error" });
    } finally {
      setIsSaving(false);
    }
  };

  const handleResetToDefault = async () => {
    if (!confirm("Are you sure you want to restore default fest data? Any custom edits will be reset.")) return;
    setIsSaving(true);
    try {
      const result = await seedDefaultData();
      if (result.success) {
        window.location.reload();
      }
    } catch (err: any) {
      setToast({ message: `Reset failed: ${err.message}`, type: "error" });
    } finally {
      setIsSaving(false);
    }
  };

  // Helper for stall info edits
  const handleStallChange = (field: keyof typeof data.stall, value: string) => {
    setData((prev) => ({
      ...prev,
      stall: {
        ...prev.stall,
        [field]: value,
      },
    }));
  };

  // Combo Handlers
  const handleToggleComboVisible = (id: string) => {
    setData((prev) => ({
      ...prev,
      combos: prev.combos.map((c) => (c.id === id ? { ...c, visible: !c.visible } : c)),
    }));
  };

  const handleDeleteCombo = (id: string) => {
    if (!confirm("Delete this combo?")) return;
    setData((prev) => ({
      ...prev,
      combos: prev.combos.filter((c) => c.id !== id),
    }));
  };

  const handleMoveCombo = (index: number, direction: "up" | "down") => {
    const newCombos = [...data.combos];
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= newCombos.length) return;
    const temp = newCombos[index];
    newCombos[index] = newCombos[targetIndex];
    newCombos[targetIndex] = temp;
    // update order numbers
    newCombos.forEach((c, idx) => (c.order = idx + 1));
    setData((prev) => ({ ...prev, combos: newCombos }));
  };

  const handleSaveCombo = (comboToSave: ComboItem) => {
    if (editingCombo) {
      setData((prev) => ({
        ...prev,
        combos: prev.combos.map((c) => (c.id === comboToSave.id ? comboToSave : c)),
      }));
      setEditingCombo(null);
    } else {
      setData((prev) => ({
        ...prev,
        combos: [...prev.combos, { ...comboToSave, order: prev.combos.length + 1 }],
      }));
      setIsAddingCombo(false);
    }
  };

  // Menu Item Handlers
  const handleToggleMenuVisible = (id: string) => {
    setData((prev) => ({
      ...prev,
      menuItems: prev.menuItems.map((m) => (m.id === id ? { ...m, visible: !m.visible } : m)),
    }));
  };

  const handleDeleteMenuItem = (id: string) => {
    if (!confirm("Delete this menu item?")) return;
    setData((prev) => ({
      ...prev,
      menuItems: prev.menuItems.filter((m) => m.id !== id),
    }));
  };

  const handleSaveMenuItem = (itemToSave: MenuItem) => {
    if (editingMenuItem) {
      setData((prev) => ({
        ...prev,
        menuItems: prev.menuItems.map((m) => (m.id === itemToSave.id ? itemToSave : m)),
      }));
      setEditingMenuItem(null);
    } else {
      setData((prev) => ({
        ...prev,
        menuItems: [...prev.menuItems, { ...itemToSave, order: prev.menuItems.length + 1 }],
      }));
      setIsAddingMenuItem(false);
    }
  };

  // Offer Handlers
  const handleToggleOfferVisible = (id: string) => {
    setData((prev) => ({
      ...prev,
      offers: prev.offers.map((o) => (o.id === id ? { ...o, visible: !o.visible } : o)),
    }));
  };

  const handleDeleteOffer = (id: string) => {
    if (!confirm("Delete this offer?")) return;
    setData((prev) => ({
      ...prev,
      offers: prev.offers.filter((o) => o.id !== id),
    }));
  };

  const handleSaveOffer = (offerToSave: OfferItem) => {
    if (editingOffer) {
      setData((prev) => ({
        ...prev,
        offers: prev.offers.map((o) => (o.id === offerToSave.id ? offerToSave : o)),
      }));
      setEditingOffer(null);
    } else {
      setData((prev) => ({
        ...prev,
        offers: [...prev.offers, { ...offerToSave, order: prev.offers.length + 1 }],
      }));
      setIsAddingOffer(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0d0404] text-stone-100 flex flex-col">
      {/* Toast Notification */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      {/* Admin Header */}
      <header className="sticky top-0 z-30 bg-[#160707] border-b border-amber-900/40 shadow-xl px-4 sm:px-8 py-3.5 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-amber-500 to-red-600 flex items-center justify-center shadow">
            <Flame className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base sm:text-lg font-black text-white">
                MUMBAI SPICE Control Center
              </h1>
              <span className="bg-red-950 text-amber-300 text-[10px] font-bold px-2 py-0.5 rounded border border-amber-500/30 uppercase">
                Admin Panel
              </span>
            </div>
            <p className="text-xs text-amber-300/70">
              Logged in as <strong className="text-amber-200">{adminEmail}</strong>
            </p>
          </div>
        </div>

        {/* Global Action Buttons */}
        <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
          {/* Status Indicator */}
          <div className="hidden lg:flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full bg-black/40 border border-white/10 text-stone-300">
            {firebaseReady ? (
              <>
                <Cloud className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400 font-bold">Firestore Connected</span>
              </>
            ) : (
              <>
                <AlertCircle className="w-3.5 h-3.5 text-amber-400" />
                <span className="text-amber-300 font-medium">Local Storage Active</span>
              </>
            )}
          </div>

          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 bg-[#250d0d] hover:bg-[#381414] text-amber-200 text-xs font-bold py-2 px-3 rounded-xl border border-amber-900/40 transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Public Site</span>
          </a>

          <button
            onClick={handleResetToDefault}
            disabled={isSaving}
            className="inline-flex items-center gap-1.5 bg-[#250d0d] hover:bg-[#381414] text-stone-300 text-xs font-semibold py-2 px-3 rounded-xl border border-white/10 transition-colors"
            title="Reset to original festival seed data"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Reset Seed</span>
          </button>

          <button
            onClick={handleSaveAll}
            disabled={isSaving}
            className="inline-flex items-center gap-1.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black text-xs sm:text-sm py-2 px-4 rounded-xl shadow-glow transition-all active:scale-95"
          >
            <Save className="w-4 h-4" />
            <span>{isSaving ? "Saving..." : "Save Changes"}</span>
          </button>

          <button
            onClick={onLogout}
            className="p-2 text-stone-400 hover:text-red-400 hover:bg-white/5 rounded-xl transition-colors"
            title="Sign out of Admin Panel"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Main Admin Content Body */}
      <div className="flex-1 max-w-6xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-amber-900/30 text-xs sm:text-sm font-bold scrollbar-none">
          <button
            onClick={() => setActiveTab("stall")}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl shrink-0 transition-all ${
              activeTab === "stall"
                ? "bg-gradient-to-r from-amber-600 to-orange-600 text-white shadow"
                : "text-stone-300 hover:bg-white/5"
            }`}
          >
            <Store className="w-4 h-4" />
            <span>Stall Info & Copy</span>
          </button>

          <button
            onClick={() => setActiveTab("combos")}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl shrink-0 transition-all ${
              activeTab === "combos"
                ? "bg-gradient-to-r from-amber-600 to-orange-600 text-white shadow"
                : "text-stone-300 hover:bg-white/5"
            }`}
          >
            <Flame className="w-4 h-4" />
            <span>Combos & Schemes ({data.combos.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("menu")}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl shrink-0 transition-all ${
              activeTab === "menu"
                ? "bg-gradient-to-r from-amber-600 to-orange-600 text-white shadow"
                : "text-stone-300 hover:bg-white/5"
            }`}
          >
            <UtensilsCrossed className="w-4 h-4" />
            <span>Full Menu & Drinks ({data.menuItems.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("stamps")}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl shrink-0 transition-all ${
              activeTab === "stamps"
                ? "bg-gradient-to-r from-amber-600 to-orange-600 text-white shadow"
                : "text-stone-300 hover:bg-white/5"
            }`}
          >
            <Gift className="w-4 h-4" />
            <span>Stamp Card Rules</span>
          </button>

          <button
            onClick={() => setActiveTab("offers")}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl shrink-0 transition-all ${
              activeTab === "offers"
                ? "bg-gradient-to-r from-amber-600 to-orange-600 text-white shadow"
                : "text-stone-300 hover:bg-white/5"
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>Special Offers ({data.offers.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("sections")}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl shrink-0 transition-all ${
              activeTab === "sections"
                ? "bg-gradient-to-r from-amber-600 to-orange-600 text-white shadow"
                : "text-stone-300 hover:bg-white/5"
            }`}
          >
            <Sliders className="w-4 h-4" />
            <span>Section Toggles</span>
          </button>
        </div>

        {/* TAB 1: STALL INFO & GENERAL SETTINGS */}
        {activeTab === "stall" && (
          <div className="festive-card rounded-3xl p-6 sm:p-8 space-y-6">
            <div className="border-b border-white/10 pb-4">
              <h2 className="text-xl font-black text-white">Stall Branding & Operational Details</h2>
              <p className="text-xs text-amber-200/70 mt-1">
                Update the festival stall name, dates, timings, announcement ticker, and hero image.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-bold text-amber-300 uppercase mb-1.5">
                  Stall Brand Name
                </label>
                <input
                  type="text"
                  value={data.stall.name}
                  onChange={(e) => handleStallChange("name", e.target.value)}
                  className="w-full bg-[#120505] border border-amber-900/50 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-amber-300 uppercase mb-1.5">
                  Festival Edition / Subtitle
                </label>
                <input
                  type="text"
                  value={data.stall.edition}
                  onChange={(e) => handleStallChange("edition", e.target.value)}
                  className="w-full bg-[#120505] border border-amber-900/50 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-amber-300 uppercase mb-1.5">
                  Festival Dates
                </label>
                <input
                  type="text"
                  value={data.stall.datesText}
                  onChange={(e) => handleStallChange("datesText", e.target.value)}
                  placeholder="e.g. 20 - 28 September"
                  className="w-full bg-[#120505] border border-amber-900/50 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-amber-300 uppercase mb-1.5">
                  Operating Timings
                </label>
                <input
                  type="text"
                  value={data.stall.timingsText}
                  onChange={(e) => handleStallChange("timingsText", e.target.value)}
                  placeholder="e.g. 6:00 PM to 12:00 AM"
                  className="w-full bg-[#120505] border border-amber-900/50 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-amber-300 uppercase mb-1.5">
                  Festival Tagline
                </label>
                <input
                  type="text"
                  value={data.stall.tagline}
                  onChange={(e) => handleStallChange("tagline", e.target.value)}
                  className="w-full bg-[#120505] border border-amber-900/50 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-amber-300 uppercase mb-1.5">
                  Hero Image URL
                </label>
                <input
                  type="text"
                  value={data.stall.heroImage}
                  onChange={(e) => handleStallChange("heroImage", e.target.value)}
                  className="w-full bg-[#120505] border border-amber-900/50 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400"
                />
                <p className="text-[11px] text-stone-400 mt-1">
                  Provide an image URL of your steaming cheese burst vadapav.
                </p>
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-amber-300 uppercase mb-1.5">
                  Stall Story (&ldquo;Fresh banta hai, garam milta hai.&rdquo;)
                </label>
                <textarea
                  rows={3}
                  value={data.stall.story}
                  onChange={(e) => handleStallChange("story", e.target.value)}
                  className="w-full bg-[#120505] border border-amber-900/50 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-amber-300 uppercase mb-1.5">
                  Stall Address / Location Text
                </label>
                <input
                  type="text"
                  value={data.stall.locationAddress}
                  onChange={(e) => handleStallChange("locationAddress", e.target.value)}
                  className="w-full bg-[#120505] border border-amber-900/50 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-amber-300 uppercase mb-1.5">
                  Google Maps URL
                </label>
                <input
                  type="text"
                  value={data.stall.googleMapsUrl}
                  onChange={(e) => handleStallChange("googleMapsUrl", e.target.value)}
                  className="w-full bg-[#120505] border border-amber-900/50 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-amber-300 uppercase mb-1.5">
                  Phone Number
                </label>
                <input
                  type="text"
                  value={data.stall.phone}
                  onChange={(e) => handleStallChange("phone", e.target.value)}
                  className="w-full bg-[#120505] border border-amber-900/50 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-amber-300 uppercase mb-1.5">
                  WhatsApp Number (with country code, e.g. 919876543210)
                </label>
                <input
                  type="text"
                  value={data.stall.whatsappNumber}
                  onChange={(e) => handleStallChange("whatsappNumber", e.target.value)}
                  className="w-full bg-[#120505] border border-amber-900/50 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-amber-300 uppercase mb-1.5">
                  Instagram Profile Link
                </label>
                <input
                  type="text"
                  value={data.stall.instagramUrl}
                  onChange={(e) => handleStallChange("instagramUrl", e.target.value)}
                  className="w-full bg-[#120505] border border-amber-900/50 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-amber-300 uppercase mb-1.5">
                  Google Review Link
                </label>
                <input
                  type="text"
                  value={data.stall.googleReviewUrl}
                  onChange={(e) => handleStallChange("googleReviewUrl", e.target.value)}
                  className="w-full bg-[#120505] border border-amber-900/50 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 flex justify-end">
              <button
                onClick={handleSaveAll}
                disabled={isSaving}
                className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white font-bold text-sm px-6 py-2.5 rounded-xl flex items-center gap-2 shadow"
              >
                <Save className="w-4 h-4" />
                <span>Save Stall Info</span>
              </button>
            </div>
          </div>
        )}

        {/* TAB 2: COMBOS MANAGER */}
        {activeTab === "combos" && (
          <div className="festive-card rounded-3xl p-6 sm:p-8 space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4">
              <div>
                <h2 className="text-xl font-black text-white">Combos & Value Schemes</h2>
                <p className="text-xs text-amber-200/70 mt-1">
                  Add, edit, reorder, and toggle visibility of special festive combos.
                </p>
              </div>
              <button
                onClick={() => {
                  setEditingCombo(null);
                  setIsAddingCombo(true);
                }}
                className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white font-bold text-xs sm:text-sm px-4 py-2 rounded-xl flex items-center gap-1.5 shadow"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Combo</span>
              </button>
            </div>

            {/* Combos List */}
            <div className="space-y-3">
              {data.combos.map((combo, idx) => (
                <div
                  key={combo.id}
                  className={`p-4 rounded-2xl border transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 ${
                    combo.visible
                      ? "bg-[#180707] border-amber-500/30"
                      : "bg-[#100404] border-stone-800 opacity-60"
                  }`}
                >
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-black/40 text-amber-300 border border-white/5">
                        {combo.category}
                      </span>
                      {combo.tag && (
                        <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-red-900/80 text-amber-200 border border-amber-500/30">
                          {combo.tag}
                        </span>
                      )}
                      <h3 className="text-base font-black text-white">{combo.name}</h3>
                      <span className="text-base font-black text-amber-300">
                        ₹{combo.price}
                      </span>
                      <span className="text-xs font-bold text-emerald-400">
                        ({combo.savingsText})
                      </span>
                    </div>
                    <p className="text-xs text-stone-300">
                      Items: {combo.items.join(" + ")}
                    </p>
                  </div>

                  {/* Actions for this combo */}
                  <div className="flex items-center gap-1.5 self-end md:self-center">
                    <button
                      onClick={() => handleMoveCombo(idx, "up")}
                      disabled={idx === 0}
                      className="p-1.5 text-stone-400 hover:text-white disabled:opacity-30 rounded-lg hover:bg-white/5"
                      title="Move Up"
                    >
                      <ArrowUp className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleMoveCombo(idx, "down")}
                      disabled={idx === data.combos.length - 1}
                      className="p-1.5 text-stone-400 hover:text-white disabled:opacity-30 rounded-lg hover:bg-white/5"
                      title="Move Down"
                    >
                      <ArrowDown className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleToggleComboVisible(combo.id)}
                      className={`p-1.5 rounded-lg ${
                        combo.visible ? "text-emerald-400" : "text-stone-500"
                      } hover:bg-white/5`}
                      title={combo.visible ? "Hide from public" : "Show on public"}
                    >
                      {combo.visible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                    </button>
                    <button
                      onClick={() => {
                        setEditingCombo(combo);
                        setIsAddingCombo(false);
                      }}
                      className="p-1.5 text-amber-300 hover:text-amber-100 rounded-lg hover:bg-white/5"
                      title="Edit Combo"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteCombo(combo.id)}
                      className="p-1.5 text-red-400 hover:text-red-200 rounded-lg hover:bg-white/5"
                      title="Delete Combo"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: FULL MENU & DRINKS */}
        {activeTab === "menu" && (
          <div className="festive-card rounded-3xl p-6 sm:p-8 space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4">
              <div>
                <h2 className="text-xl font-black text-white">Full Menu Items & Drinks</h2>
                <p className="text-xs text-amber-200/70 mt-1">
                  Manage individual Vadapavs, Chilled Drinks, and A la carte vs In-combo pricing.
                </p>
              </div>
              <button
                onClick={() => {
                  setEditingMenuItem(null);
                  setIsAddingMenuItem(true);
                }}
                className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white font-bold text-xs sm:text-sm px-4 py-2 rounded-xl flex items-center gap-1.5 shadow"
              >
                <Plus className="w-4 h-4" />
                <span>Add Menu Item</span>
              </button>
            </div>

            {/* Menu Items Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-white/10 text-amber-300 text-[11px] uppercase tracking-wider">
                    <th className="py-2.5 px-3">Item Name</th>
                    <th className="py-2.5 px-3">Category</th>
                    <th className="py-2.5 px-3 text-center">A La Carte</th>
                    <th className="py-2.5 px-3 text-center">In-Combo</th>
                    <th className="py-2.5 px-3 text-center">Status</th>
                    <th className="py-2.5 px-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {data.menuItems.map((item) => (
                    <tr
                      key={item.id}
                      className={`hover:bg-white/[0.02] ${
                        !item.visible ? "opacity-50" : ""
                      }`}
                    >
                      <td className="py-3 px-3 font-bold text-white">
                        <div className="flex items-center gap-2">
                          <span>{item.name}</span>
                          {item.isVeg && (
                            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
                          )}
                        </div>
                        {item.description && (
                          <div className="text-[11px] text-stone-400 font-normal line-clamp-1">
                            {item.description}
                          </div>
                        )}
                      </td>
                      <td className="py-3 px-3 uppercase text-[10px] font-extrabold text-amber-400/80">
                        {item.category}
                      </td>
                      <td className="py-3 px-3 text-center font-bold text-amber-200">
                        ₹{item.alacartePrice}
                      </td>
                      <td className="py-3 px-3 text-center font-bold text-emerald-400">
                        ₹{item.inComboPrice}
                      </td>
                      <td className="py-3 px-3 text-center">
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            item.visible
                              ? "bg-emerald-950 text-emerald-300 border border-emerald-500/30"
                              : "bg-stone-900 text-stone-400"
                          }`}
                        >
                          {item.visible ? "Visible" : "Hidden"}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-right space-x-1">
                        <button
                          onClick={() => handleToggleMenuVisible(item.id)}
                          className="p-1 text-stone-400 hover:text-white"
                          title="Toggle visibility"
                        >
                          {item.visible ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                        </button>
                        <button
                          onClick={() => {
                            setEditingMenuItem(item);
                            setIsAddingMenuItem(false);
                          }}
                          className="p-1 text-amber-300 hover:text-white"
                          title="Edit"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteMenuItem(item.id)}
                          className="p-1 text-red-400 hover:text-white"
                          title="Delete"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Menu Policy Notes Editor */}
            <div className="p-5 rounded-2xl bg-[#170505] border border-amber-900/40 space-y-4">
              <h3 className="text-sm font-bold text-amber-300 uppercase tracking-wider">
                Parcel Charges & Combo Notes
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold text-stone-300 uppercase mb-1">
                    Standard Parcel Charge (₹)
                  </label>
                  <input
                    type="number"
                    value={data.menuNotes.parcelChargesStandard}
                    onChange={(e) =>
                      setData((prev) => ({
                        ...prev,
                        menuNotes: {
                          ...prev.menuNotes,
                          parcelChargesStandard: Number(e.target.value),
                        },
                      }))
                    }
                    className="w-full bg-[#100303] border border-amber-900/50 rounded-xl px-3 py-2 text-sm text-white"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-stone-300 uppercase mb-1">
                    Special Parcel Charge (₹)
                  </label>
                  <input
                    type="number"
                    value={data.menuNotes.parcelChargesSpecial}
                    onChange={(e) =>
                      setData((prev) => ({
                        ...prev,
                        menuNotes: {
                          ...prev.menuNotes,
                          parcelChargesSpecial: Number(e.target.value),
                        },
                      }))
                    }
                    className="w-full bg-[#100303] border border-amber-900/50 rounded-xl px-3 py-2 text-sm text-white"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-[11px] font-bold text-stone-300 uppercase mb-1">
                    Drink Change Policy Text
                  </label>
                  <input
                    type="text"
                    value={data.menuNotes.drinkChangePolicy}
                    onChange={(e) =>
                      setData((prev) => ({
                        ...prev,
                        menuNotes: {
                          ...prev.menuNotes,
                          drinkChangePolicy: e.target.value,
                        },
                      }))
                    }
                    className="w-full bg-[#100303] border border-amber-900/50 rounded-xl px-3 py-2 text-sm text-white"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: STAMP CARD */}
        {activeTab === "stamps" && (
          <div className="festive-card rounded-3xl p-6 sm:p-8 space-y-6">
            <div className="border-b border-white/10 pb-4">
              <h2 className="text-xl font-black text-white">&ldquo;9 Din, 9 Vadapav&rdquo; Stamp Card Rules</h2>
              <p className="text-xs text-amber-200/70 mt-1">
                Configure rewards for 5th and 9th visits, minimum bill threshold, and counter instructions.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-bold text-amber-300 uppercase mb-1.5">
                  Stamp Card Heading
                </label>
                <input
                  type="text"
                  value={data.stampCard.title}
                  onChange={(e) =>
                    setData((prev) => ({
                      ...prev,
                      stampCard: { ...prev.stampCard, title: e.target.value },
                    }))
                  }
                  className="w-full bg-[#120505] border border-amber-900/50 rounded-xl px-4 py-2.5 text-sm text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-amber-300 uppercase mb-1.5">
                  Min Bill Threshold for Stamp (₹)
                </label>
                <input
                  type="number"
                  value={data.stampCard.ruleBillThreshold}
                  onChange={(e) =>
                    setData((prev) => ({
                      ...prev,
                      stampCard: {
                        ...prev.stampCard,
                        ruleBillThreshold: Number(e.target.value),
                      },
                    }))
                  }
                  className="w-full bg-[#120505] border border-amber-900/50 rounded-xl px-4 py-2.5 text-sm text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-amber-300 uppercase mb-1.5">
                  5th Visit Reward (Day 5 Milestone)
                </label>
                <input
                  type="text"
                  value={data.stampCard.milestones.stamp5Reward}
                  onChange={(e) =>
                    setData((prev) => ({
                      ...prev,
                      stampCard: {
                        ...prev.stampCard,
                        milestones: {
                          ...prev.stampCard.milestones,
                          stamp5Reward: e.target.value,
                        },
                      },
                    }))
                  }
                  className="w-full bg-[#120505] border border-amber-900/50 rounded-xl px-4 py-2.5 text-sm text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-amber-300 uppercase mb-1.5">
                  9th Visit Grand Reward (Day 9 Milestone)
                </label>
                <input
                  type="text"
                  value={data.stampCard.milestones.stamp9Reward}
                  onChange={(e) =>
                    setData((prev) => ({
                      ...prev,
                      stampCard: {
                        ...prev.stampCard,
                        milestones: {
                          ...prev.stampCard.milestones,
                          stamp9Reward: e.target.value,
                        },
                      },
                    }))
                  }
                  className="w-full bg-[#120505] border border-amber-900/50 rounded-xl px-4 py-2.5 text-sm text-white"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-amber-300 uppercase mb-1.5">
                  Rules Bullet Points (one per line)
                </label>
                <textarea
                  rows={5}
                  value={data.stampCard.rulesText.join("\n")}
                  onChange={(e) =>
                    setData((prev) => ({
                      ...prev,
                      stampCard: {
                        ...prev.stampCard,
                        rulesText: e.target.value.split("\n").filter((l) => l.trim().length > 0),
                      },
                    }))
                  }
                  className="w-full bg-[#120505] border border-amber-900/50 rounded-xl px-4 py-2.5 text-sm text-white"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 flex justify-end">
              <button
                onClick={handleSaveAll}
                disabled={isSaving}
                className="bg-gradient-to-r from-amber-600 to-orange-600 text-white font-bold text-sm px-6 py-2.5 rounded-xl flex items-center gap-2 shadow"
              >
                <Save className="w-4 h-4" />
                <span>Save Stamp Card Settings</span>
              </button>
            </div>
          </div>
        )}

        {/* TAB 5: SPECIAL OFFERS */}
        {activeTab === "offers" && (
          <div className="festive-card rounded-3xl p-6 sm:p-8 space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4">
              <div>
                <h2 className="text-xl font-black text-white">Festive Special Offers</h2>
                <p className="text-xs text-amber-200/70 mt-1">
                  Manage Instagram Follow & Tag, Google Review reward, Garba After Hours, and Bulk Order options.
                </p>
              </div>
              <button
                onClick={() => {
                  setEditingOffer(null);
                  setIsAddingOffer(true);
                }}
                className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white font-bold text-xs sm:text-sm px-4 py-2 rounded-xl flex items-center gap-1.5 shadow"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Offer</span>
              </button>
            </div>

            {/* Offers list */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {data.offers.map((offer) => (
                <div
                  key={offer.id}
                  className={`p-5 rounded-2xl border flex flex-col justify-between ${
                    offer.visible
                      ? "bg-[#180707] border-amber-500/30"
                      : "bg-[#100303] border-stone-800 opacity-60"
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full bg-red-950 text-amber-300 border border-amber-500/30">
                        {offer.badge}
                      </span>
                      <span className="text-xs text-stone-400 uppercase font-mono">
                        {offer.actionType}
                      </span>
                    </div>
                    <h3 className="text-base font-black text-white">{offer.title}</h3>
                    <p className="text-xs font-bold text-amber-300 mb-2">{offer.tagline}</p>
                    <p className="text-xs text-stone-300 leading-relaxed mb-4">
                      {offer.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-white/5 flex items-center justify-between">
                    <span className="text-[11px] font-bold text-stone-400">
                      Button: &ldquo;{offer.actionText || "Default"}&rdquo;
                    </span>
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => handleToggleOfferVisible(offer.id)}
                        className={`p-1.5 rounded-lg ${
                          offer.visible ? "text-emerald-400" : "text-stone-500"
                        } hover:bg-white/5`}
                        title={offer.visible ? "Visible" : "Hidden"}
                      >
                        {offer.visible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                      </button>
                      <button
                        onClick={() => {
                          setEditingOffer(offer);
                          setIsAddingOffer(false);
                        }}
                        className="p-1.5 text-amber-300 hover:text-white rounded-lg hover:bg-white/5"
                        title="Edit Offer"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteOffer(offer.id)}
                        className="p-1.5 text-red-400 hover:text-white rounded-lg hover:bg-white/5"
                        title="Delete Offer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 6: SECTION VISIBILITY */}
        {activeTab === "sections" && (
          <div className="festive-card rounded-3xl p-6 sm:p-8 space-y-6">
            <div className="border-b border-white/10 pb-4">
              <h2 className="text-xl font-black text-white">Public Section Visibility</h2>
              <p className="text-xs text-amber-200/70 mt-1">
                Toggle entire sections on or off the public page with one click.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {Object.entries(data.sections).map(([key, value]) => (
                <div
                  key={key}
                  className="p-4 rounded-2xl bg-[#180707] border border-amber-500/20 flex items-center justify-between"
                >
                  <span className="text-sm font-bold capitalize text-white">
                    {key.replace(/([A-Z])/g, " $1")} Section
                  </span>
                  <button
                    onClick={() =>
                      setData((prev) => ({
                        ...prev,
                        sections: {
                          ...prev.sections,
                          [key as keyof typeof prev.sections]: !value,
                        },
                      }))
                    }
                    className={`px-3 py-1.5 rounded-full text-xs font-black transition-all ${
                      value
                        ? "bg-emerald-600 text-white shadow"
                        : "bg-stone-800 text-stone-400"
                    }`}
                  >
                    {value ? "ENABLED" : "DISABLED"}
                  </button>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-white/10 flex justify-end">
              <button
                onClick={handleSaveAll}
                disabled={isSaving}
                className="bg-gradient-to-r from-amber-600 to-orange-600 text-white font-bold text-sm px-6 py-2.5 rounded-xl flex items-center gap-2 shadow"
              >
                <Save className="w-4 h-4" />
                <span>Save Section Settings</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* MODAL: ADD / EDIT COMBO */}
      {(isAddingCombo || editingCombo) && (
        <ComboModal
          combo={editingCombo}
          onClose={() => {
            setIsAddingCombo(false);
            setEditingCombo(null);
          }}
          onSave={handleSaveCombo}
        />
      )}

      {/* MODAL: ADD / EDIT MENU ITEM */}
      {(isAddingMenuItem || editingMenuItem) && (
        <MenuItemModal
          item={editingMenuItem}
          onClose={() => {
            setIsAddingMenuItem(false);
            setEditingMenuItem(null);
          }}
          onSave={handleSaveMenuItem}
        />
      )}

      {/* MODAL: ADD / EDIT OFFER */}
      {(isAddingOffer || editingOffer) && (
        <OfferModal
          offer={editingOffer}
          onClose={() => {
            setIsAddingOffer(false);
            setEditingOffer(null);
          }}
          onSave={handleSaveOffer}
        />
      )}
    </div>
  );
};

// SUB-COMPONENT: COMBO MODAL
interface ComboModalProps {
  combo: ComboItem | null;
  onClose: () => void;
  onSave: (combo: ComboItem) => void;
}

const ComboModal: React.FC<ComboModalProps> = ({ combo, onClose, onSave }) => {
  const [formData, setFormData] = useState<ComboItem>(
    combo || {
      id: `combo-${Date.now()}`,
      name: "",
      price: 100,
      items: ["1 Cheese Burst Vadapav", "1 Cold Drink"],
      savingsText: "Save ₹15",
      tag: "BEST SELLER",
      category: "CHEEZY DELIGHTS",
      order: 1,
      visible: true,
    }
  );

  const [itemsString, setItemsString] = useState(formData.items.join(", "));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsedItems = itemsString
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
    onSave({ ...formData, items: parsedItems });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#180707] border border-amber-500/40 rounded-3xl max-w-lg w-full p-6 shadow-2xl space-y-4">
        <h3 className="text-lg font-black text-white">
          {combo ? "Edit Combo" : "Add New Combo Scheme"}
        </h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-amber-300 uppercase mb-1">
              Combo Name
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full bg-[#100303] border border-amber-900/60 rounded-xl px-3 py-2 text-sm text-white"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-amber-300 uppercase mb-1">
                Combo Price (₹)
              </label>
              <input
                type="number"
                required
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                className="w-full bg-[#100303] border border-amber-900/60 rounded-xl px-3 py-2 text-sm text-white"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-amber-300 uppercase mb-1">
                Savings Tag (e.g. Save ₹20)
              </label>
              <input
                type="text"
                value={formData.savingsText}
                onChange={(e) => setFormData({ ...formData, savingsText: e.target.value })}
                className="w-full bg-[#100303] border border-amber-900/60 rounded-xl px-3 py-2 text-sm text-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-amber-300 uppercase mb-1">
                Category
              </label>
              <select
                value={formData.category}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    category: e.target.value as "CHEEZY DELIGHTS" | "SAVER PACKS",
                  })
                }
                className="w-full bg-[#100303] border border-amber-900/60 rounded-xl px-3 py-2 text-sm text-white"
              >
                <option value="CHEEZY DELIGHTS">CHEEZY DELIGHTS</option>
                <option value="SAVER PACKS">SAVER PACKS</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-amber-300 uppercase mb-1">
                Badge / Tag (Optional)
              </label>
              <input
                type="text"
                value={formData.tag || ""}
                onChange={(e) => setFormData({ ...formData, tag: e.target.value })}
                placeholder="e.g. BEST SELLER"
                className="w-full bg-[#100303] border border-amber-900/60 rounded-xl px-3 py-2 text-sm text-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-amber-300 uppercase mb-1">
              Included Items (comma-separated)
            </label>
            <input
              type="text"
              required
              value={itemsString}
              onChange={(e) => setItemsString(e.target.value)}
              placeholder="e.g. 1 Cheese Burst VP, 1 Mayo VP, 1 Diet Coke"
              className="w-full bg-[#100303] border border-amber-900/60 rounded-xl px-3 py-2 text-sm text-white"
            />
          </div>

          <div className="flex items-center justify-end gap-2 pt-3 border-t border-white/10">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-bold text-stone-400 hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-gradient-to-r from-amber-600 to-orange-600 text-white text-xs font-black shadow"
            >
              Save Combo
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// SUB-COMPONENT: MENU ITEM MODAL
interface MenuItemModalProps {
  item: MenuItem | null;
  onClose: () => void;
  onSave: (item: MenuItem) => void;
}

const MenuItemModal: React.FC<MenuItemModalProps> = ({ item, onClose, onSave }) => {
  const [formData, setFormData] = useState<MenuItem>(
    item || {
      id: `menu-${Date.now()}`,
      name: "",
      alacartePrice: 30,
      inComboPrice: 25,
      category: "vadapav",
      description: "",
      isVeg: true,
      order: 1,
      visible: true,
    }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#180707] border border-amber-500/40 rounded-3xl max-w-lg w-full p-6 shadow-2xl space-y-4">
        <h3 className="text-lg font-black text-white">
          {item ? "Edit Menu Item" : "Add Menu Item"}
        </h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-amber-300 uppercase mb-1">
              Item Name
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full bg-[#100303] border border-amber-900/60 rounded-xl px-3 py-2 text-sm text-white"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-amber-300 uppercase mb-1">
                Category
              </label>
              <select
                value={formData.category}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    category: e.target.value as "vadapav" | "drinks",
                  })
                }
                className="w-full bg-[#100303] border border-amber-900/60 rounded-xl px-3 py-2 text-sm text-white"
              >
                <option value="vadapav">Vadapav Variety</option>
                <option value="drinks">Chilled Drink</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-amber-300 uppercase mb-1">
                Veg Option
              </label>
              <select
                value={formData.isVeg ? "true" : "false"}
                onChange={(e) =>
                  setFormData({ ...formData, isVeg: e.target.value === "true" })
                }
                className="w-full bg-[#100303] border border-amber-900/60 rounded-xl px-3 py-2 text-sm text-white"
              >
                <option value="true">100% Vegetarian</option>
                <option value="false">Non-Veg</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-amber-300 uppercase mb-1">
                A La Carte Price (₹)
              </label>
              <input
                type="number"
                required
                value={formData.alacartePrice}
                onChange={(e) =>
                  setFormData({ ...formData, alacartePrice: Number(e.target.value) })
                }
                className="w-full bg-[#100303] border border-amber-900/60 rounded-xl px-3 py-2 text-sm text-white"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-amber-300 uppercase mb-1">
                In-Combo Price (₹)
              </label>
              <input
                type="number"
                required
                value={formData.inComboPrice}
                onChange={(e) =>
                  setFormData({ ...formData, inComboPrice: Number(e.target.value) })
                }
                className="w-full bg-[#100303] border border-amber-900/60 rounded-xl px-3 py-2 text-sm text-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-amber-300 uppercase mb-1">
              Short Description / Ingredients
            </label>
            <input
              type="text"
              value={formData.description || ""}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="e.g. Sukha lehsun chutney, teekha thecha..."
              className="w-full bg-[#100303] border border-amber-900/60 rounded-xl px-3 py-2 text-sm text-white"
            />
          </div>

          <div className="flex items-center justify-end gap-2 pt-3 border-t border-white/10">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-bold text-stone-400 hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-gradient-to-r from-amber-600 to-orange-600 text-white text-xs font-black shadow"
            >
              Save Item
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// SUB-COMPONENT: OFFER MODAL
interface OfferModalProps {
  offer: OfferItem | null;
  onClose: () => void;
  onSave: (offer: OfferItem) => void;
}

const OfferModal: React.FC<OfferModalProps> = ({ offer, onClose, onSave }) => {
  const [formData, setFormData] = useState<OfferItem>(
    offer || {
      id: `offer-${Date.now()}`,
      title: "",
      tagline: "",
      badge: "LIMITED DEAL",
      description: "",
      actionText: "Claim Offer",
      actionUrl: "",
      actionType: "info",
      order: 1,
      visible: true,
    }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#180707] border border-amber-500/40 rounded-3xl max-w-lg w-full p-6 shadow-2xl space-y-4">
        <h3 className="text-lg font-black text-white">
          {offer ? "Edit Offer" : "Add Festive Offer"}
        </h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-amber-300 uppercase mb-1">
              Offer Title
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full bg-[#100303] border border-amber-900/60 rounded-xl px-3 py-2 text-sm text-white"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-amber-300 uppercase mb-1">
                Tagline / Highlight
              </label>
              <input
                type="text"
                required
                value={formData.tagline}
                onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                className="w-full bg-[#100303] border border-amber-900/60 rounded-xl px-3 py-2 text-sm text-white"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-amber-300 uppercase mb-1">
                Badge
              </label>
              <input
                type="text"
                required
                value={formData.badge}
                onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                className="w-full bg-[#100303] border border-amber-900/60 rounded-xl px-3 py-2 text-sm text-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-amber-300 uppercase mb-1">
              Description & Terms
            </label>
            <textarea
              rows={3}
              required
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full bg-[#100303] border border-amber-900/60 rounded-xl px-3 py-2 text-sm text-white"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-amber-300 uppercase mb-1">
                Action Type
              </label>
              <select
                value={formData.actionType}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    actionType: e.target.value as any,
                  })
                }
                className="w-full bg-[#100303] border border-amber-900/60 rounded-xl px-3 py-2 text-sm text-white"
              >
                <option value="instagram">Instagram Link</option>
                <option value="google_review">Google Review Link</option>
                <option value="whatsapp">WhatsApp Link</option>
                <option value="tel">Direct Call</option>
                <option value="info">Informational (At Counter)</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-amber-300 uppercase mb-1">
                Button Text
              </label>
              <input
                type="text"
                value={formData.actionText || ""}
                onChange={(e) => setFormData({ ...formData, actionText: e.target.value })}
                className="w-full bg-[#100303] border border-amber-900/60 rounded-xl px-3 py-2 text-sm text-white"
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 pt-3 border-t border-white/10">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-bold text-stone-400 hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-gradient-to-r from-amber-600 to-orange-600 text-white text-xs font-black shadow"
            >
              Save Offer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
