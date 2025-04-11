// istanbul ignore file
import { FC, Suspense } from 'react'
import { Pagination, Skeleton, Table, TableCell, TableRow } from '@/components'
import TransactionTableLoader, { Props } from './transactionTableLoader'

const TransactionTableContainer: FC<Props> = props => (
    <Suspense
        key={JSON.stringify({
            limit: props.limit,
            pagination: props.pagination,
        })}
        fallback={
            <Table
                actions={props.actions}
                className={props.className}
                footer={
                    props.pagination ? (
                        <Pagination pathname={props.pagination.pathname} />
                    ) : undefined
                }
                title={props.title}
            >
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
        <TransactionTableLoader {...props} />
    </Suspense>
)

export default TransactionTableContainer
