'use client'

import clsx from 'clsx'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { FC, useCallback } from 'react'
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
    const router = useRouter()

    const onPrev = useCallback(() => {
        if (!props.fromPrev) {
            return
        }

        const params = new URLSearchParams(searchParams)
        params.set('from', props.fromPrev)

        router.push(`${pathname}?${params}`)
    }, [pathname, props.fromPrev, router, searchParams])

    const onNext = useCallback(() => {
        if (!props.fromNext) {
            return
        }

        const params = new URLSearchParams(searchParams)
        params.set('from', props.fromNext)

        router.push(`${pathname}?${params}`)
    }, [pathname, props.fromNext, router, searchParams])

    return (
        <div className={clsx(styles.root, props.className)}>
            <Button
                className={styles.button}
                disabled={!props.fromPrev}
                onClick={onPrev}
            >
                Prev
            </Button>
            <Button
                className={styles.button}
                disabled={!props.fromNext}
                onClick={onNext}
            >
                Next
            </Button>
        </div>
    )
}

export default Pagination
