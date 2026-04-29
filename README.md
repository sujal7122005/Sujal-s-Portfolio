# Sujal Patel Portfolio

A bold, animated personal portfolio built with Next.js, featuring custom UI motion, 3D accents, and a contact form backed by Gmail SMTP.

## Overview

- Sections: Hero, About, Skills, Projects, Experience, Certifications, Contact
- Pages: Home and a dedicated Resume viewer
- Contact form: Server-side email delivery via SMTP (Gmail App Password or OAuth2)

## Key Features

- Animated hero with typewriter role cycling
- 3D tech globe with Three.js and interactive motion
- Particle field background and custom cursor system
- Scroll progress indicator and rich UI micro-interactions
- Resume page with embedded PDF and download CTA

## Tech Stack

- Next.js App Router
- React + TypeScript
- Tailwind CSS
- Framer Motion
- Three.js
- React Hook Form + Zod
- Nodemailer (SMTP)

## Routes

- `/` - Main portfolio
- `/resume` - Resume viewer
- `/api/contact` - Contact form endpoint

## Run Locally

```bash
npm install
npm run dev
```

## Environment Variables

Set the following variables in your local environment or hosting provider:

```bash
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-gmail-address@gmail.com
GOOGLE_SMTP_APP_PASSWORD=your-gmail-app-password
SMTP_FROM="Sujal Portfolio <your-gmail-address@gmail.com>"
CONTACT_EMAIL=your-gmail-address@gmail.com
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

Optional OAuth2 variables (use these only if you want OAuth2 instead of an App Password):

```bash
GOOGLE_CLIENT_ID=your-google-oauth-client-id
GOOGLE_CLIENT_SECRET=your-google-oauth-client-secret
GOOGLE_REFRESH_TOKEN=your-google-oauth-refresh-token
```

Optional for non-Gmail SMTP providers:

```bash
SMTP_PASS=your-smtp-password
```

## Deployment Notes

- Add the same environment variables to your hosting provider.
- Ensure the Gmail account matches `SMTP_USER` and the App Password was created for that account.
- Set `NEXT_PUBLIC_SITE_URL` to your production domain for correct metadata/OG tags.
- Redeploy after updating environment variables.

## Assets

- Update `public/resume.pdf` with your latest resume
- Update `public/Logo (2).png` for social previews and the browser tab icon
