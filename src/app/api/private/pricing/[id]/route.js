import Plan from '@/models/plan';
import connectToDatabase from '@/lib/mongodb';
import { successResponse, errorResponse } from '@/lib/apiResponse';

export async function GET(request, { params }) {
    try {
        await connectToDatabase();
        const { id } = await params;
        const query = {
            $or: [{ _id: id.match(/^[0-9a-fA-F]{24}$/) ? id : null }, { planId: id }]
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

export async function PUT(request, { params }) {
    try {
        await connectToDatabase();
        const { id } = await params;
        const body = await request.json();

        const query = {
            $or: [{ _id: id.match(/^[0-9a-fA-F]{24}$/) ? id : null }, { planId: id }]
        };

        const updatedPlan = await Plan.findOneAndUpdate(query, body, {
            new: true,
            runValidators: true,
        }).populate('addons');

        if (!updatedPlan) {
            return errorResponse('Plan not found', 404);
        }

        return successResponse(updatedPlan, `${updatedPlan.title} updated successfully`);
    } catch (error) {
        return errorResponse('Internal Server Error', 500, error);
    }
}

export async function DELETE(request, { params }) {
    try {
        await connectToDatabase();
        const { id } = await params;

        const query = {
            $or: [{ _id: id.match(/^[0-9a-fA-F]{24}$/) ? id : null }, { planId: id }]
        };

        const deletedPlan = await Plan.findOneAndDelete(query);

        if (!deletedPlan) {
            return errorResponse('Plan not found', 404);
        }

        return successResponse({}, `${deletedPlan.title} deleted successfully`);
    } catch (error) {
        return errorResponse('Internal Server Error', 500, error);
    }
}
