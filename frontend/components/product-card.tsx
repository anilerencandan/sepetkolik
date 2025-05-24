"use client"

import Image from "next/image"
import { Star, Heart, ExternalLink, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"

interface Product {
  id: number
  title: string
  originalPrice: number
  discountedPrice: number
  discountPercentage: number
  image: string
  brand: string
  rating: number
  reviewCount: number
  badges?: string[]
}

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const [isLiked, setIsLiked] = useState(false)

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("tr-TR", {
      style: "currency",
      currency: "TRY",
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(price)
  }

  const getDiscountColor = (percentage: number) => {
    if (percentage >= 50) return "from-red-500 to-red-600"
    if (percentage >= 30) return "from-orange-500 to-orange-600"
    return "from-green-500 to-green-600"
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden group hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
      <div className="relative">
        <Image
          src={product.image || "/placeholder.svg"}
          alt={product.title}
          width={300}
          height={300}
          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
        />

        {/* Discount Badge */}
        <div
          className={`absolute top-3 left-3 bg-gradient-to-r ${getDiscountColor(product.discountPercentage)} text-white px-3 py-2 rounded-xl shadow-lg`}
        >
          <div className="flex items-center gap-1">
            <Zap className="h-3 w-3" />
            <span className="text-sm font-bold">%{product.discountPercentage}</span>
          </div>
          <div className="text-xs opacity-90">İNDİRİM</div>
        </div>

        {/* Like Button */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-3 right-3 bg-white/90 hover:bg-white shadow-lg rounded-full"
          onClick={() => setIsLiked(!isLiked)}
        >
          <Heart className={`h-4 w-4 ${isLiked ? "fill-red-500 text-red-500" : "text-gray-600"}`} />
        </Button>

        {/* Quick View on Hover */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <Button className="bg-white text-gray-900 hover:bg-gray-100 font-semibold px-6 py-2 rounded-full shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
            Hızlı Görüntüle
          </Button>
        </div>
      </div>

      <div className="p-5">
        <div className="text-sm text-gray-500 mb-2 uppercase tracking-wide font-medium">{product.brand}</div>
        <h3 className="font-semibold text-gray-900 mb-3 line-clamp-2 group-hover:text-rose-600 transition-colors leading-tight">
          {product.title}
        </h3>

        {/* Rating */}
        <div className="flex items-center mb-4">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-3 w-3 ${
                  i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                }`}
              />
            ))}
            <span className="text-sm font-medium text-gray-700 ml-2">{product.rating}</span>
          </div>
          <span className="text-sm text-gray-500 ml-2">({product.reviewCount})</span>
        </div>

        {/* Pricing */}
        <div className="mb-5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-lg text-gray-500 line-through">{formatPrice(product.originalPrice)}</span>
            <div className="bg-green-100 text-green-700 px-2 py-1 rounded-lg text-xs font-bold">
              {formatPrice(product.originalPrice - product.discountedPrice)} tasarruf
            </div>
          </div>
          <div className="text-2xl font-bold text-rose-600">{formatPrice(product.discountedPrice)}</div>
        </div>

        {/* Action Button */}
        <Button className="w-full bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200">
          <ExternalLink className="h-4 w-4 mr-2" />
          Trendyol'da Gör
        </Button>
      </div>
    </div>
  )
}
