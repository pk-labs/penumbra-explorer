// istanbul ignore file
import { FC } from 'react'
import { getBlocks } from '@/lib/data'
import BlockTable, { Props as BlockTableProps } from './blockTable'

export interface Props extends Omit<BlockTableProps, 'blocks'> {
    limit: number
}

const BlockTableLoader: FC<Props> = async ({ limit, ...props }) => {
    const blocks = await getBlocks({ latest: { limit } })
    await new Promise(resolve => setTimeout(resolve, 4000))

    return <BlockTable blocks={blocks} {...props} />
}

export default BlockTableLoader
