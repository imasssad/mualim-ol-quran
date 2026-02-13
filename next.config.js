/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
    domains: [
      'i.ytimg.com',
      'img.youtube.com',
      'yt3.ggpht.com',
      'yt3.googleusercontent.com'
    ],
  },
}

module.exports = nextConfig
