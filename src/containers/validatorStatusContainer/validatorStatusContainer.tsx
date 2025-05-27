// istanbul ignore file
import { FC, Suspense } from 'react'
import { Skeleton } from '@/components'
import { classNames } from '@/lib/utils'
import ValidatorStatusLoader from './validatorStatusLoader'

export interface Props {
    className?: string
}

const ValidatorStatusContainer: FC<Props> = props => (
    <Suspense
        fallback={
            <section
                className={classNames(
                    'bg-other-tonalFill5 flex flex-col gap-6 rounded-lg p-6',
                    'backdrop-blur-lg',
                    props.className
                )}
            >
                <header>
                    <h2 className="text-2xl font-medium">Validator status</h2>
                </header>
                <Skeleton className="h-53" />
            </section>
        }
    >
        <ValidatorStatusLoader {...props} />
    </Suspense>
)

export default ValidatorStatusContainer
