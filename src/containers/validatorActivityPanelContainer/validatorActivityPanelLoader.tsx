// istanbul ignore file
import { faker } from '@faker-js/faker'
import { FC } from 'react'
import GraphqlClientProvider from '@/lib/graphql/graphqlClientProvider'
import { Props } from './validatorActivityPanelContainer'
import ValidatorActivityPanelUpdater from './validatorActivityPanelUpdater'

const ValidatorActivityPanelLoader: FC<Props> = async props => {
    const initialNumber = await new Promise<number>(resolve =>
        setTimeout(
            () => resolve(faker.number.float({ max: 3 * 365, min: 0 })),
            faker.number.int({ max: 500, min: 200 })
        )
    )

    return (
        <GraphqlClientProvider>
            <ValidatorActivityPanelUpdater
                initialNumber={initialNumber}
                {...props}
            />
        </GraphqlClientProvider>
    )
}

export default ValidatorActivityPanelLoader
