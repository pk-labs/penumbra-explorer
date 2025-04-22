// istanbul ignore file
import { notFound } from 'next/navigation'
import { FC } from 'react'
import { Breadcrumb, Breadcrumbs, Container } from '@/components'
import { ibcConnections } from '@/lib/constants'
import { generatePageMetadata } from '@/lib/utils'

interface Props {
    params: Promise<{ chainId: string }>
}

export const generateMetadata = async (props: Props) => {
    const { chainId } = await props.params

    return generatePageMetadata(
        `Chain ${chainId}`,
        'TODO: Description',
        `/ibc/${chainId}`
    )
}

const ChainPage: FC<Props> = async props => {
    const params = await props.params

    if (
        !ibcConnections.some(
            connection => connection.chainId === params.chainId
        )
    ) {
        notFound()
    }

    return (
        <Container>
            <Breadcrumbs>
                <Breadcrumb href="/">Explorer</Breadcrumb>
                <Breadcrumb href="/ibc">IBC Chains</Breadcrumb>
            </Breadcrumbs>
        </Container>
    )
}

export default ChainPage
