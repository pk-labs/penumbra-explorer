// istanbul ignore file
import { FC } from 'react'
import { getValidatorActiveSince } from '@/lib/data'
import GraphqlClientProvider from '@/lib/graphql/graphqlClientProvider'
import { Props } from './validatorActiveSincePanelContainer'
import ValidatorActiveSincePanelUpdater from './validatorActiveSincePanelUpdater'

const ValidatorActiveSincePanelLoader: FC<Props> = async props => {
    const number = await getValidatorActiveSince(props.validatorId)

    return (
        <GraphqlClientProvider>
            <ValidatorActiveSincePanelUpdater number={number ?? 0} {...props} />
        </GraphqlClientProvider>
    )
}

export default ValidatorActiveSincePanelLoader
