// istanbul ignore file
import { faker } from '@faker-js/faker'
import { FC } from 'react'
import GraphqlClientProvider from '@/lib/graphql/graphqlClientProvider'
import { Props } from './stakedPanelContainer'
import StakedPanelUpdater from './stakedPanelUpdater'

const StakedPanelLoader: FC<Props> = async props => {
    const initialNumber = await new Promise<number>(resolve =>
        setTimeout(
            () => resolve(faker.number.int({ max: 2500000, min: 1500000 })),
            faker.number.int({ max: 500, min: 200 })
        )
    )

    return (
        <GraphqlClientProvider>
            <StakedPanelUpdater initialNumber={initialNumber} {...props} />
        </GraphqlClientProvider>
    )
}

export default StakedPanelLoader
