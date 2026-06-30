# Horexa Firebase Backend Architecture

The backend is Firebase-first:

- Firestore is the only database.
- Firebase Authentication is the only auth provider.
- Firebase Admin SDK handles trusted server-side auth and Firestore access.
- Uploads are stored on the local server under `uploads/`.
- SMTP via Nodemailer handles business email.

There is no Prisma, PostgreSQL, NextAuth, Cloudinary, or SQL migration layer in the active codebase.

## Core Files

- `src/firebase/client.ts`: browser Firebase Web SDK initialization, Auth, Firestore, Google provider, Analytics.
- `src/firebase/admin.ts`: server Firebase Admin initialization from environment credentials.
- `src/firebase/auth.ts`: session cookie creation, token verification, current-user lookup.
- `src/firebase/firestore.ts`: reusable Firestore model adapter with CRUD, filtering, pagination support, ordering, and serialization.
- `src/firebase/collections.ts`: canonical Firestore collection names.
- `src/lib/auth/rbac.ts`: role guards for admin, operations, and client routes.
- `src/lib/api/crud.ts`: reusable CRUD route factory with validation, filtering, pagination, RBAC, CSRF origin checks, and audit logs.
- `src/lib/email/*`: SMTP transport and workflow emails.
- `src/lib/storage/local-upload.ts`: local upload validation, unique file naming, and path persistence.

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

## Authentication

Firebase Auth supports email/password and Google login from the client. The server accepts Firebase ID tokens at `POST /api/auth/session`, verifies them with Firebase Admin, and stores an HTTP-only session cookie named `horexa_firebase_session`.

Protected routes:

- `/admin/*`: requires `SUPER_ADMIN`, `ADMIN`, `EDITOR`, or `OPERATIONS`.
- `/portal/*`: requires a valid Firebase session cookie, except `/portal/login`.

Role data is stored in Firestore `users` documents and mirrored into a signed-in role cookie for middleware redirects.

## API Surfaces

### Auth

- `POST /api/auth/session`: create Firebase Admin session cookie from a Firebase ID token.
- `DELETE /api/auth/session`: clear session cookies.
- `POST /api/auth/otp/request`
- `POST /api/auth/otp/verify`
- `POST /api/auth/password-reset/request`
- `POST /api/auth/password-reset/confirm`

### Public

- `GET /api/public/services`
- `GET /api/public/services/[slug]`
- `GET /api/public/projects`
- `GET /api/public/blog-posts`
- `GET /api/public/blog-posts/[slug]`
- `GET /api/public/amc-plans`
- `GET /api/public/testimonials`
- `GET /api/public/faqs`
- `GET /api/public/careers`
- `GET /api/public/settings`
- `POST /api/public/inquiries`
- `POST /api/public/applications`
- `POST /api/public/newsletter`

### Admin

Admin modules expose Firestore-backed CRUD with pagination, filtering, validation, role checks, and audit logging:

- `services`
- `projects`
- `amc-plans`
- `inquiries`
- `blog-posts`
- `careers`
- `applications`
- `testimonials`
- `clients`
- `inspection-reports`
- `compliance-records`
- `documents`
- `support-tickets`
- `notifications`
- `users`
- `seo`
- `settings`
- `uploads`

### Portal

- `GET /api/portal/dashboard`
- `GET /api/portal/reports`
- `GET /api/portal/documents`
- `GET /api/portal/invoices`
- `GET /api/portal/amc`
- `GET /api/portal/compliance`
- `GET /api/portal/notifications`
- `GET /api/portal/profile`
- `GET /api/portal/team`
- `GET/POST /api/portal/tickets`

## Uploads

Uploads are local-server based, not Firebase Storage.

Default folders:

- `uploads/services`
- `uploads/blogs`
- `uploads/projects`
- `uploads/reports`
- `uploads/documents`
- `uploads/careers`
- `uploads/logos`

The upload layer validates file size and MIME type, generates unique filenames, and stores relative paths in Firestore.

## Email

SMTP is configured with:

- `SMTP_HOST`
- `SMTP_PORT`
- `SMTP_USER`
- `SMTP_PASS`
- `SMTP_FROM`

If SMTP is not configured, email sends are skipped with a warning so local development does not crash.

## Required Environment Variables

Use `.env` as the single runtime environment file and configure:

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

Use either the split Firebase Admin variables or `FIREBASE_SERVICE_ACCOUNT_JSON`; do not use both.

## Setup Commands

- `npm install`
- `npm run seed:admin`
- `npm run seed:data`
- `npm run lint`
- `npm run build`
