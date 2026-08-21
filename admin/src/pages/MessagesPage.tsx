import { useState } from "react";
import { Archive, Mail, MailOpen, Search, Trash2 } from "lucide-react";
import { PageHeader } from "@/components/Layout";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { Badge, EmptyState, ErrorState, Loading } from "@/components/ui/States";
import { useConfirm } from "@/components/ui/Confirm";
import { IconButton } from "@/components/editors/StringListEditor";
import { useMessageMutations, useMessages } from "@/lib/queries";
import type { Message } from "@/lib/types";

const filters = [
  { value: "", label: "All" },
  { value: "unread", label: "Unread" },
  { value: "read", label: "Read" },
  { value: "archived", label: "Archived" },
] as const;

export function MessagesPage() {
  const [status, setStatus] = useState("");
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [open, setOpen] = useState<Message | null>(null);

  const { data, isLoading, isError, error, refetch } = useMessages({ status, q: query, page });
  const { open: openMessage, setStatus: changeStatus, remove } = useMessageMutations();
  const { ask, dialog } = useConfirm();

  const items = data?.items ?? [];
  const meta = data?.meta;

  const view = async (message: Message) => {
    setOpen(message);
    // Opening is what marks a message read on the server.
    if (message.status === "unread") await openMessage.mutateAsync(message.id).catch(() => {});
  };

  return (
    <>
      <PageHeader
        title="Messages"
        description="Everything submitted through the contact form on your site."
      />

      <div className="mb-4 flex flex-wrap items-center gap-2">
        <div className="flex rounded-lg border border-line p-0.5">
          {filters.map((filter) => (
            <button
              key={filter.value}
              type="button"
              onClick={() => {
                setStatus(filter.value);
                setPage(1);
              }}
              className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
                status === filter.value
                  ? "bg-brand-500/15 text-brand-400"
                  : "text-muted hover:text-fg"
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        <form
          className="relative ml-auto w-full sm:w-64"
          onSubmit={(event) => {
            event.preventDefault();
            setQuery(search);
            setPage(1);
          }}
        >
          <Search
            className="pointer-events-none absolute top-1/2 left-3 h-3.5 w-3.5 -translate-y-1/2 text-muted"
            aria-hidden
          />
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search name, email or text"
            aria-label="Search messages"
            className="field-input pl-8.5"
          />
        </form>
      </div>

      {isLoading ? (
        <Loading />
      ) : isError ? (
        <ErrorState
          message={(error as Error)?.message ?? "Could not load messages"}
          onRetry={refetch}
        />
      ) : items.length === 0 ? (
        <div className="panel">
          <EmptyState
            title="No messages here"
            body={
              query || status
                ? "Nothing matches this filter. Try clearing it."
                : "Submissions from your contact form will appear here."
            }
          />
        </div>
      ) : (
        <ul className="panel divide-y divide-line/70">
          {items.map((message) => (
            <li key={message.id} className="flex items-start gap-3 px-4 py-3">
              <span className="mt-0.5 shrink-0 text-muted">
                {message.status === "unread" ? (
                  <Mail className="h-4 w-4 text-brand-400" aria-label="Unread" />
                ) : (
                  <MailOpen className="h-4 w-4" aria-label="Read" />
                )}
              </span>

              <button
                type="button"
                onClick={() => view(message)}
                className="min-w-0 flex-1 text-left"
              >
                <p className="flex flex-wrap items-center gap-2 text-sm font-medium">
                  <span className="truncate">{message.name}</span>
                  <span className="truncate text-xs font-normal text-muted">{message.email}</span>
                  {message.status === "archived" ? <Badge>Archived</Badge> : null}
                </p>
                <p className="mt-0.5 truncate text-xs text-muted">
                  {message.subject ? `${message.subject} — ` : ""}
                  {message.message}
                </p>
              </button>

              <span className="hidden shrink-0 text-xs text-muted sm:block">
                {new Date(message.createdAt).toLocaleDateString()}
              </span>

              <div className="flex shrink-0 gap-1">
                <IconButton
                  label={message.status === "archived" ? "Move to read" : "Archive"}
                  onClick={() =>
                    changeStatus.mutate({
                      id: message.id,
                      status: message.status === "archived" ? "read" : "archived",
                    })
                  }
                >
                  <Archive className="h-3.5 w-3.5" />
                </IconButton>
                <IconButton
                  label="Delete"
                  danger
                  onClick={() =>
                    ask({
                      title: "Delete this message?",
                      body: `The message from ${message.name} will be permanently removed.`,
                      onConfirm: () => remove.mutateAsync(message.id),
                    })
                  }
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </IconButton>
              </div>
            </li>
          ))}
        </ul>
      )}

      {meta && meta.pages > 1 ? (
        <div className="mt-4 flex items-center justify-between text-xs text-muted">
          <span>
            Page {meta.page} of {meta.pages} · {meta.total} total
          </span>
          <div className="flex gap-2">
            <Button
              size="sm"
              variant="secondary"
              disabled={page <= 1}
              onClick={() => setPage((current) => current - 1)}
            >
              Previous
            </Button>
            <Button
              size="sm"
              variant="secondary"
              disabled={page >= meta.pages}
              onClick={() => setPage((current) => current + 1)}
            >
              Next
            </Button>
          </div>
        </div>
      ) : null}

      <Modal
        open={open !== null}
        title={open?.subject || "Message"}
        description={open ? `${open.name} · ${open.email}` : undefined}
        onClose={() => setOpen(null)}
        footer={
          open ? (
            <>
              <a
                href={`mailto:${open.email}?subject=${encodeURIComponent(`Re: ${open.subject || "Your message"}`)}`}
                className="inline-flex h-9.5 items-center rounded-lg border border-line px-4 text-sm font-medium text-fg transition-colors hover:bg-raised"
              >
                Reply by email
              </a>
              <Button variant="secondary" onClick={() => setOpen(null)}>
                Close
              </Button>
            </>
          ) : null
        }
      >
        {open ? (
          <div className="space-y-3">
            <p className="text-xs text-muted">{new Date(open.createdAt).toLocaleString()}</p>
            <p className="text-sm leading-relaxed whitespace-pre-wrap text-fg">{open.message}</p>
          </div>
        ) : null}
      </Modal>

      {dialog}
    </>
  );
}
