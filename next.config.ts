import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/services/botox-treatment",
        destination: "/services/anti-wrinkle-treatment",
        permanent: true,
      },
      {
        source: "/blog/hifu-botox-aesthetic-rejuvenation",
        destination: "/blog/hifu-anti-wrinkle-aesthetic-rejuvenation",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
