// istanbul ignore file
import { FC, Suspense } from 'react'
import { StakedPanel } from '@/components'
import StakedPanelLoader, { Props } from './stakedPanelLoader'

const StakedPanelContainer: FC<Props> = props => (
    <Suspense fallback={<StakedPanel className={props.className} />}>
        <StakedPanelLoader {...props} />
    </Suspense>
)

export default StakedPanelContainer
