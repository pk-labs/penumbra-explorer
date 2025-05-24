// istanbul ignore file
import { FC } from 'react'
import { getStats } from '@/lib/data'
import GraphqlClientProvider from '@/lib/graphql/graphqlClientProvider'
import { Props } from './transactionPanelContainer'
import TransactionPanelUpdater from './transactionPanelUpdater'

const TransactionPanelLoader: FC<Props> = async props => {
    const stats = await getStats()

    return (
        <GraphqlClientProvider>
            <TransactionPanelUpdater
                initialNumber={stats?.totalTransactionsCount ?? 0}
                {...props}
            />
        </GraphqlClientProvider>
    )
}

export default TransactionPanelLoader
