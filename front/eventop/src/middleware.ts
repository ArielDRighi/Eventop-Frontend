import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server'


export function middleware(req: NextRequest) {
  // Obtén la cookie directamente del request
  const token = req.cookies.get('adminToken');
  console.log(token)

  if (!token && req.nextUrl.pathname.startsWith('/admin/')) {
    // Redirige al login si el token no está presente y la ruta es protegida
    return NextResponse.redirect(new URL('/', req.url));
  }

  return NextResponse.next(); // Permite continuar si la verificación pasa
}

export const config = {
  matcher: '/admin/:path*', // Especifica las rutas a las que se aplica el middleware
};
