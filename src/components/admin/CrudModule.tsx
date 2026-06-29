"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import type { AdminModule } from "@/lib/admin-data";
import { DataTable, EmptyState, Input } from "@/design-system";

type CrudModuleProps = {
  module: AdminModule;
};

export function CrudModule({ module }: CrudModuleProps) {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("All");

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

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-3 md:flex-row">
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

      {module.rows.length ? (
        <DataTable
          title={module.title}
          columns={module.columns.map((column) => ({ key: column, header: column }))}
          rows={rows}
          emptyTitle="No matching records"
          emptyDescription="Adjust the search or filter once production records are available."
        />
      ) : (
        <EmptyState
          icon={module.icon}
          title={`${module.title} is ready for live data`}
          description="Static CMS records were removed. This module now provides a clean foundation for API-backed records, validation, permissions, and audit history in the next phase."
        />
      )}
    </div>
  );
}
