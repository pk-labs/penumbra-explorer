// istanbul ignore file
import { notFound } from 'next/navigation'
import { FC } from 'react'
import { Parameter, Parameters } from '@/components'
import { getValidatorParameters } from '@/lib/data'
import { classNames, formatNumber } from '@/lib/utils'
import { Props } from './validatorParametersContainer'

const ValidatorParametersLoader: FC<Props> = async props => {
    const parameters = await getValidatorParameters()

    if (!parameters) {
        notFound()
    }

    return (
        <section
            className={classNames(
                'bg-other-tonalFill5 flex flex-col gap-1 rounded-lg p-6',
                'backdrop-blur-lg',
                props.className
            )}
        >
            <h3 className="text-lg">Validator parameters</h3>
            <Parameters>
                <Parameter name="Uptime blocks window">
                    {formatNumber(parameters.uptimeBlocksWindow)}
                </Parameter>
                <Parameter name="Required uptime">
                    {parameters.uptimeMinRequired}
                </Parameter>
                <Parameter name="Downtime penalty">
                    {parameters.slashingPenaltyDowntime}
                </Parameter>
                <Parameter name="Misbehavior penalty">
                    {parameters.slashingPenaltyMisbehavior}
                </Parameter>
                <Parameter name="Unbonding delay">
                    {parameters.unbondingDelay}
                </Parameter>
            </Parameters>
        </section>
    )
}

export default ValidatorParametersLoader
