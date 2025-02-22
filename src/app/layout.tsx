/* istanbul ignore file */
import '@/lib/css'
import '@/lib/fonts'
import type { Metadata } from 'next'
import { FC, ReactNode } from 'react'
import { NavigationBar } from '@/components'
import { rootTitle } from '@/lib/constants'
import { background } from '@/lib/images'
import styles from './layout.module.css'

export const metadata: Metadata = {
    title: rootTitle,
    icons: [
        {
            url: '/favicon.ico',
            rel: 'icon',
            sizes: '32x32',
        },
    ],
}

interface Props {
    children: ReactNode
}

const RootLayout: FC<Props> = async props => (
    <html lang="en">
        <body className={styles.body}>
            <NavigationBar />
            {props.children}
            <div
                className={styles.background}
                style={{ backgroundImage: `url(${background.src})` }}
            />
        </body>
    </html>
)

// Disable all caching for now
export const dynamic = 'force-dynamic'

export default RootLayout
