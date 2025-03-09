// istanbul ignore file
import '@/lib/css'
import '@/lib/fonts'
import { Metadata } from 'next'
import { FC, ReactNode } from 'react'
import { NavigationBar } from '@/components'
import { rootTitle } from '@/lib/constants'
import { getUmPrice } from '@/lib/data'
import { background } from '@/lib/images'
import styles from './layout.module.css'

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
    // TODO: Cache and revalidate
    const umPrice = await getUmPrice()

    return (
        <html lang="en">
            <body className={styles.body}>
                <NavigationBar umPrice={umPrice} />
                {props.children}
                <div
                    className={styles.background}
                    style={{ backgroundImage: `url(${background.src})` }}
                />
            </body>
        </html>
    )
}

// Disable all caching for now
export const dynamic = 'force-dynamic'

export default RootLayout
