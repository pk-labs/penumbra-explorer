/* istanbul ignore file */
import { Poppins, Work_Sans } from 'next/font/google'
import localFont from 'next/font/local'

// @ts-expect-error: Font loaders must be called and assigned to a const in the module scope
const _fontPrimary = Poppins({
    display: 'swap',
    style: 'normal',
    subsets: ['latin'],
    weight: ['400', '500'],
})

// @ts-expect-error: Font loaders must be called and assigned to a const in the module scope
const _fontSecondary = Work_Sans({
    display: 'swap',
    style: 'normal',
    subsets: ['latin'],
    weight: ['400', '500'],
})

// @ts-expect-error: Font loaders must be called and assigned to a const in the module scope
const _fontMono = localFont({
    display: 'swap',
    src: [
        { path: './iosevka-regular.woff2', weight: '400' },
        { path: './iosevka-medium.woff2', weight: '500' },
    ],
    style: 'normal',
})
