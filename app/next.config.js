/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["darkpine-cloud-io.s3.amazonaws.com"],
  },
};

module.exports = nextConfig;
