import { useState } from 'react'
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../store/store"
import { useNavigate } from "react-router-dom"
import { motion } from 'motion/react'
import { clearCart } from '@/store/cartSlice.ts';
import api from '../lib/api.ts'

type RazorpayOptions = {
  key: string;
  amount: number;
  currency: string;
  order_id?: string;
  handler: (response: {
    razorpay_payment_id: string;
    razorpay_order_id: string;
    razorpay_signature: string;
  }) => void;
};

declare global {
  interface Window {
    Razorpay: new (options: RazorpayOptions) => {
      open: () => void;
    };
  }
}

function PayButton() {
  const [loading,setLoading] = useState<boolean>(false)
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const { items } = useSelector((state: RootState) => state.cart)
  const cart = items.map(({ _id, quantity }) => ({ _id, quantity }));
  
  const handlePayment = async () => {
    setLoading(true)
    const res = await api.post(
      "/api/orders/create",
      { cart })
    console.log(res.data)
    const { order, orderid } = res.data
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: "INR",
      name: "Chai Store",
      description: "Checkout",
      order_id: order.id,
      handler:async function (response : {
          razorpay_payment_id: string;
          razorpay_order_id: string;
          razorpay_signature: string;
        }) {
        const res = await api.post('/api/orders/verify',{
            orderid: orderid,
            order_id: response.razorpay_order_id,
            payment_id: response.razorpay_payment_id,
            signature: response.razorpay_signature
        })
        console.log(res)
        if (res.data.status === 'success') {
          dispatch(clearCart())
          navigate('/orders')
        } else {
          alert(res.data.message);
        }
      },
      prefill: {
        name: "Tanmay Dongare",
        email: "tanmay9986@gmail.com",
        contact: "9920420297"
      },
      theme: {
        color: "#e08c0fff"
      }
    };
    
    const rzp = new window.Razorpay(options);
    rzp.open();
  };
  
  
  return (
    <motion.button
      whileTap={{ scale: 0.9 }}
      disabled={loading}
      className="py-2 bg-[#E6C9A8] text-[#4B2E2A] hover:bg-[#e9bc81] rounded-lg w-full cursor-pointer"
      onClick={handlePayment}
    >
      {loading ? "Processing" : "Pay Now"}
    </motion.button>
  )
}

export default PayButton