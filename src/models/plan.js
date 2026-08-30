import mongoose from 'mongoose';

const PlanSchema = new mongoose.Schema(
    {
        type: {
            type: String,
            enum: ['subscription', 'addon'],
            default: 'subscription',
        },
        addons: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Plan'
        }],
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        totalPrice: {
            type: Number,
            required: true,
        },
        originalPrice: {
            type: Number,
        },
        duration: {
            type: String,
            required: true,
        },
        billingCycle: {
            type: String,
            required: true,
            enum: ['monthly', 'quaterly' , 'yearly' , 'one_time'],
        },
        isPopular: {
            type: Boolean,
            default: false,
        },
        badge: {
            type: String,
        },
        features: {
            type: [String],
            default: [],
        },
        discountPercentage: {
            type: Number,
            default: 0,
        },
        taxesPercentage: {
            type: Number,
            default: 18,
        }
    },
    { timestamps: true }
);

export default mongoose.models.Plan || mongoose.model('Plan', PlanSchema);
