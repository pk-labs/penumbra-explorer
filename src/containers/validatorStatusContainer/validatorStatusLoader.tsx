// istanbul ignore file
import { FC } from 'react'
import { getBlocks, getValidatorBlocks } from '@/lib/data'
import GraphqlClientProvider from '@/lib/graphql/graphqlClientProvider'
import { Props } from './validatorStatusContainer'
import ValidatorStatusUpdater from './validatorStatusUpdater'

const ValidatorStatusLoader: FC<Props> = async props => {
    const latestBlocks = await getBlocks({ length: 300 })
    const validatorBlocks = await getValidatorBlocks(props.validatorId)

    return (
        <GraphqlClientProvider>
            <ValidatorStatusUpdater
                latestBlocks={latestBlocks.blocks.map(block => block.height)}
                validatorBlocks={validatorBlocks}
                {...props}
            />
        </GraphqlClientProvider>
    )
}

export default ValidatorStatusLoader
