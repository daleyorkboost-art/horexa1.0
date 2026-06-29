import { DataTable } from "@/design-system";

type PortalTableProps = {
  title: string;
  columns: string[];
  rows: Record<string, string>[];
};

export function PortalTable({ title, columns, rows }: PortalTableProps) {
  return (
    <DataTable
      title={title}
      columns={columns.map((column) => ({ key: column, header: column }))}
      rows={rows}
      emptyTitle="No portal records yet"
      emptyDescription="Client records will appear here after the portal is connected to production data."
    />
  );
}
