/** @todo merge with next.config.mjs */
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    /** @deprecated domains deprecated since Next.js 14 {@link https://nextjs.org/docs/14/app/api-reference/components/image#domains}  */
    domains: ['images.unsplash.com'],
    remotePatterns: [
      {
        hostname: '**.mypinata.cloud',
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${process.env.NEXT_PUBLIC_API_URL}/api/:path*`,
      },
    ];
  },
};

module.exports = nextConfig;
