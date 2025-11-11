# ClubHub - Quick Navigation Reference

## 🏠 Main Pages

| Page | URL | Purpose | Auth Required |
|------|-----|---------|---------------|
| **Homepage** | `/index.html` | Main dashboard with events, clubs, news | ❌ No |
| **Login** | `/login.html` | User sign-in | ❌ No |
| **Register** | `/register.html` | User sign-up | ❌ No |
| **Profile** | `/profile.html` | User profile & dashboard | ✅ Yes |
| **Admin** | `/admin.html` | Admin management panel | ✅ Yes (Admin) |
| **Gallery** | `/gallery_new.html` | Community photo gallery | ❌ No |
| **Tech Titans** | `/tech-titans.html` | Tech club page | ❌ No |

---

## 🔗 Header Navigation Links (Available on all pages)

```
ClubHub Logo → index.html
├── Home → index.html#home
├── Events → index.html#events
├── Clubs → index.html#clubs
├── Gallery → gallery_new.html
├── Winners → index.html#leaderboard
└── Profile Icon (if logged in) → profile.html
```

---

## 📱 Mobile Menu Links

Same as header navigation, but collapsed on screens < 768px

---

## 🔑 Authentication Flow

### New User Journey:
```
index.html (Login button) 
→ login.html (No account yet?) 
→ register.html (Create account) 
→ login.html (Enter credentials) 
→ index.html ✅
```

### Returning User Journey:
```
index.html (Login button) 
→ login.html (Enter email/password) 
→ index.html ✅
→ profile.html (Profile icon in header)
```

---

## 🎟️ Event Registration Flow

```
index.html / tech-titans.html (View Event)
→ Click "Register Now"
→ Check: User logged in?
   ├─ If NO: Redirect to login.html
   └─ If YES: Show confirmation modal
→ Confirm registration
→ Success modal with PDF token
→ profile.html > My Activity > Registered Events ✅
```

---

## 💬 Feedback & Suggestions Flow

```
tech-titans.html (Give Feedback button)
→ Check: User logged in?
   ├─ If NO: Alert to login
   └─ If YES: Open feedback modal
→ Choose: Post-Event Feedback OR Future Suggestions
→ Fill form & submit
→ Stored in Firebase
→ admin.html (Admin reviews)
→ Admin replies
→ profile.html (User sees reply) ✅
```

---

## 👤 User Profile Features

Accessible at: `/profile.html` (requires login)

### Sections:
1. **Profile Header** - Avatar, name, email, bio
2. **My Activity Dashboard** 
   - Registered Events
   - My Clubs
   - Event History (attended)
3. **Achievements & Skills**
   - Digital Badges
   - Acquired Skills
4. **My Projects Showcase**
5. **Participation Stats**
   - Events Attended
   - Workshops Completed
   - Seminars Attended
6. **My Contributions**
   - Feedback History
   - Suggestions Log
7. **My Calendar** - Events calendar with highlights
8. **Settings** - Edit profile, toggle notifications

---

## ⚙️ Admin Panel Features

Accessible at: `/admin.html` (Admin login required)

### Sidebar Menu:
1. **EVENTS** - Create/Edit/Delete events
2. **REGISTRATIONS** - View registrations, mark attendance
3. **NEWS & UPDATES** - Post news
4. **MEDIA GALLERY** - Upload/delete gallery images
5. **SUGGESTION** - View & reply to suggestions
6. **FEEDBACK** - View & reply to feedback
7. **WINNERS** - Announce event winners

---

## 🎨 Club Pages

### Tech Titans (Full Page):
- URL: `/tech-titans.html`
- Sections:
  - About & Key Achievements
  - Events (Upcoming/Ongoing/Past)
  - Projects Showcase
  - Council Members
  - Member Testimonials
  - Photo Gallery
  - Feedback & Suggestions Form

### Other Clubs:
- Link to: `index.html#clubs`
- Will be expanded with individual pages in future

---

## 📸 Gallery

### New Gallery (Primary):
- URL: `/gallery_new.html`
- Features:
  - Upload photos with captions
  - Browse community gallery
  - Firebase-backed storage
  - Admin can delete images

