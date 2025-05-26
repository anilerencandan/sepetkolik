"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef } from "react";
import { Button } from "@/components/ui/button";

const popularBrands = [
  {
    id: 1,
    name: "Nike",
    logo: "/brands/nike.png",
  },
  {
    id: 2,
    name: "Zara",
    logo: "/brands/zara.png",
  },
  {
    id: 3,
    name: "Apple",
    logo: "/brands/apple.png",
  },
  {
    id: 4,
    name: "Adidas",
    logo: "/brands/adidas.png",
  },
  {
    id: 5,
    name: "Samsung",
    logo: "/brands/koton.png",
  },
  {
    id: 6,
    name: "Pull&Bear",
    logo: "/brands/koton.png",
  },
  {
    id: 7,
    name: "Koton",
    logo: "/brands/koton.png",
  },
  {
    id: 8,
    name: "Bershka",
    logo: "/brands/koton.png",
  },
  {
    id: 9,
    name: "Koton",
    logo: "/brands/koton.png",
  },
  {
    id: 10,
    name: "Xiomi",
    logo: "/brands/koton.png",
  },
  {
    id: 11,
    name: "Philiphs",
    logo: "/brands/koton.png",
  },
  {
    id: 12,
    name: "Dyson",
    logo: "/brands/koton.png",
  }
  // ... buraya sen istediğin markaları ekle
];

export default function PopularBrands() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: dir === "left" ? -300 : 300,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Popüler Markalar</h2>
            <p className="text-gray-600">Senin seçtiğin favori markalar</p>
          </div>
          <div className="hidden md:flex space-x-2">
            <Button variant="outline" size="icon" onClick={() => scroll("left")}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={() => scroll("right")}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div
          ref={scrollRef}
          className="flex space-x-4 overflow-x-auto scrollbar-hide pb-4"
        >
          {popularBrands.map((brand) => (
            <div
              key={brand.id}
              className="min-w-[200px] bg-white rounded-xl p-6 shadow-sm border hover:shadow-md transition group hover:-translate-y-1"
            >
              <div className="bg-gray-50 rounded-lg p-4 mb-4 group-hover:bg-gray-100 transition-colors">
                <Image
                  src={brand.logo || "/placeholder.svg"}
                  alt={brand.name}
                  width={120}
                  height={80}
                  className="mx-auto object-contain"
                />
              </div>
              <h3 className="font-semibold text-gray-900 text-center">{brand.name}</h3>
              <p className="text-sm text-gray-500 text-center">{brand.favorite_count} favori</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}