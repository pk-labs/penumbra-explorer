// istanbul ignore file
import { FC } from 'react'
import { getMinValidatorStake } from '@/lib/data'
import GraphqlClientProvider from '@/lib/graphql/graphqlClientProvider'
import { Props } from './minValidatorStakePanelContainer'
import MinValidatorStakePanelUpdater from './minValidatorStakePanelUpdater'

const MinValidatorStakePanelLoader: FC<Props> = async props => {
    const number = await getMinValidatorStake()

    return (
        <GraphqlClientProvider>
            <MinValidatorStakePanelUpdater number={number ?? 0} {...props} />
        </GraphqlClientProvider>
    )
}

export default MinValidatorStakePanelLoader
