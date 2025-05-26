"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import ProductCard from "@/components/product-card";
import Brand from "@/models/Brands";
import Product from "@/models/Product";
import { Input } from "./ui/input";

interface CategoryPageProps {
  initCategories: string[];
  initBrands: Brand[];
  initProducts?: Product[];
}

export default function CategoryPage({ initCategories, initBrands, initProducts = [] }: CategoryPageProps) {
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [products, setProducts] = useState<Product[]>(initProducts);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [minRating, setMinRating] = useState<number | null>(null);
  const [maxRating, setMaxRating] = useState<number | null>(null);
  const [minPrice, setMinPrice] = useState<number | null>(null);
  const [maxPrice, setMaxPrice] = useState<number | null>(null);
  const [categories, setCategories] = useState<string[]>(initCategories);
  const [brands, setBrands] = useState<Brand[]>(initBrands);
  const [offset, setOffset] = useState(0);
  const [brandsSearchQuery, setBrandsSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("average_rating");

  const limit = 50;
  const observerRef = useRef<HTMLDivElement | null>(null);

  const fetchProducts = async (currentOffset: number, reset: boolean) => {
    setLoading(true);
    const params = new URLSearchParams({
      offset: currentOffset.toString(),
      limit: limit.toString(),
    });
    selectedCategories.forEach((c) => params.append("category", c));
    selectedBrands.forEach((b) => params.append("brand", b));
    if (minRating != null) params.set("minRating", minRating.toString());
    if (maxRating != null) params.set("maxRating", maxRating.toString());
    if (minPrice != null) params.set("minPrice", minPrice.toString());
    if (maxPrice != null) params.set("maxPrice", maxPrice.toString());
    if (sortBy) params.set("sortBy", sortBy);

    try {
      const res = await fetch(`/api/products?${params.toString()}`);
      const data: Product[] = await res.json();

      setProducts((prev) => (reset ? data : [...prev, ...data]));
      setHasMore(data.length === limit);
    } catch (e) {
      console.error("Ürünler alınamadı", e);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async (selectedBrands: string[] = []) => {
    const params = new URLSearchParams();
    selectedBrands.forEach((b) => params.append("brand", b));

    try{
      const categoriesRes = await fetch (`/api/categories?${params.toString()}`)
      const categoriesData: string[] = await categoriesRes.json();

      setCategories(categoriesData);
    } catch (error) {
      console.error("Kategoriler alınamadı", error);
    }
  }

  const fetchBrands = async (selectedCategories: string[] = [], searchQuery: string) => {
    const params = new URLSearchParams(); 
    selectedCategories.forEach((c) => params.append("category", c))

    try {
      const brandsRes = await fetch(`/api/brands?${params.toString()}&search=${encodeURIComponent(searchQuery)} `);
      const brandsData: Brand[] = await brandsRes.json();

      setBrands(brandsData);
    } catch (error) {
      console.error("Markalar alınamadı", error);
    }
  }

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' }); 
    fetchCategories(selectedBrands);
  }, [selectedBrands]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    fetchBrands(selectedCategories, brandsSearchQuery)
  }, [selectedCategories, brandsSearchQuery]);

  // TEK useEffect ile net durum kontrolü
  useEffect(() => {
    setProducts([]);
    setOffset(0);
    fetchProducts(0, true);
  }, [selectedCategories, selectedBrands, minRating, maxRating, minPrice, maxPrice, sortBy]);

  // Infinite Scroll (sadece gözükünce offset'i arttırıp istek atıyor)
  useEffect(() => {
    if (!observerRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          const newOffset = offset + limit;
          fetchProducts(newOffset, false);
          setOffset(newOffset);
        }
      },
      { threshold: 1.0 }
    );
    observer.observe(observerRef.current);
    return () => observer.disconnect();
  }, [observerRef, offset, hasMore, loading]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-8 flex items-center space-x-6">
          <div className="relative w-24 h-24 rounded-lg overflow-hidden">
            <Image src={"/placeholder.svg"} alt={""} fill className="object-cover" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{"category.name"}</h1>
            <p className="text-gray-600 mb-1">{"category.description"}</p>
            <p className="text-sm text-gray-500">{products.length} ürün bulundu</p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 flex gap-6">
        {/* Filtre Paneli (Aynı kalabilir) */}
        <aside className={`w-64 lg:block`}>
          <div className="bg-white rounded-lg p-6 sticky top-20">
            <h3 className="font-semibold text-gray-900 mb-4">Filtreler</h3>
            {/* Kategori filtre */}
            <div className="mb-6">
              <h4 className="font-medium text-gray-700 mb-3">Kategori</h4>
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {categories.map((category, index) => (
                  <label key={index} className="flex items-center">
                    <input
                      type="checkbox"
                      name="kategori"
                      checked={selectedCategories?.includes(category)}
                      onChange={() => {
                        setSelectedCategories(prev => 
                          prev?.includes(category) 
                            ? prev.filter(c => c !== category) 
                            : [...(prev || []), category]
                        )
                      }}
                      className="rounded border-gray-300 mr-2"
                      />
                    <span className="text-sm text-gray-600">{category}</span>
                  </label>
                ))}
                  <button
                    className="text-xs text-blue-500 underline mt-2"
                    >
                    Kategoriyi temizle
                  </button>
              </div>
            </div>
            {/* Marka filtre */}
            <div className="mb-6">
              <h4 className="font-medium text-gray-700 mb-3">Marka</h4>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                <Input type="text" name="categorySearch" className="py-1 px-3 h-auto" onChange={(e) => {setBrandsSearchQuery(e.target.value)}} />
                {brands.map((brand, index) => (
                  <label key={index} className="flex items-center">
                    <input 
                      type="checkbox"
                      className="rounded border-gray-300 mr-2"
                      checked={selectedBrands.includes(brand.name)}
                      onChange={() => {
                        setSelectedBrands(prev => 
                          prev.includes(brand.name) 
                            ? prev.filter(b => b !== brand.name) 
                            : [...prev, brand.name]
                        )
                      }}
                    />
                    <span className="text-sm text-gray-600">{brand.name}</span>
                  </label>
                ))}
              </div>
            </div>
            <div className="mb-6">
              <h4 className="font-medium text-gray-700 mb-3">name</h4>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {/* {brands.map(brand => ( */}
                  <label  className="flex items-center">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300 mr-2"
                    />
                    <span className="text-sm text-gray-600">{"product.name"}</span>
                  </label>
              </div>
            </div>
            {/* Fiyat ve rating filtreleri eklenebilir */}
          </div>
        </aside>

        <section className="flex-1">
          <div className="flex items-center justify-end mb-6">
            <div className="flex flex-col gap-y-1">
              <label className="text-sm" htmlFor="Sırala">Sırala</label>
              <select
                name="sortBy"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="average_rating">En Popüler Ürünler</option>
                <option value="discount_ratio">En İndirimli Ürünler</option>
                <option value="favorite_count">Favori Sayısı</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div ref={observerRef} className="h-10" />
          {loading && <p className="text-center mt-6">Yükleniyor...</p>}
          {!hasMore && <p className="text-center mt-6 text-gray-500">Daha fazla ürün yok</p>}
        </section>
      </div>
    </div>
  );
}