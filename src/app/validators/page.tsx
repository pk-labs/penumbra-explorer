// istanbul ignore file
import { FC } from 'react'
import { Breadcrumb, Breadcrumbs, Container } from '@/components'
import { StakedPanelContainer } from '@/containers'
import { generatePageMetadata } from '@/lib/utils'

export const metadata = generatePageMetadata(
    'Validators',
    'TODO: Description',
    '/ibc'
)

const ValidatorsPage: FC = () => (
    <Container>
        <Breadcrumbs>
            <Breadcrumb href="/">Explore</Breadcrumb>
            <Breadcrumb>Validators</Breadcrumb>
        </Breadcrumbs>
        <StakedPanelContainer />
    </Container>
)

export default ValidatorsPage
