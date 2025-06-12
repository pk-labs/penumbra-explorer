// istanbul ignore file
import { FC, Suspense } from 'react'
import {
    Pagination,
    Skeleton,
    Table,
    TableCell,
    TableRow,
    TransactionTableProps,
} from '@/components'
import PaginatedTransactionsLoader from './paginatedTransactionsLoader'

export interface Props
    extends Omit<TransactionTableProps, 'footer' | 'transactions'> {
    clientId?: string
    length: number
    offset: number
}

// TODO: Refactor into generic transactionTableContainer with configurable
// header, pagination, query variables and real-time updates.
const PaginatedTransactionsContainer: FC<Props> = props => (
    <Suspense
        key={JSON.stringify({
            length: props.length,
            offset: props.offset,
        })}
        fallback={
            <Table footer={<Pagination page={0} totalPages={0} />} {...props}>
                <thead>
                    <TableRow>
                        <TableCell header>
                            <Skeleton className="h-6" />
                        </TableCell>
                    </TableRow>
                </thead>
                <tbody>
                    {Array.from({ length: props.length }).map((_, i) => (
                        <TableRow key={i}>
                            <TableCell>
                                <Skeleton className="h-6" />
                            </TableCell>
                        </TableRow>
                    ))}
                </tbody>
            </Table>
        }
    >
        <PaginatedTransactionsLoader {...props} />
    </Suspense>
)

export default PaginatedTransactionsContainer
