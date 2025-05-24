// istanbul ignore file
import { faker } from '@faker-js/faker'
import { FC } from 'react'
import GraphqlClientProvider from '@/lib/graphql/graphqlClientProvider'
import UnbondingPanelUpdater from './unbondingPanelUpdater'

export interface Props {
    className?: string
}

const UnbondingPanelLoader: FC<Props> = async props => {
    const initialNumber = await new Promise<number>(resolve =>
        setTimeout(
            () => resolve(faker.number.int({ max: 20, min: 1 })),
            faker.number.int({ max: 500, min: 200 })
        )
    )

    return (
        <GraphqlClientProvider>
            <UnbondingPanelUpdater initialNumber={initialNumber} {...props} />
        </GraphqlClientProvider>
    )
}

export default UnbondingPanelLoader