### Old Gallery (Backup):
- URL: `/gallery.html`
- Static gallery view
- Links to new gallery for full experience

---

## 🔗 Footer Navigation (Available on all pages)

```
ClubHub
├── About
├── Navigation Links
│  ├─ Home
│  ├─ Events
│  ├─ Clubs
│  ├─ Gallery
│  └─ Winners
├── Resources
│  ├─ Tech Titans Club
│  ├─ Event Guidelines
│  └─ Admin Portal
└── Social Links
   ├─ Twitter
   ├─ Instagram
   └─ LinkedIn
```

---

## 🔐 Security & Redirects

- **Unauthenticated Access**: 
  - Trying to access `/profile.html` without login → Redirected to `/login.html`
  - Trying to access `/admin.html` without login → Redirected to `/login.html`

- **Authentication State**:
  - After login: User info stored in Firebase Auth
  - Profile icon appears in header with user's name
  - Dropdown menu with Profile & Logout options

- **Logout**:
  - Signs out from Firebase Auth
  - Returns to homepage in guest mode

---

## 📊 Data Integration

All pages sync with **Firebase Firestore**:

- **Authenticate**: Firebase Auth
- **Store Data**: Firestore collections
- **Upload Files**: Firebase Storage (Gallery)
- **Real-time Updates**: Firestore listeners

### Collections:
- `events` - All events
- `registrations` - User registrations
- `news` - News updates
- `gallery` - Photos
- `feedback` - Post-event feedback
- `suggestions` - Pre-event suggestions
- `winners` - Winners announcements

---

## 🎯 Direct Link Reference

### By Section:
| Section | Link |
|---------|------|
| Homepage | `index.html` |
| Events List | `index.html#events` |
| Clubs | `index.html#clubs` |
| Winners | `index.html#leaderboard` |
| Gallery | `gallery_new.html` |
| Tech Titans | `tech-titans.html` |
| Profile | `profile.html` |
| Admin | `admin.html` |

### By Page Links:
| Page | Internal Links |
|------|----------------|
| index.html | `#home`, `#events`, `#clubs`, `#leaderboard` |
| tech-titans.html | `#about`, `#events`, `#projects`, `#council`, `#gallery`, `#feedback` |
| profile.html | `#activity`, `#achievements`, `#projects`, `#stats`, `#contributions` |

---

## 🚀 User Journey Examples

### Example 1: New User Registering for Event
```
1. Visit index.html (homepage)
2. Browse events in #events section
3. Click "Register Now"
4. Redirected to login.html (not logged in)
5. Click "Create Account" → register.html
6. Sign up with email/password
7. Redirected to login.html
8. Login with credentials
9. Redirected to index.html
10. Event registration confirmed
11. Visit profile.html to see registered event ✅
```

### Example 2: Club Member Giving Feedback
```
1. Visit tech-titans.html
2. Attend an event
3. Click "Give Feedback"
4. Submit post-event feedback form
5. Feedback stored in Firebase
6. Check admin.html (if admin)
7. Admin replies to feedback
8. Visit profile.html > My Contributions to see reply ✅
```

### Example 3: Admin Managing Events
```
1. Visit admin.html (admin login required)
2. Click "EVENTS" in sidebar
3. Create new event or edit existing
4. Publish event
5. Event appears on index.html and tech-titans.html ✅
6. Users can register for the event
7. Admin checks registrations in "REGISTRATIONS" tab
```

---

## ❓ Troubleshooting

| Issue | Solution |
|-------|----------|
| Can't access profile.html | Login first at login.html |
| Can't access admin.html | Ensure you have admin role in Firebase Auth |
| Events not showing | Check Firebase Firestore collections populated |
| Gallery not loading | Verify Firebase Storage permissions |
| Links returning 404 | Check file names match exactly (case-sensitive) |
| Mobile menu not working | Check viewport meta tag and CSS media queries |

---

## 📝 Notes

- All links are relative paths (starting with `.html` or `/`)
- Use `#` for section links within the same page
- Use page name for links to different pages
- External links use `http://` or `https://`
- Mobile responsive design adapts all navigation

---

**Last Updated**: November 2025  
**Maintained By**: ClubHub Development Team
