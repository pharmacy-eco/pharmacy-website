/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.nhathuoclongchau.com.vn"
      },
      {
        protocol: "https",
        hostname: "production-cdn.pharmacity.io"
      },
      {
        protocol: "https",
        hostname: "example.com"
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com"
      },
      {
        protocol: "https",
        hostname: "sgn09.fptcloud.com"
      },
      {
        protocol: "https",
        hostname: "cms-prod.s3-sgn09.fptcloud.com"
      }
    ]
  }
};

export default nextConfig;
