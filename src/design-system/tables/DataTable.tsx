import type { ReactNode } from "react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { EmptyState } from "@/design-system/feedback/EmptyState";
import { SectionTitle } from "@/design-system/primitives/Typography";

export type DataTableColumn<Row> = {
  key: keyof Row & string;
  header: string;
  render?: (value: Row[keyof Row], row: Row) => ReactNode;
};

type DataTableProps<Row extends Record<string, unknown>> = {
  title: string;
  columns: DataTableColumn<Row>[];
  rows: Row[];
  emptyTitle?: string;
  emptyDescription?: string;
};

const statusValues = new Set(["Completed", "Ready", "Paid", "Open", "Waiting", "Resolved", "Pending", "Complete"]);

export function DataTable<Row extends Record<string, unknown>>({
  title,
  columns,
  rows,
  emptyTitle = "No records yet",
  emptyDescription = "Records will appear here when production data is connected.",
}: DataTableProps<Row>) {
  if (!rows.length) {
    return <EmptyState title={emptyTitle} description={emptyDescription} />;
  }

  return (
    <Card className="overflow-hidden p-0">
      <div className="border-b border-border p-6">
        <SectionTitle>{title}</SectionTitle>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[760px] text-left text-sm">
          <thead className="bg-secondary/70 text-xs uppercase tracking-[0.12em] text-muted-foreground">
            <tr>
              {columns.map((column) => (
                <th key={column.key} className="px-6 py-4 font-black">
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr key={`${title}-${index}`} className="border-t border-border/70">
                {columns.map((column) => {
                  const value = row[column.key];
                  const rendered = column.render?.(value, row);
                  const textValue = typeof value === "string" ? value : value == null ? "" : String(value);
                  const looksLikeStatus = statusValues.has(textValue);

                  return (
                    <td key={column.key} className="px-6 py-5 text-muted-foreground">
                      {rendered ??
                        (looksLikeStatus ? (
                          <Badge variant={textValue === "Pending" || textValue === "Open" ? "warning" : "default"}>
                            {textValue}
                          </Badge>
                        ) : (
                          textValue
                        ))}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
