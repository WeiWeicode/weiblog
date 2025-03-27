/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'images.unsplash.com',
            },
            {
                protocol: 'https',
                hostname: 'source.unsplash.com',
            },
            {
                protocol: 'https',
                hostname: 'www.notion.so',
            },
            {
                protocol: 'https',
                hostname: 'picsum.photos',
            },
        ],
        domains: [
            'www.notion.so',
            'notion.so',
            'images.unsplash.com',
            'pbs.twimg.com',
            'picsum.photos'
        ],
        formats: ['image/avif', 'image/webp']
    },
};

export default nextConfig;