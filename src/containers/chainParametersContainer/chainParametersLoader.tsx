// istanbul ignore file
import { faker } from '@faker-js/faker'
import { FC } from 'react'
import { Parameter, Parameters } from '@/components'
import dayjs from '@/lib/dayjs/dayjs'
import { classNames, formatNumber } from '@/lib/utils'
import { Props } from './chainParametersContainer'

const ChainParametersLoader: FC<Props> = async props => {
    const parameters = await new Promise<any>(resolve =>
        setTimeout(
            () =>
                resolve({
                    blockHeight: faker.number.int({
                        max: 5000000,
                        min: 4000000,
                    }),
                    blockTimestamp: dayjs().subtract(5, 'seconds').valueOf(),
                    chainId: 'penumbra-1',
                    epoch: faker.number.int({ max: 250, min: 150 }),
                    epochBlocks: faker.number.int({ max: 40000, min: 30000 }),
                    epochDays: faker.number.int({ max: 3, min: 1 }),
                    nextEpochBlocks: faker.number.int({ max: 2000, min: 1000 }),
                    nextEpochHours: faker.number.int({ max: 23, min: 1 }),
                    uptimeBlocksWindow: 10000,
                }),
            faker.number.int({ max: 3000, min: 2000 })
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
            <h3 className="text-sm">Chain parameters</h3>
            <Parameters className="gap-2">
                <Parameter name="Chain ID">{parameters.chainId}</Parameter>
                <Parameter name="Block time">
                    {dayjs(parameters.blockTimestamp).format(
                        'YYYY-MM-DD HH:mm:ss z'
                    )}
                </Parameter>
                <Parameter name="Block height">
                    {formatNumber(parameters.blockHeight)}
                </Parameter>
                <Parameter name="Current epoch">
                    {formatNumber(parameters.epoch)}
                </Parameter>
                <Parameter name="Epoch duration">
                    {formatNumber(parameters.epochBlocks)} blocks (~
                    {parameters.epochDays} days)
                </Parameter>
                <Parameter name="Next epoch in">
                    {formatNumber(parameters.nextEpochBlocks)} blocks (~
                    {parameters.nextEpochHours} hours)
                </Parameter>
            </Parameters>
        </section>
    )
}

export default ChainParametersLoader
