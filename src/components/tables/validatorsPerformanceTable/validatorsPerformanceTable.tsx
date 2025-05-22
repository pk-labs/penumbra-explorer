import { FC } from 'react'
import EmptyState from '../../emptyState'
import { Table, TableCell, TableProps, TableRow } from '../table'

export interface Props extends Omit<TableProps, 'children'> {
    validators: any[]
}

const ValidatorsPerformanceTable: FC<Props> = ({ validators, ...props }) => (
    <Table {...props}>
        <thead>
            <TableRow>
                <TableCell header>Name</TableCell>
                <TableCell header>Status</TableCell>
                <TableCell header>Voting power</TableCell>
                <TableCell header>Uptime %</TableCell>
                <TableCell header>Active since</TableCell>
                <TableCell header>Commission</TableCell>
            </TableRow>
        </thead>
        <tbody>
            {validators.length ? (
                validators.map((validator, i) => (
                    <TableRow key={i} href={`/validators/${validator.hash}`}>
                        <TableCell>{validator.hash}</TableCell>
                        <TableCell>{validator.status}</TableCell>
                        <TableCell>{validator.votingPower}</TableCell>
                        <TableCell>{validator.uptime}</TableCell>
                        <TableCell>{validator.activeSince}</TableCell>
                        <TableCell>{validator.commission}</TableCell>
                    </TableRow>
                ))
            ) : (
                <TableRow>
                    <TableCell colSpan={6}>
                        <EmptyState>No validators found</EmptyState>
                    </TableCell>
                </TableRow>
            )}
        </tbody>
    </Table>
)

export default ValidatorsPerformanceTable
