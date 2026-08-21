import type { ReactNode } from "react";
import { GripVertical, Plus, Trash2, ArrowUp, ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function IconButton({
  label,
  onClick,
  disabled,
  danger,
  children,
}: {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  danger?: boolean;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      onClick={onClick}
      disabled={disabled}
      className={`grid h-8 w-8 shrink-0 place-items-center rounded-md border border-line text-subtle transition-colors disabled:opacity-35 ${
        danger
          ? "hover:border-red-500/40 hover:bg-red-500/10 hover:text-red-600 dark:hover:text-red-400"
          : "hover:bg-raised hover:text-fg"
      }`}
    >
      {children}
    </button>
  );
}

/** Edits an array of plain strings — tech tags, bullet points, typed roles. */
export function StringListEditor({
  value,
  onChange,
  placeholder = "Add an item",
  addLabel = "Add item",
  multiline = false,
}: {
  value: string[];
  onChange: (next: string[]) => void;
  placeholder?: string;
  addLabel?: string;
  multiline?: boolean;
}) {
  const replaceAt = (index: number, next: string) =>
    onChange(value.map((item, i) => (i === index ? next : item)));

  const move = (index: number, direction: -1 | 1) => {
    const target = index + direction;
    if (target < 0 || target >= value.length) return;
    const next = [...value];
    [next[index], next[target]] = [next[target], next[index]];
    onChange(next);
  };

  return (
    <div className="space-y-2">
      {value.map((item, index) => (
        <div key={index} className="flex items-start gap-1.5">
          <GripVertical className="mt-2.5 h-3.5 w-3.5 shrink-0 text-muted" aria-hidden />
          {multiline ? (
            <textarea
              value={item}
              rows={2}
              placeholder={placeholder}
              onChange={(event) => replaceAt(index, event.target.value)}
              className="field-input resize-y"
            />
          ) : (
            <input
              value={item}
              placeholder={placeholder}
              onChange={(event) => replaceAt(index, event.target.value)}
              className="field-input"
            />
          )}
          <div className="flex shrink-0 gap-0.5">
            <IconButton label="Move up" onClick={() => move(index, -1)} disabled={index === 0}>
              <ArrowUp className="h-3.5 w-3.5" />
            </IconButton>
            <IconButton
              label="Move down"
              onClick={() => move(index, 1)}
              disabled={index === value.length - 1}
            >
              <ArrowDown className="h-3.5 w-3.5" />
            </IconButton>
            <IconButton
              label="Remove"
              danger
              onClick={() => onChange(value.filter((_, i) => i !== index))}
            >
              <Trash2 className="h-3.5 w-3.5" />
            </IconButton>
          </div>
        </div>
      ))}

      <Button type="button" variant="secondary" size="sm" onClick={() => onChange([...value, ""])}>
        <Plus className="h-3.5 w-3.5" /> {addLabel}
      </Button>
    </div>
  );
}
