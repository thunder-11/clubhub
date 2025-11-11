# ClubHub Navigation Guide

## Complete Page Interconnection Map

### Main Pages & Navigation Flow

```
index.html (Homepage)
├── Login/Register
│   ├── login.html → register.html (Sign Up)
│   ├── register.html → login.html (Sign In)
│   └── Both → index.html (Back to Home)
├── Profile
│   └── profile.html (Accessible to logged-in users)
├── Gallery
│   ├── gallery.html (Old gallery - linked in footer)
│   └── gallery_new.html (New gallery - primary link)
├── Tech Titans Club
│   └── tech-titans.html (Dedicated club page)
└── Admin Portal
    └── admin.html (Admin management)
```

## Page-by-Page Navigation Structure

### 1. **index.html** (Homepage)
**Navigation Links:**
- Header:
  - Home → index.html#home
  - Events → index.html#events
  - Clubs → index.html#clubs
  - Gallery → gallery_new.html
  - Winners → index.html#leaderboard
- Footer:
  - Home → index.html#home
  - Events → index.html#events
  - Clubs → index.html#clubs
  - Gallery → gallery_new.html
  - Winners → index.html#leaderboard
  - Tech Titans Club → tech-titans.html
  - Event Guidelines → # (placeholder)
  - Admin Portal → admin.html

**Authentication:**
- Login button → login.html
- After login: Profile icon appears in header
- Profile link → profile.html

### 2. **login.html** (Sign In)
**Navigation Links:**
- Logo → index.html
- Create Account link → register.html
- Back to Home link → index.html
- On successful login → index.html

### 3. **register.html** (Sign Up)
**Navigation Links:**
- Logo → index.html
- Sign In link → login.html
- Back to Home link → index.html
- On successful registration → login.html (redirect with message)

### 4. **profile.html** (User Profile)
**Navigation Links:**
- Header:
  - Logo → index.html
  - Home → index.html#home
  - Clubs → index.html#clubs
  - Events → index.html#events
- Only accessible when logged in
- Shows user's:
  - Registered events
  - Club memberships
  - Participation statistics
  - Feedback history
  - Suggestions log
  - Personal calendar

### 5. **admin.html** (Admin Dashboard)
**Navigation Links:**
- Header (NEW):
  - Logo → index.html
  - Back to Home → index.html
  - My Profile → profile.html
- Sidebar:
  - Events Management
  - Registrations
  - News & Updates
  - Media Gallery
  - Suggestions
  - Feedback
  - Winners Management
- Footer links → index.html

**Admin Sections:**
- Manage Events (CRUD operations)
- View Event Registrations
- Post News Updates
- Upload Media to Gallery
- Respond to Suggestions
- Respond to Feedback
- Announce Winners

### 6. **gallery_new.html** (New Gallery)
**Navigation Links:**
- Header:
  - Logo (ClubHub) → index.html
  - Home → index.html#home
  - Clubs → index.html#clubs
  - Events → index.html#events
  - Gallery (active) → gallery_new.html
  - Profile → profile.html (if logged in)
- Upload photos section
- View community gallery

### 7. **gallery.html** (Old Gallery)
**Navigation Links:**
- Header:
  - Home → index.html#home
  - Events → index.html#events
  - Clubs → index.html#clubs
  - Gallery → gallery_new.html
  - Winners → index.html#leaderboard
  - Login → login.html
- Footer:
  - Back to Home → index.html
  - Upcoming Events → index.html#events
  - Find a Club → index.html#clubs
  - Clubs and Social Links

### 8. **tech-titans.html** (Tech Titans Club)
**Navigation Links:**
- Header:
  - Logo → index.html
  - About → index.html
  - Events → index.html#events
  - Projects → tech-titans.html#projects
  - Council → tech-titans.html#council
  - Gallery → gallery_new.html
  - Feedback → tech-titans.html#feedback
- Profile Icon → profile.html
- Footer:
  - Back to ClubHub → index.html
  - All Clubs → index.html#clubs
  - Gallery → gallery_new.html
