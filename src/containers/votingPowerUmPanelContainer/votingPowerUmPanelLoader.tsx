// istanbul ignore file
import { faker } from '@faker-js/faker'
import { FC } from 'react'
import GraphqlClientProvider from '@/lib/graphql/graphqlClientProvider'
import { Props } from './votingPowerUmPanelContainer'
import VotingPowerUmPanelUpdater from './votingPowerUmPanelUpdater'

const VotingPowerUmPanelLoader: FC<Props> = async props => {
    const initialNumber = await new Promise<number>(resolve =>
        setTimeout(
            () => resolve(faker.number.int({ max: 999999, min: 0 })),
            faker.number.int({ max: 500, min: 200 })
        )
    )

    return (
        <GraphqlClientProvider>
            <VotingPowerUmPanelUpdater
                initialNumber={initialNumber}
                {...props}
            />
        </GraphqlClientProvider>
    )
}

export default VotingPowerUmPanelLoader
