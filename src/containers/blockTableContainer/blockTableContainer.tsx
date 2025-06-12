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
import { BlockFilter } from '@/lib/graphql/generated/types'
import BlockTableLoader from './blockTableLoader'

export interface Props
    extends Omit<BlockTableProps, 'blocks' | 'footer' | 'ticker'> {
    filter?: BlockFilter
    limit: {
        length: number
        offset: number
    }
    pagination?: boolean
    subscription?: boolean
}

const BlockTableContainer: FC<Props> = props => (
    <Suspense
        key={JSON.stringify({
            filter: props.filter,
            limit: props.limit,
        })}
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
                            <TableCell>
                                <Skeleton className="h-6" />
                            </TableCell>
                        </TableRow>
                    ))}
                </tbody>
            </Table>
        }
    >
        <BlockTableLoader {...props} />
    </Suspense>
)

export default BlockTableContainer
