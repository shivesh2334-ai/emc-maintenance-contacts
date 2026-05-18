export type Department =
  | "Electrical"
  | "Plumbing"
  | "HVAC"
  | "IT & Network"
  | "Security"
  | "Housekeeping"
  | "Biomedical"
  | "Civil & Structural"
  | "General Maintenance"
  | "Fire Safety";

export type ContactRole =
  | "Head"
  | "Supervisor"
  | "Technician"
  | "Engineer"
  | "Officer"
  | "Coordinator"
  | "Assistant"
  | "Manager";

export interface Contact {
  id: string;
  name: string;
  role: ContactRole;
  department: Department;
  phone: string;
  whatsapp: string;
  email?: string;
  availability: "24/7" | "Business Hours" | "On-Call";
  priority: "Critical" | "High" | "Normal";
  notes?: string;
  createdAt: string;
}
