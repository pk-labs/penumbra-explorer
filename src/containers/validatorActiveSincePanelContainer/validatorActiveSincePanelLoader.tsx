// istanbul ignore file
import { FC } from 'react'
import { Panel } from '@/components'
import { getValidatorActiveSince } from '@/lib/data'
import { classNames } from '@/lib/utils'
import { Props } from './validatorActiveSincePanelContainer'

const ValidatorActiveSincePanelLoader: FC<Props> = async props => {
    const activeSince = await getValidatorActiveSince(props.validatorId)

    return (
        <Panel
            className={classNames(
                'inline-flex items-center font-mono text-3xl font-medium',
                props.className
            )}
            header={activeSince}
            title="Defined"
        />
    )
}

export default ValidatorActiveSincePanelLoader
