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
            <div className="flex flex-col gap-1">
                <h2 className="text-lg">Chain parameters</h2>
                <Parameters>
                    <Parameter name="Chain ID">{parameters.chainId}</Parameter>
                </Parameters>
            </div>
            <div className="flex flex-col gap-1">
                <h3 className="text-base">Latest block</h3>
                <Parameters>
                    <Parameter name="Time">
                        {dayjs(parameters.blockTimestamp).format(
                            'YYYY-MM-DD HH:mm:ss z'
                        )}
                    </Parameter>
                    <Parameter name="Height">
                        {formatNumber(parameters.blockHeight)}
                    </Parameter>
                </Parameters>
            </div>
            <div className="flex flex-col gap-1">
                <h3 className="text-base">Epoch</h3>
                <Parameters>
                    <Parameter name="Current">
                        {formatNumber(parameters.epoch)}
                    </Parameter>
                    <Parameter name="Duration">
                        {formatNumber(parameters.epochBlocks)} blocks ~
                        {parameters.epochDays}d
                    </Parameter>
                    <Parameter name="Next in">
                        {formatNumber(parameters.nextEpochBlocks)} blocks ~
                        {parameters.nextEpochHours}hr
                    </Parameter>
                </Parameters>
            </div>
        </section>
    )
}

export default ChainParametersLoader
