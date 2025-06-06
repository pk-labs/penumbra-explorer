// istanbul ignore file
import { FC } from 'react'
import { getTransactions } from '@/lib/data'
import GraphqlClientProvider from '@/lib/graphql/graphqlClientProvider'
import { Props } from './latestTransactionsContainer'
import LatestTransactionsUpdater from './latestTransactionsUpdater'

const LatestTransactionsLoader: FC<Props> = async props => {
    const { transactions } = await getTransactions(
        {
            length: props.limit,
        },
        { validator: props.validatorId }
    )

    return (
        <GraphqlClientProvider>
            <LatestTransactionsUpdater transactions={transactions} {...props} />
        </GraphqlClientProvider>
    )
}

export default LatestTransactionsLoader
