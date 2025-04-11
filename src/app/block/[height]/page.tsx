// istanbul ignore file
import { notFound } from 'next/navigation'
import { FC } from 'react'
import { Breadcrumb, Breadcrumbs, Container } from '@/components'
import { BlockViewContainer } from '@/containers'
import { generatePageMetadata } from '@/lib/utils'

interface Props {
    params: Promise<{ height: string }>
}

export const generateMetadata = async (props: Props) => {
    const { height } = await props.params

    return generatePageMetadata(
        `Block ${height}`,
        `Explore ${height} block parameters, transactions, and other data ` +
            'with Noctis - a fast, secure, and privacy-focused explorer ' +
            'built for Penumbra blockchain.',
        `/block/${height}`
    )
}

const BlockViewPage: FC<Props> = async props => {
    const params = await props.params
    const blockHeight = Number(params.height)

    if (Number.isNaN(blockHeight)) {
        notFound()
    }

    return (
        <Container narrow>
            <Breadcrumbs>
                <Breadcrumb href="/">Explorer</Breadcrumb>
                <Breadcrumb href="/blocks">Blocks</Breadcrumb>
            </Breadcrumbs>
            <BlockViewContainer blockHeight={blockHeight} />
        </Container>
    )
}

export default BlockViewPage
