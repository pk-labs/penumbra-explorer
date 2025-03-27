'use client'

import { load, trackPageview } from 'fathom-client'
import { usePathname, useSearchParams } from 'next/navigation'
import { FC, useEffect } from 'react'

interface Props {
    fathomId?: string
}

const PageViewTracker: FC<Props> = props => {
    const pathname = usePathname()
    const searchParams = useSearchParams()

    useEffect(() => {
        if (props.fathomId) {
            load(props.fathomId, { auto: false })
        }
    }, [props.fathomId])

    useEffect(() => {
        if (props.fathomId) {
            const queryString = searchParams.toString()

            trackPageview({
                referrer: document.referrer,
                url: queryString ? `${pathname}?${queryString}` : pathname,
            })
        }
    }, [pathname, props.fathomId, searchParams])

    return null
}

export default PageViewTracker
