import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

export async function middleware(req: NextRequest) {
  // Obtén el token directamente del request
  const token = JSON.parse(req.cookies.get('accessToken')?.value || 'null')

  if (!token) {
    // Redirige al login si el token no está presente y la ruta es protegida
    if (req.nextUrl.pathname.startsWith('/admin') || req.nextUrl.pathname.startsWith('/cliente'))  {
      return NextResponse.redirect(new URL('/', req.url));
    }
    return NextResponse.next();
  }

  try {
    // Decodifica el token para obtener el rol del usuario
    const secret = new TextEncoder().encode('your_secret_key');
    const { payload } = await jwtVerify(token, secret);
    const userRole = payload.role;
    console.log(`Token: ${token}, Role: ${userRole}`);

    // Verifica el rol del usuario y redirige según sea necesario
    if (req.nextUrl.pathname.startsWith('/admin') && userRole !== 'admin') {
      return NextResponse.redirect(new URL('/', req.url));
    } else if (req.nextUrl.pathname.startsWith('/cliente') && userRole !== 'cliente') {
      return NextResponse.redirect(new URL('/', req.url));
    } 
    
  } catch (error) {
    console.error('Error decoding token:', error);
    return NextResponse.redirect(new URL('/', req.url));
  }

  // Permite continuar si la verificación pasa
  return NextResponse.next();
}

// Configuración del middleware para que se aplique a las rutas especificadas
export const config = {
  matcher: ['/admin/:path*', '/cliente/:path*'],
};
