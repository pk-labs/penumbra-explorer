// istanbul ignore file
import { notFound } from 'next/navigation'
import { FC } from 'react'
import { getMinValidatorStake } from '@/lib/data'
import GraphqlClientProvider from '@/lib/graphql/graphqlClientProvider'
import { Props } from './minValidatorStakePanelContainer'
import MinValidatorStakePanelUpdater from './minValidatorStakePanelUpdater'

const MinValidatorStakePanelLoader: FC<Props> = async props => {
    const number = await getMinValidatorStake()

    if (typeof number === 'undefined') {
        notFound()
    }

    return (
        <GraphqlClientProvider>
            <MinValidatorStakePanelUpdater number={number} {...props} />
        </GraphqlClientProvider>
    )
}

export default MinValidatorStakePanelLoader
