import { FC } from 'react'
import { BondingState, ValidatorState } from '@/lib/graphql/generated/types'
import { classNames, ucFirst } from '@/lib/utils'

const stateColors = {
    [ValidatorState.ValidatorStateEnumActive]: 'text-success-light',
    [ValidatorState.ValidatorStateEnumDefined]: 'text-secondary-light',
    [ValidatorState.ValidatorStateEnumDisabled]: 'text-text-secondary',
    [ValidatorState.ValidatorStateEnumInactive]: 'text-caution-light',
    [ValidatorState.ValidatorStateEnumJailed]: 'text-destructive-light',
    [ValidatorState.ValidatorStateEnumTombstoned]: 'text-destructive-light',
    [ValidatorState.ValidatorStateEnumUnspecified]: 'text-text-secondary',
}

const bondingStateColors = {
    [BondingState.BondingStateEnumBonded]: 'text-text-primary',
    [BondingState.BondingStateEnumUnbonded]: 'text-text-muted',
    [BondingState.BondingStateEnumUnbonding]: 'text-caution-light',
    [BondingState.BondingStateEnumUnspecified]: 'text-text-secondary',
}

interface Props {
    bondingState: BondingState
    className?: string
    state: ValidatorState
}

const ValidatorStateBonding: FC<Props> = props => (
    <span
        className={classNames(
            'inline-flex flex-col gap-1 font-mono',
            props.className
        )}
    >
        <span className={classNames('text-sm', stateColors[props.state])}>
            {ucFirst(props.state.split('_').pop())}
        </span>
        <span
            className={classNames(
                'text-xs',
                bondingStateColors[props.bondingState]
            )}
        >
            {ucFirst(props.bondingState.split('_').pop())}
        </span>
    </span>
)

export default ValidatorStateBonding
