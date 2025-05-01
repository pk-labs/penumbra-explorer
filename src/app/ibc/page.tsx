// istanbul ignore file
import { FC } from 'react'
import { Breadcrumb, Breadcrumbs, Container } from '@/components'
import { IbcContainer } from '@/containers'
import { generatePageMetadata } from '@/lib/utils'

export const metadata = generatePageMetadata('IBC', 'TODO: Description', '/ibc')

const IbcPage: FC = async () => {
    return (
        <Container>
            <Breadcrumbs>
                <Breadcrumb href="/">Explorer</Breadcrumb>
                <Breadcrumb>IBC Chains</Breadcrumb>
            </Breadcrumbs>
            <IbcContainer />
        </Container>
    )
}

export default IbcPage
