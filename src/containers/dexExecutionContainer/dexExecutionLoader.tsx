// istanbul ignore file
import { faker } from '@faker-js/faker'
import { FC } from 'react'
import { DexBlockExecution, EmptyState } from '@/components'
import { getBlocks } from '@/lib/data'
import { DexBlockExecution as DexBlockExecutionType } from '@/lib/types'
import { classNames } from '@/lib/utils'
import { Props } from './dexExecutionContainer'

const baseAssetIds = [
    'DJlyenhbLm2EYBi/BkFJ7SNSEF1aJj2vm/1zGoz5vAc=',
    'QU5yP3S9mHwCzLyZdYXtUrGW4v/nWzeTqmjMKZZiaRA=',
    'qaDFFlDQ00yzmgR0QElCA9WgtA847cyE+R6aaXClQQg=',
    'LdexCcIS7h5jbSjieMV+MoC2IB1XmuKxzNNeRgq4QAQ=',
    'WdHeHDmklWKxFf0g86MiYy6Mt6lUQza5g+NfNuK2oAE=',
    'UxSzPuz9XKLpnAttHgzK/j0t1YHJUtgU+2T99R+FxBE=',
]

const quoteAssetId = 'KeqcLzNx9qSH5+lcJHBB9KNW+YPrBk5dKzvPMiypahA='

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
                    }).map(() => ({
                        baseAmount: faker.number.int({ max: 5000000, min: 1 }),
                        baseAssetId: faker.helpers.arrayElement(baseAssetIds),
                        id: faker.string.uuid(),
                        quoteAmount: faker.number.int({ max: 5000000, min: 1 }),
                        quoteAssetId,
                        swaps: Array.from({
                            length: faker.number.int({ max: 8, min: 1 }),
                        }).map(() =>
                            Array.from({
                                length: faker.number.int({ max: 7, min: 2 }),
                            }).map(() => ({
                                amount: faker.number.int({
                                    max: 5000000,
                                    min: 1,
                                }),
                                assetId:
                                    faker.helpers.arrayElement(baseAssetIds),
                            }))
                        ),
                    })),
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
