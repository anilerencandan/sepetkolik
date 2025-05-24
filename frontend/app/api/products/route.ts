import { NextResponse } from "next/server";
import { prisma } from "@/lib/prismaClient";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const offset = parseInt(searchParams.get("offset") || "0", 10);

    const products = await prisma.products.findMany({
      skip: offset,
      take: 50,
      where: {
        discount_ratio: {
          gte: 40,
        },
        favorite_count: {
          gt: 0,
        },
      },
      orderBy: {
        discount_ratio: "desc",
      },
    });

    const safeProducts = products.map((product) => ({
      ...product,
      id: product.id.toString(),
    }));

    return NextResponse.json(safeProducts);
  } catch (error) {
    console.error("🔥 Prisma Hatası:", error);
    return NextResponse.json({ error: "Veri alınamadı" }, { status: 500 });
  }
}