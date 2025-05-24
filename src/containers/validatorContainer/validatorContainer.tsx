// istanbul ignore file
import { FC, Suspense } from 'react'
import { Skeleton } from '@/components'
import { classNames } from '@/lib/utils'
import ValidatorLoader, { Props } from './validatorLoader'

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
                <Skeleton className="h-10" />
                <Skeleton className="h-25" />
                <Skeleton className="h-25" />
            </section>
        }
    >
        <ValidatorLoader {...props} />
    </Suspense>
)

export default ValidatorContainer
