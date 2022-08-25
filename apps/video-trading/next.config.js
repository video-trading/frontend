/** @type {import('next').NextConfig} */
const withTM = require("next-transpile-modules")(["client", "utils", "codevis"]);

const nextConfig = withTM({
  reactStrictMode: true,
  swcMinify: true,
})

module.exports = nextConfig
