/** @type {import('next').NextConfig} */

const nextConfig = {
    reactStrictMode: true,
    // async headers() {
    //     return [
    //         {
    //             source: '/(.*)',
    //             headers: [
    //                 {
    //                     key: 'Content-Security-Policy',
    //                     value: "default-src 'self'; font-src 'self' 'https://fonts.googleapis.com'; img-src 'self'; script-src 'self'",
    //                 },
    //                 {
    //                     key: 'X-Frame-Options',
    //                     value: 'DENY',
    //                 },
    //                 {
    //                     key: 'X-Content-Type-Options',
    //                     value: 'nosniff',
    //                 },
    //                 {
    //                     key: 'Referrer-Policy',
    //                     value: 'origin-when-cross-origin',
    //                 },
    //                 {
    //                     key: 'Permissions-Policy',
    //                     value: "camera='none'; battery=(self); geolocation=(self); microphone='none'",
    //                 },
    //                 {
    //                     key: 'Strict-Transport-Security',
    //                     value: 'max-age=31536000; includeSubDomains; preload',
    //                 },
    //                 {
    //                     key: 'X-Content-Security-Policy',
    //                     value: "default-src 'self'",
    //                 },
    //                 {
    //                     key: 'X-Permitted-Cross-Domain-Policies',
    //                     value: 'none',
    //                 },
    //                 {
    //                     key: 'X-XSS-Protection',
    //                     value: '1',
    //                 },
    //                 //! Add more headers if needed
    //             ],
    //         },
    //     ];
    // },
};

module.exports = nextConfig;
