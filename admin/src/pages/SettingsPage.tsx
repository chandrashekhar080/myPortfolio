import { useEffect, useState, type FormEvent } from "react";
import { toast } from "sonner";
import { PageHeader } from "@/components/Layout";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Field } from "@/components/ui/Field";
import { api, ApiError, tokenStore, API_URL } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";
import type { User } from "@/lib/types";

export function SettingsPage() {
  const { user, setUser } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [savingAccount, setSavingAccount] = useState(false);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [savingPassword, setSavingPassword] = useState(false);

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
    }
  }, [user]);

  const saveAccount = async (event: FormEvent) => {
    event.preventDefault();
    setSavingAccount(true);
    try {
      const { data } = await api.patch<User>("/api/auth/account", { name, email });
      setUser(data);
      toast.success("Account updated");
    } catch (error) {
      toast.error(error instanceof ApiError ? error.message : "Could not update the account");
    } finally {
      setSavingAccount(false);
    }
  };

  const savePassword = async (event: FormEvent) => {
    event.preventDefault();
    setPasswordError("");

    if (newPassword.length < 8) {
      setPasswordError("The new password must be at least 8 characters.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordError("The two new passwords do not match.");
      return;
    }

    setSavingPassword(true);
    try {
      // The API issues a fresh token; keeping it avoids being signed out.
      const { data } = await api.patch<{ token: string }>("/api/auth/password", {
        currentPassword,
        newPassword,
      });
      tokenStore.set(data.token);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      toast.success("Password changed");
    } catch (error) {
      setPasswordError(
        error instanceof ApiError ? error.message : "Could not change the password",
      );
    } finally {
      setSavingPassword(false);
    }
  };

  return (
    <>
      <PageHeader title="Settings" description="Your admin account and the API this panel talks to." />

      <div className="grid gap-4 lg:grid-cols-2">
        <Card title="Account" description="The name and email you sign in with.">
          <form onSubmit={saveAccount} className="space-y-4">
            <Field label="Name" htmlFor="account-name" required>
              <input
                id="account-name"
                value={name}
                required
                onChange={(event) => setName(event.target.value)}
                className="field-input"
              />
            </Field>
            <Field label="Email" htmlFor="account-email" required>
              <input
                id="account-email"
                type="email"
                value={email}
                required
                autoComplete="username"
                onChange={(event) => setEmail(event.target.value)}
                className="field-input"
              />
            </Field>
            <Button type="submit" loading={savingAccount}>
              Save account
            </Button>
          </form>
        </Card>

        <Card title="Password" description="Use at least 8 characters.">
          <form onSubmit={savePassword} className="space-y-4">
            <Field label="Current password" htmlFor="current-password" required>
              <input
                id="current-password"
                type="password"
                value={currentPassword}
                required
                autoComplete="current-password"
                onChange={(event) => setCurrentPassword(event.target.value)}
                className="field-input"
              />
            </Field>
            <Field label="New password" htmlFor="new-password" required>
              <input
                id="new-password"
                type="password"
                value={newPassword}
                required
                autoComplete="new-password"
                onChange={(event) => setNewPassword(event.target.value)}
                className="field-input"
              />
            </Field>
            <Field label="Confirm new password" htmlFor="confirm-password" required error={passwordError}>
              <input
                id="confirm-password"
                type="password"
                value={confirmPassword}
                required
                autoComplete="new-password"
                onChange={(event) => setConfirmPassword(event.target.value)}
                className="field-input"
              />
            </Field>
            <Button type="submit" loading={savingPassword}>
              Change password
            </Button>
          </form>
        </Card>

        <Card title="Connection" description="Where this panel reads and writes content." className="lg:col-span-2">
          <dl className="space-y-2.5 text-sm">
            <div className="flex flex-wrap justify-between gap-2">
              <dt className="text-muted">API base URL</dt>
              <dd className="font-mono text-xs">{API_URL}</dd>
            </div>
            <div className="flex flex-wrap justify-between gap-2">
              <dt className="text-muted">Signed in as</dt>
              <dd className="font-medium">
                {user?.email} · {user?.role}
              </dd>
            </div>
            <div className="flex flex-wrap justify-between gap-2">
              <dt className="text-muted">Last sign-in</dt>
              <dd className="font-medium">
                {user?.lastLoginAt ? new Date(user.lastLoginAt).toLocaleString() : "—"}
              </dd>
            </div>
          </dl>
          <p className="mt-4 text-xs text-muted">
            Change the API URL by editing <code className="font-mono">VITE_API_URL</code> in{" "}
            <code className="font-mono">admin/.env</code> and restarting the dev server.
          </p>
        </Card>
      </div>
    </>
  );
}
