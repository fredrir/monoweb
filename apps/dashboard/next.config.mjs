/**
 * @type {import('next').NextConfig}
 */
const config = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["cdn.sanity.io"],
  },
  experimental: {
    appDir: true,
  },
  transpilePackages: ["@dotkomonline/ui", "@dotkomonline/auth", "@dotkomonline/types", "@dotkomonline/api"],
  eslint: {
    ignoreDuringBuilds: !!process.env.CI,
  },
}

export default config