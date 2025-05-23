import { FC } from 'react'
import { classNames } from '@/lib/utils'

type Status =
    | 'Active'
    | 'Defined'
    | 'Disabled'
    | 'Inactive'
    | 'Jailed'
    | 'Tombstoned'
    | 'Unspecified'

const statusColors = {
    Active: 'text-success-light',
    Defined: 'text-secondary-light',
    Disabled: 'text-text-secondary',
    Inactive: 'text-caution-light',
    Jailed: 'text-destructive-light',
    Tombstoned: 'text-text-muted',
    Unspecified: 'text-text-secondary',
}

type Bonding = 'Bonded' | 'Unbonded' | 'Unbonding'

const bondingColors = {
    Bonded: 'text-text-primary',
    Unbonded: 'text-text-muted',
    Unbonding: 'text-caution-light',
}

interface Props {
    bonding: Bonding
    className?: string
    status: Status
}

const ValidatorStatusBonding: FC<Props> = props => (
    <span
        className={classNames(
            'inline-flex flex-col gap-1 font-mono',
            props.className
        )}
    >
        <span className={classNames('text-sm', statusColors[props.status])}>
            {props.status}
        </span>
        <span className={classNames('text-xs', bondingColors[props.bonding])}>
            {props.bonding}
        </span>
    </span>
)

export default ValidatorStatusBonding
