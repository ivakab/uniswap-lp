import { NextResponse } from "next/server";
import { getPools } from "@/lib/pools";

export async function GET() {
  const pools = await getPools();

  return NextResponse.json(
    {
      updatedAt: new Date().toISOString(),
      pools,
    },
    {
      headers: {
        "Cache-Control": "public, s-maxage=60, stale-while-revalidate=120",
      },
    },
  );
}
