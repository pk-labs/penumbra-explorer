// istanbul ignore file
import { FC } from 'react'
import { TransactionTableProps } from '@/components'
import { getTransactions } from '@/lib/data'
import GraphqlClientProvider from '@/lib/graphql/graphqlClientProvider'
import LatestTransactionsUpdater from './latestTransactionsUpdater'

export interface Props
    extends Omit<TransactionTableProps, 'footer' | 'transactions'> {
    limit: number
}

const LatestTransactionsLoader: FC<Props> = async props => {
    const { transactions } = await getTransactions({
        length: props.limit,
    })

    return (
        <GraphqlClientProvider>
            <LatestTransactionsUpdater
                initialTransactions={transactions}
                {...props}
            />
        </GraphqlClientProvider>
    )
}

export default LatestTransactionsLoader
