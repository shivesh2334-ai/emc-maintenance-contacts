"use client";

import { useState, useEffect, useMemo } from "react";
import { Contact, Department } from "@/lib/types";
import { defaultContacts } from "@/lib/defaultContacts";
import ContactCard from "@/components/ContactCard";
import AddContactModal from "@/components/AddContactModal";
import DeleteConfirmModal from "@/components/DeleteConfirmModal";
import {
  Search, UserPlus, Users, Shield, Zap, Activity,
  Wifi, Wrench, Flame, Building2, Sparkles, Settings,
  ChevronDown, X
} from "lucide-react";

const STORAGE_KEY = "emc_maintenance_contacts_v1";

const DEPT_ICONS: Record<string, React.ReactNode> = {
  "All":               <Users size={13} />,
  "Electrical":        <Zap size={13} />,
  "Plumbing":          <Wrench size={13} />,
  "HVAC":              <Sparkles size={13} />,
  "IT & Network":      <Wifi size={13} />,
  "Security":          <Shield size={13} />,
  "Housekeeping":      <Sparkles size={13} />,
  "Biomedical":        <Activity size={13} />,
  "Civil & Structural":<Building2 size={13} />,
  "Fire Safety":       <Flame size={13} />,
  "General Maintenance":<Settings size={13} />,
};

type SortKey = "name" | "department" | "priority" | "recent";

const PRIORITY_ORDER = { Critical: 0, High: 1, Normal: 2 };

