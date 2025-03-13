'use client'

import clsx from 'clsx'
import { Box, CheckCheck } from 'lucide-react'
import Link from 'next/link'
import { FC } from 'react'
import { formatNumber } from '@/lib/utils'

export interface Props {
    heightOrHash: number | string
}

const SearchResult: FC<Props> = props => (
    <li
        className={clsx(
            'transition-bg duration-200 ease-(--fastOutSlowIn)',
            'not-last:border-b-1 not-last:border-b-(--surfaceLighter)',
            'hover:bg-(--surface)'
        )}
    >
        {typeof props.heightOrHash === 'number' ? (
            <Link
                className="flex h-8 items-center gap-1 py-2 text-(--text)!"
                href={`/block/${props.heightOrHash}`}
            >
                <Box color="var(--textSecondary)" size={16} />
                {formatNumber(props.heightOrHash)}
            </Link>
        ) : (
            <Link
                className="flex h-8 items-center gap-1 py-2 text-(--text)!"
                href={`/tx/${props.heightOrHash}`}
            >
                <CheckCheck color="var(--secondaryLight)" size={16} />
                {props.heightOrHash}
            </Link>
        )}
    </li>
)

export default SearchResult
