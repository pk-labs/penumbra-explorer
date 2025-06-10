// istanbul ignore file
import { FC } from 'react'
import { getBlocks, getValidatorBlocks } from '@/lib/data'
import { ValidatorState } from '@/lib/graphql/generated/types'
import GraphqlClientProvider from '@/lib/graphql/graphqlClientProvider'
import { Props } from './validatorStatusContainer'
import ValidatorStatusUpdater from './validatorStatusUpdater'

const ValidatorStatusLoader: FC<Props> = async props => {
    const [latestBlocks, validator] = await Promise.all([
        getBlocks({ length: 300 }),
        getValidatorBlocks(props.validatorId),
    ])

    const active = validator?.state === ValidatorState.ValidatorStateEnumActive

    const validatorBlocks = latestBlocks.blocks.map(block => ({
        height: block.height,
        signed: validator?.last300Blocks.find(vb => vb.height === block.height)
            ?.signed,
    }))

    return (
        <GraphqlClientProvider>
            <ValidatorStatusUpdater
                active={active}
                validatorBlocks={validatorBlocks ?? []}
                {...props}
            />
        </GraphqlClientProvider>
    )
}

export default ValidatorStatusLoader
