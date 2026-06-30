# Horexa Solutions Production Audit Report

Date: 2026-06-30

## Executive Status

The project is now aligned to a Firebase-only architecture. Active dependencies use Firebase Web SDK, Firebase Admin SDK, Firestore, SMTP email, and local server uploads.

No active source file depends on Prisma, PostgreSQL, NextAuth, or Cloudinary.

## Current Architecture

- Public website: Home, About, Services, dynamic Service Details, AMC Plans, Projects, Blog, Careers, Contact, Privacy Policy, Terms, 404.
- Admin panel: Firestore-backed modules for CMS, operations, users, media, settings, SEO, inquiries, and audit logs.
- Client portal: Firestore-backed dashboard, reports, inspections, compliance, documents, invoices, AMC, support tickets, notifications, profile, and team areas.
- Auth: Firebase Authentication with server-verified Firebase Admin session cookies.
- Database: Firestore collections defined in `src/firebase/collections.ts`.
- Uploads: local server storage under `uploads/`.
- Email: SMTP via Nodemailer workflows.
- SEO: metadata, canonical routes, OpenGraph/Twitter, sitemap, robots, and JSON-LD helpers.

## Firebase Migration Verification

- `package.json` contains `firebase` and `firebase-admin`.
- `package.json` does not contain Prisma, PostgreSQL adapters, or NextAuth.
- Active source search found no `@prisma`, `PrismaClient`, `next-auth`, `NextAuth`, `DATABASE_URL`, or `postgres` references.
- `src/firebase/client.ts` initializes the Firebase Web SDK only once.
- `src/firebase/admin.ts` initializes Firebase Admin only once.
- `src/firebase/firestore.ts` provides reusable Firestore model helpers used by API routes and page data functions.
- `src/middleware.ts` protects admin and portal routes with Firebase session cookies.

## Firestore Collections

- `amcPlans`
- `applications`
- `auditLogs`
- `blogPosts`
- `careers`
- `categories`
- `clients`
- `clientMembers`
- `complianceRecords`
- `documents`
- `emailLogs`
- `faqs`
- `inquiries`
- `inspectionReports`
- `invoices`
- `newsletterSubscriptions`
- `notifications`
- `otpTokens`
- `passwordResetTokens`
- `projects`
- `rateLimitEvents`
- `seoMetadata`
- `services`
- `settings`
- `supportTickets`
- `testimonials`
- `uploadAssets`
- `users`

## Environment Variables

Required for production:

- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_FIREBASE_API_KEY`
- `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
- `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
- `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
- `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
- `NEXT_PUBLIC_FIREBASE_APP_ID`
- `NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID`
- `FIREBASE_PROJECT_ID`
- `FIREBASE_CLIENT_EMAIL`
- `FIREBASE_PRIVATE_KEY`
- `FIREBASE_SERVICE_ACCOUNT_JSON`
- `SMTP_HOST`
- `SMTP_PORT`
- `SMTP_USER`
- `SMTP_PASS`
- `SMTP_FROM`
- `NEXT_PUBLIC_RECAPTCHA_SITE_KEY`
- `RECAPTCHA_SECRET_KEY`
- `SEED_ADMIN_EMAIL`
- `SEED_ADMIN_PASSWORD`
- `SEED_ADMIN_NAME`

Use either split Firebase Admin credentials or `FIREBASE_SERVICE_ACCOUNT_JSON`.

## Security Review

- Admin routes require `SUPER_ADMIN`, `ADMIN`, `EDITOR`, or `OPERATIONS`.
- Portal routes require a valid Firebase session cookie.
- Public forms include same-origin checks, validation, rate limiting, honeypot checks, and optional reCAPTCHA.
- Uploads validate MIME type and size.
- Security headers and a CSP are set in middleware.
- Robots excludes admin, portal, and API URLs.

Remaining production checks:

- Firebase Authentication providers must be enabled in Firebase Console.
- Firestore rules should be reviewed even though server operations use Admin SDK.
- SMTP credentials must be configured and verified.
- Local upload directory persistence and backups must be configured on the host.

## Verification Commands

Run before deployment handoff:

```bash
npm install
npm run lint
npm run build
npm run seed:admin
npm run seed:data
```

## Deployment Readiness

Ready for staging after Firebase Admin credentials, Firebase Auth providers, SMTP credentials, and production URL are configured.

Not ready for final production sign-off until:

- A `SUPER_ADMIN` user is seeded.
- Firestore starter content is seeded or imported.
- Public forms are tested with SMTP enabled.
- Auth flows are tested with the production Firebase project.
- Local upload persistence is confirmed on the host.
- Lighthouse and browser accessibility checks are run against staging/production.
