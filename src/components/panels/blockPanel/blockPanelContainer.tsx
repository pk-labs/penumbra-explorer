// istanbul ignore file
import { FC, Suspense } from 'react'
import BlockPanel from './blockPanel'
import BlockPanelLoader, { Props } from './blockPanelLoader'

const BlockPanelContainer: FC<Props> = props => (
    <Suspense fallback={<BlockPanel className={props.className} number={0} />}>
        <BlockPanelLoader {...props} />
    </Suspense>
)

export default BlockPanelContainer
