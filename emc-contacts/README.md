# EMC Maintenance Contacts
### EMC Digitals · Maintenance Department Personnel Directory

A production-ready contact management application for EMC Digicare's maintenance department personnel.

---

## Features

- **Add / Delete Contacts** — Full form with validation; confirmation modal before deletion
- **One-tap Call** — `tel:` link opens phone dialer directly
- **One-tap WhatsApp** — Opens WhatsApp chat via `wa.me` deep link
- **Email** — `mailto:` link for contacts with email
- **Search** — Live search across name, department, role, phone, notes
- **Filter** — By department and priority level
- **Sort** — By priority, name, department, or recently added
- **Department Chips** — Quick one-click department filter
- **Stats Dashboard** — Total contacts, critical contacts, 24/7 availability count, department count
- **Persistent Storage** — Contacts stored in browser `localStorage`
- **Seed Data** — 8 pre-loaded sample EMC maintenance personnel

## Departments Supported

| Department | Icon |
|---|---|
| Electrical | ⚡ |
| Plumbing | 🔧 |
| HVAC | ✨ |
| IT & Network | 📶 |
| Security | 🛡 |
| Housekeeping | ✨ |
| Biomedical | 📈 |
| Civil & Structural | 🏢 |
| Fire Safety | 🔥 |
| General Maintenance | ⚙️ |

## Tech Stack

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Lucide React** icons
- **localStorage** for data persistence
- Deployed on **Vercel** (Mumbai region `bom1`)

---

## Local Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Deploy to Vercel

```bash
npm i -g vercel
vercel
```

Or connect the GitHub repository to Vercel for automatic deployments.

---

**EMC Digitals** · [emcdigital.com](https://emcdigital.com)
