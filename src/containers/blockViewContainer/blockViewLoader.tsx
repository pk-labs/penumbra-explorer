// istanbul ignore file
import { notFound } from 'next/navigation'
import { FC } from 'react'
import { BlockView } from '@/components'
import { getBlock, getDexBlockExecutions } from '@/lib/data'
import { Props } from './blockViewContainer'

const BlockViewLoader: FC<Props> = async ({ blockHeight, ...props }) => {
    const [block, blockExecutions] = await Promise.all([
        getBlock(blockHeight),
        getDexBlockExecutions({ height: blockHeight }),
    ])

    if (!block || !blockExecutions) {
        notFound()
    }

    return (
        <BlockView
            {...props}
            block={block}
            swapExecutions={blockExecutions[0]?.swapExecutions ?? []}
        />
    )
}

export default BlockViewLoader
