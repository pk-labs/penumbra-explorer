// istanbul ignore file
import { faker } from '@faker-js/faker'
import { notFound } from 'next/navigation'
import { FC } from 'react'
import {
    ValidatorsPerformanceTable,
    ValidatorsPerformanceTableProps,
} from '@/components'
import dayjs from '@/lib/dayjs'

export type Props = Omit<ValidatorsPerformanceTableProps, 'validators'>

const ValidatorsPerformanceLoader: FC<Props> = async props => {
    const validators = await new Promise<any>(resolve =>
        setTimeout(
            () =>
                resolve(
                    Array.from({ length: 56 }).map(() => {
                        const date = faker.date
                            .recent({
                                days: faker.number.int({ max: 1000, min: 1 }),
                            })
                            .valueOf()

                        return {
                            bonding: faker.helpers.arrayElement([
                                'Bonded',
                                'Unbonding',
                                'Unbonded',
                            ]),
                            commission: faker.number.int({ max: 10, min: 2 }),
                            hash: faker.finance.bitcoinAddress(),
                            initialTimeAgo: dayjs().to(date),
                            status: 'Active',
                            timestamp: date.valueOf(),
                            uptime: faker.datatype.boolean({ probability: 0.7 })
                                ? 100
                                : faker.datatype.boolean({ probability: 0.7 })
                                  ? faker.number.float({
                                        max: 100,
                                        min: 95,
                                    })
                                  : faker.number.float({
                                        max: 95,
                                        min: 5,
                                    }),
                            votingPower: faker.number.int({
                                max: 999999,
                                min: 100000,
                            }),
                            votingPowerPercentage: faker.number.float({
                                max: 10,
                                min: 0.1,
                            }),
                        }
                    })
                ),
            faker.number.int({ max: 500, min: 200 })
        )
    )

    if (!validators) {
        notFound()
    }

    return <ValidatorsPerformanceTable validators={validators} {...props} />
}

export default ValidatorsPerformanceLoader
