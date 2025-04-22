// istanbul ignore file
import { FC } from 'react'
import { Breadcrumb, Breadcrumbs, Container, IbcTable } from '@/components'
import { generatePageMetadata } from '@/lib/utils'

export const metadata = generatePageMetadata('IBC', 'TODO: Description', '/ibc')

const IbcPage: FC = async () => {
    return (
        <Container>
            <Breadcrumbs>
                <Breadcrumb href="/">Explorer</Breadcrumb>
                <Breadcrumb>IBC Chains</Breadcrumb>
            </Breadcrumbs>
            <IbcTable />
        </Container>
    )
}

export default IbcPage
