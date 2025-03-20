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
        ],
        domains: [
            'www.notion.so',
            'notion.so',
            'images.unsplash.com',
            'pbs.twimg.com'
        ],
        formats: ['image/avif', 'image/webp']
    },
};

export default nextConfig;