"use client";

import type React from "react";
import { useState } from "react";
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
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setMessage("");

    const formData = new FormData(event.currentTarget);
    const payload = {
      fullName: String(formData.get("name") ?? ""),
      businessName: String(formData.get("business") ?? ""),
      email: String(formData.get("email") ?? ""),
      phone: String(formData.get("phone") ?? ""),
      city: String(formData.get("city") ?? ""),
      service: String(formData.get("service") ?? ""),
      message: String(formData.get("message") ?? ""),
      sourcePage: typeof window !== "undefined" ? window.location.pathname : "website",
    };

    try {
      const response = await fetch("/api/public/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Unable to submit inquiry");
      }

      event.currentTarget.reset();
      setStatus("success");
      setMessage("Inquiry sent successfully. Horexa will contact you shortly.");
    } catch {
      setStatus("error");
      setMessage("Something went wrong. Please call or WhatsApp Horexa directly.");
    }
  }

  return (
    <form className="surface-card flex flex-col gap-5 p-6 md:p-8" onSubmit={handleSubmit}>
      <div>
        <h2 className="text-h3 font-black">Send an Inquiry</h2>
        <p className="mt-2 text-sm text-muted-foreground">Share your site type, city and service need. Horexa will respond with the next inspection step.</p>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <Field label="Your Name *" htmlFor="name">
          <Input id="name" name="name" placeholder="Rahul Mehra" required />
        </Field>
        <Field label="Business Name *" htmlFor="business">
          <Input id="business" name="business" placeholder="Taj Business Hotel" required />
        </Field>
        <Field label="Email Address *" htmlFor="email">
          <Input id="email" name="email" type="email" placeholder="operations@hotel.com" required />
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

      {message ? (
        <div className={status === "success" ? "rounded-lg border border-success/30 bg-success/10 p-4 text-sm text-success" : "rounded-lg border border-warning/30 bg-warning/10 p-4 text-sm text-warning"}>
          {message}
        </div>
      ) : null}

      <Button type="submit" size="lg" disabled={status === "submitting"}>
        {status === "submitting" ? "Sending..." : "Send Inquiry"}
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
