import { createSlice} from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"
import type { Product } from "../types/Products.ts"

interface CartItem extends Product {
  quantity: number
}

interface CartState {
  items: CartItem[]
}

const initialState: CartState = {
  items: []
}

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      const existingItem = state.items.find(item => item._id === action.payload._id)
      if (existingItem) {
        existingItem.quantity += 1
      } else {
        state.items.push({ ...action.payload, quantity: 1 })
      }
    },
    decreaseQuantity: (state, action: PayloadAction<string>) => {
      const item = state.items.find(i => i._id === action.payload)
      if (item) {
        if (item.quantity > 1) {
          item.quantity -= 1
        } else {
          state.items = state.items.filter(i => i._id !== action.payload)
        }
      }
    },
    clearCart: (state) => {
      state.items = []
    }
  }
})

export const { addToCart, decreaseQuantity, clearCart } = cartSlice.actions
export default cartSlice.reducer