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
NEXT_PUBLIC_SITE_URL="https://your-domain.com"

NEXT_PUBLIC_FIREBASE_API_KEY="AIzaSyCCCqCYfGjJ8t9yotJV4ROYqINLUN3bd88"
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN="horexa-df7ec.firebaseapp.com"
NEXT_PUBLIC_FIREBASE_PROJECT_ID="horexa-df7ec"
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET="horexa-df7ec.firebasestorage.app"
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID="1013205942586"
NEXT_PUBLIC_FIREBASE_APP_ID="1:1013205942586:web:4c3e9c285ce5474d199003"
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID="G-WM1DF2Z3BV"

FIREBASE_PROJECT_ID="horexa-df7ec"
FIREBASE_CLIENT_EMAIL=""
FIREBASE_PRIVATE_KEY=""
# Or use this instead of the three variables above:
FIREBASE_SERVICE_ACCOUNT_JSON=""

SMTP_HOST=""
SMTP_PORT="587"
SMTP_USER=""
SMTP_PASS=""
SMTP_FROM="Horexa Solutions <noreply@your-domain.com>"

NEXT_PUBLIC_RECAPTCHA_SITE_KEY=""
RECAPTCHA_SECRET_KEY=""

SEED_ADMIN_EMAIL="admin@your-domain.com"
SEED_ADMIN_PASSWORD="use-a-12-plus-character-password"
SEED_ADMIN_NAME="Horexa Super Admin"
```

Do not commit the Firebase service account JSON. Store it only in Hostinger environment variables.

## Firebase Setup

1. Enable Firebase Authentication providers needed for launch:
   - Email/password
   - Google
   - Phone, only if OTP phone login is required and enabled for the project
2. Add authorized domains:
   - `localhost` for local development
   - your production domain
3. Create Firestore in production mode.
4. Add the Firebase Admin service account credentials to the deployment environment.
5. Seed the first admin:

```bash
npm run seed:admin
```

6. Seed starter public content if needed:

```bash
npm run seed:data
```

## Upload Storage

Uploads are stored locally under `uploads/`. On Hostinger, ensure this directory is writable by the Node.js application process and included in backup strategy.

Recommended folders:

- `uploads/services`
- `uploads/blogs`
- `uploads/projects`
- `uploads/reports`
- `uploads/documents`
- `uploads/careers`
- `uploads/logos`

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
- Set `NEXT_PUBLIC_SITE_URL` to the exact production domain.
- Keep Firebase Admin credentials private.
- Seed at least one `SUPER_ADMIN` user before handing over admin access.
- Configure SMTP before testing public forms.
- Replace remaining reference images with final Horexa project/team/location photography when supplied.
