# Horexa Solutions Production Audit Report

Date: 2026-06-26

## Executive Status

The Horexa Solutions project is an existing Next.js + Prisma application that already implements the PRD's three major product areas: public marketing website, AMC client portal, and admin CMS/API surface.

This report reflects the latest production-readiness pass. The project has working public pages, protected admin/portal route shells, API foundations, Prisma schema, public form hardening, upload validation, optimized WebP assets, route-level SEO metadata, and Hostinger deployment documentation.

## Latest Fixes Completed

- Fixed protected route runtime failure when `NEXTAUTH_SECRET` or Google OAuth credentials are missing in local/staging environments.
- Google OAuth provider is now enabled only when both `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` are configured.
- Added explicit NextAuth secret wiring for API auth and middleware.
- Converted supplied JPEG assets to optimized WebP files and updated app references to WebP.
- Replaced CSS background image rendering in hero, portal login, featured blog card, and about/team cards with responsive `next/image` usage.
- Added route-specific metadata, canonical URLs, OpenGraph, and Twitter metadata for public pages and service detail pages.
- Added noindex metadata for the portal login route.
- Added Hostinger deployment guide with runtime, build, start, environment, database, OAuth, Cloudinary, and smoke-test instructions.
- Added `hostinger:build`, `hostinger:start`, Node engine metadata, and `seed:admin` package scripts.
- Added a secure `scripts/seed-admin.mjs` utility for the first production super-admin account.
- Expanded `.env.example` with `NEXT_PUBLIC_SITE_URL`, optional `RECAPTCHA_SECRET_KEY`, and one-time admin seed variables.
- Verified protected routes now redirect to `/portal/login` instead of failing with a NextAuth configuration error.

## Implemented Features

- Public website pages: Home, About, Services, dynamic Service Details, AMC Plans, Projects, Blog, Careers, Contact.
- Client portal pages: Login, Dashboard, Inspections, Reports, Compliance, Documents, AMC, Team Access, Invoices, Support Tickets, Settings.
- Admin panel pages: dashboard plus Services, Projects, AMC, Inquiries, Blog, Careers, Clients, Inspections, Testimonials, SEO, Settings, Users.
- Database schema: Users, Admins, Clients, Services, Projects, AMCPlans, Inquiries, BlogPosts, Categories, Applications, Testimonials, InspectionReports, ComplianceRecords, Documents, Invoices, Tickets, Notifications.
- Authentication foundation: NextAuth, Google OAuth provider, credentials login, OTP token generation, password reset APIs, role-based middleware for admin and portal routes.
- SEO foundation: metadata, Open Graph/Twitter defaults, dynamic sitemap, robots exclusions for admin/portal/API, JSON-LD components.
- File management foundation: Cloudinary upload helper and protected upload API.

## Fixes Completed In This Pass

- Replaced placeholder portal login buttons with a working client login flow.
- Added real OTP session creation through the NextAuth credentials provider.
- Added password reset request/confirm UI handling on the portal login page.
- Wired Google login button to NextAuth.
- Added rate limiting to public inquiry and career application submissions.
- Added honeypot spam protection and optional reCAPTCHA verification when `RECAPTCHA_SECRET_KEY` is configured.
- Preserved the selected service from contact/AMC inquiry forms in stored inquiry notes.
- Added public career application submission with multipart resume upload.
- Added upload validation for PDF, DOC, DOCX, PNG, JPG, and WEBP with a 10MB limit.
- Restricted career resume uploads to PDF, DOC, and DOCX.
- Hardened Nodemailer usage by sanitizing header values and disabling file/URL access in outbound email sends.

## PRD Gap Analysis By Page

| Page | PRD Requirement | Current Status | Missing Work | Priority |
| --- | --- | --- | --- | --- |
| Home | Hero, services, why choose us, before/after, AMC, process, stats, testimonials, CTA, footer | Implemented | Replace stock/reference content with final client assets and metrics | Medium |
| About | company story, mission/vision, values, safety standards, team, stats, CTA | Implemented | Real team photography and final company facts | Medium |
| Services | seven services, cards, filters/tabs, detail links | Implemented | CMS-backed live data optional after DB seeding | Medium |
| Service Details | dynamic pages with benefits, checklist, process, industries, FAQ, sticky CTA | Implemented | Brochure download asset not supplied | Medium |
| AMC Plans | plan cards, comparison, recommended badge, process, inquiry CTA | Implemented | Final pricing to be confirmed by Horexa | High before launch |
| Projects | before/after project cards and filters | Implemented | Real project before/after images required | High before launch |
| Blog | search, categories, featured/latest/popular/newsletter/pagination | Implemented as static content hub | Newsletter persistence is not yet backed by a database model | Medium |
| Careers | jobs, benefits, culture, resume drop | Implemented and form now submits | Final HR email/process confirmation | Medium |
| Contact | contact form, direct details, service areas, WhatsApp, map | Implemented | Real map embed/location confirmation | Medium |
| Portal | login plus dashboard/modules | Implemented and protected | Requires seeded client users and live database | High before launch |
| Admin | CMS/operations modules | Implemented and protected | Requires seeded admin users and real operational data | High before launch |

