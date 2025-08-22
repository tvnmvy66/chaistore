// import * as React from "react";
import { ShoppingBag, Minus, Plus } from "lucide-react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Card } from "@/components/ui/card";
import { useSelector, useDispatch } from "react-redux"
import type { RootState } from "../store/store"
import { decreaseQuantity, addToCart } from "../store/cartSlice"
import { useNavigate } from "react-router-dom"

function CartSystem() {
  const { items } = useSelector((state: RootState) => state.cart)
  const dispatch = useDispatch()
  const navigate = useNavigate()


  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <div>
      <Drawer >
        <DrawerTrigger asChild>
          <div className=" relative cursor-pointer ">
            <ShoppingBag />
            <span
          className="
            absolute -top-1 -right-1
            rounded-full min-w-[18px] h-[18px] px-1
            text-[10px] leading-[18px] text-[#F5E6D3] text-center font-medium
            bg-[#4B2E2A]
          "
        >
          {items.length}
        </span>
          </div>
        </DrawerTrigger>

        <DrawerContent className="bg-[#F5E6D3] text-[#4B2E2A]">
          <DrawerHeader>
            <DrawerTitle className="bg-[#F5E6D3] text-[#4B2E2A]">Your Cart</DrawerTitle>
            <DrawerDescription className="">
              Here are the items you{"'"}ve added.
            </DrawerDescription>
          </DrawerHeader>
            <Card className="bg-[#F5E6D3] text-[#4B2E2A] p-2 mx-auto w-[95vw] lg:w-[35vw] rounded-2xl flex flex-col gap-2 overflow-scroll overflow-y-scroll no-scrollbar" id="cart">
                {items.length === 0 && <p className="mx-auto">Your cart is empty 🛒</p>}
                {items.map(item => (
                  <Card key={item._id} className="p-4 bg-[#F5E6D3] text-[#4B2E2A] shadow-md">
                    <div className="flex items-center ">
                      <div>
                        <img src="https://avatars.githubusercontent.com/u/124599" alt="item pic" width={60} height={60} className="rounded-lg"/>
                      </div>
                      <div className="flex items-center justify-between w-full px-4">
                          <div className="flex flex-col ">
                            <h3 className="text-lg font-semibold">{item.name}</h3>
                            <p className="text-sm text-gray-500">₹{item.price}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <button className="px-2 cursor-pointer bg-[#f4c991] hover:bg-[#eca85b]  text-[#2E1B16] rounded-sm " onClick={() => dispatch(decreaseQuantity(item._id))}><Minus width={14}/></button>
                            <span className=" text-xl">{item.quantity}</span>
                            <button className="px-2 cursor-pointer bg-[#f4c991] hover:bg-[#eca85b]  text-[#2E1B16] rounded-sm " onClick={() => dispatch(addToCart(item))}><Plus width={15}/></button>
                          </div>
                      </div>
                    </div>
                  </Card>))}
                  <div className="mx-auto font-bold my-1 text-gray-600">Sub Total : ₹{total}</div>
            </Card>
          <DrawerFooter>
            <DrawerClose className="flex flex-col items-center gap-2 w- bg-[#f4c991] hover:bg-[#eca85b]  mx-auto p-2 px-5 text-[#2E1B16] rounded-xl  cursor-pointer" onClick={() => navigate("/checkout")}>
                Checkout
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
}

export default CartSystem;
