// istanbul ignore file
import { notFound } from 'next/navigation'
import { FC } from 'react'
import { Parameter, Parameters } from '@/components'
import { getChainParameters } from '@/lib/data'
import dayjs from '@/lib/dayjs/dayjs'
import { classNames, formatNumber } from '@/lib/utils'
import { Props } from './chainParametersContainer'

const ChainParametersLoader: FC<Props> = async props => {
    const parameters = await getChainParameters()

    if (!parameters) {
        notFound()
    }

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
                        {dayjs(parameters.currentBlockTime).format(
                            'YYYY-MM-DD HH:mm:ss z'
                        )}
                    </Parameter>
                    <Parameter name="Height">
                        {formatNumber(parameters.currentBlockHeight)}
                    </Parameter>
                </Parameters>
            </div>
            <div className="flex flex-col gap-1">
                <h3 className="text-base">Epoch</h3>
                <Parameters>
                    <Parameter name="Current">
                        {formatNumber(parameters.currentEpoch)}
                    </Parameter>
                    <Parameter name="Duration">
                        {formatNumber(parameters.epochDuration)} blocks ??? days
                    </Parameter>
                    <Parameter name="Next in">
                        {formatNumber(parameters.nextEpochIn)} blocks ??? hours
                    </Parameter>
                </Parameters>
            </div>
        </section>
    )
}

export default ChainParametersLoader
