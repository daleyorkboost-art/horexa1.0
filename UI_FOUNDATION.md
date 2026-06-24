# Horexa Solutions UI Foundation

This scaffold implements the reusable design system and component structure only. Route pages are intentionally not created yet.

## Stack

- Next.js 15 App Router
- TypeScript
- Tailwind CSS
- shadcn-style local UI primitives
- Framer Motion
- Lucide Icons

## Design Direction

- Premium dark industrial theme inspired by the supplied Horexa references.
- Near-black background with dark navy sections and card surfaces.
- Primary orange accent for active nav, CTAs, badges, focus rings, and glow hover states.
- Inter typography with responsive hero, H2, H3, and 16px body text scales.

## Component Structure

- `src/components/layout`: `Navbar`, `Footer`
- `src/components/sections`: `HeroSection`, `SectionHeading`, `CTASection`
- `src/components/cards`: `ServiceCard`, `ProjectCard`, `BlogCard`, `TestimonialCard`, `FeatureCard`, `AMCPricingCard`
- `src/components/interactive`: `AnimatedCounter`, `Timeline`, `FAQAccordion`, `BeforeAfterSlider`
- `src/components/forms`: `ContactForm`
- `src/components/ui`: shadcn-compatible primitives used by the foundation
- `src/lib/design-system.ts`: brand token constants
- `src/lib/navigation.ts`: shared nav, service, and service-area lists

## Notes

- Components are mobile-first and use touch-friendly control sizing.
- Route pages, CMS wiring, portal dashboards, and admin screens are intentionally deferred.
- Forms are visual foundations only; server actions, CAPTCHA, validation schemas, and notifications should be added with page implementation.
