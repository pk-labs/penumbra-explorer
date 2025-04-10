import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
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
