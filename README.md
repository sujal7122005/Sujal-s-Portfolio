This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Contact Mail Service (Nodemailer)

The contact form uses a server-side Route Handler at `src/app/api/contact/route.ts` and sends emails with Nodemailer over SMTP.

Create a `.env.local` file using these variables:

```bash
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-gmail-address@gmail.com
GOOGLE_SMTP_APP_PASSWORD=your-gmail-app-password
SMTP_FROM="Sujal Portfolio <your-gmail-address@gmail.com>"
CONTACT_EMAIL=sdpatel7122005@gmail.com
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

Deployment notes:

- Add the same variables to your hosting provider's environment settings (for example, Vercel project settings).
- Use an SMTP provider that allows server-side sending in production (Gmail App Password, Brevo SMTP, Mailtrap, Zoho, etc.).
- Ensure `SMTP_FROM` is a sender address verified by your SMTP provider to avoid rejected emails.
- Redeploy after setting environment variables.

Gmail-specific notes:

- App Password (recommended for simplicity): If your Google account uses 2-Step Verification, create an App Password and set it as `GOOGLE_SMTP_APP_PASSWORD` with `SMTP_USER` set to your full Gmail address.
- OAuth2 (recommended for long-term security): You can provide `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, and `GOOGLE_REFRESH_TOKEN` instead. The server will use OAuth2 to obtain access tokens and send via Gmail securely. See the `.env.example` for optional variables.
- Never commit credentials: Do not commit `SMTP_PASS`, `GOOGLE_*`, or other secrets — add them to your host's secret management (Vercel, Netlify, etc.).

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
