// istanbul ignore file
import { FC, Suspense } from 'react'
import { Parameter, Skeleton } from '@/components'
import { classNames } from '@/lib/utils'
import ChainParametersLoader from './chainParametersLoader'

export interface Props {
    className?: string
}

const ChainParametersContainer: FC<Props> = props => (
    <Suspense
        fallback={
            <section
                className={classNames(
                    'bg-other-tonalFill5 flex flex-col gap-2 rounded-lg',
                    'p-6 backdrop-blur-lg',
                    props.className
                )}
            >
                <h2 className="text-sm">Chain parameters</h2>
                <ul
                    className={classNames(
                        'text-text-secondary flex flex-col gap-2 font-mono',
                        'text-sm font-medium'
                    )}
                >
                    <Parameter name="Chain ID">
                        <Skeleton className="h-4 w-20" />
                    </Parameter>
                    <Parameter name="Block time">
                        <Skeleton className="h-4 w-40" />
                    </Parameter>
                    <Parameter name="Block height">
                        <Skeleton className="h-4 w-20" />
                    </Parameter>
                    <Parameter name="Current epoch">
                        <Skeleton className="h-4 w-8" />
                    </Parameter>
                    <Parameter name="Epoch duration">
                        <Skeleton className="h-4 w-40" />
                    </Parameter>
                    <Parameter name="Next epoch in">
                        <Skeleton className="h-4 w-40" />
                    </Parameter>
                </ul>
            </section>
        }
    >
        <ChainParametersLoader {...props} />
    </Suspense>
)

export default ChainParametersContainer
