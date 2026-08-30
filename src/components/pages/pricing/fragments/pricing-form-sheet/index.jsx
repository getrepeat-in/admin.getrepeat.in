"use client";
import { useEffect } from "react";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import FormBody from "./fragments/form-body";
import { usePricing } from "@/hooks/use-pricing";
import SheetHeader from "./fragments/sheet-header";
import SheetFooter from "./fragments/sheet-footer";
import { zodResolver } from "@hookform/resolvers/zod";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { planSchema, defaultPlanValues } from "../../helpers/schema";

export default function PricingFormSheet({ isOpen, onOpenChange, planIdToEdit }) {
    const isEditing = !!planIdToEdit;
    const { plan: existingPlan, isLoadingPlan, addonPlans, createPlan, isCreating, updatePlan, isUpdating } = usePricing({ planIdToEdit });
    const isSaving = isCreating || isUpdating;

    const form = useForm({
        resolver: zodResolver(planSchema),
        defaultValues: defaultPlanValues,
    });

    useEffect(() => {
        if (existingPlan && isEditing) {
            form.reset({
                ...existingPlan,
                originalPrice: existingPlan.originalPrice || "",
                features: existingPlan.features?.length ? existingPlan.features.map(f => ({ value: f })) : [],
                addons: existingPlan.addons?.map(a => typeof a === 'object' ? a._id : a) ?? [],
            });
        } else if (!isEditing) {
            form.reset(defaultPlanValues);
        }
    }, [existingPlan, isEditing, form]);

    const onSubmit = (values) => {
        const formattedData = {
            ...values,
            features: values.features.map(f => f.value),
            originalPrice: values.originalPrice === "" ? undefined : values.originalPrice,
        };
        if (isEditing) {
            updatePlan({ id: planIdToEdit, data: formattedData }, { onSuccess: () => onOpenChange(false) });
        } else {
            createPlan(formattedData, { onSuccess: () => onOpenChange(false) });
        }
    };

    return (
        <Sheet open={isOpen} onOpenChange={onOpenChange}>
            <SheetContent className="sm:max-w-lg w-full p-0 flex flex-col h-full bg-white dark:bg-zinc-950 border-l border-zinc-200 dark:border-zinc-800 overflow-hidden">

                <SheetHeader isEditing={isEditing} />

                {isLoadingPlan ? (
                    <div className="flex-1 flex items-center justify-center bg-zinc-50 dark:bg-zinc-900">
                        <Loader2 className="w-7 h-7 animate-spin" style={{ color: "#f2715b" }} />
                    </div>
                ) : (
                    <div className="flex-1 min-h-0 overflow-y-auto bg-zinc-50 dark:bg-zinc-900">
                        <FormBody form={form} onSubmit={onSubmit} addonPlans={addonPlans} />
                    </div>
                )}

                <SheetFooter
                    isEditing={isEditing}
                    isSaving={isSaving}
                    onCancel={() => onOpenChange(false)}
                />

            </SheetContent>
        </Sheet>
    );
}
