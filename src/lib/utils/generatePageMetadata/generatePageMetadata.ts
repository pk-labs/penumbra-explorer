import { Metadata } from 'next'
import { appName, canonicalBaseUrl } from '@/lib/constants'

const generatePageMetadata = (
    title: string,
    description: string,
    pathname: string
): Metadata => {
    const fullTitle = `${title} - ${appName}`

    return {
        alternates: {
            canonical: canonicalBaseUrl + pathname,
        },
        description,
        openGraph: {
            description,
            images: `${process.env.BASE_URL}/sharing-preview.png`,
            title: fullTitle,
            type: 'website',
            url: pathname,
        },
        title: fullTitle,
        twitter: {
            card: 'summary_large_image',
            description,
            images: `${process.env.BASE_URL}/sharing-preview.png`,
            title: fullTitle,
        },
    }
}

export default generatePageMetadata
