// istanbul ignore file
import { FC } from 'react'
import { Breadcrumb, Breadcrumbs, Container } from '@/components'
import { IbcTableContainer } from '@/containers'
import { generatePageMetadata } from '@/lib/utils'

export const metadata = generatePageMetadata(
    'IBC Chains',
    'Explore IBC Chains connected to the Penumbra blockchain. View client ' +
        'ID, channel ID, and transaction information on Noctis - a fast, ' +
        'secure, and privacy-focused explorer built for Penumbra blockchain.',
    '/ibc'
)

const IbcPage: FC = () => (
    <Container>
        <Breadcrumbs>
            <Breadcrumb href="/">Explore</Breadcrumb>
            <Breadcrumb>IBC Chains</Breadcrumb>
        </Breadcrumbs>
        <IbcTableContainer />
    </Container>
)

export default IbcPage
