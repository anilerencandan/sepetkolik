"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Brand {
  name: string;
  logo: string;
  favorite_count: number;
}

export default function PopularBrands() {
  const [brands, setBrands] = useState<Brand[]>([]);

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => setBrands(data))
      .catch((err) => console.error("Popüler markalar alınamadı", err));
  }, []);



  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Popüler Markalar</h2>
            <p className="text-gray-600">Favorilenme sayısına göre sıralı</p>
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
          
        >
          {brands.map((brand, idx) => (
            <div
              key={idx}
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
              <p className="text-sm text-gray-500 text-center">{brand.totalFavorites} favori</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}