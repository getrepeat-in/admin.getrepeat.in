export function SectionLabel({ children }) {
    return (
        <div className="flex items-center gap-3 pt-1">
            <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 dark:text-zinc-500 shrink-0">
                {children}
            </p>
            <div className="flex-1 h-px bg-zinc-100 dark:bg-zinc-800" />
        </div>
    );
}

export function FieldLabel({ children }) {
    return (
        <p className="text-[10px] font-semibold uppercase tracking-widest text-zinc-400 dark:text-zinc-500 mb-1.5">
            {children}
        </p>
    );
}

export const inputCls = "w-full bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-700 rounded-md text-sm px-3 h-10 text-zinc-800 dark:text-zinc-200 placeholder:text-zinc-400 outline-none focus:border-[#f2715b] transition-colors";
