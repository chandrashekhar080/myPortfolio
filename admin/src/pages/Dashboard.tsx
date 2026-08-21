import { Link } from "react-router-dom";
import { Mail } from "lucide-react";
import { PageHeader } from "@/components/Layout";
import { Card } from "@/components/ui/Card";
import { Badge, ErrorState, Loading } from "@/components/ui/States";
import { useStats } from "@/lib/queries";
import { sections } from "@/lib/sections";
import { useAuth } from "@/context/AuthContext";

export function Dashboard() {
  const { user } = useAuth();
  const { data, isLoading, isError, error, refetch } = useStats();

  if (isLoading) return <Loading label="Loading dashboard…" />;
  if (isError || !data) {
    return <ErrorState message={(error as Error)?.message ?? "Could not load the dashboard"} onRetry={refetch} />;
  }

  const unread = data.counts.unreadMessages ?? 0;

  return (
    <>
      <PageHeader
        title={`Welcome back, ${user?.name?.split(" ")[0] ?? "there"}`}
        description="Everything on the public site is edited from here."
      />

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {sections.map((section) => (
          <Link
            key={section.key}
            to={`/sections/${section.key}`}
            className="panel group flex items-center gap-3.5 p-4 transition-colors hover:border-brand-500/40"
          >
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-raised text-brand-400 transition-colors group-hover:bg-brand-500/12">
              <section.icon className="h-4.5 w-4.5" aria-hidden />
            </span>
            <div className="min-w-0">
              <p className="text-lg font-semibold leading-none">{data.counts[section.key] ?? 0}</p>
              <p className="mt-1 truncate text-xs text-muted">{section.title}</p>
            </div>
          </Link>
        ))}

        <Link
          to="/messages"
          className="panel group flex items-center gap-3.5 p-4 transition-colors hover:border-brand-500/40"
        >
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-raised text-brand-400 transition-colors group-hover:bg-brand-500/12">
            <Mail className="h-4.5 w-4.5" aria-hidden />
          </span>
          <div className="min-w-0">
            <p className="text-lg font-semibold leading-none">{data.counts.messages ?? 0}</p>
            <p className="mt-1 truncate text-xs text-muted">
              Messages{unread ? ` · ${unread} unread` : ""}
            </p>
          </div>
        </Link>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <Card title="Recent messages" description="The latest contact-form submissions.">
          {data.recentMessages.length === 0 ? (
            <p className="py-6 text-center text-sm text-muted">No messages yet.</p>
          ) : (
            <ul className="divide-y divide-line/70">
              {data.recentMessages.map((message) => (
                <li key={message.id} className="flex items-start justify-between gap-3 py-3 first:pt-0 last:pb-0">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium">
                      {message.name}
                      <span className="ml-2 font-normal text-muted">{message.email}</span>
                    </p>
                    <p className="mt-0.5 truncate text-xs text-muted">
                      {message.subject || message.message}
                    </p>
                  </div>
                  {message.status === "unread" ? <Badge tone="brand">New</Badge> : null}
                </li>
              ))}
            </ul>
          )}
        </Card>

        <Card title="Site profile" description="Name, headline and contact details.">
          <dl className="space-y-3 text-sm">
            <div className="flex justify-between gap-4">
              <dt className="text-muted">Name</dt>
              <dd className="truncate font-medium">{data.profile.name}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-muted">Headline</dt>
              <dd className="truncate font-medium">{data.profile.title}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-muted">Total skills</dt>
              <dd className="font-medium">{data.counts.skills}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-muted">Published projects</dt>
              <dd className="font-medium">
                {data.counts.publishedProjects} / {data.counts.projects}
              </dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-muted">Last edited</dt>
              <dd className="font-medium">
                {new Date(data.profile.updatedAt).toLocaleString()}
              </dd>
            </div>
          </dl>
          <Link
            to="/profile"
            className="mt-4 inline-block text-xs font-medium text-brand-400 underline-offset-4 hover:underline"
          >
            Edit profile &amp; SEO →
          </Link>
        </Card>
      </div>
    </>
  );
}
