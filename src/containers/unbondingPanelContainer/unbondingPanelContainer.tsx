// istanbul ignore file
import { FC, Suspense } from 'react'
import { NumberPanel } from '@/components'
import UnbondingPanelLoader from './unbondingPanelLoader'

export interface Props {
    className?: string
}

const UnbondingPanelContainer: FC<Props> = props => (
    <Suspense
        fallback={
            <NumberPanel
                number={0}
                numberPrefix="~"
                numberSuffix={<span className="ml-2">days</span>}
                title="Unbonding delay"
                {...props}
            />
        }
    >
        <UnbondingPanelLoader {...props} />
    </Suspense>
)

export default UnbondingPanelContainer
