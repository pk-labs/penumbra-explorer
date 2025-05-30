// istanbul ignore file
import { FC } from 'react'
import { getBlocks } from '@/lib/data'
import GraphqlClientProvider from '@/lib/graphql/graphqlClientProvider'
import { Props } from './latestBlocksContainer'
import LatestBlocksUpdater from './latestBlocksUpdater'

const LatestBlocksLoader: FC<Props> = async props => {
    const { blocks } = await getBlocks({ length: props.limit })

    return (
        <GraphqlClientProvider>
            <LatestBlocksUpdater blocks={blocks} {...props} />
        </GraphqlClientProvider>
    )
}

export default LatestBlocksLoader
