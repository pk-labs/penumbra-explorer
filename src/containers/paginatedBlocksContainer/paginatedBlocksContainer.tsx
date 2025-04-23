// istanbul ignore file
import { FC, Suspense } from 'react'
import { Pagination, Skeleton, Table, TableCell, TableRow } from '@/components'
import PaginatedBlocksLoader, { Props } from './paginatedBlocksLoader'

const PaginatedBlocksContainer: FC<Props> = props => (
    <Suspense
        key={JSON.stringify({
            length: props.length,
            offset: props.offset,
            pathname: props.pathname,
        })}
        fallback={
            <Table
                className={props.className}
                footer={
                    <Pagination
                        page={0}
                        pathname={props.pathname}
                        totalPages={0}
                    />
                }
                header={props.header}
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
        <PaginatedBlocksLoader {...props} />
    </Suspense>
)

export default PaginatedBlocksContainer
