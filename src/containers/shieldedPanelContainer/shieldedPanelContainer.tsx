// istanbul ignore file
import { FC, Suspense } from 'react'
import { ShieldedPanel, Skeleton } from '@/components'
import ShieldedPanelLoader, { Props } from './shieldedPanelLoader'

const ShieldedPanelContainer: FC<Props> = props => (
    <Suspense
        fallback={
            <ShieldedPanel
                className={props.className}
                number={<Skeleton className="my-1 h-8 w-30 sm:w-34" />}
            />
        }
    >
        <ShieldedPanelLoader {...props} />
    </Suspense>
)

export default ShieldedPanelContainer
