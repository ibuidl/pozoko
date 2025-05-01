/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/client/explore',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
