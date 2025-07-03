// istanbul ignore file
import { FC, Suspense } from 'react'
import { Parameter, Parameters, Skeleton, Surface } from '@/components'
import { classNames } from '@/lib/utils'
import ValidatorParametersLoader from './validatorParametersLoader'

export interface Props {
    className?: string
}

const ValidatorParametersContainer: FC<Props> = props => (
    <Suspense
        fallback={
            <Surface
                as="section"
                className={classNames(
                    'flex flex-col gap-1 p-6',
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
            </Surface>
        }
    >
        <ValidatorParametersLoader {...props} />
    </Suspense>
)

export default ValidatorParametersContainer
