import type { NextConfig } from 'next';
import createMDX from '@next/mdx';

const nextConfig: NextConfig = {
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  images: {
    remotePatterns: [
      {
        hostname: 'picsum.photos',
      },
      {
        hostname: 'images.unsplash.com',
      },
      {
        hostname: 'prod-files-secure.s3.us-west-2.amazonaws.com',
      },
    ],
  },
};

const withMDX = createMDX({
  options: {
    // @ts-expect-error - remark-gfm 타입 충돌 문제해결
    remarkPlugins: [['remark-gfm']],
  },
});

export default withMDX(nextConfig);
