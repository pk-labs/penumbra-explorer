import { FC } from 'react'
import EmptyState from '../../emptyState'
import { Table, TableCell, TableRow } from '../table'

export interface Props {
    className?: string
}

const IbcTable: FC<Props> = props => (
    <Table className={props.className}>
        <thead>
            <TableRow>
                <TableCell header>Name</TableCell>
                <TableCell header>Client status</TableCell>
                <TableCell header>
                    Volume shielded
                    <br />
                    <span className="text-xs font-normal">Txs shielded</span>
                </TableCell>
                <TableCell header>
                    Volume unshielded
                    <br />
                    <span className="text-xs font-normal">Txs unshielded</span>
                </TableCell>
                <TableCell header>
                    Volume total
                    <br />
                    <span className="text-xs font-normal">Txs total</span>
                </TableCell>
                <TableCell header>
                    Txs pending
                    <br />
                    <span className="text-xs font-normal">Txs expired</span>
                </TableCell>
            </TableRow>
        </thead>
        <tbody>
            <TableRow>
                <TableCell colSpan={6}>
                    <EmptyState>No chains configured</EmptyState>
                </TableCell>
            </TableRow>
        </tbody>
    </Table>
)

export default IbcTable
