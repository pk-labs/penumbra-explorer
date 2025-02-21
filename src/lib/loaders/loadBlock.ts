/* istanbul ignore file */
import createGraphqlClient from '../graphql/createGraphqlClient'
import { BlockQuery, BlockQueryVariables } from '../graphql/generated/types'
import { blockQuery } from '../graphql/queries'

const loadBlock = async (id: number) => {
    const graphqlClient = createGraphqlClient()

    const result = await graphqlClient
        .query<BlockQuery, BlockQueryVariables>(
            blockQuery,
            { id },
            {
                fetchOptions: {
                    cache: 'no-store',
                },
            }
        )
        .toPromise()

    if (result.error) {
        console.error(result.error)
    }

    return (
        result.data?.block && {
            ...result.data.block,
            transactionsCount: '-',
        }
    )
}

export default loadBlock
