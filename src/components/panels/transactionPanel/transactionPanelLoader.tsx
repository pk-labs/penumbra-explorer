// istanbul ignore file
import { FC } from 'react'
import { getStats } from '@/lib/data'
import TransactionPanel, {
    Props as TransactionPanelProps,
} from './transactionPanel'

export type Props = Omit<TransactionPanelProps, 'number'>

const TransactionPanelLoader: FC<Props> = async props => {
    const stats = await getStats()
    await new Promise(resolve => setTimeout(resolve, 2500))

    return (
        <TransactionPanel number={stats?.totalTransactionsCount} {...props} />
    )
}

export default TransactionPanelLoader
