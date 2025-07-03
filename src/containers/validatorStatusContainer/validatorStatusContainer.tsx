// istanbul ignore file
import { FC, Suspense } from 'react'
import { Skeleton, Surface } from '@/components'
import { classNames } from '@/lib/utils'
import ValidatorStatusLoader from './validatorStatusLoader'

export interface Props {
    active?: boolean
    className?: string
    validatorId: string
}

const ValidatorStatusContainer: FC<Props> = props => (
    <Suspense
        fallback={
            <Surface
                as="section"
                className={classNames(
                    'flex flex-col gap-6 p-6',
                    props.className
                )}
            >
                <header>
                    <h2 className="inline text-2xl font-medium">
                        Validator status
                    </h2>{' '}
                    <span className="text-text-secondary text-xs">
                        (Last 300 blocks)
                    </span>
                </header>
                <Skeleton className="h-95 sm:h-72 md:h-100 lg:h-60! xl:h-51!" />
            </Surface>
        }
    >
        <ValidatorStatusLoader {...props} />
    </Suspense>
)

export default ValidatorStatusContainer
