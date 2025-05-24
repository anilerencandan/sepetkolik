import { Heart, Mail, Phone, MapPin } from "lucide-react"
import SocialMedia from "@/components/social-media"
import NewsletterSignup from "@/components/newsletter-signup"

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        {/* Newsletter Section */}
        <div className="mb-12">
          <NewsletterSignup />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold text-orange-500 mb-4">Sepetkolik</h3>
            <p className="text-gray-300 mb-6">Trendyol'daki en iyi indirim fırsatlarını keşfetmenin en akıllı yolu.</p>

            {/* Social Media */}
            <div className="mb-4">
              <h4 className="font-semibold mb-3">Bizi Takip Edin</h4>
              <SocialMedia />
            </div>

            <div className="flex items-center text-sm text-gray-400">
              <Heart className="h-4 w-4 mr-2 text-red-500" />
              Türkiye'de yapıldı
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Hızlı Linkler</h4>
            <ul className="space-y-2 text-gray-300">
              <li>
                <a href="#" className="hover:text-orange-500 transition-colors">
                  Ana Sayfa
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-orange-500 transition-colors">
                  Kategoriler
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-orange-500 transition-colors">
                  Markalar
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-orange-500 transition-colors">
                  Süper İndirim
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-orange-500 transition-colors">
                  Çok Satanlar
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold mb-4">Destek</h4>
            <ul className="space-y-2 text-gray-300">
              <li>
                <a href="#" className="hover:text-orange-500 transition-colors">
                  Yardım Merkezi
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-orange-500 transition-colors">
                  İletişim
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-orange-500 transition-colors">
                  Gizlilik Politikası
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-orange-500 transition-colors">
                  Kullanım Şartları
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-orange-500 transition-colors">
                  Çerez Politikası
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">İletişim</h4>
            <div className="space-y-3 text-gray-300">
              <div className="flex items-center">
                <Mail className="h-4 w-4 mr-3 text-orange-500" />
                <span className="text-sm">info@sepetkolik.com</span>
              </div>
              <div className="flex items-center">
                <Phone className="h-4 w-4 mr-3 text-orange-500" />
                <span className="text-sm">0850 123 45 67</span>
              </div>
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-3 text-orange-500" />
                <span className="text-sm">İstanbul, Türkiye</span>
              </div>
            </div>

            {/* App Download */}
            <div className="mt-6">
              <h5 className="font-medium mb-3 text-sm">Mobil Uygulamayı İndir</h5>
              <div className="space-y-2">
                <a href="#" className="block">
                  <div className="bg-gray-800 rounded-lg p-2 hover:bg-gray-700 transition-colors">
                    <div className="text-xs text-gray-400">Yakında</div>
                    <div className="text-sm font-medium">App Store</div>
                  </div>
                </a>
                <a href="#" className="block">
                  <div className="bg-gray-800 rounded-lg p-2 hover:bg-gray-700 transition-colors">
                    <div className="text-xs text-gray-400">Yakında</div>
                    <div className="text-sm font-medium">Google Play</div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 Sepetkolik. Tüm hakları saklıdır.</p>
          <p className="text-sm mt-2">
            Bu site Trendyol ile resmi bir bağlantısı bulunmamaktadır. Sadece fırsat paylaşım platformudur.
          </p>
        </div>
      </div>
    </footer>
  )
}
