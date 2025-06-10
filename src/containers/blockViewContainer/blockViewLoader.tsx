// istanbul ignore file
import { notFound } from 'next/navigation'
import { FC } from 'react'
import { BlockView } from '@/components'
import { getBlock } from '@/lib/data'
import { Props } from './blockViewContainer'

const BlockViewLoader: FC<Props> = async ({ blockHeight, ...props }) => {
    const block = await getBlock(blockHeight)
    await new Promise(resolve => setTimeout(resolve, 2000))

    if (!block) {
        notFound()
    }

    return <BlockView block={block} {...props} />
}

export default BlockViewLoader
