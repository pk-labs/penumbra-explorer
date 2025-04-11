// istanbul ignore file
import { notFound } from 'next/navigation'
import { FC } from 'react'
import { TransactionView, TransactionViewProps } from '@/components'
import { getTransaction } from '@/lib/data'

export interface Props extends Omit<TransactionViewProps, 'transaction'> {
    transactionHash: string
}

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
