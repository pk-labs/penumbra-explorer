// istanbul ignore file
import { notFound } from 'next/navigation'
import { FC } from 'react'
import { TransactionView } from '@/components'
import { getTransaction } from '@/lib/data'
import { Props } from './transactionViewContainer'

const TransactionViewLoader: FC<Props> = async ({
    transactionHash,
    ...props
}) => {
    const transaction = await getTransaction(transactionHash)

    if (!transaction) {
        notFound()
    }

    return <TransactionView transaction={transaction} {...props} />
}

export default TransactionViewLoader
