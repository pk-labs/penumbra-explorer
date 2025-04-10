// istanbul ignore file
import { FC } from 'react'
import { getBlocks } from '@/lib/data'
import BlockPanel, { Props as BlockPanelProps } from './blockPanel'

export type Props = Omit<BlockPanelProps, 'number'>

const BlockPanelLoader: FC<Props> = async props => {
    const latestBlocks = await getBlocks({ latest: { limit: 1 } })
    await new Promise(resolve => setTimeout(resolve, 1000))

    let latestBlockHeight

    if (latestBlocks?.length) {
        latestBlockHeight = latestBlocks[0].height
    }

    return <BlockPanel number={latestBlockHeight} {...props} />
}

export default BlockPanelLoader
