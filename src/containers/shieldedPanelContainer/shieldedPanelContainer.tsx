// istanbul ignore file
import { FC, Suspense } from 'react'
import { ShieldedPanel } from '@/components'
import ShieldedPanelLoader from './shieldedPanelLoader'

export interface Props {
    className?: string
}

const ShieldedPanelContainer: FC<Props> = props => (
    <Suspense fallback={<ShieldedPanel number={0} {...props} />}>
        <ShieldedPanelLoader {...props} />
    </Suspense>
)

export default ShieldedPanelContainer
