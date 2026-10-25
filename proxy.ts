import { NextRequest, NextResponse } from 'next/server'

export async function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl

    const isPublic =
        pathname === '/' ||                                    // ← home
        pathname.startsWith('/products') ||
        pathname.startsWith('/category') ||
        pathname.startsWith('/services') ||
        pathname.startsWith('/auth')


    if (isPublic) return NextResponse.next()

    // ---- 3. Everything else requires auth ----
    const access = request.cookies.get('access')
    if (!access) {
        const loginUrl = new URL('/auth/login', request.url)
        loginUrl.searchParams.set('next', pathname)            // optional, see below
        return NextResponse.redirect(loginUrl)
    }
    return NextResponse.next()
}

export const config = {
    matcher: ['/((?!_next/static|_next/image|favicon.ico|auth/activation).*)'],
}