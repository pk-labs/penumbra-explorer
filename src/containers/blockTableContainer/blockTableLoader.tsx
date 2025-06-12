// istanbul ignore file
import { FC } from 'react'
import { getBlocks } from '@/lib/data'
import GraphqlClientProvider from '@/lib/graphql/graphqlClientProvider'
import { Props } from './blockTableContainer'
import BlockTableUpdater from './blockTableUpdater'

const BlockTableLoader: FC<Props> = async props => {
    const { blocks, total } = await getBlocks(props.limit, props.filter)

    return (
        <GraphqlClientProvider>
            <BlockTableUpdater blocks={blocks} total={total} {...props} />
        </GraphqlClientProvider>
    )
}

export default BlockTableLoader
