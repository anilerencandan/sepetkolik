import { MessageCircle, Instagram, Twitter, Youtube, Facebook } from "lucide-react"

const socialLinks = [
  {
    name: "Telegram",
    icon: MessageCircle,
    url: "https://t.me/sepetkolik",
    color: "hover:text-blue-500",
    bgColor: "hover:bg-blue-50",
  },
  {
    name: "Instagram",
    icon: Instagram,
    url: "https://instagram.com/sepetkolik",
    color: "hover:text-pink-500",
    bgColor: "hover:bg-pink-50",
  },
  {
    name: "Twitter",
    icon: Twitter,
    url: "https://twitter.com/sepetkolik",
    color: "hover:text-blue-400",
    bgColor: "hover:bg-blue-50",
  },
  {
    name: "YouTube",
    icon: Youtube,
    url: "https://youtube.com/@sepetkolik",
    color: "hover:text-red-500",
    bgColor: "hover:bg-red-50",
  },
  {
    name: "Facebook",
    icon: Facebook,
    url: "https://facebook.com/sepetkolik",
    color: "hover:text-blue-600",
    bgColor: "hover:bg-blue-50",
  },
]

export default function SocialMedia() {
  return (
    <div className="flex items-center space-x-3">
      {socialLinks.map((social) => {
        const IconComponent = social.icon
        return (
          <a
            key={social.name}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`p-3 rounded-full bg-gray-100 text-gray-600 transition-all duration-200 ${social.color} ${social.bgColor} hover:scale-110`}
            title={social.name}
          >
            <IconComponent className="h-5 w-5" />
          </a>
        )
      })}
    </div>
  )
}
