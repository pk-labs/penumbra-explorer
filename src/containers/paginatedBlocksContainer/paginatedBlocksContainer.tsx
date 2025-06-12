// istanbul ignore file
import { FC, Suspense } from 'react'
import {
    BlockTableProps,
    Pagination,
    Skeleton,
    Table,
    TableCell,
    TableRow,
} from '@/components'
import PaginatedBlocksLoader from './paginatedBlocksLoader'

export interface Props extends Omit<BlockTableProps, 'blocks' | 'footer'> {
    length: number
    offset: number
}

// TODO: Refactor into generic blockTableContainer with configurable
// header, pagination, query variables and real-time updates.
const PaginatedBlocksContainer: FC<Props> = props => (
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
        <PaginatedBlocksLoader {...props} />
    </Suspense>
)

export default PaginatedBlocksContainer
