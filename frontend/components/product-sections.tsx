"use client"

import ProductCard from "@/components/product-card"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRef, useEffect, useState } from "react"
import Link from "next/link"

interface Product {
  id: number
  name: string
  image_url: string
  original_price: number
  discounted_price: number
  discount_ratio: number
  brand: string
  average_rating?: number
  total_count?: number
  promotion_badge?: string
  url?: string
  favorite_count?: number
}

interface ProductSectionProps {
  title: string
  products: Product[]
  sectionId: string
  viewAllLink: string
}

function ProductSection({ title, products, sectionId, viewAllLink }: ProductSectionProps) {
  const scrollRef = useRef<HTMLDivElement>(null)

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 320
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      })
    }
  }

  return (
    <section className="py-8 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
          <Link href={viewAllLink} className="text-red-500 hover:text-red-600 font-medium text-sm flex items-center">
            Tümünü Gör
            <ChevronRight className="h-4 w-4 ml-1" />
          </Link>
        </div>

        <div className="relative">
          <div ref={scrollRef} className="flex space-x-4 overflow-x-auto scrollbar-hide pb-4">
            {products.map((product) => (
              <div key={product.id} className="flex-shrink-0 w-72">
                <ProductCard
                  product={product}
                />
              </div>
            ))}
          </div>

          <Button
            variant="outline"
            size="icon"
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 bg-white shadow-lg rounded-full z-10"
            onClick={() => scroll("left")}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 bg-white shadow-lg rounded-full z-10"
            onClick={() => scroll("right")}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  )
}

export default function ProductSections() {
  const [discountedProducts, setDiscountedProducts] = useState<Product[]>([])
  const [bestSellingProducts, setBestSellingProducts] = useState<Product[]>([])

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch("/api/products")
      const all: Product[] = await res.json()

      const discounted = all
        .filter((p) => Number(p.discount_ratio) >= 40)
        .sort((a, b) => Number(b.discount_ratio) - Number(a.discount_ratio))
        .slice(0, 10)

        const bestSelling = all
        .filter((p) => Number(p.discount_ratio) >= 5 && p.average_rating) // %5 indirim ve rating varsa
        .sort((a, b) => (b.average_rating || 0) - (a.average_rating || 0)) // rating'e göre sırala
        .slice(0, 10)

      setDiscountedProducts(discounted)
      setBestSellingProducts(bestSelling)
    }

    fetchProducts()
  }, [])

  return (
    <div>
      <ProductSection
        title="En İndirimli Ürünler"
        sectionId="discounted"
        viewAllLink="/en-indirimli-urunler"
        products={discountedProducts}
      />
      <ProductSection
        title="En Popüler Ürünler"
        sectionId="bestselling"
        viewAllLink="/cok-satan"
        products={bestSellingProducts}
      />
    </div>
  )
}