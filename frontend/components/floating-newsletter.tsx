"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { X, Mail, Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function FloatingNewsletter() {
  const [isVisible, setIsVisible] = useState(false)
  const [email, setEmail] = useState("")
  const [isSubscribed, setIsSubscribed] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      const hasSeenPopup = localStorage.getItem("newsletter-popup-seen")
      if (!hasSeenPopup) {
        setIsVisible(true)
      }
    }, 5000) // Show after 5 seconds

    return () => clearTimeout(timer)
  }, [])

  const handleClose = () => {
    setIsVisible(false)
    localStorage.setItem("newsletter-popup-seen", "true")
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    // Simulate API call
    setTimeout(() => {
      setIsSubscribed(true)
      setTimeout(() => {
        setIsVisible(false)
        localStorage.setItem("newsletter-popup-seen", "true")
      }, 2000)
    }, 1000)
  }

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 relative animate-in slide-in-from-bottom-4 duration-300">
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
          onClick={handleClose}
        >
          <X className="h-4 w-4" />
        </Button>

        {isSubscribed ? (
          <div className="text-center py-8">
            <div className="bg-green-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <Bell className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Teşekkürler! 🎉</h3>
            <p className="text-gray-600">En iyi indirim fırsatlarından haberdar olacaksınız.</p>
          </div>
        ) : (
          <>
            <div className="text-center mb-6">
              <div className="bg-orange-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Bell className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Süper İndirimleri Kaçırma!</h3>
              <p className="text-gray-600">%80'e varan indirimlerden ilk sen haberdar ol</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  type="email"
                  placeholder="E-posta adresinizi girin"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
              <Button type="submit" className="w-full bg-orange-600 hover:bg-orange-700">
                Ücretsiz Abone Ol
              </Button>
            </form>

            <p className="text-xs text-gray-500 text-center mt-4">
              Spam göndermiyoruz. İstediğiniz zaman abonelikten çıkabilirsiniz.
            </p>
          </>
        )}
      </div>
    </div>
  )
}
