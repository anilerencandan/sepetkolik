import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Header from "@/components/header"
import Footer from "@/components/footer"
import FloatingNewsletter from "@/components/floating-newsletter"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Sepetkolik - Trendyol İndirim Fırsatları",
  description: "Trendyol'daki en indirimli ürünleri keşfedin. Akıllı alışveriş yapın, en iyi fırsatları kaçırmayın.",
  keywords: "trendyol, indirim, fırsat, alışveriş, elektronik, moda",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="tr">
      <body className={inter.className}>
        <Header />
        <div className="pt-0">{children}</div>
        <Footer />
        <FloatingNewsletter />
      </body>
    </html>
  )
}
