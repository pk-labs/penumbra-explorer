// istanbul ignore file
import { FC, Suspense } from 'react'
import { Skeleton, Table, TableCell, TableRow } from '@/components'
import ibc from '@/lib/ibc'
import IbcLoader, { Props } from './ibcLoader'

const IbcContainer: FC<Props> = props => (
    <Suspense
        key={props.timePeriod}
        fallback={
            <Table
                className={props.className}
                // header={<TimePeriodSelector timePeriod={props.timePeriod} />}
            >
                <thead>
                    <TableRow>
                        <TableCell header>
                            <Skeleton className="mb-2 h-8" />
                        </TableCell>
                    </TableRow>
                </thead>
                <tbody>
                    {ibc.map(connection => (
                        <TableRow key={connection.chainId}>
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
