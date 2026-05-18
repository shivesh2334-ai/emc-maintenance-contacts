"use client";

import { AlertTriangle, X } from "lucide-react";

interface Props {
  contactName: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function DeleteConfirmModal({ contactName, onConfirm, onCancel }: Props) {
  return (
    <div
      className="modal-backdrop fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={(e) => e.target === e.currentTarget && onCancel()}
    >
      <div
        className="glass-card rounded-2xl w-full max-w-sm p-6 animate-slide-up"
        style={{ border: "1px solid rgba(239,68,68,0.25)" }}
      >
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: "rgba(239,68,68,0.15)", color: "#EF4444" }}>
            <AlertTriangle size={20} />
          </div>
          <div className="flex-1">
            <h3 className="text-emc-white font-bold mb-1"
              style={{ fontFamily: "var(--font-display)", letterSpacing: "0.04em" }}>
              DELETE CONTACT
            </h3>
            <p className="text-emc-slate text-sm">
              Remove <span className="text-emc-light font-medium">{contactName}</span> from the
              maintenance directory? This cannot be undone.
            </p>
          </div>
          <button onClick={onCancel}
            className="w-7 h-7 flex items-center justify-center rounded-lg text-emc-slate hover:text-emc-white transition-colors">
            <X size={16} />
          </button>
        </div>

        <div className="flex gap-3 mt-6">
          <button onClick={onCancel}
            className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-emc-slate hover:text-emc-light transition-colors"
            style={{ fontFamily: "var(--font-display)", letterSpacing: "0.04em", border: "1px solid rgba(136,146,176,0.2)" }}>
            CANCEL
          </button>
          <button onClick={onConfirm}
            className="flex-1 py-2.5 rounded-xl text-sm font-bold transition-all hover:opacity-90 active:scale-95"
            style={{
              fontFamily: "var(--font-display)",
              letterSpacing: "0.04em",
              background: "rgba(239,68,68,0.2)",
              color: "#EF4444",
              border: "1px solid rgba(239,68,68,0.35)",
            }}>
            DELETE
          </button>
        </div>
      </div>
    </div>
  );
}
