// istanbul ignore file
import { faker } from '@faker-js/faker'
import { FC } from 'react'
import GraphqlClientProvider from '@/lib/graphql/graphqlClientProvider'
import { Props } from './minValidatorStakePanelContainer'
import MinValidatorStakePanelUpdater from './minValidatorStakePanelUpdater'

const MinValidatorStakePanelLoader: FC<Props> = async props => {
    const number = await new Promise<number>(resolve =>
        setTimeout(
            () => resolve(faker.number.int({ max: 100, min: 10 })),
            faker.number.int({ max: 500, min: 200 })
        )
    )

    return (
        <GraphqlClientProvider>
            <MinValidatorStakePanelUpdater number={number} {...props} />
        </GraphqlClientProvider>
    )
}

export default MinValidatorStakePanelLoader
