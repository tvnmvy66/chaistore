import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User, Mail, MapPin, Send } from "lucide-react";
import api from '../lib/api.ts'

interface User {
  email: string;
  name: string;
  picture: string;
  shippingAddress: {
    address: string;
    city: string;
    postalCode: string;
    country: string;
  };
}

const MyAccount = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    const storedUser = localStorage.getItem("userInfo");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error("Invalid userInfo in localStorage:", e);
      }
    }
  }, []);

  const handleAddressChange = (
    field: keyof User["shippingAddress"],
    value: string
  ) => {
    if (!user) return;
    setUser((prev) =>
      prev
        ? {
            ...prev,
            shippingAddress: { ...prev.shippingAddress, [field]: value },
          }
        : prev
    );
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      await api.post(
      "/api/myaccount",
      { shippingAddress: user?.shippingAddress })
      const updatedUser = { ...user, shippingAddress: user?.shippingAddress };
      localStorage.setItem("userInfo", JSON.stringify(updatedUser));
      alert("Shipping address updated successfully ✅");
    } catch (err) {
      console.error(err);
      alert(`Something went wrong ❌ ${err}`);
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="flex justify-center p-6">
        <p className="text-gray-600">No user info found. Please log in.</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex justify-center p-6 "
    >
      <Card className="w-full max-w-lg shadow-lg bg-[#F5E6D3] text-[#4B2E2A]">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl">
            <User className="w-5 h-5" /> My Account
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-center">
            <img
              src={user.picture}
              alt="profile"
              className="w-20 h-20 rounded-full border shadow"
            />
          </div>

          {/* Name */}
          <div>
            <label className="text-sm font-medium flex items-center gap-1 mb-1">
              <User className="w-4 h-4" /> Name
            </label>
            <Input
              value={user.name}
              disabled={true}
            />
          </div>

          {/* Email */}
          <div>
            <label className="text-sm font-medium flex items-center gap-1 mb-1">
              <Mail className="w-4 h-4" /> Email
            </label>
            <Input
              disabled={true}
              type="email"
              value={user.email}
            />
          </div>

          {/* Shipping Address */}
          <div>
            <label className="text-sm font-medium flex items-center gap-1 mb-1">
              <MapPin className="w-4 h-4" /> Shipping Address
            </label>
            <Input
              placeholder="Address"
              value={user.shippingAddress.address}
              onChange={(e) => handleAddressChange("address", e.target.value)}
              className="mb-2"
            />
            <Input
              placeholder="City"
              value={user.shippingAddress.city}
              onChange={(e) => handleAddressChange("city", e.target.value)}
              className="mb-2"
            />
            <Input
              placeholder="Postal Code"
              value={user.shippingAddress.postalCode}
              onChange={(e) =>
                handleAddressChange("postalCode", e.target.value)
              }
              className="mb-2"
            />
            <Input
              placeholder="Country"
              value={user.shippingAddress.country}
              onChange={(e) => handleAddressChange("country", e.target.value)}
            />
          </div>

          {/* Submit */}
          <Button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full flex gap-2 items-center text-[#F5E6D3] bg-[#4B2E2A]"
          >
            {loading ? "Saving..." : "Save Changes"}
            <Send className="w-4 h-4" />
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default MyAccount;
