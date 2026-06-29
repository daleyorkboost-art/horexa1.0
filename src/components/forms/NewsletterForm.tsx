"use client";

import type React from "react";
import { useState } from "react";
import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type FormState = "idle" | "loading" | "success" | "error";

export function NewsletterForm() {
  const [state, setState] = useState<FormState>("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("loading");
    setMessage("");

    const formData = new FormData(event.currentTarget);

    try {
      const response = await fetch("/api/public/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.get("email"),
          name: formData.get("name") || undefined,
          sourcePage: "/blog",
          website: formData.get("website"),
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result?.error?.message ?? result?.error ?? "Subscription failed");
      }

      setState("success");
      setMessage("You are subscribed. Check your inbox for confirmation.");
      event.currentTarget.reset();
    } catch (error) {
      setState("error");
      setMessage(error instanceof Error ? error.message : "Subscription failed. Please try again.");
    }
  }

  return (
    <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
      <Mail className="text-primary" aria-hidden />
      <h2 className="text-xl font-black">Newsletter</h2>
      <p className="text-sm leading-6 text-muted-foreground">
        Get kitchen hygiene, fire-risk, AMC, and compliance updates from Horexa.
      </p>
      <Input name="name" placeholder="Your name" />
      <Input name="email" type="email" placeholder="name@company.com" required />
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
      {message ? (
        <p className={state === "error" ? "text-sm text-destructive" : "text-sm text-green-400"} role="status">
          {message}
        </p>
      ) : null}
      <Button type="submit" disabled={state === "loading"}>
        {state === "loading" ? "Subscribing..." : "Subscribe"}
      </Button>
    </form>
  );
}
