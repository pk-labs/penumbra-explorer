import { Box } from 'lucide-react'
import Link from 'next/link'
import { FC } from 'react'
import { TransformedPartialBlockFragment } from '@/lib/types'
import { formatNumber } from '@/lib/utils'
import { Table, TableProps, TableRow } from '../table'
import styles from './blockTable.module.css'

interface Props extends Pick<TableProps, 'actions' | 'footer' | 'title'> {
    blocks?: TransformedPartialBlockFragment[]
    proposer?: boolean
}

const BlockTable: FC<Props> = props => (
    <Table
        actions={props.actions}
        className={styles.root}
        footer={props.footer}
        title={props.title}
    >
        <thead>
            <TableRow>
                <th>Block height</th>
                <th>Time</th>
                {props.proposer && <th>Proposer</th>}
                <th>Txs</th>
            </TableRow>
        </thead>
        <tbody>
            {props.blocks?.length ? (
                props.blocks.map(block => (
                    <TableRow
                        key={block.height}
                        className={styles.clickableRow}
                        href={`/block/${block.height}`}
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
                    </TableRow>
                ))
            ) : (
                <TableRow>
                    <td colSpan={props.proposer ? 4 : 3} />
                </TableRow>
            )}
        </tbody>
    </Table>
)

export default BlockTable
