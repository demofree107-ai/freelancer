const apiOrigin = process.env.API_ORIGIN || 'http://127.0.0.1:4000';
export default { devIndicators: false, skipTrailingSlashRedirect: true, async rewrites() { return [{ source: '/api/:path*', destination: `${apiOrigin}/api/:path*` }]; } };
