import { notFound } from "next/navigation"
import CategoryPage from "@/components/category-page"

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
  },
  supermarket: {
    name: "Süpermarket",
    description: "Gıda, temizlik, kişisel bakım ürünleri",
    image: "/placeholder.svg?height=200&width=400",
  },
}

interface CategoryPageProps {
  params: {
    slug: string
  }
}

export default function CategoryPageWrapper({ params }: CategoryPageProps) {
  const category = categories[params.slug as keyof typeof categories]

  if (!category) {
    notFound()
  }

  return <CategoryPage category={category} slug={params.slug} />
}

export function generateStaticParams() {
  return Object.keys(categories).map((slug) => ({
    slug,
  }))
}
