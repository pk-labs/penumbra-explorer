// istanbul ignore file
'use client'

import { faker } from '@faker-js/faker'
import { FC, useEffect, useState } from 'react'
import { AnimatedList, DexExecution, EmptyState } from '@/components'
import { useTicker } from '@/lib/hooks'
import { TransformedDexExecution } from '@/lib/types'
import { classNames } from '@/lib/utils'
import { Props as DexPositionTableContainerProps } from './dexExecutionContainer'

const currencies = ['ATOM', 'CDT', 'OSMO', 'TIA', 'UM', 'USDC']

interface Props extends DexPositionTableContainerProps {
    executions: TransformedDexExecution[]
}

const DexExecutionUpdater: FC<Props> = props => {
    const lastTick = useTicker()
    const [executions, setExecutions] = useState(props.executions)

    useEffect(() => {
        if (lastTick.second() % 5 === 0) {
            setExecutions(prev => {
                const base = faker.helpers.arrayElement(currencies)

                const quote = faker.helpers.arrayElement(
                    currencies.filter(currency => currency != base)
                )

                return [
                    {
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
                    },
                    ...prev.slice(0, 9),
                ]
            })
        }
    }, [lastTick])

    return (
        <section
            className={classNames(
                'bg-other-tonalFill5 flex flex-col gap-10 rounded-lg p-6',
                'backdrop-blur-lg',
                props.className
            )}
        >
            <h2 className="text-2xl font-medium">Latest executions</h2>
            {executions.length ? (
                <AnimatedList className="flex flex-col gap-10">
                    {executions.map(execution => (
                        <DexExecution {...execution} key={execution.id} />
                    ))}
                </AnimatedList>
            ) : (
                <EmptyState title="No executions" />
            )}
        </section>
    )
}

export default DexExecutionUpdater
