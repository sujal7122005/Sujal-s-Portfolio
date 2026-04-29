# 🚀 Sujal Patel — Premium Portfolio Website
## Product Requirements Document (PRD) v1.0

> **Stack:** Next.js 14 (App Router) · TypeScript · Tailwind CSS · Framer Motion · Three.js  
> **Designer/Developer:** Sujal Patel  
> **Date:** April 2026  
> **Status:** Ready to Build

---

## Table of Contents

1. [Vision & Concept](#1-vision--concept)
2. [Design Philosophy](#2-design-philosophy)
3. [Color System & Typography](#3-color-system--typography)
4. [Folder Structure](#4-folder-structure)
5. [Pages & Routes](#5-pages--routes)
6. [Section-by-Section Breakdown](#6-section-by-section-breakdown)
7. [Animation System](#7-animation-system)
8. [Components Library](#8-components-library)
9. [Tech Stack & Dependencies](#9-tech-stack--dependencies)
10. [Responsive Design](#10-responsive-design)
11. [Performance Requirements](#11-performance-requirements)
12. [SEO & Meta](#12-seo--meta)
13. [Phase-wise Build Plan](#13-phase-wise-build-plan)
14. [Content Copy](#14-content-copy)

---

## 1. Vision & Concept

### The Big Idea
Sujal's portfolio is not a resume on a screen. It is an **interactive engineering experience** — a dark, cinematic, space-age developer portfolio that feels like entering a command center. Visitors should feel: *"This person builds serious things."*

### Aesthetic Direction: **"Dark Matter Engineer"**
- **Theme:** Deep space / terminal / cyberpunk-lite — dark backgrounds, glowing neon accents, subtle particle systems
- **Mood:** Confident, technical, premium — like Apple's website met a hacker's terminal
- **Differentiation:** 
  - A custom **animated cursor** (glowing dot + trailing ring)
  - A **3D rotating tech globe** on the hero section (Three.js)
  - **Typewriter effect** on the hero headline
  - **Magnetic hover buttons** — buttons that attract toward the cursor
  - **Scroll-triggered staggered animations** on every section (Framer Motion)
  - A **glassmorphism card** style throughout
  - **Noise texture overlay** on the background for depth
  - **Counting number animations** for stats (CGPA, Projects, etc.)

### One Thing Visitors Will Remember
The **hero section** — a full-viewport, pitch-black canvas with floating code particles, a glowing 3D globe, and the name "SUJAL PATEL" revealed letter by letter with a neon-cyan glow.

---

## 2. Design Philosophy

### Core Principles

| Principle | Implementation |
|-----------|----------------|
| **Dark-first** | Background: `#020817` (near-black navy). Every section on dark. |
| **Glow as hierarchy** | Primary accent `#00D4FF` (neon cyan) glows on key elements. Secondary `#7C3AED` (electric violet) for depth. |
| **Motion = meaning** | Every animation has a purpose. Enter animations reveal, hover animations confirm interaction, exit animations are clean. |
| **Glassmorphism cards** | All cards: `bg-white/5 backdrop-blur-md border border-white/10` |
| **Generous whitespace** | 120px–160px section padding. Let elements breathe. |
| **Typography contrast** | Huge display text (96px–128px) paired with small readable body (16px). |

### What We're NOT doing
- No light/white backgrounds
- No purple-gradient-on-white (generic AI aesthetic)
- No Inter/Roboto fonts
- No Bootstrap-style cards with shadows
- No hero with a profile photo circle

---

## 3. Color System & Typography

### Color Palette

```css
:root {
  /* Backgrounds */
  --bg-primary:    #020817;   /* Near-black — main background */
  --bg-secondary:  #0A1628;   /* Slightly lighter — section alternates */
  --bg-card:       rgba(255, 255, 255, 0.04); /* Glassmorphism card bg */

  /* Accents */
  --accent-cyan:   #00D4FF;   /* Primary neon — headings, CTAs, glows */
  --accent-violet: #7C3AED;   /* Secondary — tags, subtle highlights */
  --accent-green:  #00FF88;   /* Success states, "available" badge */

  /* Text */
  --text-primary:  #F0F4F8;   /* Near-white — headings */
  --text-secondary:#8892A4;   /* Muted — body text, descriptions */
  --text-dim:      #4A5568;   /* Very dim — labels, meta text */

  /* Borders */
  --border:        rgba(255, 255, 255, 0.08);
  --border-glow:   rgba(0, 212, 255, 0.3);

  /* Glow effects */
  --glow-cyan:     0 0 20px rgba(0, 212, 255, 0.4);
  --glow-violet:   0 0 20px rgba(124, 58, 237, 0.4);
}
```

### Typography

| Role | Font | Weight | Size |
|------|------|--------|------|
| **Display / Name** | `Bebas Neue` | 400 | 96–128px |
| **Section Headings** | `Space Mono` | 700 | 48–64px |
| **Sub-headings** | `Syne` | 600 | 24–32px |
| **Body text** | `DM Sans` | 400 | 16–18px |
| **Code / Labels** | `JetBrains Mono` | 400 | 14px |
| **UI / Buttons** | `Syne` | 500 | 14–16px |

**Google Fonts import:**
```
Bebas Neue | Space Mono | Syne:wght@400;500;600;700 | DM Sans:wght@400;500 | JetBrains Mono
```

---

## 4. Folder Structure

```
sujal-portfolio/
├── app/
│   ├── layout.tsx              # Root layout with cursor, noise overlay, fonts
│   ├── page.tsx                # Home page — all sections assembled
│   ├── globals.css             # CSS variables, base styles, noise texture
│   └── api/
│       └── contact/
│           └── route.ts        # Contact form handler (Resend or nodemailer)
│
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx          # Floating glass navbar
│   │   ├── Footer.tsx          # Minimal dark footer
│   │   └── CustomCursor.tsx    # Neon cursor + trailing ring
│   │
│   ├── sections/
│   │   ├── Hero.tsx            # Full-screen hero with globe + typewriter
│   │   ├── About.tsx           # About with animated stats
│   │   ├── Skills.tsx          # Tech stack with animated skill bars / orbs
│   │   ├── Projects.tsx        # Featured projects with hover reveals
│   │   ├── Experience.tsx      # Timeline — Education + Leadership
│   │   ├── Certifications.tsx  # Cert cards with glow
│   │   └── Contact.tsx         # Contact form + social links
│   │
│   ├── ui/
│   │   ├── GlassCard.tsx       # Reusable glassmorphism card
│   │   ├── NeonBadge.tsx       # Tech tag pill with glow
│   │   ├── MagneticButton.tsx  # Button that magnetically attracts cursor
│   │   ├── AnimatedCounter.tsx # Number count-up animation
│   │   ├── SectionTitle.tsx    # Consistent animated section heading
│   │   ├── ParticleField.tsx   # Canvas-based floating particles
│   │   └── ScrollProgress.tsx  # Top progress bar as user scrolls
│   │
│   └── three/
│       └── TechGlobe.tsx       # Three.js rotating globe with tech icons
│
├── lib/
│   ├── constants.ts            # All content data (projects, skills, etc.)
│   ├── animations.ts           # Framer Motion variants library
│   └── utils.ts                # Helper functions
│
├── public/
│   ├── resume.pdf              # Sujal's resume for download
│   ├── og-image.png            # Open Graph image for social sharing
│   └── icons/                  # Tech stack SVG icons
│
├── hooks/
│   ├── useMagneticEffect.ts    # Magnetic button logic
│   ├── useScrollProgress.ts    # Scroll percentage hook
│   └── useIntersection.ts      # Intersection observer hook
│
└── types/
    └── index.ts                # TypeScript interfaces
```

---

## 5. Pages & Routes

This is a **single-page application** — one long scrollable page with smooth anchor navigation.

| Anchor | Section | Notes |
|--------|---------|-------|
| `#hero` | Hero | Landing viewport |
| `#about` | About Me | Stats + summary |
| `#skills` | Tech Stack | Animated skill visualization |
| `#projects` | Projects | 3 featured projects |
| `#experience` | Experience | Education + Leadership timeline |
| `#certifications` | Certifications | 4 cert cards |
| `#contact` | Contact | Form + socials |

---

## 6. Section-by-Section Breakdown

---

### 6.1 Navbar

**Type:** Floating, sticky, glassmorphism  
**Behavior:** Transparent on load → frosted glass with border after 80px scroll  
**Position:** Fixed top, centered, max-width 900px, border-radius full  

**Content:**
```
[SP]  ←logo monogram→      Home  About  Skills  Projects  Contact    [Download CV]
```

**Specs:**
- Logo: `SP` in `Space Mono`, neon cyan, slight glow
- Nav links: `DM Sans`, hover underline animates from left with cyan color
- CTA Button: `MagneticButton` — `Download CV` — outlined with cyan border, fills on hover
- On mobile: hamburger menu → full-screen overlay menu with staggered link animations
- Transition: `backdrop-blur` animates in on scroll with Framer Motion `useScroll`

---

### 6.2 Hero Section

**Height:** `100vh`  
**Background:** Pure `#020817` + `ParticleField` component (canvas, 80 floating dots connected by lines when nearby, moving slowly)  
**Layout:** Split — left 55% text, right 45% `TechGlobe`  

**Left content (staggered reveal on load):**

```
Line 1 (JetBrains Mono, cyan, small):  > Hello World, I'm
Line 2 (Bebas Neue, 96–128px, white):  SUJAL PATEL
Line 3 (Syne 600, 28px, violet→cyan gradient):  [TYPEWRITER: Full-Stack Developer / Problem Solver / Builder]
Line 4 (DM Sans, 18px, muted):  Computer Engineering student at VGEC · CGPA 9.04
Line 5:  [ Explore My Work ↓ ]   [ View Resume ↑ ]
Line 6 (small, spaced):  Available for SDE / Full-Stack Internships  ●(green pulse)
```

**Right content:**
- `TechGlobe`: A Three.js sphere (wireframe or points-based) slowly auto-rotating. Tech icons (React, Node, MongoDB, etc.) float around it as HTML labels positioned in 3D space.
- Subtle glow behind globe: radial gradient `rgba(0, 212, 255, 0.06)`

**Scroll indicator:** A bouncing `↓` arrow at the bottom center with opacity pulse animation

**Animations (all Framer Motion, staggered 0.1s each):**
- Line 1: fade in + slide up (delay 0.2s)
- Line 2: letter-by-letter reveal (delay 0.4s) using `motion.span` per letter
- Line 3: typewriter effect (delay 0.8s) using `useEffect` + `useState`
- Line 4: fade in + slide up (delay 1.0s)
- Buttons: fade + slight scale up (delay 1.2s)
- Globe: fade in + slow Y rotation via Three.js (delay 0.6s)

---

### 6.3 About Section

**Background:** `#0A1628` (slightly offset from hero)  
**Layout:** Two columns — left text, right stats grid  

**Left column:**
- Section label: `// 01 ABOUT ME` in `JetBrains Mono`, cyan
- Heading: `Who I Am` in `Space Mono`, 48px, white
- Body text (DM Sans, 18px, muted):
  > "I'm a Computer Engineering student at VGEC with a 9.04 CGPA, obsessed with building things that actually work at scale. I write TypeScript by day, think in systems by night, and occasionally lead a 20-member team at E-Cell VGEC. I'm looking for internship opportunities where I can contribute fast and learn faster."
- A subtle left border accent line (2px, cyan gradient) beside the text block

**Right column — Stats Grid (2×2):**

```
┌──────────────────┬──────────────────┐
│  9.04            │  3+              │
│  CGPA            │  Projects Built  │
├──────────────────┼──────────────────┤
│  200+            │  4               │
│  Event Attendees │  Certifications  │
└──────────────────┴──────────────────┘
```

Each stat is a `GlassCard` with:
- `AnimatedCounter` for the number (counts up when section enters viewport)
- Number: `Bebas Neue`, 64px, cyan
- Label: `DM Sans`, 14px, muted

**Animation:** Cards stagger-reveal (bottom to top, 0.15s apart) using `useIntersection` hook + Framer Motion `whileInView`

---

### 6.4 Skills Section

**Background:** `#020817`  
**Layout:** Category grid — 3 rows, each with skill pills  

**Section Label:** `// 02 TECH STACK`  
**Heading:** `What I Build With`

**Categories and skills:**

```
LANGUAGES
  Java  Python  C  JavaScript  TypeScript

FRONTEND
  HTML  CSS  React.js  Next.js  Tailwind CSS

BACKEND
  Node.js  Express.js  REST APIs

DATABASES
  MongoDB  MySQL  PostgreSQL

MACHINE LEARNING
  NumPy  Pandas  Scikit-learn  Gemini API

TOOLS & PLATFORMS
  Git  GitHub  Postman  Cloudinary  Appwrite  VS Code
```

**Each skill pill = `NeonBadge` component:**
- Base: `bg-white/5 border border-white/10 rounded-full px-4 py-2`
- Font: `JetBrains Mono`, 13px, muted text
- On hover: border color → cyan, text → cyan, `box-shadow: var(--glow-cyan)`, slight scale up
- SVG tech icon on the left of the label (from `public/icons/`)

**Skill Animation:**
- Pills stagger in left→right, row by row, with `whileInView` + `staggerChildren: 0.04`
- On mount: each pill has a subtle "flicker" CSS animation (opacity 0→1→0.9→1) simulating a terminal boot

---

### 6.5 Projects Section

**Background:** `#0A1628`  
**Layout:** Vertical stack of 3 large featured project cards  

**Section Label:** `// 03 PROJECTS`  
**Heading:** `Things I've Built`

---

#### Project Card Design

Each card is a `GlassCard` — full width, large, with a two-column layout:

**Left (60%):** Project info  
**Right (40%):** Mockup / visual placeholder (gradient box with project name large in background)

**Card anatomy:**

```
┌─────────────────────────────────────────────────────────┐
│  [01]   PROJECT NAME                         [↗ Live]   │
│         ─────────────────────────────────────           │
│  Brief description of what the project does and         │
│  the problem it solves.                                  │
│                                                          │
│  [Next.js] [TypeScript] [MongoDB] [NextAuth]            │
│                                                          │
│  • Key achievement bullet 1                             │
│  • Key achievement bullet 2                             │
│  • Key achievement bullet 3                             │
│                                                          │
│  [View Source ↗]   [Live Demo ↗]             [→→→→]    │
└─────────────────────────────────────────────────────────┘
```

**Hover effect on card:**
- Border changes from `white/10` → `cyan/30`
- Subtle cyan glow on card border
- The right visual placeholder shifts slightly (parallax-like) via `motion.div` with `whileHover`
- The `[→→→→]` arrow slides right

---

#### Project Data

**Project 1 — Unsaid**
- Tagline: `Anonymous Feedback Platform`
- Description: Built an anonymous feedback platform with AI-powered message suggestions, OTP authentication, and 50+ shareable user profile links.
- Tech: `Next.js` `TypeScript` `MongoDB` `NextAuth` `Gemini API`
- Key points: AI message suggestions, JWT + session auth, 50+ profile links
- Links: Deployed link + source code
- Visual accent color: `#00D4FF` (cyan theme)

**Project 2 — Pupple**
- Tagline: `Full-Stack Blog Application`
- Description: Designed and deployed a feature-rich blogging platform with full CRUD, rich text editing via TinyMCE, and global state management using Redux.
- Tech: `React.js` `Appwrite` `Redux` `TinyMCE`
- Key points: Full CRUD, protected routes, Appwrite BaaS, Redux state
- Links: Source code
- Visual accent color: `#7C3AED` (violet theme)

**Project 3 — VideoTube**
- Tagline: `Video Platform Backend API`
- Description: Engineered a production-grade REST API backend for a YouTube-like platform with likes, comments, playlists, and Cloudinary media streaming.
- Tech: `Node.js` `Express.js` `MongoDB` `Cloudinary`
- Key points: REST API, JWT + cookies, Cloudinary streaming
- Links: Source code
- Visual accent color: `#00FF88` (green theme)

**Card Animation:**
- Cards slide in from bottom with opacity 0→1, `whileInView`, stagger 0.2s each
- Number `[01]` is large (`Bebas Neue`, 80px, opacity 0.08) as a background watermark

---

### 6.6 Experience Section (Education + Leadership)

**Background:** `#020817`  
**Layout:** Vertical timeline — centered line with alternating left/right cards  

**Section Label:** `// 04 EXPERIENCE`  
**Heading:** `My Journey`

**Timeline items (newest first):**

```
2024–Present  Lead, Entrepreneurship Cell (E-Cell), VGEC
              ▸ Organized events with 200+ participants
              ▸ Coordinated 20+ team members
              ▸ Managed sponsorship & speaker outreach

2023–Present  B.E. Computer Engineering, VGEC
              CGPA: 9.04

2021–2023     12th Science, Vivekananda Higher Secondary School
              80.15%

2020–2021     10th Board, Arpan Vidhya Sankul
              99.16%
```

**Timeline design:**
- Vertical center line: 1px, cyan gradient (top transparent → cyan → transparent)
- Each item: a `GlassCard` connected to the line via a cyan dot connector
- Year label: `JetBrains Mono`, cyan, left side
- Role/Degree: `Syne 600`, white, 20px
- Institution: `DM Sans`, muted
- Bullet points: DM Sans 15px, text-secondary

**Animation:** Each timeline item slides in from its side (left items from left, right items from right) as user scrolls. The center line draws itself (height animates from 0 to 100%) via `useScroll` + `useTransform`.

---

### 6.7 Certifications Section

**Background:** `#0A1628`  
**Layout:** 2×2 grid of certification cards  

**Section Label:** `// 05 CERTIFICATIONS`  
**Heading:** `Credentials`

**Each cert card:**

```
┌──────────────────────────────────────┐
│  🏆  [CERT NAME]                     │
│      [Issuer]                        │
│      [Year]                          │
│                                      │
│      [Verify ↗]                      │
└──────────────────────────────────────┘
```

**Certifications data:**

| # | Name | Issuer | Year |
|---|------|--------|------|
| 1 | Complete Web Development Bootcamp | Hitesh Chaudhary (Udemy) | 2026 |
| 2 | ECONOMANIA Hackathon | PDEU Gujarat | 2025 |
| 3 | Cloud Skills Challenge | Microsoft Learn | 2024 |
| 4 | AI Tools Workshop | be10x | 2024 |

**Card hover:** 
- Icon scales up slightly
- Card gets a left border in cyan (2px) via pseudo-element transition
- Subtle inner glow

**Animation:** 4 cards stagger in with scale: 0.95 → 1 and opacity 0 → 1

---

### 6.8 Contact Section

**Background:** `#020817`  
**Layout:** Two columns — left form, right info + social links  

**Section Label:** `// 06 CONTACT`  
**Heading:** `Let's Connect`  
**Sub-heading (DM Sans, muted):** `Open to SDE / Full-Stack Internship opportunities. Let's talk.`

**Left column — Contact Form:**
```
Name:     [________________________]
Email:    [________________________]
Message:  [________________________]
          [________________________]
          [________________________]

          [ Send Message  →  ]
```

- Input style: `bg-white/5 border border-white/10 rounded-lg` 
- Focus: border → cyan, subtle cyan glow
- Button: `MagneticButton`, full-width on mobile, cyan fill, dark text, hover scale
- On submit: button shows spinner, then success checkmark animation
- Form handled by Next.js API route `POST /api/contact` using **Resend** (email service)

**Right column — Info:**

```
📧  sdpatel7122005@gmail.com
📱  +91-8799355018

──── Find me on ────

[GitHub]  [LinkedIn]  [LeetCode]

──── Current Status ────
● Available for Internships (Green glow pulse)
```

Social links as large icon buttons with hover glow effect.

---

### 6.9 Footer

**Minimal, single row:**
```
  SP  ©2026 Sujal Patel · Built with Next.js + ♡    [↑ Back to top]
```
- `SP` monogram in cyan
- "Built with Next.js + ♡" — the heart pulses slowly
- Back to top is a MagneticButton that smoothly scrolls to `#hero`

---

## 7. Animation System

### 7.1 Framer Motion Variants Library (`lib/animations.ts`)

```typescript
// Fade up — standard section item reveal
export const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
}

// Fade in — no movement
export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5 } }
}

// Slide from left
export const slideLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } }
}

// Slide from right
export const slideRight = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } }
}

// Scale up
export const scaleUp = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } }
}

// Container stagger — wraps staggered children
export const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } }
}

// Letter-by-letter text reveal
export const letterReveal = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.05 } }
}
```

### 7.2 Scroll Progress Bar (`components/ui/ScrollProgress.tsx`)
- Fixed at the very top of the page, above the navbar
- Height: 2px
- Color: linear-gradient from `#00D4FF` to `#7C3AED`
- Width driven by `useScroll().scrollYProgress` + `useTransform`
- Has a glowing right edge: `box-shadow: var(--glow-cyan)`

### 7.3 Custom Cursor (`components/layout/CustomCursor.tsx`)
- **Dot:** 8px, cyan `#00D4FF`, fixed position, follows mouse with `lerp` smoothing (no delay)
- **Ring:** 32px, white/30 border, follows mouse with 0.1s lag (CSS transition)
- **On hover over links/buttons:** Ring expands to 48px, fills with `rgba(0,212,255,0.1)`
- **On click:** Brief scale-down flash animation
- Implemented using `mousemove` event listener + `requestAnimationFrame`
- **Hide native cursor:** `cursor: none` on `body`

### 7.4 Particle Field (`components/ui/ParticleField.tsx`)
- `<canvas>` covering full hero section
- 80–100 particles, `rgba(0,212,255,0.3)`, 2px radius
- Particles drift slowly in random directions, bounce off edges
- Particles within 120px of each other are connected by a faint line
- Particles within 80px of the mouse are repelled slightly
- Uses `requestAnimationFrame` loop
- Performance: canvas resize on `window.resize` event

### 7.5 Magnetic Button (`components/ui/MagneticButton.tsx`)
- On mouse enter: track mouse position relative to button center
- Apply `transform: translate(x/4, y/4)` to button (gentle pull effect, not full follow)
- On mouse leave: spring back to `translate(0, 0)` with Framer Motion spring
- Parameters: `stiffness: 200, damping: 20`

### 7.6 Three.js Tech Globe (`components/three/TechGlobe.tsx`)
- Three.js scene inside a `<canvas>` — `useEffect` mounts scene, `useRef` for canvas
- Geometry: `SphereGeometry(2.5, 32, 32)` — wireframe with `LineSegments`
- Color: `#00D4FF` at 20% opacity for the wireframe lines
- Auto-rotates: Y axis at 0.003 rad/frame
- 8–10 tech labels (HTML elements) orbit the globe using 3D→2D projection
- On hover: rotation speed increases to 0.008
- Mobile fallback: replace with static animated CSS gradient sphere if Three.js is heavy
- Cleanup: `renderer.dispose()` in `useEffect` cleanup

### 7.7 Animated Number Counter (`components/ui/AnimatedCounter.tsx`)
- Uses `useIntersection` hook to detect when stat enters viewport
- On enter: `setInterval` increments count from 0 to target value over 1500ms
- Easing: `easeOutCubic` — fast start, slow finish
- Once done: clears interval
- Props: `target: number`, `duration?: number`, `suffix?: string`

### 7.8 Timeline Line Draw Animation
- `motion.div` with `scaleY: 0 → 1`, `originY: 0`
- Driven by `useScroll` + `useTransform` (tied to section scroll progress)
- Timeline dots scale in (0 → 1) as the line reaches them

---

## 8. Components Library

### 8.1 `GlassCard`
```typescript
interface GlassCardProps {
  children: React.ReactNode
  className?: string
  hoverGlow?: 'cyan' | 'violet' | 'green' | 'none'
  animated?: boolean // wrap in motion.div with fadeUp variant
}
```
Base styles: `bg-white/[0.04] backdrop-blur-md border border-white/[0.08] rounded-2xl`  
Hover styles: `hover:border-cyan-400/30 hover:shadow-[0_0_30px_rgba(0,212,255,0.1)]`

### 8.2 `NeonBadge`
```typescript
interface NeonBadgeProps {
  label: string
  icon?: string    // path to SVG icon in /public/icons/
  color?: 'cyan' | 'violet' | 'green'
}
```
Base: `text-xs font-mono px-3 py-1.5 rounded-full border bg-white/5`

### 8.3 `SectionTitle`
```typescript
interface SectionTitleProps {
  label: string    // e.g. "// 01 ABOUT ME"
  heading: string  // e.g. "Who I Am"
  align?: 'left' | 'center'
}
```
- Label: `JetBrains Mono`, 13px, cyan, letter-spacing wide
- Heading: `Space Mono`, 48px, white
- Animated in with `fadeUp` variant + `whileInView={{ once: true }}`

### 8.4 `MagneticButton`
```typescript
interface MagneticButtonProps {
  children: React.ReactNode
  variant: 'outline' | 'filled' | 'ghost'
  href?: string       // if set, renders as <a>
  onClick?: () => void
  className?: string
}
```

### 8.5 `AnimatedCounter`
```typescript
interface AnimatedCounterProps {
  target: number
  suffix?: string   // e.g. "+" or "%"
  prefix?: string   // e.g. "₹"
  duration?: number // ms, default 1500
}
```

### 8.6 `ScrollProgress`
```typescript
// No props — automatically reads window scroll
// Fixed top bar, z-index 9999
```

### 8.7 `CustomCursor`
```typescript
// No props — renders null on touch devices
// Uses useEffect to mount/unmount event listeners
// Returns <> dot div + ring div </>
```

---

## 9. Tech Stack & Dependencies

### Core
```json
{
  "next": "14.x",
  "react": "18.x",
  "typescript": "5.x",
  "tailwindcss": "3.x"
}
```

### Animation
```json
{
  "framer-motion": "^11.x",
  "three": "^0.163.x",
  "@types/three": "^0.163.x"
}
```

### Forms & Email
```json
{
  "react-hook-form": "^7.x",
  "zod": "^3.x",
  "@hookform/resolvers": "^3.x",
  "resend": "^3.x"
}
```

### QR & Other UI
```json
{
  "qrcode": "^1.5.x",
  "clsx": "^2.x",
  "tailwind-merge": "^2.x"
}
```

### Fonts (Google Fonts via `next/font/google`)
```typescript
import { Bebas_Neue, Space_Mono, Syne, DM_Sans, JetBrains_Mono } from 'next/font/google'
```

### Environment Variables
```env
# .env.local
RESEND_API_KEY=your_resend_api_key
CONTACT_EMAIL=sdpatel7122005@gmail.com
NEXT_PUBLIC_SITE_URL=https://sujalpatel.dev
```

---

## 10. Responsive Design

### Breakpoints (Tailwind)

| Breakpoint | Width | Layout Changes |
|------------|-------|----------------|
| `sm` | 640px | — |
| `md` | 768px | Single column layouts start here |
| `lg` | 1024px | Two-column layouts restored |
| `xl` | 1280px | Max content width |

### Mobile Adaptations

**Navbar (< 768px):**
- Hide nav links, show hamburger
- Hamburger → fullscreen overlay menu with `motion.div` slide-down animation
- Links stagger in one by one

**Hero (< 768px):**
- Stack vertically: text on top, globe below (or hide globe, show animated background only)
- Name font-size: 72px (down from 128px)
- `ParticleField` particle count: reduce to 40

**Projects (< 768px):**
- Single column stack
- Hide right visual placeholder, show only text content

**Skills (< 768px):**
- Pills wrap naturally (already flex-wrap)

**Timeline (< 768px):**
- All items left-aligned (no alternating)
- Center line moves to left edge

**Cursor:**
- Disabled on touch devices (`window.matchMedia('(pointer: coarse')`)

**Three.js Globe (< 768px):**
- Replace with a CSS animated gradient circle (`@keyframes spin` with a gradient conic)
- Prevents performance issues on mobile

---

## 11. Performance Requirements

| Metric | Target |
|--------|--------|
| Lighthouse Performance | ≥ 90 |
| Lighthouse Accessibility | ≥ 90 |
| Largest Contentful Paint (LCP) | < 2.5s |
| Cumulative Layout Shift (CLS) | < 0.1 |
| Time to Interactive (TTI) | < 3.5s |

### Optimizations

- **Fonts:** Use `next/font/google` with `display: 'swap'` — zero layout shift
- **Images:** All images as `next/image` with `priority` on hero
- **Three.js:** Dynamically imported with `next/dynamic({ ssr: false })` — not in SSR bundle
- **Framer Motion:** Only imported in client components (`'use client'`)
- **Particle Field:** `will-change: transform` on canvas, reduced count on mobile
- **Code splitting:** Each section component is a separate file (natural Next.js splitting)
- **Resume PDF:** Served from `/public/resume.pdf` — direct link, no JS needed
- **CSS animations:** Prefer CSS `@keyframes` over JS for continuous loops (pulse, float, etc.)

---

## 12. SEO & Meta

### `app/layout.tsx` metadata:

```typescript
export const metadata: Metadata = {
  title: 'Sujal Patel — Full Stack Developer',
  description: 'Computer Engineering student at VGEC with CGPA 9.04. Building full-stack apps with Next.js, React, Node.js. Open to SDE / Full-Stack internship opportunities.',
  keywords: ['Sujal Patel', 'Full Stack Developer', 'Next.js Developer', 'React Developer', 'VGEC', 'Computer Engineering', 'Internship'],
  authors: [{ name: 'Sujal Patel' }],
  openGraph: {
    title: 'Sujal Patel — Full Stack Developer',
    description: 'Portfolio of Sujal Patel — Full Stack Developer building with Next.js, React, Node.js',
    url: 'https://sujalpatel.dev',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Sujal Patel Portfolio' }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sujal Patel — Full Stack Developer',
    description: 'Full Stack Developer · Next.js · React · Node.js',
    images: ['/og-image.png'],
  },
  robots: { index: true, follow: true },
  themeColor: '#020817',
}
```

---

## 13. Phase-wise Build Plan

### Phase 1 — Foundation (Day 1)
- [ ] `npx create-next-app@latest sujal-portfolio --typescript --tailwind --app`
- [ ] Install all dependencies: `framer-motion three @types/three react-hook-form zod resend clsx tailwind-merge`
- [ ] Set up `globals.css` with all CSS variables and base styles
- [ ] Set up Google Fonts via `next/font/google` in `layout.tsx`
- [ ] Create folder structure as defined in Section 4
- [ ] Create `lib/constants.ts` with all project/skill/cert data
- [ ] Create `lib/animations.ts` with all Framer Motion variants
- [ ] Create `types/index.ts` with all TypeScript interfaces

### Phase 2 — Core UI Components (Day 2)
- [ ] `GlassCard.tsx`
- [ ] `NeonBadge.tsx`
- [ ] `SectionTitle.tsx`
- [ ] `MagneticButton.tsx`
- [ ] `AnimatedCounter.tsx`
- [ ] `ScrollProgress.tsx`

### Phase 3 — Layout & Special Effects (Day 2–3)
- [ ] `CustomCursor.tsx` (disable on touch)
- [ ] `ParticleField.tsx` (canvas + particle loop)
- [ ] `Navbar.tsx` (floating glass, mobile menu)
- [ ] `Footer.tsx`
- [ ] `TechGlobe.tsx` (Three.js, dynamic import)

### Phase 4 — Sections (Day 3–5)
- [ ] `Hero.tsx` — particle bg, typewriter, letter reveal, globe
- [ ] `About.tsx` — stats grid with AnimatedCounter
- [ ] `Skills.tsx` — category groups, NeonBadge pills, stagger animation
- [ ] `Projects.tsx` — 3 GlassCards, hover reveals
- [ ] `Experience.tsx` — timeline with line draw animation
- [ ] `Certifications.tsx` — 2×2 grid
- [ ] `Contact.tsx` — form + socials, API route

### Phase 5 — Polish (Day 5–6)
- [ ] `POST /api/contact` route with Resend
- [ ] Mobile responsiveness pass — test all breakpoints
- [ ] Lighthouse audit — fix any performance issues
- [ ] SEO metadata in `layout.tsx`
- [ ] OG image creation (`/public/og-image.png`)
- [ ] Add `resume.pdf` to `/public/`
- [ ] Final animation timing tuning

### Phase 6 — Deploy (Day 6–7)
- [ ] Push to GitHub
- [ ] Connect to Vercel
- [ ] Add env variables in Vercel dashboard
- [ ] Set up custom domain (optional)
- [ ] Final cross-browser testing (Chrome, Firefox, Safari)

---

## 14. Content Copy

### Hero Tagline (Typewriter cycles through):
```
Full-Stack Developer
Problem Solver
UI Craftsman
Open Source Builder
```

### About Body Text:
```
I'm a Computer Engineering student at VGEC (CGPA: 9.04) with a passion for building 
scalable full-stack applications. I work with React, Next.js, Node.js, and cloud tools — 
always pushing towards clean architecture and real user impact.

When I'm not coding, I'm leading a team of 20+ at E-Cell VGEC, organizing large-scale 
events and learning how products grow. I'm actively seeking SDE / Full-Stack internship 
opportunities where I can contribute fast, learn faster, and ship things that matter.
```

### Projects Meta Descriptions (for SEO / OG):
- **Unsaid:** Anonymous feedback platform with AI-powered suggestions and OTP authentication
- **Pupple:** Full-stack blog platform with Redux state management and Appwrite backend
- **VideoTube:** REST API backend for a video platform with JWT auth and Cloudinary streaming

### Contact Section Sub-heading:
```
I'm currently open to Full-Stack / SDE internship opportunities.
Whether you have a role, a project, or just want to talk tech — my inbox is open.
```

---

## Quick Reference — Key Design Tokens

```
Primary BG:      #020817
Secondary BG:    #0A1628
Neon Cyan:       #00D4FF
Electric Violet: #7C3AED
Success Green:   #00FF88
Text Primary:    #F0F4F8
Text Muted:      #8892A4
Display Font:    Bebas Neue
Heading Font:    Space Mono
Body Font:       DM Sans
Code Font:       JetBrains Mono
Border Radius:   16px (cards), 999px (pills), 8px (inputs)
Section Padding: 120px top/bottom (desktop), 80px (mobile)
Max Width:       1280px
```

---

*PRD v1.0 — Sujal Patel Portfolio — April 2026*  
*Build this. Ship it. Put the URL on every application.*
