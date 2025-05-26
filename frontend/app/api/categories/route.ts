// app/api/products/categories/route.ts

import { NextResponse } from "next/server"
import { prisma } from "@/lib/prismaClient"

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url) 
    const brands = searchParams.getAll("brand")
    // Tüm benzersiz alt_kategori değerlerini çek
    const raw = await prisma.products.findMany({
      where: {
        brand: brands.length > 0 ? { in: brands} : undefined, 
      },
      select: { alt_kategori: true },
      distinct: ["alt_kategori"],
    })

    
    return NextResponse.json( raw.map(item => item.alt_kategori ?? '') )
  } catch (error) {
    console.error("🔥 Kategori alınırken hata:", error)
    return NextResponse.json({ error: "Kategori alınamadı" }, { status: 500 })
  }
}
