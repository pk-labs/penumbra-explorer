// istanbul ignore file
import { faker } from '@faker-js/faker'
import { FC } from 'react'
import GraphqlClientProvider from '@/lib/graphql/graphqlClientProvider'
import { Props } from './dexExecutionPanelContainer'
import DexExecutionPanelUpdater from './dexExecutionPanelUpdater'

const DexExecutionPanelLoader: FC<Props> = async props => {
    const number = await new Promise<number>(resolve =>
        setTimeout(
            () => resolve(faker.number.int({ max: 100000, min: 1000 })),
            faker.number.int({ max: 1000, min: 500 })
        )
    )

    return (
        <GraphqlClientProvider>
            <DexExecutionPanelUpdater {...props} number={number ?? 0} />
        </GraphqlClientProvider>
    )
}

export default DexExecutionPanelLoader
