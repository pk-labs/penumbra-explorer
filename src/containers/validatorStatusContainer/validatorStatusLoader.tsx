// istanbul ignore file
import { faker } from '@faker-js/faker'
import { FC } from 'react'
import GraphqlClientProvider from '@/lib/graphql/graphqlClientProvider'
import { Props } from './validatorStatusContainer'
import ValidatorStatusUpdater from './validatorStatusUpdater'

const ValidatorStatusLoader: FC<Props> = async props => {
    const data = await new Promise<any>(resolve =>
        setTimeout(
            () => {
                const start = faker.number.int({ max: 5000000, min: 4000000 })

                const blocks = Array.from({ length: 300 }, (_, i) => start + i)

                const missedBlocks = faker.helpers.arrayElements(blocks, {
                    max: 50,
                    min: 0,
                })

                resolve({
                    blocks,
                    missedBlocks,
                })
            },
            faker.number.int({ max: 500, min: 200 })
        )
    )

    return (
        <GraphqlClientProvider>
            <ValidatorStatusUpdater
                blocks={data.blocks}
                missedBlocks={data.missedBlocks}
                {...props}
            />
        </GraphqlClientProvider>
    )
}

export default ValidatorStatusLoader
