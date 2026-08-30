import Plan from '@/models/plan';
import connectToDatabase from '@/lib/mongodb';
import { successResponse, errorResponse } from '@/lib/apiResponse';

export async function GET(request) {
    try {
        await connectToDatabase();
        const { searchParams } = new URL(request.url);
        const page = parseInt(searchParams.get('page') || '1', 10);
        const limit = parseInt(searchParams.get('limit') || '10', 10);
        const type = searchParams.get('type');
        const skip = (page - 1) * limit;

        const filter = {};
        if (type) {
            filter.type = type;
        }

        const total = await Plan.countDocuments(filter);
        const plans = await Plan.find(filter)
            .populate('addons')
            .sort({ totalPrice: 1 })
            .skip(skip)
            .limit(limit);

        return successResponse({
            plans,
            meta: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit)
            }
        });
    } catch (error) {
        return errorResponse('Internal Server Error', 500, error);
    }
}
