// istanbul ignore file
import { faker } from '@faker-js/faker'
import { FC } from 'react'
import { DexBlockExecution, EmptyState } from '@/components'
import { getBlocks } from '@/lib/data'
import { DexBlockExecution as DexBlockExecutionType } from '@/lib/types'
import { classNames } from '@/lib/utils'
import { Props } from './dexExecutionContainer'

const currencies = ['ATOM', 'CDT', 'OSMO', 'TIA', 'UM', 'USDC']

const DexExecutionLoader: FC<Props> = async props => {
    const { blocks } = await getBlocks({
        length: faker.number.int({ max: 10, min: 1 }),
    })

    const blockExecutions = await new Promise<DexBlockExecutionType[]>(
        resolve =>
            resolve(
                blocks.map(block => ({
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
                    height: block.height,
                    timestamp: block.timestamp,
                }))
            )
    )

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
                <ul
                    className={classNames(
                        'flex flex-col gap-10 lg:h-[1064px] lg:overflow-y-auto'
                    )}
                >
                    {blockExecutions.map(blockExecution => (
                        <li key={blockExecution.height}>
                            <DexBlockExecution {...blockExecution} />
                        </li>
                    ))}
                </ul>
            ) : (
                <EmptyState title="No executions" />
            )}
        </section>
    )
}

export default DexExecutionLoader
