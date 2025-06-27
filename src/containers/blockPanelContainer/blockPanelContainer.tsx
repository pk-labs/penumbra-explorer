// istanbul ignore file
import { FC, Suspense } from 'react'
import { BlockPanel } from '@/components'
import BlockPanelLoader from './blockPanelLoader'

export interface Props {
    className?: string
}

const BlockPanelContainer: FC<Props> = props => (
    <Suspense
        fallback={
            <BlockPanel className={props.className} number={0} fallback />
        }
    >
        <BlockPanelLoader {...props} />
    </Suspense>
)

export default BlockPanelContainer
