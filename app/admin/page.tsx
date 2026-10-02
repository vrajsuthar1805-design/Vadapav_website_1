"use client";

import React, { useState, useEffect } from "react";
import { auth, isFirebaseConfigured } from "@/lib/firebase";
import { signInWithEmailAndPassword, onAuthStateChanged, signOut, User } from "firebase/auth";
import { fetchSiteData, getLocalCachedData } from "@/lib/dataService";
import { SiteData } from "@/lib/types";
import { defaultSiteData } from "@/lib/defaultData";
import { AdminDashboard } from "./AdminDashboard";
import { Flame, Lock, Mail, KeyRound, AlertCircle, Sparkles, ArrowRight } from "lucide-react";

export default function AdminPage() {
  const [user, setUser] = useState<User | null>(null);
  const [localAdminAuthenticated, setLocalAdminAuthenticated] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [siteData, setSiteData] = useState<SiteData>(defaultSiteData);
  const [checkingAuth, setCheckingAuth] = useState(false);
  const [mounted, setMounted] = useState(false);

  const firebaseReady = isFirebaseConfigured();

  // Load site data and check session
  useEffect(() => {
    setMounted(true);
    async function loadData() {
      try {
        const loaded = await fetchSiteData();
        setSiteData(loaded || defaultSiteData);
      } catch (err) {
        setSiteData(getLocalCachedData());
      }
    }
    loadData();

    // Check session
    if (typeof window !== "undefined") {
      const localSession = sessionStorage.getItem("mumbai_spice_admin_session");
      if (localSession === "authenticated") {
        setLocalAdminAuthenticated(true);
      }
    }

    if (firebaseReady && auth) {
      const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
        setCheckingAuth(false);
      });
      return () => unsubscribe();
    } else {
      setCheckingAuth(false);
    }
  }, [firebaseReady]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (firebaseReady && auth) {
        // Authenticate with live Firebase Auth
        const credential = await signInWithEmailAndPassword(auth, email.trim(), password);
        setUser(credential.user);
      } else {
        // Development / local fallback mode before Firebase credentials are setup
        // Default credentials for local testing: admin@mumbaispice.com / mumbai2026
        if (
          (email.trim().toLowerCase() === "admin@mumbaispice.com" && password === "mumbai2026") ||
          (email.trim().toLowerCase() === "admin" && password === "admin123")
        ) {
          setLocalAdminAuthenticated(true);
          sessionStorage.setItem("mumbai_spice_admin_session", "authenticated");
        } else {
          throw new Error("Invalid admin credentials. Use admin@mumbaispice.com / mumbai2026 or set up Firebase Auth.");
        }
      }
    } catch (err: any) {
      console.error("Login error:", err);
      if (err.code === "auth/invalid-credential" || err.code === "auth/user-not-found" || err.code === "auth/wrong-password") {
        setError("Invalid email or password. Only the authorized stall owner can log in.");
      } else if (err.code === "auth/too-many-requests") {
        setError("Too many failed login attempts. Please wait a few minutes.");
      } else {
        setError(err.message || "Failed to sign in. Please verify your credentials.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    if (firebaseReady && auth) {
      await signOut(auth);
    }
    setUser(null);
    setLocalAdminAuthenticated(false);
    if (typeof window !== "undefined") {
      sessionStorage.removeItem("mumbai_spice_admin_session");
    }
  };

  if (checkingAuth) {
    return (
      <div className="min-h-screen bg-[#0d0404] flex items-center justify-center p-4">
        <div className="flex flex-col items-center gap-3">
          <div className="w-12 h-12 rounded-full border-2 border-amber-500 border-t-transparent animate-spin" />
          <span className="text-amber-200 text-xs font-bold tracking-wider uppercase">
            Verifying Admin Authorization...
          </span>
        </div>
      </div>
    );
  }

  // If authenticated either via Firebase Auth or local admin session
  if (user || localAdminAuthenticated) {
    return (
      <AdminDashboard
        initialData={siteData}
        adminEmail={user?.email || "admin@mumbaispice.com"}
        onLogout={handleLogout}
      />
    );
  }

  // Login Form Screen (Signup completely blocked)
  return (
    <div className="min-h-screen bg-[#0d0404] flex flex-col justify-center items-center p-4 relative selection:bg-amber-500 selection:text-black">
      {/* Background glow */}
      <div className="absolute top-1/4 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        {/* Brand Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-amber-600 via-orange-600 to-red-600 flex items-center justify-center mx-auto mb-4 shadow-glow">
            <Flame className="w-8 h-8 text-white fill-amber-100" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            MUMBAI SPICE
          </h1>
          <p className="text-xs sm:text-sm text-amber-300 font-bold uppercase tracking-widest mt-1">
            Secret Stall Owner Portal
          </p>
          <p className="text-xs text-stone-400 mt-2">
            Restricted access for the festival stall owner only. Public registration is closed.
          </p>
        </div>

        {/* Login Box */}
        <div className="festive-card rounded-3xl p-6 sm:p-8 border border-amber-500/30 shadow-festiveCard">
          <form onSubmit={handleLogin} className="space-y-5">
            {error && (
              <div className="p-3.5 rounded-xl bg-red-950/80 border border-red-500/50 text-red-200 text-xs flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-amber-200 uppercase tracking-wider mb-2">
                Owner Admin Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-stone-400 absolute left-3.5 top-3" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@mumbaispice.com"
                  className="w-full bg-[#120404] border border-amber-900/60 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-stone-600 focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-amber-200 uppercase tracking-wider mb-2">
                Secret Password
              </label>
              <div className="relative">
                <KeyRound className="w-4 h-4 text-stone-400 absolute left-3.5 top-3" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full bg-[#120404] border border-amber-900/60 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-stone-600 focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 hover:from-amber-500 hover:to-orange-500 text-white font-black text-sm tracking-wide shadow-glow transition-all flex items-center justify-center gap-2"
            >
              <Lock className="w-4 h-4" />
              <span>{loading ? "Verifying..." : "Access Admin Panel"}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Quick Notice */}
          <div className="mt-6 pt-5 border-t border-white/10 text-center">
            {!firebaseReady ? (
              <div className="text-[11px] text-amber-300/80 bg-amber-950/40 p-2.5 rounded-xl border border-amber-500/20">
                <span className="font-bold">⚡ Development Testing Mode:</span>
                <br />
                Login with <code className="text-white bg-black/40 px-1 py-0.5 rounded">admin@mumbaispice.com</code> &amp; password <code className="text-white bg-black/40 px-1 py-0.5 rounded">mumbai2026</code>.
              </div>
            ) : (
              <p className="text-[11px] text-stone-500">
                🔒 Protected by Firebase Authentication &amp; Firestore Security Rules.
              </p>
            )}
          </div>
        </div>

        {/* Back to Public Site link */}
        <div className="text-center mt-6">
          <a
            href="/"
            className="text-xs font-semibold text-stone-400 hover:text-amber-300 transition-colors"
          >
            ← Back to Public Website
          </a>
        </div>
      </div>
    </div>
  );
}
