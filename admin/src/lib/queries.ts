import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { api, ApiError } from "./api";
import type { DashboardStats, MediaItem, Message, Profile } from "./types";

export function reportError(error: unknown, fallback = "Something went wrong") {
  const message = error instanceof ApiError ? error.message : fallback;
  const details = error instanceof ApiError ? error.details : undefined;
  toast.error(message, {
    description: details ? Object.values(details).join(" · ") : undefined,
  });
}

/* ---------------------------------------------------------------- dashboard */

export function useStats() {
  return useQuery({
    queryKey: ["stats"],
    queryFn: () => api.get<DashboardStats>("/api/admin/stats").then((r) => r.data),
  });
}

/* ------------------------------------------------------------------ profile */

export function useProfile() {
  return useQuery({
    queryKey: ["profile"],
    queryFn: () => api.get<Profile>("/api/admin/profile").then((r) => r.data),
  });
}

export function useSaveProfile() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (values: Partial<Profile>) =>
      api.put<Profile>("/api/admin/profile", values).then((r) => r.data),
    onSuccess: (data) => {
      queryClient.setQueryData(["profile"], data);
      queryClient.invalidateQueries({ queryKey: ["stats"] });
      toast.success("Profile saved");
    },
    onError: (error) => reportError(error, "Could not save the profile"),
  });
}

/* -------------------------------------------------- generic list collections */

type Row = Record<string, unknown> & { id: string };

export function useCollection(endpoint: string) {
  return useQuery({
    queryKey: [endpoint],
    queryFn: () => api.get<Row[]>(endpoint).then((r) => r.data),
  });
}

export function useCollectionMutations(endpoint: string, itemLabel: string) {
  const queryClient = useQueryClient();
  const refresh = () => {
    queryClient.invalidateQueries({ queryKey: [endpoint] });
    queryClient.invalidateQueries({ queryKey: ["stats"] });
  };

  const create = useMutation({
    mutationFn: (values: Record<string, unknown>) => api.post<Row>(endpoint, values),
    onSuccess: () => {
      refresh();
      toast.success(`${itemLabel} added`);
    },
    onError: (error) => reportError(error, `Could not add the ${itemLabel.toLowerCase()}`),
  });

  const update = useMutation({
    mutationFn: ({ id, values }: { id: string; values: Record<string, unknown> }) =>
      api.put<Row>(`${endpoint}/${id}`, values),
    onSuccess: () => {
      refresh();
      toast.success(`${itemLabel} updated`);
    },
    onError: (error) => reportError(error, `Could not update the ${itemLabel.toLowerCase()}`),
  });

  const remove = useMutation({
    mutationFn: (id: string) => api.delete(`${endpoint}/${id}`),
    onSuccess: () => {
      refresh();
      toast.success(`${itemLabel} deleted`);
    },
    onError: (error) => reportError(error, `Could not delete the ${itemLabel.toLowerCase()}`),
  });

  // Visibility is a single field, so it goes through PATCH rather than a full PUT.
  const setPublished = useMutation({
    mutationFn: ({ id, published }: { id: string; published: boolean }) =>
      api.patch<Row>(`${endpoint}/${id}`, { published }),
    onSuccess: () => refresh(),
    onError: (error) => reportError(error, "Could not change visibility"),
  });

  const reorder = useMutation({
    mutationFn: (ids: string[]) => api.patch<Row[]>(`${endpoint}/reorder`, { ids }),
    onSuccess: () => refresh(),
    onError: (error) => reportError(error, "Could not save the new order"),
  });

  return { create, update, remove, setPublished, reorder };
}

/* ----------------------------------------------------------------- messages */

export function useMessages(params: { status?: string; q?: string; page?: number }) {
  const search = new URLSearchParams();
  if (params.status) search.set("status", params.status);
  if (params.q) search.set("q", params.q);
  search.set("page", String(params.page ?? 1));

  return useQuery({
    queryKey: ["messages", params],
    queryFn: () =>
      api.get<Message[]>(`/api/admin/messages?${search.toString()}`).then((r) => ({
        items: r.data,
        meta: r.meta as { total: number; unread: number; pages: number; page: number },
      })),
  });
}

export function useMessageMutations() {
  const queryClient = useQueryClient();
  const refresh = () => {
    queryClient.invalidateQueries({ queryKey: ["messages"] });
    queryClient.invalidateQueries({ queryKey: ["stats"] });
  };

  const open = useMutation({
    mutationFn: (id: string) => api.get<Message>(`/api/admin/messages/${id}`).then((r) => r.data),
    onSuccess: refresh,
  });

  const setStatus = useMutation({
    mutationFn: ({ id, status }: { id: string; status: Message["status"] }) =>
      api.patch<Message>(`/api/admin/messages/${id}`, { status }),
    onSuccess: () => {
      refresh();
      toast.success("Message updated");
    },
    onError: (error) => reportError(error),
  });

  const remove = useMutation({
    mutationFn: (id: string) => api.delete(`/api/admin/messages/${id}`),
    onSuccess: () => {
      refresh();
      toast.success("Message deleted");
    },
    onError: (error) => reportError(error),
  });

  return { open, setStatus, remove };
}

/* -------------------------------------------------------------------- media */

export function useMedia() {
  return useQuery({
    queryKey: ["media"],
    queryFn: () => api.get<MediaItem[]>("/api/admin/media").then((r) => r.data),
  });
}

export function useMediaMutations() {
  const queryClient = useQueryClient();
  const refresh = () => {
    queryClient.invalidateQueries({ queryKey: ["media"] });
    queryClient.invalidateQueries({ queryKey: ["stats"] });
  };

  const upload = useMutation({
    mutationFn: (file: File) => api.upload<MediaItem>("/api/admin/media", file),
    onSuccess: () => {
      refresh();
      toast.success("File uploaded");
    },
    onError: (error) => reportError(error, "Upload failed"),
  });

  const remove = useMutation({
    mutationFn: (id: string) => api.delete(`/api/admin/media/${id}`),
    onSuccess: () => {
      refresh();
      toast.success("File deleted");
    },
    onError: (error) => reportError(error),
  });

  return { upload, remove };
}
