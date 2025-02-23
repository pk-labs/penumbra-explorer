'use client'

import { Box } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { FC, MouseEvent, useCallback } from 'react'
import { dateFormatFull } from '@/lib/constants'
import dayjs from '@/lib/dayjs'
import { BlockFragment } from '@/lib/graphql/generated/types'
import { formatNumber } from '@/lib/utils'
import { Table, TableProps } from '../table'
import styles from './blockTable.module.css'

interface Props extends Pick<TableProps, 'actions' | 'title'> {
    blocks?: BlockFragment[]
    proposer?: boolean
}

const BlockTable: FC<Props> = props => {
    const router = useRouter()

    const onRowClick = useCallback(
        (e: MouseEvent<HTMLTableRowElement>) => {
            router.push(`/blocks/${e.currentTarget.dataset.blockId}`)
        },
        [router]
    )

    // const now = dayjs().tz(timezone)

    return (
        <Table
            actions={props.actions}
            className={styles.root}
            title={props.title}
            alignLastRight
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
            {Boolean(props.blocks?.length) && (
                <tbody>
                    {props.blocks?.map(block => (
                        <tr
                            key={block.height}
                            data-block-id={block.height}
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
                            <td>-</td>
                        </tr>
                    ))}
                </tbody>
            )}
        </Table>
    )
}

export default BlockTable
