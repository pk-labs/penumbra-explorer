// istanbul ignore file
import { FC } from 'react'
import GraphqlClientProvider from '@/lib/graphql/graphqlClientProvider'
import ValidatorsPanelUpdater from './validatorsPanelUpdater'

export interface Props {
    className?: string
    number?: number
}

const ValidatorsPanelLoader: FC<Props> = async props => {
    const initialNumber = await new Promise<number>(resolve =>
        setTimeout(() => resolve(56), 300)
    )

    return (
        <GraphqlClientProvider>
            <ValidatorsPanelUpdater initialNumber={initialNumber} {...props} />
        </GraphqlClientProvider>
    )
}

export default ValidatorsPanelLoader
