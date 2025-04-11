// istanbul ignore file
import { notFound } from 'next/navigation'
import { FC } from 'react'
import { BlockView, BlockViewProps } from '@/components'
import { getBlock } from '@/lib/data'

export interface Props extends Omit<BlockViewProps, 'block'> {
    blockHeight: number
}

const BlockViewLoader: FC<Props> = async ({ blockHeight, ...props }) => {
    const block = await getBlock(blockHeight)

    if (!block) {
        notFound()
    }

    return <BlockView block={block} {...props} />
}

export default BlockViewLoader
