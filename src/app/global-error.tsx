// istanbul ignore file
'use client'

import '@/lib/css'
import { FC } from 'react'
import { Background, ErrorPage, NavigationBar } from '@/components'
import { classNames } from '@/lib/utils'

const NotFoundPage: FC = () => (
    <html className="overflow-x-hidden" lang="en">
        <body
            className={classNames(
                'relative flex flex-col justify-start gap-10',
                'overflow-x-hidden pb-4 md:pb-8'
            )}
        >
            <NavigationBar />
            <ErrorPage message="Internal server error" statusCode={500} />
            <Background
                className={classNames(
                    'animate-bg pointer-events-none absolute',
                    '-top-[1486.8px] left-[calc(50%-900px)] -z-1',
                    'h-[1858.5px] w-[1800px]'
                )}
            />
        </body>
    </html>
)

export default NotFoundPage
