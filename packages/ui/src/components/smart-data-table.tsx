import * as React from "react";
import { cn } from "../lib/utils";

export interface DataColumn<Row> {
  key: keyof Row & string;
  header: string;
  render?: (value: Row[keyof Row], row: Row) => React.ReactNode;
}

export function SmartDataTable<Row extends Record<string, React.ReactNode>>({ columns, rows, getRowId, caption, emptyMessage = "No results found.", className }: { columns: DataColumn<Row>[]; rows: Row[]; getRowId: (row: Row) => React.Key; caption: string; emptyMessage?: string; className?: string }) {
  return <div className={cn("overflow-x-auto rounded-lg border", className)}>
    <table className="w-full border-collapse text-sm">
      <caption className="sr-only">{caption}</caption>
      <thead className="bg-muted/60 text-left"><tr>{columns.map(column => <th className="px-4 py-3 font-medium" key={column.key} scope="col">{column.header}</th>)}</tr></thead>
      <tbody className="divide-y">
        {rows.map(row => <tr key={getRowId(row)}>{columns.map(column => <td className="px-4 py-3" key={column.key}>{column.render ? column.render(row[column.key], row) : row[column.key]}</td>)}</tr>)}
        {rows.length === 0 && <tr><td className="px-4 py-8 text-center text-muted-foreground" colSpan={columns.length}>{emptyMessage}</td></tr>}
      </tbody>
    </table>
  </div>;
}
