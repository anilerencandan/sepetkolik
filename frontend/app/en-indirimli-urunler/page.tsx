import CategoryPage from "@/components/category-page"
import Brand from "@/models/Brands"
import Category from "@/models/Categories"
import Product from "@/models/Product"

const category = {
  name: "Giyim",            
  description: "Trendyol'daki en yüksek indirim oranlarına sahip ürünler",
  image: "/placeholder.svg?height=200&width=400",
}

export const metadata = {
  title: "En İndirimli Ürünler - Sepetkolik",
  description: "Trendyol'daki en yüksek indirim oranlarına sahip ürünleri keşfedin. %80'e varan indirimler!",
}

export const dynamic = "force-dynamic"

async function getBrands() {
  const res = await fetch(`http://localhost:3000/api/brands`, { cache: "no-store" })
  if (!res.ok) throw new Error("Markalar alınamadı")
  
  const brands:Brand[] = await res.json()
  return brands

}

async function getCategoryList() {
  const res = await fetch(`http://localhost:3000/api/categories`, { cache: "no-store" })
  if (!res.ok) throw new Error("Kategoriler alınamadı")

  const categories: string[] = await res.json()
  return categories
}

async function getProducts() {
  const encodedCategory = encodeURIComponent(category.name)

  const res = await fetch(`http://localhost:3000/api/products?offset=0&limit=50`, { cache: "no-store" })
  if (!res.ok) throw new Error("Ürünler alınamadı")

  const products: Product[] = await res.json()

  // console.log("Fetched products:", products)
  return products
} 

export default async function EnIndirimliPage() {
  const brands = await getBrands()
  const categoryList = await getCategoryList()
  const products = await getProducts()


  return (
    <CategoryPage initCategories={categoryList} initBrands={brands} initProducts={products}/>
  )
}