"use client";

import { useMemo, useState } from "react";
import { Archive, ChevronLeft, ChevronRight, Download, Edit, Filter, Plus, Search, Trash2 } from "lucide-react";
import type { AdminModule, AdminRecord } from "@/lib/admin-data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type CrudModuleProps = {
  module: AdminModule;
};

export function CrudModule({ module }: CrudModuleProps) {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("All");
  const [selected, setSelected] = useState<string[]>([]);
  const [modalMode, setModalMode] = useState<"create" | "edit" | null>(null);
  const [editingRecord, setEditingRecord] = useState<AdminRecord | null>(null);

  const rows = useMemo(() => {
    return module.rows.filter((row) => {
      const matchesQuery = [row.id, row.title, row.category, row.status, row.owner]
        .join(" ")
        .toLowerCase()
        .includes(query.toLowerCase());
      const matchesFilter = filter === "All" || row.status === filter || row.category === filter;
      return matchesQuery && matchesFilter;
    });
  }, [module.rows, query, filter]);

  function toggleRecord(id: string) {
    setSelected((current) => (current.includes(id) ? current.filter((item) => item !== id) : [...current, id]));
  }

  function openEdit(record: AdminRecord) {
    setEditingRecord(record);
    setModalMode("edit");
  }

  return (
    <div className="flex flex-col gap-6">
      <Card className="p-5">
        <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
          <div className="flex flex-1 flex-col gap-3 md:flex-row">
            <div className="flex min-h-12 flex-1 items-center gap-2 rounded-lg border border-border bg-input px-3">
              <Search className="text-muted-foreground" aria-hidden />
              <Input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                className="border-0 bg-transparent focus-visible:ring-0"
                placeholder={`Search ${module.title.toLowerCase()}...`}
              />
            </div>
            <select
              value={filter}
              onChange={(event) => setFilter(event.target.value)}
              className="min-h-12 rounded-lg border border-border bg-input px-4 text-sm font-bold text-foreground"
              aria-label="Filter records"
            >
              {module.filters.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button variant="outline">
              <Filter data-icon="inline-start" />
              Filters
            </Button>
            <Button variant="outline">
              <Download data-icon="inline-start" />
              Export
            </Button>
            <Button onClick={() => setModalMode("create")}>
              <Plus data-icon="inline-start" />
              {module.primaryAction}
            </Button>
          </div>
        </div>
      </Card>

      {selected.length ? (
        <Card className="flex flex-col gap-4 border-primary/45 bg-primary/10 p-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm font-bold">{selected.length} selected</p>
          <div className="flex flex-wrap gap-3">
            <Button variant="outline" size="sm">
              <Archive data-icon="inline-start" />
              Bulk Archive
            </Button>
            <Button variant="outline" size="sm">
              <Trash2 data-icon="inline-start" />
              Bulk Delete
            </Button>
          </div>
        </Card>
      ) : null}

      <Card className="overflow-hidden p-0">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[980px] text-left text-sm">
            <thead className="bg-secondary/70 text-xs uppercase tracking-[0.12em] text-muted-foreground">
              <tr>
                <th className="px-5 py-4">
                  <input
                    type="checkbox"
                    className="size-4 accent-primary"
                    checked={selected.length === rows.length && rows.length > 0}
                    onChange={(event) => setSelected(event.target.checked ? rows.map((row) => row.id) : [])}
                    aria-label="Select all records"
                  />
                </th>
                {module.columns.map((column) => (
                  <th key={column} className="px-5 py-4 font-black">
                    {column}
                  </th>
                ))}
                <th className="px-5 py-4 font-black">Actions</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.id} className="border-t border-border/70">
                  <td className="px-5 py-5">
                    <input
                      type="checkbox"
                      className="size-4 accent-primary"
                      checked={selected.includes(row.id)}
                      onChange={() => toggleRecord(row.id)}
                      aria-label={`Select ${row.title}`}
                    />
                  </td>
                  {module.columns.map((column) => (
                    <td key={column} className="px-5 py-5 text-muted-foreground">
                      {column === "status" ? <StatusBadge status={row[column]} /> : <span>{row[column]}</span>}
                    </td>
                  ))}
                  <td className="px-5 py-5">
                    <div className="flex gap-2">
                      <Button variant="outline" size="icon" onClick={() => openEdit(row)} aria-label={`Edit ${row.title}`}>
                        <Edit aria-hidden />
                      </Button>
                      <Button variant="outline" size="icon" aria-label={`Delete ${row.title}`}>
                        <Trash2 aria-hidden />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex flex-col gap-4 border-t border-border p-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-muted-foreground">
            Showing <span className="font-bold text-foreground">{rows.length}</span> of {module.rows.length} records
          </p>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <ChevronLeft data-icon="inline-start" />
              Previous
            </Button>
            <Button variant="outline" size="sm">
              Next
              <ChevronRight data-icon="inline-end" />
            </Button>
          </div>
        </div>
      </Card>

      {modalMode ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 p-4 backdrop-blur">
          <Card className="w-full max-w-2xl p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-h3 font-black">{modalMode === "create" ? module.primaryAction : `Edit ${editingRecord?.title}`}</h2>
                <p className="mt-2 text-sm text-muted-foreground">Static modal form now, ready for backend create/update actions later.</p>
              </div>
              <Button variant="ghost" size="icon" onClick={() => setModalMode(null)} aria-label="Close form">
                ×
              </Button>
            </div>
            <form className="mt-6 grid gap-5 md:grid-cols-2">
              <div className="flex flex-col gap-2">
                <Label htmlFor="record-title">Title</Label>
                <Input id="record-title" defaultValue={editingRecord?.title} placeholder="Record title" />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="record-category">Category</Label>
                <Input id="record-category" defaultValue={editingRecord?.category} placeholder="Category" />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="record-status">Status</Label>
                <select id="record-status" defaultValue={editingRecord?.status ?? module.filters[1]} className="min-h-12 rounded-lg border border-border bg-input px-4 text-foreground">
                  {module.filters.filter((item) => item !== "All").map((item) => (
                    <option key={item}>{item}</option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="record-owner">Owner</Label>
                <Input id="record-owner" defaultValue={editingRecord?.owner} placeholder="Owner" />
              </div>
              <div className="flex flex-col gap-2 md:col-span-2">
                <Label htmlFor="record-notes">Notes</Label>
                <Textarea id="record-notes" placeholder="Internal notes, SEO copy, client details, or operational context." />
              </div>
              <div className="flex justify-end gap-3 md:col-span-2">
                <Button type="button" variant="outline" onClick={() => setModalMode(null)}>
                  Cancel
                </Button>
                <Button type="button" onClick={() => setModalMode(null)}>
                  Save Record
                </Button>
              </div>
            </form>
          </Card>
        </div>
      ) : null}
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const warning = ["Draft", "New", "In Progress", "Scheduled", "Report Pending", "Renewal Due", "Needs Review", "Waiting"].includes(status);
  const success = ["Published", "Completed", "Converted", "Active", "Optimized", "Indexed"].includes(status);
  return <Badge variant={warning ? "warning" : success ? "success" : "default"}>{status}</Badge>;
}
