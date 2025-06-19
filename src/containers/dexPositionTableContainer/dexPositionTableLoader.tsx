// istanbul ignore file
import { faker } from '@faker-js/faker'
import { FC } from 'react'
import dayjs from '@/lib/dayjs'
import { DexPositionState, TransformedDexPosition } from '@/lib/types'
import DexPositionTable from '../../components/tables/dexPositionTable/dexPositionTable'
import { Props } from './dexPositionTableContainer'

const baseAssetIds = [
    'DJlyenhbLm2EYBi/BkFJ7SNSEF1aJj2vm/1zGoz5vAc=',
    'QU5yP3S9mHwCzLyZdYXtUrGW4v/nWzeTqmjMKZZiaRA=',
    'qaDFFlDQ00yzmgR0QElCA9WgtA847cyE+R6aaXClQQg=',
    'LdexCcIS7h5jbSjieMV+MoC2IB1XmuKxzNNeRgq4QAQ=',
    'WdHeHDmklWKxFf0g86MiYy6Mt6lUQza5g+NfNuK2oAE=',
    'UxSzPuz9XKLpnAttHgzK/j0t1YHJUtgU+2T99R+FxBE=',
]

const quoteAssetId = 'KeqcLzNx9qSH5+lcJHBB9KNW+YPrBk5dKzvPMiypahA='

const DexPositionTableLoader: FC<Props> = async props => {
    const positions = await new Promise<TransformedDexPosition[]>(resolve =>
        setTimeout(
            () =>
                resolve(
                    Array.from({ length: props.limit.length })
                        .map(() => ({
                            baseAssetId:
                                faker.helpers.arrayElement(baseAssetIds),
                            fee: faker.number.float({ max: 0.9, min: 0.1 }),
                            id: faker.finance.bitcoinAddress(),
                            quoteAssetId,
                            reserve: faker.number.int({
                                max: 5000000,
                                min: 1,
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
                        }))
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
