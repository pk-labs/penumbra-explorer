'use client'

import { usePathname, useSearchParams } from 'next/navigation'
import { FC } from 'react'
import { twMerge } from 'tailwind-merge'
import Button from '../button'

interface Props {
    className?: string
    fromNext?: string
    fromPrev?: string
}

const Pagination: FC<Props> = props => {
    const pathname = usePathname()
    const searchParams = useSearchParams()
    let prevHref: string | undefined
    let nextHref: string | undefined

    if (props.fromPrev) {
        const params = new URLSearchParams(searchParams)
        params.set('from', props.fromPrev)
        prevHref = `${pathname}?${params}`
    }

    if (props.fromNext) {
        const params = new URLSearchParams(searchParams)
        params.set('from', props.fromNext)
        nextHref = `${pathname}?${params}`
    }

    return (
        <div
            className={twMerge(
                'flex items-center justify-center gap-6',
                props.className
            )}
        >
            <Button
                className="font-normal"
                disabled={!props.fromPrev}
                href={prevHref}
            >
                Prev
            </Button>
            <Button
                className="font-normal"
                disabled={!props.fromNext}
                href={nextHref}
            >
                Next
            </Button>
        </div>
    )
}

export default Pagination
