// istanbul ignore file
import { notFound } from 'next/navigation'
import { FC } from 'react'
import getActiveValidators from '@/lib/data/getActiveValidators'
import GraphqlClientProvider from '@/lib/graphql/graphqlClientProvider'
import { Props } from './activeValidatorsPanelContainer'
import ActiveValidatorsPanelUpdater from './activeValidatorsPanelUpdater'

const ActiveValidatorsPanelLoader: FC<Props> = async props => {
    const activeValidators = await getActiveValidators()

    if (!activeValidators) {
        notFound()
    }

    return (
        <GraphqlClientProvider>
            <ActiveValidatorsPanelUpdater
                {...props}
                limit={activeValidators.activeValidatorLimit}
                number={activeValidators.activeValidatorCount}
            />
        </GraphqlClientProvider>
    )
}

export default ActiveValidatorsPanelLoader
