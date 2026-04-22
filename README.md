# UniNest - Student Accommodation Matching Platform

A clean, scalable static website for connecting students with ideal accommodation and compatible roommates.

## 📁 Project Structure

```
UniNest/
├── index.html              # Landing/Home page
├── pages/                  # All page templates
│   ├── login.html         # User login page
│   ├── signup.html        # User registration page
│   ├── dashboard.html     # User dashboard (post-login)
│   ├── listings.html      # Browse accommodations
│   └── profile.html       # User profile/settings page
├── css/                    # Stylesheets
│   ├── style.css          # Main styles
│   └── responsive.css     # Mobile-responsive styles
├── js/                     # JavaScript modules
│   ├── script.js          # Main utility functions
│   └── auth.js            # Authentication logic
├── assets/                 # Static resources
│   └── images/            # Place images here
└── README.md              # This file
```

## 🎯 File & Folder Purposes

### Pages (`pages/`)
- **login.html** - User login with email/password
- **signup.html** - New account registration for students and landlords
- **dashboard.html** - User dashboard showing saved listings, messages, and quick actions
- **listings.html** - Browse and filter available accommodations
- **profile.html** - Edit personal info, preferences, and account settings

### Stylesheets (`css/`)
- **style.css** - All main styles including layouts, components, colors, typography
  - Uses CSS variables for easy theme customization
  - Organized with clear sections: buttons, forms, navigation, etc.
  - ~800 lines of well-documented CSS
- **responsive.css** - Mobile-first responsive design
  - Tablet breakpoints (≤768px)
  - Mobile breakpoints (≤480px)
  - Large screen improvements (≥1200px)
  - Accessibility features (reduced motion, dark mode)

### JavaScript (`js/`)
- **script.js** - Main utility module
  - DOM initialization and event listeners
  - Notification system
  - User session management
  - Listing/search functionality
  - Utility functions (validation, formatting, etc.)
- **auth.js** - Authentication module
  - Login form handling
  - Signup form handling
  - Session management with localStorage
  - Token generation and validation

### Assets (`assets/images/`)
- Store all images here (logos, accommodation photos, user avatars, etc.)
- Currently using placeholder images

## 🚀 Getting Started

1. **Open the project:**
   ```bash
   # Open index.html in your browser
   start index.html
   ```

2. **Test the flow:**
   - Home page → Browse listings → Sign up → Dashboard
   - Login credentials are simulated (any email + password combos work for demo)

3. **Development:**
   - All HTML files are static and can be edited directly
   - Modify colors in `css/style.css` (CSS variables at top)
   - Add new pages following the same structure

## 🎨 Customization

### Change Color Scheme
Edit the CSS variables in `css/style.css`:
```css
:root {
    --primary-color: #3b82f6;      /* Blue */
    --secondary-color: #10b981;    /* Green */
    --danger-color: #ef4444;       /* Red */
    /* ... more colors ... */
}
```

### Add New Pages
1. Create file in `pages/` folder: `pages/new-page.html`
2. Copy structure from existing page
3. Update navigation links in navbar
4. Add corresponding CSS in `style.css` if needed

### Add Images
1. Place image files in `assets/images/`
2. Reference in HTML: `<img src="../assets/images/filename.jpg">`

## 💾 Data Storage

Currently uses **localStorage** for demo purposes:
- User session data
- Authentication tokens
- Saved listings and preferences

**For production**, integrate with a backend:
- Replace localStorage calls with API requests
- Set up user authentication (JWT tokens, etc.)
- Connect to database for listings, messages, profiles

## 🔒 Security Notes

**Current limitations (demo):**
- Passwords stored in localStorage (NOT secure)
- No backend validation
- No actual authentication

**For production:**
1. Set up backend API (Node.js, Python, etc.)
2. Implement proper JWT authentication
3. Hash passwords on backend
4. Add HTTPS
5. Validate all inputs server-side
6. Implement rate limiting

## 🌍 Browser Support

- Chrome, Firefox, Safari, Edge (latest versions)
- Mobile browsers (iOS Safari, Chrome Mobile)
- Responsive design for all screen sizes

## 📱 Responsive Breakpoints

- **Desktop:** 1200px+
- **Tablet:** 768px - 1199px
- **Mobile:** 480px - 767px
- **Small Mobile:** < 480px

## 🎯 Future Enhancements

1. **Backend Integration**
   - Node.js/Express server
   - Database (MongoDB, PostgreSQL)
   - User authentication system

2. **Features**
   - Real-time messaging/chat
   - Video tours of properties
   - Ratings and reviews
   - Roommate matching algorithm
   - Payment integration

3. **Admin Panel**
   - Manage listings
   - User moderation
   - Analytics dashboard

4. **Mobile App**
   - React Native or Flutter
   - Push notifications
   - Offline mode

## 📄 License

This project is open-source and available for educational purposes.

## 👥 Team

Created for UniNest Project - Student Accommodation Matching Platform

---

**Happy coding!** 🚀
