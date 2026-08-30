import { createApiClient } from '@/lib/api-client';

const api = createApiClient('/api/private/pricing');
export class PricingService {
    static async getPlans(page = 1, limit = 10) {
        const res = await api.get('/', { params: { page, limit } });
        return res.data;
    }

    static async getPlan(id) {
        const res = await api.get(`/${id}`);
        return res.data;
    }

    static async createPlan(data) {
        return await api.post('', data);
    }

    static async updatePlan(id, data) {
        return await api.put(`/${id}`, data);
    }

    static async deletePlan(id) {
        return await api.delete(`/${id}`);
    }
}