// istanbul ignore file
import { FC, Suspense } from 'react'
import { Skeleton, Surface } from '@/components'
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
                    'flex flex-col gap-2 p-6',
                    props.className
                )}
            >
                <h2 className="text-lg">Validator parameters</h2>
                <Skeleton className="h-29 rounded-sm" />
            </Surface>
        }
    >
        <ValidatorParametersLoader {...props} />
    </Suspense>
)

export default ValidatorParametersContainer
