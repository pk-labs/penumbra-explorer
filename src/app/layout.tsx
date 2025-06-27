// istanbul ignore file
import '@/lib/css'
import '@/lib/fonts'
import { Metadata, Viewport } from 'next'
import { FC, ReactNode } from 'react'
import { Footer } from '@/components'
import { HeaderContainer, PageViewTracker } from '@/containers'
import { backgroundImage } from '@/lib/images'
import { classNames } from '@/lib/utils'

export const viewport: Viewport = {
    initialScale: 1,
    // Fixes iOS auto-zoom on focused input with less than 16 px font size
    maximumScale: 1,
    width: 'device-width',
}

export const metadata: Metadata = {
    icons: [
        {
            rel: 'icon',
            sizes: '48x48',
            url: '/favicon.ico',
        },
        {
            rel: 'icon',
            type: 'image/svg+xml',
            url: '/favicon.svg',
        },
        {
            rel: 'apple-touch-icon',
            url: '/favicon-180.png',
        },
    ],
    manifest: '/manifest.json',
    robots: {
        follow: process.env.NO_INDEX !== 'true',
        index: process.env.NO_INDEX !== 'true',
    },
}

interface Props {
    children: ReactNode
}

const RootLayout: FC<Props> = props => (
    <html className="overflow-x-hidden" lang="en">
        <body
            className={classNames(
                'scroll-area-page relative flex flex-col justify-start gap-10',
                'overflow-x-hidden'
            )}
        >
            <PageViewTracker fathomId={process.env.NEXT_PUBLIC_FATHOM_ID} />
            <HeaderContainer />
            {props.children}
            <Footer />
            <div
                className={classNames(
                    'animate-bg pointer-events-none absolute -top-[1486.8px]',
                    'left-[calc(50%-900px)] -z-1 h-[1858.5px] w-[1800px]',
                    'bg-cover'
                )}
                style={{ backgroundImage: `url(${backgroundImage.src})` }}
            />
        </body>
    </html>
)

// Disable all caching for now
export const dynamic = 'force-dynamic'

export default RootLayout
