import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Package, CheckCircle, Clock } from "lucide-react";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import api from '../lib/api.ts'

export interface Order {
  _id: string;
  userId: {
    _id: string;
    name: string;
    email: string;
  };
  items: {
    _id: {
      _id: string;
      name: string;
      price: number;
      category: string;
    };
    quantity: number;
  }[];
  itemsPrice: number;
  taxPrice: number;
  totalPrice: number;
  isPaid: boolean;
  isDelivered: boolean;
  status: "Pending" | "Confirmed" | "Shipped" | "Delivered" | "Cancelled";
  createdAt: string | Date;
}

export default function Orders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await api.get<Order[]>("/api/orders"); 
        setOrders(res.data || []);
      } catch {
        setError("Could not load orders.");
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);


  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        Loading your orders...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5E6D3] text-[#4B2E2A] p-4 md:p-6 lg:p-10">
      <div className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6 text-center">My Orders</div>
      <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {orders.map((order, i) => (
          <motion.div
            key={order._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card className="rounded-2xl shadow-lg border border-[#4B2E2A]/30 h-auto bg-[#F5E6D3] text-[#4B2E2A] ">
              <CardHeader>
                <CardTitle className="flex items-center justify-between text-base md:text-lg lg:text-xl">
                  <span>Order #{order?._id.slice(-7)}</span>
                  {order?.isDelivered ? (
                    <CheckCircle className="text-green-500" />
                  ) : (
                    <Clock className="text-yellow-500" />
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm md:text-base">
                  <div className="flex justify-between">
                    <span className="font-medium">Status:</span>
                    <Badge>{order.status}</Badge>
                  </div>

                  <div className="flex justify-between">
                    <span className="font-medium">Paid:</span>
                    <span>{order.isPaid ? "✅ Yes" : "❌ No"}</span>
                  </div>

                  <Separator />

                  <div>
                    <span className="font-medium flex items-center gap-2 mb-1">
                      <Package size={18} /> Items
                    </span>
                    <ul className="list-disc list-inside text-gray-600 ">
                      {order.items.map((item) => (
                        <li
                          key={item._id._id}
                          className="flex justify-between items-center bg-[#F5E6D3] text-[#4B2E2A] p-3 rounded-xl shadow-sm border border-[#4B2E2A]/20"
                        >
                          <div className="flex flex-col">
                            <span className="font-semibold ">{item._id.name}</span>
                            <span className="text-sm text-[#4B2E2A]/70">
                              Qty: {item.quantity}
                            </span>
                          </div>
                          <div className="text-right">
                            <span className="font-medium">
                              ₹{item._id.price * item.quantity}
                            </span>
                            
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Separator />

                  <div className="flex justify-between text-xs md:text-sm">
                    <span>Sub Total:</span>
                    <span>₹{order.itemsPrice}</span>
                  </div>
                  <div className="flex justify-between text-xs md:text-sm">
                    <span>Tax:</span>
                    <span>₹{order.taxPrice}</span>
                  </div>
                  <div className="flex justify-between font-bold text-sm md:text-base">
                    <span>Total:</span>
                    <span>₹{(order.totalPrice / 100).toFixed(2)}</span>
                  </div>

                  <Separator />

                  <div className="text-xs text-gray-500">
                    Created: {new Date(order.createdAt).toLocaleString()}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
