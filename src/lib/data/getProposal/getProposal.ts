import createGraphqlClient from '@/lib/graphql/createGraphqlClient'
import {
    ProposalQuery,
    ProposalQueryVariables,
} from '@/lib/graphql/generated/types'
import { proposalQuery } from '@/lib/graphql/queries'
import { TransformedProposal } from '@/lib/types'
import { transformProposalKind } from '@/lib/utils'

const getProposal = async (
    id: number
): Promise<null | TransformedProposal | undefined> => {
    const graphqlClient = createGraphqlClient()

    const result = await graphqlClient
        .query<ProposalQuery, ProposalQueryVariables>(proposalQuery, { id })
        .toPromise()

    if (result.error) {
        throw result.error
    } else if (!result.data?.proposalDetail) {
        return
    }

    const { kind, payload, ...proposal } = result.data.proposalDetail

    return {
        ...proposal,
        kind: transformProposalKind(kind),
        rawJson: payload,
        // rawJson: {
        //     height: result.data.block.rawJson.height,
        //     chain_id: result.data.block.rawJson.chain_id,
        //     timestamp: result.data.block.rawJson.timestamp,
        //     transactions: result.data.block.rawJson.transactions,
        //     events: result.data.block.rawJson.events
        //         .map((event: any) => ({
        //             event_id: event.event_id,
        //             type: event.type,
        //             attributes: event.attributes,
        //         }))
        //         .toSorted((a: any, b: any) => a.event_id - b.event_id),
        // },
    }
}

export default getProposal
