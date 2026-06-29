"use client";

import type React from "react";
import { useState } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { getCaptchaToken } from "@/lib/security/recaptcha-client";

type ContactFormProps = {
  services?: { id: string; title: string }[];
  amcPlans?: { id: string; name: string }[];
  sourcePage?: string;
  defaultService?: string;
  mode?: "contact" | "inspection" | "amc";
};

type FormState = "idle" | "loading" | "success" | "error";

export function ContactForm({
  services = [],
  amcPlans = [],
  sourcePage = "/contact",
  defaultService,
  mode = "contact",
}: ContactFormProps) {
  const [state, setState] = useState<FormState>("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("loading");
    setMessage("");

    const formData = new FormData(event.currentTarget);
    const fullName = String(formData.get("fullName") ?? "").trim();
    const businessName = String(formData.get("businessName") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const phone = String(formData.get("phone") ?? "").trim();
    const city = String(formData.get("city") ?? "").trim();
    const userMessage = String(formData.get("message") ?? "").trim();

    if (!fullName || !businessName || !email || !phone || !city || !userMessage) {
      setState("error");
      setMessage("Please complete all required fields.");
      return;
    }

    try {
      const captchaToken = await getCaptchaToken("public_inquiry");
      const response = await fetch("/api/public/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName,
          businessName,
          email,
          phone,
          city,
          message: userMessage,
          serviceId: formData.get("serviceId") || undefined,
          amcPlanId: formData.get("amcPlanId") || undefined,
          serviceRequired: formData.get("serviceRequired") || defaultService || mode,
          sourcePage,
          website: formData.get("website"),
          captchaToken,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result?.error?.message ?? result?.error ?? "Inquiry submission failed");
      }

      setState("success");
      setMessage("Inquiry received. Horexa will contact you with the next inspection step.");
      event.currentTarget.reset();
    } catch (error) {
      setState("error");
      setMessage(error instanceof Error ? error.message : "Inquiry submission failed. Please try again.");
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
          <Input id="name" name="fullName" placeholder="Your name" required minLength={2} />
        </Field>
        <Field label="Business Name *" htmlFor="business">
          <Input id="business" name="businessName" placeholder="Hotel, restaurant or kitchen name" required minLength={2} />
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
            name="serviceId"
            className="flex min-h-12 w-full rounded-lg border border-border bg-input px-4 py-3 text-base text-foreground shadow-sm transition focus-visible:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/25"
            defaultValue=""
          >
            <option value="">Select service</option>
            {services.map((service) => (
              <option key={service.id} value={service.id}>
                {service.title}
              </option>
            ))}
          </select>
        </Field>
        {mode === "amc" ? (
          <Field label="AMC Plan" htmlFor="amcPlan">
            <select
              id="amcPlan"
              name="amcPlanId"
              className="flex min-h-12 w-full rounded-lg border border-border bg-input px-4 py-3 text-base text-foreground shadow-sm transition focus-visible:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/25"
              defaultValue=""
            >
              <option value="">Select AMC plan</option>
              {amcPlans.map((plan) => (
                <option key={plan.id} value={plan.id}>
                  {plan.name}
                </option>
              ))}
            </select>
          </Field>
        ) : null}
        <Field label="Location / City *" htmlFor="city">
          <Input id="city" name="city" placeholder="Delhi NCR" required />
        </Field>
      </div>

      <Field label="Your Message *" htmlFor="message">
        <Textarea id="message" name="message" placeholder="Share kitchen type, operating hours, audit date and any visible exhaust or odour issues." required minLength={10} />
      </Field>
      <input type="hidden" name="serviceRequired" value={defaultService ?? mode} />
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

      {message ? (
        <div
          className={`rounded-lg border p-4 text-sm leading-6 ${
            state === "error" ? "border-destructive/40 bg-destructive/10 text-destructive" : "border-green-500/40 bg-green-500/10 text-green-300"
          }`}
          role="status"
        >
          {message}
        </div>
      ) : null}

      <Button type="submit" size="lg" disabled={state === "loading"}>
        {state === "loading" ? "Sending..." : "Send Inquiry"}
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
