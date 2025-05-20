// istanbul ignore file
import { FC } from 'react'
import GraphqlClientProvider from '@/lib/graphql/graphqlClientProvider'
import StakedPanelUpdater from './stakedPanelUpdater'

export interface Props {
    className?: string
    number?: number
}

const StakedPanelLoader: FC<Props> = async props => {
    const initialNumber = await new Promise<number>(resolve =>
        setTimeout(() => resolve(2016579), 500)
    )

    return (
        <GraphqlClientProvider>
            <StakedPanelUpdater initialNumber={initialNumber} {...props} />
        </GraphqlClientProvider>
    )
}

export default StakedPanelLoader
