import { useState } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import {
  ExternalLink,
  Image as ImageIcon,
  LayoutDashboard,
  LogOut,
  Mail,
  Menu,
  Settings,
  UserRound,
  X,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { useStats } from "@/lib/queries";
import { sections } from "@/lib/sections";

const SITE_URL = import.meta.env.VITE_SITE_URL ?? "http://localhost:8080";

export function Layout() {
  const { user, logout } = useAuth();
  const { data: stats } = useStats();
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const unread = stats?.counts.unreadMessages ?? 0;

  const nav = [
    { to: "/", label: "Dashboard", icon: LayoutDashboard, end: true },
    { to: "/profile", label: "Profile & SEO", icon: UserRound },
    ...sections.map((section) => ({
      to: `/sections/${section.key}`,
      label: section.title,
      icon: section.icon,
      badge: stats?.counts[section.key],
    })),
    { to: "/messages", label: "Messages", icon: Mail, badge: unread || undefined, accent: unread > 0 },
    { to: "/media", label: "Media", icon: ImageIcon },
    { to: "/settings", label: "Settings", icon: Settings },
  ];

  return (
    <div className="min-h-screen lg:grid lg:grid-cols-[16rem_1fr]">
      {/* Mobile top bar */}
      <header className="sticky top-0 z-30 flex items-center justify-between border-b border-line/70 bg-page/95 px-4 py-3 backdrop-blur lg:hidden">
        <span className="text-sm font-semibold">Portfolio Admin</span>
        <button
          type="button"
          onClick={() => setMobileOpen((open) => !open)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          className="rounded-md p-1.5 text-subtle hover:bg-raised hover:text-fg"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </header>

      <aside
        className={`${
          mobileOpen ? "block" : "hidden"
        } border-b border-line/70 bg-panel/60 lg:sticky lg:top-0 lg:block lg:h-screen lg:border-r lg:border-b-0`}
      >
        <div className="flex h-full flex-col">
          <div className="hidden items-center gap-2.5 px-5 py-5 lg:flex">
            <span className="grid h-9 w-9 place-items-center rounded-lg bg-brand-500 text-sm font-bold text-white">
              {(user?.name ?? "A").slice(0, 1).toUpperCase()}
            </span>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold">Portfolio Admin</p>
              <p className="truncate text-xs text-muted">{user?.email}</p>
            </div>
          </div>

          <nav className="flex-1 space-y-0.5 overflow-y-auto px-3 pb-3 lg:px-3 thin-scrollbar">
            {nav.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={"end" in item ? item.end : false}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm transition-colors ${
                    isActive
                      ? "bg-brand-500/12 font-medium text-brand-400"
                      : "text-subtle hover:bg-raised hover:text-fg"
                  }`
                }
              >
                <item.icon className="h-4 w-4 shrink-0" aria-hidden />
                <span className="flex-1 truncate">{item.label}</span>
                {"badge" in item && item.badge ? (
                  <span
                    className={`rounded-full px-1.5 py-0.5 text-[0.65rem] font-medium ${
                      "accent" in item && item.accent
                        ? "bg-brand-500 text-white"
                        : "bg-raised text-muted"
                    }`}
                  >
                    {item.badge}
                  </span>
                ) : null}
              </NavLink>
            ))}
          </nav>

          <div className="space-y-0.5 border-t border-line/70 p-3">
            <ThemeToggle className="w-full" />
            <a
              href={SITE_URL}
              target="_blank"
              rel="noreferrer noopener"
              className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-subtle transition-colors hover:bg-raised hover:text-fg"
            >
              <ExternalLink className="h-4 w-4" aria-hidden /> View site
            </a>
            <button
              type="button"
              onClick={logout}
              className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-subtle transition-colors hover:bg-raised hover:text-fg"
            >
              <LogOut className="h-4 w-4" aria-hidden /> Sign out
            </button>
          </div>
        </div>
      </aside>

      <main key={location.pathname} className="min-w-0 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
        <Outlet />
      </main>
    </div>
  );
}

export function PageHeader({
  title,
  description,
  actions,
}: {
  title: string;
  description?: string;
  actions?: React.ReactNode;
}) {
  return (
    <header className="mb-6 flex flex-wrap items-start justify-between gap-3">
      <div className="min-w-0">
        <h1 className="text-xl font-semibold tracking-tight">{title}</h1>
        {description ? <p className="mt-1 text-sm text-muted">{description}</p> : null}
      </div>
      {actions ? <div className="flex items-center gap-2">{actions}</div> : null}
    </header>
  );
}
