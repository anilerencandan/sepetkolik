import { NextResponse } from "next/server";
import { prisma } from "@/lib/prismaClient";

export async function GET() {
  try {
    const products = await prisma.products.findMany({
      orderBy: {
        favorite_count: "desc",
      },
      take: 20,
      select: {
        id: true,
        name: true,
        favorite_count: true,
        image_url:true,
      },
    });

    return NextResponse.json(topProducts);
  } catch (error) {
    console.error("🔥 Top Products API Error:", error);
    return NextResponse.json({ error: "Veri alınamadı" }, { status: 500 });
  }
}