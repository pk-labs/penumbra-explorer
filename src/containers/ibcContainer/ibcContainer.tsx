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
import IbcLoader from './ibcLoader'

export type Props = Omit<IbcTableProps, 'stats'>

// TODO: Rename to IBC table container
const IbcContainer: FC<Props> = props => (
    <Suspense
        key={props.timePeriod}
        fallback={
            <Table
                // header={<TimePeriodSelector timePeriod={props.timePeriod} />}
                {...props}
            >
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
        <IbcLoader {...props} />
    </Suspense>
)

export default IbcContainer
