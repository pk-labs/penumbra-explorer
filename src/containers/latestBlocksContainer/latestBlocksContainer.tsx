// istanbul ignore file
import { FC, Suspense } from 'react'
import {
    BlockPanel,
    Button,
    Skeleton,
    Table,
    TableCell,
    TableRow,
} from '@/components'
import LatestBlocksLoader, {
    Props as LatestBlocksLoaderProps,
} from './latestBlocksLoader'

type Props = Omit<LatestBlocksLoaderProps, 'header'>

const LatestBlocksContainer: FC<Props> = props => {
    const header = (
        <div className="flex items-center justify-between">
            <h2 className="text-2xl font-medium capitalize">Latest blocks</h2>
            <Button density="compact" href="/blocks">
                View All
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
                        number={<Skeleton className="my-1 h-8 w-30 sm:w-34" />}
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
