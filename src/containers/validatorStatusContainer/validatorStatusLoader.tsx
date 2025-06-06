// istanbul ignore file
import { FC } from 'react'
import { getBlocks, getValidatorBlocks } from '@/lib/data'
import GraphqlClientProvider from '@/lib/graphql/graphqlClientProvider'
import { Props } from './validatorStatusContainer'
import ValidatorStatusUpdater from './validatorStatusUpdater'

const ValidatorStatusLoader: FC<Props> = async props => {
    const latestBlocks = await getBlocks({ length: 300 })
    let validatorBlocks = await getValidatorBlocks(props.validatorId)

    validatorBlocks = latestBlocks.blocks.map(block => ({
        height: block.height,
        signed: validatorBlocks?.find(vb => vb.height === block.height)?.signed,
    }))

    return (
        <GraphqlClientProvider>
            <ValidatorStatusUpdater
                validatorBlocks={validatorBlocks ?? []}
                {...props}
            />
        </GraphqlClientProvider>
    )
}

export default ValidatorStatusLoader
