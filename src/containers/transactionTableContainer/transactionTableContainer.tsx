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
import { TransactionFilter } from '@/lib/graphql/generated/types'
import TransactionTableLoader from './transactionTableLoader'

export interface Props
    extends Omit<TransactionTableProps, 'footer' | 'transactions'> {
    filter?: TransactionFilter
    limit: {
        length: number
        offset: number
    }
    pagination?: boolean
    subscription?: boolean
}

const TransactionTableContainer: FC<Props> = props => (
    <Suspense
        key={JSON.stringify({
            filter: props.filter,
            limit: props.limit,
        })}
        fallback={
            <Table
                footer={
                    props.pagination ? (
                        <Pagination page={0} totalPages={0} />
                    ) : undefined
                }
                {...props}
            >
                <thead>
                    <TableRow>
                        <TableCell header>
                            <Skeleton className="h-6" />
                        </TableCell>
                    </TableRow>
                </thead>
                <tbody>
                    {Array.from({ length: props.limit.length }).map((_, i) => (
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
        <TransactionTableLoader {...props} />
    </Suspense>
)

export default TransactionTableContainer
