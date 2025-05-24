"use client"

import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRef, useEffect, useState } from "react"

interface BrandData {
  name: string
  productCount: number
}

export default function PopularBrands() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [brands, setBrands] = useState<BrandData[]>([])

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 300
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      })
    }
  }

  useEffect(() => {
    const fetchBrands = async () => {
      const res = await fetch("/api/brands")
      const data = await res.json()
      const formatted = data.map((b: any) => ({
        name: b.brand.charAt(0).toUpperCase() + b.brand.slice(1),
        productCount: b._count,
      }))
      setBrands(formatted)
    }
    fetchBrands()
  }, [])

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Popüler Markalar</h2>
            <p className="text-gray-600">En sevilen markalarda özel indirimler</p>
            
          </div>

          <div className="hidden md:flex space-x-2">
            <Button variant="outline" size="icon" onClick={() => scroll("left")} className="rounded-full">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={() => scroll("right")} className="rounded-full">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div
          ref={scrollRef}
          className="flex space-x-4 overflow-x-auto scrollbar-hide pb-4"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {brands.map((brand, index) => (
            <div
              key={index}
              className="flex-shrink-0 bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 cursor-pointer group hover:-translate-y-1"
              style={{ minWidth: "200px" }}
            >
              <div className="text-center">
                <div className="bg-gray-50 rounded-lg p-4 mb-4 group-hover:bg-gray-100 transition-colors">
                  <Image
                    src={`/logos/${brand.name.toLowerCase()}.svg` || "/placeholder.svg"}
                    alt={brand.name}
                    width={120}
                    height={80}
                    className="mx-auto object-contain"
                  />
                </div>
                <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-orange-600 transition-colors">
                  {brand.name}
                </h3>
                <p className="text-sm text-gray-500">{brand.productCount} ürün</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}