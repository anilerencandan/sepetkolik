"use client"

import { Search, Menu, X, Percent } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import Link from "next/link"

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <header className="bg-white border-b sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <h1 className="text-2xl font-bold text-rose-500">Sepetkolik</h1>
          </Link>

          {/* Search Bar */}
          <div className="relative flex-1 max-w-2xl">
            <div className="relative">
              <input
                type="text"
                placeholder="Aradığınız ürün, kategori veya markayı yazınız"
                className="w-full py-3 px-4 pr-12 border-2 rounded-xl bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-rose-500 transition-all"
              />
              <button className="absolute right-3 top-1/2 -translate-y-1/2 bg-rose-500 text-white p-2 rounded-lg hover:bg-rose-600 transition-colors">
                <Search className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* En İndirimli Ürünler Link */}
          <div className="hidden lg:flex items-center">
            <Link
              href="/en-indirimli-urunler"
              className="flex items-center gap-2 bg-gradient-to-r from-red-500 to-orange-500 text-white px-6 py-3 rounded-xl font-semibold hover:from-red-600 hover:to-orange-600 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              <Percent className="w-5 h-5" />
              <span>En İndirimli Ürünler</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8 overflow-x-auto py-3 text-sm scrollbar-hide border-t mt-3 pt-3">
          <Link
            href="/kategoriler"
            className="flex items-center gap-2 font-semibold whitespace-nowrap hover:text-rose-500 transition-colors"
          >
            <span className="bg-gradient-to-r from-rose-500 to-pink-500 text-white px-3 py-1 rounded-full text-xs font-bold">
              YENİ
            </span>
            TÜM KATEGORİLER
          </Link>
          <Link href="/kategori/kadin" className="whitespace-nowrap hover:text-rose-500 font-medium transition-colors">
            Kadın
          </Link>
          <Link href="/kategori/erkek" className="whitespace-nowrap hover:text-rose-500 font-medium transition-colors">
            Erkek
          </Link>
          <Link
            href="/kategori/anne-cocuk"
            className="whitespace-nowrap hover:text-rose-500 font-medium transition-colors"
          >
            Anne & Çocuk
          </Link>
          <Link
            href="/kategori/ev-yasam"
            className="whitespace-nowrap hover:text-rose-500 font-medium transition-colors"
          >
            Ev & Yaşam
          </Link>
          <Link
            href="/kategori/supermarket"
            className="whitespace-nowrap hover:text-rose-500 font-medium transition-colors"
          >
            Süpermarket
          </Link>
          <Link
            href="/kategori/kozmetik"
            className="whitespace-nowrap hover:text-rose-500 font-medium transition-colors"
          >
            Kozmetik
          </Link>
          <Link
            href="/kategori/ayakkabi-canta"
            className="whitespace-nowrap hover:text-rose-500 font-medium transition-colors"
          >
            Ayakkabı & Çanta
          </Link>
          <Link
            href="/kategori/elektronik"
            className="whitespace-nowrap hover:text-rose-500 font-medium transition-colors"
          >
            Elektronik
          </Link>
          <Link
            href="/cok-satanlar"
            className="flex items-center gap-2 whitespace-nowrap hover:text-rose-500 font-medium transition-colors"
          >
            <span className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1 rounded-full text-xs font-bold">
              YENİ
            </span>
            Çok Satanlar
          </Link>
          <Link
            href="/flas-urunler"
            className="flex items-center gap-2 whitespace-nowrap hover:text-rose-500 font-medium transition-colors"
          >
            <span className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white px-3 py-1 rounded-full text-xs font-bold">
              YENİ
            </span>
            Flaş Ürünler
          </Link>
        </nav>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t mt-3 pt-3">
            {/* En İndirimli Ürünler - Mobile */}
            <div className="mb-4">
              <Link
                href="/en-indirimli-urunler"
                className="flex items-center justify-center gap-2 bg-gradient-to-r from-red-500 to-orange-500 text-white px-6 py-3 rounded-xl font-semibold w-full"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Percent className="w-5 h-5" />
                <span>En İndirimli Ürünler</span>
              </Link>
            </div>

            {/* Mobile Navigation */}
            <nav className="grid grid-cols-2 gap-2 text-sm">
              <Link
                href="/kategoriler"
                className="flex items-center gap-2 p-3 rounded-lg hover:bg-gray-50"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span className="bg-rose-500 text-white px-2 py-0.5 rounded text-xs">YENİ</span>
                <span className="font-medium">Tüm Kategoriler</span>
              </Link>
              <Link
                href="/kategori/kadin"
                className="p-3 rounded-lg hover:bg-gray-50 font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Kadın
              </Link>
              <Link
                href="/kategori/erkek"
                className="p-3 rounded-lg hover:bg-gray-50 font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Erkek
              </Link>
              <Link
                href="/kategori/anne-cocuk"
                className="p-3 rounded-lg hover:bg-gray-50 font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Anne & Çocuk
              </Link>
              <Link
                href="/kategori/ev-yasam"
                className="p-3 rounded-lg hover:bg-gray-50 font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Ev & Yaşam
              </Link>
              <Link
                href="/kategori/supermarket"
                className="p-3 rounded-lg hover:bg-gray-50 font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Süpermarket
              </Link>
              <Link
                href="/kategori/kozmetik"
                className="p-3 rounded-lg hover:bg-gray-50 font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Kozmetik
              </Link>
              <Link
                href="/kategori/ayakkabi-canta"
                className="p-3 rounded-lg hover:bg-gray-50 font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Ayakkabı & Çanta
              </Link>
              <Link
                href="/kategori/elektronik"
                className="p-3 rounded-lg hover:bg-gray-50 font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Elektronik
              </Link>
              <Link
                href="/cok-satanlar"
                className="flex items-center gap-2 p-3 rounded-lg hover:bg-gray-50"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span className="bg-orange-500 text-white px-2 py-0.5 rounded text-xs">YENİ</span>
                <span className="font-medium">Çok Satanlar</span>
              </Link>
              <Link
                href="/flas-urunler"
                className="flex items-center gap-2 p-3 rounded-lg hover:bg-gray-50"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span className="bg-purple-500 text-white px-2 py-0.5 rounded text-xs">YENİ</span>
                <span className="font-medium">Flaş Ürünler</span>
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
