import { Edit2, Trash2 } from "lucide-react";

export function getPricingColumns({ onEdit, onDelete, isDeleting, page = 1, limit = 10 }) {
  return [
    {
      id: "sno",
      header: "S.No.",
      cell: ({ row }) => (
        <span className="text-sm font-medium text-zinc-500 pl-2">
          {(page - 1) * limit + row.index + 1}
        </span>
      ),
    },
    {
      accessorKey: "title",
      header: "Plan",
      cell: ({ row }) => (
        <div className="pl-2">
          <p className="font-semibold text-zinc-900 dark:text-zinc-50 leading-tight">{row.original.title}</p>
          <p className="text-xs text-zinc-400 font-mono mt-0.5">{row.original.type === 'addon' ? 'addon-' : ''}{row.original.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}</p>
        </div>
      ),
    },
    {
      accessorKey: "type",
      cell: ({ getValue }) => {
        const type = getValue();
        return (
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full border text-[11px] font-semibold capitalize ${type === 'subscription'
            ? 'bg-blue-50 border-blue-200 text-blue-700 dark:bg-blue-900/30 dark:border-blue-800 dark:text-blue-300'
            : 'bg-emerald-50 border-emerald-200 text-emerald-700 dark:bg-emerald-900/30 dark:border-emerald-800 dark:text-emerald-300'
            }`}>
            {type}
          </span>
        );
      },
    },
    {
      accessorKey: "billingCycle",
      header: "Billing",
      cell: ({ row }) => {
        const cycle = row.original.billingCycle;
        let label = cycle;
        if (cycle === 'one_time') label = row.original.price === 0 ? 'Included' : 'One-Time Payment';
        else if (cycle === 'monthly') label = 'Billed Every Month';
        else if (cycle === 'quaterly') label = 'Billed Every 3 Months';
        else if (cycle === 'yearly') label = 'Billed Annually';
        return <span className="text-sm text-zinc-500 dark:text-zinc-400">{label}</span>;
      },
    },
    {
      accessorKey: "totalPrice",
      header: "Price",
      enableSorting: true,
      cell: ({ row }) => (
        <div>
          <p className="font-semibold text-zinc-900 dark:text-zinc-50">₹{row.original.price}</p>
          {row.original.originalPrice ? (
            <p className="text-[11px] text-zinc-400 line-through mt-0.5 font-medium">₹{row.original.originalPrice}</p>
          ) : null}
        </div>
      ),
    },
    {
      accessorKey: "isPopular",
      header: "Status",
      cell: ({ row }) => {
        const { isPopular, badge } = row.original;

        if (isPopular) {
          return <span className="inline-flex px-2.5 py-0.5 rounded-full bg-amber-500 text-white text-[11px] font-bold shadow-sm">Popular</span>;
        }

        if (badge) {
          return <span className="inline-flex px-2.5 py-0.5 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 dark:bg-indigo-900/40 dark:border-indigo-800 dark:text-indigo-300 text-[11px] font-bold">{badge}</span>;
        }

        return <span className="text-xs text-zinc-400">—</span>;
      },
    },
    {
      id: "actions",
      header: "",
      enableSorting: false,
      cell: ({ row }) => (
        <div className="flex items-center justify-end gap-2 pr-3">
          <button
            onClick={() => onEdit(row.original._id)}
            className="w-8 h-8 rounded-md flex items-center justify-center bg-blue-50/50 hover:bg-blue-50 border border-transparent hover:border-blue-100 dark:bg-blue-950/20 dark:hover:bg-blue-900/40 dark:hover:border-blue-800 transition-all"
          >
            <Edit2 className="w-3.5 h-3.5 text-blue-500" />
          </button>
          <button
            disabled={isDeleting}
            onClick={() => onDelete(row.original._id)}
            className="w-8 h-8 rounded-md flex items-center justify-center bg-red-50/50 hover:bg-red-50 border border-transparent hover:border-red-100 dark:bg-red-950/20 dark:hover:bg-red-900/40 dark:hover:border-red-800 transition-all disabled:opacity-40"
          >
            <Trash2 className="w-3.5 h-3.5 text-red-500 dark:text-red-400" />
          </button>
        </div>
      ),
    },
  ];
}