"use client";

import type React from "react";
import { Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export function CareerApplicationForm() {
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
  }

  return (
    <Card className="p-6 md:p-8">
      <h2 className="text-h3 font-black">Don&apos;t See the Right Role?</h2>
      <p className="mt-2 text-sm text-muted-foreground">Send your resume for future technician, supervisor, sales or operations openings.</p>
      <form className="mt-6 flex flex-col gap-5" onSubmit={handleSubmit}>
        <div className="grid gap-5 md:grid-cols-2">
          <div className="flex flex-col gap-2">
            <Label htmlFor="career-name">Name</Label>
            <Input id="career-name" name="fullName" placeholder="Your name" required />
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

        <div className="rounded-lg border border-border bg-background/55 p-4 text-sm leading-6 text-muted-foreground">
          Static form preview. Resume upload and application tracking will be connected in a later phase.
        </div>

        <Button type="submit">Submit Profile</Button>
      </form>
    </Card>
  );
}
