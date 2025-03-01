import { Poppins, Work_Sans } from 'next/font/google'
import localFont from 'next/font/local'

const _fontPrimary = Poppins({
    display: 'swap',
    style: 'normal',
    subsets: ['latin'],
    weight: ['400', '500'],
})

const _fontSecondary = Work_Sans({
    display: 'swap',
    style: 'normal',
    subsets: ['latin'],
    weight: ['400', '500'],
})

const _fontMono = localFont({
    display: 'swap',
    src: [
        { path: './iosevka-regular.woff2', weight: '400' },
        { path: './iosevka-medium.woff2', weight: '500' },
    ],
    style: 'normal',
})
