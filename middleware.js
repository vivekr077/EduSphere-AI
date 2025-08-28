import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isProtectedRoute = createRouteMatcher(['/dashboard(.*)', '/create', '/course(.*)'])
const isWebhookRoute = createRouteMatcher(['/api/payment/webhook'])

export default clerkMiddleware(async (auth, req) => {
  // Skip authentication for webhook routes
  if (isWebhookRoute(req)) {
    return;
  }
  
  if (isProtectedRoute(req)) await auth.protect()
})

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};