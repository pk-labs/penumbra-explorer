// istanbul ignore file
import { faker } from '@faker-js/faker'
import { FC } from 'react'
import GraphqlClientProvider from '@/lib/graphql/graphqlClientProvider'
import { Props } from './dexPositionsPanelContainer'
import DexPositionsPanelUpdater from './dexPositionsPanelUpdater'

const DexPositionsPanelLoader: FC<Props> = async props => {
    const number = await new Promise<number>(resolve =>
        setTimeout(
            () => resolve(faker.number.int({ max: 10000, min: 10 })),
            faker.number.int({ max: 1000, min: 500 })
        )
    )

    return (
        <GraphqlClientProvider>
            <DexPositionsPanelUpdater {...props} number={number ?? 0} />
        </GraphqlClientProvider>
    )
}

export default DexPositionsPanelLoader
