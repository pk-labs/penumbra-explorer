// istanbul ignore file
'use client'

import { FC, useEffect, useState } from 'react'
import { Parameter, Parameters } from '@/components'
import dayjs from '@/lib/dayjs/dayjs'
import { useChainParametersUpdateSubscription } from '@/lib/graphql/generated/hooks'
import { ChainParameters } from '@/lib/graphql/generated/types'
import { blocksToTime, classNames, formatNumber } from '@/lib/utils'
import { Props as ChainParametersContainerProps } from './chainParametersContainer'

interface Props extends ChainParametersContainerProps {
    parameters: Omit<ChainParameters, 'lastUpdated'>
}

const ChainParametersUpdater: FC<Props> = props => {
    const [parameters, setParameters] = useState(props.parameters)
    const [chainParametersSubscription] = useChainParametersUpdateSubscription(
        {}
    )
    const parametersUpdate = chainParametersSubscription.data?.chainParameters

    useEffect(() => {
        if (parametersUpdate) {
            setParameters({
                chainId: parametersUpdate.chainId,
                currentBlockHeight: parametersUpdate.currentBlockHeight,
                currentBlockTime: parametersUpdate.currentBlockTime,
                currentEpoch: parametersUpdate.currentEpoch,
                epochDuration: parametersUpdate.epochDuration,
                nextEpochIn: parametersUpdate.nextEpochIn,
            })
        }
    }, [parametersUpdate])

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
                        {formatNumber(parameters.epochDuration)} blocks{' '}
                        {blocksToTime(parameters.epochDuration)}
                    </Parameter>
                    <Parameter name="Next in">
                        {formatNumber(parameters.nextEpochIn)} blocks{' '}
                        {blocksToTime(parameters.nextEpochIn)}
                    </Parameter>
                </Parameters>
            </div>
        </section>
    )
}

export default ChainParametersUpdater
