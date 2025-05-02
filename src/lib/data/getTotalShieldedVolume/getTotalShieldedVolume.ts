import createGraphqlClient from '@/lib/graphql/createGraphqlClient'
import {
    TotalShieldedVolumeQuery,
    TotalShieldedVolumeQueryVariables,
} from '@/lib/graphql/generated/types'
import { totalShieldedVolumeQuery } from '@/lib/graphql/queries'

const getTotalShieldedVolume = async (): Promise<number | undefined> => {
    const graphqlClient = createGraphqlClient()

    const result = await graphqlClient
        .query<
            TotalShieldedVolumeQuery,
            TotalShieldedVolumeQueryVariables
        >(totalShieldedVolumeQuery, {})
        .toPromise()

    if (result.error) {
        throw result.error
    }

    if (typeof result.data?.ibcTotalShieldedVolume.value === 'string') {
        return Number(result.data?.ibcTotalShieldedVolume.value)
    }
}

export default getTotalShieldedVolume
