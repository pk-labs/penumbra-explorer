'use client'

import { Box } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { FC, MouseEvent, useCallback } from 'react'
import { TransformedPartialBlockFragment } from '@/lib/types'
import { formatNumber } from '@/lib/utils'
import { Table, TableProps } from '../table'
import styles from './blockTable.module.css'

interface Props extends Pick<TableProps, 'actions' | 'footer' | 'title'> {
    blocks?: TransformedPartialBlockFragment[]
    proposer?: boolean
}

const BlockTable: FC<Props> = props => {
    const router = useRouter()

    const onRowClick = useCallback(
        (e: MouseEvent<HTMLTableRowElement>) => {
            if ((e.target as HTMLElement).tagName !== 'A') {
                router.push(`/block/${e.currentTarget.dataset.blockHeight}`)
            }
        },
        [router]
    )

    return (
        <Table
            actions={props.actions}
            className={styles.root}
            footer={props.footer}
            title={props.title}
        >
            <thead>
                <tr>
                    <th>Block height</th>
                    <th>Time</th>
                    {props.proposer && <th>Proposer</th>}
                    <th>Txs</th>
                </tr>
            </thead>
            <tbody>
                {props.blocks?.length ? (
                    props.blocks.map(block => (
                        <tr
                            key={block.height}
                            data-block-height={block.height}
                            onClick={onRowClick}
                        >
                            <td>
                                <Box color="var(--textSecondary)" size={16} />
                                <Link href={`/block/${block.height}`}>
                                    {formatNumber(block.height)}
                                </Link>
                            </td>
                            <td>{block.timeAgo}</td>
                            {props.proposer && <td>-</td>}
                            <td>{block.transactionsCount}</td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan={props.proposer ? 4 : 3} />
                    </tr>
                )}
            </tbody>
        </Table>
    )
}

export default BlockTable
