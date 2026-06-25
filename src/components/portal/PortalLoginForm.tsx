"use client";

import type React from "react";
import { useMemo, useState } from "react";
import { signIn } from "next-auth/react";
import { Eye, Lock, Mail, MessageCircle, ArrowRight, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type LoginMode = "password" | "otp" | "reset";

export function PortalLoginForm() {
  const [mode, setMode] = useState<LoginMode>("password");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const [identifier, setIdentifier] = useState("");
  const [otpRequested, setOtpRequested] = useState(false);

  const resetToken = useMemo(() => {
    if (typeof window === "undefined") return "";
    return new URLSearchParams(window.location.search).get("resetToken") ?? "";
  }, []);

  async function handlePasswordLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setMessage("");

    const formData = new FormData(event.currentTarget);
    const result = await signIn("credentials", {
      email: String(formData.get("email") ?? ""),
      password: String(formData.get("password") ?? ""),
      redirect: false,
      callbackUrl: "/portal/dashboard",
    });

    if (result?.ok) {
      window.location.assign(result.url ?? "/portal/dashboard");
      return;
    }

    setStatus("error");
    setMessage("Invalid login details or inactive portal account.");
  }

  async function handleOtpRequest() {
    setStatus("submitting");
    setMessage("");

    const response = await fetch("/api/auth/otp/request", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ identifier }),
    });

    if (!response.ok) {
      setStatus("error");
      setMessage("Unable to send OTP. Please check the registered email or mobile number.");
      return;
    }

    setOtpRequested(true);
    setStatus("success");
    setMessage("OTP sent. Enter the 6-digit code to continue.");
  }

  async function handleOtpLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setMessage("");

    const formData = new FormData(event.currentTarget);
    const result = await signIn("credentials", {
      email: identifier,
      otp: String(formData.get("otp") ?? ""),
      redirect: false,
      callbackUrl: "/portal/dashboard",
    });

    if (result?.ok) {
      window.location.assign(result.url ?? "/portal/dashboard");
      return;
    }

    setStatus("error");
    setMessage("Invalid or expired OTP.");
  }

  async function handlePasswordReset(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setMessage("");

    const formData = new FormData(event.currentTarget);
    const endpoint = resetToken ? "/api/auth/password-reset/confirm" : "/api/auth/password-reset/request";
    const payload = resetToken
      ? { token: resetToken, password: String(formData.get("password") ?? "") }
      : { email: String(formData.get("email") ?? "") };

    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      setStatus("error");
      setMessage("Unable to process the password reset request.");
      return;
    }

    setStatus("success");
    setMessage(resetToken ? "Password updated. You can now log in." : "If the email exists, a reset link has been sent.");
    if (resetToken) setMode("password");
  }

  return (
    <>
      {mode === "password" ? (
        <form className="mt-8 flex flex-col gap-5" onSubmit={handlePasswordLogin}>
          <div className="flex flex-col gap-2">
            <Label htmlFor="email">Registered Email / Mobile Number</Label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" aria-hidden />
              <Input id="email" name="email" className="pl-12" placeholder="Enter email or mobile number" required />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" aria-hidden />
              <Input id="password" name="password" type="password" className="pl-12 pr-12" placeholder="Enter your password" required />
              <Eye className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground" aria-hidden />
            </div>
            <button type="button" className="self-end text-xs font-bold text-primary" onClick={() => setMode("reset")}>
              Forgot Password?
            </button>
          </div>
          <label className="flex items-center gap-3 text-sm text-muted-foreground">
            <input type="checkbox" defaultChecked className="size-5 accent-primary" />
            Remember Me
          </label>
          <Button type="submit" size="lg" disabled={status === "submitting"}>
            {status === "submitting" ? "Logging in..." : "Login"}
            <ArrowRight data-icon="inline-end" />
          </Button>
        </form>
      ) : null}

      {mode === "otp" ? (
        <form className="mt-8 flex flex-col gap-5" onSubmit={handleOtpLogin}>
          <div className="flex flex-col gap-2">
            <Label htmlFor="otp-identifier">Registered Email / Mobile Number</Label>
            <Input id="otp-identifier" value={identifier} onChange={(event) => setIdentifier(event.target.value)} placeholder="Enter email or mobile number" required />
          </div>
          {otpRequested ? (
            <div className="flex flex-col gap-2">
              <Label htmlFor="otp">OTP</Label>
              <Input id="otp" name="otp" inputMode="numeric" maxLength={6} placeholder="6-digit OTP" required />
            </div>
          ) : null}
          <Button type={otpRequested ? "submit" : "button"} size="lg" onClick={otpRequested ? undefined : handleOtpRequest} disabled={status === "submitting"}>
            {otpRequested ? "Verify OTP & Login" : "Send OTP"}
            <MessageCircle data-icon="inline-end" />
          </Button>
          <button type="button" className="text-sm font-bold text-primary" onClick={() => setMode("password")}>
            Use password instead
          </button>
        </form>
      ) : null}

      {mode === "reset" ? (
        <form className="mt-8 flex flex-col gap-5" onSubmit={handlePasswordReset}>
          <div className="flex flex-col gap-2">
            <Label htmlFor={resetToken ? "new-password" : "reset-email"}>{resetToken ? "New Password" : "Registered Email"}</Label>
            <Input id={resetToken ? "new-password" : "reset-email"} name={resetToken ? "password" : "email"} type={resetToken ? "password" : "email"} required />
          </div>
          <Button type="submit" size="lg" disabled={status === "submitting"}>
            {resetToken ? "Update Password" : "Send Reset Link"}
          </Button>
          <button type="button" className="text-sm font-bold text-primary" onClick={() => setMode("password")}>
            Back to login
          </button>
        </form>
      ) : null}

      {message ? (
        <div className={status === "success" ? "mt-5 rounded-lg border border-success/30 bg-success/10 p-4 text-sm text-success" : "mt-5 rounded-lg border border-warning/30 bg-warning/10 p-4 text-sm text-warning"}>
          {message}
        </div>
      ) : null}

      <div className="my-6 flex items-center gap-4 text-xs uppercase tracking-[0.12em] text-muted-foreground">
        <div className="h-px flex-1 bg-border" />
        OR
        <div className="h-px flex-1 bg-border" />
      </div>

      <div className="flex flex-col gap-3">
        <Button variant="outline" size="lg" onClick={() => signIn("google", { callbackUrl: "/portal/dashboard" })}>
          <Mail data-icon="inline-start" />
          Login with Google
        </Button>
        <Button variant="outline" size="lg" onClick={() => setMode("otp")}>
          <MessageCircle data-icon="inline-start" />
          Login with OTP
        </Button>
      </div>
    </>
  );
}
