// istanbul ignore file
'use client'

import { usePathname, useSearchParams } from 'next/navigation'
import { FC } from 'react'
import { classNames, formatNumber } from '@/lib/utils'
import Button from '../button'
import Skeleton from '../skeleton'

interface Props {
    className?: string
    page: number
    totalPages: number
}

const Pagination: FC<Props> = props => {
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const prevSearchParams = new URLSearchParams(searchParams)
    const nextSearchParams = new URLSearchParams(searchParams)

    if (props.page > 2) {
        prevSearchParams.set('page', String(props.page - 1))
    } else {
        prevSearchParams.delete('page')
    }

    if (props.page < props.totalPages) {
        nextSearchParams.set('page', String(props.page + 1))
    } else {
        nextSearchParams.set('page', String(props.totalPages))
    }

    return (
        <div
            className={classNames(
                'flex items-center justify-center gap-6',
                props.className
            )}
        >
            <Button
                className="font-normal"
                density="compact"
                disabled={props.page <= 1}
                href={`${pathname}${prevSearchParams.size ? `?${prevSearchParams}` : ''}`}
                scroll={false}
            >
                Prev
            </Button>
            {props.page === 0 && props.totalPages === 0 ? (
                <Skeleton className="h-8 w-24" />
            ) : (
                <span className="text-sm">
                    {formatNumber(props.page)} of{' '}
                    {formatNumber(props.totalPages || 1)}
                </span>
            )}
            <Button
                className="font-normal"
                density="compact"
                disabled={props.page >= props.totalPages}
                href={`${pathname}${nextSearchParams.size ? `?${nextSearchParams}` : ''}`}
                scroll={false}
            >
                Next
            </Button>
        </div>
    )
}

export default Pagination
