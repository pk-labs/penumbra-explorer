// istanbul ignore file
import { FC, Suspense } from 'react'
import {
    Skeleton,
    Table,
    TableCell,
    TableRow,
    TransactionTableProps,
} from '@/components'
import LatestTransactionsLoader from './latestTransactionsLoader'

export interface Props
    extends Omit<TransactionTableProps, 'footer' | 'transactions'> {
    limit: number
    // TODO: This is temporary until refactoring done
    validatorId?: string
}

// TODO: Refactor into generic transactionTableContainer with configurable
// header, pagination, query variables and real-time updates.
const LatestTransactionsContainer: FC<Props> = props => (
    <Suspense
        key={props.limit}
        fallback={
            <Table {...props}>
                <thead>
                    <TableRow>
                        <TableCell header>
                            <Skeleton className="h-6" />
                        </TableCell>
                    </TableRow>
                </thead>
                <tbody>
                    {Array.from({ length: props.limit }).map((_, i) => (
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
        <LatestTransactionsLoader {...props} />
    </Suspense>
)

export default LatestTransactionsContainer
