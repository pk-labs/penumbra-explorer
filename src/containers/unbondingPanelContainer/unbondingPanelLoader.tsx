// istanbul ignore file
import { FC } from 'react'
import GraphqlClientProvider from '@/lib/graphql/graphqlClientProvider'
import UnbondingPanelUpdater from './unbondingPanelUpdater'

export interface Props {
    className?: string
    number?: number
}

const UnbondingPanelLoader: FC<Props> = async props => {
    const initialNumber = await new Promise<number>(resolve =>
        setTimeout(() => resolve(7), 400)
    )

    return (
        <GraphqlClientProvider>
            <UnbondingPanelUpdater initialNumber={initialNumber} {...props} />
        </GraphqlClientProvider>
    )
}

export default UnbondingPanelLoader
