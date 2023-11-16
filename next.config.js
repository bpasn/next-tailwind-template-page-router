const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  sassOptions: {
    includePath: [path.join(__dirname, 'styles')]
  },
  
  reactStrictMode: true,
};

module.exports = nextConfig;
