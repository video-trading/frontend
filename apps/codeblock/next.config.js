const { redirect } = require("next/dist/server/api-utils");

/** @type {import('next').NextConfig} */
const withTM = require("next-transpile-modules")(["codevis"]);

const nextConfig = withTM({
  reactStrictMode: true,
  swcMinify: true,
});

module.exports = nextConfig;
