// istanbul ignore file
import { FC, Suspense } from 'react'
import { Skeleton, TransactionViewProps, View } from '@/components'
import { classNames } from '@/lib/utils'
import TransactionViewLoader from './transactionViewLoader'

export interface Props extends Omit<TransactionViewProps, 'transaction'> {
    transactionHash: string
}

const TransactionViewContainer: FC<Props> = props => (
    <Suspense
        key={props.transactionHash}
        fallback={
            <View
                className={classNames(
                    'from-[rgba(193,166,204,0.25)] to-[rgba(193,166,204,0.03)]',
                    props.className
                )}
                title="Transaction view"
            >
                <Skeleton className="h-150 rounded-sm" />
            </View>
        }
    >
        <TransactionViewLoader {...props} />
    </Suspense>
)

export default TransactionViewContainer
