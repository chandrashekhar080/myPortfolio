import { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { ArrowDown, ArrowUp, Eye, EyeOff, Pencil, Plus, Trash2 } from "lucide-react";
import { PageHeader } from "@/components/Layout";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { Badge, EmptyState, ErrorState, Loading } from "@/components/ui/States";
import { useConfirm } from "@/components/ui/Confirm";
import { FormFields } from "@/components/editors/FormFields";
import { IconButton } from "@/components/editors/StringListEditor";
import { useCollection, useCollectionMutations } from "@/lib/queries";
import { sectionByKey, type SectionConfig } from "@/lib/sections";
import type { Skill } from "@/lib/types";

type Row = Record<string, unknown> & { id: string; published?: boolean };

export function CollectionPage() {
  const { section = "" } = useParams();
  const config = sectionByKey(section);

  if (!config) return <ErrorState message={`Unknown section: ${section}`} />;

  // Remount on section change so no editor state leaks between sections.
  return <Collection key={config.key} config={config} />;
}

function Collection({ config }: { config: SectionConfig }) {
  const { data, isLoading, isError, error, refetch } = useCollection(config.endpoint);
  const { create, update, remove, setPublished, reorder } = useCollectionMutations(
    config.endpoint,
    config.itemLabel,
  );
  const { ask, dialog } = useConfirm();

  const [editing, setEditing] = useState<Row | null>(null);
  const [creating, setCreating] = useState(false);
  const [values, setValues] = useState<Record<string, unknown>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});

  const rows = (data ?? []) as Row[];
  const visibleCount = useMemo(() => rows.filter((row) => row.published !== false).length, [rows]);

  const openCreate = () => {
    setValues({ ...config.defaults });
    setErrors({});
    setEditing(null);
    setCreating(true);
  };

  const openEdit = (row: Row) => {
    // Start from the defaults so a field added later is never undefined.
    setValues({ ...config.defaults, ...row });
    setErrors({});
    setCreating(false);
    setEditing(row);
  };

  const close = () => {
    setCreating(false);
    setEditing(null);
  };

  const validate = () => {
    const found: Record<string, string> = {};
    for (const field of config.fields) {
      if (!field.required) continue;
      const value = values[field.name];
      if (typeof value !== "string" || value.trim() === "") {
        found[field.name] = `${field.label} is required`;
      }
    }
    setErrors(found);
    return Object.keys(found).length === 0;
  };

  const submit = async () => {
    if (!validate()) return;

    const payload: Record<string, unknown> = {};
    for (const [name, value] of Object.entries(values)) {
      if (name === "id" || name === "createdAt" || name === "updatedAt") continue;
      payload[name] = value;
    }

    // Blank rows an editor left behind should never reach the API.
    for (const field of config.fields) {
      const value = payload[field.name];
      if ((field.type === "stringList" || field.type === "bulletList") && Array.isArray(value)) {
        payload[field.name] = value.map((item) => String(item).trim()).filter(Boolean);
      }
      if (field.type === "skills" && Array.isArray(value)) {
        payload[field.name] = (value as Skill[]).filter((skill) => skill.name.trim() !== "");
      }
    }

    if (editing) {
      await update.mutateAsync({ id: editing.id, values: payload });
    } else {
      await create.mutateAsync(payload);
    }
    close();
  };

  const move = (index: number, direction: -1 | 1) => {
    const target = index + direction;
    if (target < 0 || target >= rows.length) return;
    const next = [...rows];
    [next[index], next[target]] = [next[target], next[index]];
    reorder.mutate(next.map((row) => row.id));
  };

  return (
    <>
      <PageHeader
        title={config.title}
        description={config.description}
        actions={
          <Button onClick={openCreate}>
            <Plus className="h-4 w-4" /> Add {config.itemLabel.toLowerCase()}
          </Button>
        }
      />

      {isLoading ? (
        <Loading />
      ) : isError ? (
        <ErrorState
          message={(error as Error)?.message ?? "Could not load this section"}
          onRetry={refetch}
        />
      ) : rows.length === 0 ? (
        <div className="panel">
          <EmptyState
            title={`No ${config.title.toLowerCase()} yet`}
            body={config.description}
            action={
              <Button size="sm" onClick={openCreate}>
                <Plus className="h-3.5 w-3.5" /> Add the first one
              </Button>
            }
          />
        </div>
      ) : (
        <>
          <p className="mb-3 text-xs text-muted">
            {rows.length} {rows.length === 1 ? "entry" : "entries"} · {visibleCount} visible on the
            site · use the arrows to change the order they appear in.
          </p>

          <ul className="panel divide-y divide-line/70">
            {rows.map((row, index) => {
              const hidden = row.published === false;
              const thumbnail = config.thumbnail?.(row);

              return (
                <li
                  key={row.id}
                  className={`flex items-center gap-3 px-4 py-3 ${hidden ? "opacity-55" : ""}`}
                >
                  <div className="flex shrink-0 flex-col gap-0.5">
                    <IconButton
                      label="Move up"
                      onClick={() => move(index, -1)}
                      disabled={index === 0}
                    >
                      <ArrowUp className="h-3 w-3" />
                    </IconButton>
                    <IconButton
                      label="Move down"
                      onClick={() => move(index, 1)}
                      disabled={index === rows.length - 1}
                    >
                      <ArrowDown className="h-3 w-3" />
                    </IconButton>
                  </div>

                  {thumbnail ? (
                    <img
                      src={thumbnail}
                      alt=""
                      className="hidden h-11 w-20 shrink-0 rounded-md border border-line object-cover sm:block"
                    />
                  ) : null}

                  <div className="min-w-0 flex-1">
                    <p className="flex items-center gap-2 truncate text-sm font-medium">
                      {config.primary(row) || <span className="text-muted">Untitled</span>}
                      {hidden ? <Badge>Hidden</Badge> : null}
                      {row.featured ? <Badge tone="brand">Featured</Badge> : null}
                    </p>
                    {config.secondary ? (
                      <p className="mt-0.5 truncate text-xs text-muted">{config.secondary(row)}</p>
                    ) : null}
                  </div>

                  {config.meta ? (
                    <span className="hidden shrink-0 text-xs text-muted md:block">
                      {config.meta(row)}
                    </span>
                  ) : null}

                  <div className="flex shrink-0 gap-1">
                    <IconButton
                      label={hidden ? "Show on the site" : "Hide from the site"}
                      onClick={() => setPublished.mutate({ id: row.id, published: hidden })}
                    >
                      {hidden ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                    </IconButton>
                    <IconButton label="Edit" onClick={() => openEdit(row)}>
                      <Pencil className="h-3.5 w-3.5" />
                    </IconButton>
                    <IconButton
                      label="Delete"
                      danger
                      onClick={() =>
                        ask({
                          title: `Delete this ${config.itemLabel.toLowerCase()}?`,
                          body: `${config.primary(row) || "This entry"} will be removed from the site permanently. This cannot be undone.`,
                          onConfirm: () => remove.mutateAsync(row.id),
                        })
                      }
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </IconButton>
                  </div>
                </li>
              );
            })}
          </ul>
        </>
      )}

      <Modal
        open={creating || editing !== null}
        title={
          editing ? `Edit ${config.itemLabel.toLowerCase()}` : `New ${config.itemLabel.toLowerCase()}`
        }
        description={config.description}
        onClose={close}
        footer={
          <>
            <Button variant="secondary" onClick={close}>
              Cancel
            </Button>
            <Button onClick={submit} loading={create.isPending || update.isPending}>
              {editing ? "Save changes" : `Add ${config.itemLabel.toLowerCase()}`}
            </Button>
          </>
        }
      >
        <FormFields
          fields={config.fields}
          values={values}
          errors={errors}
          onChange={(name, value) => setValues((current) => ({ ...current, [name]: value }))}
        />
      </Modal>

      {dialog}
    </>
  );
}
