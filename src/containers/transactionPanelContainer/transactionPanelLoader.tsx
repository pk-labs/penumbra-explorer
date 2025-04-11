// istanbul ignore file
import { FC } from 'react'
import { TransactionPanel, TransactionPanelProps } from '@/components'
import { getStats } from '@/lib/data'

export type Props = Omit<TransactionPanelProps, 'number'>

const TransactionPanelLoader: FC<Props> = async props => {
    const stats = await getStats()

    return (
        <TransactionPanel number={stats?.totalTransactionsCount} {...props} />
    )
}

export default TransactionPanelLoader
