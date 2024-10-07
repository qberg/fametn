import { NextRequest, NextResponse } from 'next/server'
 
export function middleware(request: NextRequest) {
  const nonce = Buffer.from(crypto.randomUUID()).toString('base64')
//   const cspHeader = `
//     default-src 'self';
//     script-src 'self' 'strict-dynamic';
//     style-src 'self' 'unsafe-inline' 'https://fonts.googleapis.com';
//     img-src 'self' blob: data:;
//     font-src 'self';
//     object-src 'none';
//     base-uri 'self';
//     form-action 'self';
//     frame-ancestors 'none';
//     upgrade-insecure-requests;
// `
  // const cspHeader = `
  //   default-src 'none';
  //   img-src 'self' blob: data:;
  //   font-src 'self' 'https://fonts.googleapis.com' 'https://fonts.gstatic.com';
  //   object-src 'none';
  //   base-uri 'self';
  //   form-action 'self';
  //   frame-ancestors 'none';
  //   upgrade-insecure-requests;
  // `

  const cspHeader = `
    default-src *;
    img-src * blob: data:;
    font-src *;
    object-src *;
    base-uri *;
    form-action *;
    frame-ancestors *;
    upgrade-insecure-requests;
    script-src *;
    style-src *;
    connect-src *;
  `;

  // Replace newline characters and spaces
  // const contentSecurityPolicyHeaderValue = cspHeader
  //   .replace(/\s{2,}/g, ' ')
  //   .trim()
 
  const requestHeaders = new Headers(request.headers)
  // requestHeaders.set('x-nonce', nonce)
 
  // requestHeaders.set(
  //   'Content-Security-Policy',
  //   contentSecurityPolicyHeaderValue
  // )
 
  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  })

  // response.headers.set(
  //   'Content-Security-Policy',
  //   contentSecurityPolicyHeaderValue
  // )
 
  return response
}