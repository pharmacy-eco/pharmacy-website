import { NextResponse } from "next/server";
import productService from "@/services/web/product";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const keyword = (searchParams.get("q") || "").trim();

  if (!keyword) {
    return NextResponse.json({ items: [] });
  }

  try {
    const res = await productService.fnSearchProducts(keyword, 1, 5);
    return NextResponse.json({ items: res?.data?.items || [] });
  } catch (error) {
    return NextResponse.json({ items: [] });
  }
}
