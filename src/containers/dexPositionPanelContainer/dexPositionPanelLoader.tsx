// istanbul ignore file
import { faker } from '@faker-js/faker'
import { FC } from 'react'
import GraphqlClientProvider from '@/lib/graphql/graphqlClientProvider'
import { Props } from './dexPositionPanelContainer'
import DexPositionPanelUpdater from './dexPositionPanelUpdater'

const DexPositionPanelLoader: FC<Props> = async props => {
    const number = await new Promise<number>(resolve =>
        setTimeout(
            () => resolve(faker.number.int({ max: 10000, min: 10 })),
            faker.number.int({ max: 1000, min: 500 })
        )
    )

    return (
        <GraphqlClientProvider>
            <DexPositionPanelUpdater {...props} number={number ?? 0} />
        </GraphqlClientProvider>
    )
}

export default DexPositionPanelLoader
