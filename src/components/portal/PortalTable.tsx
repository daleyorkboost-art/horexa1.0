import type { ReactNode } from "react";
import { DataTable, type DataTableColumn } from "@/design-system";

type PortalTableProps = {
  title: string;
  columns: string[];
  rows: Record<string, ReactNode>[];
  emptyTitle?: string;
  emptyDescription?: string;
};

export function PortalTable({ title, columns, rows, emptyTitle, emptyDescription }: PortalTableProps) {
  const tableColumns: DataTableColumn<Record<string, ReactNode>>[] = columns.map((column) => ({
    key: column,
    header: column,
    render: (value) => value as ReactNode,
  }));

  return (
    <DataTable
      title={title}
      columns={tableColumns}
      rows={rows}
      emptyTitle={emptyTitle ?? "No records found"}
      emptyDescription={emptyDescription ?? "There are no database records for this view yet."}
    />
  );
}
