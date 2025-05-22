// istanbul ignore file
import { faker } from '@faker-js/faker'
import { FC } from 'react'
import { Parameter } from '@/components'
import { classNames, formatNumber } from '@/lib/utils'

export interface Props {
    className?: string
}

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
            <ul
                className={classNames(
                    'text-text-secondary flex flex-col gap-2 font-mono text-sm',
                    'font-medium'
                )}
            >
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
            </ul>
        </section>
    )
}

export default ValidatorParametersLoader
