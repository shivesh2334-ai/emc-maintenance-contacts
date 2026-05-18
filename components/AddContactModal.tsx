"use client";

import { useState } from "react";
import { X, UserPlus, Phone, MessageCircle, Mail, FileText } from "lucide-react";
import { Contact, Department, ContactRole } from "@/lib/types";
import { v4 as uuidv4 } from "uuid";

const DEPARTMENTS: Department[] = [
  "Electrical", "Plumbing", "HVAC", "IT & Network",
  "Security", "Housekeeping", "Biomedical",
  "Civil & Structural", "General Maintenance", "Fire Safety",
];

const ROLES: ContactRole[] = [
  "Head", "Supervisor", "Technician", "Engineer",
  "Officer", "Coordinator", "Assistant", "Manager",
];

interface Props {
  onClose: () => void;
  onAdd: (contact: Contact) => void;
}

const emptyForm = {
  name: "",
  role: "Technician" as ContactRole,
  department: "General Maintenance" as Department,
  phone: "",
  whatsapp: "",
  email: "",
  availability: "Business Hours" as Contact["availability"],
  priority: "Normal" as Contact["priority"],
  notes: "",
};

export default function AddContactModal({ onClose, onAdd }: Props) {
  const [form, setForm] = useState(emptyForm);
  const [sameAsPhone, setSameAsPhone] = useState(true);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.phone.trim()) e.phone = "Phone is required";
    else if (!/^\+?[0-9]{7,15}$/.test(form.phone.replace(/\s/g, "")))
      e.phone = "Enter a valid phone number";
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = "Enter a valid email";
    return e;
  };

  const handleSubmit = () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }

    const contact: Contact = {
      id: uuidv4(),
      name: form.name.trim(),
      role: form.role,
      department: form.department,
      phone: form.phone.trim(),
      whatsapp: sameAsPhone ? form.phone.trim() : form.whatsapp.trim() || form.phone.trim(),
      email: form.email.trim() || undefined,
      availability: form.availability,
      priority: form.priority,
      notes: form.notes.trim() || undefined,
      createdAt: new Date().toISOString(),
    };
    onAdd(contact);
    onClose();
  };

  const field = (key: keyof typeof form, val: string) => {
    setForm((f) => ({ ...f, [key]: val }));
    if (errors[key]) setErrors((e) => { const n = { ...e }; delete n[key]; return n; });
  };

  return (
    <div
      className="modal-backdrop fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        className="glass-card rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto animate-slide-up"
        style={{ border: "1px solid rgba(0,212,170,0.25)" }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-emc-teal/10">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg flex items-center justify-center"
              style={{ background: "rgba(0,212,170,0.15)", color: "#00D4AA" }}>
              <UserPlus size={18} />
            </div>
            <div>
              <h2 className="text-emc-white font-bold teal-underline"
                style={{ fontFamily: "var(--font-display)", fontSize: "1.1rem", letterSpacing: "0.04em" }}>
                ADD CONTACT
              </h2>
              <p className="text-emc-slate text-xs mt-1">Maintenance Department Personnel</p>
            </div>
          </div>
          <button onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-emc-slate hover:text-emc-white hover:bg-white/5 transition-colors">
            <X size={18} />
          </button>
        </div>

        {/* Form */}
        <div className="p-6 space-y-5">
          {/* Name */}
          <div>
            <label className="block text-xs font-semibold text-emc-slate mb-1.5 uppercase tracking-wider">
              Full Name *
            </label>
            <input
              className="emc-input w-full rounded-lg px-4 py-2.5 text-sm"
              placeholder="e.g. Rajesh Kumar Singh"
              value={form.name}
              onChange={(e) => field("name", e.target.value)}
            />
            {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
          </div>

          {/* Role + Department */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-emc-slate mb-1.5 uppercase tracking-wider">Role *</label>
              <select className="emc-input w-full rounded-lg px-4 py-2.5 text-sm pr-8"
                value={form.role} onChange={(e) => field("role", e.target.value as ContactRole)}>
                {ROLES.map((r) => <option key={r}>{r}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-emc-slate mb-1.5 uppercase tracking-wider">Department *</label>
              <select className="emc-input w-full rounded-lg px-4 py-2.5 text-sm pr-8"
                value={form.department} onChange={(e) => field("department", e.target.value as Department)}>
                {DEPARTMENTS.map((d) => <option key={d}>{d}</option>)}
              </select>
            </div>
          </div>

          {/* Phone */}
          <div>
            <label className="block text-xs font-semibold text-emc-slate mb-1.5 uppercase tracking-wider">
              <span className="flex items-center gap-1.5"><Phone size={11} /> Phone Number *</span>
            </label>
            <input
              className="emc-input w-full rounded-lg px-4 py-2.5 text-sm font-mono"
              placeholder="+91 98100 00000"
              value={form.phone}
              onChange={(e) => field("phone", e.target.value)}
            />
            {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone}</p>}
          </div>

          {/* WhatsApp */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-semibold text-emc-slate uppercase tracking-wider">
                <span className="flex items-center gap-1.5"><MessageCircle size={11} /> WhatsApp Number</span>
              </label>
              <label className="flex items-center gap-1.5 text-xs text-emc-slate cursor-pointer">
                <input
                  type="checkbox"
                  checked={sameAsPhone}
                  onChange={(e) => setSameAsPhone(e.target.checked)}
                  className="accent-teal-400 w-3.5 h-3.5"
                />
                Same as phone
              </label>
            </div>
            {!sameAsPhone && (
              <input
                className="emc-input w-full rounded-lg px-4 py-2.5 text-sm font-mono"
                placeholder="+91 98100 00000"
                value={form.whatsapp}
                onChange={(e) => field("whatsapp", e.target.value)}
              />
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-xs font-semibold text-emc-slate mb-1.5 uppercase tracking-wider">
              <span className="flex items-center gap-1.5"><Mail size={11} /> Email (optional)</span>
            </label>
            <input
              type="email"
              className="emc-input w-full rounded-lg px-4 py-2.5 text-sm"
              placeholder="name@emcdigital.com"
              value={form.email}
              onChange={(e) => field("email", e.target.value)}
            />
            {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
          </div>

          {/* Availability + Priority */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-emc-slate mb-1.5 uppercase tracking-wider">Availability</label>
              <select className="emc-input w-full rounded-lg px-4 py-2.5 text-sm pr-8"
                value={form.availability}
                onChange={(e) => field("availability", e.target.value as Contact["availability"])}>
                <option>24/7</option>
                <option>Business Hours</option>
                <option>On-Call</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-emc-slate mb-1.5 uppercase tracking-wider">Priority</label>
              <select className="emc-input w-full rounded-lg px-4 py-2.5 text-sm pr-8"
                value={form.priority}
                onChange={(e) => field("priority", e.target.value as Contact["priority"])}>
                <option>Normal</option>
                <option>High</option>
                <option>Critical</option>
              </select>
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-xs font-semibold text-emc-slate mb-1.5 uppercase tracking-wider">
              <span className="flex items-center gap-1.5"><FileText size={11} /> Notes (optional)</span>
            </label>
            <textarea
              className="emc-input w-full rounded-lg px-4 py-2.5 text-sm resize-none"
              rows={2}
              placeholder="Responsibilities, equipment handled, coverage area..."
              value={form.notes}
              onChange={(e) => field("notes", e.target.value)}
            />
          </div>
        </div>

        {/* Footer */}
        <div className="flex gap-3 px-6 pb-6">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-emc-slate transition-colors hover:text-emc-light hover:bg-white/5"
            style={{ fontFamily: "var(--font-display)", letterSpacing: "0.05em", border: "1px solid rgba(136,146,176,0.2)" }}
          >
            CANCEL
          </button>
          <button
            onClick={handleSubmit}
            className="flex-1 py-2.5 rounded-xl text-sm font-bold transition-all hover:opacity-90 active:scale-95"
            style={{
              fontFamily: "var(--font-display)",
              letterSpacing: "0.06em",
              background: "linear-gradient(135deg, #00D4AA, #00B894)",
              color: "#0A1628",
              boxShadow: "0 4px 20px rgba(0,212,170,0.3)",
            }}
          >
            ADD CONTACT
          </button>
        </div>
      </div>
    </div>
  );
}
