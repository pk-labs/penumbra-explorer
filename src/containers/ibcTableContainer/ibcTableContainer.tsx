// istanbul ignore file
import { FC, Suspense } from 'react'
import {
    IbcTableProps,
    Skeleton,
    Table,
    TableCell,
    TableRow,
} from '@/components'
import ibc from '@/lib/ibc'
import IbcTableLoader from './ibcTableLoader'

export type Props = Omit<IbcTableProps, 'stats'>

const IbcTableContainer: FC<Props> = props => (
    <Suspense
        fallback={
            <Table {...props}>
                <thead>
                    <TableRow>
                        <TableCell header>
                            <Skeleton className="mb-2 h-8" />
                        </TableCell>
                    </TableRow>
                </thead>
                <tbody>
                    {ibc.map(client => (
                        <TableRow key={client.id}>
                            <TableCell className="h-20">
                                <Skeleton className="h-13" />
                            </TableCell>
                        </TableRow>
                    ))}
                </tbody>
            </Table>
        }
    >
        <IbcTableLoader {...props} />
    </Suspense>
)

export default IbcTableContainer
