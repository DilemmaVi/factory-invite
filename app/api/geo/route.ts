import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const country = (request as NextRequest & { geo?: { country?: string } }).geo?.country || null;
  return NextResponse.json({ country });
}
