// istanbul ignore file
import { faker } from '@faker-js/faker'
import { FC } from 'react'
import GraphqlClientProvider from '@/lib/graphql/graphqlClientProvider'
import { Props } from './totalVotingPowerPanelContainer'
import TotalVotingPowerPanelUpdater from './totalVotingPowerPanelUpdater'

const TotalVotingPowerPanelLoader: FC<Props> = async props => {
    const number = await new Promise<number>(resolve =>
        setTimeout(
            () => resolve(faker.number.int({ max: 2500000, min: 1500000 })),
            faker.number.int({ max: 500, min: 200 })
        )
    )

    return (
        <GraphqlClientProvider>
            <TotalVotingPowerPanelUpdater number={number} {...props} />
        </GraphqlClientProvider>
    )
}

export default TotalVotingPowerPanelLoader
