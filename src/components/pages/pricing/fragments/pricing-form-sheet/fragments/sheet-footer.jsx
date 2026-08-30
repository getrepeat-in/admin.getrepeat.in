"use client";
import { Loader2 } from "lucide-react";

export default function SheetFooter({ isEditing, isSaving, onCancel }) {
    return (
        <div className="px-6 py-4 border-t border-zinc-100 dark:border-zinc-800 bg-white dark:bg-zinc-950 flex items-center gap-3 shrink-0">
            <button
                type="button"
                onClick={onCancel}
                className="flex-1 h-10 rounded-md border border-zinc-200 dark:border-zinc-700 text-sm font-medium text-zinc-600 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors"
            >
                Cancel
            </button>
            <button
                type="submit"
                form="pricing-form"
                disabled={isSaving}
                className="flex-1 h-10 rounded-md text-sm font-semibold text-white flex items-center justify-center gap-2 transition-opacity disabled:opacity-60"
                style={{ background: "#f2715b" }}
            >
                {isSaving && <Loader2 className="w-4 h-4 animate-spin" />}
                {isSaving ? "Saving..." : isEditing ? "Save Changes" : "Create Plan"}
            </button>
        </div>
    );
}
