import { NextResponse } from "next/server";
import { prisma } from "@/lib/prismaClient";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL (req.url);
    const categories = searchParams.getAll("category");
    const search = searchParams.get("search")?.trim() || "";
    const limit = parseInt(searchParams.get("limit") || "50", 10);

    const brands = await prisma.brands.findMany({
      take: search ? 10 : limit,
      distinct: ["name"], // Aynı isimli markaları bir kez döndür
      select: {
        id: true,
        name: true,
      },
      where: {
        name:  search ?  { startsWith: search, mode: "insensitive" } : undefined,
        alt_kategori: categories.length > 0 ? { in: categories } : undefined,
      },
      orderBy: { name: "asc" }, // A'dan Z'ye sıralı gelsin
      
    });

    return NextResponse.json(brands);
  } catch (error) {
    console.error("🔥 Brand API hatası:", error);
    return NextResponse.json({ error: "Markalar alınamadı" }, { status: 500 });
  }
}