// istanbul ignore file
import { FC } from 'react'
import { getValidatorBlocks } from '@/lib/data'
import GraphqlClientProvider from '@/lib/graphql/graphqlClientProvider'
import { Props } from './validatorStatusContainer'
import ValidatorStatusUpdater from './validatorStatusUpdater'

const ValidatorStatusLoader: FC<Props> = async props => {
    const blocks = await getValidatorBlocks(props.validatorId)

    return (
        <GraphqlClientProvider>
            <ValidatorStatusUpdater blocks={blocks} {...props} />
        </GraphqlClientProvider>
    )
}

export default ValidatorStatusLoader
