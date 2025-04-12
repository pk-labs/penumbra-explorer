// istanbul ignore file
import { FC, Suspense } from 'react'
import { Skeleton, Table, TableCell, TableRow } from '@/components'
import LatestBlocksLoader, { Props } from './latestBlocksLoader'

const LatestBlocksContainer: FC<Props> = props => (
    <Suspense
        key={props.limit}
        fallback={
            <Table
                actions={props.actions}
                className={props.className}
                title={props.title}
            >
                <thead>
                    <TableRow>
                        <TableCell header>
                            <Skeleton className="h-6" />
                        </TableCell>
                    </TableRow>
                </thead>
                <tbody>
                    {Array.from({ length: props.limit }).map((_, i) => (
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
        <LatestBlocksLoader {...props} />
    </Suspense>
)

export default LatestBlocksContainer
