// istanbul ignore file
import { faker } from '@faker-js/faker'
import { FC } from 'react'
import { getBlocks } from '@/lib/data'
import GraphqlClientProvider from '@/lib/graphql/graphqlClientProvider'
import { DexBlockExecution } from '@/lib/types'
import { Props } from './dexExecutionContainer'
import DexExecutionUpdater from './dexExecutionUpdater'

const currencies = ['ATOM', 'CDT', 'OSMO', 'TIA', 'UM', 'USDC']

const DexExecutionLoader: FC<Props> = async props => {
    const { blocks } = await getBlocks({
        length: faker.number.int({ max: 10, min: 0 }),
        offset: 1,
    })

    const blockExecutions = await new Promise<DexBlockExecution[]>(resolve =>
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
        <GraphqlClientProvider>
            <DexExecutionUpdater blockExecutions={blockExecutions} {...props} />
        </GraphqlClientProvider>
    )
}

export default DexExecutionLoader
