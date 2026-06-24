import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

type PortalTableProps = {
  title: string;
  columns: string[];
  rows: Record<string, string>[];
};

export function PortalTable({ title, columns, rows }: PortalTableProps) {
  return (
    <Card className="overflow-hidden p-0">
      <div className="border-b border-border p-6">
        <h2 className="text-2xl font-black">{title}</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[760px] text-left text-sm">
          <thead className="bg-secondary/70 text-xs uppercase tracking-[0.12em] text-muted-foreground">
            <tr>
              {columns.map((column) => (
                <th key={column} className="px-6 py-4 font-black">
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr key={`${title}-${index}`} className="border-t border-border/70">
                {columns.map((column) => {
                  const value = row[column] ?? "";
                  const looksLikeStatus = ["Completed", "Ready", "Paid", "Open", "Waiting", "Resolved", "Pending", "Complete"].includes(value);
                  return (
                    <td key={column} className="px-6 py-5 text-muted-foreground">
                      {looksLikeStatus ? <Badge variant={value === "Pending" || value === "Open" ? "warning" : "default"}>{value}</Badge> : value}
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
