---
name: Portfolio Project Description
description: Comprehensive details about the Rashed Ali Shekho Portfolio project.
---

# Rashed Ali Shekho Portfolio

This project is a modern, responsive personal portfolio website for **Rashed Ali Shekho**, a Software Developer focused on creating elegant solutions to complex problems. 

## Tech Stack
- **Frameworks & Libraries:** React, Next.js (App Router), TypeScript
- **Styling:** Tailwind CSS, DaisyUI, Custom CSS, React Icons
- **Integrations/Tooling:** React Toastify (Notifications), react-tsparticles
- **Backend/Services referenced in projects:** Appwrite, Supabase, Stripe, MongoDB, Node.js

## Core Sections & Features

### 1. Hero & Introduction (`Main` Component)
- **Background:** High-quality background image with a responsive layout.
- **Profile:** Circular profile picture over a styled ring.
- **Introduction text:** Displaying the name, title ("Software Developer"), and a brief bio.
- **Tech Stack Icons:** Animated icons representing React, Next.js, TypeScript, Tailwind, JS, Node.js, and MongoDB.
- **Social Links:** Buttons linking to GitHub and LinkedIn profiles.

### 2. About Me (`Me` Component)
Features a dynamic, tabbed interface to showcase professional background:
- **Experience Tab:** Details on Freelance Software Developer roles.
- **Education Tab:** Bachelor of Science in Information Systems from Karlstads Universitet (2023 - 2026).
- **Certificate Tab:** A list of multiple certifications, including:
  - Device Configuration and Management (ITS)
  - Various Adobe certifications (Video Design, Visual Design with Photoshop, Premiere Pro, InDesign, Illustrator, After Effects)
  - YouTube Music Certification
  - Includes quick preview buttons linking to the certificate PDFs.

### 3. Featured Projects
A grid showcasing key projects built:
- **Zain Restaurant:** A modern restaurant website with an integrated admin dashboard for menu and order management (Built with React, Next.js, Appwrite).
- **Splittra:** A modern web app for splitting household expenses, managing members, and handling premium features (Built with React, Next.js, Supabase, Stripe).

### 4. Contact Section
- **Email Contact:** Quick click-to-copy email feature using `react-toastify` for notifications (`contact@Rashedalishekho.com`).
- **Social Links:** Duplicated quick links to GitHub and LinkedIn.

## Project Structure
- `src/app/page.tsx`: The main page bringing together the Navbar, Main content area, and Footer components.
- `src/components/main.tsx`: The core container component displaying the hero section, featured projects, and contact area.
- `src/components/me.tsx`: The interactive "About Me" tabbed component.
- `src/components/nav.tsx` & `src/components/footer.tsx`: Standard navigation and footer elements.
