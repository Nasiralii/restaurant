import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip early — no auth needed for login route
  if (!pathname.startsWith("/admin/") || pathname.startsWith("/admin/login")) {
    return NextResponse.next();
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    console.error("Missing Supabase env vars");
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  // For client-side auth (SPA mode), allow access and let client handle auth
  // The admin panel will check auth on the client side
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
