// istanbul ignore file
import { faker } from '@faker-js/faker'
import { notFound } from 'next/navigation'
import { FC } from 'react'
import { ValidatorsPerformanceTable } from '@/components'
import dayjs from '@/lib/dayjs'
import { Props } from './validatorsPerformanceContainer'

const ValidatorsPerformanceLoader: FC<Props> = async ({ filter, ...props }) => {
    const mockActiveValidators = (count: number) =>
        Array.from({ length: count }).map(() => {
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
                    : faker.number.float({
                          max: 100,
                          min: 95,
                      }),
                votingPower: faker.number.int({
                    max: 999999,
                    min: 100000,
                }),
                votingPowerPercentage: faker.number.float({
                    max: 10,
                    min: 1,
                }),
            }
        })

    const mockInactiveValidators = (count: number) =>
        Array.from({ length: count }).map(() => {
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
                status: faker.helpers.arrayElement([
                    'Defined',
                    'Disabled',
                    'Inactive',
                    'Jailed',
                    'Tombstoned',
                    'Unspecified',
                ]),
                timestamp: date.valueOf(),
                uptime: faker.number.float({
                    max: 95,
                    min: 0,
                }),
                votingPower: faker.number.int({
                    max: 99999,
                    min: 0,
                }),
                votingPowerPercentage: faker.number.float({
                    max: 1,
                    min: 0.1,
                }),
            }
        })

    const validators = await new Promise<any>(resolve =>
        setTimeout(
            () =>
                resolve(
                    filter === 'inactive'
                        ? mockInactiveValidators(34)
                        : mockActiveValidators(56)
                ),
            faker.number.int({ max: 500, min: 300 })
        )
    )

    if (!validators) {
        notFound()
    }

    return <ValidatorsPerformanceTable validators={validators} {...props} />
}

export default ValidatorsPerformanceLoader
