"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRef, useState, useEffect } from "react"
import Link from "next/link"

const mainCategories = [
  { id: "kadin", name: "Kadın", href: "/kategori/kadin" },
  { id: "erkek", name: "Erkek", href: "/kategori/erkek" },
  { id: "anne-cocuk", name: "Anne & Çocuk", href: "/kategori/anne-cocuk" },
  { id: "ev-yasam", name: "Ev & Yaşam", href: "/kategori/ev-yasam" },
  { id: "supermarket", name: "Süpermarket", href: "/kategori/supermarket" },
  { id: "kozmetik", name: "Kozmetik", href: "/kategori/kozmetik" },
  { id: "ayakkabi-canta", name: "Ayakkabı & Çanta", href: "/kategori/ayakkabi-canta" },
  { id: "elektronik", name: "Elektronik", href: "/kategori/elektronik" },
  { id: "cok-satanlar", name: "Çok Satanlar", href: "/cok-satanlar", isNew: true },
  { id: "flas-urunler", name: "Flaş Ürünler", href: "/flas-urunler", isNew: true },
]

const quickCategories = [
  { id: "yemek", name: "Yemek", icon: "🍽️", isNew: true },
  { id: "iyi-fiyatli", name: "İyi Fiyatlı Ürünler", icon: "💰" },
  { id: "sen-de-al", name: "Sen De Al", icon: "🛒" },
  { id: "avantajli", name: "Avantajlı Ürünler", icon: "⭐" },
  { id: "indirim-kuponlari", name: "İndirim Kuponları", icon: "🎫" },
  { id: "krediler", name: "Krediler", icon: "💳" },
  { id: "kredi-karti", name: "Kredi Kartı", icon: "💳" },
  { id: "yeni-gelen", name: "Yeni Gelen Ürünler", icon: "✨" },
  { id: "kadin-quick", name: "Kadın", icon: "👗" },
  { id: "erkek-quick", name: "Erkek", icon: "👔" },
  { id: "anne-cocuk-quick", name: "Anne & Çocuk", icon: "👶" },
  { id: "ev-yasam-quick", name: "Ev & Yaşam", icon: "🏠" },
]

export default function CategoryNavigation() {
  // const scrollRef = useRef<HTMLDivElement>(null)
  // const [showQuickCategories, setShowQuickCategories] = useState(true)
  // const [lastScrollY, setLastScrollY] = useState(0)

  // useEffect(() => {
  //   const handleScroll = () => {
  //     const currentScrollY = window.scrollY

  //     if (currentScrollY > lastScrollY && currentScrollY > 100) {
  //       setShowQuickCategories(false)
  //     } else {
  //       setShowQuickCategories(true)
  //     }

  //     setLastScrollY(currentScrollY)
  //   }

  //   window.addEventListener("scroll", handleScroll, { passive: true })
  //   return () => window.removeEventListener("scroll", handleScroll)
  // }, [lastScrollY])

  // const scroll = (direction: "left" | "right") => {
  //   if (scrollRef.current) {
  //     const scrollAmount = 300
  //     scrollRef.current.scrollBy({
  //       left: direction === "left" ? -scrollAmount : scrollAmount,
  //       behavior: "smooth",
  //     })
  //   }
  // }

  return (
    <div className="bg-white border-b border-gray-200  top-20 z-40 transition-all duration-300">
      {/* Quick Categories - Hidden on scroll down */}
      <div
        className={`bg-gradient-to-r from-gray-50 to-gray-100 transition-all duration-300 overflow-hidden`}
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex justify-between overflow-x-auto scrollbar-hide flex-1">
              {quickCategories.map((category) => (
                <Link
                  key={category.id}
                  href={`/kategori/${category.id}`}
                  className="flex-shrink-0 flex flex-col items-center space-y-2 p-3 hover:bg-white rounded-xl transition-all duration-200 group"
                >
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-2xl group-hover:shadow-lg group-hover:scale-105 transition-all duration-200 relative border-2 border-gray-100">
                    {category.isNew && (
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-rose-500 rounded-full"></div>
                    )}
                    {category.icon}
                  </div>
                  <span className="text-xs text-gray-700 text-center font-medium max-w-16 group-hover:text-rose-600 transition-colors">
                    {category.name}
                  </span>
                </Link>
              ))}
            </div>

            {/* <div className="hidden md:flex space-x-2 ml-4">
              <Button
                variant="outline"
                size="icon"
                // onClick={() => scroll("left")}
                className="rounded-full hover:bg-rose-50 border-rose-200"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                // onClick={() => scroll("right")}
                className="rounded-full hover:bg-rose-50 border-rose-200"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  )
}
