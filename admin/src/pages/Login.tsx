import { useState, type FormEvent } from "react";
import { LockKeyhole } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Field } from "@/components/ui/Field";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { useAuth } from "@/context/AuthContext";
import { ApiError } from "@/lib/api";

export function Login() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      await login(email, password);
    } catch (caught) {
      setError(caught instanceof ApiError ? caught.message : "Sign-in failed. Try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center px-4">
      {/* Reachable before sign-in — the sidebar toggle only exists once you are in. */}
      <ThemeToggle className="absolute top-4 right-4" />

      <div className="w-full max-w-sm">
        <div className="mb-6 text-center">
          <span className="mx-auto mb-3 grid h-11 w-11 place-items-center rounded-xl bg-brand-500 text-white">
            <LockKeyhole className="h-5 w-5" />
          </span>
          <h1 className="text-lg font-semibold">Portfolio Admin</h1>
          <p className="mt-1 text-sm text-muted">Sign in to manage your site content.</p>
        </div>

        <form onSubmit={onSubmit} className="panel space-y-4 p-6">
          <Field label="Email" htmlFor="email" required>
            <input
              id="email"
              type="email"
              value={email}
              autoComplete="username"
              required
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@example.com"
              className="field-input"
            />
          </Field>

          <Field label="Password" htmlFor="password" required>
            <input
              id="password"
              type="password"
              value={password}
              autoComplete="current-password"
              required
              onChange={(event) => setPassword(event.target.value)}
              placeholder="••••••••"
              className="field-input"
            />
          </Field>

          {error ? (
            <p role="alert" className="rounded-lg border border-red-500/25 bg-red-500/10 px-3 py-2 text-xs text-red-700 dark:text-red-400">
              {error}
            </p>
          ) : null}

          <Button type="submit" loading={submitting} className="w-full">
            Sign in
          </Button>
        </form>
      </div>
    </div>
  );
}
