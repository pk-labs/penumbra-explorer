// istanbul ignore file
import { FC, Suspense } from 'react'
import { BlockViewProps, Skeleton, View } from '@/components'
import { classNames } from '@/lib/utils'
import BlockViewLoader from './blockViewLoader'

export interface Props
    extends Omit<BlockViewProps, 'block' | 'swapExecutions'> {
    blockHeight: number
}

const BlockViewContainer: FC<Props> = props => (
    <Suspense
        key={props.blockHeight}
        fallback={
            <View
                className={classNames(
                    'from-[rgba(83,174,168,0.25)]!',
                    'to-[rgba(83,174,168,0.03)]!',
                    props.className
                )}
                title="Block view"
            >
                <Skeleton className="h-24 rounded-sm" />
                <Skeleton className="h-33 rounded-sm" />
                <Skeleton className="h-32 rounded-sm" />
                <Skeleton className="h-18.5 rounded-sm" />
            </View>
        }
    >
        <BlockViewLoader {...props} />
    </Suspense>
)

export default BlockViewContainer
