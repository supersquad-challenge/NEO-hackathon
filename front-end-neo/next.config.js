/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    API_BASE_URL: process.env.API_BASE_URL,
    GOOGLE_LOGIN_URL: process.env.GOOGLE_LOGIN_URL,
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/home/onApplication",
        permanent: false,
      },
      {
        source: "/home",
        destination: "/home/onApplication",
        permanent: false,
      },
      {
        source: "/myChallenges",
        destination: "/myChallenges/onApplication",
        permanent: false,
      },
    ];
  },
};

module.exports = nextConfig;
