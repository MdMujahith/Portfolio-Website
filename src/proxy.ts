import { NextResponse } from "next/server";

/* ============================================
 * SECURITY & EDGE PROXY (Next.js 16 Proxy Convention)
 * ============================================
 * Adds security headers and implements network rules
 */

export function proxy() {
  const response = NextResponse.next();

  /* ============================================
   * SECURITY HEADERS
   * ============================================
   * Protect against common web vulnerabilities
   */

  // Prevent clickjacking attacks
  response.headers.set("X-Frame-Options", "DENY");

  // Prevent MIME type sniffing
  response.headers.set("X-Content-Type-Options", "nosniff");

  // Enable XSS protection (legacy browsers)
  response.headers.set("X-XSS-Protection", "1; mode=block");

  // Referrer policy
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");

  // Permissions policy (disable unnecessary browser features)
  response.headers.set(
    "Permissions-Policy",
    "camera=(), microphone=(), geolocation=(), interest-cohort=()"
  );

  // Content Security Policy (Updated to permit Spline 3D Scene network connectivity & web workers)
  response.headers.set(
    "Content-Security-Policy",
    [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://fonts.googleapis.com https://*.spline.design https://*.spline.tech",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com",
      "img-src 'self' data: https: blob:",
      "worker-src 'self' blob:",
      "connect-src 'self' https://fonts.googleapis.com https://fonts.gstatic.com https://*.spline.design https://*.spline.tech https://*.spline.com https://*.splinetool.com data: blob:",
      "frame-ancestors 'none'",
    ].join("; ")
  );

  return response;
}

/* ============================================
 * PROXY CONFIGURATION
 * ============================================
 * Apply to all routes except static assets
 */
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder files
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|avif)$).*)",
  ],
};
