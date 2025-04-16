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

type Props = Omit<LatestBlocksLoaderProps, 'actions' | 'title'>

const LatestBlocksContainer: FC<Props> = props => {
    const title = 'Latest blocks'

    const actions = (
        <Button density="compact" href="/blocks">
            View All
        </Button>
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
                        actions={actions}
                        className={props.blockTableClassName}
                        title={title}
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
            <LatestBlocksLoader actions={actions} title={title} {...props} />
        </Suspense>
    )
}

export default LatestBlocksContainer
