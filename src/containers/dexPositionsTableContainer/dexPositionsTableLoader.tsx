// istanbul ignore file
import { faker } from '@faker-js/faker'
import { FC } from 'react'
import dayjs from '@/lib/dayjs'
import GraphqlClientProvider from '@/lib/graphql/graphqlClientProvider'
import { Props } from './dexPositionsTableContainer'
import DexPositionsTableUpdater from './dexPositionsTableUpdater'

const DexPositionsTableLoader: FC<Props> = async props => {
    const positions = await new Promise<any[]>(resolve =>
        setTimeout(
            () =>
                resolve(
                    Array.from({ length: props.limit.length })
                        .map(() => ({
                            fee: faker.number.float({ max: 0.9, min: 0.1 }),
                            id: faker.finance.bitcoinAddress(),
                            pair: {
                                left: faker.helpers.arrayElement([
                                    'ATOM',
                                    'CDT',
                                    'OSMO',
                                    'TIA',
                                    'UM',
                                    'USDC',
                                ]),
                                right: faker.helpers.arrayElement([
                                    'ATOM',
                                    'CDT',
                                    'OSMO',
                                    'TIA',
                                    'UM',
                                    'USDC',
                                ]),
                            },
                            reserves: Array.from({
                                length: faker.number.int({ max: 2, min: 1 }),
                            }).map(() => ({
                                amount: faker.number.float({
                                    max: 5000,
                                    min: 0,
                                }),
                                symbol: faker.helpers.arrayElement([
                                    'ATOM',
                                    'CDT',
                                    'OSMO',
                                    'UM',
                                    'USDC',
                                ]),
                            })),
                            state: faker.helpers.arrayElement([
                                'open',
                                'executing',
                                'withdrawn',
                                'closed',
                            ]),
                            timestamp: dayjs()
                                .add(
                                    faker.number.int({ max: 0, min: -500 }),
                                    'seconds'
                                )
                                .valueOf(),
                        }))
                        .toSorted((a, b) => b.timestamp - a.timestamp)
                ),
            faker.number.int({ max: 1000, min: 500 })
        )
    )

    return (
        <GraphqlClientProvider>
            <DexPositionsTableUpdater positions={positions} {...props} />
        </GraphqlClientProvider>
    )
}

export default DexPositionsTableLoader
