// istanbul ignore file
'use client'

import { faker } from '@faker-js/faker'
import { FC, useEffect, useState } from 'react'
import { AnimatedList, DexBlockExecution, EmptyState } from '@/components'
import dayjs from '@/lib/dayjs/dayjs'
import { useBlockUpdateSubscription } from '@/lib/graphql/generated/hooks'
import { DexBlockExecution as DexBlockExecutionType } from '@/lib/types'
import { classNames } from '@/lib/utils'
import { Props as DexPositionTableContainerProps } from './dexExecutionContainer'

const currencies = ['ATOM', 'CDT', 'OSMO', 'TIA', 'UM', 'USDC']

interface Props extends DexPositionTableContainerProps {
    blockExecutions: DexBlockExecutionType[]
}

const DexExecutionUpdater: FC<Props> = props => {
    const [blockExecutions, setBlockExecutions] = useState(
        props.blockExecutions
    )
    const [blockSubscription] = useBlockUpdateSubscription({
        variables: { limit: 1 },
    })
    const blockUpdate = blockSubscription.data?.latestBlocks

    useEffect(() => {
        if (blockUpdate) {
            setBlockExecutions(prev => [
                {
                    executions: Array.from({
                        length: faker.number.int({ max: 6, min: 1 }),
                    }).map(() => {
                        const base = faker.helpers.arrayElement(currencies)

                        const quote = faker.helpers.arrayElement(
                            currencies.filter(currency => currency != base)
                        )

                        return {
                            base,
                            baseAmount: faker.number.float({
                                max: 5000,
                                min: 0.001,
                            }),
                            id: faker.string.uuid(),
                            quote,
                            quoteAmount: faker.number.float({
                                max: 5000,
                                min: 0.001,
                            }),
                            swaps: faker.number.int({ max: 8, min: 1 }),
                        }
                    }),
                    height: blockUpdate.height,
                    timestamp: dayjs(blockUpdate.createdAt).valueOf(),
                },
                ...prev.slice(0, 9),
            ])
        }
    }, [blockUpdate])

    return (
        <section
            className={classNames(
                'bg-other-tonalFill5 flex flex-col gap-10 rounded-lg p-6',
                'backdrop-blur-lg lg:overflow-y-hidden',
                props.className
            )}
        >
            <h2 className="text-2xl font-medium">Latest executions</h2>
            {blockExecutions.length ? (
                <AnimatedList
                    className={classNames(
                        'flex flex-col gap-10 lg:h-[1064px] lg:overflow-y-auto'
                    )}
                >
                    {blockExecutions.map(blockExecution => (
                        <DexBlockExecution
                            key={blockExecution.height}
                            {...blockExecution}
                        />
                    ))}
                </AnimatedList>
            ) : (
                <EmptyState title="No executions" />
            )}
        </section>
    )
}

export default DexExecutionUpdater
