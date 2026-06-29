"use client";

import type React from "react";
import { useState } from "react";
import { Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { getCaptchaToken } from "@/lib/security/recaptcha-client";

type CareerApplicationFormProps = {
  careers?: { id: string; title: string; location: string }[];
};

type FormState = "idle" | "loading" | "success" | "error";

export function CareerApplicationForm({ careers = [] }: CareerApplicationFormProps) {
  const [state, setState] = useState<FormState>("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("loading");
    setMessage("");

    const form = event.currentTarget;
    const formData = new FormData(form);
    const fullName = String(formData.get("fullName") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();

    if (!fullName || !email) {
      setState("error");
      setMessage("Please enter your name and email.");
      return;
    }

    try {
      formData.set("captchaToken", await getCaptchaToken("career_application"));
      const response = await fetch("/api/public/applications", {
        method: "POST",
        body: formData,
      });
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result?.error?.message ?? result?.error ?? "Application submission failed");
      }

      setState("success");
      setMessage("Application received. Horexa's hiring team will review your profile.");
      form.reset();
    } catch (error) {
      setState("error");
      setMessage(error instanceof Error ? error.message : "Application submission failed. Please try again.");
    }
  }

  return (
    <Card className="p-6 md:p-8">
      <h2 className="text-h3 font-black">Don&apos;t See the Right Role?</h2>
      <p className="mt-2 text-sm text-muted-foreground">Send your resume for future technician, supervisor, sales or operations openings.</p>
      <form className="mt-6 flex flex-col gap-5" onSubmit={handleSubmit}>
        {careers.length ? (
          <div className="flex flex-col gap-2">
            <Label htmlFor="career-role">Role</Label>
            <select
              id="career-role"
              name="careerId"
              className="flex min-h-12 w-full rounded-lg border border-border bg-input px-4 py-3 text-base text-foreground shadow-sm transition focus-visible:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/25"
              defaultValue=""
            >
              <option value="">Open application</option>
              {careers.map((career) => (
                <option key={career.id} value={career.id}>
                  {career.title} - {career.location}
                </option>
              ))}
            </select>
          </div>
        ) : null}
        <div className="grid gap-5 md:grid-cols-2">
          <div className="flex flex-col gap-2">
            <Label htmlFor="career-name">Name</Label>
            <Input id="career-name" name="fullName" placeholder="Your name" required minLength={2} />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="career-email">Email</Label>
            <Input id="career-email" name="email" type="email" placeholder="name@example.com" required />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="career-phone">Phone</Label>
          <Input id="career-phone" name="phone" type="tel" placeholder="+91 98765 43210" />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="career-message">Message</Label>
          <Textarea id="career-message" name="message" placeholder="Share your city, field experience and preferred role." />
        </div>
        <label className="flex min-h-28 cursor-pointer flex-col items-center justify-center gap-3 rounded-lg border border-dashed border-primary/45 bg-primary/5 text-center text-sm text-muted-foreground transition hover:bg-primary/10">
          <Upload className="text-primary" aria-hidden />
          Upload Resume (PDF/DOC/DOCX, max 10MB)
          <input type="file" name="resume" className="sr-only" accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document" />
        </label>
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

        <Button type="submit" disabled={state === "loading"}>
          {state === "loading" ? "Submitting..." : "Submit Profile"}
        </Button>
      </form>
    </Card>
  );
}
