/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: [
      "cdn.nhathuoclongchau.com.vn",
      "production-cdn.pharmacity.io",
      "example.com",
      "res.cloudinary.com",
      "sgn09.fptcloud.com"
    ]
  }
};

export default nextConfig;
