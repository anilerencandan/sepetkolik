"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

interface Product {
  id: string;
  name: string;
  favorite_count: number;
  image_url: string;
}

export default function TopFavoriteProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Ürünler alınamadı", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="text-center text-gray-500">Yükleniyor...</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg">
      {products.map((product) => (
        <div
          key={product.id}
          className="p-4 bg-white shadow-sm rounded-lg border hover:shadow-md transition flex gap-4"
        >
          <div className="w-24 h-24 relative flex-shrink-0 rounded overflow-hidden bg-gray-100">
            <Image
              src={product.image_url || "/placeholder.svg"}
              alt={product.name}
              fill
              className="object-cover"
            />
          </div>
          <div className="flex flex-col justify-between">
            <h4 className="text-md font-semibold text-gray-900 line-clamp-2">{product.name}</h4>
            <p className="text-sm text-gray-500 mt-2">Favori: {product.favorite_count}</p>
          </div>
        </div>
      ))}
    </div>
  );
}