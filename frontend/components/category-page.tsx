"use client"

import { useState, useMemo, useEffect } from "react"
import Image from "next/image"
import { Filter, Grid, List } from "lucide-react"
import { Button } from "@/components/ui/button"
import ProductCard from "@/components/product-card"

interface Category {
  name: string
  description: string
  image: string
}

interface Product {
  id: string
  name: string
  image_url: string
  original_price: string
  discounted_price: string
  discount_ratio: string
  brand: string
  average_rating?: string
  total_count?: number
  promotion_badge?: string
  url?: string
  favorite_count?: number
  kategori?: string
}

interface CategoryPageProps {
  category: Category
  slug: string
  products: Product[]
}

export default function CategoryPage({ category, slug, products }: CategoryPageProps) {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [showFilters, setShowFilters] = useState(false)
  const [selectedBrands, setSelectedBrands] = useState<string[]>([])
  const [selectedRatings, setSelectedRatings] = useState<number[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [priceRange, setPriceRange] = useState<{ min: number; max: number }>({ min: 0, max: Infinity })
  const [brandQuery, setBrandQuery] = useState("")
  const [visibleCount, setVisibleCount] = useState(50)
  const [sortBy, setSortBy] = useState("popular")

  const brandList = useMemo(() => {
    const unique = Array.from(new Set(products.map((p) => p.brand).filter(Boolean)))
    return unique.sort()
  }, [products])

  const categoryList = useMemo(() => {
    const unique = Array.from(new Set(products.map((p) => p.kategori).filter(Boolean)))
    return unique.sort()
  }, [products])

  const filteredProducts = products
    .filter((product) => Number(product.discount_ratio) >= 40)
    .filter((product) => {
      const matchesBrand =
        selectedBrands.length === 0 || selectedBrands.includes(product.brand)
      const matchesRating =
        selectedRatings.length === 0 ||
        selectedRatings.some((r) => Number(product.average_rating || 0) >= r)
      const matchesPrice =
        Number(product.discounted_price) >= priceRange.min &&
        Number(product.discounted_price) <= priceRange.max
      const matchesCategory = !selectedCategory || product.kategori === selectedCategory

      return matchesBrand && matchesRating && matchesPrice && matchesCategory
    })
    .sort((a, b) => {
      if (sortBy === "popular") {
        return (Number(b.favorite_count || 0) - Number(a.favorite_count || 0))
      }
      if (sortBy === "discount") {
        return Number(b.discount_ratio) - Number(a.discount_ratio)
      }
      return 0
    })

  const visibleProducts = filteredProducts.slice(0, visibleCount)

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 500) {
        setVisibleCount((prev) => prev + 50)
      }
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center space-x-6">
            <div className="relative w-24 h-24 rounded-lg overflow-hidden">
              <Image src={category.image || "/placeholder.svg"} alt={category.name} fill className="object-cover" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{category.name}</h1>
              <p className="text-gray-600">{category.description}</p>
              <p className="text-sm text-gray-500 mt-2">
                {filteredProducts.length.toLocaleString("tr-TR")} ürün bulundu
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="flex gap-6">
          <div className={`w-64 ${showFilters ? "block" : "hidden"} lg:block`}>
            <div className="bg-white rounded-lg p-6 sticky top-32">
              <h3 className="font-semibold text-gray-900 mb-4">Filtreler</h3>

              <div className="mb-6">
                <h4 className="font-medium text-gray-700 mb-3">Kategori</h4>
                <div className="space-y-2 max-h-60 overflow-y-auto">
                  {categoryList.map((cat) => (
                    <label key={cat} className="flex items-center">
                      <input
                        type="radio"
                        name="kategori"
                        className="rounded border-gray-300 mr-2"
                        checked={selectedCategory === cat}
                        onChange={() => setSelectedCategory(cat as string)}
                      />
                      <span className="text-sm text-gray-600">{cat}</span>
                    </label>
                  ))}
                  {selectedCategory && (
                    <button
                      className="text-xs text-blue-500 underline mt-2"
                      onClick={() => setSelectedCategory(null)}
                    >
                      Kategoriyi temizle
                    </button>
                  )}
                </div>
              </div>

              <div className="mb-6">
                <h4 className="font-medium text-gray-700 mb-3">Marka</h4>
                <input
                  type="text"
                  placeholder="Marka ara"
                  value={brandQuery}
                  onChange={(e) => setBrandQuery(e.target.value)}
                  className="w-full mb-3 px-2 py-1 border rounded text-sm"
                />
                <div className="space-y-2 max-h-60 overflow-y-auto">
                  {brandList
                    .filter((b) => b.toLowerCase().includes(brandQuery.toLowerCase()))
                    .map((brand) => (
                      <label key={brand} className="flex items-center">
                        <input
                          type="checkbox"
                          className="rounded border-gray-300 mr-2"
                          checked={selectedBrands.includes(brand)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedBrands([...selectedBrands, brand])
                            } else {
                              setSelectedBrands(selectedBrands.filter((b) => b !== brand))
                            }
                          }}
                        />
                        <span className="text-sm text-gray-600">{brand}</span>
                      </label>
                    ))}
                </div>
              </div>

              <div className="mb-6">
                <h4 className="font-medium text-gray-700 mb-3">Değerlendirme</h4>
                <div className="space-y-2">
                  {[4, 3, 2].map((star) => (
                    <label key={star} className="flex items-center">
                      <input
                        type="checkbox"
                        className="rounded border-gray-300 mr-2"
                        checked={selectedRatings.includes(star)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedRatings([...selectedRatings, star])
                          } else {
                            setSelectedRatings(selectedRatings.filter((r) => r !== star))
                          }
                        }}
                      />
                      <span className="text-sm text-gray-600">{star} yıldız ve üzeri</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <h4 className="font-medium text-gray-700 mb-3">Fiyat Aralığı</h4>
                <div className="flex gap-2">
                  <input
                    type="number"
                    className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
                    placeholder="Min"
                    value={priceRange.min === 0 ? "" : priceRange.min}
                    onChange={(e) => {
                      const val = parseFloat(e.target.value)
                      setPriceRange((prev) => ({ ...prev, min: isNaN(val) ? 0 : val }))
                    }}
                  />
                  <input
                    type="number"
                    className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
                    placeholder="Max"
                    value={priceRange.max === Infinity ? "" : priceRange.max}
                    onChange={(e) => {
                      const val = parseFloat(e.target.value)
                      setPriceRange((prev) => ({ ...prev, max: isNaN(val) ? Infinity : val }))
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1">
            <div className="bg-white rounded-lg p-4 mb-6 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div className="flex items-center space-x-4">
                <Button variant="outline" size="sm" onClick={() => setShowFilters(!showFilters)} className="lg:hidden">
                  <Filter className="h-4 w-4 mr-2" />
                  Filtreler
                </Button>
                <div className="flex items-center space-x-2">
                  <Button
                    variant={viewMode === "grid" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setViewMode("grid")}
                  >
                    <Grid className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">Sırala:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="border border-gray-300 rounded px-3 py-1 text-sm"
                >
                  <option value="popular">En Popüler İndirimler</option>
                  <option value="discount">En İndirimli Ürünler</option>
                </select>
              </div>
            </div>

            <div
              className={
                viewMode === "grid"
                  ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                  : "space-y-4"
              }
            >
              {visibleProducts.map((product) => (
                <a key={product.id} href={product.url || "#"} target="_blank" rel="noopener noreferrer">
                  <ProductCard
                    product={{
                      id: Number(product.id),
                      title: product.name,
                      image: product.image_url || "/placeholder.svg",
                      originalPrice: Number(product.original_price),
                      discountedPrice: Number(product.discounted_price),
                      discountPercentage: Math.round(Number(product.discount_ratio)),
                      brand: product.brand || "",
                      rating: Number(product.average_rating || 0),
                      reviewCount: product.total_count || 0,
                      badges: product.promotion_badge ? [product.promotion_badge] : [],
                    }}
                  />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}