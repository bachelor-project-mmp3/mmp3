export { default } from 'next-auth/middleware';

export const config = {
    matcher: [
        '/events',
        '/events/:path*',
        '/profile/:path*',
        '/my-events',
        '/requests',
    ],
};
