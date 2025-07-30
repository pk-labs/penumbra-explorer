// istanbul ignore file
import Image from 'next/image'
import { FC } from 'react'
import { NumberPanel } from '@/components'
import { getValidatorVotingPower } from '@/lib/data'
import { ValidatorState } from '@/lib/graphql/generated/types'
import { penumbraImage } from '@/lib/images'
import { Props } from './validatorVotingPowerPanelContainer'

const ValidatorVotingPowerPanelLoader: FC<Props> = async props => {
    const validator = await getValidatorVotingPower(props.validatorId)
    const number = validator?.votingPower
    const active = validator?.state === ValidatorState.ValidatorStateEnumActive

    return (
        <NumberPanel
            className={props.className}
            number={number ?? 0}
            numberClassName="gap-2"
            numberPrefix={
                <Image alt="UM" height={32} src={penumbraImage} width={32} />
            }
            numberSuffix="UM"
            title={active ? 'Voting power UM' : 'Staked tokens'}
        />
    )
}

export default ValidatorVotingPowerPanelLoader
