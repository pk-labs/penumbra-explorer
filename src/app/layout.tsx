/* istanbul ignore file */
import '../lib/css/main.css'
import type { Metadata } from 'next'
import { Poppins, Work_Sans } from 'next/font/google'
import localFont from 'next/font/local'
import { FC, ReactNode } from 'react'
import { NavigationBar } from '../components'
import { rootTitle } from '../lib/constants'
import background from '../lib/images/background.svg'
import styles from './layout.module.css'

// @ts-expect-error: Font loaders must be called and assigned to a const in the module scope
const _fontPrimary = Poppins({
    subsets: ['latin'],
    weight: ['400', '500'],
    style: 'normal',
    display: 'swap',
})

// @ts-expect-error: Font loaders must be called and assigned to a const in the module scope
const _fontSecondary = Work_Sans({
    subsets: ['latin'],
    weight: ['400', '500'],
    style: 'normal',
    display: 'swap',
})

// @ts-expect-error: Font loaders must be called and assigned to a const in the module scope
const _fontMono = localFont({
    src: [
        { path: '../lib/fonts/iosevka-regular.woff2', weight: '400' },
        { path: '../lib/fonts/iosevka-medium.woff2', weight: '500' },
    ],
    style: 'normal',
    display: 'swap',
})

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
