// istanbul ignore file
import { FC, Suspense } from 'react'
import {
    DexPositionTableProps,
    Pagination,
    Skeleton,
    Table,
    TableCell,
    TableRow,
} from '@/components'
import { LiquidityPositionFilter } from '@/lib/graphql/generated/types'
import DexPositionTableLoader from './dexPositionTableLoader'

export interface Props
    extends Omit<DexPositionTableProps, 'footer' | 'positions'> {
    limit: {
        length: number
        offset?: number
    }
    pagination?: boolean
    stateFilter: LiquidityPositionFilter['state']
}

const DexPositionTableContainer: FC<Props> = props => (
    <Suspense
        key={JSON.stringify({
            limit: props.limit,
            stateFilter: props.stateFilter,
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
                            <TableCell className="h-20">
                                <Skeleton className="h-13" />
                            </TableCell>
                        </TableRow>
                    ))}
                </tbody>
            </Table>
        }
    >
        <DexPositionTableLoader {...props} />
    </Suspense>
)

export default DexPositionTableContainer
