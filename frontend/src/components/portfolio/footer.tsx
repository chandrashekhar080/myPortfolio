import { FaGithub, FaLinkedinIn } from "react-icons/fa6";
import { useContent } from "@/lib/content-context";

export function Footer() {
  const { navItems, profile } = useContent();

  return (
    <footer className="border-t border-glass-border">
      <div className="mx-auto grid max-w-6xl gap-8 px-5 py-12 lg:grid-cols-[1.2fr_1fr_auto]">
        <div>
          <div className="flex min-w-0 items-center gap-3">
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-gradient-brand font-display text-sm font-bold text-primary-foreground">
              {profile.initials}
            </span>
            <span className="truncate font-display text-base font-bold">{profile.name}</span>
          </div>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
            {profile.title} · {profile.experience} · {profile.location}
          </p>
        </div>

        <nav aria-label="Footer">
          <ul className="grid grid-cols-2 gap-2 text-sm">
            {navItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="text-muted-foreground transition-colors hover:text-primary"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex gap-3 lg:justify-end">
          {profile.linkedin ? (
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer noopener"
              aria-label="LinkedIn profile"
              className="glass grid h-11 w-11 place-items-center rounded-xl transition-colors hover:text-primary"
            >
              <FaLinkedinIn />
            </a>
          ) : null}
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer noopener"
            aria-label="GitHub profile"
            className="glass grid h-11 w-11 place-items-center rounded-xl transition-colors hover:text-primary"
          >
            <FaGithub />
          </a>
        </div>
      </div>

      <div className="border-t border-glass-border py-5 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} {profile.name}. All Rights Reserved.
      </div>
    </footer>
  );
}
