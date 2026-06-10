/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      // Placeholder image source used by the mock data layer.
      { protocol: "https", hostname: "picsum.photos" },
      // Common headless WordPress media hosts (uncomment / edit when wiring WP):
      { protocol: "https", hostname: "images.unsplash.com" },
      // { protocol: "https", hostname: "randomuser.me" },
      // { protocol: "https", hostname: "your-wordpress-domain.com" },
      // { protocol: "https", hostname: "*.wp.com" },
    ],
  },
};

export default nextConfig;
