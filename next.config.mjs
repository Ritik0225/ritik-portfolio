/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // Hosts allowed to access this dev server cross-origin (LAN IPs, tunnels, etc.).
  // Without this, Next.js 15+ blocks asset/HMR requests from non-localhost origins.
  allowedDevOrigins: ["172.100.38.36"],
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion", "@react-three/drei"],
  },
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "cdn.jsdelivr.net" },
    ],
  },
  transpilePackages: ["three"],
};

export default nextConfig;
