/** @type {import('next').NextConfig} */

module.exports = {
  async headers() {
    return [
      {
        source: "/api/episodes",
        headers: [
          {
            key: "Cache-Control",
            value: "no-store",
          },
        ],
      },
    ];
  },
};

const nextConfig = {
  images: {
    loader: "custom",
    loaderFile: "./lib/images/index.js",
  },
};

module.exports = nextConfig;
