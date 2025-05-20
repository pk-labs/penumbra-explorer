// istanbul ignore file
import { FC, Suspense } from 'react'
import { Skeleton, View } from '@/components'
import { classNames } from '@/lib/utils'
import TransactionViewLoader, { Props } from './transactionViewLoader'

const TransactionViewContainer: FC<Props> = props => (
    <Suspense
        key={props.transactionHash}
        fallback={
            <View
                className={classNames(
                    'from-[rgba(193,166,204,0.25)]!',
                    'to-[rgba(193,166,204,0.03)]!',
                    props.className
                )}
                title="Transaction view"
            >
                <Skeleton className="h-22 rounded-sm" />
                <Skeleton className="h-33 rounded-sm" />
                <Skeleton className="h-20 rounded-sm" />
                <Skeleton className="h-17 rounded-sm" />
            </View>
        }
    >
        <TransactionViewLoader {...props} />
    </Suspense>
)

export default TransactionViewContainer
