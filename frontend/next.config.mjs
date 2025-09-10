/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost'],
    dangerouslyAllowSVG: true,
  },
  experimental: {
    serverComponentsExternalPackages: [],
  },
}

export default nextConfig