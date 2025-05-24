import ProductCard from "@/components/product-card"

const featuredProducts = [
  {
    id: 1,
    title: "iPhone 15 Pro Max 256GB",
    originalPrice: 65999,
    discountedPrice: 52799,
    discountPercentage: 20,
    image: "/placeholder.svg?height=300&width=300",
    brand: "Apple",
    rating: 4.8,
    reviewCount: 1250,
  },
  {
    id: 2,
    title: "Samsung Galaxy S24 Ultra",
    originalPrice: 54999,
    discountedPrice: 41249,
    discountPercentage: 25,
    image: "/placeholder.svg?height=300&width=300",
    brand: "Samsung",
    rating: 4.7,
    reviewCount: 890,
  },
  {
    id: 3,
    title: "MacBook Air M3 13 inç",
    originalPrice: 45999,
    discountedPrice: 36799,
    discountPercentage: 20,
    image: "/placeholder.svg?height=300&width=300",
    brand: "Apple",
    rating: 4.9,
    reviewCount: 567,
  },
  {
    id: 4,
    title: "Sony WH-1000XM5 Kulaklık",
    originalPrice: 12999,
    discountedPrice: 8449,
    discountPercentage: 35,
    image: "/placeholder.svg?height=300&width=300",
    brand: "Sony",
    rating: 4.6,
    reviewCount: 2340,
  },
  {
    id: 5,
    title: "Nike Air Max 270 Spor Ayakkabı",
    originalPrice: 4999,
    discountedPrice: 2999,
    discountPercentage: 40,
    image: "/placeholder.svg?height=300&width=300",
    brand: "Nike",
    rating: 4.5,
    reviewCount: 1890,
  },
  {
    id: 6,
    title: "Dyson V15 Detect Süpürge",
    originalPrice: 18999,
    discountedPrice: 13299,
    discountPercentage: 30,
    image: "/placeholder.svg?height=300&width=300",
    brand: "Dyson",
    rating: 4.8,
    reviewCount: 456,
  },
]

export default function FeaturedProducts() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Öne Çıkan İndirimler</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            En popüler ürünlerde inanılmaz indirim fırsatları sizi bekliyor
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200">
            Tüm İndirimleri Gör
          </button>
        </div>
      </div>
    </section>
  )
}
