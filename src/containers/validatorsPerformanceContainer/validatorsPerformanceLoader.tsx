// istanbul ignore file
import { faker } from '@faker-js/faker'
import { notFound } from 'next/navigation'
import { FC } from 'react'
import {
    ValidatorsPerformanceTable,
    ValidatorsPerformanceTableProps,
} from '@/components'

export type Props = Omit<ValidatorsPerformanceTableProps, 'validators'>

const ValidatorsPerformanceLoader: FC<Props> = async props => {
    const validators = await new Promise<any>(resolve =>
        setTimeout(
            () =>
                resolve(
                    Array.from({ length: 56 }).map(() => ({
                        hash: faker.finance.bitcoinAddress(),
                    }))
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
