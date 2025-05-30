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
                const total = 300

                const blocks = Array.from(
                    { length: total },
                    (_, i) => start + i
                )

                const missedBlocks = new Set(
                    faker.helpers.arrayElements(blocks, { max: 50, min: 0 })
                )

                const signedBlocks = new Set(
                    faker.helpers.arrayElements(
                        blocks.filter(block => !missedBlocks.has(block)),
                        {
                            max: total - missedBlocks.size - 50,
                            min: 150,
                        }
                    )
                )

                resolve({
                    blocks,
                    missedBlocks,
                    signedBlocks,
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
                signedBlocks={data.signedBlocks}
                {...props}
            />
        </GraphqlClientProvider>
    )
}

export default ValidatorStatusLoader
