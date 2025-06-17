// istanbul ignore file
import { faker } from '@faker-js/faker'
import { FC } from 'react'
import { blockSeconds } from '@/lib/constants'
import dayjs from '@/lib/dayjs'
import GraphqlClientProvider from '@/lib/graphql/graphqlClientProvider'
import { DexBlockExecution } from '@/lib/types'
import { Props } from './dexExecutionContainer'
import DexExecutionUpdater from './dexExecutionUpdater'

const currencies = ['ATOM', 'CDT', 'OSMO', 'TIA', 'UM', 'USDC']

const DexExecutionLoader: FC<Props> = async props => {
    const blockExecutions = await new Promise<DexBlockExecution[]>(resolve =>
        setTimeout(
            () => {
                const now = dayjs()

                return resolve(
                    Array.from({
                        length: faker.number.int({ max: 10, min: 0 }),
                    }).map((_, i) => ({
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
                        height: faker.number.int({ max: 5000, min: 4000 }),
                        timestamp: now
                            .subtract(i * blockSeconds, 'seconds')
                            .valueOf(),
                    }))
                )
            },
            faker.number.int({ max: 1000, min: 500 })
        )
    )

    return (
        <GraphqlClientProvider>
            <DexExecutionUpdater blockExecutions={blockExecutions} {...props} />
        </GraphqlClientProvider>
    )
}

export default DexExecutionLoader
