// istanbul ignore file
'use client'

import { FC, ReactNode } from 'react'
import { Provider } from 'urql'
import createGraphqlClient from './createGraphqlClient'

const graphqlClient = createGraphqlClient()

interface Props {
    children?: ReactNode
}

const GraphqlClientProvider: FC<Props> = props => (
    <Provider value={graphqlClient}>{props.children}</Provider>
)

export default GraphqlClientProvider
