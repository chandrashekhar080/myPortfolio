import { ArrowDown, ArrowUp, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { IconButton } from "./StringListEditor";
import type { NavItem } from "@/lib/types";

/** The navbar/footer links. `href` is usually an in-page anchor such as `#about`. */
export function NavItemsEditor({
  value,
  onChange,
}: {
  value: NavItem[];
  onChange: (next: NavItem[]) => void;
}) {
  const patch = (index: number, changes: Partial<NavItem>) =>
    onChange(value.map((item, i) => (i === index ? { ...item, ...changes } : item)));

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
        <div key={index} className="flex items-center gap-2">
          <input
            value={item.label}
            placeholder="Label"
            onChange={(event) => patch(index, { label: event.target.value })}
            className="field-input"
          />
          <input
            value={item.href}
            placeholder="#section"
            onChange={(event) => patch(index, { href: event.target.value })}
            className="field-input font-mono text-xs"
          />
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
            label="Remove link"
            danger
            onClick={() => onChange(value.filter((_, i) => i !== index))}
          >
            <Trash2 className="h-3.5 w-3.5" />
          </IconButton>
        </div>
      ))}

      <Button
        type="button"
        variant="secondary"
        size="sm"
        onClick={() => onChange([...value, { label: "", href: "#" }])}
      >
        <Plus className="h-3.5 w-3.5" /> Add link
      </Button>
    </div>
  );
}
