import { useEffect, useState } from "react";
import { Save } from "lucide-react";
import { PageHeader } from "@/components/Layout";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { ErrorState, Loading } from "@/components/ui/States";
import { FormFields, type FieldDef } from "@/components/editors/FormFields";
import { useProfile, useSaveProfile } from "@/lib/queries";
import type { Profile } from "@/lib/types";

const identityFields: FieldDef[] = [
  { name: "name", label: "Full name", type: "text", required: true, placeholder: "Chandrashekhar Ghosh" },
  { name: "initials", label: "Initials", type: "text", placeholder: "CG", hint: "Shown in the logo mark." },
  { name: "title", label: "Headline", type: "text", placeholder: "MERN Stack Developer" },
  { name: "experience", label: "Years of experience", type: "text", placeholder: "1.5+ Years" },
  { name: "company", label: "Current company", type: "text", placeholder: "Fovty Solutions Pvt. Ltd." },
  { name: "location", label: "Location", type: "text", placeholder: "Indore, Madhya Pradesh, India" },
  {
    name: "tagline",
    label: "Tagline",
    type: "textarea",
    rows: 2,
    placeholder: "One line describing what you build.",
  },
  { name: "avatar", label: "Avatar", type: "image", hint: "Optional. Square images work best." },
  {
    name: "typedRoles",
    label: "Typed roles",
    type: "stringList",
    placeholder: "React & Next.js Developer",
    addLabel: "Add role",
    hint: "Cycled by the animated headline in the hero section.",
  },
];

const contactFields: FieldDef[] = [
  { name: "email", label: "Email", type: "email", placeholder: "you@example.com" },
  { name: "phone", label: "Phone", type: "tel", placeholder: "+91 00000 00000" },
  { name: "phoneAlt", label: "Alternate phone", type: "tel", placeholder: "+91 00000 00000" },
  { name: "github", label: "GitHub URL", type: "url", placeholder: "https://github.com/username" },
  {
    name: "linkedin",
    label: "LinkedIn URL",
    type: "url",
    placeholder: "https://linkedin.com/in/username",
    hint: "Leave empty to hide the LinkedIn icon everywhere it appears.",
  },
];

const navFields: FieldDef[] = [
  {
    name: "navItems",
    label: "Navigation links",
    type: "navItems",
    hint: "Used by both the navbar and the footer.",
  },
];

const resumeFields: FieldDef[] = [
  {
    name: "resumeSummary",
    label: "Résumé summary",
    type: "textarea",
    rows: 6,
    placeholder: "The profile paragraph at the top of your downloadable résumé.",
  },
];

const seoFields: FieldDef[] = [
  { name: "seo.title", label: "Page title", type: "text", placeholder: "Your Name — What You Do" },
  {
    name: "seo.description",
    label: "Meta description",
    type: "textarea",
    rows: 3,
    placeholder: "Around 150–160 characters describing the site.",
  },
  {
    name: "seo.keywords",
    label: "Keywords",
    type: "textarea",
    rows: 2,
    placeholder: "comma, separated, keywords",
  },
  { name: "seo.ogImage", label: "Social share image", type: "image", hint: "1200×630 works best." },
];

/** The nested `seo.*` fields are edited flat and folded back in on save. */
function flatten(profile: Profile): Record<string, unknown> {
  return {
    ...profile,
    "seo.title": profile.seo?.title ?? "",
    "seo.description": profile.seo?.description ?? "",
    "seo.keywords": profile.seo?.keywords ?? "",
    "seo.ogImage": profile.seo?.ogImage ?? "",
  };
}

function unflatten(values: Record<string, unknown>) {
  const payload: Record<string, unknown> = {};
  const seo: Record<string, unknown> = {};

  for (const [key, value] of Object.entries(values)) {
    if (key.startsWith("seo.")) {
      seo[key.slice(4)] = value;
      continue;
    }
    if (key === "id" || key === "seo" || key === "createdAt" || key === "updatedAt" || key === "key") {
      continue;
    }
    payload[key] = value;
  }

  payload.seo = seo;
  payload.typedRoles = (Array.isArray(values.typedRoles) ? values.typedRoles : [])
    .map((role) => String(role).trim())
    .filter(Boolean);
  payload.navItems = (Array.isArray(values.navItems) ? values.navItems : []).filter(
    (item) => (item as { label?: string }).label?.trim(),
  );

  return payload;
}

export function ProfilePage() {
  const { data, isLoading, isError, error, refetch } = useProfile();
  const save = useSaveProfile();

  const [values, setValues] = useState<Record<string, unknown>>({});
  const [dirty, setDirty] = useState(false);

  useEffect(() => {
    if (data) {
      setValues(flatten(data));
      setDirty(false);
    }
  }, [data]);

  if (isLoading) return <Loading label="Loading profile…" />;
  if (isError || !data) {
    return (
      <ErrorState message={(error as Error)?.message ?? "Could not load the profile"} onRetry={refetch} />
    );
  }

  const onChange = (name: string, value: unknown) => {
    setValues((current) => ({ ...current, [name]: value }));
    setDirty(true);
  };

  const onSave = async () => {
    await save.mutateAsync(unflatten(values) as Partial<Profile>);
    setDirty(false);
  };

  const saveButton = (
    <Button onClick={onSave} loading={save.isPending} disabled={!dirty}>
      <Save className="h-4 w-4" /> {dirty ? "Save changes" : "Saved"}
    </Button>
  );

  return (
    <>
      <PageHeader
        title="Profile &amp; SEO"
        description="Your identity, contact details, navigation and search metadata."
        actions={saveButton}
      />

      <div className="space-y-4">
        <Card title="Identity" description="Shown across the hero, about and footer sections.">
          <FormFields fields={identityFields} values={values} onChange={onChange} />
        </Card>

        <Card title="Contact" description="Powers the contact cards and the social links.">
          <FormFields fields={contactFields} values={values} onChange={onChange} />
        </Card>

        <Card title="Navigation" description="The in-page links visitors use to move around.">
          <FormFields fields={navFields} values={values} onChange={onChange} />
        </Card>

        <Card title="Résumé" description="The summary paragraph in the downloadable résumé.">
          <FormFields fields={resumeFields} values={values} onChange={onChange} />
        </Card>

        <Card title="Search &amp; social" description="Title, description and share image for search engines.">
          <FormFields fields={seoFields} values={values} onChange={onChange} />
        </Card>
      </div>

      <div className="mt-5 flex justify-end">{saveButton}</div>
    </>
  );
}
