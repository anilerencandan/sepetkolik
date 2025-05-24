import CategoryPage from "@/components/category-page"

const category = {
  name: "En İndirimli Ürünler",
  description: "Trendyol'daki en yüksek indirim oranlarına sahip ürünler",
  image: "/placeholder.svg?height=200&width=400",
}

export const metadata = {
  title: "En İndirimli Ürünler - Sepetkolik",
  description: "Trendyol'daki en yüksek indirim oranlarına sahip ürünleri keşfedin. %80'e varan indirimler!",
}

export const dynamic = "force-dynamic"; // SSR'de veriyi her zaman taze çeker

async function getProducts() {
  const res = await fetch("http://localhost:3000/api/products", {
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Ürünler alınamadı");

  return res.json();
}

export default async function EnIndirimliPage() {
  const products = await getProducts();

  return <CategoryPage category={category} slug="en-indirimli-urunler" products={products} />
}