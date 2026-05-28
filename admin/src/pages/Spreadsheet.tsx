
import { useMemo, useState } from "react";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { products } from "@/lib/mock-data";

export default SpreadsheetPage;

const columns = ["SKU", "Name", "Category", "Price", "Stock", "Supplier", "Updated"] as const;

function SpreadsheetPage() {
  const initialRows = useMemo(
    () =>
      products.map((p) => [
        p.sku,
        p.name,
        p.category,
        p.price.toFixed(2),
        String(p.stock),
        p.supplier,
        p.updatedAt,
      ]),
    [],
  );
  const [rows, setRows] = useState<string[][]>(() => [
    ...initialRows,
    ...Array.from({ length: 6 }, () => Array(columns.length).fill("")),
  ]);

  const update = (r: number, c: number, v: string) => {
    setRows((prev) => {
      const next = prev.map((row) => [...row]);
      next[r][c] = v;
      return next;
    });
  };

  const exportCsv = () => {
    const header = columns.join(",");
    const body = rows
      .filter((r) => r.some((c) => c.trim() !== ""))
      .map((r) => r.map((c) => `"${c.replace(/"/g, '""')}"`).join(","))
      .join("\n");
    const blob = new Blob([header + "\n" + body], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "inventory.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  const colLabel = (i: number) => String.fromCharCode(65 + i);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Spreadsheet</h1>
          <p className="text-sm text-muted-foreground">Edit inventory in a spreadsheet view. Export to CSV / Excel.</p>
        </div>
        <Button size="sm" onClick={exportCsv}>
          <Download className="h-4 w-4 mr-2" /> Export CSV
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-muted/60">
                  <th className="w-10 border-b border-r px-2 py-1.5 text-xs text-muted-foreground"></th>
                  {columns.map((c, i) => (
                    <th
                      key={c}
                      className="min-w-[140px] border-b border-r px-2 py-1.5 text-left text-xs font-medium text-muted-foreground"
                    >
                      <span className="mr-1 text-muted-foreground/60">{colLabel(i)}</span>
                      {c}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((row, r) => (
                  <tr key={r} className="hover:bg-muted/30">
                    <td className="w-10 border-b border-r bg-muted/40 px-2 py-1 text-center text-xs text-muted-foreground">
                      {r + 1}
                    </td>
                    {row.map((cell, c) => (
                      <td key={c} className="border-b border-r p-0">
                        <input
                          value={cell}
                          onChange={(e) => update(r, c, e.target.value)}
                          className="w-full bg-transparent px-2 py-1.5 text-sm outline-none focus:bg-primary/5 focus:ring-1 focus:ring-primary/40"
                        />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
