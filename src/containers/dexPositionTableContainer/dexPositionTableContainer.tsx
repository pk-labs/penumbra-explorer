// istanbul ignore file
import { FC, Suspense } from 'react'
import {
    DexPositionTableProps,
    Skeleton,
    Table,
    TableCell,
    TableRow,
} from '@/components'
import DexPositionTableLoader from './dexPositionTableLoader'

export interface Props
    extends Omit<DexPositionTableProps, 'footer' | 'positions'> {
    limit: {
        length: number
        offset?: number
    }
}

const DexPositionTableContainer: FC<Props> = props => (
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
        <DexPositionTableLoader {...props} />
    </Suspense>
)

export default DexPositionTableContainer
