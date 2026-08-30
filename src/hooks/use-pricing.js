import useNotification from './use-notification';
import { PricingService } from '@/services/frontend/pricing.service';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

export const queryKeys = {
    plans: (page, limit) => ['plans', page, limit],
    plan: (id) => ['plan', id],
};

export function usePricing({ planIdToEdit, page = 1, limit = 10 } = {}) {
    const queryClient = useQueryClient();

    const plansQuery = useQuery({
        queryKey: queryKeys.plans(page, limit),
        queryFn: () => PricingService.getPlans(page, limit),
    });

    const planQuery = useQuery({
        queryKey: queryKeys.plan(planIdToEdit),
        queryFn: () => PricingService.getPlan(planIdToEdit),
        enabled: !!planIdToEdit,
    });

    const addonPlans = plansQuery.data?.plans?.filter(p => p.type === 'addon') ?? [];
    const subscriptionPlans = plansQuery.data?.plans?.filter(p => p.type === 'subscription') ?? [];

    const notify = useNotification();

    const createPlanMutation = useMutation({
        mutationFn: (data) => PricingService.createPlan(data),
        onSuccess: (response) => {
            queryClient.invalidateQueries({ queryKey: ['plans'] });
            notify.success(response?.message || "Plan created successfully");
        },
        onError: (err) => {
            notify.error(err.message || "Failed to create plan");
        }
    });

    const updatePlanMutation = useMutation({
        mutationFn: ({ id, data }) => PricingService.updatePlan(id, data),
        onSuccess: (response, variables) => {
            queryClient.invalidateQueries({ queryKey: queryKeys.plan(variables.id) });
            queryClient.invalidateQueries({ queryKey: ['plans'] });
            notify.success(response?.message || "Plan updated successfully");
        },
        onError: (err) => {
            notify.error(err.message || "Failed to update plan");
        }
    });

    const deletePlanMutation = useMutation({
        mutationFn: (id) => PricingService.deletePlan(id),
        onSuccess: (response) => {
            queryClient.invalidateQueries({ queryKey: ['plans'] });
            notify.success(response?.message || "Plan deleted successfully");
        },
        onError: (err) => {
            notify.error(err.message || "Failed to delete plan");
        }
    });

    return {
        plan: planQuery.data,
        isLoadingPlan: planQuery.isLoading,
        addonPlans,
        subscriptionPlans,
        plans: plansQuery.data?.plans,
        meta: plansQuery.data?.meta,
        isLoadingPlans: plansQuery.isLoading,
        plansError: plansQuery.error,
        createPlan: createPlanMutation.mutate,
        isCreating: createPlanMutation.isPending,
        updatePlan: updatePlanMutation.mutate,
        isUpdating: updatePlanMutation.isPending,
        deletePlan: deletePlanMutation.mutate,
        isDeleting: deletePlanMutation.isPending,
    };
}
