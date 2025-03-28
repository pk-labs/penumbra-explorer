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
        'text-text-primary! flex gap-1 px-2 py-1.5 break-all'
    )

    return (
        <li
            className={twMerge(
                'transition-background rounded-sm duration-200',
                'ease-(--fastOutSlowIn) hover:bg-(--hoverGreen)'
            )}
        >
            {typeof props.heightOrHash === 'number' ? (
                <Link
                    className={linkClassName}
                    href={`/block/${props.heightOrHash}`}
                >
                    <BoxIcon
                        className="min-w-4"
                        color="var(--color-text-secondary)"
                        size={16}
                    />
                    {formatNumber(props.heightOrHash)}
                </Link>
            ) : (
                <Link
                    className={linkClassName}
                    href={`/tx/${props.heightOrHash}`}
                >
                    <CheckCheckIcon
                        className="min-w-4"
                        color="var(--secondaryLight)"
                        size={16}
                    />
                    {props.heightOrHash}
                </Link>
            )}
        </li>
    )
}

export default SearchResult
