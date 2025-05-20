// istanbul ignore file
import { FC } from 'react'
import { getStats } from '@/lib/data'
import GraphqlClientProvider from '@/lib/graphql/graphqlClientProvider'
import TransactionPanelUpdater from './transactionPanelUpdater'

export interface Props {
    className?: string
    number?: number
}

const TransactionPanelLoader: FC<Props> = async props => {
    const stats = await getStats()

    return (
        <GraphqlClientProvider>
            <TransactionPanelUpdater
                initialNumber={stats?.totalTransactionsCount}
                {...props}
            />
        </GraphqlClientProvider>
    )
}

export default TransactionPanelLoader
