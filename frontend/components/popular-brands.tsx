"use client"

import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRef } from "react"

const popularBrands = [
  { id: 1, name: "Apple", logo: "/placeholder.svg?height=80&width=120", productCount: 1250 },
  { id: 2, name: "Samsung", logo: "/placeholder.svg?height=80&width=120", productCount: 890 },
  { id: 3, name: "Nike", logo: "/placeholder.svg?height=80&width=120", productCount: 2340 },
  { id: 4, name: "Adidas", logo: "/placeholder.svg?height=80&width=120", productCount: 1890 },
  { id: 5, name: "Sony", logo: "/placeholder.svg?height=80&width=120", productCount: 567 },
  { id: 6, name: "LG", logo: "/placeholder.svg?height=80&width=120", productCount: 456 },
  { id: 7, name: "Xiaomi", logo: "/placeholder.svg?height=80&width=120", productCount: 789 },
  { id: 8, name: "Huawei", logo: "/placeholder.svg?height=80&width=120", productCount: 634 },
  { id: 9, name: "Dyson", logo: "/placeholder.svg?height=80&width=120", productCount: 234 },
  { id: 10, name: "Philips", logo: "/placeholder.svg?height=80&width=120", productCount: 345 },
]

export default function PopularBrands() {
  const scrollRef = useRef<HTMLDivElement>(null)

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 300
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      })
    }
  }

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
          {popularBrands.map((brand) => (
            <div
              key={brand.id}
              className="flex-shrink-0 bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 cursor-pointer group hover:-translate-y-1"
              style={{ minWidth: "200px" }}
            >
              <div className="text-center">
                <div className="bg-gray-50 rounded-lg p-4 mb-4 group-hover:bg-gray-100 transition-colors">
                  <Image
                    src={brand.logo || "/placeholder.svg"}
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
