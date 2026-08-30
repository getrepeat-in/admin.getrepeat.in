"use client";
import { cn } from "@/lib/utils";
import { useRef, useState, useEffect } from "react";
import { useFieldArray, useWatch } from "react-hook-form";
import { SectionLabel, FieldLabel, inputCls } from "./ui";
import { PLAN_TYPES, BILLING_CYCLES } from "../helpers/constants";
import { Plus, Trash2, Star, CheckCircle2, Puzzle, ChevronDown } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormDescription, FormField, FormItem, FormMessage } from "@/components/ui/form";

function AddonDropdown({ options, onSelect }) {
    const [open, setOpen] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);

    return (
        <div ref={ref} className="relative">
            <button
                type="button"
                onClick={() => setOpen(v => !v)}
                className={cn(
                    "w-full flex items-center justify-between h-10 px-3 rounded-md border text-sm transition-colors bg-white dark:bg-zinc-950",
                    open
                        ? "border-[#f2715b] text-zinc-700 dark:text-zinc-200"
                        : "border-zinc-200 dark:border-zinc-700 text-zinc-400 hover:border-zinc-300"
                )}
            >
                <span>{options.length > 0 ? "Select addon to link..." : "All addons linked"}</span>
                <ChevronDown className={cn("w-4 h-4 transition-transform text-zinc-400", open && "rotate-180")} />
            </button>

            {open && options.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-1 z-50 bg-white dark:bg-zinc-950 border border-zinc-100 dark:border-zinc-800 rounded-lg shadow-lg overflow-hidden">
                    {options.map(addon => (
                        <button
                            key={addon._id}
                            type="button"
                            onClick={() => { onSelect(addon._id); setOpen(false); }}
                            className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors text-left"
                        >
                            <div className="w-7 h-7 rounded-md bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center shrink-0">
                                <Puzzle className="w-3.5 h-3.5 text-zinc-400" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-zinc-800 dark:text-zinc-100 truncate">{addon.title}</p>
                                <p className="text-[11px] text-zinc-400">₹{addon.price} · {addon.billingCycle}</p>
                            </div>
                            <div className="w-5 h-5 rounded-full border-2 border-zinc-200 dark:border-zinc-600 flex items-center justify-center shrink-0">
                                <Plus className="w-3 h-3 text-zinc-400" />
                            </div>
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}

export default function FormBody({ form, onSubmit, addonPlans = [] }) {
    const { fields, append, remove } = useFieldArray({ control: form.control, name: "features" });
    const planType = useWatch({ control: form.control, name: "type" });

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} id="pricing-form" className="px-6 py-5 space-y-5">

                <FormField control={form.control} name="title" render={({ field }) => (
                    <FormItem className="space-y-1">
                        <FieldLabel>Plan Title</FieldLabel>
                        <FormControl>
                            <input className={inputCls} placeholder="e.g. Pro Plan" {...field} />
                        </FormControl>
                        <FormMessage className="text-xs" />
                    </FormItem>
                )} />

                <FormField control={form.control} name="description" render={({ field }) => (
                    <FormItem className="space-y-1">
                        <FieldLabel>Description</FieldLabel>
                        <FormControl>
                            <textarea
                                rows={3}
                                placeholder="Describe this plan..."
                                className={cn(inputCls, "h-auto py-2.5 resize-none")}
                                {...field}
                            />
                        </FormControl>
                        <FormMessage className="text-xs" />
                    </FormItem>
                )} />

                <div className="grid grid-cols-2 gap-4">
                    <FormField control={form.control} name="type" render={({ field }) => (
                        <FormItem className="space-y-1">
                            <FieldLabel>Plan Type</FieldLabel>
                            <Select onValueChange={field.onChange} value={field.value}>
                                <FormControl>
                                    <SelectTrigger className="w-full h-10 rounded-md border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-950 pl-3 pr-2.5 text-sm text-zinc-800 dark:text-zinc-200 focus-visible:border-[#f2715b] focus-visible:ring-0 data-[size=default]:h-10">
                                        <SelectValue placeholder="Select type" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent className="w-full rounded-lg border border-zinc-100 dark:border-zinc-800 bg-white dark:bg-zinc-950 shadow-lg p-1">
                                    {PLAN_TYPES.map(opt => (
                                        <SelectItem
                                            key={opt.value}
                                            value={opt.value}
                                            className="rounded-md text-sm py-2.5 px-3 cursor-pointer data-highlighted:bg-[#f2715b]/8 data-highlighted:text-zinc-900"
                                        >
                                            {opt.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <FormMessage className="text-xs" />
                        </FormItem>
                    )} />

                    <FormField control={form.control} name="billingCycle" render={({ field }) => (
                        <FormItem className="space-y-1">
                            <FieldLabel>Billing Cycle</FieldLabel>
                            <Select onValueChange={field.onChange} value={field.value}>
                                <FormControl>
                                    <SelectTrigger className="w-full h-10 rounded-md border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-950 pl-3 pr-2.5 text-sm text-zinc-800 dark:text-zinc-200 focus-visible:border-[#f2715b] focus-visible:ring-0 data-[size=default]:h-10">
                                        <SelectValue placeholder="Select cycle" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent className="w-full rounded-lg border border-zinc-100 dark:border-zinc-800 bg-white dark:bg-zinc-950 shadow-lg p-1">
                                    {BILLING_CYCLES.map(opt => (
                                        <SelectItem
                                            key={opt.value}
                                            value={opt.value}
                                            className="rounded-md text-sm py-2.5 px-3 cursor-pointer data-highlighted:bg-[#f2715b]/8 data-highlighted:text-zinc-900"
                                        >
                                            {opt.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <FormMessage className="text-xs" />
                        </FormItem>
                    )} />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <FormField control={form.control} name="price" render={({ field }) => (
                        <FormItem className="space-y-1">
                            <FieldLabel>Base Price (₹)</FieldLabel>
                            <FormControl>
                                <input type="number" min="0" className={inputCls} {...field} />
                            </FormControl>
                            <FormMessage className="text-xs" />
                        </FormItem>
                    )} />
                    <FormField control={form.control} name="totalPrice" render={({ field }) => (
                        <FormItem className="space-y-1">
                            <FieldLabel>Total Price (₹)</FieldLabel>
                            <FormControl>
                                <input type="number" min="0" className={inputCls} {...field} />
                            </FormControl>
                            <FormMessage className="text-xs" />
                        </FormItem>
                    )} />
                    <FormField control={form.control} name="originalPrice" render={({ field }) => (
                        <FormItem className="space-y-1">
                            <FieldLabel>Original (₹)</FieldLabel>
                            <FormControl>
                                <input type="number" min="0" placeholder="e.g. 1999" className={inputCls} {...field} />
                            </FormControl>
                            <FormMessage className="text-xs" />
                        </FormItem>
                    )} />
                    <FormField control={form.control} name="duration" render={({ field }) => (
                        <FormItem className="space-y-1">
                            <FieldLabel>Duration (days)</FieldLabel>
                            <FormControl>
                                <input type="number" min="1" placeholder="e.g. 30" className={inputCls} {...field} />
                            </FormControl>
                            <FormDescription className="text-[10px] text-zinc-400">Number of days</FormDescription>
                            <FormMessage className="text-xs" />
                        </FormItem>
                    )} />
                    <FormField control={form.control} name="discountPercentage" render={({ field }) => (
                        <FormItem className="space-y-1">
                            <FieldLabel>Discount %</FieldLabel>
                            <FormControl>
                                <input type="number" min="0" max="100" className={inputCls} {...field} />
                            </FormControl>
                            <FormMessage className="text-xs" />
                        </FormItem>
                    )} />
                    <FormField control={form.control} name="taxesPercentage" render={({ field }) => (
                        <FormItem className="space-y-1">
                            <FieldLabel>Tax %</FieldLabel>
                            <FormControl>
                                <input type="number" min="0" max="100" className={inputCls} {...field} />
                            </FormControl>
                            <FormMessage className="text-xs" />
                        </FormItem>
                    )} />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <FormField control={form.control} name="badge" render={({ field }) => (
                        <FormItem className="space-y-1">
                            <FieldLabel>Badge Label</FieldLabel>
                            <FormControl>
                                <input placeholder="e.g. Best Value" className={inputCls} {...field} />
                            </FormControl>
                            <FormMessage className="text-xs" />
                        </FormItem>
                    )} />

                    <FormField control={form.control} name="isPopular" render={({ field }) => (
                        <FormItem className="space-y-1">
                            <FieldLabel>Popular Plan</FieldLabel>
                            <FormControl>
                                <div className="flex gap-2">
                                    <button
                                        type="button"
                                        onClick={() => field.onChange(true)}
                                        className={cn(
                                            "flex-1 flex items-center justify-center gap-1.5 h-10 rounded-md text-xs font-semibold border transition-colors",
                                            field.value
                                                ? "bg-[#f2715b] border-[#f2715b] text-white"
                                                : "bg-white dark:bg-zinc-950 border-zinc-200 dark:border-zinc-700 text-zinc-500"
                                        )}
                                    >
                                        <Star className="w-3.5 h-3.5" /> Yes
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => field.onChange(false)}
                                        className={cn(
                                            "flex-1 flex items-center justify-center gap-1.5 h-10 rounded-md text-xs font-semibold border transition-colors",
                                            !field.value
                                                ? "bg-zinc-800 border-zinc-800 text-white dark:bg-zinc-200 dark:border-zinc-200 dark:text-zinc-900"
                                                : "bg-white dark:bg-zinc-950 border-zinc-200 dark:border-zinc-700 text-zinc-500"
                                        )}
                                    >
                                        No
                                    </button>
                                </div>
                            </FormControl>
                        </FormItem>
                    )} />
                </div>

                <SectionLabel>Features</SectionLabel>

                <div className="space-y-2">
                    {fields.map((field, index) => (
                        <FormField
                            key={field.id}
                            control={form.control}
                            name={`features.${index}.value`}
                            render={({ field: inputField }) => (
                                <FormItem>
                                    <FormControl>
                                        <div className="flex items-center gap-2">
                                            <div className="flex-1 flex items-center bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-700 rounded-md overflow-hidden focus-within:border-[#f2715b] transition-colors">
                                                <div className="flex items-center justify-center w-9 shrink-0 self-stretch border-r border-zinc-100 dark:border-zinc-800">
                                                    <CheckCircle2 className="w-3.5 h-3.5 text-[#f2715b]" />
                                                </div>
                                                <input
                                                    placeholder={`Feature ${index + 1}`}
                                                    className="flex-1 bg-transparent border-none outline-none text-sm px-3 py-2.5 text-zinc-800 dark:text-zinc-200 placeholder:text-zinc-400 h-10"
                                                    {...inputField}
                                                />
                                            </div>
                                            <button
                                                type="button"
                                                onClick={() => remove(index)}
                                                className="w-9 h-10 flex items-center justify-center rounded-md bg-red-50 hover:bg-red-100 dark:bg-red-950/30 dark:hover:bg-red-900/40 transition-colors shrink-0"
                                            >
                                                <Trash2 className="w-3.5 h-3.5 text-red-500" />
                                            </button>
                                        </div>
                                    </FormControl>
                                    <FormMessage className="text-xs" />
                                </FormItem>
                            )}
                        />
                    ))}

                    <button
                        type="button"
                        onClick={() => append({ value: "" })}
                        className="w-full flex items-center justify-center gap-2 border border-dashed border-zinc-300 dark:border-zinc-700 rounded-md py-2.5 text-xs font-medium text-zinc-400 hover:text-[#f2715b] hover:border-[#f2715b]/50 transition-colors"
                    >
                        <Plus className="w-3.5 h-3.5" />
                        Add Feature
                    </button>
                </div>

                {planType === "subscription" && addonPlans.length > 0 && (
                    <>
                        <SectionLabel>Linked Addons</SectionLabel>
                        <FormField
                            control={form.control}
                            name="addons"
                            render={({ field }) => {
                                const selectedIds = field.value ?? [];
                                const selectedAddons = addonPlans.filter(a => selectedIds.includes(a._id));
                                const unselectedAddons = addonPlans.filter(a => !selectedIds.includes(a._id));

                                const addAddon = (id) => field.onChange([...selectedIds, id]);
                                const removeAddon = (id) => field.onChange(selectedIds.filter(x => x !== id));

                                return (
                                    <FormItem className="space-y-2">
                                        <AddonDropdown
                                            options={unselectedAddons}
                                            onSelect={addAddon}
                                        />
                                        {selectedAddons.length > 0 && (
                                            <div className="flex flex-col gap-2 pt-2">
                                                {selectedAddons.map(addon => (
                                                    <button
                                                        key={addon._id}
                                                        type="button"
                                                        onClick={() => removeAddon(addon._id)}
                                                        className="flex items-center gap-3 w-full px-3.5 py-3 rounded-md border border-[#f2715b]/40 bg-[#f2715b]/5 dark:bg-[#f2715b]/10 text-left transition-all"
                                                    >
                                                        <div className="w-8 h-8 rounded-md bg-[#f2715b]/15 flex items-center justify-center shrink-0">
                                                            <Puzzle className="w-4 h-4 text-[#f2715b]" />
                                                        </div>
                                                        <div className="flex-1 min-w-0">
                                                            <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-50 truncate">
                                                                {addon.title}
                                                            </p>
                                                            <p className="text-[11px] text-zinc-400 mt-0.5">
                                                                ₹{addon.price} · {addon.billingCycle === 'one_time' ? 'One-time payment' : addon.billingCycle}
                                                            </p>
                                                        </div>
                                                        <div className="w-5 h-5 rounded-full border-2 border-[#f2715b] bg-[#f2715b] flex items-center justify-center shrink-0">
                                                            <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                                            </svg>
                                                        </div>
                                                    </button>
                                                ))}
                                            </div>
                                        )}
                                        <FormMessage className="text-xs" />
                                    </FormItem>
                                );
                            }}
                        />
                    </>
                )}
            </form>
        </Form>
    );
}
