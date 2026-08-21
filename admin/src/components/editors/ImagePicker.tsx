import { useRef, useState } from "react";
import { ImageIcon, Upload, X, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { api, ApiError } from "@/lib/api";
import type { MediaItem } from "@/lib/types";

/**
 * Uploads straight into the media library and stores the returned URL.
 * Pasting an external URL is also allowed, so images can live on a CDN.
 */
export function ImagePicker({
  value,
  onChange,
}: {
  value: string;
  onChange: (next: string) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  const handleFile = async (file: File | undefined) => {
    if (!file) return;
    setUploading(true);
    try {
      const { data } = await api.upload<MediaItem>("/api/admin/media", file);
      onChange(data.url);
      toast.success("Image uploaded");
    } catch (error) {
      toast.error(error instanceof ApiError ? error.message : "Upload failed");
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex items-start gap-3">
        <div className="grid h-20 w-32 shrink-0 place-items-center overflow-hidden rounded-lg border border-line bg-page">
          {value ? (
            <img src={value} alt="" className="h-full w-full object-cover" />
          ) : (
            <ImageIcon className="h-5 w-5 text-muted" aria-hidden />
          )}
        </div>

        <div className="min-w-0 flex-1 space-y-2">
          <input
            value={value}
            placeholder="https://… or upload a file"
            onChange={(event) => onChange(event.target.value)}
            className="field-input font-mono text-xs"
          />
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              disabled={uploading}
              className="inline-flex h-8 items-center gap-1.5 rounded-md border border-line px-3 text-xs font-medium text-subtle transition-colors hover:bg-raised hover:text-fg disabled:opacity-50"
            >
              {uploading ? (
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
              ) : (
                <Upload className="h-3.5 w-3.5" />
              )}
              {uploading ? "Uploading…" : "Upload"}
            </button>
            {value ? (
              <button
                type="button"
                onClick={() => onChange("")}
                className="inline-flex h-8 items-center gap-1.5 rounded-md border border-line px-3 text-xs font-medium text-subtle transition-colors hover:border-red-500/40 hover:text-red-600 dark:hover:text-red-400"
              >
                <X className="h-3.5 w-3.5" /> Clear
              </button>
            ) : null}
          </div>
        </div>
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/png,image/jpeg,image/webp,image/gif,image/svg+xml"
        className="hidden"
        onChange={(event) => handleFile(event.target.files?.[0])}
      />
      <p className="text-xs text-muted">PNG, JPG, WebP, GIF or SVG · up to 5&nbsp;MB</p>
    </div>
  );
}
