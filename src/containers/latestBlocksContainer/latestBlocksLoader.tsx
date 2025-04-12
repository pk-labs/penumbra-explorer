// istanbul ignore file
import { FC } from 'react'
import { BlockTable, BlockTableProps } from '@/components'
import { getBlocks } from '@/lib/data'

export interface Props extends Omit<BlockTableProps, 'blocks' | 'footer'> {
    limit: number
}

const LatestBlocksLoader: FC<Props> = async ({ limit, ...props }) => {
    const blocks = await getBlocks({ latest: { limit } })

    return <BlockTable blocks={blocks} {...props} />
}

export default LatestBlocksLoader
