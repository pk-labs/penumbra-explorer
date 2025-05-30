// istanbul ignore file
import { faker } from '@faker-js/faker'
import { FC } from 'react'
import GraphqlClientProvider from '@/lib/graphql/graphqlClientProvider'
import { Props } from './validatorsPanelContainer'
import ValidatorsPanelUpdater from './validatorsPanelUpdater'

const ValidatorsPanelLoader: FC<Props> = async props => {
    const number = await new Promise<number>(resolve =>
        setTimeout(() => resolve(56), faker.number.int({ max: 500, min: 200 }))
    )

    return (
        <GraphqlClientProvider>
            <ValidatorsPanelUpdater number={number} {...props} />
        </GraphqlClientProvider>
    )
}

export default ValidatorsPanelLoader
