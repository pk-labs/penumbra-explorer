'use client'

import { Box, CheckCheck } from 'lucide-react'
import Link from 'next/link'
import { FC } from 'react'
import { formatNumber } from '@/lib/utils'
import styles from './searchResult.module.css'

export interface Props {
    heightOrHash: number | string
}

const SearchResult: FC<Props> = props => (
    <li className={styles.root}>
        {typeof props.heightOrHash === 'number' ? (
            <Link className={styles.link} href={`/block/${props.heightOrHash}`}>
                <Box color="var(--textSecondary)" size={16} />
                {formatNumber(props.heightOrHash)}
            </Link>
        ) : (
            <Link className={styles.link} href={`/tx/${props.heightOrHash}`}>
                <CheckCheck color="var(--secondaryLight)" size={16} />
                {props.heightOrHash}
            </Link>
        )}
    </li>
)

export default SearchResult
