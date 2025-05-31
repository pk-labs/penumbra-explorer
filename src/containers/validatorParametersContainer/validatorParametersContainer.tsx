// istanbul ignore file
import { FC, Suspense } from 'react'
import { Parameter, Parameters, Skeleton } from '@/components'
import { classNames } from '@/lib/utils'
import ValidatorParametersLoader from './validatorParametersLoader'

export interface Props {
    className?: string
}

const ValidatorParametersContainer: FC<Props> = props => (
    <Suspense
        fallback={
            <section
                className={classNames(
                    'bg-other-tonalFill5 flex flex-col gap-1 rounded-lg',
                    'p-6 backdrop-blur-lg',
                    props.className
                )}
            >
                <h2 className="text-lg">Validator parameters</h2>
                <Parameters>
                    <Parameter name="Uptime blocks window">
                        <Skeleton className="h-4 w-12" />
                    </Parameter>
                    <Parameter name="Required uptime">
                        <Skeleton className="h-4 w-8" />
                    </Parameter>
                    <Parameter name="Downtime penalty">
                        <Skeleton className="h-4 w-18" />
                    </Parameter>
                    <Parameter name="Misbehavior penalty">
                        <Skeleton className="h-4 w-8" />
                    </Parameter>
                    <Parameter name="Unbonding delay">
                        <Skeleton className="h-4 w-20" />
                    </Parameter>
                </Parameters>
            </section>
        }
    >
        <ValidatorParametersLoader {...props} />
    </Suspense>
)

export default ValidatorParametersContainer
