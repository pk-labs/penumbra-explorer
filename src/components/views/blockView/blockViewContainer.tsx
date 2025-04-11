// istanbul ignore file
import { FC, Suspense } from 'react'
import { twMerge } from 'tailwind-merge'
import Skeleton from '../../skeleton'
import { View } from '../view'
import BlockViewLoader, { Props } from './blockViewLoader'

const BlockViewContainer: FC<Props> = props => (
    <Suspense
        key={props.blockHeight}
        fallback={
            <View
                className={twMerge(
                    'from-[rgba(83,174,168,0.25)]!',
                    'to-[rgba(83,174,168,0.03)]!',
                    props.className
                )}
                subtitle={<Skeleton className="mt-0.5 h-5.5 w-16 sm:w-19" />}
                title="Block view"
            >
                <Skeleton className="h-22" />
                <Skeleton className="h-33" />
                <Skeleton className="h-17" />
            </View>
        }
    >
        <BlockViewLoader {...props} />
    </Suspense>
)

export default BlockViewContainer
