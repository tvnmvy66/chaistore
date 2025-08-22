import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        razorpayOrderId: {
            type: String,
        },
        razorpayPaymentId: {
            type: String,
        },
        items: [
            {
                _id: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Product',
                    required: true,
                },
                quantity: {
                    type: Number,
                    required: true,
                    min: 1,
                }
            },
        ],
        shippingAddress: {
            address: { type: String, maxlength: 200 },
            city: { type: String, maxlength: 100 },
            postalCode: { type: String, maxlength: 6 },
            country: { type: String, maxlength: 100 },
        },
        itemsPrice: {
            type: Number,
            required: true,
            default: 0.0,
        },
        taxPrice: {
            type: Number,
            required: true,
            default: 0.0,
        },
        totalPrice: {
            type: Number,
            required: true,
            default: 0.0,
        },
        isPaid: {
            type: Boolean,
            required: true,
            default: false,
        },
        paidAt: {
            type: Date,
        },
        status: {
            type: String,
            required: true,
            enum: ['Confirmed', 'Cooking', 'Shipped', 'Delivered', 'Cancelled', 'Pending'],
            default: 'Pending',
        },
        isDelivered: {
            type: Boolean,
            required: true,
            default: false,
        },
        deliveredAt: {
            type: Date,
        },
    },
    {
        timestamps: true,
    }
);

const Order = mongoose.model('Order', orderSchema);
export default Order;  