import { NextResponse, NextRequest } from "next/server";

const protectedRoutes = ['/services']
const publicRoutes = ["/","/signup","/signin"]

export default function proxy(req: NextRequest) {
    const { pathname } = req.nextUrl
    const session = req.cookies.get("accessToken")?.value

    // Verifica se a rota atual começa com alguma das rotas protegidas
    const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route))
    const isPublicRoute = publicRoutes.includes(pathname)

    // 1. Se o usuário JÁ está logado e tenta acessar páginas de login/cadastro/home,
    // ele é mandado direto para a área logada (/services)
    if (session && isPublicRoute) {
        // Evita loop de redirecionamento caso ele já esteja em uma sub-rota de services
        if (!pathname.startsWith('/services')) {
            return NextResponse.redirect(new URL('/services', req.url))
        }
    }

    // 2. Se o usuário NÃO está logado e tenta acessar uma rota protegida,
    // ele é mandado de volta para a tela de login
    if (!session && isProtectedRoute) {
        return NextResponse.redirect(new URL('/signin', req.url))
    }

    return NextResponse.next()
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)']
}