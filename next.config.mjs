/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "de9todata.blob.core.windows.net",
      },
    ],
  },
};

export default nextConfig;
