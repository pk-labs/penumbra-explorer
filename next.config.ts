import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
    headers: async () => [
        {
            headers: [
                // Disable nginx buffering in Cloudflare to fix server events
                {
                    key: 'X-Accel-Buffering',
                    value: 'no',
                },
            ],
            source: '/:path*',
        },
    ],
    poweredByHeader: false,
    webpack: config => {
        config.module.rules.push({
            exclude: /node_modules/,
            loader: 'graphql-tag/loader',
            test: /\.graphql$/,
        })

        return config
    },
}

export default nextConfig
