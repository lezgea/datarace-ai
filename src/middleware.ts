import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { routing } from './i18n/routing';

// Create middleware
const intlMiddleware = createMiddleware(routing);

export default function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;

    // Prevent URLs like /en/en/path
    const localePattern = /^\/(az|en)\/\1/;
    if (localePattern.test(pathname)) {
        const correctedPath = pathname.replace(localePattern, '/$1');
        return NextResponse.redirect(new URL(correctedPath, req.url));
    }

    // Run the next-intl middleware
    return intlMiddleware(req);
}

export const config = {
    // Match only internationalized pathnames
    matcher: ['/', '/(az|en)/:path*'],
};
