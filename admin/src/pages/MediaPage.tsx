import { useRef, useState } from "react";
import { Check, Copy, Trash2, Upload } from "lucide-react";
import { toast } from "sonner";
import { PageHeader } from "@/components/Layout";
import { Button } from "@/components/ui/Button";
import { EmptyState, ErrorState, Loading } from "@/components/ui/States";
import { useConfirm } from "@/components/ui/Confirm";
import { useMedia, useMediaMutations } from "@/lib/queries";

function formatSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}

export function MediaPage() {
  const { data, isLoading, isError, error, refetch } = useMedia();
  const { upload, remove } = useMediaMutations();
  const { ask, dialog } = useConfirm();
  const inputRef = useRef<HTMLInputElement>(null);
  const [copied, setCopied] = useState("");

  const items = data ?? [];

  const copy = async (url: string) => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(url);
      window.setTimeout(() => setCopied(""), 1500);
    } catch {
      toast.error("Could not copy — copy the URL manually.");
    }
  };

  return (
    <>
      <PageHeader
        title="Media"
        description="Images uploaded from anywhere in the admin. Copy a URL to reuse a file."
        actions={
          <Button onClick={() => inputRef.current?.click()} loading={upload.isPending}>
            <Upload className="h-4 w-4" /> Upload
          </Button>
        }
      />

      <input
        ref={inputRef}
        type="file"
        accept="image/png,image/jpeg,image/webp,image/gif,image/svg+xml,application/pdf"
        className="hidden"
        onChange={(event) => {
          const file = event.target.files?.[0];
          if (file) upload.mutate(file);
          event.target.value = "";
        }}
      />

      {isLoading ? (
        <Loading />
      ) : isError ? (
        <ErrorState message={(error as Error)?.message ?? "Could not load media"} onRetry={refetch} />
      ) : items.length === 0 ? (
        <div className="panel">
          <EmptyState
            title="No files yet"
            body="Upload project covers, an avatar or a social share image."
            action={
              <Button size="sm" onClick={() => inputRef.current?.click()}>
                <Upload className="h-3.5 w-3.5" /> Upload a file
              </Button>
            }
          />
        </div>
      ) : (
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {items.map((item) => (
            <li key={item.id} className="panel overflow-hidden">
              <div className="grid h-32 place-items-center overflow-hidden bg-page">
                {item.mimeType.startsWith("image/") ? (
                  <img src={item.url} alt={item.originalName} className="h-full w-full object-cover" />
                ) : (
                  <span className="font-mono text-xs text-muted">{item.mimeType}</span>
                )}
              </div>

              <div className="space-y-2 p-3">
                <p className="truncate text-xs font-medium" title={item.originalName}>
                  {item.originalName || item.filename}
                </p>
                <p className="text-xs text-muted">
                  {formatSize(item.size)} · {new Date(item.createdAt).toLocaleDateString()}
                </p>

                <div className="flex gap-1.5">
                  <button
                    type="button"
                    onClick={() => copy(item.url)}
                    className="inline-flex h-7.5 flex-1 items-center justify-center gap-1.5 rounded-md border border-line text-xs text-subtle transition-colors hover:bg-raised hover:text-fg"
                  >
                    {copied === item.url ? (
                      <>
                        <Check className="h-3 w-3" /> Copied
                      </>
                    ) : (
                      <>
                        <Copy className="h-3 w-3" /> Copy URL
                      </>
                    )}
                  </button>
                  <button
                    type="button"
                    aria-label={`Delete ${item.originalName}`}
                    onClick={() =>
                      ask({
                        title: "Delete this file?",
                        body: "Anything still pointing at this file will show a broken image.",
                        onConfirm: () => remove.mutateAsync(item.id),
                      })
                    }
                    className="grid h-7.5 w-7.5 place-items-center rounded-md border border-line text-subtle transition-colors hover:border-red-500/40 hover:bg-red-500/10 hover:text-red-600 dark:hover:text-red-400"
                  >
                    <Trash2 className="h-3 w-3" />
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}

      {dialog}
    </>
  );
}
