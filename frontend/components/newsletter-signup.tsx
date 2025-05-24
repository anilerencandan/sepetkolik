"use client"

import type React from "react"

import { useState } from "react"
import { Mail, Bell, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function NewsletterSignup() {
  const [email, setEmail] = useState("")
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubscribed(true)
      setIsLoading(false)
      setEmail("")
    }, 1500)
  }

  if (isSubscribed) {
    return (
      <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-6 text-white text-center">
        <div className="flex items-center justify-center mb-4">
          <div className="bg-white rounded-full p-2">
            <Check className="h-6 w-6 text-green-500" />
          </div>
        </div>
        <h3 className="text-xl font-bold mb-2">Başarıyla Kaydoldunuz! 🎉</h3>
        <p className="text-green-100">En iyi indirim fırsatlarından haberdar olacaksınız.</p>
      </div>
    )
  }

  return (
    <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-xl p-6 text-white">
      <div className="flex items-center mb-4">
        <div className="bg-white/20 rounded-full p-3 mr-4">
          <Bell className="h-6 w-6" />
        </div>
        <div>
          <h3 className="text-xl font-bold mb-1">İndirimlerden Haberdar Ol!</h3>
          <p className="text-orange-100 text-sm">En iyi fırsatları kaçırma, e-posta adresini gir</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            type="email"
            placeholder="E-posta adresinizi girin..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="pl-10 bg-white border-0 text-gray-900 placeholder-gray-500"
            required
          />
        </div>
        <Button
          type="submit"
          disabled={isLoading}
          className="bg-white text-orange-600 hover:bg-gray-100 font-semibold px-6 whitespace-nowrap"
        >
          {isLoading ? "Kaydediliyor..." : "Abone Ol"}
        </Button>
      </form>

      <p className="text-xs text-orange-100 mt-3">
        Abone olarak{" "}
        <a href="#" className="underline hover:text-white">
          Gizlilik Politikamızı
        </a>{" "}
        kabul etmiş olursunuz.
      </p>
    </div>
  )
}
