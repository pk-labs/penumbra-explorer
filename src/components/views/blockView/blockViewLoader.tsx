// istanbul ignore file
import { notFound } from 'next/navigation'
import { FC } from 'react'
import { getBlock } from '@/lib/data'
import BlockView, { Props as BlockViewProps } from './blockView'

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
