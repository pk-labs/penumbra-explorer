// istanbul ignore file
import { faker } from '@faker-js/faker'
import { FC } from 'react'
import GraphqlClientProvider from '@/lib/graphql/graphqlClientProvider'
import { Props } from './dexExecutionContainer'
import DexExecutionUpdater from './dexExecutionUpdater'

const DexExecutionLoader: FC<Props> = async props => {
    const executions = await new Promise<any[]>(resolve =>
        setTimeout(
            () =>
                resolve(
                    Array.from({
                        length: faker.number.int({ max: 10, min: 0 }),
                    }).map(() => ({
                        content: faker.lorem.paragraphs({ max: 3, min: 1 }),
                        headerLeft: faker.lorem.words({ max: 3, min: 1 }),
                        headerRight: faker.lorem.word(),
                    }))
                ),
            faker.number.int({ max: 1000, min: 500 })
        )
    )

    return (
        <GraphqlClientProvider>
            <DexExecutionUpdater executions={executions} {...props} />
        </GraphqlClientProvider>
    )
}

export default DexExecutionLoader
