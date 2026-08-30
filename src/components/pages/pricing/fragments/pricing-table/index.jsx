"use client";
import { useState, useMemo } from "react";
import { PackageSearch } from "lucide-react";
import { usePricing } from "@/hooks/use-pricing";
import { getPricingColumns } from "../../helpers/columns";
import { DataTable } from "@/components/global/data-table";

export default function PricingTable({ onEdit }) {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const { plans, meta, isLoadingPlans, plansError, deletePlan, isDeleting } = usePricing({ page, limit });

  const columns = useMemo(
    () => getPricingColumns({ onEdit, onDelete: deletePlan, isDeleting, page, limit }),
    [onEdit, deletePlan, isDeleting, page, limit]
  );

  return (
    <div className="border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden bg-white dark:bg-zinc-950 shadow-sm">
      <DataTable
        columns={columns}
        data={plans ?? []}
        isLoading={isLoadingPlans}
        error={plansError?.message}
        pageSize={limit}
        pageCount={meta?.totalPages ?? -1}
        rowCount={meta?.total ?? 0}
        pageIndex={page - 1}
        onPaginationChange={(newPageIndex, newPageSize) => {
            setPage(newPageIndex + 1);
            if (newPageSize !== limit) setLimit(newPageSize);
        }}
        emptyState={{
          title: "No pricing plans yet",
          description: "Create your first plan to get started.",
          icon: PackageSearch,
        }}
      />
    </div>
  );
}
