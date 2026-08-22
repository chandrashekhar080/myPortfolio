/**
 * Base URL of the API — e.g. https://myportfolio-backend-c8pg.onrender.com
 *
 * Every path in this app already starts with `/api`, so a VITE_API_URL that
 * also ends in `/api` would build `/api/api/...` and 404. Both spellings are
 * accepted here — trailing slashes and a trailing `/api` are stripped — so the
 * value set in Netlify can carry the suffix or not without breaking the build.
 */
const API_URL = (import.meta.env.VITE_API_URL ?? "http://localhost:5000")
  .trim()
  .replace(/\/+$/, "")
  .replace(/\/api$/i, "");
const TOKEN_KEY = "portfolio-admin-token";

export class ApiError extends Error {
  status: number;
  details?: Record<string, string>;

  constructor(status: number, message: string, details?: Record<string, string>) {
    super(message);
    this.status = status;
    this.details = details;
  }
}

export const tokenStore = {
  get: () => localStorage.getItem(TOKEN_KEY),
  set: (token: string) => localStorage.setItem(TOKEN_KEY, token),
  clear: () => localStorage.removeItem(TOKEN_KEY),
};

type ApiEnvelope<T> = {
  success: boolean;
  message?: string;
  data: T;
  meta?: Record<string, unknown>;
  details?: Record<string, string>;
};

type RequestOptions = {
  method?: string;
  body?: unknown;
  /** Set for uploads — the browser must pick the multipart boundary itself. */
  formData?: FormData;
  signal?: AbortSignal;
};

/** Broadcast so AuthContext can drop the session the moment any call 401s. */
function notifyUnauthorized() {
  window.dispatchEvent(new CustomEvent("admin:unauthorized"));
}

export async function apiFetch<T>(path: string, options: RequestOptions = {}): Promise<ApiEnvelope<T>> {
  const { method = "GET", body, formData, signal } = options;
  const token = tokenStore.get();

  const headers: Record<string, string> = {};
  if (token) headers.Authorization = `Bearer ${token}`;
  if (body !== undefined) headers["Content-Type"] = "application/json";

  let response: Response;
  try {
    response = await fetch(`${API_URL}${path}`, {
      method,
      headers,
      credentials: "include",
      body: formData ?? (body === undefined ? undefined : JSON.stringify(body)),
      signal,
    });
  } catch {
    // fetch() rejects identically for a dead server and a CORS block, so name
    // both — the browser console has the specific reason.
    throw new ApiError(
      0,
      `Cannot reach ${API_URL}. Check the backend is running, and that this page's ` +
        `origin (${window.location.origin}) is allowed by CORS_ORIGINS in backend/.env.`,
    );
  }

  const isJson = response.headers.get("content-type")?.includes("application/json");
  const payload = isJson ? await response.json() : null;

  if (!response.ok) {
    if (response.status === 401) notifyUnauthorized();
    throw new ApiError(
      response.status,
      payload?.message ?? `Request failed (${response.status})`,
      payload?.details,
    );
  }

  return payload as ApiEnvelope<T>;
}

export const api = {
  get: <T>(path: string) => apiFetch<T>(path),
  post: <T>(path: string, body?: unknown) => apiFetch<T>(path, { method: "POST", body }),
  put: <T>(path: string, body?: unknown) => apiFetch<T>(path, { method: "PUT", body }),
  patch: <T>(path: string, body?: unknown) => apiFetch<T>(path, { method: "PATCH", body }),
  delete: <T>(path: string) => apiFetch<T>(path, { method: "DELETE" }),
  upload: <T>(path: string, file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    return apiFetch<T>(path, { method: "POST", formData });
  },
};

export { API_URL };
