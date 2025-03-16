// istanbul ignore file
import '@/lib/css'
import '@/lib/fonts'
import { Metadata } from 'next'
import { FC, ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'
import { NavigationBar } from '@/components'
import { rootTitle } from '@/lib/constants'
import { getUmPrice } from '@/lib/data'
import { background } from '@/lib/images'

export const metadata: Metadata = {
    icons: [
        {
            rel: 'icon',
            sizes: '32x32',
            url: '/favicon.ico',
        },
    ],
    title: rootTitle,
}

interface Props {
    children: ReactNode
}

const RootLayout: FC<Props> = async props => {
    const umPrice = await getUmPrice()

    return (
        <html className="overflow-x-hidden" lang="en">
            <body
                className={twMerge(
                    'relative flex flex-col justify-start gap-10',
                    'overflow-x-hidden pb-4 md:pb-8'
                )}
            >
                <NavigationBar umPrice={umPrice} />
                {props.children}
                <div
                    className={twMerge(
                        'animate-bg pointer-events-none absolute',
                        '-top-[1486.8px] left-[calc(50%-900px)] -z-1',
                        'h-[1858.5px] w-[1800px] bg-cover'
                    )}
                    style={{ backgroundImage: `url(${background.src})` }}
                />
            </body>
        </html>
    )
}

// Disable all caching for now
export const dynamic = 'force-dynamic'

export default RootLayout
