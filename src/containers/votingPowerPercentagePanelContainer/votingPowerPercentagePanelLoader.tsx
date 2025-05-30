// istanbul ignore file
import { faker } from '@faker-js/faker'
import { FC } from 'react'
import GraphqlClientProvider from '@/lib/graphql/graphqlClientProvider'
import { Props } from './votingPowerPercentagePanelContainer'
import VotingPowerPercentagePanelUpdater from './votingPowerPercentagePanelUpdater'

const VotingPowerPercentagePanelLoader: FC<Props> = async props => {
    const number = await new Promise<number>(resolve =>
        setTimeout(
            () => resolve(faker.number.float({ max: 10, min: 1 })),
            faker.number.int({ max: 500, min: 200 })
        )
    )

    return (
        <GraphqlClientProvider>
            <VotingPowerPercentagePanelUpdater number={number} {...props} />
        </GraphqlClientProvider>
    )
}

export default VotingPowerPercentagePanelLoader
