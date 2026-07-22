"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import { auth, googleProvider } from "@/lib/firebase";
import { useAuth } from "@/lib/useAuth";
import { AuthCard } from "@/components/AuthCard";

function friendlyError(code: string): string {
  switch (code) {
    case "auth/email-already-in-use":
      return "An account with this email already exists.";
    case "auth/weak-password":
      return "Password is too weak.";
    case "auth/invalid-email":
      return "Invalid email address.";
    case "auth/unauthorized-domain":
      return "This domain isn't authorized for Google Sign-In yet.";
    case "auth/popup-closed-by-user":
      return "Sign-in was cancelled.";
    default:
      return "An error occurred. Please try again.";
  }
}

export default function SignupPage() {
  const router = useRouter();
  const { user, loading } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [terms, setTerms] = useState(false);
  const [showPw, setShowPw] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [googleSubmitting, setGoogleSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!loading && user) router.replace("/");
  }, [loading, user, router]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (name.trim().length < 3) return setError("Name must be at least 3 characters");
    if (!email.includes("@")) return setError("Valid email required");
    if (password.length < 6) return setError("Password must be 6+ characters");
    if (password !== passwordConfirm) return setError("Passwords don't match");
    if (!terms) return setError("Please agree to the Terms and Conditions");

    setSubmitting(true);
    try {
      const credential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(credential.user, { displayName: name });
      router.push("/");
    } catch (err: any) {
      setError(friendlyError(err.code));
    } finally {
      setSubmitting(false);
    }
  }

  async function handleGoogle() {
    setError(null);
    setGoogleSubmitting(true);
    try {
      await signInWithPopup(auth, googleProvider);
      router.push("/");
    } catch (err: any) {
      setError(friendlyError(err.code));
    } finally {
      setGoogleSubmitting(false);
    }
  }

  return (
    <AuthCard title="Create your account" subtitle="Sign up to start shopping with Mikolo Tshirts">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="text-sm font-semibold block mb-1">Full Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border border-neutral-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-ink/20 focus:border-ink"
            placeholder="Enter your full name"
          />
        </div>

        <div>
          <label className="text-sm font-semibold block mb-1">Email address</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-neutral-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-ink/20 focus:border-ink"
            placeholder="Enter your email"
          />
        </div>

        <div>
          <label className="text-sm font-semibold block mb-1">Password</label>
          <div className="relative">
            <input
              type={showPw ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-neutral-300 rounded-lg px-4 py-2.5 pr-12 focus:outline-none focus:ring-2 focus:ring-ink/20 focus:border-ink"
              placeholder="Enter your password"
            />
            <button
              type="button"
              onClick={() => setShowPw((v) => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 text-sm"
            >
              {showPw ? "Hide" : "Show"}
            </button>
          </div>
        </div>

        <div>
          <label className="text-sm font-semibold block mb-1">Confirm Password</label>
          <input
            type={showPw ? "text" : "password"}
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
            className="w-full border border-neutral-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-ink/20 focus:border-ink"
            placeholder="Confirm your password"
          />
        </div>

        <label className="flex items-center gap-2 text-sm text-neutral-600">
          <input
            type="checkbox"
            checked={terms}
            onChange={(e) => setTerms(e.target.checked)}
            className="accent-ink"
          />
          I agree to the Terms and Conditions
        </label>

        {error && <p className="text-red-600 text-sm">{error}</p>}

        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-ink text-white font-semibold py-3 rounded-xl hover:bg-inkHover transition-colors disabled:opacity-50"
        >
          {submitting ? "Creating account..." : "Sign Up"}
        </button>
      </form>

      <div className="flex items-center gap-3 my-6 text-xs text-neutral-400">
        <span className="flex-1 border-t" />
        or
        <span className="flex-1 border-t" />
      </div>

      <button
        type="button"
        onClick={handleGoogle}
        disabled={googleSubmitting}
        className="w-full border border-neutral-300 font-semibold py-3 rounded-xl hover:bg-neutral-50 transition-colors disabled:opacity-50"
      >
        {googleSubmitting ? "Signing in..." : "Continue with Google"}
      </button>

      <p className="text-center text-sm text-neutral-500 mt-6">
        Already have an account?{" "}
        <Link href="/login" className="font-semibold text-ink underline underline-offset-2">
          Login
        </Link>
      </p>
    </AuthCard>
  );
}
