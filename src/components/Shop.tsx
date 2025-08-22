import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Card } from "@/components/ui/card"
import { ChevronsRight } from "lucide-react"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { addToCart } from "../store/cartSlice"
import api from '../lib/api.ts'

interface Product {
  _id: string
  name: string
  price: number
  picture: string
  category: string
}

function ProductSkeleton() {
  return (
    <Card className="shrink-0 animate-pulse bg-[#fef0dd]">
      <div className="overflow-hidden w-36 mx-4">
        <div className="aspect-square bg-gray-200 rounded-md h-36 w-36" />
        <div className="flex flex-col px-1 gap-2 mt-2">
          <div className="h-6 bg-gray-200 rounded w-24" />
          <div className="h-3 bg-gray-200 rounded w-16" />
          <div className="h-8 bg-gray-200 rounded w-20 mt-2" />
        </div>
      </div>
    </Card>
  )
}

function ProductCard({ product, onAddToCart }: { product: Product, onAddToCart: (p: Product) => void }) {
  return (
    <Card className="shrink-0 hover:shadow-lg transition rounded-xl bg-[#faf0e4]">
  <div className="overflow-hidden w-36 mx-4">
    <img
      src={product.picture}
      alt={`Pic of ${product.name}`}
      className="aspect-square w-36 object-cover rounded-md"
    />
    <div className="flex flex-col px-1 gap-0">
      {/* Product Name */}
      <div className="text-xl font-bold text-[#4B2E2A]">
        {product.name}
      </div>

      {/* Price */}
      <div className="text-md font-bold text-[#D99255]">
        {new Intl.NumberFormat("en-IN", {
          style: "currency",
          currency: "INR",
        }).format(product.price)}
      </div>

      {/* Button */}
      <motion.button
        whileTap={{ scale: 0.9 }}
        className="px-5 py-2 mt-2 bg-[#2E1B16] hover:bg-[#4B2E2A] text-[#FFF8F0] rounded-lg"
        onClick={() => onAddToCart(product)}
      >
        Add to Cart
      </motion.button>
    </div>
  </div>
</Card>

  )
}

// ✅ Reusable section for any category
function ProductSection({
  title,
  category,
  products,
  loading,
  error,
  onAddToCart,
}: {
  title: string
  category: string
  products: Product[]
  loading: boolean
  error: string | null
  onAddToCart: (p: Product) => void
}) {
  return (
<>
  <div className="flex justify-between w-[90vw] my-2 mt-7">
    <div className="text-2xl font-mono font-bold lg:text-4xl text-[#4B2E2A]">
      {title}
    </div>
    <button className="flex items-center bg-[#5a3733] hover:bg-[#7a4c46] text-[#FFF8F0] rounded-md px-2 cursor-pointer shadow-sm">
      More <ChevronsRight width={20} />
    </button>     
  </div>

  <ScrollArea className="w-[95vw] rounded-md border border-[#E6C9A8] bg-[#ffedd8] whitespace-nowrap shadow-lg">
    <div className="flex w-max space-x-4 p-4">
      {loading ? (
        Array.from({ length: 4 }).map((_, i) => <ProductSkeleton key={i} />)
      ) : error ? (
        <Card className="flex items-center justify-center w-60 h-36 text-[#D92B2B] font-bold bg-[#FFF8F0] border border-[#E6C9A8]">
          {error}
        </Card>
      ) : (
        products
          .filter((p) => p.category === category)
          .map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              onAddToCart={onAddToCart}
            />
          ))
      )}
    </div>
    <ScrollBar orientation="horizontal" />
  </ScrollArea>
</>

  )
}

function Shop() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const dispatch = useDispatch()

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await api.get<Product[]>("/api/products"); 
        console.log(res)
        setProducts(res.data);
      } catch {
        setProducts([]);
        setError("Could not load products.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [])

  return (
    <div className="flex flex-col items-center justify-center font-mono">
      <div className="text-2xl lg:text-4xl font-bold">Shop</div>

      <ProductSection
        title="Chai"
        category="Chai"
        products={products}
        loading={loading}
        error={error}
        onAddToCart={(p) => dispatch(addToCart(p))}
      />

      <ProductSection
        title="Coffee"
        category="Coffee"
        products={products}
        loading={loading}
        error={error}
        onAddToCart={(p) => dispatch(addToCart(p))}
      />
    </div>
  )
}

export default Shop
