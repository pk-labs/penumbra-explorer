// istanbul ignore file
import { faker } from '@faker-js/faker'
import { FC } from 'react'
import GraphqlClientProvider from '@/lib/graphql/graphqlClientProvider'
import ValidatorsPanelUpdater from './validatorsPanelUpdater'

export interface Props {
    className?: string
}

const ValidatorsPanelLoader: FC<Props> = async props => {
    const initialNumber = await new Promise<number>(resolve =>
        setTimeout(() => resolve(56), faker.number.int({ max: 500, min: 200 }))
    )

    return (
        <GraphqlClientProvider>
            <ValidatorsPanelUpdater initialNumber={initialNumber} {...props} />
        </GraphqlClientProvider>
    )
}

export default ValidatorsPanelLoader
