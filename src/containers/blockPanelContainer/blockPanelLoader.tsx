// istanbul ignore file
import { FC } from 'react'
import { BlockPanel, BlockPanelProps } from '@/components'
import { getBlocks } from '@/lib/data'

export type Props = Omit<BlockPanelProps, 'number'>

const BlockPanelLoader: FC<Props> = async props => {
    const latestBlocks = await getBlocks({ latest: { limit: 1 } })
    let latestBlockHeight

    if (latestBlocks?.length) {
        latestBlockHeight = latestBlocks[0].height
    }

    return <BlockPanel number={latestBlockHeight} {...props} />
}

export default BlockPanelLoader
