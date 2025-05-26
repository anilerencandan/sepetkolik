import { notFound } from "next/navigation"
import CategoryPage from "@/components/category-page"
import Brand from "@/models/Brands"
import Product from "@/models/Product"

const categories = {
  kadin: {
    name: "Kadın",
    description: "Kadın giyim, ayakkabı, aksesuar ve daha fazlası",
    image: "/placeholder.svg?height=200&width=400",
  },
  erkek: {
    name: "Erkek",
    description: "Erkek giyim, ayakkabı, aksesuar ve daha fazlası",
    image: "/placeholder.svg?height=200&width=400",
  },
  "anne-cocuk": {
    name: "Anne & Çocuk",
    description: "Bebek ve çocuk ürünleri, oyuncak ve daha fazlası",
    image: "/placeholder.svg?height=200&width=400",
  },
  "ev-yasam": {
    name: "Ev & Yaşam",
    description: "Ev dekorasyonu, mutfak, banyo ve daha fazlası",
    image: "/placeholder.svg?height=200&width=400",
  },
  elektronik: {
    name: "Elektronik",
    description: "Telefon, bilgisayar, TV ve daha fazlası",
    image: "/placeholder.svg?height=200&width=400",
  },
  kozmetik: {
    name: "Kozmetik",
    description: "Makyaj, cilt bakımı, parfüm ve daha fazlası",
    image: "/placeholder.svg?height=200&width=400",
  },
  "ayakkabi-canta": {
    name: "Ayakkabı & Çanta",
    description: "Kadın, erkek ayakkabıları ve çantalar",
    image: "/placeholder.svg?height=200&width=400",
  }
}

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

async function getProducts(categorySlug: string = "kadin") {

  const res = await fetch(`http://localhost:3000/api/products?category=${categorySlug}&offset=0&limit=50`, { cache: "no-store" })
  if (!res.ok) throw new Error("Ürünler alınamadı")

  const products: Product[] = await res.json()

  // console.log("Fetched products:", products)
  return products
} 

// async function getPageCategory(slug: string) {
//   const res = await
// }

export default async function CategoryPageWrapper({ params } : { params: { slug: string}} ) {
  const {slug} = params



  const brands = await getBrands()
  const categoryList = await getCategoryList()
  const products = await getProducts()



  return <CategoryPage initCategories={categoryList} initBrands={brands} initProducts={products} />

}

export function generateStaticParams() {
  return Object.keys(categories).map((slug) => ({
    slug,
  }))
}

