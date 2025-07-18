// istanbul ignore file
import { notFound } from 'next/navigation'
import { FC } from 'react'
import { Parameter, Parameters, Surface } from '@/components'
import { getValidatorParameters } from '@/lib/data'
import { blocksDuration, classNames, formatNumber } from '@/lib/utils'
import { Props } from './validatorParametersContainer'

const ValidatorParametersLoader: FC<Props> = async props => {
    const parameters = await getValidatorParameters()

    if (!parameters) {
        notFound()
    }

    return (
        <Surface
            className={classNames('flex flex-col gap-2 p-6', props.className)}
        >
            <h2 className="text-lg">Validator parameters</h2>
            <Parameters>
                <Parameter name="Uptime blocks window">
                    {formatNumber(parameters.uptimeBlocksWindow)}
                </Parameter>
                <Parameter name="Required uptime">
                    {parameters.uptimeMinRequired}%
                </Parameter>
                <Parameter name="Downtime penalty">
                    {parameters.slashingPenaltyDowntime}%
                </Parameter>
                <Parameter name="Misbehavior penalty">
                    {parameters.slashingPenaltyMisbehavior}%
                </Parameter>
                <Parameter name="Unbonding delay">
                    {formatNumber(parameters.unbondingDelay)} blocks{' '}
                    {blocksDuration(parameters.unbondingDelay)}
                </Parameter>
            </Parameters>
        </Surface>
    )
}

export default ValidatorParametersLoader
