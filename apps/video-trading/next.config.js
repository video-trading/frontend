/** @type {import('next').NextConfig} */
const withTM = require("next-transpile-modules")(["client", "utils"]);

const nextConfig = withTM({
  reactStrictMode: true,
  swcMinify: true,
})

module.exports = nextConfig
