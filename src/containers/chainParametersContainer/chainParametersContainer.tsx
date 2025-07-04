// istanbul ignore file
import { FC, Suspense } from 'react'
import { Parameter, Parameters, Skeleton, Surface } from '@/components'
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
                className={classNames(
                    'flex flex-col gap-2 p-6',
                    props.className
                )}
            >
                <div className="flex flex-col gap-1">
                    <h2 className="text-lg">Chain parameters</h2>
                    <Parameters>
                        <Parameter name="Chain ID">
                            <Skeleton className="h-4 w-20" />
                        </Parameter>
                    </Parameters>
                </div>
                <div className="flex flex-col gap-1">
                    <h3 className="text-base">Latest block</h3>
                    <Parameters>
                        <Parameter name="Time">
                            <Skeleton className="h-4 w-40" />
                        </Parameter>
                        <Parameter name="Height">
                            <Skeleton className="h-4 w-20" />
                        </Parameter>
                    </Parameters>
                </div>
                <div className="flex flex-col gap-1">
                    <h3 className="text-base">Epoch</h3>
                    <Parameters>
                        <Parameter name="Current">
                            <Skeleton className="h-4 w-8" />
                        </Parameter>
                        <Parameter name="Duration">
                            <Skeleton className="h-4 w-34" />
                        </Parameter>
                        <Parameter name="Next in">
                            <Skeleton className="h-4 w-34" />
                        </Parameter>
                    </Parameters>
                </div>
            </Surface>
        }
    >
        <ChainParametersLoader {...props} />
    </Suspense>
)

export default ChainParametersContainer
