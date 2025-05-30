// istanbul ignore file
import { faker } from '@faker-js/faker'
import { FC } from 'react'
import GraphqlClientProvider from '@/lib/graphql/graphqlClientProvider'
import { Props } from './validatorDefinedPanelContainer'
import ValidatorDefinedPanelUpdater from './validatorDefinedPanelUpdater'

const ValidatorDefinedPanelLoader: FC<Props> = async props => {
    const number = await new Promise<number>(resolve =>
        setTimeout(
            () => resolve(faker.number.float({ max: 3 * 365, min: 0 })),
            faker.number.int({ max: 500, min: 200 })
        )
    )

    return (
        <GraphqlClientProvider>
            <ValidatorDefinedPanelUpdater {...props} number={number} />
        </GraphqlClientProvider>
    )
}

export default ValidatorDefinedPanelLoader
