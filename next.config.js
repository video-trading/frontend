const nextTranslate = require("next-translate-plugin");

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
};

module.exports = nextTranslate(nextConfig);
