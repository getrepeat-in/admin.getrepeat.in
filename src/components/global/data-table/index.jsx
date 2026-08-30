"use client";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ChevronLeft, ChevronRight, ChevronsUpDown, ChevronUp, ChevronDown, Inbox } from "lucide-react";
import { flexRender, getCoreRowModel, useReactTable, getPaginationRowModel, getSortedRowModel } from "@tanstack/react-table";

function DataTableSortIcon({ column }) {
  const sorted = column.getIsSorted();
  if (sorted === "asc") return <ChevronUp className="w-3.5 h-3.5 text-foreground" />;
  if (sorted === "desc") return <ChevronDown className="w-3.5 h-3.5 text-foreground" />;
  return <ChevronsUpDown className="w-3.5 h-3.5 opacity-40" />;
}

function DataTableLoadingSkeleton({ columnCount = 5, rowCount = 5 }) {
  return (
    <div className="p-4 space-y-2">
      {Array.from({ length: rowCount }).map((_, i) => (
        <div key={i} className="flex gap-4">
          {Array.from({ length: columnCount }).map((_, j) => (
            <Skeleton key={j} className="h-10 flex-1 rounded-lg" />
          ))}
        </div>
      ))}
    </div>
  );
}

function DataTableEmpty({ emptyState }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-muted-foreground gap-4">
      <div className="p-5 rounded-full bg-zinc-100 dark:bg-zinc-900">
        <Inbox className="w-8 h-8 opacity-40" />
      </div>
      <div className="text-center">
        <p className="font-medium text-foreground text-base">
          {emptyState?.title ?? "No results found"}
        </p>
        <p className="text-sm mt-1">
          {emptyState?.description ?? "There's nothing to show here yet."}
        </p>
      </div>
    </div>
  );
}

export function DataTable({ 
  columns, 
  data = [], 
  isLoading = false, 
  error, 
  enablePagination = true, 
  pageSize = 10, 
  pageCount,
  rowCount,
  pageIndex = 0,
  onPaginationChange,
  emptyState, 
  className 
}) {
  const [sorting, setSorting] = useState([]);

  const table = useReactTable({
    data,
    columns,
    state: { 
      sorting,
      ...(enablePagination ? {
        pagination: {
          pageIndex,
          pageSize,
        }
      } : {})
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: enablePagination && pageCount === undefined ? getPaginationRowModel() : undefined,
    manualPagination: pageCount !== undefined,
    pageCount: pageCount,
    rowCount: rowCount,
    onPaginationChange: (updater) => {
      if (onPaginationChange) {
        const nextState = typeof updater === "function" ? updater({ pageIndex, pageSize }) : updater;
        onPaginationChange(nextState.pageIndex, nextState.pageSize);
      }
    },
  });

  if (isLoading) {
    return <DataTableLoadingSkeleton columnCount={columns.length} />;
  }

  if (error) {
    return (
      <div className="p-8 text-center text-red-500 text-sm">
        {typeof error === "string" ? error : "Failed to load data."}
      </div>
    );
  }

  return (
    <div className={cn("flex flex-col", className)}>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                key={headerGroup.id}
                className="bg-zinc-50/70 dark:bg-zinc-900/70 hover:bg-zinc-50/70 dark:hover:bg-zinc-900/70"
              >
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className={cn(
                      "text-xs font-semibold uppercase tracking-wider text-muted-foreground py-3",
                      header.column.getCanSort() && "cursor-pointer select-none"
                    )}
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    {header.isPlaceholder ? null : (
                      <div className="flex items-center gap-1.5">
                        {flexRender(header.column.columnDef.header, header.getContext())}
                        {header.column.getCanSort() && (
                          <DataTableSortIcon column={header.column} />
                        )}
                      </div>
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {table.getRowModel().rows.length === 0 ? (
              <TableRow className="hover:bg-transparent">
                <TableCell colSpan={columns.length} className="p-0">
                  <DataTableEmpty emptyState={emptyState} />
                </TableCell>
              </TableRow>
            ) : (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  className="border-b border-border/50 transition-colors hover:bg-zinc-50/50 dark:hover:bg-zinc-900/40"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="py-3.5 text-sm">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {enablePagination && table.getPageCount() > 0 && (
        <div className="flex flex-col sm:flex-row items-center justify-between px-6 py-4 border-t border-border/50 gap-4">
          <span className="text-sm text-muted-foreground whitespace-nowrap">
            Showing{" "}
            <span className="font-medium text-foreground">
              {table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1}
            </span>{" "}
            to{" "}
            <span className="font-medium text-foreground">
              {Math.min(
                (table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize,
                table.getRowCount()
              )}
            </span>{" "}
            of{" "}
            <span className="font-medium text-foreground">{table.getRowCount()}</span> results
          </span>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="h-9 px-4 text-sm font-medium"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Previous
            </Button>
            
            <div className="hidden sm:flex items-center gap-1">
              {Array.from({ length: Math.min(5, table.getPageCount()) }, (_, i) => {
                // Calculate page numbers to show around current page
                let pageNumber = i;
                const currentPage = table.getState().pagination.pageIndex;
                const totalPages = table.getPageCount();
                
                if (totalPages > 5) {
                  if (currentPage > 2 && currentPage < totalPages - 2) {
                    pageNumber = currentPage - 2 + i;
                  } else if (currentPage >= totalPages - 2) {
                    pageNumber = totalPages - 5 + i;
                  }
                }
                
                const isActive = pageNumber === currentPage;
                
                return (
                  <Button
                    key={pageNumber}
                    variant={isActive ? "default" : "outline"}
                    size="icon"
                    className={cn(
                      "h-9 w-9 text-sm font-medium transition-colors",
                      isActive 
                        ? "bg-blue-600 hover:bg-blue-700 text-white border-transparent" 
                        : "text-muted-foreground hover:text-foreground"
                    )}
                    onClick={() => table.setPageIndex(pageNumber)}
                  >
                    {pageNumber + 1}
                  </Button>
                );
              })}
            </div>

            <Button
              variant="outline"
              size="sm"
              className="h-9 px-4 text-sm font-medium"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
