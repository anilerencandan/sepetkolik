import HeroSection from "@/components/hero-section"
import CategoryNavigation from "@/components/category-navigation"
import ProductSections from "@/components/product-sections"
import PopularBrands from "@/components/popular-brands"
import CategoryGrid from "@/components/category-grid"
import TopFavoriteProducts from "@/components/TopFavoriteProducts";


export default function HomePage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <CategoryNavigation />
      <HeroSection />
      <ProductSections />
      <PopularBrands />
      <CategoryGrid />
      <div className="container mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">En Çok Favorilenen 20 Ürün</h2>
      <TopFavoriteProducts />
    </div>
    </main>
  )
}
