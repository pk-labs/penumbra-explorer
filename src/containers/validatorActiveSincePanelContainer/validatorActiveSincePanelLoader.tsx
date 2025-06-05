// istanbul ignore file
import { FC } from 'react'
import { Panel } from '@/components'
import { getValidatorActiveSince } from '@/lib/data'
import { Props } from './validatorActiveSincePanelContainer'

const ValidatorActiveSincePanelLoader: FC<Props> = async props => {
    const activeSince = await getValidatorActiveSince(props.validatorId)

    return (
        <Panel
            className={props.className}
            header={
                <span className="font-medium' font-mono text-3xl">
                    {activeSince}
                </span>
            }
            title="Defined"
        />
    )
}

export default ValidatorActiveSincePanelLoader
