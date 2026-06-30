import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { BrandLogo } from "@/components/layout/BrandLogo";
import { serviceAreas, serviceLinks } from "@/lib/navigation";

export function Footer() {
  return (
    <footer className="border-t border-border/80 bg-[#07080b]">
      <div className="industrial-container grid gap-10 py-14 md:grid-cols-[1.2fr_1fr_1fr_1fr]">
        <div className="flex flex-col gap-4">
          <Link href="/" className="flex w-fit items-center" aria-label="Horexa Solutions home">
            <BrandLogo className="w-48" />
          </Link>
          <p className="max-w-sm text-sm leading-7 text-muted-foreground">
            Premium kitchen hygiene, exhaust cleaning, compliance reporting, and AMC maintenance for
            hospitality spaces across India.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-sm font-black uppercase tracking-[0.14em]">Services</h3>
          {serviceLinks.slice(0, 5).map((service) => (
            <Link key={service} href="/services" className="text-sm text-muted-foreground transition hover:text-primary">
              {service}
            </Link>
          ))}
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-sm font-black uppercase tracking-[0.14em]">Service Areas</h3>
          {serviceAreas.map((area) => (
            <span key={area} className="text-sm text-muted-foreground">
              {area}
            </span>
          ))}
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="text-sm font-black uppercase tracking-[0.14em]">Contact</h3>
          <a className="flex gap-3 text-sm text-muted-foreground transition hover:text-primary" href="tel:+919876543210">
            <Phone className="mt-0.5 shrink-0 text-primary" aria-hidden />
            +91 98765 43210
          </a>
          <a
            className="flex gap-3 text-sm text-muted-foreground transition hover:text-primary"
            href="mailto:info@horexasolutions.com"
          >
            <Mail className="mt-0.5 shrink-0 text-primary" aria-hidden />
            info@horexasolutions.com
          </a>
          <span className="flex gap-3 text-sm text-muted-foreground">
            <MapPin className="mt-0.5 shrink-0 text-primary" aria-hidden />
            Mon-Sat, 9:00 AM - 7:00 PM
          </span>
        </div>
      </div>

      <div className="border-t border-border/70 py-5">
        <div className="industrial-container flex flex-col gap-3 text-xs text-muted-foreground md:flex-row md:items-center md:justify-between">
          <span>© 2026 Horexa Solutions. All Rights Reserved.</span>
          <div className="flex gap-5">
            <Link href="/privacy-policy" className="hover:text-primary">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-primary">
              Terms & Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
