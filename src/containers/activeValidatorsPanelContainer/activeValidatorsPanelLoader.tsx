// istanbul ignore file
import { notFound } from 'next/navigation'
import { FC } from 'react'
import { NumberPanel } from '@/components'
import getActiveValidators from '@/lib/data/getActiveValidators'
import { Props } from './activeValidatorsPanelContainer'

const ActiveValidatorsPanelLoader: FC<Props> = async props => {
    const activeValidators = await getActiveValidators()

    if (!activeValidators) {
        notFound()
    }

    return (
        <NumberPanel
            className={props.className}
            number={activeValidators.activeValidatorCount}
            numberSuffix={
                <span className="text-text-secondary text-2xl">
                    /{activeValidators.activeValidatorLimit}
                </span>
            }
            title="Active validators / Validators limit"
        />
    )
}

export default ActiveValidatorsPanelLoader
