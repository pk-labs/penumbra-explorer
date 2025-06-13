// istanbul ignore file
import { FC, Suspense } from 'react'
import { Skeleton, Table, TableCell, TableProps, TableRow } from '@/components'
import DexPositionsTableLoader from './dexPositionsTableLoader'

export interface Props extends Omit<TableProps, 'footer'> {
    limit: {
        length: number
        offset?: number
    }
}

const DexPositionsTableContainer: FC<Props> = props => (
    <Suspense
        fallback={
            <Table className={props.className} header={props.header}>
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
        <DexPositionsTableLoader {...props} />
    </Suspense>
)

export default DexPositionsTableContainer
