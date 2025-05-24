import HeroSection from "@/components/hero-section"
import CategoryNavigation from "@/components/category-navigation"
import ProductSections from "@/components/product-sections"
import PopularBrands from "@/components/popular-brands"
import CategoryGrid from "@/components/category-grid"

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <CategoryNavigation />
      <HeroSection />
      <ProductSections />
      <PopularBrands />
      <CategoryGrid />
    </main>
  )
}
