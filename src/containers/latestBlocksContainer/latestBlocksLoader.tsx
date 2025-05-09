// istanbul ignore file
import { FC } from 'react'
import { BlockTableProps } from '@/components'
import { getBlocks } from '@/lib/data'
import GraphqlClientProvider from '@/lib/graphql/graphqlClientProvider'
import LatestBlocksUpdater from './latestBlocksUpdater'

export interface Props extends Pick<BlockTableProps, 'header'> {
    blockPanelClassName?: string
    blockTableClassName?: string
    limit: number
}

const LatestBlocksLoader: FC<Props> = async props => {
    const { blocks } = await getBlocks({ length: props.limit })

    return (
        <GraphqlClientProvider>
            <LatestBlocksUpdater initialBlocks={blocks} {...props} />
        </GraphqlClientProvider>
    )
}

export default LatestBlocksLoader
