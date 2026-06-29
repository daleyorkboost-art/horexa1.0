import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { ShieldCheck, BarChart3, FileText, Headphones } from "lucide-react";
import { Card } from "@/components/ui/card";
import { PortalLoginForm } from "@/components/portal/PortalLoginForm";
import { images } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Client Portal Login",
  description: "Secure Horexa AMC client portal login for inspection reports, compliance records, invoices, documents and support tickets.",
  robots: {
    index: false,
    follow: false,
  },
};

const loginFeatures = [
  { title: "100% Compliance Focused", detail: "Stay aligned with fire safety and hygiene regulations.", icon: ShieldCheck },
  { title: "Smart AMC Management", detail: "Track AMC details, due dates, and service history.", icon: FileText },
  { title: "Detailed Reports", detail: "Access inspection reports, photos, and recommendations.", icon: BarChart3 },
  { title: "Dedicated Support", detail: "Reach Horexa support when your kitchen needs help.", icon: Headphones },
];

export default function PortalLoginPage() {
  return (
    <main className="grid min-h-screen bg-secondary text-foreground lg:grid-cols-[0.95fr_1.05fr]">
      <section className="relative hidden overflow-hidden border-r border-border lg:block">
        <Image
          src={images.contact}
          alt=""
          fill
          priority
          sizes="50vw"
          className="object-cover"
          aria-hidden
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(13,13,13,0.96),rgba(13,13,13,0.62))]" />
        <div className="relative z-10 flex min-h-screen flex-col justify-between p-10">
          <Link href="/" className="flex flex-col leading-none">
            <span className="text-3xl font-black uppercase tracking-[0.12em]">
              Hore<span className="text-primary">x</span>a
            </span>
            <span className="mt-2 text-xs font-bold uppercase tracking-[0.12em] text-muted-foreground">
              Clean Air. <span className="text-primary">Safe Kitchens.</span>
            </span>
          </Link>

          <div className="max-w-xl">
            <h1 className="text-hero font-black">
              Professional Hygiene. Assured <span className="text-primary">Compliance.</span>
            </h1>
            <p className="mt-6 text-base leading-8 text-muted-foreground">
              Manage your AMC, view inspection reports, track compliance, and ensure your kitchen is always safe and audit-ready.
            </p>
            <div className="mt-10 flex flex-col gap-5">
              {loginFeatures.map((feature) => {
                const Icon = feature.icon;
                return (
                  <div key={feature.title} className="flex gap-4">
                    <div className="flex size-11 shrink-0 items-center justify-center rounded-lg border border-primary/30 bg-primary/10 text-primary">
                      <Icon aria-hidden />
                    </div>
                    <div>
                      <h2 className="font-black">{feature.title}</h2>
                      <p className="text-sm text-muted-foreground">{feature.detail}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="rounded-xl border border-success/30 bg-success/10 p-4">
            <p className="font-black text-success">Secure Login</p>
            <p className="mt-1 text-sm text-muted-foreground">Your data is safe with us and never shared with anyone.</p>
          </div>
        </div>
      </section>

      <section className="flex min-h-screen items-center justify-center px-4 py-12">
        <Card className="w-full max-w-md p-7 md:p-9">
          <div className="text-center">
            <h2 className="text-h3 font-black">AMC Report Login</h2>
            <p className="mt-2 text-sm text-muted-foreground">Welcome back! Please login to your account.</p>
          </div>

          <PortalLoginForm />

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Don&apos;t have an account? <Link href="/contact" className="font-bold text-primary">Contact Support</Link>
          </p>
        </Card>
      </section>
    </main>
  );
}
