import createGraphqlClient from '../../graphql/createGraphqlClient'
import { BlockQuery, BlockQueryVariables } from '../../graphql/generated/types'
import { blockQuery } from '../../graphql/queries'

const loadBlock = async (height: number) => {
    const graphqlClient = createGraphqlClient()

    const result = await graphqlClient
        .query<BlockQuery, BlockQueryVariables>(blockQuery, { height })
        .toPromise()

    if (result.error) {
        console.error(result.error)
    }

    return result.data?.block
}

export default loadBlock