## Security Review

- Admin routes require `SUPER_ADMIN`, `ADMIN`, `EDITOR`, or `OPERATIONS`.
- Portal routes require an authenticated role.
- Passwords use bcrypt hashes.
- OTP tokens expire after 5 minutes and are consumed on successful login.
- Public forms now include rate limiting, honeypot checks, and optional reCAPTCHA.
- Uploads now validate MIME type and max size before Cloudinary upload.
- Security headers are configured globally in `next.config.ts`.
- Robots excludes admin, portal, and API URLs.

Remaining security blockers:

- `npm audit` reports a high-severity Nodemailer advisory through the current `next-auth` dependency graph with no available fix from npm audit. App-level email mitigations are present, but dependency replacement or upstream patch tracking is required before final security sign-off.
- Production deployment must enforce HTTPS at the hosting/proxy layer.
- `NEXTAUTH_SECRET`, Google OAuth credentials, SMTP credentials, Cloudinary credentials, database URL, and optional `RECAPTCHA_SECRET_KEY` must be configured in production.

## Database Review

- Required PRD models are present.
- Core relations exist between clients, AMC plans, inquiries, applications, reports, compliance records, documents, invoices, and tickets.
- Useful indexes are present on roles, statuses, slugs, dates, category fields, and client/report relationships.

Remaining database work:

- Apply migrations or `prisma db push` against the production PostgreSQL database.
- Seed at least one super admin, initial CMS content, AMC plans, service categories, and sample portal client records.

## API Review

- Admin CRUD APIs exist for the major PRD modules.
- Portal APIs exist for dashboard, reports, documents, invoices, and tickets.
- Public APIs exist for inquiries and applications.
- Upload API is protected and validates files.

Remaining API work:

- Newsletter subscription persistence is not implemented as a dedicated model/API.
- External CAPTCHA verification requires `RECAPTCHA_SECRET_KEY`.

## SEO Review

- Sitemap and robots are implemented.
- Metadata and social defaults are implemented.
- JSON-LD support exists for LocalBusiness, Service, Article, and FAQ usage.

Remaining SEO work:

- Final keyword-tuned titles/descriptions should be reviewed after the exact domain and service-city landing strategy are confirmed.
- Google Search Console submission is external to the codebase.

## Performance Review

- Production build succeeds.
- Next image formats are configured for AVIF/WebP.
- Static pages are pre-rendered where possible.
- Portal/admin bundles are route split by Next.js.

Remaining performance work:

- Lighthouse scores were not run in this pass because no live browser audit target was provided.
- Final performance validation should be run against the deployed production URL with real assets.

## Verification

- `npm run lint`: passed.
- `npx tsc --noEmit`: passed.
- `npm run build`: passed.
- `npm audit --audit-level=moderate`: failed due to Nodemailer advisories with no npm-provided fix path.
- Local public route smoke tests passed for `/`, `/services`, `/projects`, `/amc-plans`, `/blog`, `/careers`, `/contact`, `/sitemap.xml`, and `/robots.txt`.
- Local protected route smoke tests passed for `/admin` and `/portal/dashboard`: both return `307` redirect to `/portal/login` when unauthenticated.
- Local `/portal/login` smoke test returned `200`.

## Deployment Readiness

Ready for staging deployment after environment variables are configured and the database is provisioned.

Not ready for final production sign-off until:

- Real brand/project/team assets are supplied.
- AMC pricing and contact/map details are confirmed.
- Production database is migrated and seeded.
- OAuth, SMTP, Cloudinary, and optional reCAPTCHA credentials are configured and smoke-tested.
- The unresolved Nodemailer advisory is accepted with compensating controls or resolved by a dependency/provider change.
- Lighthouse and route smoke tests are run against the deployed staging/production URL.
