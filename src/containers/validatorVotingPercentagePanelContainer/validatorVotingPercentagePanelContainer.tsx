// istanbul ignore file
import { FC, Suspense } from 'react'
import NumberPanel from '../../components/panels/numberPanel'
import ValidatorVotingPercentagePanelLoader from './validatorVotingPercentagePanelLoader'

export interface Props {
    className?: string
    validatorId: string
}

const ValidatorVotingPercentagePanelContainer: FC<Props> = props => (
    <Suspense
        fallback={
            <NumberPanel
                className={props.className}
                number={0}
                numberSuffix="%"
                title="Voting power %"
            />
        }
    >
        <ValidatorVotingPercentagePanelLoader {...props} />
    </Suspense>
)

export default ValidatorVotingPercentagePanelContainer
