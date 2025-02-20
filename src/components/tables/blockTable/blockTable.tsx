'use client'

import { Box, Copy } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { FC, MouseEvent, ReactNode, useCallback } from 'react'
import { timezone } from '../../../lib/constants'
import dayjs from '../../../lib/dayjs'
import { BlockFragment } from '../../../lib/graphql/generated/types'
import { formatNumber } from '../../../lib/utils'
import Table from '../table'
import styles from './blockTable.module.css'

interface Props {
    actions?: ReactNode
    blocks?: BlockFragment[]
    className?: string
    proposer?: boolean
    title?: string
}

const BlockTable: FC<Props> = props => {
    const router = useRouter()

    const onRowClick = useCallback(
        (e: MouseEvent<HTMLTableRowElement>) => {
            router.push(`/blocks/${e.currentTarget.dataset.blockId}`)
        },
        [router]
    )

    const now = dayjs().tz(timezone)

    return (
        <Table
            actions={props.actions}
            className={props.className}
            title={props.title}
            alignLastRight
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
                {props.blocks?.map(block => (
                    <tr
                        key={block.height}
                        className={styles.dataRow}
                        data-block-id={block.height}
                        onClick={onRowClick}
                    >
                        <td>
                            <Box color="var(--textSecondary)" size={16} />
                            <span>{formatNumber(block.height)}</span>
                        </td>
                        <td>{now.to(dayjs(block.createdAt))}</td>
                        {props.proposer && (
                            <td>
                                <span>TODO: Proposer</span>
                                <Copy color="var(--textSecondary)" size={14} />
                            </td>
                        )}
                        <td>{block.transactionsCount}</td>
                    </tr>
                ))}
            </tbody>
        </Table>
    )
}

export default BlockTable
