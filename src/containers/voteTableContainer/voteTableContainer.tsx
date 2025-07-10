// istanbul ignore file
import { FC, Suspense } from 'react'
import {
    Pagination,
    Skeleton,
    Table,
    TableCell,
    TableRow,
    VoteTableProps,
} from '@/components'
import VoteTableLoader from './voteTableLoader'

export interface Props extends Omit<VoteTableProps, 'footer' | 'votes'> {
    limit: {
        length: number
        offset?: number
    }
    pagination?: boolean
}

const VoteTableContainer: FC<Props> = props => (
    <Suspense
        key={JSON.stringify(props.limit)}
        fallback={
            <Table
                className={props.className}
                footer={
                    props.pagination ? (
                        <Pagination page={0} totalPages={0} />
                    ) : undefined
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
                    {Array.from({ length: props.limit.length }).map((_, i) => (
                        <TableRow key={i}>
                            <TableCell className="h-15">
                                <Skeleton className="h-9" />
                            </TableCell>
                        </TableRow>
                    ))}
                </tbody>
            </Table>
        }
    >
        <VoteTableLoader {...props} />
    </Suspense>
)

export default VoteTableContainer
