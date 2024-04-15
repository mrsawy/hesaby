/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // exclude: [/v1/],
  images: {
    domains: ["aceternity.com", `images.unsplash.com`, `tailwindui.com`],
  },
};

// module.exports = {
// };

// module.exports = {
//   images: {
//     domains: ['aceternity.com'],
//   },
// };
module.exports = nextConfig;
