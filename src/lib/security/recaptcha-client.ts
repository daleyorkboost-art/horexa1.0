"use client";

const recaptchaSiteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

declare global {
  interface Window {
    grecaptcha?: {
      ready: (callback: () => void) => void;
      execute: (siteKey: string, options: { action: string }) => Promise<string>;
    };
  }
}

export async function getCaptchaToken(action: string) {
  if (!recaptchaSiteKey || typeof window === "undefined") return "";

  if (!window.grecaptcha) {
    await new Promise<void>((resolve, reject) => {
      const existing = document.querySelector<HTMLScriptElement>("script[data-recaptcha]");
      if (existing) {
        if (window.grecaptcha) {
          resolve();
          return;
        }
        existing.addEventListener("load", () => resolve(), { once: true });
        existing.addEventListener("error", () => reject(new Error("Captcha failed to load")), { once: true });
        return;
      }

      const script = document.createElement("script");
      script.src = `https://www.google.com/recaptcha/api.js?render=${encodeURIComponent(recaptchaSiteKey)}`;
      script.async = true;
      script.defer = true;
      script.dataset.recaptcha = "true";
      script.onload = () => resolve();
      script.onerror = () => reject(new Error("Captcha failed to load"));
      document.head.appendChild(script);
    });
  }

  return new Promise<string>((resolve, reject) => {
    window.grecaptcha?.ready(() => {
      window.grecaptcha?.execute(recaptchaSiteKey, { action }).then(resolve).catch(reject);
    });
  });
}
