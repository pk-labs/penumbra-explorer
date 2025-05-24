// istanbul ignore file
import { FC, Suspense } from 'react'
import NumberPanel from '../../components/panels/numberPanel'
import VotingPowerPercentagePanelLoader from './votingPowerPercentagePanelLoader'

export interface Props {
    className?: string
}

const VotingPowerPercentagePanelContainer: FC<Props> = props => (
    <Suspense
        fallback={
            <NumberPanel
                number={0}
                numberSuffix="%"
                title="Voting power %"
                {...props}
            />
        }
    >
        <VotingPowerPercentagePanelLoader {...props} />
    </Suspense>
)

export default VotingPowerPercentagePanelContainer
