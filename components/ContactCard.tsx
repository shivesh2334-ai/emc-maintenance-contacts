"use client";

import { Contact } from "@/lib/types";
import {
  Phone, MessageCircle, Trash2, Mail, Clock,
  Zap, Wrench, Wifi, Shield, Sparkles, Activity,
  Building2, Flame, Settings
} from "lucide-react";

const deptConfig: Record<string, { color: string; bg: string; icon: React.ReactNode }> = {
  "Electrical":        { color: "#FFB703", bg: "rgba(255,183,3,0.12)",    icon: <Zap size={13}/> },
  "Plumbing":          { color: "#00B4D8", bg: "rgba(0,180,216,0.12)",    icon: <Wrench size={13}/> },
  "HVAC":              { color: "#90E0EF", bg: "rgba(144,224,239,0.12)",   icon: <Sparkles size={13}/> },
  "IT & Network":      { color: "#00D4AA", bg: "rgba(0,212,170,0.12)",    icon: <Wifi size={13}/> },
  "Security":          { color: "#F77F00", bg: "rgba(247,127,0,0.12)",    icon: <Shield size={13}/> },
  "Housekeeping":      { color: "#A8DADC", bg: "rgba(168,218,220,0.12)",  icon: <Sparkles size={13}/> },
  "Biomedical":        { color: "#E63946", bg: "rgba(230,57,70,0.12)",    icon: <Activity size={13}/> },
  "Civil & Structural":{ color: "#8D99AE", bg: "rgba(141,153,174,0.12)",  icon: <Building2 size={13}/> },
  "Fire Safety":       { color: "#FF6B35", bg: "rgba(255,107,53,0.12)",   icon: <Flame size={13}/> },
  "General Maintenance":{ color: "#B5B5B5", bg: "rgba(181,181,181,0.12)", icon: <Settings size={13}/> },
};

const priorityConfig = {
  Critical: { label: "CRITICAL", color: "#EF4444", bg: "rgba(239,68,68,0.15)", glow: "glow-critical" },
  High:     { label: "HIGH",     color: "#FFB703", bg: "rgba(255,183,3,0.15)",  glow: "glow-high" },
  Normal:   { label: "NORMAL",   color: "#00D4AA", bg: "rgba(0,212,170,0.15)", glow: "glow-normal" },
};

const availConfig = {
  "24/7":           { color: "#00D4AA", label: "24 / 7" },
  "Business Hours": { color: "#FFB703", label: "Business Hrs" },
  "On-Call":        { color: "#8892B0", label: "On-Call" },
};

interface Props {
  contact: Contact;
  onDelete: (id: string) => void;
  index: number;
}

export default function ContactCard({ contact, onDelete, index }: Props) {
  const dept = deptConfig[contact.department] ?? deptConfig["General Maintenance"];
  const pri  = priorityConfig[contact.priority];
  const avail = availConfig[contact.availability];

  const initials = contact.name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  const handleCall = () => {
    window.location.href = `tel:${contact.phone}`;
  };

  const handleWhatsApp = () => {
    const num = contact.whatsapp.replace(/[^0-9]/g, "");
    window.open(`https://wa.me/${num}`, "_blank");
  };

  const handleEmail = () => {
    if (contact.email) window.location.href = `mailto:${contact.email}`;
  };

  return (
    <div
      className="glass-card rounded-xl p-5 transition-all duration-300 hover:-translate-y-1 animate-slide-up group"
      style={{ animationDelay: `${index * 60}ms`, animationFillMode: "backwards" }}
    >
      {/* Header row */}
      <div className="flex items-start gap-4 mb-4">
        {/* Avatar */}
        <div
          className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 font-bold text-sm"
          style={{
            fontFamily: "var(--font-display)",
            background: dept.bg,
            color: dept.color,
            border: `1.5px solid ${dept.color}30`,
            fontSize: "1rem",
            letterSpacing: "0.05em",
          }}
        >
          {initials}
        </div>

        {/* Name + role */}
        <div className="flex-1 min-w-0">
          <p
            className="text-emc-white font-semibold leading-tight truncate"
            style={{ fontFamily: "var(--font-display)", fontSize: "1.05rem", letterSpacing: "0.02em" }}
          >
            {contact.name}
          </p>
          <p className="text-emc-slate text-xs mt-0.5">{contact.role}</p>
        </div>

        {/* Priority badge */}
        <span
          className={`dept-chip ${pri.glow} flex-shrink-0`}
          style={{ color: pri.color, background: pri.bg, border: `1px solid ${pri.color}30` }}
        >
          {pri.label}
        </span>
      </div>

      {/* Department chip */}
      <div className="flex items-center gap-2 mb-3">
        <span
          className="dept-chip flex items-center gap-1.5"
          style={{ color: dept.color, background: dept.bg, border: `1px solid ${dept.color}25` }}
        >
          {dept.icon}
          {contact.department}
        </span>

        <span className="flex items-center gap-1 text-xs" style={{ color: avail.color }}>
          <Clock size={11} />
          {avail.label}
        </span>
      </div>

      {/* Phone number */}
      <p className="text-emc-light text-sm font-mono mb-1 tracking-wide">{contact.phone}</p>

      {/* Notes */}
      {contact.notes && (
        <p className="text-emc-slate text-xs leading-relaxed mb-4 line-clamp-2">
          {contact.notes}
        </p>
      )}

      {/* Divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-emc-teal/20 to-transparent mb-4" />

      {/* Action buttons */}
      <div className="flex items-center gap-2">
        {/* Call */}
        <button
          onClick={handleCall}
          className="action-btn flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-semibold"
          style={{
            fontFamily: "var(--font-display)",
            background: "rgba(0,212,170,0.12)",
            color: "#00D4AA",
            border: "1px solid rgba(0,212,170,0.25)",
            letterSpacing: "0.05em",
          }}
          title={`Call ${contact.name}`}
        >
          <Phone size={15} />
          CALL
        </button>

        {/* WhatsApp */}
        <button
          onClick={handleWhatsApp}
          className="action-btn flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-semibold"
          style={{
            fontFamily: "var(--font-display)",
            background: "rgba(37,211,102,0.12)",
            color: "#25D366",
            border: "1px solid rgba(37,211,102,0.25)",
            letterSpacing: "0.05em",
          }}
          title={`WhatsApp ${contact.name}`}
        >
          <MessageCircle size={15} />
          WHATSAPP
        </button>

        {/* Email (if available) */}
        {contact.email && (
          <button
            onClick={handleEmail}
            className="action-btn w-10 h-9 flex items-center justify-center rounded-lg"
            style={{
              background: "rgba(136,146,176,0.1)",
              color: "#8892B0",
              border: "1px solid rgba(136,146,176,0.2)",
            }}
            title={`Email ${contact.name}`}
          >
            <Mail size={15} />
          </button>
        )}

        {/* Delete */}
        <button
          onClick={() => onDelete(contact.id)}
          className="action-btn w-10 h-9 flex items-center justify-center rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
          style={{
            background: "rgba(239,68,68,0.1)",
            color: "#EF4444",
            border: "1px solid rgba(239,68,68,0.2)",
          }}
          title="Delete contact"
        >
          <Trash2 size={15} />
        </button>
      </div>
    </div>
  );
}
