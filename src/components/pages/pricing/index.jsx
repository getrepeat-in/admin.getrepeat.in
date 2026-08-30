"use client";
import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import PricingTable from "./fragments/pricing-table";
import PricingFormSheet from "./fragments/pricing-form-sheet";

export default function PricingPageComponent() {
    const [isSheetOpen, setIsSheetOpen] = useState(false);
    const [selectedPlanId, setSelectedPlanId] = useState(null);

    const handleCreateNew = () => {
        setSelectedPlanId(null);
        setIsSheetOpen(true);
    };

    const handleEdit = (id) => {
        setSelectedPlanId(id);
        setIsSheetOpen(true);
    };

    return (
        <div className="p-8 mx-auto flex flex-col gap-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Pricing Plans</h1>
                    <p className="text-muted-foreground text-sm mt-1">
                        Manage your subscription plans, addons, and pricing tiers.
                    </p>
                </div>
                <Button onClick={handleCreateNew} className="gap-2 h-9 px-4">
                    <Plus className="w-4 h-4" />
                    Create Plan
                </Button>
            </div>

            <div className="border border-border/60 rounded-xl shadow-sm overflow-hidden bg-white dark:bg-[#0a0a0a]">
                <PricingTable onEdit={handleEdit} />
            </div>

            <PricingFormSheet
                isOpen={isSheetOpen}
                onOpenChange={setIsSheetOpen}
                planIdToEdit={selectedPlanId}
            />
        </div>
    );
}
