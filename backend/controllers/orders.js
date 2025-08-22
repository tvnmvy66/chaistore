import Product from '../models/product.js'
import Razorpay from "razorpay";
import Order from '../models/order.js'
import User from '../models/user.js'
import dotenv from "dotenv";
import crypto from "crypto";

dotenv.config();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET,
});

export const createOrders = async (req, res) => {
    try {
        const { cart } = req.body;
        const { id } = req.user

        if (!cart) {
            return res.status(401).json({ message: 'items required' });
        }

        const shippingAddress = await User.findById(id).select('shippingAddress');
        const menu = await Product.find({})
        let total = 0;

        cart.forEach(item => {
            const menuItem = menu.find(m => m._id == item._id);
            if (menuItem) {
                total += menuItem.price * item.quantity;
            }
        });

        const totalWithTax = (total + (total * 0.05)).toFixed(2);
        const options = {
            amount: totalWithTax*100,
            currency: "INR",
            receipt: `receipt_${Date.now()}`,
        };
        const order = await razorpay.orders.create(options);

        const NewOrder = await Order.create({
            userId: id,
            items: cart,
            shippingAddress: shippingAddress,
            itemsPrice: total,
            taxPrice: +(total * 0.05).toFixed(2),
            totalPrice: totalWithTax*100, // in paise
            isPaid: false,
        });
        res.status(201).json({ order, orderid: NewOrder._id });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Error creating order" });
    }
}

export const verifyPayment = async (req, res) => {
    try {
        const {orderid, order_id, payment_id, signature } = req.body;
        const { id } = req.user

        const generated_signature = crypto.createHmac('sha256', process.env.RAZORPAY_SECRET)
            .update(order_id + "|" + payment_id)
            .digest('hex');
            
        if (generated_signature === signature) {
            await Order.updateOne(
                {_id: orderid , userId : id},
                { $set: { isPaid: true, status: 'Confirmed', razorpayPaymentId: payment_id , razorpayOrderId : order_id} }
            );
            res.json({ status: 'success', message: 'Payment verified successfully' });
        } else {
            res.status(400).json({ message: 'Payment verification failed' });
        }
    } catch (error) {
            res.status(500).json({ message: 'Payment verification failed' });
    }
}

export const fetchOrders = async (req, res) => {
    try {
    const { id } = req.user
    const orders = (await Order.find({ userId : id }).sort({ createdAt: -1 }).limit(8).populate("items._id", "name price"));

    return res.status(200).json(orders);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error", error: err.message });
  }
};