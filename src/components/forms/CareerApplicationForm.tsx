"use client";

import type React from "react";
import { useState } from "react";
import { Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export function CareerApplicationForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setMessage("");

    const formData = new FormData(event.currentTarget);

    try {
      const response = await fetch("/api/public/applications", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const body = (await response.json().catch(() => null)) as { error?: string } | null;
        throw new Error(body?.error ?? "Unable to submit application");
      }

      event.currentTarget.reset();
      setStatus("success");
      setMessage("Application submitted. Horexa will review your profile and contact you if there is a fit.");
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Unable to submit application. Please try again.");
    }
  }

  return (
    <Card className="p-6 md:p-8">
      <h2 className="text-h3 font-black">Don&apos;t See the Right Role?</h2>
      <p className="mt-2 text-sm text-muted-foreground">Send your resume for future technician, supervisor, sales or operations openings.</p>
      <form className="mt-6 flex flex-col gap-5" onSubmit={handleSubmit}>
        <div className="grid gap-5 md:grid-cols-2">
          <div className="flex flex-col gap-2">
            <Label htmlFor="career-name">Name</Label>
            <Input id="career-name" name="fullName" placeholder="Aman Verma" required />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="career-email">Email</Label>
            <Input id="career-email" name="email" type="email" placeholder="aman@example.com" required />
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
          <div className={status === "success" ? "rounded-lg border border-success/30 bg-success/10 p-4 text-sm text-success" : "rounded-lg border border-warning/30 bg-warning/10 p-4 text-sm text-warning"}>
            {message}
          </div>
        ) : null}

        <Button type="submit" disabled={status === "submitting"}>
          {status === "submitting" ? "Submitting..." : "Submit Profile"}
        </Button>
      </form>
    </Card>
  );
}
