# Horexa Backend Architecture

This backend layer is designed for PostgreSQL + Prisma, NextAuth, Nodemailer, and Cloudinary.

## Core Files

- `prisma/schema.prisma`: database schema for auth, public CMS, AMC portal, admin operations, reports, tickets, documents, and notifications.
- `prisma.config.ts`: Prisma 7 datasource configuration.
- `src/lib/db.ts`: Prisma Client singleton using `@prisma/adapter-pg`.
- `src/lib/auth/options.ts`: NextAuth v4 config with Credentials + Google providers.
- `src/lib/auth/rbac.ts`: role guards for admin, super admin, and client routes.
- `src/lib/validators/admin.ts`: Zod schemas for API request validation.
- `src/lib/api/crud.ts`: reusable CRUD route handler factory with pagination, filters, validation, and RBAC.
- `src/lib/email/*`: Nodemailer transport and workflow emails.
- `src/lib/storage/cloudinary.ts`: Cloudinary upload helper.

## API Surfaces

### Auth

- `GET/POST /api/auth/[...nextauth]`

### Public

- `POST /api/public/inquiries`
- `POST /api/public/applications`

### Admin Dashboard

- `GET /api/admin/dashboard`

### Admin CRUD

Each collection has:

- `GET /api/admin/<resource>?take=20&skip=0&status=ACTIVE`
- `POST /api/admin/<resource>`
- `GET /api/admin/<resource>/<id>`
- `PATCH /api/admin/<resource>/<id>`
- `DELETE /api/admin/<resource>/<id>`

Resources:

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

### Portal APIs

- `GET /api/portal/dashboard`
- `GET /api/portal/reports`
- `GET /api/portal/documents`
- `GET/POST /api/portal/tickets`

### Uploads

- `POST /api/upload` with multipart `file` and optional `folder`.

## RBAC

Roles:

- `SUPER_ADMIN`
- `ADMIN`
- `EDITOR`
- `OPERATIONS`
- `CLIENT`

Admin CRUD routes require admin-level roles. User creation/deletion requires `SUPER_ADMIN`. Portal APIs allow `CLIENT` plus operational/admin roles.

## Email Workflows

Implemented workflows:

- Inquiry acknowledgement to visitor.
- New inquiry notification to admin inbox.
- Inspection report ready notification.
- Application acknowledgement.

SMTP is optional at runtime. If SMTP env vars are missing, email sends are skipped with a warning.

## Required Environment Variables

Copy `.env.example` to `.env.local` and configure:

- `DATABASE_URL`
- `NEXTAUTH_URL`
- `NEXTAUTH_SECRET`
- `GOOGLE_CLIENT_ID`
- `GOOGLE_CLIENT_SECRET`
- `SMTP_HOST`
- `SMTP_PORT`
- `SMTP_USER`
- `SMTP_PASS`
- `SMTP_FROM`
- `CLOUDINARY_CLOUD_NAME`
- `CLOUDINARY_API_KEY`
- `CLOUDINARY_API_SECRET`

## Database Commands

- `npm run db:generate`
- `npm run db:push`
- `npm run db:migrate`
- `npm run db:studio`
