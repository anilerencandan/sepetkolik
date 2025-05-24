import { Button } from "@/components/ui/button"
import { TrendingUp, Percent, Clock } from "lucide-react"
import NewsletterSignup from "@/components/newsletter-signup"
import Link from "next/link"

export default function HeroSection() {
  return (
    <section className="bg-gradient-to-r from-orange-500 to-red-500 text-white py-16">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-4xl mx-auto mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            En İyi İndirimleri
            <span className="block text-yellow-300">Kaçırma!</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90">
            Trendyol'daki en indirimli ürünleri keşfet, akıllı alışveriş yap
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link href="/en-indirimli-urunler">
              <Button size="lg" className="bg-white text-orange-600 hover:bg-gray-100 font-semibold px-8">
                İndirimleri Keşfet
              </Button>
            </Link>
            <Link href="/kategoriler">
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-orange-600 font-semibold px-8"
              >
                Kategorilere Göz At
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto mb-12">
            <div className="flex items-center justify-center space-x-3 bg-white/10 rounded-lg p-4 backdrop-blur-sm">
              <Percent className="h-8 w-8 text-yellow-300" />
              <div className="text-left">
                <div className="font-bold text-lg">%80'e Varan</div>
                <div className="text-sm opacity-80">İndirim Oranları</div>
              </div>
            </div>
            <div className="flex items-center justify-center space-x-3 bg-white/10 rounded-lg p-4 backdrop-blur-sm">
              <TrendingUp className="h-8 w-8 text-yellow-300" />
              <div className="text-left">
                <div className="font-bold text-lg">Günlük Güncelleme</div>
                <div className="text-sm opacity-80">Yeni Fırsatlar</div>
              </div>
            </div>
            <div className="flex items-center justify-center space-x-3 bg-white/10 rounded-lg p-4 backdrop-blur-sm">
              <Clock className="h-8 w-8 text-yellow-300" />
              <div className="text-left">
                <div className="font-bold text-lg">Anlık Bildirim</div>
                <div className="text-sm opacity-80">Fırsat Alarmları</div>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter Signup in Hero */}
        <div className="max-w-2xl mx-auto">
          <NewsletterSignup />
        </div>
      </div>
    </section>
  )
}
