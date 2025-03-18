// istanbul ignore file
'use client'

import '@/lib/css'
import { FC } from 'react'
import { twMerge } from 'tailwind-merge'
import { ErrorPage, NavigationBar } from '@/components'
import { background } from '@/lib/images'

const NotFoundPage: FC = () => (
    <html className="overflow-x-hidden" lang="en">
        <body
            className={twMerge(
                'relative flex flex-col justify-start gap-10',
                'overflow-x-hidden pb-4 md:pb-8'
            )}
        >
            <NavigationBar />
            <ErrorPage message="Internal server error" statusCode={500} />
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

export default NotFoundPage
