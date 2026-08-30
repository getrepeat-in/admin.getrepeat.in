import * as z from "zod";

export const planSchema = z.object({
    type: z.enum(["subscription", "addon"]),
    title: z.string().min(1, "Title is required"),
    description: z.string().min(1, "Description is required"),
    price: z.coerce.number().min(0, "Price must be >= 0"),
    totalPrice: z.coerce.number().min(0, "Total Price must be >= 0"),
    originalPrice: z.coerce.number().min(0).optional().or(z.literal("")),
    duration: z.coerce.number().int().min(1, "Duration must be at least 1 day"),
    billingCycle: z.string().min(1, "Billing cycle is required"),
    isPopular: z.boolean().default(false),
    badge: z.string().optional(),
    discountPercentage: z.coerce.number().min(0).max(100).default(0),
    taxesPercentage: z.coerce.number().min(0).max(100).default(18),
    features: z.array(z.object({ value: z.string().min(1, "Feature cannot be empty") })).default([]),
    addons: z.array(z.string()).default([]),
});

export const defaultPlanValues = {
    type: "subscription",
    title: "",
    description: "",
    price: 0,
    totalPrice: 0,
    originalPrice: "",
    duration: 30,
    billingCycle: "monthly",
    isPopular: false,
    badge: "",
    discountPercentage: 0,
    taxesPercentage: 18,
    features: [],
    addons: [],
};
