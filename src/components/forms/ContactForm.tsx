"use client";

import type React from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const services = [
  "Kitchen Exhaust Duct Cleaning",
  "Hood & Filter Cleaning",
  "Ventilation Hygiene",
  "Water Tank Cleaning",
  "AMC Maintenance Contracts",
  "General Inquiry",
];

export function ContactForm() {
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
  }

  return (
    <form className="surface-card flex flex-col gap-5 p-6 md:p-8" onSubmit={handleSubmit}>
      <div>
        <h2 className="text-h3 font-black">Send an Inquiry</h2>
        <p className="mt-2 text-sm text-muted-foreground">Share your site type, city and service need. Horexa will respond with the next inspection step.</p>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <Field label="Your Name *" htmlFor="name">
          <Input id="name" name="name" placeholder="Your name" required />
        </Field>
        <Field label="Business Name *" htmlFor="business">
          <Input id="business" name="business" placeholder="Hotel, restaurant or kitchen name" required />
        </Field>
        <Field label="Email Address *" htmlFor="email">
          <Input id="email" name="email" type="email" placeholder="name@company.com" required />
        </Field>
        <Field label="Phone Number *" htmlFor="phone">
          <Input id="phone" name="phone" type="tel" placeholder="+91 98765 43210" required />
        </Field>
        <Field label="Service Required" htmlFor="service">
          <select
            id="service"
            name="service"
            className="flex min-h-12 w-full rounded-lg border border-border bg-input px-4 py-3 text-base text-foreground shadow-sm transition focus-visible:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/25"
          >
            {services.map((service) => (
              <option key={service}>{service}</option>
            ))}
          </select>
        </Field>
        <Field label="Location / City *" htmlFor="city">
          <Input id="city" name="city" placeholder="Delhi NCR" required />
        </Field>
      </div>

      <Field label="Your Message *" htmlFor="message">
        <Textarea id="message" name="message" placeholder="Share kitchen type, operating hours, audit date and any visible exhaust or odour issues." required />
      </Field>
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

      <div className="rounded-lg border border-border bg-background/55 p-4 text-sm leading-6 text-muted-foreground">
        Static form preview. Backend submission, CAPTCHA, and notifications will be connected in a later phase.
      </div>

      <Button type="submit" size="lg">
        Send Inquiry
        <Send data-icon="inline-end" />
      </Button>
    </form>
  );
}

function Field({
  label,
  htmlFor,
  children,
}: {
  label: string;
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor={htmlFor}>{label}</Label>
      {children}
    </div>
  );
}
