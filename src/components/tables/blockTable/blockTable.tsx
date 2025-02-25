'use client'

import { Box } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { FC, MouseEvent, useCallback } from 'react'
import { dateFormatFull } from '@/lib/constants'
import dayjs from '@/lib/dayjs'
import { PartialBlockFragment } from '@/lib/graphql/generated/types'
import { formatNumber } from '@/lib/utils'
import { Table, TableProps } from '../table'
import styles from './blockTable.module.css'

interface Props extends Pick<TableProps, 'actions' | 'title'> {
    blocks?: PartialBlockFragment[]
    proposer?: boolean
}

const BlockTable: FC<Props> = props => {
    const router = useRouter()

    const onRowClick = useCallback(
        (e: MouseEvent<HTMLTableRowElement>) => {
            router.push(`/block/${e.currentTarget.dataset.blockHeight}`)
        },
        [router]
    )

    // const now = dayjs().tz(timezone)

    return (
        <Table
            actions={props.actions}
            className={styles.root}
            title={props.title}
            section
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
                                <span>{formatNumber(block.height)}</span>
                            </td>
                            {/*<td>{now.to(dayjs(block.createdAt))}</td>*/}
                            <td>
                                {dayjs(block.createdAt).format(dateFormatFull)}
                            </td>
                            {props.proposer && <td>-</td>}
                            <td>{block.transactions.length}</td>
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
