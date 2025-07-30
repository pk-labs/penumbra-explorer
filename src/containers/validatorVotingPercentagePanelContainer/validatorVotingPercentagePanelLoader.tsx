// istanbul ignore file
import { FC } from 'react'
import { NumberPanel } from '@/components'
import { getValidatorVotingPercentage } from '@/lib/data'
import { Props } from './validatorVotingPercentagePanelContainer'

const ValidatorVotingPercentagePanelLoader: FC<Props> = async props => {
    const number = await getValidatorVotingPercentage(props.validatorId)

    return (
        <NumberPanel
            className={props.className}
            number={number ?? 0}
            numberSuffix="%"
            title="Voting power %"
            toFixed={2}
        />
    )
}

export default ValidatorVotingPercentagePanelLoader
