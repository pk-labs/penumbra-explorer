// istanbul ignore file
import { FC, Suspense } from 'react'
import { Skeleton } from '@/components'
import { classNames } from '@/lib/utils'
import ValidatorLoader from './validatorLoader'

export interface Props {
    className?: string
    validator: string
}

const ValidatorContainer: FC<Props> = props => (
    <Suspense
        fallback={
            <section
                className={classNames(
                    'bg-other-tonalFill5 flex flex-col gap-6 rounded-lg',
                    'p-6 backdrop-blur-lg',
                    props.className
                )}
            >
                <Skeleton className="h-14" />
                <Skeleton className="h-25" />
                <Skeleton className="h-20" />
                <Skeleton className="h-24" />
                <Skeleton className="h-19" />
                <Skeleton className="h-8" />
            </section>
        }
    >
        <ValidatorLoader {...props} />
    </Suspense>
)

export default ValidatorContainer
