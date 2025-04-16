import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
    poweredByHeader: false,
    webpack: config => {
        const rules = config.module.rules
            .find((rule: any) => typeof rule.oneOf === 'object')
            .oneOf.filter((rule: any) => Array.isArray(rule.use))

        rules.forEach((rule: any) => {
            rule.use.forEach((moduleLoader: any) => {
                // Export kebab case foo-bar CSS classes as camel case fooBar
                if (
                    moduleLoader.loader?.includes('css-loader') &&
                    !moduleLoader.loader?.includes('postcss-loader') &&
                    moduleLoader.options?.modules
                ) {
                    if (typeof moduleLoader.options.modules === 'object') {
                        moduleLoader.options.modules.exportLocalsConvention =
                            'camelCase'
                    } else if (moduleLoader.options.modules === true) {
                        moduleLoader.options.modules = {
                            exportLocalsConvention: 'camelCase',
                        }
                    }
                }
            })
        })

        config.module.rules.push({
            exclude: /node_modules/,
            loader: 'graphql-tag/loader',
            test: /\.graphql$/,
        })

        return config
    },
}

export default nextConfig