export default function HomePage() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [showAdd, setShowAdd] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<Contact | null>(null);
  const [search, setSearch] = useState("");
  const [filterDept, setFilterDept] = useState<string>("All");
  const [filterPriority, setFilterPriority] = useState<string>("All");
  const [sortBy, setSortBy] = useState<SortKey>("priority");

  // Load from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      setContacts(stored ? JSON.parse(stored) : defaultContacts);
    } catch {
      setContacts(defaultContacts);
    }
    setLoaded(true);
  }, []);

  // Persist
  useEffect(() => {
    if (loaded) localStorage.setItem(STORAGE_KEY, JSON.stringify(contacts));
  }, [contacts, loaded]);

  const handleAdd = (contact: Contact) => {
    setContacts((prev) => [contact, ...prev]);
  };

  const handleDeleteRequest = (id: string) => {
    const c = contacts.find((c) => c.id === id);
    if (c) setDeleteTarget(c);
  };

  const handleDeleteConfirm = () => {
    if (deleteTarget) {
      setContacts((prev) => prev.filter((c) => c.id !== deleteTarget.id));
      setDeleteTarget(null);
    }
  };

  // All unique departments present
  const depts = useMemo(() => {
    const set = new Set(contacts.map((c) => c.department));
    return ["All", ...Array.from(set).sort()];
  }, [contacts]);

  // Filtered + sorted
  const filtered = useMemo(() => {
    let list = contacts;
    if (filterDept !== "All") list = list.filter((c) => c.department === filterDept);
    if (filterPriority !== "All") list = list.filter((c) => c.priority === filterPriority);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.department.toLowerCase().includes(q) ||
          c.role.toLowerCase().includes(q) ||
          c.phone.includes(q) ||
          (c.notes?.toLowerCase().includes(q))
      );
    }
    return [...list].sort((a, b) => {
      if (sortBy === "name")       return a.name.localeCompare(b.name);
      if (sortBy === "department") return a.department.localeCompare(b.department);
      if (sortBy === "priority")   return PRIORITY_ORDER[a.priority] - PRIORITY_ORDER[b.priority];
      if (sortBy === "recent")     return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      return 0;
    });
  }, [contacts, filterDept, filterPriority, search, sortBy]);

  // Stats
  const stats = useMemo(() => ({
    total: contacts.length,
    critical: contacts.filter((c) => c.priority === "Critical").length,
    available247: contacts.filter((c) => c.availability === "24/7").length,
    depts: new Set(contacts.map((c) => c.department)).size,
  }), [contacts]);

  return (
    <div className="relative z-10 min-h-screen">
      {/* ─── HEADER ─── */}
      <header className="border-b border-emc-teal/10 sticky top-0 z-40"
        style={{ background: "rgba(10,22,40,0.92)", backdropFilter: "blur(16px)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between gap-4">
          {/* Logo + title */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <div className="relative w-9 h-9">
              <div className="w-9 h-9 rounded-lg flex items-center justify-center"
                style={{ background: "linear-gradient(135deg,#00D4AA,#00B894)", boxShadow: "0 0 16px rgba(0,212,170,0.4)" }}>
                <Activity size={20} className="text-emc-navy" />
              </div>
              <div className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emc-teal border-2 border-emc-navy animate-pulse" />
            </div>
            <div>
              <p className="text-emc-teal text-xs font-semibold tracking-widest uppercase"
                style={{ fontFamily: "var(--font-display)" }}>
                EMC Digitals
              </p>
              <h1 className="text-emc-white font-bold leading-none"
                style={{ fontFamily: "var(--font-display)", fontSize: "1.05rem", letterSpacing: "0.05em" }}>
                MAINTENANCE CONTACTS
              </h1>
            </div>
          </div>

          {/* Add button */}
          <button
            onClick={() => setShowAdd(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all hover:opacity-90 active:scale-95 flex-shrink-0"
            style={{
              fontFamily: "var(--font-display)",
              letterSpacing: "0.06em",
              background: "linear-gradient(135deg, #00D4AA, #00B894)",
              color: "#0A1628",
              boxShadow: "0 4px 16px rgba(0,212,170,0.35)",
            }}
          >
            <UserPlus size={16} />
            <span className="hidden sm:inline">ADD CONTACT</span>
            <span className="sm:hidden">ADD</span>
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        {/* ─── STATS ROW ─── */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6 animate-fade-in">
          {[
            { label: "Total Contacts", value: stats.total, color: "#00D4AA" },
            { label: "Critical Contacts", value: stats.critical, color: "#EF4444" },
            { label: "24/7 Available", value: stats.available247, color: "#FFB703" },
            { label: "Departments", value: stats.depts, color: "#00E5FF" },
          ].map((s) => (
            <div key={s.label} className="glass-card rounded-xl p-4">
              <p className="text-3xl font-bold" style={{ fontFamily: "var(--font-display)", color: s.color }}>
                {s.value}
              </p>
              <p className="text-emc-slate text-xs mt-0.5 uppercase tracking-wider">{s.label}</p>
            </div>
          ))}
        </div>

        {/* ─── SEARCH + FILTERS ─── */}
        <div className="space-y-3 mb-6">
          {/* Search bar */}
          <div className="relative">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-emc-slate" />
            <input
              className="emc-input w-full rounded-xl pl-11 pr-10 py-3 text-sm"
              placeholder="Search by name, department, role, phone..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            {search && (
              <button onClick={() => setSearch("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-emc-slate hover:text-emc-white">
                <X size={15} />
              </button>
            )}
          </div>

          {/* Filter + sort row */}
          <div className="flex flex-wrap gap-2 items-center">
            {/* Department filter */}
            <div className="relative">
              <select
                className="emc-input rounded-lg pl-3 pr-8 py-2 text-xs font-semibold appearance-none cursor-pointer"
                style={{ fontFamily: "var(--font-display)", letterSpacing: "0.04em" }}
                value={filterDept}
                onChange={(e) => setFilterDept(e.target.value)}
              >
                {depts.map((d) => <option key={d}>{d}</option>)}
              </select>
              <ChevronDown size={12} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-emc-teal pointer-events-none" />
            </div>

            {/* Priority filter */}
            <div className="relative">
              <select
                className="emc-input rounded-lg pl-3 pr-8 py-2 text-xs font-semibold appearance-none cursor-pointer"
                style={{ fontFamily: "var(--font-display)", letterSpacing: "0.04em" }}
                value={filterPriority}
                onChange={(e) => setFilterPriority(e.target.value)}
              >
                {["All", "Critical", "High", "Normal"].map((p) => <option key={p}>{p}</option>)}
              </select>
              <ChevronDown size={12} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-emc-teal pointer-events-none" />
            </div>

            {/* Sort */}
            <div className="relative">
              <select
                className="emc-input rounded-lg pl-3 pr-8 py-2 text-xs font-semibold appearance-none cursor-pointer"
                style={{ fontFamily: "var(--font-display)", letterSpacing: "0.04em" }}
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortKey)}
              >
                <option value="priority">Sort: Priority</option>
                <option value="name">Sort: Name</option>
                <option value="department">Sort: Department</option>
                <option value="recent">Sort: Recent</option>
              </select>
              <ChevronDown size={12} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-emc-teal pointer-events-none" />
            </div>

            {/* Result count */}
            <span className="ml-auto text-emc-slate text-xs">
              {filtered.length} contact{filtered.length !== 1 ? "s" : ""}
            </span>
          </div>

          {/* Dept quick-filter chips */}
          <div className="flex gap-2 flex-wrap">
            {depts.map((d) => (
              <button
                key={d}
                onClick={() => setFilterDept(d)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all"
                style={{
                  fontFamily: "var(--font-display)",
                  letterSpacing: "0.04em",
                  background: filterDept === d ? "rgba(0,212,170,0.2)" : "rgba(13,31,60,0.7)",
                  color: filterDept === d ? "#00D4AA" : "#8892B0",
                  border: `1px solid ${filterDept === d ? "rgba(0,212,170,0.4)" : "rgba(136,146,176,0.15)"}`,
                }}
              >
                {DEPT_ICONS[d]}
                <span className="hidden sm:inline">{d}</span>
                <span className="sm:hidden">{d === "All" ? "All" : d.split(" ")[0]}</span>
              </button>
            ))}
          </div>
        </div>

        {/* ─── CONTACT GRID ─── */}
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center animate-fade-in">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4"
              style={{ background: "rgba(136,146,176,0.08)", color: "#8892B0" }}>
              <Users size={32} />
            </div>
            <p className="text-emc-white font-semibold text-lg mb-1"
              style={{ fontFamily: "var(--font-display)" }}>
              No contacts found
            </p>
            <p className="text-emc-slate text-sm mb-6">
              {search ? `No results for "${search}"` : "Add your first maintenance contact."}
            </p>
            <button onClick={() => { setSearch(""); setFilterDept("All"); setFilterPriority("All"); }}
              className="text-emc-teal text-sm underline-offset-4 hover:underline">
              Clear filters
            </button>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filtered.map((contact, i) => (
              <ContactCard
                key={contact.id}
                contact={contact}
                onDelete={handleDeleteRequest}
                index={i}
              />
            ))}
          </div>
        )}
      </main>

      {/* ─── FOOTER ─── */}
      <footer className="text-center py-8 border-t border-emc-teal/08 mt-12">
        <p className="text-emc-slate text-xs" style={{ fontFamily: "var(--font-display)", letterSpacing: "0.08em" }}>
          EMC DIGITALS · EMCDIGICARE ·{" "}
          <a href="https://emcdigital.com" target="_blank" rel="noreferrer"
            className="text-emc-teal hover:underline">emcdigital.com</a>
        </p>
        <p className="text-emc-slate/40 text-xs mt-1">
          Maintenance Department Contact Directory v1.0
        </p>
      </footer>

      {/* ─── MODALS ─── */}
      {showAdd && <AddContactModal onClose={() => setShowAdd(false)} onAdd={handleAdd} />}
      {deleteTarget && (
        <DeleteConfirmModal
          contactName={deleteTarget.name}
          onConfirm={handleDeleteConfirm}
          onCancel={() => setDeleteTarget(null)}
        />
      )}
    </div>
  );
}
