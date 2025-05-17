// istanbul ignore file
import { FC, Suspense } from 'react'
import { Skeleton } from '@/components'
import { classNames } from '@/lib/utils'
import UmPriceLoader, { Props } from './umPriceLoader'

const UmPriceContainer: FC<Props> = props => (
    <Suspense
        fallback={
            <Skeleton
                className={classNames('h-8 w-49 rounded-full', props.className)}
            />
        }
    >
        <UmPriceLoader {...props} />
    </Suspense>
)

export default UmPriceContainer
