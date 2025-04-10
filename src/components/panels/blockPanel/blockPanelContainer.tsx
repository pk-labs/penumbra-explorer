// istanbul ignore file
import { FC, Suspense } from 'react'
import Skeleton from '../../skeleton'
import BlockPanel from './blockPanel'
import BlockPanelLoader, { Props } from './blockPanelLoader'

const BlockPanelContainer: FC<Props> = props => (
    <Suspense
        fallback={
            <BlockPanel
                className={props.className}
                number={<Skeleton className="mt-2 h-8" />}
            />
        }
    >
        <BlockPanelLoader {...props} />
    </Suspense>
)

export default BlockPanelContainer
