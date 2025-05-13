'use client'

import { BoxIcon } from 'lucide-react'
import Link from 'next/link'
import { FC, useEffect, useRef } from 'react'
import { TransformedPartialBlockFragment } from '@/lib/types'
import { formatNumber } from '@/lib/utils'
import TimeAgo from '../../timeAgo'
import { Table, TableCell, TableProps, TableRow } from '../table'

export interface Props extends Omit<TableProps, 'children'> {
    blocks?: TransformedPartialBlockFragment[]
    proposer?: boolean
    updateTimeAgo?: boolean
}

const BlockTable: FC<Props> = props => {
    const prevBlocksRef = useRef<typeof props.blocks>(undefined)

    useEffect(() => {
        prevBlocksRef.current = props.blocks
    }, [props.blocks])

    return (
        <Table
            className={props.className}
            footer={props.footer}
            header={props.header}
        >
            <thead>
                <TableRow>
                    <TableCell header>Block height</TableCell>
                    <TableCell header>Time</TableCell>
                    {props.proposer && <TableCell header>Proposer</TableCell>}
                    <TableCell header>Txs</TableCell>
                </TableRow>
            </thead>
            <tbody>
                {props.blocks?.length ? (
                    props.blocks.map(block => (
                        <TableRow
                            key={block.height}
                            className={
                                typeof prevBlocksRef.current !== 'undefined' &&
                                !prevBlocksRef.current.some(
                                    prevBlock =>
                                        prevBlock.height === block.height
                                )
                                    ? 'animate-new-data-bg'
                                    : undefined
                            }
                            href={`/block/${block.height}`}
                        >
                            <TableCell>
                                <BoxIcon
                                    className="inline"
                                    color="var(--color-text-secondary)"
                                    size={16}
                                />
                                <Link href={`/block/${block.height}`}>
                                    {formatNumber(block.height)}
                                </Link>
                            </TableCell>
                            <TableCell>
                                <TimeAgo
                                    initialTimeAgo={block.initialTimeAgo}
                                    timestamp={block.timestamp}
                                    update={props.updateTimeAgo}
                                />
                            </TableCell>
                            {props.proposer && <TableCell>-</TableCell>}
                            <TableCell>{block.transactionsCount}</TableCell>
                        </TableRow>
                    ))
                ) : (
                    <TableRow>
                        <TableCell colSpan={props.proposer ? 4 : 3} />
                    </TableRow>
                )}
            </tbody>
        </Table>
    )
}

export default BlockTable
