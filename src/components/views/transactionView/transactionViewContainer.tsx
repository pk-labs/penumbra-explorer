// istanbul ignore file
import { FC, Suspense } from 'react'
import { twMerge } from 'tailwind-merge'
import Skeleton from '../../skeleton'
import { View } from '../view'
import TransactionViewLoader, { Props } from './transactionViewLoader'

const TransactionViewContainer: FC<Props> = props => (
    <Suspense
        key={props.transactionHash}
        fallback={
            <View
                className={twMerge(
                    'from-[rgba(193,166,204,0.25)]!',
                    'to-[rgba(193,166,204,0.03)]!',
                    props.className
                )}
                subtitle={<Skeleton className="h-6 w-131" />}
                title="Transaction view"
            >
                <Skeleton className="h-22" />
                <Skeleton className="h-33" />
                <Skeleton className="h-20" />
                <Skeleton className="h-17" />
            </View>
        }
    >
        <TransactionViewLoader {...props} />
    </Suspense>
)

export default TransactionViewContainer
