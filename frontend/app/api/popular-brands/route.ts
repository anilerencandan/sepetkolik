// /app/api/popular-brands/route.ts

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prismaClient";

export async function GET() {
  try {
    const brands = await prisma.products.groupBy({
      by: ["brand", "image_url"],
      where: {
        brand: {
          not: null,
        },
      },
      _sum: {
        favorite_count: true,
      },
      orderBy: {
        _sum: {
          favorite_count: "desc",
        },
      },
      take: 20,
    });

    return NextResponse.json(
      brands.map((b) => ({
        name: b.brand,
        logo: b.image_url,
        totalFavorites: b._sum.favorite_count || 0,
      }))
    );
  } catch (error) {
    console.error("🔥 Popüler markalar alınamadı", error);
    return NextResponse.json({ error: "Veri alınamadı" }, { status: 500 });
  }
}