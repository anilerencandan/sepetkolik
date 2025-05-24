import Image from "next/image"
import { ArrowRight } from "lucide-react"

const categories = [
  {
    id: 1,
    name: "Elektronik",
    productCount: 15420,
    image: "/placeholder.svg?height=200&width=300",
    color: "from-blue-500 to-blue-600",
  },
  {
    id: 2,
    name: "Moda",
    productCount: 28750,
    image: "/placeholder.svg?height=200&width=300",
    color: "from-pink-500 to-pink-600",
  },
  {
    id: 3,
    name: "Ev & Yaşam",
    productCount: 12340,
    image: "/placeholder.svg?height=200&width=300",
    color: "from-green-500 to-green-600",
  },
  {
    id: 4,
    name: "Spor & Outdoor",
    productCount: 8960,
    image: "/placeholder.svg?height=200&width=300",
    color: "from-orange-500 to-orange-600",
  },
  {
    id: 5,
    name: "Kozmetik",
    productCount: 6780,
    image: "/placeholder.svg?height=200&width=300",
    color: "from-purple-500 to-purple-600",
  },
  {
    id: 6,
    name: "Kitap & Hobi",
    productCount: 4520,
    image: "/placeholder.svg?height=200&width=300",
    color: "from-indigo-500 to-indigo-600",
  },
]

export default function CategoryGrid() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Kategoriler</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            İhtiyacınız olan her şey için en iyi fırsatları keşfedin
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <div
              key={category.id}
              className="relative overflow-hidden rounded-xl group cursor-pointer hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
            >
              <div className="relative h-48">
                <Image
                  src={category.image || "/placeholder.svg"}
                  alt={category.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div
                  className={`absolute inset-0 bg-gradient-to-r ${category.color} opacity-80 group-hover:opacity-70 transition-opacity`}
                />
              </div>

              <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
                <h3 className="text-2xl font-bold mb-2 group-hover:text-yellow-300 transition-colors">
                  {category.name}
                </h3>
                <p className="text-white/90 mb-4">{category.productCount.toLocaleString("tr-TR")} ürün</p>
                <div className="flex items-center text-sm font-medium group-hover:text-yellow-300 transition-colors">
                  <span>Keşfet</span>
                  <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
