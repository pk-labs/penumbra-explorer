// istanbul ignore file
import { faker } from '@faker-js/faker'
import { FC } from 'react'
import GraphqlClientProvider from '@/lib/graphql/graphqlClientProvider'
import { TransformedDexExecution } from '@/lib/types'
import { Props } from './dexExecutionContainer'
import DexExecutionUpdater from './dexExecutionUpdater'

const currencies = ['ATOM', 'CDT', 'OSMO', 'TIA', 'UM', 'USDC']

const DexExecutionLoader: FC<Props> = async props => {
    const executions = await new Promise<TransformedDexExecution[]>(resolve =>
        setTimeout(
            () =>
                resolve(
                    Array.from({
                        length: faker.number.int({ max: 10, min: 0 }),
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
                    })
                ),
            faker.number.int({ max: 1000, min: 500 })
        )
    )

    return (
        <GraphqlClientProvider>
            <DexExecutionUpdater executions={executions} {...props} />
        </GraphqlClientProvider>
    )
}

export default DexExecutionLoader
