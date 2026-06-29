"use client";

import type React from "react";
import { useEffect, useMemo, useState } from "react";
import { Edit3, Loader2, Plus, RefreshCw, Search, Trash2, Upload } from "lucide-react";
import type { AdminField, AdminModule } from "@/lib/admin-data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type CrudModuleProps = {
  module: AdminModule;
};

type ApiRecord = Record<string, unknown> & { id: string };
type LoadState = "idle" | "loading" | "error" | "ready";

const PAGE_SIZE = 10;

export function CrudModule({ module }: CrudModuleProps) {
  const [rows, setRows] = useState<ApiRecord[]>([]);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [editing, setEditing] = useState<ApiRecord | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [query, setQuery] = useState("");
  const [filterIndex, setFilterIndex] = useState(0);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [state, setState] = useState<LoadState>("idle");
  const [message, setMessage] = useState("");

  const activeFilter = module.filters[filterIndex] ?? module.filters[0];

  const url = useMemo(() => {
    const params = new URLSearchParams({
      page: String(page),
      pageSize: String(PAGE_SIZE),
      sort: "-createdAt",
    });

    if (query.trim()) params.set("q", query.trim());
    if (activeFilter?.param && activeFilter.value) params.set(activeFilter.param, activeFilter.value);

    return `${module.endpoint}?${params.toString()}`;
  }, [activeFilter, module.endpoint, page, query]);

  async function loadRows() {
    setState("loading");
    setMessage("");

    try {
      const response = await fetch(url, { cache: "no-store" });
      const payload = await response.json();
      if (!response.ok) throw new Error(payload?.error?.message ?? payload?.error ?? "Unable to load records");
      setRows((payload.data?.items ?? []) as ApiRecord[]);
      setTotalPages(Number(payload.data?.pagination?.totalPages ?? 1));
      setSelectedIds(new Set());
      setState("ready");
    } catch (error) {
      setState("error");
      setRows([]);
      setMessage(error instanceof Error ? error.message : "Unable to load records");
    }
  }

  useEffect(() => {
    void loadRows();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);

  function openCreate() {
    setEditing(null);
    setIsCreating(true);
    setMessage("");
  }

  function openEdit(row: ApiRecord) {
    setEditing(row);
    setIsCreating(false);
    setMessage("");
  }

  async function saveRecord(formData: FormData) {
    setState("loading");
    setMessage("");

    try {
      const body = await serializeForm(module.fields, formData);
      const target = editing ? `${module.endpoint}/${editing.id}` : module.endpoint;
      const response = await fetch(target, {
        method: editing ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const payload = await response.json();
      if (!response.ok) throw new Error(payload?.error?.message ?? payload?.error ?? "Save failed");

      setMessage(editing ? "Record updated." : "Record created.");
      setEditing(null);
      setIsCreating(false);
      await loadRows();
    } catch (error) {
      setState("error");
      setMessage(error instanceof Error ? error.message : "Save failed");
    }
  }

  async function deleteRecord(id: string) {
    if (!module.allowDelete && module.allowDelete !== undefined) return;
    setState("loading");
    setMessage("");

    try {
      const response = await fetch(`${module.endpoint}/${id}`, { method: "DELETE" });
      const payload = await response.json();
      if (!response.ok) throw new Error(payload?.error?.message ?? payload?.error ?? "Delete failed");
      setMessage("Record deleted.");
      await loadRows();
    } catch (error) {
      setState("error");
      setMessage(error instanceof Error ? error.message : "Delete failed");
    }
  }

  async function bulkDelete() {
    const ids = [...selectedIds];
    if (!ids.length) return;
    setState("loading");
    setMessage("");

    const results = await Promise.allSettled(ids.map((id) => fetch(`${module.endpoint}/${id}`, { method: "DELETE" })));
    const failed = results.filter((result) => result.status === "rejected").length;
    setMessage(failed ? `${failed} records failed to delete.` : `${ids.length} records deleted.`);
    await loadRows();
  }

  async function uploadMedia(file: File) {
    setState("loading");
    setMessage("");
    try {
      const uploadData = new FormData();
      uploadData.set("file", file);
      uploadData.set("folder", "horexa/media");
      uploadData.set("ownerType", "GENERAL");
      const response = await fetch("/api/upload", { method: "POST", body: uploadData });
      const payload = await response.json();
      if (!response.ok) throw new Error(payload?.error?.message ?? payload?.error ?? "Upload failed");
      setMessage("Media uploaded.");
      await loadRows();
    } catch (error) {
      setState("error");
      setMessage(error instanceof Error ? error.message : "Upload failed");
    }
  }

  const formOpen = isCreating || Boolean(editing);

  return (
    <div className="flex flex-col gap-6">
      <Card className="p-5">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-center">
          <div className="flex min-h-12 flex-1 items-center gap-2 rounded-lg border border-border bg-input px-3">
            <Search className="text-muted-foreground" aria-hidden />
            <Input
              value={query}
              onChange={(event) => {
                setPage(1);
                setQuery(event.target.value);
              }}
              className="border-0 bg-transparent focus-visible:ring-0"
              placeholder={module.searchPlaceholder ?? `Search ${module.title.toLowerCase()}...`}
            />
          </div>
          <select
            value={filterIndex}
            onChange={(event) => {
              setPage(1);
              setFilterIndex(Number(event.target.value));
            }}
            className="min-h-12 rounded-lg border border-border bg-input px-4 text-sm font-bold text-foreground"
            aria-label="Filter records"
          >
            {module.filters.map((filter, index) => (
              <option key={`${filter.label}-${index}`} value={index}>
                {filter.label}
              </option>
            ))}
          </select>
          <Button type="button" variant="outline" onClick={loadRows}>
            <RefreshCw data-icon="inline-start" />
            Refresh
          </Button>
          {module.allowCreate !== false && !module.readOnly ? (
            <Button type="button" onClick={openCreate}>
              <Plus data-icon="inline-start" />
              {module.primaryAction}
            </Button>
          ) : null}
          {module.key === "media" ? (
            <label className="inline-flex min-h-12 cursor-pointer items-center justify-center gap-2 rounded-md bg-orange-sheen px-6 py-3 text-sm font-bold uppercase tracking-[0.08em] text-primary-foreground shadow-glow transition hover:-translate-y-0.5 hover:shadow-glow-lg">
              <Upload aria-hidden />
              Upload Media
              <input
                type="file"
                className="sr-only"
                onChange={(event) => {
                  const file = event.target.files?.[0];
                  if (file) void uploadMedia(file);
                  event.currentTarget.value = "";
                }}
              />
            </label>
          ) : null}
        </div>
        <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
          <Badge variant="secondary">Roles: {module.roles.join(", ")}</Badge>
          {selectedIds.size && module.allowBulkDelete !== false && !module.readOnly ? (
            <Button type="button" variant="outline" size="sm" onClick={bulkDelete}>
              <Trash2 data-icon="inline-start" />
              Delete Selected ({selectedIds.size})
            </Button>
          ) : null}
        </div>
      </Card>

      {message ? (
        <div
          className={`rounded-lg border p-4 text-sm ${state === "error" ? "border-destructive/40 bg-destructive/10 text-destructive" : "border-green-500/40 bg-green-500/10 text-green-300"}`}
          role="status"
        >
          {message}
        </div>
      ) : null}

      {formOpen ? (
        <RecordForm
          module={module}
          record={editing}
          onCancel={() => {
            setEditing(null);
            setIsCreating(false);
          }}
          onSubmit={saveRecord}
        />
      ) : null}

      <Card className="overflow-hidden p-0">
        <div className="flex items-center justify-between border-b border-border p-5">
          <div>
            <h2 className="text-xl font-black">{module.title}</h2>
            <p className="mt-1 text-sm text-muted-foreground">{state === "loading" ? "Loading records..." : `${rows.length} records on this page`}</p>
          </div>
          {state === "loading" ? <Loader2 className="animate-spin text-primary" aria-hidden /> : null}
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[960px] text-left text-sm">
            <thead className="bg-secondary/70 text-xs uppercase tracking-[0.12em] text-muted-foreground">
              <tr>
                <th className="px-5 py-4">
                  <input
                    type="checkbox"
                    aria-label="Select all records"
                    checked={rows.length > 0 && selectedIds.size === rows.length}
                    onChange={(event) => {
                      setSelectedIds(event.target.checked ? new Set(rows.map((row) => row.id)) : new Set());
                    }}
                  />
                </th>
                {module.columns.map((column) => (
                  <th key={column.key} className="px-5 py-4 font-black">
                    {column.label}
                  </th>
                ))}
                <th className="px-5 py-4 font-black">Actions</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.id} className="border-t border-border/70">
                  <td className="px-5 py-4">
                    <input
                      type="checkbox"
                      aria-label={`Select ${displayValue(row.title ?? row.name ?? row.id)}`}
                      checked={selectedIds.has(row.id)}
                      onChange={(event) => {
                        const next = new Set(selectedIds);
                        if (event.target.checked) next.add(row.id);
                        else next.delete(row.id);
                        setSelectedIds(next);
                      }}
                    />
                  </td>
                  {module.columns.map((column) => (
                    <td key={column.key} className="max-w-[280px] truncate px-5 py-4 text-muted-foreground">
                      <CellValue value={row[column.key]} />
                    </td>
                  ))}
                  <td className="px-5 py-4">
                    <div className="flex gap-2">
                      {module.allowEdit !== false && !module.readOnly ? (
                        <Button type="button" size="icon" variant="outline" aria-label="Edit record" onClick={() => openEdit(row)}>
                          <Edit3 aria-hidden />
                        </Button>
                      ) : null}
                      {module.allowDelete !== false && !module.readOnly ? (
                        <Button type="button" size="icon" variant="outline" aria-label="Delete record" onClick={() => void deleteRecord(row.id)}>
                          <Trash2 aria-hidden />
                        </Button>
                      ) : null}
                    </div>
                  </td>
                </tr>
              ))}
              {!rows.length ? (
                <tr>
                  <td colSpan={module.columns.length + 2} className="px-5 py-12 text-center text-muted-foreground">
                    {state === "loading" ? "Loading..." : "No records found. Create a record or adjust search/filter."}
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-between border-t border-border p-5">
          <Button type="button" variant="outline" disabled={page <= 1} onClick={() => setPage((value) => Math.max(1, value - 1))}>
            Previous
          </Button>
          <span className="text-sm text-muted-foreground">
            Page {page} of {totalPages}
          </span>
          <Button type="button" variant="outline" disabled={page >= totalPages} onClick={() => setPage((value) => value + 1)}>
            Next
          </Button>
        </div>
      </Card>
    </div>
  );
}

function RecordForm({
  module,
  record,
  onSubmit,
  onCancel,
}: {
  module: AdminModule;
  record: ApiRecord | null;
  onSubmit: (formData: FormData) => Promise<void>;
  onCancel: () => void;
}) {
  return (
    <Card className="p-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black">{record ? `Edit ${module.title}` : module.primaryAction}</h2>
          <p className="mt-1 text-sm text-muted-foreground">Fields are validated by the backend before records are stored.</p>
        </div>
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
      </div>
      <form
        className="mt-6 grid gap-5 lg:grid-cols-2"
        onSubmit={(event) => {
          event.preventDefault();
          void onSubmit(new FormData(event.currentTarget));
        }}
      >
        {module.fields
          .filter((field) => !(record && field.createOnly))
          .map((field) => (
            <FieldControl key={field.name} field={field} value={record?.[field.name]} />
          ))}
        <div className="flex gap-3 lg:col-span-2">
          <Button type="submit">{record ? "Save Changes" : "Create Record"}</Button>
          <Button type="button" variant="outline" onClick={onCancel}>
            Close
          </Button>
        </div>
      </form>
    </Card>
  );
}

function FieldControl({ field, value }: { field: AdminField; value: unknown }) {
  const defaultValue = formatInputValue(value, field.type);
  const common = {
    id: field.name,
    name: field.name,
    required: field.required,
    disabled: field.readOnly,
  };

  return (
    <div className={field.type === "textarea" || field.type === "json" || field.type === "array" ? "flex flex-col gap-2 lg:col-span-2" : "flex flex-col gap-2"}>
      <Label htmlFor={field.name}>{field.label}</Label>
      {field.type === "textarea" ? (
        <Textarea {...common} defaultValue={defaultValue} />
      ) : field.type === "select" ? (
        <select
          {...common}
          defaultValue={defaultValue}
          className="flex min-h-12 w-full rounded-lg border border-border bg-input px-4 py-3 text-base text-foreground shadow-sm transition focus-visible:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/25"
        >
          <option value="">Select {field.label}</option>
          {field.options?.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      ) : field.type === "boolean" ? (
        <label className="flex min-h-12 items-center gap-3 rounded-lg border border-border bg-input px-4">
          <input type="checkbox" name={field.name} defaultChecked={Boolean(value)} value="true" />
          <span className="text-sm text-muted-foreground">Enabled</span>
        </label>
      ) : field.type === "file" ? (
        <div className="grid gap-3">
          <Input {...common} defaultValue={defaultValue} placeholder="Uploaded file URL" />
          <label className="flex min-h-12 cursor-pointer items-center justify-center gap-2 rounded-lg border border-dashed border-primary/40 bg-primary/5 text-sm font-bold text-primary">
            <Upload aria-hidden />
            Upload file
            <input
              type="file"
              className="sr-only"
              name={`__file_${field.name}`}
              data-target-field={field.name}
              data-folder={field.uploadFolder ?? "horexa/media"}
              data-owner-type={field.uploadOwnerType ?? "GENERAL"}
            />
          </label>
        </div>
      ) : field.type === "json" ? (
        <Textarea {...common} defaultValue={defaultValue} placeholder='{"key":"value"}' />
      ) : field.type === "array" ? (
        <Textarea {...common} defaultValue={defaultValue} placeholder="One item per line, or comma-separated values" />
      ) : (
        <Input {...common} type={field.type === "datetime" ? "datetime-local" : field.type === "date" ? "date" : field.type} defaultValue={defaultValue} />
      )}
    </div>
  );
}

async function serializeForm(fields: AdminField[], formData: FormData) {
  const body: Record<string, unknown> = {};

  for (const field of fields) {
    const file = formData.get(`__file_${field.name}`);

    if (file instanceof File && file.size > 0) {
      const uploadData = new FormData();
      uploadData.set("file", file);
      uploadData.set("folder", field.uploadFolder ?? "horexa/media");
      uploadData.set("ownerType", field.uploadOwnerType ?? "GENERAL");
      const uploadResponse = await fetch("/api/upload", { method: "POST", body: uploadData });
      const uploadPayload = await uploadResponse.json();
      if (!uploadResponse.ok) throw new Error(uploadPayload?.error?.message ?? uploadPayload?.error ?? "Upload failed");
      body[field.name] = uploadPayload.data?.url;
      continue;
    }

    const value = formData.get(field.name);
    if (field.type === "boolean") {
      body[field.name] = value === "true";
      continue;
    }
    if (typeof value !== "string" || value.trim() === "") continue;

    if (field.type === "number") body[field.name] = Number(value);
    else if (field.type === "array") body[field.name] = value.split(/\n|,/).map((item) => item.trim()).filter(Boolean);
    else if (field.type === "json") body[field.name] = JSON.parse(value);
    else if (field.type === "datetime") body[field.name] = new Date(value).toISOString();
    else body[field.name] = value.trim();
  }

  return body;
}

function formatInputValue(value: unknown, type: AdminField["type"]) {
  if (value == null) return "";
  if (type === "array" && Array.isArray(value)) return value.join("\n");
  if (type === "json") return JSON.stringify(value, null, 2);
  if (type === "datetime" && typeof value === "string") return value.slice(0, 16);
  if (value instanceof Date) return value.toISOString().slice(0, 16);
  if (typeof value === "object") return JSON.stringify(value);
  return String(value);
}

function displayValue(value: unknown) {
  if (value == null) return "";
  if (typeof value === "boolean") return value ? "Yes" : "No";
  if (Array.isArray(value)) return value.join(", ");
  if (typeof value === "object") return JSON.stringify(value);
  if (typeof value === "string" && /^\d{4}-\d{2}-\d{2}T/.test(value)) return new Date(value).toLocaleString();
  return String(value);
}

function CellValue({ value }: { value: unknown }) {
  const text = displayValue(value);
  if (["ACTIVE", "PUBLISHED", "COMPLETED", "PAID", "SENT", "OPEN", "NEW"].includes(text)) return <Badge>{text}</Badge>;
  if (["DRAFT", "PENDING", "SCHEDULED", "WAITING", "OVERDUE"].includes(text)) return <Badge variant="warning">{text}</Badge>;
  if (["INACTIVE", "ARCHIVED", "CANCELLED", "CLOSED"].includes(text)) return <Badge variant="secondary">{text}</Badge>;
  return text;
}
