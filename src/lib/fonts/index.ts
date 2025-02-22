/* istanbul ignore file */
import { Poppins, Work_Sans } from 'next/font/google'
import localFont from 'next/font/local'

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
        { path: './iosevka-regular.woff2', weight: '400' },
        { path: './iosevka-medium.woff2', weight: '500' },
    ],
    style: 'normal',
    display: 'swap',
})
