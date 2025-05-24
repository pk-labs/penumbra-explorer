// istanbul ignore file
import { FC, Suspense } from 'react'
import {
    BlockPanel,
    BlockTableProps,
    Button,
    Skeleton,
    Table,
    TableCell,
    TableRow,
} from '@/components'
import LatestBlocksLoader from './latestBlocksLoader'

export interface Props extends Pick<BlockTableProps, 'header' | 'ticker'> {
    blockPanelClassName?: string
    blockTableClassName?: string
    limit: number
}

// TODO: Refactor into generic blockTableContainer with configurable
// header, pagination, query variables and real-time updates.
const LatestBlocksContainer: FC<Props> = props => {
    const header = (
        <div className="flex items-center justify-between">
            <h2 className="text-2xl font-medium">Latest blocks</h2>
            <Button density="compact" href="/blocks">
                View all
            </Button>
        </div>
    )

    return (
        <Suspense
            key={props.limit}
            fallback={
                <>
                    <BlockPanel
                        className={props.blockPanelClassName}
                        number={0}
                        fallback
                    />
                    <Table
                        className={props.blockTableClassName}
                        header={header}
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
                </>
            }
        >
            <LatestBlocksLoader header={header} {...props} />
        </Suspense>
    )
}

export default LatestBlocksContainer
