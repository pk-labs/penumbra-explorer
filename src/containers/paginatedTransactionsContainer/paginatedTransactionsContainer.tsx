// istanbul ignore file
import { FC, Suspense } from 'react'
import { Pagination, Skeleton, Table, TableCell, TableRow } from '@/components'
import PaginatedTransactionsLoader, {
    Props,
} from './paginatedTransactionsLoader'

const PaginatedTransactionsContainer: FC<Props> = props => (
    <Suspense
        key={JSON.stringify({
            length: props.length,
            offset: props.offset,
            pathname: props.pathname,
        })}
        fallback={
            <Table
                actions={props.actions}
                className={props.className}
                footer={
                    <Pagination
                        page={0}
                        pathname={props.pathname}
                        totalPages={0}
                    />
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
