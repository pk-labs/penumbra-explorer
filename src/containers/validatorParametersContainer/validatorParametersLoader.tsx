// istanbul ignore file
import { faker } from '@faker-js/faker'
import { FC } from 'react'
import { Parameter, Parameters } from '@/components'
import { classNames, formatNumber } from '@/lib/utils'
import { Props } from './validatorParametersContainer'

const ValidatorParametersLoader: FC<Props> = async props => {
    const parameters = await new Promise<any>(resolve =>
        setTimeout(
            () =>
                resolve({
                    downtimePenalty: 0.1,
                    minValidatorStake: 100,
                    misbehaviorPenalty: 10,
                    requiredUptime: 5,
                    uptimeBlocksWindow: 10000,
                }),
            faker.number.int({ max: 500, min: 200 })
        )
    )

    return (
        <section
            className={classNames(
                'bg-other-tonalFill5 flex flex-col gap-2 rounded-lg p-6',
                'backdrop-blur-lg',
                props.className
            )}
        >
            <h3 className="text-sm">Validator parameters</h3>
            <Parameters className="gap-2">
                <Parameter name="Uptime blocks window">
                    {formatNumber(parameters.uptimeBlocksWindow)}
                </Parameter>
                <Parameter name="Required uptime">
                    {parameters.requiredUptime}%
                </Parameter>
                <Parameter name="Downtime penalty">
                    {parameters.downtimePenalty}%
                </Parameter>
                <Parameter name="Misbehavior penalty">
                    {parameters.misbehaviorPenalty}%
                </Parameter>
                <Parameter name="Min validator stake">
                    {formatNumber(parameters.minValidatorStake)} UM
                </Parameter>
            </Parameters>
        </section>
    )
}

export default ValidatorParametersLoader
