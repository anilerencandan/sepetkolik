// app/api/products/route.ts

import { NextResponse } from "next/server"
import { prisma } from "@/lib/prismaClient"
import Product from "@/models/Product"

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const offset = parseInt(searchParams.get("offset") || "0", 10)
    const limit = parseInt(searchParams.get("limit") || "50", 10)
    const categoriesRaw = searchParams.getAll("category")
    const categories = categoriesRaw.filter(c => c.trim() !== "")
    const brands = searchParams.getAll("brand")
    const minRating = parseFloat(searchParams.get("minRating") || "0")
    const maxRating = parseFloat(searchParams.get("maxRating") || "5")
    const minPrice = parseFloat(searchParams.get("minPrice") || "0")
    const maxPrice = parseFloat(searchParams.get("maxPrice") || "10000000") 
    const allowedSortFields = ["average_rating", "discount_ratio", "favorite_count", "discounted_price"];
    const sortByRaw = searchParams.get("sortBy");
    const sortBy = allowedSortFields.includes(sortByRaw!) ? sortByRaw : "discount_ratio"; // fallback

    const products = await prisma.products.findMany({
      skip: offset,
      take: limit,
      select: {
        id: true,
        name: true,
        image_url: true,
        original_price: true,
        discounted_price: true,
        discount_ratio: true,
        brand: true,
        average_rating: true,
        total_count: true,
        promotion_badge: true,
        url: true,
        favorite_count: true,
        kategori: true,
      },
      where: {
        alt_kategori: categories.length > 0 ? { in: categories } : undefined,
        brand: brands.length > 0 ? { in: brands } : undefined,
        average_rating: {
          gte: minRating,
          lte: maxRating,
        },
        discounted_price: {
          gte: minPrice,
          lte: maxPrice,
        },
      },
      ...(sortBy && {
        orderBy: {
          [sortBy]: "desc",
        },
      }),
    });


    const safeProducts = products.map((product: Product) => ({
      ...product,
      id: product.id.toString(), // BigInt fix
    }))

    return NextResponse.json(safeProducts)
  } catch (error) {
    console.error("🔥 Prisma Hatası:", error)
    return NextResponse.json({ error: "Veri alınamadı" }, { status: 500 })
  }
}