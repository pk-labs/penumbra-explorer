import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
    poweredByHeader: false,
    webpack: config => {
        config.module.rules.push({
            test: /\.graphql$/,
            loader: 'graphql-tag/loader',
            exclude: /node_modules/,
        })

        return config
    },
}

export default nextConfig
