import Plan from '@/models/plan';
import connectToDatabase from '@/lib/mongodb';
import { successResponse, errorResponse } from '@/lib/apiResponse';

export async function GET(request, { params }) {
    try {
        await connectToDatabase();
        const { id } = await params;
        const query = {
            $or: [{ _id: id.match(/^[0-9a-fA-F]{24}$/) ? id : null }, { title: id }]
        };

        const plan = await Plan.findOne(query).populate('addons');

        if (!plan) {
            return errorResponse('Plan not found', 404);
        }

        return successResponse(plan);
    } catch (error) {
        return errorResponse('Internal Server Error', 500, error);
    }
}
