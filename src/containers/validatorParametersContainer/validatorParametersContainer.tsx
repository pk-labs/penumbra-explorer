// istanbul ignore file
import { FC, Suspense } from 'react'
import { Parameter, Skeleton } from '@/components'
import { classNames } from '@/lib/utils'
import ValidatorParametersLoader, { Props } from './validatorParametersLoader'

const ValidatorParametersContainer: FC<Props> = props => (
    <Suspense
        fallback={
            <section
                className={classNames(
                    'bg-other-tonalFill5 flex flex-col gap-2 rounded-lg',
                    'p-6 backdrop-blur-lg',
                    props.className
                )}
            >
                <h3 className="text-sm">Validator parameters</h3>
                <ul
                    className={classNames(
                        'text-text-secondary flex flex-col gap-2 font-mono',
                        'text-sm font-medium'
                    )}
                >
                    <Parameter name="Uptime blocks window">
                        <Skeleton className="h-4 w-12" />
                    </Parameter>
                    <Parameter name="Required uptime">
                        <Skeleton className="h-4 w-12" />
                    </Parameter>
                    <Parameter name="Downtime penalty">
                        <Skeleton className="h-4 w-12" />
                    </Parameter>
                    <Parameter name="Misbehavior penalty">
                        <Skeleton className="h-4 w-12" />
                    </Parameter>
                    <Parameter name="Min validator stake">
                        <Skeleton className="h-4 w-12" />
                    </Parameter>
                </ul>
            </section>
        }
    >
        <ValidatorParametersLoader {...props} />
    </Suspense>
)

export default ValidatorParametersContainer
