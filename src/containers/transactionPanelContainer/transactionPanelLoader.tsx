// istanbul ignore file
import { FC } from 'react'
import { TransactionPanelProps } from '@/components'
import { getStats } from '@/lib/data'
import GraphqlClientProvider from '@/lib/graphql/graphqlClientProvider'
import TransactionPanelUpdater from './transactionPanelUpdater'

export type Props = Omit<TransactionPanelProps, 'number'>

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
