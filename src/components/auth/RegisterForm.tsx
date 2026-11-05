"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Check, Loader2, X } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import GoogleButton from "./GoogleButton";
import { signUp } from "@/lib/auth-client";
import { safeRedirect } from "@/lib/redirect";

export default function RegisterForm() {
  const router = useRouter();
  const params = useSearchParams();
  const redirectTo = safeRedirect(params.get("redirect"));
  const [form, setForm] = useState({ name: "", email: "", photo: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const rules = [
    { label: "At least 6 characters", ok: form.password.length >= 6 },
    { label: "One uppercase letter", ok: /[A-Z]/.test(form.password) },
    { label: "One lowercase letter", ok: /[a-z]/.test(form.password) },
  ];
  const passwordOk = rules.every((r) => r.ok);
  const set = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) => setForm({ ...form, [key]: e.target.value });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!passwordOk) {
      setError("Please meet every password rule below.");
      return;
    }
    setLoading(true);
    const { error } = await signUp.email({
      name: form.name.trim(),
      email: form.email.trim(),
      password: form.password,
      image: form.photo.trim() || undefined,
    });
    setLoading(false);
    if (error) {
      setError(error.message || "We could not create your account. Please try again.");
      return;
    }
    toast.success("Your BookNook account is ready!");
    router.push(redirectTo);
    router.refresh();
  }

  return (
    <div className="glass mx-auto w-full max-w-md rounded-3xl p-8">
      <div className="mb-6 space-y-1 text-center">
        <h1 className="text-2xl font-bold">Create your account</h1>
        <p className="text-sm text-muted-foreground">Join BookNook and start sharing books.</p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input id="name" autoComplete="name" placeholder="Your full name" value={form.name} onChange={set("name")} required className="h-10" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" autoComplete="email" placeholder="you@example.com" value={form.email} onChange={set("email")} required className="h-10" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="photo">Photo URL</Label>
          <Input id="photo" type="url" placeholder="https://example.com/me.jpg" value={form.photo} onChange={set("photo")} className="h-10" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" autoComplete="new-password" placeholder="Create a password" value={form.password} onChange={set("password")} required className="h-10" />
          {form.password && (
            <ul className="space-y-1 pt-1 text-xs">
              {rules.map((r) => (
                <li key={r.label} className={`flex items-center gap-1.5 ${r.ok ? "text-emerald-600 dark:text-emerald-400" : "text-muted-foreground"}`}>
                  {r.ok ? <Check className="size-3.5" /> : <X className="size-3.5" />} {r.label}
                </li>
              ))}
            </ul>
          )}
        </div>
        {error && (
          <p role="alert" className="rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive">
            {error}
          </p>
        )}
        <Button type="submit" size="lg" className="h-10 w-full" disabled={loading || !form.name || !form.email || !form.password}>
          {loading && <Loader2 className="size-4 animate-spin" />} Create account
        </Button>
      </form>
      <div className="my-5 flex items-center gap-3 text-xs text-muted-foreground">
        <span className="h-px flex-1 bg-border" /> or <span className="h-px flex-1 bg-border" />
      </div>
      <GoogleButton redirectTo={redirectTo} />
      <p className="mt-6 text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link href={`/login${redirectTo !== "/" ? `?redirect=${encodeURIComponent(redirectTo)}` : ""}`} className="font-medium text-primary hover:underline">
          Log in
        </Link>
      </p>
    </div>
  );
}
