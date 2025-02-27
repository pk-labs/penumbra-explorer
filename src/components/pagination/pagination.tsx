'use client'

import clsx from 'clsx'
import { usePathname, useSearchParams } from 'next/navigation'
import { FC } from 'react'
import Button from '../button'
import styles from './pagination.module.css'

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
        <div className={clsx(styles.root, props.className)}>
            <Button
                className={styles.button}
                disabled={!props.fromPrev}
                href={prevHref}
            >
                Prev
            </Button>
            <Button
                className={styles.button}
                disabled={!props.fromNext}
                href={nextHref}
            >
                Next
            </Button>
        </div>
    )
}

export default Pagination
