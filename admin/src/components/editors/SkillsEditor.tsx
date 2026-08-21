import { Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { IconButton } from "./StringListEditor";
import type { Skill } from "@/lib/types";

/** Name + 0–100 proficiency rows, the shape the Skills section renders as bars. */
export function SkillsEditor({
  value,
  onChange,
}: {
  value: Skill[];
  onChange: (next: Skill[]) => void;
}) {
  const patch = (index: number, changes: Partial<Skill>) =>
    onChange(value.map((skill, i) => (i === index ? { ...skill, ...changes } : skill)));

  return (
    <div className="space-y-2">
      {value.map((skill, index) => (
        <div key={index} className="flex items-center gap-2">
          <input
            value={skill.name}
            placeholder="Skill name"
            onChange={(event) => patch(index, { name: event.target.value })}
            className="field-input"
          />
          <input
            type="range"
            min={0}
            max={100}
            step={1}
            value={skill.level}
            aria-label={`${skill.name || "Skill"} level`}
            onChange={(event) => patch(index, { level: Number(event.target.value) })}
            className="h-1.5 w-28 shrink-0 cursor-pointer accent-brand-500"
          />
          <input
            type="number"
            min={0}
            max={100}
            value={skill.level}
            aria-label={`${skill.name || "Skill"} level percentage`}
            onChange={(event) =>
              patch(index, { level: Math.min(100, Math.max(0, Number(event.target.value) || 0)) })
            }
            className="field-input w-16 shrink-0 text-center"
          />
          <IconButton
            label="Remove skill"
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
        onClick={() => onChange([...value, { name: "", level: 70 }])}
      >
        <Plus className="h-3.5 w-3.5" /> Add skill
      </Button>
    </div>
  );
}
