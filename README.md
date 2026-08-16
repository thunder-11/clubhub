<div align="center">

<br/>

# 🎓 ClubHub
### *Personal Campus Event Prototype*

<br/>

**Explore. Learn. Prototype.**

A personal, responsive prototype for exploring campus event discovery, registrations, and basic club management features.

<br/>

[![Live Demo](https://img.shields.io/badge/🚀_Live_Demo-Visit_ClubHub-4f46e5?style=for-the-badge)](https://thunder-11.github.io/clubhub/)

<br/>

---

</div>

---

## 🚀 Getting Started

These steps will help you run ClubHub locally for development and testing.

### Prerequisites
- Modern browser (Chrome, Edge, Firefox)
- A simple static server (e.g., `live-server`, `http-server`) or VS Code Live Server

### Run locally
1. Clone or copy repository files to your local machine.
2. Open the project folder in VS Code.
3. Start a static server from the project root, for example:

```bash
npm install -g live-server
live-server .
```

4. Visit `http://127.0.0.1:8080` (or the URL shown by your server) and explore the site.

## ⚙️ Development Notes
- Main script: `main.js` — initializes UI and Firebase hooks.
- Pages are static HTML templates that read/write via Firebase Realtime Database.
- Styles: global tokens in `styles.css`, auth-specific styles in `login.css` and `register.css`.
 


## 📌 Overview

**ClubHub** is a dedicated campus event hub designed to bring students and campus organizations closer together. From discovering workshops and technical seminars to registering seamlessly in one click, ClubHub serves as a centralized platform for college community engagement.

<br/>

## 🖥️ Platform Showcase

| View | Purpose & Experience |
|------|----------------------|
| 🏠 **Home** | Dynamic hero section, curated upcoming events spotlight, interactive photo gallery, and campus achievements |
| 📅 **Event Feed** | Dedicated event listings with category-specific badges (Seminars, Workshops, Competitions) |
| 🔍 **Event Detail Page** | Deep-dive view featuring schedule, venue details, live participant count, fees, and instant registration |
| 👤 **User Profile** | Personalized dashboard displaying user information and registered event history |
| 🔐 **Authentication** | Secure sign-in & registration with input validation and instant feedback modals |
| 🛡️ **Club Admin Dashboard** | Management suite for authorized club leads to publish events, track attendee counts, and coordinate schedules |

<br/>

## ✨ Key Features

### 👨‍🎓 For Students
- **Smart Event Discovery** — Browse campus events categorized by type with clean tags and schedule details.
- **Instant Registration** — Fast, one-click sign-up for active events with automatic credential binding.
- **Duplicate Protection** — Prevents duplicate registrations per user account.
- **Visual Highlights** — High-resolution event snapshots and photo galleries.

### 🛡️ For Club Leaders & Admins
- **Event Creation Suite** — Publish events with custom titles, descriptions, dates, venues, categories, and ticketing details.
- **Live Attendance Counter** — Real-time registration tracking synced directly with the database.
- **Role-Based Access** — Admin features accessible only to authorized club representatives.

<br/>

## 🛠️ Architecture & Technologies

- **Frontend:** HTML5, Modern JavaScript (ES6+), Vanilla CSS
- **Design System:** Tailwind CSS, Glassmorphism elements, custom micro-interactions
- **Icons & Visuals:** Lucide Icons, Font Awesome 6
- **Backend & Realtime Engine:** Firebase Realtime Database
- **Identity & Security:** Firebase Authentication

<br/>

## 📁 System Structure

```
clubhub/
│
├── 📄 index.html          # Main landing & showcase page
├── 📄 events.html         # Full campus events directory
├── 📄 eventdetails.html   # Dedicated event page & registration modal
├── 📄 login.html          # User sign-in interface
├── 📄 register.html       # Account creation interface
├── 📄 profile.html        # Student dashboard & event history
├── 📄 admin.html          # Club administrator management portal
│
├── 🎨 styles.css          # Core design system & theme tokens
├── 🎨 login.css           # Authentication UI styles
├── 🎨 register.css        # Registration page styling
│
├── ⚙️  main.js            # Application controller & Firebase integration
│
└── 📁 src/                # Curated campus media & assets
```

<br/>

## 📦 Deployment
- GitHub Pages: Push the repository to a GitHub repo and enable Pages from the `main` branch (or `gh-pages` branch if using a deployment workflow).
- Static hosts: Netlify and Vercel also work; connect your repo and set `public` to the project root.

## ⚠️ Notes
This is a personal project and a learning prototype. It's not packaged or supported as a product for others to use.

## 👋 Contact
For questions or local help, open an issue in the repository or contact the project owner listed in repo metadata.


---

<div align="center">

Personal prototype built for learning and experimentation

</div>
