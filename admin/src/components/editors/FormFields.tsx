import { Field } from "@/components/ui/Field";
import { Toggle } from "@/components/ui/States";
import { StringListEditor } from "./StringListEditor";
import { SkillsEditor } from "./SkillsEditor";
import { NavItemsEditor } from "./NavItemsEditor";
import { ImagePicker } from "./ImagePicker";
import type { NavItem, Skill } from "@/lib/types";

export type FieldDef = {
  name: string;
  label: string;
  type:
    | "text"
    | "textarea"
    | "url"
    | "email"
    | "tel"
    | "stringList"
    | "bulletList"
    | "image"
    | "switch"
    | "skills"
    | "navItems";
  placeholder?: string;
  hint?: string;
  required?: boolean;
  rows?: number;
  addLabel?: string;
  /** Full-width inside the two-column grid. Defaults to true for wide editors. */
  wide?: boolean;
};

export type FormValues = Record<string, unknown>;

const WIDE_BY_DEFAULT = new Set(["textarea", "stringList", "bulletList", "skills", "navItems", "image"]);

export function FormFields({
  fields,
  values,
  errors = {},
  onChange,
}: {
  fields: FieldDef[];
  values: FormValues;
  errors?: Record<string, string>;
  onChange: (name: string, value: unknown) => void;
}) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {fields.map((field) => {
        const wide = field.wide ?? WIDE_BY_DEFAULT.has(field.type);
        return (
          <div key={field.name} className={wide ? "sm:col-span-2" : undefined}>
            <FieldControl field={field} values={values} error={errors[field.name]} onChange={onChange} />
          </div>
        );
      })}
    </div>
  );
}

function FieldControl({
  field,
  values,
  error,
  onChange,
}: {
  field: FieldDef;
  values: FormValues;
  error?: string;
  onChange: (name: string, value: unknown) => void;
}) {
  const id = `field-${field.name}`;
  const value = values[field.name];

  if (field.type === "switch") {
    return (
      <div className="flex items-center justify-between rounded-lg border border-line px-3.5 py-2.5">
        <div>
          <p className="text-xs font-medium text-fg">{field.label}</p>
          {field.hint ? <p className="mt-0.5 text-xs text-muted">{field.hint}</p> : null}
        </div>
        <Toggle
          label={field.label}
          checked={Boolean(value)}
          onChange={(next) => onChange(field.name, next)}
        />
      </div>
    );
  }

  return (
    <Field label={field.label} htmlFor={id} hint={field.hint} error={error} required={field.required}>
      {field.type === "textarea" ? (
        <textarea
          id={id}
          rows={field.rows ?? 4}
          value={String(value ?? "")}
          placeholder={field.placeholder}
          onChange={(event) => onChange(field.name, event.target.value)}
          className="field-input resize-y"
        />
      ) : field.type === "stringList" || field.type === "bulletList" ? (
        <StringListEditor
          value={Array.isArray(value) ? (value as string[]) : []}
          onChange={(next) => onChange(field.name, next)}
          placeholder={field.placeholder}
          addLabel={field.addLabel ?? "Add item"}
          multiline={field.type === "bulletList"}
        />
      ) : field.type === "skills" ? (
        <SkillsEditor
          value={Array.isArray(value) ? (value as Skill[]) : []}
          onChange={(next) => onChange(field.name, next)}
        />
      ) : field.type === "navItems" ? (
        <NavItemsEditor
          value={Array.isArray(value) ? (value as NavItem[]) : []}
          onChange={(next) => onChange(field.name, next)}
        />
      ) : field.type === "image" ? (
        <ImagePicker value={String(value ?? "")} onChange={(next) => onChange(field.name, next)} />
      ) : (
        <input
          id={id}
          type={field.type === "text" ? "text" : field.type}
          value={String(value ?? "")}
          placeholder={field.placeholder}
          onChange={(event) => onChange(field.name, event.target.value)}
          className="field-input"
        />
      )}
    </Field>
  );
}
