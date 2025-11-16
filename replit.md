# Patrick Kozlow Portfolio Website - Replit Setup

## Overview
Static portfolio website for Patrick Kozlow, showcasing professional experience, skills, projects, and publications. Originally hosted on AWS S3, now configured to run on Replit.

## Project Type
- **Type**: Static HTML/CSS/JavaScript website
- **Template**: HTML5 UP Miniport (CCA 3.0 License)
- **Server**: Python HTTP server (port 5000)

## Architecture
- **Frontend**: Static HTML, CSS (SASS), JavaScript
- **Assets**: FontAwesome icons, jQuery, custom JavaScript
- **Special Pages**: 
  - Main portfolio: `index.html`
  - IoT project demo: `IoTStream.html` (built React app)

## Current State (November 16, 2025)
- ✅ Project imported from GitHub
- ✅ Python HTTP server configured on port 5000
- ✅ Workflow configured for static file serving
- ✅ Cache-Control headers added to prevent iframe caching issues

## Project Structure
```
/
├── index.html              # Main portfolio page
├── IoTStream.html         # IoT streaming project demo
├── server.py              # Python HTTP server with no-cache headers
├── assets/                # CSS, JavaScript, fonts
│   ├── css/
│   ├── js/
│   └── webfonts/
├── images/                # Portfolio images and screenshots
└── html5up-miniport/      # Original template reference
```

## Recent Changes
- **2025-11-16**: Initial Replit setup
  - Created Python HTTP server with Cache-Control headers
  - Configured workflow for port 5000
  - Updated .gitignore for Python files

## Development Notes
- Server binds to 0.0.0.0:5000 (required for Replit proxy)
- Cache-Control headers prevent iframe caching issues
- All static files served from project root
- No build process required (pure static site)

## User Preferences
- None documented yet
