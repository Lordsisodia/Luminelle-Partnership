// RHF component stubs (doc-only)
// Illustrates how we'll structure reusable form inputs for the admin UI.

import { useFormContext } from "react-hook-form";

export function TextInput({ name, label, ...props }: { name: string; label: string }) {
  const { register, formState: { errors } } = useFormContext();
  const err = errors[name]?.message as string | undefined;
  return (
    <label className="field">
      <span>{label}</span>
      <input {...register(name)} {...props} />
      {err && <small className="error">{err}</small>}
    </label>
  );
}

export function SlugInput({ name="slug", source="title" }: { name?: string; source?: string }) {
  // In real code, add a button to regenerate from source unless locked.
  return <TextInput name={name} label="Slug" />;
}

export function SeoPanel() {
  return (
    <div className="seo-panel">
      <TextInput name="seo.title" label="Meta title" />
      <TextInput name="seo.description" label="Meta description" />
      <TextInput name="seo.ogImage" label="OG image URL" />
    </div>
  );
}

export function StatusSelect() {
  const { register } = useFormContext();
  return (
    <label className="field">
      <span>Status</span>
      <select {...register("status")}>
        <option value="draft">Draft</option>
        <option value="published">Published</option>
      </select>
    </label>
  );
}

export function MediaPickerStub() {
  // Real version will open file picker, convert to WebP, enforce alt/focal
  return <div className="media-picker">[media picker placeholder]</div>;
}

export function BlockEditorStub() {
  // Real version will use tiptap/block set with YouTube embed support
  return <div className="block-editor">[block editor placeholder]</div>;
}
