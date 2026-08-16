<div align="center">

<br/>

# 🎓 ClubHub
### *Your Campus Event Central*

<br/>

**Discover. Engage. Excel.**

A modern, full-featured campus event management platform built for students and club admins — powered by Firebase and crafted with care.

<br/>

[![Live Demo](https://img.shields.io/badge/🚀_Live_Demo-Visit_Site-4f46e5?style=for-the-badge)](https://thunder-11.github.io/clubhub/)
[![GitHub Stars](https://img.shields.io/github/stars/thunder-11/clubhub?style=for-the-badge&color=ec4899)](https://github.com/thunder-11/clubhub/stargazers)
[![Last Commit](https://img.shields.io/github/last-commit/thunder-11/clubhub?style=for-the-badge&color=0284c7)](https://github.com/thunder-11/clubhub/commits/main)

<br/>

---

</div>

## ✨ What is ClubHub?

ClubHub is a **campus event management web app** that bridges the gap between students and their college clubs. Whether you want to discover upcoming workshops, register for events, or manage your club's schedule — ClubHub has you covered.

> *"Connecting students, fostering talent, and creating memories."*

<br/>

## 🖥️ Pages & Features

| Page | Description |
|------|-------------|
| 🏠 **Home** (`index.html`) | Hero section, upcoming events preview, photo gallery, winners leaderboard |
| 📅 **Events** (`events.html`) | Full event listing with type filters (Seminar, Workshop, Event) |
| 🔍 **Event Details** (`eventdetails.html`) | Per-event deep-dive: date, time, fees, participants + registration modal |
| 👤 **Profile** (`profile.html`) | User dashboard with registered events history |
| 🔐 **Login** (`login.html`) | Firebase Auth sign-in with detailed error handling |
| 📝 **Register** (`register.html`) | Account creation with password confirmation validation |
| 🛡️ **Admin** (`admin.html`) | Club admin dashboard — create & manage events, view registrations |

<br/>

## 🚀 Core Features

### 👨‍🎓 For Students
- 🔎 **Browse Events** — View all upcoming campus events in a clean card layout
- 🏷️ **Filter by Type** — Seminars, Workshops, Events — color-coded for quick scanning
- 📋 **One-Click Registration** — Register for any event with your name & email (auto-filled when logged in)
- 🚫 **Duplicate Prevention** — Cannot accidentally register for the same event twice
- 📸 **Photo Gallery** — Relive highlights from past events

### 🛡️ For Club Admins
- ➕ **Create Events** — Title, description, date, time, type, club name — all in one modal
- 📊 **Live Participant Count** — Counter updates automatically on each new registration
- 🔒 **Role-Based Access** — Only authorized club members can access the admin panel

### ⚡ Technical Highlights
- 🔥 **Firebase Realtime Database** — Instant data sync across all users
- 🔐 **Firebase Authentication** — Secure email/password sign-in & sign-up
- 📱 **Responsive Design** — Works on mobile and desktop
- 🎨 **Tailwind CSS + Custom CSS** — Gradient text, card hover animations, polished modals

<br/>

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | HTML5, CSS3, JavaScript (ES6+) |
| **Styling** | Tailwind CSS + Custom CSS |
| **Icons** | Lucide Icons, Font Awesome 6 |
| **Auth** | Firebase Authentication (v9 Compat) |
| **Database** | Firebase Realtime Database (v9 Compat) |
| **Hosting** | GitHub Pages |

<br/>

## 📁 Project Structure

```
clubhub/
│
├── 📄 index.html          # Home page — hero, events preview, gallery
├── 📄 events.html         # Full events listing
├── 📄 eventdetails.html   # Single event detail + register modal
├── 📄 login.html          # Sign in page
├── 📄 register.html       # Sign up page
├── 📄 profile.html        # User profile & event history
├── 📄 admin.html          # Admin dashboard — create & manage events
│
├── 🎨 styles.css          # Global stylesheet
├── 🎨 login.css           # Auth page styles
├── 🎨 register.css        # Register page styles
│
├── ⚙️  main.js            # Core app logic — Firebase, auth, events, modals
│
└── 📁 src/                # Local photo assets
    └── photo1.jpg … photo10.jpg
```

<br/>

## ⚙️ Getting Started

### Prerequisites
- Any modern browser (Chrome, Firefox, Edge)
- [Node.js](https://nodejs.org/) for the local dev server

### Run Locally

```bash
# 1. Clone the repo
git clone https://github.com/thunder-11/clubhub.git
cd clubhub

# 2. Start a local server (required — Firebase blocks file:// requests)
npx serve .

# 3. Open in browser
#    http://localhost:3000
```

> ⚠️ **Do NOT open `.html` files directly** via `file://` — Firebase Auth and the Realtime Database will be blocked by the browser. Always use the local server URL.

<br/>

## 🔥 Firebase Configuration

This project uses the **Firebase Compat SDK v9.23.0** loaded via CDN (no bundler needed).

Replace the config in [`main.js`](main.js) with your own Firebase project credentials:

```js
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  databaseURL: "https://YOUR_PROJECT-default-rtdb.firebaseio.com",
  projectId: "YOUR_PROJECT",
  storageBucket: "YOUR_PROJECT.firebasestorage.app",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};
```

### Recommended Database Security Rules

Paste these in **Firebase Console → Realtime Database → Rules**:

```json
{
  "rules": {
    "events": {
      ".read": true,
      ".write": "auth != null"
    },
    "users": {
      ".read": "auth != null",
      ".write": "auth != null"
    },
    "registrations": {
      ".read": "auth != null",
      ".write": "auth != null"
    }
  }
}
```

### Granting Admin Access to a Club

Set the following node in your Firebase Realtime Database directly:

```
users/
  └── ali_gmail_com/          ← email with dots replaced by underscores
        └── access/
              └── CSI: true   ← club name the user can manage
```

<br/>

---

<div align="center">

Made with ❤️ for campus communities everywhere

</div>
