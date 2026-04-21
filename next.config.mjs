/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true, // Optional: might want to refine this later for Next Image optimization with WP
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // We will restrict this to the WP domain when it is decided
      },
    ],
  },
}

export default nextConfig
