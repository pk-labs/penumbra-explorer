// istanbul ignore file
import { FC } from 'react'
import { getBlocks } from '@/lib/data'
import GraphqlClientProvider from '@/lib/graphql/graphqlClientProvider'
import { Props } from './blockPanelContainer'
import BlockPanelUpdater from './blockPanelUpdater'

const BlockPanelLoader: FC<Props> = async props => {
    const { blocks } = await getBlocks({ length: 1 })

    return (
        <GraphqlClientProvider>
            <BlockPanelUpdater number={blocks[0]?.height ?? 0} {...props} />
        </GraphqlClientProvider>
    )
}

export default BlockPanelLoader
