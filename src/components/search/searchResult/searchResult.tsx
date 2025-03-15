'use client'

import clsx from 'clsx'
import { Box, CheckCheck } from 'lucide-react'
import Link from 'next/link'
import { FC } from 'react'
import { formatNumber } from '@/lib/utils'

export interface Props {
    heightOrHash: number | string
}

const SearchResult: FC<Props> = props => {
    const linkClassName = clsx(
        'flex gap-1 px-2 py-1.5 break-all text-(--text)!'
    )

    return (
        <li
            className={clsx(
                'transition-background duration-200 ease-(--fastOutSlowIn)',
                'not-last:border-b-1 not-last:border-b-(--surfaceLighter)',
                'hover:bg-(--surface)'
            )}
        >
            {typeof props.heightOrHash === 'number' ? (
                <Link
                    className={linkClassName}
                    href={`/block/${props.heightOrHash}`}
                >
                    <Box
                        className="min-w-4"
                        color="var(--textSecondary)"
                        size={16}
                    />
                    {formatNumber(props.heightOrHash)}
                </Link>
            ) : (
                <Link
                    className={linkClassName}
                    href={`/tx/${props.heightOrHash}`}
                >
                    <CheckCheck
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
