// istanbul ignore file
import { FC, Suspense } from 'react'
import { UnbondingPanel } from '@/components'
import UnbondingPanelLoader, { Props } from './unbondingPanelLoader'

const UnbondingPanelContainer: FC<Props> = props => (
    <Suspense fallback={<UnbondingPanel className={props.className} />}>
        <UnbondingPanelLoader {...props} />
    </Suspense>
)

export default UnbondingPanelContainer
