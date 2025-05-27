// istanbul ignore file
import { faker } from '@faker-js/faker'
import { FC } from 'react'
import GraphqlClientProvider from '@/lib/graphql/graphqlClientProvider'
import { Props } from './validatorStatusContainer'
import ValidatorStatusUpdater from './validatorStatusUpdater'

const ValidatorStatusLoader: FC<Props> = async props => {
    const initialMissedBlocks = await new Promise<number[]>(resolve =>
        setTimeout(
            () => {
                const start = faker.number.int({ max: 5000000, min: 4000000 })
                resolve(Array.from({ length: 300 }, (_, i) => start + i))
            },
            faker.number.int({ max: 500, min: 200 })
        )
    )

    return (
        <GraphqlClientProvider>
            <ValidatorStatusUpdater
                initialMissedBlocks={initialMissedBlocks}
                {...props}
            />
        </GraphqlClientProvider>
    )
}

export default ValidatorStatusLoader
