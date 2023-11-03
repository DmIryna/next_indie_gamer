import { NextRequest, NextResponse } from "next/server"
import { searchReview } from "@/lib/reviews"

export const GET = async (request: NextRequest) => {
  const query = request.nextUrl.searchParams.get("query")
  const reviews = await searchReview(query)

  return NextResponse.json(reviews)
}
