// istanbul ignore file
import { FC, Suspense } from 'react'
import { Pagination, Skeleton, Table, TableCell, TableRow } from '@/components'
import PaginatedTransactionsLoader, {
    Props,
} from './paginatedTransactionsLoader'

const PaginatedTransactionsContainer: FC<Props> = props => (
    <Suspense
        key={JSON.stringify({
            from: props.from,
            limit: props.limit,
            pathname: props.pathname,
        })}
        fallback={
            <Table
                actions={props.actions}
                className={props.className}
                footer={<Pagination pathname={props.pathname} />}
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
        <PaginatedTransactionsLoader {...props} />
    </Suspense>
)

export default PaginatedTransactionsContainer
