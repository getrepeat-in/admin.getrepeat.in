import Plan from '@/models/plan';
import connectToDatabase from '@/lib/mongodb';
import { validateRequiredFields } from '@/lib/helper/validator';
import { successResponse, errorResponse } from '@/lib/apiResponse';

export async function GET(request) {
    try {
        await connectToDatabase();
        const { searchParams } = new URL(request.url);
        const page = parseInt(searchParams.get('page') || '1', 10);
        const limit = parseInt(searchParams.get('limit') || '10', 10);
        const skip = (page - 1) * limit;

        const total = await Plan.countDocuments({});
        const plans = await Plan.find({})
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

export async function POST(request) {
    try {
        await connectToDatabase();
        const body = await request.json();
        const requiredFields = ['type', 'title', 'description', 'price', 'totalPrice', 'duration', 'billingCycle'];
        const validation = validateRequiredFields(body, requiredFields);

        if (!validation.isValid) {
            return errorResponse(validation.message, 400);
        }

        const newPlan = await Plan.create(body);
        return successResponse(newPlan, `${newPlan.title} created successfully`, 201);
    } catch (error) {
        return errorResponse('Internal Server Error', 500, error);
    }
}