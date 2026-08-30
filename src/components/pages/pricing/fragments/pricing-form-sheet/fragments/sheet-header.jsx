"use client";
import { CreditCard, PencilLine } from "lucide-react";

export default function SheetHeader({ isEditing }) {
    return (
        <div className="px-6 py-5 border-b border-zinc-100 dark:border-zinc-800 shrink-0">
            <div className="flex items-center gap-3">
                <div
                    className="w-10 h-10 rounded-md flex items-center justify-center shrink-0"
                    style={{ background: "rgba(242,113,91,0.12)" }}
                >
                    {isEditing
                        ? <PencilLine className="w-5 h-5" style={{ color: "#f2715b" }} />
                        : <CreditCard className="w-5 h-5" style={{ color: "#f2715b" }} />
                    }
                </div>
                <div>
                    <h2 className="text-base font-bold text-zinc-900 dark:text-zinc-50">
                        {isEditing ? "Edit Plan" : "Create New Plan"}
                    </h2>
                    <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-0.5">
                        {isEditing
                            ? "Make changes to your existing pricing plan."
                            : "Add a new subscription tier or addon to your pricing model."}
                    </p>
                </div>
            </div>
        </div>
    );
}
