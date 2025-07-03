// istanbul ignore file
import { FC, Suspense } from 'react'
import { Skeleton, Surface } from '@/components'
import { classNames } from '@/lib/utils'
import ValidatorLoader from './validatorLoader'

export interface Props {
    className?: string
    validatorId: string
}

const ValidatorContainer: FC<Props> = props => (
    <Suspense
        fallback={
            <Surface
                as="section"
                className={classNames(
                    'flex flex-col gap-6 p-6',
                    props.className
                )}
            >
                <Skeleton className="h-14" />
                <Skeleton className="h-25" />
                <Skeleton className="h-20" />
                <Skeleton className="h-24" />
                <Skeleton className="h-19" />
                <Skeleton className="h-8" />
            </Surface>
        }
    >
        <ValidatorLoader {...props} />
    </Suspense>
)

export default ValidatorContainer
