// istanbul ignore file
import { FC, Suspense } from 'react'
import { Skeleton, Surface } from '@/components'
import { classNames } from '@/lib/utils'
import ChainParametersLoader from './chainParametersLoader'

export interface Props {
    className?: string
}

const ChainParametersContainer: FC<Props> = props => (
    <Suspense
        fallback={
            <Surface
                as="section"
                className={classNames('p-6', props.className)}
            >
                <div className="flex flex-col gap-2">
                    <h2 className="text-lg">Chain parameters</h2>
                    <Skeleton className="h-53 rounded-sm" />
                </div>
            </Surface>
        }
    >
        <ChainParametersLoader {...props} />
    </Suspense>
)

export default ChainParametersContainer
