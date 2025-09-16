/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ukmtpgluhrntudjjpkgj.supabase.co',
        port: '',
        pathname: '/**',
      },
    ],
  },
}

module.exports = nextConfig
