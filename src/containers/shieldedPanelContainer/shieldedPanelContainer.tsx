// istanbul ignore file
import { FC, Suspense } from 'react'
import { ShieldedPanel } from '@/components'
import ShieldedPanelLoader, { Props } from './shieldedPanelLoader'

const ShieldedPanelContainer: FC<Props> = props => (
    <Suspense fallback={<ShieldedPanel className={props.className} />}>
        <ShieldedPanelLoader {...props} />
    </Suspense>
)

export default ShieldedPanelContainer
