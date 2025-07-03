// istanbul ignore file
import { notFound } from 'next/navigation'
import { FC } from 'react'
import { Parameter, Parameters, Surface } from '@/components'
import { getValidatorParameters } from '@/lib/data'
import { blocksToTime, classNames, formatNumber } from '@/lib/utils'
import { Props } from './validatorParametersContainer'

const ValidatorParametersLoader: FC<Props> = async props => {
    const parameters = await getValidatorParameters()

    if (!parameters) {
        notFound()
    }

    return (
        <Surface
            className={classNames('flex flex-col gap-1 p-6', props.className)}
        >
            <h3 className="text-lg">Validator parameters</h3>
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
                    {blocksToTime(parameters.unbondingDelay)}
                </Parameter>
            </Parameters>
        </Surface>
    )
}

export default ValidatorParametersLoader
