import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Truck } from "lucide-react"
import { motion } from "framer-motion"
import { useSelector } from "react-redux"
import type { RootState } from "../store/store"
import { useNavigate } from "react-router-dom"
import PayButton from "./PayButton"

export interface Product {
  _id: string
  name: string
  price: number
  picture: string
  quantity: number
}

export interface User {
  email: string
  familyName: string
  givenName: string
  name: string
  picture: string
  shippingAddress: {
    address?: string
    city?: string
    postalCode?: string
    country?: string
  }
}

export default function CheckoutPage() {
  const items = useSelector((state: RootState) => state.cart.items) as Product[]
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const [userInfo, setUserInfo] = useState<User | null>(null)
  const navigate = useNavigate()

  // Load from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem("userInfo")
      if (saved) {
        const parsed: User = JSON.parse(saved)
        setUserInfo(parsed)
      }
    } catch (err) {
      console.error("Error parsing userInfo from localStorage:", err)
    }
  }, [])

  return (
    <div className="my-10 bg-[#F5E6D3] text-[#4B2E2A] flex items-center justify-center p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full max-w-6xl">

        {/* Left: Cart Section */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Card className="p-4 max-h-[40vh] overflow-y-scroll no-scrollbar rounded-2xl shadow-md bg-[#F5E6D3] text-[#4B2E2A]">
            {items.length === 0 && (
              <p className="mx-auto text-gray-500">Your cart is empty 🛒</p>
            )}
            <div className="flex flex-col gap-3">
              {items.map((item) => (
                <Card key={item._id} className="p-3 bg-[#F5E6D3] text-[#4B2E2A] shadow-md">
                  <div className="flex items-center gap-4">
                    <img
                      src={item.picture}
                      alt={item.name}
                      width={60}
                      height={60}
                      className="rounded-lg object-cover"
                    />
                    <div className="flex justify-between items-center w-full">
                      <div>
                        <h3 className="text-sm md:text-lg font-semibold">{item.name}</h3>
                        <p className="text-sm text-gray-500">₹{item.price}</p>
                      </div>
                      <span className="text-sm font-medium text-[#4B2E2A]">
                        Qty: {item.quantity}
                      </span>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Right: Checkout Section */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card className="shadow-lg rounded-2xl bg-[#F5E6D3] text-[#4B2E2A] ">
            <CardContent className="space-y-8">

              {/* Show user info */}
              {userInfo && (
                <div className="flex items-center gap-3 border-b pb-3">
                  <img
                    src={userInfo.picture}
                    alt={userInfo.name}
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <p className="font-medium">{userInfo.name}</p>
                    <p className="text-sm text-gray-500">{userInfo.email}</p>
                  </div>
                </div>
              )}

              {/* Shipping Info Preview */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <h2 className="text-lg font-medium flex items-center justify-between gap-2">
                  <span className="flex items-center gap-2 text-md">
                    <Truck className="w-5 h-5 text-gray-600" /> Shipping Information
                  </span>
                  <Button variant="outline" size="sm" onClick={() => navigate("/myaccount")} className="bg-[#E6C9A8] text-[#4B2E2A] hover:bg-[#e9bc81] cursor-pointer">
                    Edit
                  </Button>
                </h2>
                <div className="mt-3 text-gray-700 space-y-1">
                  <p><strong>Address:</strong> {userInfo?.shippingAddress?.address || "Not set"}</p>
                  <p><strong>City:</strong> {userInfo?.shippingAddress?.city || "Not set"}</p>
                  <p><strong>ZIP:</strong> {userInfo?.shippingAddress?.postalCode || "Not set"}</p>
                  <p><strong>Country:</strong> {userInfo?.shippingAddress?.country || "Not set"}</p>
                </div>
              </motion.div>

              <Separator />

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <h2 className="text-lg font-medium">Order Summary</h2>
                <div className="flex justify-between mt-2 text-gray-700">
                  <span>Subtotal</span>
                  <span>₹{total}</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>Tax (5%)</span>
                  <span>₹{(total * 0.05).toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-semibold mt-2">
                  <span>Total</span>
                  <span>₹{(total + total * 0.05).toFixed(2)}</span>
                </div>
              </motion.div>

              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="flex justify-center w-full"
              >
                <PayButton/>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
