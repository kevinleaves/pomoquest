import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes: ["/", "/login"],
});

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next
     * - static (static files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/(.*?trpc.*?|(?!static|.*\\..*|_next|favicon.ico|api/webhook).*)",
    "/",
  ],
};

// was running into this error:
// ❌ tRPC failed on <no-path>: You need to use "withClerkMiddleware" in your Next.js middleware file. You also need to make sure that your middleware matcher is configured correctly and matches this route or page. See https://clerk.com/docs/quickstarts/get-started-with-nextjs

// https://beta-docs.clerk.com/quickstarts/nextjs/stable#add-middleware

// the original matcher strings from the above doc.
// "/((?!static|.*\\..*|_next|favicon.ico).*)",
// "/",
