// istanbul ignore file
import { faker } from '@faker-js/faker'
import { FC } from 'react'
import dayjs from '@/lib/dayjs'
import { DexPositionState, TransformedDexPosition } from '@/lib/types'
import DexPositionTable from '../../components/tables/dexPositionTable/dexPositionTable'
import { Props } from './dexPositionTableContainer'

const currencies = ['ATOM', 'CDT', 'OSMO', 'TIA', 'UM', 'USDC']

const DexPositionTableLoader: FC<Props> = async props => {
    const positions = await new Promise<TransformedDexPosition[]>(resolve =>
        setTimeout(
            () =>
                resolve(
                    Array.from({ length: props.limit.length })
                        .map(() => {
                            const base = faker.helpers.arrayElement(currencies)

                            const quote = faker.helpers.arrayElement(
                                currencies.filter(currency => currency != base)
                            )

                            return {
                                base,
                                fee: faker.number.float({ max: 0.9, min: 0.1 }),
                                id: faker.finance.bitcoinAddress(),
                                quote,
                                reserve: faker.number.float({
                                    max: 5000,
                                    min: 0.001,
                                }),
                                state: faker.helpers.arrayElement(
                                    Object.values(DexPositionState)
                                ),
                                timestamp: dayjs()
                                    .add(
                                        faker.number.int({ max: 0, min: -500 }),
                                        'seconds'
                                    )
                                    .valueOf(),
                            }
                        })
                        .toSorted((a, b) => b.timestamp - a.timestamp)
                ),
            faker.number.int({ max: 1000, min: 500 })
        )
    )

    return (
        <DexPositionTable
            className={props.className}
            header={props.header}
            positions={positions}
        />
    )
}

export default DexPositionTableLoader
