// istanbul ignore file
import { faker } from '@faker-js/faker'
import { FC } from 'react'
import GraphqlClientProvider from '@/lib/graphql/graphqlClientProvider'
import { Props } from './dexExecutionsPanelContainer'
import DexExecutionsPanelUpdater from './dexExecutionsPanelUpdater'

const DexExecutionsPanelLoader: FC<Props> = async props => {
    const number = await new Promise<number>(resolve =>
        setTimeout(
            () => resolve(faker.number.int({ max: 100000, min: 1000 })),
            faker.number.int({ max: 1000, min: 500 })
        )
    )

    return (
        <GraphqlClientProvider>
            <DexExecutionsPanelUpdater {...props} number={number ?? 0} />
        </GraphqlClientProvider>
    )
}

export default DexExecutionsPanelLoader
