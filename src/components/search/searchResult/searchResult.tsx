'use client'

import { BoxIcon, CheckCheckIcon } from 'lucide-react'
import Link from 'next/link'
import { FC } from 'react'
import { twMerge } from 'tailwind-merge'
import { formatNumber } from '@/lib/utils'

export interface Props {
    heightOrHash: number | string
}

const SearchResult: FC<Props> = props => {
    const linkClassName = twMerge(
        'text-text-primary! flex gap-1 px-2 py-1 break-all'
    )

    return (
        <li
            className={twMerge(
                'transition-background rounded-sm duration-200',
                'hover:bg-action-hoverOverlay ease-(--fastOutSlowIn)'
            )}
        >
            {typeof props.heightOrHash === 'number' ? (
                <Link
                    className={linkClassName}
                    href={`/block/${props.heightOrHash}`}
                >
                    <BoxIcon className="-mt-0.5 min-w-6 p-1" />
                    {formatNumber(props.heightOrHash)}
                </Link>
            ) : (
                <Link
                    className={linkClassName}
                    href={`/tx/${props.heightOrHash}`}
                >
                    <CheckCheckIcon className="-mt-0.5 min-w-6 p-1" />
                    {props.heightOrHash}
                </Link>
            )}
        </li>
    )
}

export default SearchResult
