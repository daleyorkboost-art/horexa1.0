# Horexa Solutions Hostinger Deployment

## Runtime

- Node.js: `20.x` or newer
- npm: `10.x` or newer
- App type: Node.js application
- Build command: `npm ci && npm run hostinger:build`
- Start command: `npm run hostinger:start -- -p $PORT`
- Application root: repository root

## Required Environment Variables

Configure these in Hostinger before building:

```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE?sslmode=require"
NEXTAUTH_URL="https://your-domain.com"
NEXTAUTH_SECRET="generate-a-strong-random-secret"
NEXT_PUBLIC_SITE_URL="https://your-domain.com"

GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""

SMTP_HOST=""
SMTP_PORT="587"
SMTP_USER=""
SMTP_PASS=""
SMTP_FROM="Horexa Solutions <noreply@your-domain.com>"

CLOUDINARY_CLOUD_NAME=""
CLOUDINARY_API_KEY=""
CLOUDINARY_API_SECRET=""

RECAPTCHA_SECRET_KEY=""

SEED_ADMIN_EMAIL="admin@your-domain.com"
SEED_ADMIN_PASSWORD="use-a-12-plus-character-password"
SEED_ADMIN_NAME="Horexa Super Admin"
```

## Database Setup

1. Provision PostgreSQL.
2. Set `DATABASE_URL`.
3. Run one of the following from the deployed app shell:

```bash
npm run db:push
```

Use `prisma migrate deploy` instead once migration files are introduced.

Seed the first admin account:

```bash
npm run seed:admin
```

## OAuth Setup

In Google Cloud Console, add:

- Authorized JavaScript origin: `https://your-domain.com`
- Authorized redirect URI: `https://your-domain.com/api/auth/callback/google`

Google OAuth is optional. If credentials are not configured, the app disables Google login instead of failing protected routes.

## Cloudinary Setup

Cloudinary is required for production uploads:

- Admin/media uploads
- Career resume uploads
- Client documents and reports

Without Cloudinary credentials, upload endpoints will fail by design.

## Smoke Tests After Deploy

```bash
curl -I https://your-domain.com/
curl -I https://your-domain.com/services
curl -I https://your-domain.com/amc-plans
curl -I https://your-domain.com/blog
curl -I https://your-domain.com/contact
curl -I https://your-domain.com/sitemap.xml
curl -I https://your-domain.com/robots.txt
```

Protected routes should redirect to login when unauthenticated:

```bash
curl -I https://your-domain.com/admin
curl -I https://your-domain.com/portal/dashboard
```

Expected result: `307` or `302` redirect to `/portal/login`, not a `500`.

## Production Notes

- Enforce HTTPS in Hostinger/domain settings.
- Set `NEXTAUTH_URL` and `NEXT_PUBLIC_SITE_URL` to the exact production domain.
- Seed at least one `SUPER_ADMIN` user before handing over admin access.
- Replace remaining reference images with final Horexa project/team/location photography when supplied.
