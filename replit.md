# Patrick Kozlow Portfolio Website - Replit Setup

## Overview
Modern, single-page portfolio website for Patrick Kozlow, showcasing professional experience, skills, projects, and publications. Features a contemporary design inspired by modern portfolio standards with dark theme, responsive layout, and smooth interactions.

## Project Type
- **Type**: Static HTML/CSS/JavaScript website (Modernized)
- **Design Style**: Modern single-page application with dark theme
- **Server**: Python HTTP server (port 5000)

## Architecture
- **Frontend**: Static HTML, Modern CSS, Vanilla JavaScript
- **Design Pattern**: Single-page with right-side navigation
- **Features**: 
  - Right-side vertical navigation with numbered sections
  - Tabbed work experience interface
  - Smooth scrolling and animations
  - Fully responsive (desktop/tablet/mobile)
  - Intersection Observer for scroll animations
- **Assets**: FontAwesome icons, custom modern styling
- **Special Pages**: 
  - Main portfolio: `index.html` (modernized design)
  - IoT project demo: `IoTStream.html` (built React app)

## Current State (November 16, 2025)
- ✅ Project imported from GitHub
- ✅ Python HTTP server configured on port 5000
- ✅ Workflow configured for static file serving
- ✅ Cache-Control headers added to prevent iframe caching issues
- ✅ Website completely refactored with modern design
- ✅ Responsive layout for desktop/mobile/tablet
- ✅ Tabbed work experience interface
- ✅ Smooth scrolling and animations implemented

## Project Structure
```
/
├── index.html              # Main portfolio page (modernized)
├── IoTStream.html         # IoT streaming project demo
├── server.py              # Python HTTP server with no-cache headers
├── assets/                # CSS, JavaScript, fonts
│   ├── css/
│   │   ├── modern.css     # Modern design stylesheet
│   │   ├── main.css       # Legacy template CSS (kept for reference)
│   │   └── fontawesome-all.min.css
│   ├── js/
│   │   ├── modern.js      # Modern navigation, tabs, and animations
│   │   ├── main.js        # Legacy template JS (kept for reference)
│   │   └── util.js
│   └── webfonts/          # Font Awesome icons
├── images/                # Portfolio images and screenshots
└── html5up-miniport/      # Original template reference
```

## Recent Changes
- **2025-11-16 (Evening)**: Complete website modernization
  - Refactored HTML with single-page design and right-side navigation
  - Created modern CSS with dark theme and responsive breakpoints
  - Implemented JavaScript for tab functionality, smooth scrolling, and animations
  - Added tabbed interface for work experience section
  - Optimized for mobile, tablet, and desktop with media queries
  - Preserved all original content while modernizing presentation
  - Fixed duplicate section numbering issue

- **2025-11-16 (Morning)**: Initial Replit setup
  - Created Python HTTP server with Cache-Control headers
  - Configured workflow for port 5000
  - Updated .gitignore for Python files

## Development Notes
- Server binds to 0.0.0.0:5000 (required for Replit proxy)
- Cache-Control headers prevent iframe caching issues
- All static files served from project root
- No build process required (pure static site)
- CSS uses custom properties (CSS variables) for theming
- JavaScript uses Intersection Observer API for scroll animations
- Responsive breakpoints: 1080px, 768px, 480px

## Design Features
- **Color Scheme**: Dark navy (#0a192f) background with green (#64ffda) accents
- **Typography**: Inter font family for body, SF Mono for code/numbers
- **Navigation**: Right-side vertical navigation (switches to horizontal on mobile)
- **Work Experience**: Tabbed interface with smooth transitions
- **Projects**: Featured project cards with hover effects
- **Animations**: Fade-in on scroll, smooth transitions throughout
- **Accessibility**: Semantic HTML, proper ARIA labels, keyboard navigation support

## User Preferences
- Prefers modern, polished design with clean aesthetics
- Wants mobile-responsive layouts that adapt to all screen sizes
- Values left-aligned text and professional typography
- Likes dark themes with accent colors
