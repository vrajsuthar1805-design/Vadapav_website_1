"use client";

import React from "react";
import { CheckCircle2, AlertCircle, X } from "lucide-react";

interface ToastProps {
  message: string;
  type?: "success" | "error" | "info";
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, type = "success", onClose }) => {
  return (
    <div className="fixed top-5 right-5 z-50 max-w-sm w-full animate-in fade-in slide-in-from-top-4 duration-300">
      <div
        className={`flex items-start gap-3 p-4 rounded-2xl shadow-xl border ${
          type === "success"
            ? "bg-[#0f2413] border-emerald-500/50 text-emerald-100"
            : type === "error"
            ? "bg-[#2b0c0c] border-red-500/50 text-red-100"
            : "bg-[#1c140a] border-amber-500/50 text-amber-100"
        }`}
      >
        {type === "success" && <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />}
        {type === "error" && <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />}
        {type === "info" && <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />}

        <div className="flex-1 text-xs sm:text-sm font-semibold leading-snug">
          {message}
        </div>

        <button
          onClick={onClose}
          className="text-stone-400 hover:text-white p-1 rounded-lg hover:bg-white/10"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
