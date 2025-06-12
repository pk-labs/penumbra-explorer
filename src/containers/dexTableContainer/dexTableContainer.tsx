// istanbul ignore file
import { FC, Suspense } from 'react'
import { Skeleton, Table, TableCell, TableProps, TableRow } from '@/components'
import DexTableLoader from './dexTableLoader'

export interface Props extends Omit<TableProps, 'footer'> {
    limit: {
        length: number
        offset?: number
    }
}

const DexTableContainer: FC<Props> = props => (
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
        <DexTableLoader {...props} />
    </Suspense>
)

export default DexTableContainer
