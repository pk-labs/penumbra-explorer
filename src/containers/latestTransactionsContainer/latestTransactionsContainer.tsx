// istanbul ignore file
import { FC, Suspense } from 'react'
import {
    Button,
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
}

// TODO: Refactor into generic transactionTableContainer with configurable
// header, pagination, query variables and real-time updates.
const LatestTransactionsContainer: FC<Props> = props => {
    const header = (
        <div className="flex items-center justify-between">
            <h2 className="text-2xl font-medium">Latest transactions</h2>
            <Button density="compact" href="/txs">
                View all
            </Button>
        </div>
    )

    return (
        <Suspense
            key={props.limit}
            fallback={
                <Table header={header} {...props}>
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
            <LatestTransactionsLoader header={header} {...props} />
        </Suspense>
    )
}

export default LatestTransactionsContainer
