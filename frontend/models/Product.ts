export default interface Product {
  id: string
  name: string
  image_url: string
  original_price: number
  discounted_price: number
  discount_ratio: number
  brand: string
  average_rating?: number
  total_count?: number
  promotion_badge?: string
  url?: string
  favorite_count?: number
  kategori?: string
}