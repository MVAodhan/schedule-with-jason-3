/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    loader: "custom",
    loaderFile: "./lib/images/index.js",
  },
};

module.exports = nextConfig;
