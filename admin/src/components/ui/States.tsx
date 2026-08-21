import type { ReactNode } from "react";
import { Loader2, Inbox, AlertTriangle } from "lucide-react";

export function Loading({ label = "Loading…" }: { label?: string }) {
  return (
    <div className="flex items-center justify-center gap-2 py-14 text-sm text-muted">
      <Loader2 className="h-4 w-4 animate-spin" />
      {label}
    </div>
  );
}

export function ErrorState({ message, onRetry }: { message: string; onRetry?: () => void }) {
  return (
    <div className="flex flex-col items-center gap-3 py-14 text-center">
      <AlertTriangle className="h-6 w-6 text-amber-600 dark:text-amber-400" />
      <p className="max-w-sm text-sm text-subtle">{message}</p>
      {onRetry ? (
        <button
          type="button"
          onClick={onRetry}
          className="text-xs font-medium text-brand-400 underline-offset-4 hover:underline"
        >
          Try again
        </button>
      ) : null}
    </div>
  );
}

export function EmptyState({ title, body, action }: { title: string; body?: string; action?: ReactNode }) {
  return (
    <div className="flex flex-col items-center gap-3 py-14 text-center">
      <Inbox className="h-6 w-6 text-muted" />
      <div>
        <p className="text-sm font-medium text-fg">{title}</p>
        {body ? <p className="mt-1 max-w-sm text-xs text-muted">{body}</p> : null}
      </div>
      {action}
    </div>
  );
}

export function Badge({
  children,
  tone = "neutral",
}: {
  children: ReactNode;
  tone?: "neutral" | "success" | "warning" | "brand";
}) {
  const tones = {
    neutral: "bg-raised text-subtle border-line",
    success: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/25",
    warning: "bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/25",
    brand: "bg-brand-500/12 text-brand-400 border-brand-500/25",
  } as const;

  return (
    <span
      className={`inline-flex items-center rounded-md border px-2 py-0.5 text-[0.68rem] font-medium ${tones[tone]}`}
    >
      {children}
    </span>
  );
}

export function Toggle({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: (next: boolean) => void;
  label: string;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      className={`relative h-5.5 w-10 shrink-0 rounded-full transition-colors ${
        checked ? "bg-brand-500" : "bg-line"
      }`}
    >
      <span
        className={`absolute top-0.5 h-4.5 w-4.5 rounded-full bg-white shadow-sm ring-1 ring-black/10 transition-transform ${
          checked ? "translate-x-5" : "translate-x-0.5"
        }`}
      />
    </button>
  );
}
