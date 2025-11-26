# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a single-page website for Deborah Lyon Lymphatic Specialist, a healthcare practice based in Bridge of Allen, Scotland. The site is built as a standalone HTML file with embedded CSS and JavaScript - no build process or external dependencies required.

## Architecture

### Single-File Structure
- **index.html** - Complete website in one file containing:
  - All HTML markup
  - CSS styles in `<style>` tags (lines 10-647)
  - JavaScript in `<script>` tags (lines 1203-1318)
  - No external CSS or JS files

### Key Features
- **Responsive Design** - Mobile-first approach with breakpoints at 768px and 480px
- **CSS Custom Properties** - Color scheme defined in `:root` (lines 17-26):
  - `--mauve` / `--light-mauve` - Primary brand colors
  - `--cream` / `--light-cream` - Background colors
  - `--grey` / `--dark-grey` / `--light-grey` - Text and UI colors
- **JavaScript Components**:
  - `SlideshowManager` class - Reusable slideshow component for banner images
  - Review carousel with auto-rotation
  - "Read more" toggle functionality

### Images
- `img/profile.jpeg` - Profile photo used in About section and footer
- `img/logos/` - Professional membership logos (MLD UK, LTA, BLS, Juzo, Restore, LSN, Lipoelastic)
- `img/services/` - Stock photos for service cards and gallery

### Booking Integration
External booking system URL: `http://deborah-lyon--mld--post-op-expert.book.app/`

## Development Workflow

### Viewing Changes
Simply open index.html in a browser - no server or build process needed.

### Editing
All changes are made directly to index.html:
- **Styles**: Edit CSS in `<style>` block (lines 10-647)
- **Content**: Edit HTML in `<body>` (lines 649-1201)
- **Scripts**: Edit JavaScript in `<script>` block (lines 1203-1318)

### Content Sections
The page is organized into distinct sections:
1. Header with sticky navigation and "Book Now" button
2. Two banner slideshows with dots navigation
3. About section with profile, bio, and professional memberships
4. Multiple "Book Now" call-to-action sections
5. Services section (two alternative layouts included)
6. Benefits section highlighting lymphatic drainage advantages
7. Client testimonials carousel
8. Gallery section (two alternative layouts included)
9. Contact section with opening hours and location info
10. Footer with memberships and copyright

### Placeholder Content
Some sections contain placeholder text marked as `[placeholder]`:
- Service descriptions (lines 809, 817, 825, 833, 841, 849, 857, 865, 873)
- Client testimonials (lines 1063, 1068, 1073, 1078)
- Map location (line 1137)

## Design Considerations

- The site currently has duplicate sections with alternative layouts (services, gallery, book now buttons) that can be chosen from
- Accessibility features include SR-only class for screen readers and semantic HTML
- Color contrast follows brand identity with mauve/cream scheme
- All interactive elements have hover states and transitions
