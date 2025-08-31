import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: '/services', destination: '/?section=services', permanent: true },
      { source: '/offers',   destination: '/?section=offers',   permanent: true },
      { source: '/pricing',  destination: '/?section=pricing',  permanent: true },
      { source: '/faq',      destination: '/?section=faq',      permanent: true },
      { source: '/contact',  destination: '/?section=contact',  permanent: true },
    ]
  },
}

export default nextConfig