- Club-Specific Sections:
  - Events (Upcoming/Ongoing/Past)
  - Projects Showcase
  - Council Members
  - Testimonials
  - Gallery
  - Feedback & Suggestions Modal

## Authentication Flow

```
Not Logged In:
├── Homepage (Guest Mode)
├── Login Button → login.html
└── Register Link → register.html

After Login:
├── Homepage (User Mode with Profile Icon)
├── Profile Icon → profile.html
├── User can register for events
├── User can submit feedback/suggestions
└── Logout → Return to guest mode
```

## Club Navigation

### Tech Titans Club (tech-titans.html)
- Full dedicated page with:
  - Club information
  - Events list
  - Project showcase
  - Council members
  - Testimonials
  - Photo gallery
  - Feedback form

### Other Clubs (Placeholder)
- Link to index.html#clubs for now
- Can be expanded with individual club pages later
- Clubs linked:
  - Creative Coders
  - Art & Design
  - E-Cell
  - Music Mavericks
  - Literary Society
  - Eco Warriors
  - Film Club
  - Debate Union
  - Sports Club

## Data Flow & Interactions

### Event Registration Flow
1. User views event on index.html or tech-titans.html
2. Clicks "Register Now"
3. Authentication check:
   - If not logged in → redirected to login.html
   - If logged in → confirmation modal appears
4. Confirm registration
5. Success modal with PDF token download
6. PDF shows registration token
7. Event appears in profile.html > My Activity > Registered Events

### Feedback & Suggestions Flow
1. User accesses feedback form on tech-titans.html
2. Authentication check:
   - If not logged in → alert to login
   - If logged in → feedback modal opens
3. Submit feedback/suggestion
4. Stored in Firebase for admin review
5. Admin reviews in admin.html > Feedback/Suggestions
6. Admin can reply
7. Reply visible in profile.html > My Contributions

### Admin Workflow
1. Admin logs in via login.html
2. Redirected to admin.html (or navigates directly)
3. Manages:
   - Create/Edit/Delete Events
   - View Registrations & Mark Attendance
   - Post News Updates
   - Upload Gallery Media
   - Respond to Feedback
   - Announce Winners
4. All changes sync to Firebase
5. Changes reflect across all user-facing pages

## Firebase Collections Used

- `events` - Event listings
- `registrations` - User event registrations
- `news` - News updates
- `gallery` - Gallery images
- `feedback` - Post-event feedback
- `suggestions` - Pre-event suggestions
- `winners` - Event winners announcement

## Responsive Design

All pages are responsive with:
- Mobile menu (hamburger) on screens < 768px
- Adaptive navigation
- Touch-friendly buttons and links
- Proper spacing on all screen sizes

## Key Features by Page

| Page | Purpose | Auth Required | Key Features |
|------|---------|---------------|--------------|
| index.html | Homepage | No | Events, Clubs, News, Leaderboard |
| login.html | User Sign-In | No | Email/Password Auth, Firebase |
| register.html | User Sign-Up | No | Account Creation, Firebase |
| profile.html | User Profile | Yes | Activity, Stats, Projects, Calendar |
| admin.html | Admin Dashboard | Yes (Admin) | Event CRUD, Registration Management |
| gallery_new.html | Community Gallery | Optional | Upload, View Photos |
| gallery.html | Static Gallery | No | View Past Events |
| tech-titans.html | Club Page | Optional | Club Info, Events, Feedback |

## Best Practices for Users

1. **New Users**: Register → Login → Explore Events → Join Activities
2. **Event Registration**: Browse → Register → Check Profile for Confirmation
3. **Feedback**: Attend Event → Submit Feedback → Check Admin Reply
4. **Club Participation**: View Club → Attend Events → Become Member
5. **Admin Tasks**: Manage Events → Review Feedback → Announce Winners

## Future Enhancements

- Create individual pages for other clubs (Creative Coders, Art & Design, etc.)
- Add event scheduling page
- Implement real-time notifications
- Add user dashboard with quick statistics
- Create leaderboard page with ranking system
- Add event reminders and calendar integration
