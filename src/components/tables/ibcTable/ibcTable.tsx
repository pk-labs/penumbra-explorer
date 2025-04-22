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
                <TableCell header>Volume shielded</TableCell>
                <TableCell header>Volume unshielded</TableCell>
                <TableCell header>Volume total</TableCell>
                <TableCell header>Txs pending</TableCell>
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
